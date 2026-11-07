#!/usr/bin/env node
/*
 * Lyric-prompt trial dealer — ledger is tools/prompt_trial.json.
 *
 *   node tools/prompt_deal.mjs deal <song> [title]   deal the next variant to a song, print its prompt text
 *   node tools/prompt_deal.mjs set <song> <field> <value>
 *        fields: filled_prompt | lyrics | lyricist | suno | verdict | note
 *        (value "-" reads stdin, for multi-line lyrics)
 *   node tools/prompt_deal.mjs show <song>           print one assignment
 *   node tools/prompt_deal.mjs stats                 count songs + verdicts per variant
 *
 * WHY A SHUFFLED CYCLE. Pure random lets one variant run cold for twenty songs
 * and another take three in a row; a shuffled deck uses each of the ten once per
 * ten songs in random order, so the counts stay level and no variant is tied to
 * a time of week or to one batch's genre. The variant is dealt BEFORE the lyric
 * is written — never re-dealt because it "doesn't suit" the song.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), 'prompt_trial.json');
const db = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const save = () => fs.writeFileSync(FILE, JSON.stringify(db, null, 1) + '\n');
const DEALT = Object.keys(db.variants).map(Number).filter(n => n !== 0);
const find = song => db.assignments.find(a => a.song === String(song));

const [cmd, ...args] = process.argv.slice(2);

if (cmd === 'deal') {
  const [song, ...title] = args;
  if (!song) throw new Error('deal needs a song id');
  if (find(song)) { console.error(`song ${song} already dealt variant ${find(song).variant}`); process.exit(1); }
  if (!db.deck.remaining.length) {
    const d = [...DEALT];
    for (let i = d.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [d[i], d[j]] = [d[j], d[i]]; }
    db.deck.remaining = d; db.deck.cycle += 1;
  }
  const variant = db.deck.remaining.shift();
  db.assignments.push({
    song: String(song), title: title.join(' ') || null, variant, key: db.variants[variant].key,
    cycle: db.deck.cycle, date: new Date().toISOString().slice(0, 10),
    lyricist: null, filled_prompt: null, lyrics: null, suno: null, verdict: null, note: null,
  });
  save();
  console.log(`song ${song} -> variant ${variant} (${db.variants[variant].key}), cycle ${db.deck.cycle}, ${db.deck.remaining.length} left in cycle\n`);
  console.log(db.variants[variant].text);
} else if (cmd === 'set') {
  const [song, field, ...rest] = args;
  const a = find(song);
  if (!a) throw new Error(`no assignment for ${song}`);
  const ok = ['filled_prompt', 'lyrics', 'lyricist', 'suno', 'verdict', 'note', 'title'];
  if (!ok.includes(field)) throw new Error(`field must be one of ${ok.join(', ')}`);
  let v = rest.join(' ');
  if (v === '-') v = fs.readFileSync(0, 'utf8').trim();
  a[field] = v; save();
  console.log(`song ${song}: ${field} set (${v.length} chars)`);
} else if (cmd === 'show') {
  console.log(JSON.stringify(find(args[0]) ?? null, null, 1));
} else if (cmd === 'stats') {
  for (const n of DEALT) {
    const rows = db.assignments.filter(a => a.variant === n);
    const verdicts = rows.filter(a => a.verdict).map(a => a.verdict);
    console.log(`${String(n).padStart(2)} ${db.variants[n].key.padEnd(20)} songs ${rows.length}  verdicts ${verdicts.length ? verdicts.join(' | ') : '-'}`);
  }
  console.log(`\ncycle ${db.deck.cycle}, remaining this cycle: [${db.deck.remaining.join(', ')}]`);
} else {
  console.log(fs.readFileSync(fileURLToPath(import.meta.url), 'utf8').split('*/')[0]);
}
