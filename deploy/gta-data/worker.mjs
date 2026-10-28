/** Public static-object gateway. No geocoding, query logging or mutation routes. */
export default {
  async fetch(request, env) {
    const headers = new Headers({'Access-Control-Allow-Origin': '*', 'X-Content-Type-Options': 'nosniff'});
    if (request.method === 'OPTIONS') {
      headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS');
      return new Response(null, {status: 204, headers});
    }
    if (!['GET', 'HEAD'].includes(request.method)) return new Response('Read only', {status: 405, headers});
    const path = new URL(request.url).pathname.replace(/^\//, '');
    if (!/^(latest\.json|[a-f0-9]{20}\/manifest\.json|objects\/[a-f0-9]{64}\.json\.gz)$/.test(path)) {
      return new Response('Not found', {status: 404, headers});
    }
    // One bucket operation per accepted request; raw archives have no binding here.
    try {
      const object = request.method === 'HEAD' ? await env.PLANNING.head(path) : await env.PLANNING.get(path);
      if (!object) return new Response('Snapshot unavailable; no newer evidence substituted.', {status: 404, headers});
      headers.set('Content-Type', path.endsWith('.gz') ? 'application/octet-stream' : 'application/json');
      headers.set('Cache-Control', path === 'latest.json' ? 'no-store' : 'public, max-age=31536000, immutable');
      headers.set('ETag', object.httpEtag);
      // Do not set Content-Encoding: the browser worker decompresses these objects.
      return new Response(request.method === 'HEAD' ? null : object.body, {headers});
    } catch {
      return new Response('Evidence temporarily unavailable. Please retry later.', {status: 503, headers});
    }
  }
};
