export const allScreeningRegions=[
  'all-toronto',
  'toronto-east-york',
  'north-york',
  'etobicoke-york',
  'scarborough',
  'downtown',
  'midtown',
] as const;

export const submissionRegions=allScreeningRegions;

export const featured3dRegions=['downtown','midtown'] as const;

export const regionNames:Record<string,string>={
  'all-toronto':'All Toronto (4 Community Councils)',
  'toronto-east-york':'Toronto & East York Community Council',
  'north-york':'North York Community Council',
  'etobicoke-york':'Etobicoke York Community Council',
  'scarborough':'Scarborough Community Council',
  downtown:'Downtown — ASTER focus area',
  midtown:'Midtown — ASTER focus area',
};

export const regionShortNames:Record<string,string>={
  'all-toronto':'All Toronto',
  'toronto-east-york':'Toronto & East York',
  'north-york':'North York',
  'etobicoke-york':'Etobicoke York',
  'scarborough':'Scarborough',
  downtown:'Downtown Toronto',
  midtown:'Midtown Toronto',
};

export const regionCoverageSummary:Record<string,string>={
  'all-toronto':'Covers all 4 Toronto Community Councils (Toronto & East York, North York, Etobicoke York, and Scarborough) across all 158 City neighbourhoods.',
  'toronto-east-york':'Covers Toronto & East York Community Council, including Downtown, East York, Parkdale-High Park, Davenport, Beaches-East York, and Toronto-Danforth.',
  'north-york':'Covers North York Community Council, including North York Centre, Willowdale, Don Valley, Downsview, York Mills, and Jane-Finch.',
  'etobicoke-york':'Covers Etobicoke York Community Council, including Etobicoke Centre, Humber Bay, Mimico, Rexdale, Weston, and Mount Dennis.',
  'scarborough':'Covers Scarborough Community Council, including Scarborough Centre, Agincourt, Malvern, Wexford, Guildwood, and Kingston Road.',
  downtown:'Covers 13 City neighbourhoods including Bay-Cloverhill, Yonge-Bay Corridor, Church-Wellesley, Regent Park, Harbourfront-CityPlace, Kensington-Chinatown, University, and Annex.',
  midtown:'Covers 11 City neighbourhoods including Yonge-Eglinton, South Eglinton-Davisville, North Toronto, Yonge-St.Clair, Rosedale-Moore Park, Casa Loma, Forest Hill, and Lawrence Park.',
};
