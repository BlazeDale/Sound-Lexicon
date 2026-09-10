#!/usr/bin/env node
/*
 * Vocal Timbre Library — blind seed dealer for the v6 demo sweep.
 *   node tools/seed_deal.mjs 45 47          deal seeds for entries 45–47 (both model arms)
 *   node tools/seed_deal.mjs 45 47 --key X  fix the run key so a deal is reproducible
 *   node tools/seed_deal.mjs A1 A4          lettered suite entries deal the same way
 *
 * WHY THIS EXISTS. The seeds are meant to be drawn without regard to the entry —
 * four broad words the song passes through, not its subject. On #1–#44 they were
 * picked by hand *after* reading the style, so the draw kept agreeing with the
 * genre: harbor for yacht rock, riverbank for Delta blues, cliffside for Celtic.
 * The song then had nowhere to go but the genre's own postcard.
 *
 * The fix is to delete the choosing step rather than to add more vocabulary.
 * This deals blind, in entry order, before the style is read. A seed may be
 * re-rolled ONLY for genuine absurdity — never because it doesn't suit the
 * genre. "Doesn't fit" is exactly the signal the draw has to ignore; that is
 * where the friction comes from. Log any re-roll and its reason in v6_sweep.json.
 *
 * Banks are the curated register-matched ones (see the seed-banks note): drawn
 * WITHOUT replacement across a run, reshuffled when a bank is exhausted, so a
 * batch never repeats a word and successive batches don't settle into a rut.
 */

const BANKS = {
  place: ['train station', 'harbor', 'rooftop', 'motel corridor', 'orchard', 'chapel', 'tarmac', 'pier',
    'greenhouse', 'overpass', 'boardwalk', 'quarry', 'lighthouse', 'stairwell', 'ferry', 'drive-in',
    'switchyard', 'reservoir', 'subway platform', 'fairground', 'observatory', 'riverbank', 'cliffside',
    'telephone box'],
  emotion: ['longing', 'dread', 'relief', 'homesickness', 'defiance', 'awe', 'tenderness', 'resignation',
    'restlessness', 'grief', 'envy', 'guilt', 'wonder', 'loneliness', 'contentment', 'bitterness',
    'forgiveness', 'anticipation', 'regret', 'devotion', 'unease', 'gratitude', 'saudade'],
  action: ['leave', 'wait', 'chase', 'drift', 'arrive', 'unravel', 'circle', 'return', 'hide', 'search',
    'fall', 'reach', 'let go', 'wander', 'wave', 'burn', 'drown', 'climb', 'follow', 'forget', 'confess',
    'lie (deceive)', 'pack', 'drive'],
  esoteric: ['threshold', 'half-life', 'aurora', 'cipher', 'eclipse', 'afterimage', 'gravity', 'wavelength',
    'mirage', 'palimpsest', 'event horizon', 'undertow', 'parallax', 'dream', 'orbit', 'spectrum', 'vertigo',
    'limbo', 'resonance', 'entropy', 'apparition', 'frequency', 'twilight']
};

/* Deterministic RNG so a run key reproduces a deal exactly (auditable, not "trust me"). */
const hash = str => { let h = 2166136261; for (const ch of str) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const rng = seed => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

function dealer(bank, rand) {
  let pool = [];
  return () => {
    if (!pool.length) { pool = [...bank]; for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; } }
    return pool.pop();
  };
}

const args = process.argv.slice(2);
const keyIdx = args.indexOf('--key');
const key = keyIdx >= 0 ? args[keyIdx + 1] : new Date().toISOString().slice(0, 10) + ':' + args.filter(a => a !== '--key' && a !== (keyIdx >= 0 ? args[keyIdx + 1] : '')).join('-');
const ids = args.filter((a, i) => a !== '--key' && i !== keyIdx + 1);

if (!ids.length) { console.error('usage: node tools/seed_deal.mjs <from> <to> [--key K]   (or a list of entry ids)'); process.exit(1); }

/* A numeric pair is a range; anything else is taken as a literal list of entry ids. */
let entries;
if (ids.length === 2 && ids.every(x => /^\d+$/.test(x))) {
  const [a, b] = ids.map(Number);
  entries = Array.from({ length: b - a + 1 }, (_, i) => String(a + i));
} else entries = ids;

const rand = rng(hash(key));
const draw = Object.fromEntries(Object.keys(BANKS).map(k => [k, dealer(BANKS[k], rand)]));

const out = {};
console.log(`run key: ${key}`);
console.log('entry  arm       place            emotion        action         esoteric');
for (const n of entries) {
  out[n] = {};
  for (const arm of ['v6', 'v6-wild']) {
    const s = { place: draw.place(), emotion: draw.emotion(), action: draw.action(), esoteric: draw.esoteric() };
    out[n][arm] = s;
    console.log(`#${n.padEnd(5)} ${arm.padEnd(9)} ${s.place.padEnd(16)} ${s.emotion.padEnd(14)} ${s.action.padEnd(14)} ${s.esoteric}`);
  }
}
console.log('\nJSON:');
console.log(JSON.stringify(out));
