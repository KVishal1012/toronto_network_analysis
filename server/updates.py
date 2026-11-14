"""Single-process source polling with bounded cadence and visible health."""
import logging
import os
import time
from datetime import datetime, timezone
from threading import Event, Lock, Thread
from server.store import refresh

INTERVAL_SECONDS = 120


class Updates:
    """Coordinate manual and automatic acquisition without overlapping writes."""

    def __init__(self) -> None:
        self.extra_refresh = None
        self.enabled = os.environ.get('ASTER_AUTO_REFRESH', '1') == '1'
        self.lock = Lock()
        self.guard = Lock()
        self.stop = Event()
        self.last_attempt = 0.0
        self.next_due = time.monotonic()
        self.details = {'running': False, 'last_attempt_at': None, 'last_completed_at': None,
                        'last_state_id': None, 'last_error': None, 'duration_ms': None,
                        'runs': 0, 'degraded_runs': 0}

    def status(self) -> dict:
        """Expose health without credentials or response bodies."""
        with self.guard:
            return {**self.details, 'enabled': self.enabled, 'interval_seconds': INTERVAL_SECONDS,
                    'next_in_seconds': max(0, round(self.next_due-time.monotonic())) if self.enabled else None,
                    'scope': 'While this local API process is running; no background OS service installed'}

    def configure(self, enabled: bool) -> dict:
        """Pause future runs; an in-flight acquisition is allowed to finish."""
        if type(enabled) is not bool:
            raise ValueError('enabled must be boolean')
        with self.guard:
            self.enabled = enabled
            if enabled:
                self.next_due = max(time.monotonic(), self.last_attempt + 30)
        return self.status()

    def run_once(self, full: bool = False) -> dict:
        """Append one real snapshot or raise; never silently reuse failed feeds."""
        if not self.lock.acquire(blocking=False):
            raise ValueError('Refresh is already running')
        started = time.monotonic()
        with self.guard:
            if started-self.last_attempt < 30:
                self.lock.release()
                raise ValueError('Wait 30 seconds between source refreshes')
        try:
            with self.guard:
                self.last_attempt = started
                self.details.update(running=True, last_attempt_at=datetime.now(timezone.utc).isoformat())
            state = refresh(mobility_only=not full)
            road_receipt = self.extra_refresh() if self.extra_refresh else None
            failures = [s['name'] for s in state['sources'] if s['status'] != 'available' or s.get('freshness') not in ('fresh', 'reference')]
            if road_receipt and road_receipt['status'] != 'available':failures.append('Road Restrictions')
            with self.guard:
                self.details.update(last_state_id=state['id'], last_completed_at=datetime.now(timezone.utc).isoformat(),
                                    last_error='Unavailable or non-current sources: '+', '.join(failures) if failures else None)
                self.details['runs'] += 1
                self.details['degraded_runs'] += bool(failures)
            return state
        except Exception:
            with self.guard:
                self.details['last_error'] = 'Acquisition failed; inspect local API log. No successful update implied.'
            logging.exception('automatic_or_manual_refresh_failed')
            raise
        finally:
            with self.guard:
                self.details.update(running=False, duration_ms=round((time.monotonic()-started)*1000))
                self.next_due = time.monotonic() + INTERVAL_SECONDS
            self.lock.release()

    def start(self) -> None:
        """Start a daemon; process shutdown ends polling, sleep has no catch-up burst."""
        def loop() -> None:
            while not self.stop.wait(1):
                with self.guard:
                    due = self.enabled and time.monotonic() >= self.next_due
                if due:
                    try:
                        self.run_once()
                    except Exception:
                        logging.warning('source_poll_failed; health endpoint contains failure status')
        Thread(target=loop, daemon=True, name='aster-source-updates').start()


updates = Updates()
