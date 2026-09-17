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
 * DEPLOYED at https://suno-resolver.soundlexicon.workers.dev/ and wired into SHARE_RESOLVER
 * in both queue.html and terminology.html. Measured on arrival: both reported share links
 * resolved in 280-370ms with access-control-allow-origin: *, against ~20s-then-522 from the
 * public proxies it replaces.
 *
 * TO REDEPLOY, or to stand up your own
 *   1. dash.cloudflare.com → Workers & Pages → Create → Worker, name it before deploying
 *   2. Edit code, replace the contents with this file, Deploy
 *   3. Set SHARE_RESOLVER in both pages to the worker's URL
 * Nothing else changes: without it the pages fall back to the public proxy, and without that
 * they tell the reader to paste the /song/ address instead.
 *
 * IT ALSO ANSWERS ?clip=<uuid>
 * Resolving a share link only yields an id; the title and length still have to come from
 * /api/clip, and that endpoint keeps an origin allowlist -- suno.com and localhost are
 * answered, github.io is not -- so the hosted site was falling back to the same public proxy
 * for the second leg and spending ~20s there. That is the delay left after the share link
 * itself resolves in ~300ms. This does that leg too, and returns only the three fields the
 * page uses rather than relaying the whole record.
 *
 * WHAT IT EXPOSES
 * A Suno share token in, 36 characters of hex and dashes out; or a uuid in, a title, a
 * length and an artwork address out. It refuses anything else, so it cannot be used as an
 * open proxy, and it never relays a response body it has not narrowed first.
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

    const q = new URL(request.url).searchParams;

    /* Second leg: the metadata for a song id. Only the fields the page renders are passed
       back, so this cannot become a general window onto the API. */
    const clip = q.get('clip') || '';
    if (clip) {
      if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(clip)) {
        return new Response(JSON.stringify({ error: 'expected a song uuid' }),
          { status: 400, headers: { ...cors, 'content-type': 'application/json' } });
      }
      try {
        const r = await fetch('https://studio-api.prod.suno.com/api/clip/' + clip.toLowerCase(),
          { headers: { 'user-agent': 'Mozilla/5.0' } });
        if (!r.ok) throw new Error(String(r.status));
        const j = await r.json();
        const dur = Math.round((j.metadata && j.metadata.duration) || 0);
        /* A clip that is still GENERATING has no duration yet, and the 24h cache-control
           above would pin that zero in every browser that asked - which is exactly what
           happened: a queue row added mid-generation kept re-asking, kept being handed the
           cached zero, and could never auto-advance even hours after the take finished.
           A length is immutable once it exists, so cache that hard; a zero is a provisional
           answer about a song still being made, so cache nothing. */
        return new Response(JSON.stringify({
          title: String(j.title || '').slice(0, 140),
          dur,
          art: typeof j.image_url === 'string' && j.image_url.startsWith('https://') ? j.image_url : ''
        }), { headers: { ...cors, 'content-type': 'application/json',
                         'cache-control': dur ? 'public, max-age=86400' : 'no-store' } });
      } catch (e) {
        return new Response(JSON.stringify({ error: 'could not read that song' }),
          { status: 404, headers: { ...cors, 'content-type': 'application/json' } });
      }
    }

    const want = q.get('u') || '';
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
