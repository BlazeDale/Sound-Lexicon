#!/usr/bin/env node
/*
 * Fold listening-pass approvals back into lexicon_data.js.
 *
 *   node tools/approvals.mjs --pull            read the shared Firebase path
 *   node tools/approvals.mjs approvals.json    apply an exported file
 *   node tools/approvals.mjs --paste           read the exported JSON from stdin
 *   ... add --dry to preview without writing
 *
 * The page records approvals live (Firebase when the rule exists, this browser
 * otherwise) so a judgement can be made mid-listen. But the repo stays the source of
 * truth for anything published — it is the only copy validate.mjs can check and the
 * only one that survives a cleared browser. This is the bridge between the two.
 *
 * Input shape, as produced by the page's "Copy for sync" button:
 *   { "<cardId>": { "<entry>": "approved" | "rejected" | "candidate" } }
 *
 * Edits are surgical: only the `state:` token on the matching evidence line changes,
 * so prose, comments and formatting are left exactly as they were.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LEXDATA = join(ROOT, 'lexicon_data.js');
const DB = 'https://vocal-timbre-library-default-rtdb.firebaseio.com';
const STATES = ['candidate', 'approved', 'rejected'];

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const rest = args.filter(a => a !== '--dry');

const readStdin = () => new Promise(res => {
  let s = ''; process.stdin.setEncoding('utf8');
  process.stdin.on('data', d => s += d).on('end', () => res(s));
});

async function getApprovals() {
  if (rest.includes('--pull')) {
    const r = await fetch(`${DB}/lex_appr.json`);
    const j = await r.json();
    if (j && j.error) {
      console.error(`✗ shared read refused: ${j.error}`);
      console.error(`  The database has no rule for lex_appr yet. Either add one in the`);
      console.error(`  Firebase console, or use the page's "Copy for sync" button and run:`);
      console.error(`    node tools/approvals.mjs --paste`);
      process.exit(1);
    }
    return j || {};
  }
  const file = rest.find(a => !a.startsWith('--'));
  const raw = file ? readFileSync(file, 'utf8') : await readStdin();
  if (!raw.trim()) { console.error('✗ no input — paste the exported JSON, or pass a file path'); process.exit(1); }
  try { return JSON.parse(raw); }
  catch (e) { console.error(`✗ could not parse input as JSON: ${e.message}`); process.exit(1); }
}

const appr = await getApprovals();

/* validate the payload before touching the file */
{
  const bad = [];
  for (const [card, entries] of Object.entries(appr))
    for (const [n, st] of Object.entries(entries || {}))
      if (!STATES.includes(st)) bad.push(`${card}/${n} = "${st}"`);
  if (bad.length) { console.error(`✗ unknown state(s): ${bad.join(', ')}`); process.exit(1); }
}

const total = Object.values(appr).reduce((a, o) => a + Object.keys(o || {}).length, 0);
if (!total) { console.log('Nothing to apply — no approvals recorded yet.'); process.exit(0); }

/* ---------- apply, line by line ----------
   Evidence is written one item per line in lexicon_data.js, which is what makes a
   surgical edit safe here. If that ever changes, this tool must change with it. */
const src = readFileSync(LEXDATA, 'utf8');
const lines = src.split(/\r?\n/);
const CARD_ID = /^\s*id:\s*'([a-z0-9-]+)'\s*,/;
const EV = /^(\s*\{\s*n:\s*(?:'([^']+)'|(\d+))\s*,.*?state:\s*')([a-z]+)(')/;

let card = null, changed = 0, already = 0;
const seen = new Set(), log = [];

for (let i = 0; i < lines.length; i++) {
  const idm = lines[i].match(CARD_ID);
  if (idm) { card = idm[1]; continue; }
  const m = lines[i].match(EV);
  if (!m || !card) continue;
  const n = m[2] ?? m[3];
  const want = (appr[card] || {})[n];
  if (!want) continue;
  seen.add(`${card}/${n}`);
  if (m[4] === want) { already++; continue; }
  lines[i] = lines[i].replace(EV, `$1${want}$5`);
  log.push(`  ${card} #${n}: ${m[4]} → ${want}`);
  changed++;
}

/* anything in the payload we could not place is a real problem, not a rounding error */
const missed = [];
for (const [c, entries] of Object.entries(appr))
  for (const n of Object.keys(entries || {}))
    if (!seen.has(`${c}/${n}`)) missed.push(`${c}/${n}`);

if (log.length) console.log(log.join('\n'));
if (missed.length) console.log(`\n! ${missed.length} approval(s) matched no evidence line: ${missed.join(', ')}`);
console.log(`\n${changed} changed, ${already} already correct, ${missed.length} unmatched (of ${total}).`);

if (dry) { console.log('\n--dry: nothing written.'); process.exit(0); }
if (changed) {
  writeFileSync(LEXDATA, lines.join('\n'), 'utf8');
  console.log(`\nWrote lexicon_data.js. Now run: node tools/validate.mjs`);
}
process.exit(missed.length ? 1 : 0);
