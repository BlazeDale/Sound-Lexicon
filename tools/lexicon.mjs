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
/* How hard the term is to HEAR, which is a different axis from how hard it is to
   understand. 1 is audible unprompted, 4 needs a trained ear or a minimal pair.
   Required on every card: an unrated card would silently vanish from the difficulty
   filter while looking perfectly fine on the page. */
const HEAR = [1, 2, 3, 4];
const HEAR_NAME = { 1: 'Easy', 2: 'Medium', 3: 'Hard', 4: 'Very hard' };

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
    /* `sounds` is required, not optional. A card without it explains how a thing is made
       and leaves the reader still unable to hear it — the exact failure this page exists
       to avoid. Length floor because a one-liner here is nearly always mechanism in
       disguise. */
    const need = ['term', 'sounds', 'gloss', 'myth', 'known', 'origin', 'range'];
    const thin = [];
    for (const c of LEX) {
      const missing = need.filter(f => !(c[f] || '').trim());
      if (missing.length) thin.push(`${c.id} (${missing.join(', ')})`);
      if (!Array.isArray(c.syn) || !c.syn.length) thin.push(`${c.id} (no synonym ring — lay search depends on it)`);
      if ((c.sounds || '').trim().length < 120) thin.push(`${c.id} (sounds too thin to describe a sound)`);
    }
    thin.length ? fail(`incomplete card(s): ${thin.join('; ')}`) : pass(`all cards describe what you hear, plus gloss, misconception, known-for, origin, range and synonyms`);
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

  /* ---------- difficulty to hear ----------
     Deliberately separate from `kinds` and `nature`, which describe WHAT a term is. This
     describes what it costs a listener, and it is the axis a reader actually navigates by:
     a beginner wants the 1s and a trained ear wants the 4s, and neither of those is a
     domain. Rejected outright rather than defaulted, because a silent default would fill
     the easy tier with cards nobody ever rated. */
  {
    const bad = [], dist = { 1: 0, 2: 0, 3: 0, 4: 0 };
    for (const c of LEX) {
      if (!HEAR.includes(c.hear)) { bad.push(`${c.id} (hear=${JSON.stringify(c.hear)})`); continue; }
      dist[c.hear]++;
    }
    bad.length
      ? fail(`every card needs a hearing difficulty of 1-4 (1 easy, 4 very hard): ${bad.join(', ')}`)
      : pass(`every card rated for difficulty to hear: `
          + HEAR.map(h => `${dist[h]} ${HEAR_NAME[h].toLowerCase()}`).join(', '));
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

  /* ---------- exemplar: the record that carries the term ----------
     Optional by design. Melisma, drone, counterpoint and syncopation are older than
     recording, and inventing a canonical record for them would be worse than leaving it
     blank. `kind` records WHICH claim is being made — first to popularise it, or clearest
     example — because those are frequently different records and the difference is part of
     the lesson. */
  {
    const KINDS = ['popularised', 'exemplifies'];
    const bad = [];
    for (const c of LEX) {
      const x = c.exemplar; if (!x) continue;
      for (const f of ['title', 'artist', 'year', 'listen'])
        if (!String(x[f] || '').trim()) bad.push(`${c.id} exemplar missing ${f}`);
      if (!KINDS.includes(x.kind)) bad.push(`${c.id} exemplar.kind must be ${KINDS.join(' or ')}`);
      if (x.year && !/^\d{4}$/.test(String(x.year))) bad.push(`${c.id} exemplar.year "${x.year}" is not a 4-digit year`);
      /* `video` is optional and overrides the search link. Shape-checked because a
         malformed id does not fail visibly — it resolves to an unrelated video, which is
         worse than a broken link. */
      if (x.video !== undefined && !/^[A-Za-z0-9_-]{11}$/.test(String(x.video)))
        bad.push(`${c.id} exemplar.video "${x.video}" is not an 11-character YouTube id`);
    }
    bad.length ? fail(`exemplar problems: ${bad.join('; ')}`) : pass(`every exemplar names a record, a year, and what to listen for`);
  }

  /* ---------- era tags ----------
     `first` is when the term appeared, `peak` when it was popularised — they are often
     different by decades, which is the point of keeping both. Values are constrained so the
     decade search stays exact: a stray "60s" or "1963" would be invisible to a search for
     "1960s" while looking perfectly fine on the card. */
  {
    const OK = /^(1[89]\d0s|20[0-2]0s|ancient|pre-1900)$/;
    const bad = [], noPeak = [];
    for (const c of LEX) {
      if (!OK.test(c.first || '')) bad.push(`${c.id} first="${c.first}"`);
      if (!Array.isArray(c.peak)) { bad.push(`${c.id} peak is not an array`); continue; }
      for (const p of c.peak) if (!OK.test(p)) bad.push(`${c.id} peak="${p}"`);
      if (!c.peak.length) noPeak.push(c.id);
    }
    bad.length
      ? fail(`era tag(s) not a recognised decade (use 1960s / 2010s / ancient / pre-1900): ${bad.join(', ')}`)
      : pass(`every card carries a first-use decade and a peak list`
          + (noPeak.length ? `; ${noPeak.length} deliberately have no peak era (${noPeak.join(', ')})` : ''));
  }

  /* ---------- a card must have at least one POSITIVE demonstration ----------
     A demo attached to a prompt that EXCLUDED the term demonstrates its absence, not the
     term. The autotune card originally cited four such prompts and nothing else, so every
     one of its demos was a track with no autotune in it — the card looked fully evidenced
     and proved the opposite of its subject.

     The page no longer shows them at all: a lesson is a place to hear the term, and a track
     that is silent on it teaches nothing there. They stay in the data, so this check is now
     the floor under that filter — a card whose evidence is ALL negative-use would render
     with no demos under it whatsoever. */
  {
    const noPositive = [], counts = [];
    for (const c of LEX) {
      let pos = 0, neg = 0;
      for (const e of (c.ev || [])) {
        const v = byN.get(String(e.n)); if (!v) continue;
        if ((v.style || '').includes(e.span)) pos++;
        else if ((v.neg || '').includes(e.span)) neg++;
      }
      if (neg) counts.push(`${c.id} ${pos} shown/${neg} hidden`);
      if ((c.ev || []).length && !pos) noPositive.push(c.id);
    }
    noPositive.length
      ? fail(`card(s) whose evidence is ALL negative-use — every demo proves the term is absent: ${noPositive.join(', ')}`)
      : pass(`every card has at least one positive demonstration`
          + (counts.length ? `; ${counts.length} also carry exclusion tests, hidden by the page (${counts.slice(0,4).join(', ')}${counts.length > 4 ? ', …' : ''})` : ''));
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
      const anyHit = low.some(s => LIB.some(v => (v.style || '').toLowerCase().includes(s)));
      if (!anyHit) dead.push(`${c.id} (${low.map(s => `"${s}"`).join(', ')})`);
      /* Style only, matching the page: a prompt that EXCLUDES the wording is not an example
         of it, and counting those made this number nearly twice the reach a reader gets. */
      const more = LIB.filter(v => {
        const id = String(v.n ?? v.id);
        if (attached.has(id) || !(v.suno || []).length) return false;
        return low.some(s => (v.style || '').toLowerCase().includes(s));
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
      /* The carve-out is deliberately narrow. Names are legal ONLY inside `exemplar`, the
         field built to carry them; every other field is scanned exactly as before. That is
         stronger than relaxing the rule, because a name cannot drift into a synonym ring, an
         origin line or an evidence reason by accident — the guard would still catch it. */
      const hits = [];
      for (const c of LEX) {
        const visible = [c.term, c.gloss, c.myth, c.known, c.origin, c.range, c.res?.note,
                         ...(c.syn || []), ...((c.ev || []).map(e => e.why))].join(' ');
        const found = findDenied(visible, hashes);
        if (found.length) hits.push(`${c.id} → ${found.join(', ')}`);
      }
      const withEx = LEX.filter(c => c.exemplar).length;
      hits.length
        ? fail(`artist name outside the exemplar field (origin must stay era-and-scene): ${hits.join('; ')}`)
        : pass(`no artist names outside \`exemplar\` (${hashes.size} hashed); ${withEx}/${LEX.length} cards carry one`);
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
