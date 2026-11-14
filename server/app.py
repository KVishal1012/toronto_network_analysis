"""Local-only API. Run with: python -m server.app."""
from __future__ import annotations

import json
import logging
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import parse_qs, urlparse

from server.engine import scenario
from server.store import history, read_state, save_scenario, review_scenario
from server.ranking import rank_availability
from server.reference import inventory, layer
from server import roads, terrain, components, terrain_mesh, terrain_components
from server.updates import updates
from server.buildings import metadata, viewport



class Handler(BaseHTTPRequestHandler):
    """Small fixed-route API, no arbitrary upstream URL or SQL execution."""

    def send_json(self, status: int, payload: object) -> None:
        """Send JSON with no-store semantics so freshness cannot be cached."""
        encoded = json.dumps(payload, allow_nan=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.end_headers()
        self.wfile.write(encoded)

    def do_GET(self) -> None:
        """Expose state, history and health."""
        try:
            self.read_route()
        except (ValueError,KeyError,TypeError) as exc:
            self.send_json(400,{'error':str(exc)})
        except Exception:
            logging.exception('read_failed')
            self.send_json(500,{'error':'Local state read failed; inspect the API log.'})

    def read_route(self) -> None:
        """Dispatch known read-only routes."""
        route = urlparse(self.path)
        if route.path == "/api/health":
            self.send_json(200, {"status": "ok", "actuation": False, "engine": "DuckDB + Shapely + PROJ"})
        elif route.path == "/api/updates":
            self.send_json(200, updates.status())
        elif route.path == "/api/ranking":
            state = read_state(parse_qs(route.query).get("id", [None])[0])
            self.send_json(200 if state else 404, rank_availability(state) if state else {"error": "No saved state"})
        elif route.path == "/api/components/conflicts":
            self.send_json(200, components.conflict_index())
        elif route.path == "/api/components/meta":
            self.send_json(200, components.metadata())
        elif route.path == "/api/components/inspect":
            q=parse_qs(route.query)
            self.send_json(200, components.inspect(q.get('id',[''])[0],q.get('layer',['structures'])[0]))
        elif route.path == "/api/components":
            q=parse_qs(route.query)
            self.send_json(200, components.viewport(q.get('bbox',[''])[0],q.get('layer',['structures'])[0]))
        elif route.path == "/api/terrain/scene":
            q=parse_qs(route.query)
            self.send_json(200, terrain_components.scene(float(q.get('lon',['-79.38'])[0]),float(q.get('lat',['43.65'])[0]),int(q.get('spacing',['0'])[0])))
        elif route.path == "/api/terrain/mesh":
            q=parse_qs(route.query)
            self.send_json(200, terrain_mesh.mesh(float(q.get('lon',['-79.38'])[0]),float(q.get('lat',['43.65'])[0]),int(q.get('spacing',['20'])[0])))
        elif route.path == "/api/terrain/meta":
            self.send_json(200, terrain.metadata())
        elif route.path == "/api/terrain":
            self.send_json(200, terrain.viewport(parse_qs(route.query).get("bbox",[""])[0]))
        elif route.path == "/api/roads":
            self.send_json(200, roads.read())
        elif route.path == "/api/reference":
            self.send_json(200, inventory())
        elif route.path.startswith("/api/reference/"):
            self.send_json(200, layer(route.path.removeprefix("/api/reference/")))
        elif route.path == "/api/history":
            self.send_json(200, history())
        elif route.path == "/api/buildings/meta":
            self.send_json(200, metadata())
        elif route.path == "/api/buildings":
            self.send_json(200, viewport(parse_qs(route.query).get('bbox',[''])[0]))
        elif route.path == "/api/state":
            state = read_state(parse_qs(route.query).get("id", [None])[0])
            self.send_json(200 if state else 404, state or {"error": "No saved state. Refresh sources to acquire real data."})
        else:
            self.send_json(404, {"error": "Unknown API route"})

    def do_POST(self) -> None:
        """Enforce same-origin JSON requests and bounded refreshes/scenarios."""
        origin = self.headers.get("Origin")
        if origin and origin not in ("http://127.0.0.1:5173", "http://localhost:5173", "http://127.0.0.1:8042"):
            self.send_json(403, {"error": "Origin is not allowed"})
            return
        if self.headers.get("Content-Type", "").split(";")[0] != "application/json":
            self.send_json(415, {"error": "JSON request required"})
            return
        try:
            size = int(self.headers.get("Content-Length", "0"))
            if not 0 < size <= 16384:
                raise ValueError("Request must be 1–16384 bytes")
            body = json.loads(self.rfile.read(size))
            if not isinstance(body, dict):
                raise ValueError("Request must be a JSON object")
            if self.path == "/api/refresh":
                self.send_json(200, updates.run_once(full=True))
            elif self.path == "/api/updates":
                self.send_json(200, updates.configure(body.get("enabled")))
            elif self.path == "/api/scenario/review":
                self.send_json(200, review_scenario(body.get("scenario_id"), body.get("reviewer"), body.get("note")))
            elif self.path == "/api/scenario":
                state_id, ids = body.get("state_id"), body.get("station_ids")
                if not isinstance(state_id, str) or not isinstance(ids, list) or any(not isinstance(s, str) for s in ids):
                    raise ValueError("state_id and station_ids are required")
                state = read_state(state_id)
                if state is None:
                    raise ValueError("Baseline snapshot does not exist")
                self.send_json(200, save_scenario(scenario(state, ids)))
            else:
                self.send_json(404, {"error": "Unknown API route"})
        except (ValueError, KeyError, TypeError) as exc:
            self.send_json(400, {"error": str(exc)})
        except Exception:
            logging.exception("request_failed")
            self.send_json(500, {"error": "Operation failed; inspect the local server log. No successful result is implied."})


def main() -> None:
    """Bind to loopback only; public deployment requires a separate security design."""
    logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
    server = ThreadingHTTPServer(("127.0.0.1", 8042), Handler)
    logging.info("ASTER API listening on http://127.0.0.1:8042")
    updates.extra_refresh = roads.acquire
    updates.start()
    try:
        server.serve_forever()
    finally:
        updates.stop.set()
        server.server_close()


if __name__ == "__main__":
    main()
