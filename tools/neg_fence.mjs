#!/usr/bin/env node
/*
 * The voice fence: the opening of a negative, read off the lead's place on the timbre map.
 *
 *   node tools/neg_fence.mjs "<style line>"        suggest a fence for one style
 *   node tools/neg_fence.mjs --entry 4             suggest one for a library entry (and show its neg)
 *   node tools/neg_fence.mjs --json <file.json>    a {seed:{style,neg}} or a single {style,neg} file
 *
 * WHY. The library's strongest negatives spend about 40% of their terms on the voice, and
 * on NEAR misses: the timbres right next to the lead that it can actually slide into
 * (#4: crooning, rasp, falsetto, vibrato, melisma, breathy). Lab negatives drifted to
 * genre fencing and to far extremes the song would never reach ("screamed metal vocal"
 * on a soft soprano), which fence nothing. A lead drifts to its NEIGHBOURS, so the fence
 * is built from the neighbours: the register words a step or two above and below where
 * the style puts the voice, the grit words a step or two rougher and cleaner, and the
 * delivery habits that live in that corner of the map.
 *
 * It reads the lead through tools/timbre.mjs, the same reader the library map uses, so a
 * style that names no register or grit gets told so instead of a guessed fence. It never
 * proposes anything the style asks for anywhere, so a duet partner's register, or a device
 * like "whistle-register flourishes", is never negated. The output is a suggestion: the
 * writer keeps the terms that fit the song and adds that style's own drift targets after.
 */
import { readFileSync } from 'node:fs';
import { derive, vocalClause, loadLib } from './timbre.mjs';

/* Neg-ready tags along each axis. `re` is what counts as the style already asking for it. */
const REG_TAGS = [
  { at: 1.5, tag: 'bass vocal', re: /\bbass (?:vocal|voice|singer)\b|\bbasso\b/i },
  { at: 2.5, tag: 'baritone', re: /\bbaritone\b/i },
  { at: 3,   tag: 'contralto', re: /\bcontralto\b/i },
  { at: 4,   tag: 'alto', re: /\balto\b/i },
  { at: 5.5, tag: 'mezzo', re: /\bmezzo\b/i },
  { at: 6,   tag: 'tenor', re: /\btenor\b/i },
  { at: 8,   tag: 'head-voice flip', re: /\bhead[- ]voice\b/i },
  { at: 8.5, tag: 'falsetto', re: /\bfalsetto\b/i },
  { at: 8.5, tag: 'soprano', re: /\bsoprano\b/i },
  { at: 9.5, tag: 'whistle register', re: /\bwhistl\w+ (?:register|harmonic|tone)s?\b/i },
];
const GRIT_TAGS = [
  { at: 0.6, tag: 'glassy pristine tone', re: /\b(pristine|glassy|crystalline|silken)\b/i },
  { at: 1.2, tag: 'polished clean tone', re: /\b(polished|clean|smooth)\b/i },
  { at: 1.6, tag: 'breathy whisper', re: /\b(breathy|airy|whisper\w*)\b/i },
  { at: 2.5, tag: 'velvet croon', re: /\b(velvet\w*|croon\w*)\b/i },
  { at: 4,   tag: 'nasal twang', re: /\b(nasal|pinched|reedy|twang\w*)\b/i },
  { at: 5,   tag: 'husky smoke', re: /\b(husky|smoky)\b/i },
  { at: 5.5, tag: 'cracked worn tone', re: /\b(cracked?|worn|weathered|frayed)\b/i },
  { at: 6.8, tag: 'rasp', re: /\b(rasp\w*|gravel\w*|hoarse|rough)\b/i },
  { at: 8,   tag: 'growl', re: /\b(growl\w*|snarl\w*|bark\w*|throaty)\b/i },
  { at: 9.2, tag: 'screamed vocal', re: /\b(scream\w*|shriek\w*|harsh|distorted)\b/i },
];
/* Delivery habits that sit in each corner. Effort and ornament, not timbre, so they live off
   the map, but they are the drifts Suno actually makes there. Each fires on a zone. */
const DELIVERY = [
  { tag: 'belting',               when: (r, g) => g <= 3,            re: /\bbelt\w*\b/i },
  { tag: 'diva melisma runs',     when: (r, g) => r >= 5 && g <= 3,  re: /\b(melisma\w*|runs)\b/i },
  { tag: 'heavy vibrato',         when: (r, g) => g <= 3,            re: /\bvibrato\b/i },
  { tag: 'chipmunk pitch-shift',  when: (r, g) => r >= 7,            re: /\b(chipmunk|pitch-shift\w*|pitched-up)\b/i },
  { tag: 'operatic tone',         when: (r, g) => g <= 2.5 && (r <= 3.5 || r >= 8), re: /\boperatic\b|\bopera\b/i },
  { tag: 'chest-voice shout',     when: (r, g) => r >= 5 && g <= 4,  re: /\bshout\w*\b/i },
  { tag: 'glossy autotune',       when: (r, g) => g <= 4,            re: /\bauto-?tune\w*\b/i },
  { tag: 'polished pop sheen',    when: (r, g) => g >= 5,            re: /\bpop sheen\b|\bpolished\b/i },
  { tag: 'mumbled delivery',      when: (r, g) => g >= 4.5 && r <= 4, re: /\bmumbl\w*\b/i },
];

/* How far a neighbour may sit. Inside NEAR it is the lead itself, past FAR it is no longer a
   drift anybody needs to fence. Register NEAR is wide on purpose: negating "contralto" on an
   alto, or "mezzo" on an alto, fences the lead's own voice, because the model does not split
   adjacent voice types that finely. A register fence is a guard against the voice jumping a
   CLASS (an alto lead turning tenor, a baritone turning mezzo), which is also what a
   substituted singer sounds like. */
const REG_NEAR = 1.8, REG_FAR = 4.6;
const GRIT_NEAR = 0.9, GRIT_FAR = 3.0;

export function fence(style) {
  const d = derive({ style });
  const clause = vocalClause(style);
  /* Register words are checked against the whole style, since they only ever describe a
     voice (and a duet partner's register is often a sentence away from the lead's). Grit and
     delivery words are checked against the voice sentences only: "growls" in the bass
     sentence is a synth, and must not stop the fence naming a growled vocal. */
  const voiceText = style.split(/(?<=[.;])s+/)
    .filter(x => /(vocalw*|voices?|singw*|sung|duet|partner|answerw*|harmonw*|choir|ad-?libs?|lead is|delivery)/i.test(x)).join(' ') || clause;
  const asks = t => (REG_TAGS.includes(t) ? style : voiceText).match(t.re);
  const out = { r: d.r, g: d.g, rk: d.rk, gk: d.gk, clause, reg: [], grit: [], delivery: [], skipped: [] };
  if (!d.rk && !d.gk) return out;

  const near = (list, at, lo, hi) => list
    .map(t => ({ ...t, dist: Math.abs(t.at - at), dir: t.at > at ? 'up' : 'down' }))
    .filter(t => t.dist >= lo && t.dist <= hi)
    .filter(t => { if (asks(list.find(x => x.tag === t.tag))) { out.skipped.push(t.tag); return false; } return true; })
    .sort((a, b) => a.dist - b.dist);

  if (d.rk) {
    const n = near(REG_TAGS, d.r, REG_NEAR, REG_FAR);
    // one step each way rather than the two nearest on one side
    for (const dir of ['up', 'down']) { const t = n.find(x => x.dir === dir); if (t) out.reg.push(t); }
  }
  if (d.gk) {
    const n = near(GRIT_TAGS, d.g, GRIT_NEAR, GRIT_FAR);
    const rougher = n.filter(x => x.dir === 'up').slice(0, 2), cleaner = n.filter(x => x.dir === 'down').slice(0, 1);
    out.grit.push(...rougher, ...cleaner);
  }
  const r = d.rk ? d.r : 5, g = d.gk ? d.g : 5;
  for (const t of DELIVERY) if (t.when(r, g)) { if (asks(t)) out.skipped.push(t.tag); else out.delivery.push(t); }
  return out;
}

/* The fence itself: the two nearest grit drifts lead (tone is what drifts most audibly), then
   register, then the zone's delivery habits, capped so the song's own terms still have room. */
export function fenceTerms(f, cap = 6) {
  const terms = [...f.grit.slice(0, 2), ...f.reg, ...f.grit.slice(2), ...f.delivery].map(t => t.tag);
  return [...new Set(terms)].slice(0, cap);
}

function report(label, style, neg) {
  const f = fence(style);
  console.log(`\n${label}`);
  console.log(`  lead: register ${f.rk ? f.r : '?'}  grit ${f.gk ? f.g : '?'}   "${f.clause.slice(0, 110)}${f.clause.length > 110 ? '…' : ''}"`);
  if (!f.rk && !f.gk) { console.log('  ! the vocal clause names no register or grit word, so there is no place on the map to fence around. Fix the style first.'); return; }
  if (!f.rk) console.log('  ! no register word: the register half of the fence is missing');
  if (!f.gk) console.log('  ! no grit word: the grit half of the fence is missing');
  const why = t => `${t.tag} (${t.dir ? t.dir + ' ' + t.dist.toFixed(1) : 'zone'})`;
  console.log(`  grit drift:     ${f.grit.map(why).join(', ') || '-'}`);
  console.log(`  register drift: ${f.reg.map(why).join(', ') || '-'}`);
  console.log(`  delivery drift: ${f.delivery.map(t => t.tag).join(', ') || '-'}`);
  if (f.skipped.length) console.log(`  not proposed, the style asks for it: ${[...new Set(f.skipped)].join(', ')}`);
  console.log(`  FENCE: ${fenceTerms(f).join(', ')}`);
  if (neg) console.log(`  current neg: ${neg}`);
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/').replace(/^(?=[A-Za-z]:)/, '/')}`) {
  const [a, b] = process.argv.slice(2);
  if (!a) { console.error('usage: neg_fence.mjs "<style>" | --entry <n> | --json <file>'); process.exit(1); }
  if (a === '--entry') {
    const e = loadLib().find(x => String(x.n ?? x.id) === String(b));
    if (!e) throw new Error(`no entry ${b}`);
    report(`#${b}`, e.style, e.neg);
  } else if (a === '--json') {
    const j = JSON.parse(readFileSync(b, 'utf8'));
    if (j.style) report(j.folder || b, j.style, j.neg);
    else for (const [k, v] of Object.entries(j)) report(k, v.style, v.neg);
  } else report('style', a);
}
