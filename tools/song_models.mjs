#!/usr/bin/env node
/*
 * Vocal Timbre Library — Suno demo model-version fetcher.
 *   node tools/song_models.mjs           fetch the model for demos that lack one
 *   node tools/song_models.mjs --all     re-fetch every demo
 *   node tools/song_models.mjs --check   exit 1 if any demo is missing a model
 *
 * Every verdict in this library is a claim about ONE generator. Suno retired the
 * whole pre-v6 line on 2026-09-09, so a demo that doesn't say which model made it
 * is a claim with no subject. Suno stores the answer as `major_model_version` on
 * its public clip endpoint — no auth, no cookies — so this can run from Node like
 * song_titles.mjs, and the stamp is scraped rather than typed by hand.
 *
 * The block it writes is read by the page (tile badge + search blob) and checked
 * by validate.mjs.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadData } from './build.mjs';
import { songIds } from './song_titles.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'data.js');

export const MARK_BEGIN = '/* BEGIN GENERATED — Suno demo model stamps · run: node tools/song_models.mjs */';
export const MARK_END = '/* END GENERATED — model stamps */';

const CONCURRENCY = 6;
const API = id => `https://studio-api.prod.suno.com/api/clip/${id}`;

/* Suno's own label for the generator, e.g. v4.5 / v5 / v5.5 / v6 / v6-wild. */
async function fetchModel(uuid, tries = 2) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(API(uuid), {
        headers: { 'user-agent': 'Mozilla/5.0 (vocal-timbre-library model fetch)' },
        signal: AbortSignal.timeout(20000)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const j = await res.json();
      /* `major_model_version` says plain "v6" for BOTH v6 and v6-wild — the only
       * place the two are told apart is the row badge, so prefer it and fall back. */
      const badge = String(j?.metadata?.model_badges?.songrow?.display_name || '').trim().toLowerCase();
      const m = /^v[0-9.]+(-[a-z]+)?$/i.test(badge) ? badge : String(j.major_model_version || '').trim();
      return /^v[0-9.]+(-[a-z]+)?$/i.test(m) ? m : null;
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

export function readModels(src = readFileSync(DATA, 'utf8')) {
  const b = src.indexOf(MARK_BEGIN), e = src.indexOf(MARK_END);
  if (b < 0 || e < 0) return {};
  const body = src.slice(b + MARK_BEGIN.length, e);
  const out = {};
  for (const m of body.matchAll(/'([0-9a-f-]{36})'\s*:\s*'([^']*)'/g)) out[m[1]] = m[2];
  return out;
}

function renderBlock(ids, models) {
  const lines = ids.filter(id => models[id]).map(id => `  '${id}': '${models[id]}',`);
  return [
    MARK_BEGIN,
    '/* Which Suno model generated each demo, keyed by song UUID — read off Suno,',
    ' * not hand-edited. A verdict is a claim about one generator; this says which.',
    ' * The tile prints it and the card search blob folds it in, so searching "v6"',
    ' * finds every take from the new line. */',
    'const SONG_MODEL = {',
    ...lines,
    '};',
    MARK_END
  ].join('\n');
}

/* ---------- CLI (guarded so validate.mjs can import readModels) ---------- */
if (process.argv[1] && process.argv[1].endsWith('song_models.mjs')) {
  const all = process.argv.includes('--all');
  const check = process.argv.includes('--check');

  const { LIB } = loadData();
  const ids = songIds(LIB);
  let src = readFileSync(DATA, 'utf8');
  const models = readModels(src);

  if (check) {
    const missing = ids.filter(id => !models[id]);
    if (missing.length) {
      console.log(`✗ ${missing.length}/${ids.length} demo(s) missing a model stamp — run: node tools/song_models.mjs`);
      console.log(`  ${missing.slice(0, 10).join('\n  ')}${missing.length > 10 ? `\n  …and ${missing.length - 10} more` : ''}`);
      process.exit(1);
    }
    console.log(`✓ all ${ids.length} demos carry a model stamp`);
    process.exit(0);
  }

  const todo = all ? ids : ids.filter(id => !models[id]);
  console.log(`${ids.length} demo song(s); fetching ${todo.length}…`);

  let done = 0, got = 0;
  await pool(todo, async id => {
    const m = await fetchModel(id);
    done++;
    if (m) { models[id] = m; got++; }
    if (done % 50 === 0 || done === todo.length) console.log(`  ${done}/${todo.length}`);
  });

  const block = renderBlock(ids, models);
  if (src.includes(MARK_BEGIN)) {
    const b = src.indexOf(MARK_BEGIN), e = src.indexOf(MARK_END) + MARK_END.length;
    src = src.slice(0, b) + block + src.slice(e);
  } else {
    src = src.trimEnd() + '\n\n' + block + '\n';
  }
  writeFileSync(DATA, src, 'utf8');

  const tally = {};
  for (const id of ids) if (models[id]) tally[models[id]] = (tally[models[id]] || 0) + 1;
  console.log(`wrote ${Object.keys(models).length} stamp(s) to data.js (${got} fetched this run)`);
  console.log(`  ${Object.entries(tally).sort().map(([m, n]) => `${m}: ${n}`).join(' · ')}`);
  const missing = ids.filter(id => !models[id]);
  if (missing.length) console.log(`! ${missing.length} unstamped (private/deleted?): ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '…' : ''}`);
}
