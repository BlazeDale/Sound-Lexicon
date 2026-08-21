#!/usr/bin/env node
/*
 * Terminology Lessons — loader and invariant checks for lexicon_data.js.
 *
 *   node tools/lexicon.mjs        run the checks standalone (also run by validate.mjs)
 *
 * The invariant that matters most here is the highlight span (design doc §6): every
 * evidence item records the LITERAL phrase as it appears in that entry's prompt, and
 * this file fails if the phrase is not actually there. That is what stops a card from
 * quietly claiming to demonstrate a term the prompt never contained — the one failure
 * mode that would rot the page's credibility without ever looking broken.
 *
 * Spans are literals rather than character offsets on purpose: offsets go silently
 * wrong the moment a prompt is edited, and a prompt edit is a normal thing to do.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { loadData } from './build.mjs';
import { loadHashes, findDenied } from './denylist.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LEXDATA = join(ROOT, 'lexicon_data.js');

const STATES = ['candidate', 'approved', 'rejected'];
const VERDICTS = ['untested', 'resolves', 'partial', 'collapses'];
const KINDS = ['instrument', 'technique'];
const NATURES = ['continuous', 'momentary'];

export function loadLexicon(path = LEXDATA) {
  const src = readFileSync(path, 'utf8');
  return new Function(src + `\n; return {LEX, DOMAINS, LEX_VERSION, LEX_UPDATED};`)();
}

/* Returns {fails:[], passes:[]} so validate.mjs can fold these into its own report. */
export function checkLexicon() {
  const fails = [], passes = [];
  const fail = m => fails.push(m), pass = m => passes.push(m);

  let LEX, DOMAINS, LEX_VERSION, LEX_UPDATED;
  try {
    ({ LEX, DOMAINS, LEX_VERSION, LEX_UPDATED } = loadLexicon());
    pass(`loaded lexicon_data.js (${LEX.length} term cards, ${DOMAINS.length} domains)`);
  } catch (e) {
    fail(`could not load lexicon_data.js: ${e.message}`);
    return { fails, passes };
  }

  const { LIB } = loadData();
  const byN = new Map(LIB.map(v => [String(v.n ?? v.id), v]));
  const domainIds = new Set(DOMAINS.map(d => d.id));

  /* ---------- ids unique and URL-safe (deep links depend on these being stable) ---------- */
  {
    const seen = new Set(), dupes = [], bad = [];
    for (const c of LEX) {
      if (!/^[a-z0-9-]+$/.test(c.id || '')) bad.push(`"${c.id}"`);
      seen.has(c.id) ? dupes.push(c.id) : seen.add(c.id);
    }
    dupes.length ? fail(`duplicate card ids: ${dupes.join(', ')}`) : pass(`${LEX.length} card ids unique`);
    if (bad.length) fail(`card id not URL-safe (breaks deep links): ${bad.join(', ')}`);
  }

  /* ---------- required prose fields; a card is a lesson, not a stub ---------- */
  {
    const need = ['term', 'gloss', 'myth', 'known', 'origin', 'range'];
    const thin = [];
    for (const c of LEX) {
      const missing = need.filter(f => !(c[f] || '').trim());
      if (missing.length) thin.push(`${c.id} (${missing.join(', ')})`);
      if (!Array.isArray(c.syn) || !c.syn.length) thin.push(`${c.id} (no synonym ring — lay search depends on it)`);
    }
    thin.length ? fail(`incomplete card(s): ${thin.join('; ')}`) : pass(`all cards carry gloss, misconception, known-for, origin, range and synonyms`);
  }

  /* ---------- taxonomy: parents resolve, kinds and nature legal ---------- */
  {
    const bad = [];
    for (const c of LEX) {
      if (!Array.isArray(c.domains) || !c.domains.length) bad.push(`${c.id} has no domain`);
      for (const d of c.domains || []) if (!domainIds.has(d)) bad.push(`${c.id} → unknown domain "${d}"`);
      if (!Array.isArray(c.kinds) || !c.kinds.length) bad.push(`${c.id} has no kind`);
      for (const k of c.kinds || []) if (!KINDS.includes(k)) bad.push(`${c.id} → unknown kind "${k}"`);
      if (!NATURES.includes(c.nature)) bad.push(`${c.id} → nature must be one of ${NATURES.join('/')}`);
    }
    bad.length ? fail(`taxonomy errors: ${bad.join('; ')}`) : pass(`every card's domains/kinds/nature resolve (multi-parent and dual-kind allowed)`);
    const covered = new Set(LEX.flatMap(c => c.domains));
    const empty = DOMAINS.filter(d => !covered.has(d.id)).map(d => d.name);
    pass(`${covered.size}/${DOMAINS.length} domains have at least one card`
      + (empty.length ? `; still empty: ${empty.join(', ')}` : ''));
  }

  /* ---------- THE SPAN INVARIANT (design doc §6) ----------
     Every recorded span must appear literally in the prompt it points at. */
  {
    const missingEntry = [], missingSpan = [], badState = [];
    let spans = 0;
    for (const c of LEX) {
      if (!Array.isArray(c.ev) || !c.ev.length) continue;      // "not yet demonstrated" is legal
      for (const e of c.ev) {
        const v = byN.get(String(e.n));
        if (!v) { missingEntry.push(`${c.id} → #${e.n}`); continue; }
        if (!STATES.includes(e.state)) badState.push(`${c.id} → #${e.n} ("${e.state}")`);
        const prompt = `${v.style || ''}\n${v.neg || ''}`;
        spans++;
        if (!prompt.includes(e.span)) missingSpan.push(`${c.id} → #${e.n} span "${e.span}"`);
      }
    }
    missingEntry.length
      ? fail(`evidence points at entries not in data.js: ${missingEntry.join(', ')}`)
      : pass(`all evidence resolves to a real library entry`);
    missingSpan.length
      ? fail(`HIGHLIGHT SPAN NOT IN PROMPT — the card would claim a term its prompt never had: ${missingSpan.join('; ')}`)
      : pass(`all ${spans} highlight spans occur literally in their prompts`);
    if (badState.length) fail(`evidence state must be one of ${STATES.join('/')}: ${badState.join(', ')}`);
  }

  /* ---------- discovery vocabulary and corpus reach ----------
     The "more examples" button matches at runtime, so nothing here needs regenerating.
     What CAN rot is the vocabulary: a mistyped stem matches nothing and the card quietly
     stops seeing new prompts. Report both, so growth and drift are visible on every run
     rather than discovered months later. */
  {
    const dead = [], reach = [];
    let stems = 0, unattached = 0;
    for (const c of LEX) {
      const src = (c.match && c.match.length) ? c.match : [...new Set((c.ev || []).map(e => e.span))];
      const bad = src.filter(s => typeof s !== 'string' || !s.trim());
      if (bad.length) fail(`${c.id}: match must be non-empty strings`);
      stems += src.length;
      const low = src.map(s => String(s).toLowerCase());
      const attached = new Set((c.ev || []).map(e => String(e.n)));
      /* Flag a card only when its ENTIRE vocabulary reaches nothing. Individual unused
         variants are deliberate future-proofing — the corpus may only use the hyphenated
         spelling today — and listing them every run would train us to ignore the line,
         which is how a real typo gets through. */
      const anyHit = low.some(s => LIB.some(v => `${v.style || ''}\n${v.neg || ''}`.toLowerCase().includes(s)));
      if (!anyHit) dead.push(`${c.id} (${low.map(s => `"${s}"`).join(', ')})`);
      const more = LIB.filter(v => {
        const id = String(v.n ?? v.id);
        if (attached.has(id) || !(v.suno || []).length) return false;
        const t = `${v.style || ''}\n${v.neg || ''}`.toLowerCase();
        return low.some(s => t.includes(s));
      }).length;
      unattached += more;
      if (more) reach.push(`${c.id} +${more}`);
    }
    pass(`discovery: ${stems} stems; ${unattached} corpus entries reachable but not curated`
      + (reach.length ? ` (${reach.slice(0, 4).join(', ')}${reach.length > 4 ? `, +${reach.length - 4} more cards` : ''})` : ''));
    if (dead.length) fail(`card(s) whose entire discovery vocabulary matches nothing — they will never see a new prompt: ${dead.join("; ")}`);
  }

  /* ---------- verdicts have a shelf life (design doc §8) ----------
     A verdict is about ONE generator version at ONE date. An undated verdict looks
     authoritative while rotting, so it is rejected outright rather than warned about. */
  {
    const bad = [], unstamped = [];
    for (const c of LEX) {
      const r = c.res || {};
      if (!VERDICTS.includes(r.verdict)) bad.push(`${c.id} ("${r.verdict}")`);
      if (r.verdict && r.verdict !== 'untested' && !(r.model && r.date)) unstamped.push(c.id);
      if (!(r.note || '').trim()) bad.push(`${c.id} (no resolution note)`);
    }
    bad.length ? fail(`resolution errors: ${bad.join(', ')}`) : pass(`every card states a resolution verdict with reasoning`);
    unstamped.length
      ? fail(`verdict without a model+date stamp (it would rot silently): ${unstamped.join(', ')}`)
      : pass(`every non-untested verdict carries a model version and date`);
    const tested = LEX.filter(c => c.res.verdict !== 'untested').length;
    pass(`${tested}/${LEX.length} cards carry a tested verdict; ${LEX.length - tested} honestly marked untested`);
  }

  /* ---------- no artist or band names anywhere (design doc §7) ----------
     Origin fields are made of names by nature, so this is the field most likely to leak. */
  {
    const hashes = loadHashes();
    if (!hashes.size) { fail(`denylist empty — seed it: node tools/denylist.mjs add "Name"`); }
    else {
      const hits = [];
      for (const c of LEX) {
        const visible = [c.term, c.gloss, c.myth, c.known, c.origin, c.range, c.res?.note,
                         ...(c.syn || []), ...((c.ev || []).map(e => e.why))].join(' ');
        const found = findDenied(visible, hashes);
        if (found.length) hits.push(`${c.id} → ${found.join(', ')}`);
      }
      hits.length
        ? fail(`artist name in a lexicon card (origin must be era-and-scene): ${hits.join('; ')}`)
        : pass(`no artist names in any lexicon card (${hashes.size} hashed)`);
    }
  }

  /* ---------- version stamp ---------- */
  LEX_VERSION && LEX_UPDATED
    ? pass(`lexicon version stamp set (${LEX_VERSION} · ${LEX_UPDATED})`)
    : fail(`lexicon_data.js missing LEX_VERSION/LEX_UPDATED`);

  return { fails, passes };
}

/* standalone run */
if (process.argv[1] && process.argv[1].endsWith('lexicon.mjs')) {
  const { fails, passes } = checkLexicon();
  for (const p of passes) console.log(`✓ ${p}`);
  for (const f of fails) console.log(`✗ ${f}`);
  console.log(fails.length ? `\nFAIL (${fails.length})` : `\nPASS`);
  process.exit(fails.length ? 1 : 0);
}
