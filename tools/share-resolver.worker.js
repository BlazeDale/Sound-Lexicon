/*
 * A ten-line Cloudflare Worker that resolves a Suno share link to a song id.
 *
 * WHY IT IS WANTED
 * suno.com/s/<token> is what Suno's Share button hands out, and it is the link a person is
 * likeliest to have. No page can follow it on its own: suno.com sends no CORS headers, so
 * the response arrives opaque. The site therefore borrows a public proxy — and that route
 * is now failing. Measured 2026-09-12: three different public proxies timed out on the same
 * share link, and a direct server-side fetch of the share page took over two minutes, so it
 * is suno.com being slow to answer robots rather than any one proxy being down.
 *
 * WHY THIS IS BETTER THAN A PROXY
 * A share link is a plain 307 whose Location header already contains the id:
 *   GET https://suno.com/s/Ex7cMzAgz0f3srdM
 *   307  location: /song/006a2eab-4bf1-4ab5-9f8a-4c51165d3797?sh=Ex7cMzAgz0f3srdM
 * So the page body — the slow part, and the part a proxy insists on downloading — is never
 * needed. This reads one header and stops. It also never returns page content, so it cannot
 * hand back somebody else's song id the way a rendering reader service did when that was
 * tried.
 *
 * TO DEPLOY (about two minutes, free tier is ample)
 *   1. dash.cloudflare.com → Workers & Pages → Create → Worker
 *   2. Replace the contents with this file, Deploy
 *   3. Copy the worker's URL and set SHARE_RESOLVER in queue.html to it
 * Nothing else changes: without it the page falls back to the public proxy, and without that
 * it tells the reader to paste the /song/ address instead.
 *
 * WHAT IT EXPOSES
 * Only a Suno share token in, only 36 characters of hex and dashes out. It refuses any other
 * address, so it cannot be used as an open proxy for anything else.
 */
const UUID = /\/song\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;
const SHARE = /^https:\/\/suno\.com\/s\/[A-Za-z0-9_-]{6,64}$/;

export default {
  async fetch(request) {
    const cors = {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET,OPTIONS',
      'cache-control': 'public, max-age=86400'
    };
    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });

    const want = new URL(request.url).searchParams.get('u') || '';
    // Only ever a Suno share address. This is what stops it being an open proxy.
    if (!SHARE.test(want)) {
      return new Response(JSON.stringify({ error: 'expected a https://suno.com/s/<token> address' }),
        { status: 400, headers: { ...cors, 'content-type': 'application/json' } });
    }

    let id = '';
    try {
      // redirect:manual is the whole trick — the answer is in the header, so the page body,
      // which is the slow part, is never fetched at all.
      const r = await fetch(want, { redirect: 'manual', headers: { 'user-agent': 'Mozilla/5.0' } });
      const loc = r.headers.get('location') || '';
      const m = loc.match(UUID);
      if (m) id = m[1].toLowerCase();
    } catch (e) { /* fall through to the not-found answer below */ }

    return new Response(JSON.stringify(id ? { id } : { error: 'could not resolve' }),
      { status: id ? 200 : 404, headers: { ...cors, 'content-type': 'application/json' } });
  }
};
