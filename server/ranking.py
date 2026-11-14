"""Evidence-bound neighbourhood inventory ranking; no predictive inference."""
from fractions import Fraction


def rank_availability(state: dict) -> dict:
    """Rank complete neighbourhoods by rentable bikes per mapped station.

    All mapped stations remain in the denominator, including offline stations.
    Unknown or rejected locations block ranking because their polygon is unknown.
    Empty neighbourhoods have no denominator and are not assigned a zero rate.
    """
    rows, excluded = [], []
    sources_ok = all(any(s['id'] == key and s['status'] == 'available'
                        and s['freshness'] == ('reference' if key == 'neighbourhoods' else 'fresh')
                        for s in state['sources'])
                     for key in ('neighbourhoods', 'station_information', 'station_status'))
    location_errors = bool(state['accounting']['stations_rejected'])
    for feature in state['boundaries']['features']:
        p = feature['properties']
        row = {'id': p['id'], 'name': p['name'], 'station_count': p['station_count'],
               'available_bikes': p['available_bikes'], 'current_status_count': p['current_status_count']}
        reason = ('Required source unavailable or stale' if not sources_ok else
                  'Rejected location records prevent complete spatial accounting' if location_errors else
                  'No stations; ratio undefined' if not p['station_count'] else
                  'Incomplete station reports' if not p['status_complete'] or p['available_bikes'] is None else None)
        if reason:
            excluded.append({**row, 'reason': reason})
        else:
            rows.append({**row, 'bikes_per_station': p['available_bikes'] / p['station_count'],
                         'station_ids': [s['id'] for s in state['stations'] if s['neighbourhood_id'] == p['id']]})
    rows.sort(key=lambda r: (Fraction(r['available_bikes'], r['station_count']), r['id']))
    last = None
    rank = 0
    for i, row in enumerate(rows):
        value = Fraction(row['available_bikes'], row['station_count'])
        if value != last:
            rank = i + 1
        row['rank'] = rank
        last = value
    return {'state_id': state['id'], 'evaluated_at': state['evaluated_at'],
            'status': 'available' if rows else 'unavailable', 'rows': rows, 'excluded': excluded,
            'formula': 'Sum of reported bikes at installed, renting stations / all mapped stations in the neighbourhood',
            'method': 'Polygon covers point; source freshness and per-station schema checks; ascending ratio; equal ratios share rank; ID breaks display ties.',
            'limitation': 'Inventory per station, not demand, accessibility, capacity utilization or a forecast. Incomplete neighbourhoods are excluded, so this may be a partial comparison.',
            'sources': state['sources'], 'accounting': state['accounting']}
