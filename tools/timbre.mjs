#!/usr/bin/env node
/*
 * Register & grit, derived from each prompt's own words — never hand-scored.
 *
 *   node tools/timbre.mjs           regenerate the TIMBRE block in data.js
 *   node tools/timbre.mjs --check   exit 1 if the block is out of sync (used by validate)
 *   node tools/timbre.mjs --report  print what each entry resolved to, and why
 *
 * The two axes:
 *   register — where the voice sits, low(0) → high(10)
 *   grit     — how rough the tone is, clean(0) → torn(10)
 * They are independent: #12 is low+smooth, #97 low+rough, #125 high+smooth, #19 high+rough.
 *
 * Only the sentence describing the VOICE is read, so "warm" counts when it describes the
 * lead and is ignored when it describes the room. An axis whose prompt says nothing
 * resolves to NEUTRAL (5) with its known-flag false — the page draws that as unspecified
 * rather than as a claim the prompt never made.
 *
 * Two rules learned from validating this against the 100 legacy hand scores
 * (register r=0.90, grit r=0.81 — see tools/README.md):
 *   1. negation is read     — "no grit" / "without rasp" means smooth, not rough
 *   2. volume is not grit   — shouted/belted/pushed-hard describe effort, not roughness,
 *                             so those words are deliberately absent from the lexicon
 *
 * Rule 2 generalised (2026-08-09 vocabulary audit): a word only earns a place here if it
 * DENOTES pitch placement or tonal roughness. Words that merely correlate with one are
 * excluded, even when they happen to score well — `conversational` and `piercing` were
 * dropped from register (delivery and intensity), `resonant` from grit (resonance is not
 * smoothness). Measured against the answer key the change is a wash (reg r 0.898→0.900,
 * grit 0.805→0.802) and costs 10 entries' coverage — but a hollow "the prompt didn't say"
 * is worth more than a register inferred from a word about delivery, and it keeps the
 * documented prompting vocabulary honest.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DATA = join(ROOT, 'data.js');
export const MARK_BEGIN = '/* BEGIN GENERATED — derived register & grit · run: node tools/timbre.mjs */';
export const MARK_END = '/* END GENERATED TIMBRE */';

export const NEUTRAL = 5;

/* ---------- isolate the sentence describing the voice ---------- */
const STARTS = [
  /a unique and specific vocalist:\s*/i,
  /the lead is[^:]{0,40}:\s*/i,
  /lead (?:male |female )?vocal is\s*/i,
  /lead vocal:\s*/i,
];
/* the prompt moves on to production/instruments here — stop reading */
const STOP = /\b(close(?:-miked)? (?:condenser|dynamic|mic)|vintage \w+ mic|production|produced|recorded|mic(?:rophone)?\b|behind it|around it|the arrangement|drums|guitars?|bass(?:line)?\b|synth|strings|piano|organ|delivery)\b/i;

export function vocalClause(style) {
  const s = String(style || '');
  let tail = null;
  for (const re of STARTS) { const m = s.match(re); if (m) { tail = s.slice(m.index + m[0].length); break; } }
  if (tail === null) {
    const sent = s.split(/(?<=\.)\s+/);
    tail = sent.find(x => /\bvocal|\bvoice\b|\bsung\b|\bsings\b|\brap lead\b|\bthe lead\b/i.test(x)) || s;
  }
  const stop = tail.match(STOP);
  if (stop && stop.index > 40) tail = tail.slice(0, stop.index);
  return tail.split(/(?<=\.)\s+/).slice(0, 2).join(' ');
}

/* ---------- the vocabulary (documented in tools/README.md) ---------- */
const REG = [
  [/\bsubharmonic\b|\bbasso profondo\b|\bprofundo\b|\bsubterranean\b|\bkargyraa\b/i, 0.8],
  [/\bbellow\b|\bcavernous\b/i, 2],
  [/\bbass\b(?!\s*(line|drum))/i, 1.5],
  [/\bbaritone-tenor\b|\bmid-tenor\b/i, 5.5],
  [/\bbaritone\b/i, 2.5],
  [/\bcontralto\b/i, 3],
  [/\bchest-placed low\b|\blow chest\b/i, 2],
  [/\balto\b/i, 4],
  [/\bmid-tone\b|\bmid-register\b|\bmidrange\b|\bmid-placed\b|\bmiddle register\b|\bspeech range\b/i, 5],
  [/\bmezzo\b/i, 5.5],
  [/\btenor\b/i, 6],
  [/\bhigh\b|\bpitched high\b|\btop notes\b|\bupper register\b/i, 7.5],
  [/\bcountertenor\b|\bhead voice\b|\bhead-voice\b/i, 8],
  [/\bshriek\w*\b/i, 8.5],
  [/\bfalsetto\b/i, 8.5],
  [/\bsoprano\b/i, 8.5],
  [/\bwhistl\w+ (?:register|harmonic)\b/i, 9.5],
];
const GRIT = [
  [/\bpristine\b|\bpure\b|\bglassy\b|\bsilken\b|\bcrystalline\b|\bchoirboy\b|\bbuttered\b/i, 0.6],
  [/\bclean\b|\bclear\b|\bsmooth\b(?!ing)|\bpolished\b/i, 1.2],
  [/\bbreathy\b|\bairy\b|\bfeathery\b|\bwhisper\w*\b/i, 1.6],
  [/\bsoft\b|\bgentle\b|\btender\b/i, 1.8],
  [/\bwarm\b|\bround\b|\bvelvet\w*\b/i, 2.5],
  [/\bnasal\b|\bpinched\b|\breedy\b|\badenoidal\b/i, 4],
  [/\bhusky\b|\bsmoky\b|\bwoody\b/i, 5],
  [/\bweathered\b|\bworn\b|\bfrayed\b|\bcracked?\b|\bcreak\w*\b|\bcrying edge\b/i, 5.5],
  [/\bgrain\w*\b|\bgritty\b|\bgrit\b|\bsandy\b|\bbuzz\w*\b/i, 6.2],
  [/\brasp\w*\b|\bgravel\w*\b|\bhoarse\b|\brough\b/i, 6.8],
  [/\bgrowl\w*\b|\bsnarl\w*\b|\bbark\w*\b|\bthroaty\b|\bthroat-torn\b|\bbellow\b/i, 8],
  [/\bdistorted\b|\bshred\w*\b|\bscream\w*\b|\bshriek\w*\b|\bguttural\b|\bharsh\b/i, 9.2],
];

/* rule 1: a descriptor negated just before it doesn't count ("no cry and no grit") */
const NEG = /\b(no|not|never|without|free of|lacking|nothing)\s+(?:\w+\s+){0,2}$/i;
const hits = (t, table) => table.filter(([re]) => {
  const m = t.match(re);
  if (!m) return false;
  return !NEG.test(t.slice(Math.max(0, m.index - 24), m.index));
}).map(([, v]) => v);

/* ---------- genre rollup — placement from the entry's own fam, else its opening clause ---------- */
export const ROLLUP = [
  ['Metal & heavy',         /\bmetal\b|metalcore|post-metal|sludge|doom|hardcore|screamo|grind/i],
  ['Hip-hop & rap',         /hip-hop|\brap\b|trap\b|crunk|turntabl|boom-bap|drill|grime|toaster|deejay/i],
  ['Electronic & club',     /techno|house\b|electro|synth|trance|jungle|drum and bass|\bdnb\b|garage\b|breaks|disco|darkwave|minimal wave|industrial|hardstyle|psytrance|rave|club|idm|dubstep|riddim|\bbass\b/i],
  ['Ambient & atmospheric', /ambient|sleep|drone|soundscape|atmospher|new age/i],
  ['Soul, funk & R&B',      /soul\b|funk|r&b|motown|lovers-rock/i],
  ['Sacred & choral',       /sacred|gospel|choir|choral|qawwali|hymn|liturg|early music|plainchant|opera|art song|overtone|throat/i],
  ['Jazz & lounge',         /jazz|swing|lounge|cabaret|crooner|bossa|exotica/i],
  ['Folk, country & roots', /folk|country|americana|bluegrass|western|maritime|neofolk|\bblues\b|delta|appalach/i],
  ['World & traditional',   /reggae|\bska\b|dub\b|dancehall|gnawa|arabic|mexican|calypso|highlife|afrobeat|celtic|nordic|balkan|klezmer/i],
  ['Rock & guitar',         /rock|punk|grunge|shoegaze|indie|garage|britpop|emo|psych|stadium|arena/i],
  ['Pop & vocal',           /\bpop\b|vocal|ballad|chanson|torch/i],
  ['Spoken & narration',    /spoken|narration|talk|sprechgesang|monologue|poetry|valspeak/i],
];
export function genreOf(entry) {
  const fam = entry.fam || '';
  const opening = String(entry.style || '').split(/[,.:]/)[0];   // the prompt's own first clause
  // An inspiration study's `fam` names the STUDY, and its roots are deliberately different
  // genres — so for those the entry's own opening clause wins and the fam is only a fallback.
  const order = entry.cat === 'inspiration' ? [opening, fam] : [fam, opening];
  for (const text of order) for (const [g, re] of ROLLUP) if (re.test(text)) return g;
  return 'Other';
}

/* ---------- derive ---------- */
const avg = a => a.reduce((x, y) => x + y, 0) / a.length;
const r1 = v => Math.round(v * 10) / 10;

export function derive(entry) {
  const clause = vocalClause(entry.style);
  const r = hits(clause, REG), g = hits(clause, GRIT);
  return {
    r:  r.length ? r1(avg(r)) : NEUTRAL,          // register: average of what's named
    g:  g.length ? r1(Math.max(...g)) : NEUTRAL,  // grit: the roughest thing named wins
    rk: r.length > 0,                             // did the prompt actually say?
    gk: g.length > 0,
    genre: genreOf(entry),
  };
}

/* ---------- generated block ---------- */
export function loadLib(dataPath = DATA) {
  return new Function(readFileSync(dataPath, 'utf8') + '; return LIB;')();
}
const keyOf = v => String(v.n);

export function renderBlock(LIB) {
  const lines = LIB.map(v => {
    const d = derive(v);
    return `  '${keyOf(v)}': {r:${d.r},g:${d.g},rk:${d.rk ? 1 : 0},gk:${d.gk ? 1 : 0},z:'${d.genre.replace(/'/g, "\\'")}'},`;
  });
  return [
    MARK_BEGIN,
    `/* Register & grit read off each prompt's vocal sentence — NOT hand-scored, do not edit.`,
    ` * r/g = 0-10 (5 = neutral); rk/gk = 1 when the prompt actually named that axis; z = genre family.`,
    ` * Regenerate after any style edit: node tools/timbre.mjs */`,
    'const TIMBRE = {',
    ...lines,
    '};',
    MARK_END,
  ].join('\n');
}

export function writeBlock(dataPath = DATA) {
  const src = readFileSync(dataPath, 'utf8');
  const LIB = loadLib(dataPath);
  const block = renderBlock(LIB);
  const i = src.indexOf(MARK_BEGIN), j = src.indexOf(MARK_END);
  const next = (i !== -1 && j !== -1)
    ? src.slice(0, i) + block + src.slice(j + MARK_END.length)
    : src.trimEnd() + '\n\n' + block + '\n';
  if (next === src) return false;
  writeFileSync(dataPath, next, 'utf8');
  return true;
}

export function checkInSync(dataPath = DATA) {
  const src = readFileSync(dataPath, 'utf8');
  const i = src.indexOf(MARK_BEGIN), j = src.indexOf(MARK_END);
  if (i === -1 || j === -1) return false;
  return src.slice(i, j + MARK_END.length) === renderBlock(loadLib(dataPath));
}

/* ---------- CLI ---------- */
if (process.argv[1] && process.argv[1].endsWith('timbre.mjs')) {
  const arg = process.argv[2];
  const LIB = loadLib();
  if (arg === '--check') {
    if (checkInSync()) { console.log('TIMBRE block in sync'); }
    else { console.log('TIMBRE block OUT OF SYNC — run: node tools/timbre.mjs'); process.exit(1); }
  } else if (arg === '--report') {
    let both = 0, neither = 0;
    for (const v of LIB) {
      const d = derive(v);
      if (d.rk && d.gk) both++; if (!d.rk && !d.gk) neither++;
      console.log(`#${String(v.n).padStart(3)}  reg ${String(d.r).padStart(4)}${d.rk ? ' ' : '~'} grit ${String(d.g).padStart(4)}${d.gk ? ' ' : '~'}  ${d.genre.padEnd(22)} ${v.name}`);
    }
    console.log(`\n${LIB.length} entries · both axes named ${both} · neither named ${neither} (~ = neutral, prompt didn't say)`);
  } else {
    const changed = writeBlock();
    const n = LIB.length, neither = LIB.filter(v => { const d = derive(v); return !d.rk && !d.gk; }).length;
    console.log(changed ? `regenerated TIMBRE for ${n} entries` : `TIMBRE already up to date (${n} entries)`);
    console.log(`${n - neither}/${n} entries name at least one axis; ${neither} read fully neutral`);
  }
}
