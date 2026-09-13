#!/usr/bin/env node
/*
 * Vocal Timbre Library — Suno artwork fetcher.
 *   node tools/song_art.mjs           fetch covers for demos not yet checked
 *   node tools/song_art.mjs --all     re-check every demo (a cover can be changed)
 *   node tools/song_art.mjs --check   exit 1 if any demo has never been checked
 *
 * WHY THIS EXISTS
 * queue.html used to derive a track's cover from its id: cdn2.suno.ai/image_<uuid>.jpeg.
 * That is right for a track carrying the artwork Suno generated, and WRONG for every track
 * whose creator replaced it — those get an unrelated address, e.g. a frame grabbed from an
 * uploaded video. So the row showed one picture while Suno's own player showed another,
 * which is exactly what a listener notices first.
 *
 * ONLY THE EXCEPTIONS ARE STORED. Most covers do follow the pattern, so writing all 1393
 * would be a long list of near-identical strings. SONG_ART holds the ids that differ, and
 * the page derives the rest — so the block stays small and says something, rather than
 * restating what is already implied by the id.
 *
 * Unlike a title or a length, a cover is not immutable: a creator can change it later. That
 * is what --all is for, and why the checked set is tracked separately from the exceptions,
 * so "checked and matches the pattern" is distinguishable from "never looked at".
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadData } from './build.mjs';
import { songIds } from './song_titles.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'data.js');

export const MARK_BEGIN = '/* BEGIN GENERATED — Suno cover art · run: node tools/song_art.mjs */';
export const MARK_END = '/* END GENERATED ART */';

const CONCURRENCY = 6;
const derived = id => 'https://cdn2.suno.ai/image_' + id + '.jpeg';

async function fetchArt(uuid, tries = 2) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(`https://studio-api.prod.suno.com/api/clip/${uuid}`, {
        headers: { 'user-agent': 'Mozilla/5.0 (vocal-timbre-library art fetch)' },
        signal: AbortSignal.timeout(20000)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      const u = typeof j.image_url === 'string' && j.image_url.startsWith('https://') ? j.image_url : '';
      return { ok: true, url: u };
    } catch (e) {
      if (i === tries - 1) { console.warn(`  ! ${uuid}: ${e.message}`); return { ok: false, url: '' }; }
    }
  }
}

async function pool(items, fn) {
  const it = items.entries();
  const workers = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    for (const [i, item] of it) await fn(item, i);
  });
  await Promise.all(workers);
}

export function readArt(src = readFileSync(DATA, 'utf8')) {
  const b = src.indexOf(MARK_BEGIN), e = src.indexOf(MARK_END);
  if (b < 0 || e < 0) return { art: {}, checked: [] };
  const body = src.slice(b + MARK_BEGIN.length, e);
  const art = {};
  for (const m of body.matchAll(/'([0-9a-f-]{36})'\s*:\s*'((?:[^'\\]|\\.)*)'/g)) {
    art[m[1]] = m[2].replace(/\\(['\\])/g, '$1');
  }
  const cm = body.match(/ART_CHECKED\s*=\s*(\d+)/);
  return { art, checkedCount: cm ? +cm[1] : 0 };
}

function renderBlock(art, checkedCount) {
  const ids = Object.keys(art).sort();
  const lines = ids.map(id => `  '${id}': '${String(art[id]).replace(/([\\'])/g, '\\$1')}',`);
  return [
    MARK_BEGIN,
    '/* Cover art that does NOT follow cdn2.suno.ai/image_<uuid>.jpeg — a creator replaced it,',
    ' * so the id cannot be used to work the address out. Everything not listed here follows',
    ' * the pattern and is derived. A cover can be changed later: re-check with --all. */',
    `const ART_CHECKED = ${checkedCount};`,
    'const SONG_ART = {',
    ...lines,
    '};',
    MARK_END
  ].join('\n');
}

if (process.argv[1] && process.argv[1].endsWith('song_art.mjs')) {
  const all = process.argv.includes('--all');
  const check = process.argv.includes('--check');

  const { LIB } = loadData();
  const ids = songIds(LIB);
  let src = readFileSync(DATA, 'utf8');
  const { art, checkedCount } = readArt(src);

  if (check) {
    if (checkedCount < ids.length) {
      console.log(`✗ ${ids.length - checkedCount}/${ids.length} demo(s) never checked for cover art — run: node tools/song_art.mjs`);
      process.exit(1);
    }
    console.log(`✓ all ${ids.length} demo covers checked (${Object.keys(art).length} do not follow the id pattern)`);
    process.exit(0);
  }

  const todo = all ? ids : (checkedCount >= ids.length ? [] : ids);
  console.log(`${ids.length} demo song(s); checking ${todo.length}…`);

  let done = 0, exceptions = 0, failed = 0;
  const next = { ...art };
  await pool(todo, async id => {
    const r = await fetchArt(id);
    done++;
    if (!r.ok) { failed++; }
    else if (r.url && r.url !== derived(id)) { next[id] = r.url; exceptions++; }
    else delete next[id];                      // matches the pattern now; no need to store it
    if (done % 50 === 0 || done === todo.length) console.log(`  ${done}/${todo.length}`);
  });

  const block = renderBlock(next, todo.length ? ids.length - failed : checkedCount);
  if (src.includes(MARK_BEGIN)) {
    const b = src.indexOf(MARK_BEGIN), e = src.indexOf(MARK_END) + MARK_END.length;
    src = src.slice(0, b) + block + src.slice(e);
  } else {
    src = src.trimEnd() + '\n\n' + block + '\n';
  }
  writeFileSync(DATA, src, 'utf8');

  console.log(`wrote ${Object.keys(next).length} cover exception(s) to data.js`);
  console.log(`  ${exceptions} found this run · ${failed} could not be read · the rest follow the id pattern`);
}
