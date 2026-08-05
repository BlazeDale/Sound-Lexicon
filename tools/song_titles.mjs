#!/usr/bin/env node
/*
 * Vocal Timbre Library — Suno song-title fetcher.
 *   node tools/song_titles.mjs           fetch titles for demos that lack one
 *   node tools/song_titles.mjs --all     re-fetch every demo (titles can be renamed)
 *   node tools/song_titles.mjs --check   exit 1 if any demo is missing a title
 *
 * data.js stores only song UUIDs; the title lives on Suno. This scrapes the
 * og:title off each song page and rewrites the SONG_TITLES block in data.js
 * (between the markers below). The page feeds those titles into the search
 * blob, so "search by song name" works — see cardHTML() in the HTML.
 *
 * Suno's page is not CORS-readable, so this has to run here, not in the browser.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadData } from './build.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'data.js');

export const MARK_BEGIN = '/* BEGIN GENERATED — Suno song titles · run: node tools/song_titles.mjs */';
export const MARK_END = '/* END GENERATED */';

const CONCURRENCY = 6;
const UUID = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

/* every song id in LIB order (mirrors sunoIds() in the HTML) */
export function songIds(LIB) {
  const out = [];
  for (const v of LIB) {
    const s = v.suno;
    if (!s) continue;
    const raw = typeof s === 'string' ? [s] : Array.isArray(s) ? s : [s.f, s.m];
    for (const r of raw.filter(Boolean)) {
      const m = String(r).match(UUID);
      if (m && !out.includes(m[0])) out.push(m[0]);
    }
  }
  return out;
}

const decode = s => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

async function fetchTitle(uuid, tries = 2) {
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(`https://suno.com/song/${uuid}`, {
        headers: { 'user-agent': 'Mozilla/5.0 (vocal-timbre-library title fetch)' },
        signal: AbortSignal.timeout(20000)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      const m = html.match(/<meta\s+property="og:title"\s+content="([^"]*)"/i)
        || html.match(/<title>([^<]*)<\/title>/i);
      const t = m ? decode(m[1]).replace(/\s+\|\s*Suno\s*$/i, '').trim() : '';
      if (!t || /^suno$/i.test(t)) return null;   // private / deleted / generic
      return t;
    } catch (e) {
      if (i === tries - 1) { console.warn(`  ! ${uuid}: ${e.message}`); return null; }
    }
  }
}

/* run `fn` over items, CONCURRENCY at a time */
async function pool(items, fn) {
  const it = items.entries();
  const workers = Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
    for (const [i, item] of it) await fn(item, i);
  });
  await Promise.all(workers);
}

export function readTitles(src = readFileSync(DATA, 'utf8')) {
  const b = src.indexOf(MARK_BEGIN), e = src.indexOf(MARK_END);
  if (b < 0 || e < 0) return {};
  const body = src.slice(b + MARK_BEGIN.length, e);
  const out = {};
  for (const m of body.matchAll(/'([0-9a-f-]{36})'\s*:\s*'((?:[^'\\]|\\.)*)'/g)) {
    out[m[1]] = m[2].replace(/\\(['\\])/g, '$1');
  }
  return out;
}

function renderBlock(ids, titles) {
  const lines = ids.filter(id => titles[id]).map(id => `  '${id}': '${String(titles[id]).replace(/([\\'])/g, '\\$1')}',`);
  return [
    MARK_BEGIN,
    '/* Suno demo song titles, keyed by song UUID — fetched from Suno, not hand-edited.',
    ' * Fed into each card\'s search blob so a song name finds its entry. */',
    'const SONG_TITLES = {',
    ...lines,
    '};',
    MARK_END
  ].join('\n');
}

/* ---------- CLI (guarded so validate.mjs can import readTitles/songIds) ---------- */
if (process.argv[1] && process.argv[1].endsWith('song_titles.mjs')) {
  const all = process.argv.includes('--all');
  const check = process.argv.includes('--check');

  const { LIB } = loadData();
  const ids = songIds(LIB);
  let src = readFileSync(DATA, 'utf8');
  const titles = readTitles(src);

  if (check) {
    const missing = ids.filter(id => !titles[id]);
    if (missing.length) {
      console.log(`✗ ${missing.length}/${ids.length} demo song(s) missing a title — run: node tools/song_titles.mjs`);
      console.log(`  ${missing.slice(0, 10).join('\n  ')}${missing.length > 10 ? `\n  …and ${missing.length - 10} more` : ''}`);
      process.exit(1);
    }
    console.log(`✓ all ${ids.length} demo songs have titles`);
    process.exit(0);
  }

  const todo = all ? ids : ids.filter(id => !titles[id]);
  console.log(`${ids.length} demo song(s); fetching ${todo.length}…`);

  let done = 0, got = 0;
  await pool(todo, async id => {
    const t = await fetchTitle(id);
    done++;
    if (t) { titles[id] = t; got++; }
    if (done % 25 === 0 || done === todo.length) console.log(`  ${done}/${todo.length}`);
  });

  const block = renderBlock(ids, titles);
  if (src.includes(MARK_BEGIN)) {
    const b = src.indexOf(MARK_BEGIN), e = src.indexOf(MARK_END) + MARK_END.length;
    src = src.slice(0, b) + block + src.slice(e);
  } else {
    // first run: park it right after LIB (before STUDY_META / at end of file)
    const anchor = src.indexOf('\n/* Study-level notes');
    src = anchor > 0 ? src.slice(0, anchor) + '\n' + block + '\n' + src.slice(anchor) : src.trimEnd() + '\n\n' + block + '\n';
  }
  writeFileSync(DATA, src, 'utf8');

  const missing = ids.filter(id => !titles[id]);
  console.log(`wrote ${Object.keys(titles).length} title(s) to data.js (${got} fetched this run)`);
  if (missing.length) console.log(`! ${missing.length} still untitled (private/deleted?): ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '…' : ''}`);
}
