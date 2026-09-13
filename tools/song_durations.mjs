#!/usr/bin/env node
/*
 * Vocal Timbre Library — Suno song-duration fetcher.
 *   node tools/song_durations.mjs           fetch lengths for demos that lack one
 *   node tools/song_durations.mjs --all     re-fetch every demo
 *   node tools/song_durations.mjs --check   exit 1 if any demo is missing a length
 *
 * WHY THIS EXISTS
 * queue.html needs each track's length, because Suno's embed is cross-origin and cannot
 * report the end of a track — the queue advances on a timer over the known duration
 * instead. Asking Suno for that length at play time is the obvious approach and it does
 * not work from the hosted site: /api/clip keeps an origin allowlist (suno.com and
 * localhost are answered, github.io is not), and the public text proxy that stands in for
 * it is slow and unreliable — measured 2026-09-12, five parallel requests all timed out,
 * and serially it returned 522, 522, 500 before two successes. Building a listening
 * experience on that is building on sand.
 *
 * A rendered track's length never changes, so it is a fact about the corpus and belongs
 * in the corpus — exactly like SONG_TITLES and SONG_MODEL, and generated the same way.
 * With it baked in, every library demo resolves instantly and offline, and the network is
 * needed only for a foreign track somebody drops in by hand.
 *
 * Lengths come from /api/clip/<uuid>, which answers plainly from here — it is the browser
 * that is fenced out, not the tool.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadData } from './build.mjs';
import { songIds } from './song_titles.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'data.js');

export const MARK_BEGIN = '/* BEGIN GENERATED — Suno song durations · run: node tools/song_durations.mjs */';
export const MARK_END = '/* END GENERATED DURATIONS */';

const CONCURRENCY = 6;

async function fetchDur(uuid, tries = 2) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(`https://studio-api.prod.suno.com/api/clip/${uuid}`, {
        headers: { 'user-agent': 'Mozilla/5.0 (vocal-timbre-library duration fetch)' },
        signal: AbortSignal.timeout(20000)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      const d = Math.round((j && j.metadata && j.metadata.duration) || 0);
      return d > 0 ? d : null;          // still rendering, private, or deleted
    } catch (e) {
      if (i === tries - 1) { console.warn(`  ! ${uuid}: ${e.message}`); return null; }
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

export function readDurs(src = readFileSync(DATA, 'utf8')) {
  const b = src.indexOf(MARK_BEGIN), e = src.indexOf(MARK_END);
  if (b < 0 || e < 0) return {};
  const body = src.slice(b + MARK_BEGIN.length, e);
  const out = {};
  for (const m of body.matchAll(/'([0-9a-f-]{36})'\s*:\s*(\d+)/g)) out[m[1]] = +m[2];
  return out;
}

function renderBlock(ids, durs) {
  const lines = ids.filter(id => durs[id]).map(id => `  '${id}':${durs[id]},`);
  return [
    MARK_BEGIN,
    '/* Demo length in seconds, keyed by song UUID — fetched from Suno, not hand-edited.',
    ' * queue.html advances on a timer over these, because a cross-origin embed cannot say',
    ' * when a track ended. A rendered length never changes, so this never goes stale. */',
    'const SONG_DUR = {',
    ...lines,
    '};',
    MARK_END
  ].join('\n');
}

if (process.argv[1] && process.argv[1].endsWith('song_durations.mjs')) {
  const all = process.argv.includes('--all');
  const check = process.argv.includes('--check');

  const { LIB } = loadData();
  const ids = songIds(LIB);
  let src = readFileSync(DATA, 'utf8');
  const durs = readDurs(src);

  if (check) {
    const missing = ids.filter(id => !durs[id]);
    if (missing.length) {
      console.log(`✗ ${missing.length}/${ids.length} demo(s) missing a length — run: node tools/song_durations.mjs`);
      console.log(`  ${missing.slice(0, 10).join('\n  ')}${missing.length > 10 ? `\n  …and ${missing.length - 10} more` : ''}`);
      process.exit(1);
    }
    console.log(`✓ all ${ids.length} demos carry a length`);
    process.exit(0);
  }

  const todo = all ? ids : ids.filter(id => !durs[id]);
  console.log(`${ids.length} demo song(s); fetching ${todo.length}…`);

  let done = 0, got = 0;
  await pool(todo, async id => {
    const d = await fetchDur(id);
    done++;
    if (d) { durs[id] = d; got++; }
    if (done % 50 === 0 || done === todo.length) console.log(`  ${done}/${todo.length}`);
  });

  const block = renderBlock(ids, durs);
  if (src.includes(MARK_BEGIN)) {
    const b = src.indexOf(MARK_BEGIN), e = src.indexOf(MARK_END) + MARK_END.length;
    src = src.slice(0, b) + block + src.slice(e);
  } else {
    src = src.trimEnd() + '\n\n' + block + '\n';
  }
  writeFileSync(DATA, src, 'utf8');

  const missing = ids.filter(id => !durs[id]);
  const total = Object.values(durs).reduce((a, b) => a + b, 0);
  console.log(`wrote ${Object.keys(durs).length} length(s) to data.js (${got} fetched this run)`);
  console.log(`  total runtime of the corpus: ${Math.floor(total / 3600)}h ${Math.round(total % 3600 / 60)}m`);
  if (missing.length) console.log(`! ${missing.length} without a length: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '…' : ''}`);
}
