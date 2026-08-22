# Instrument & Theory Library — design

Status: agreed in conversation 2026-08-21; **first vertical slice built the same
day** — splash page, lessons page, and one card per domain. This is a spec, not a
task list. Where a decision was made, the reasoning is recorded with it so a later
session doesn't re-litigate it. Where a decision was later *changed*, the old one
and the reason for the change are kept too.

---

## 1. Purpose

A second library, sitting beside the Vocal Timbre Library, documenting **how
musical terminology is or is not interpreted by a generative music model** —
across instruments, tools, techniques, and song theory, not just voice.

Two audiences at once, in this order of priority:

1. **A lay person exploring.** Someone who knows what they like but not what
   it's called, who should be able to search the words they'd actually use.
2. **Us, six months from now.** A record of which terms actually land, so
   prompt-writing stops being guesswork.

The project is as much about learning the material as documenting it. A card
is finished when it teaches something, not when the fields are full.

## 2. Relationship to the Vocal Timbre Library

Same repo, same Pages site, same Firebase project. **Different data model.**

The vocal library's card is a *usable artifact* — paste the style string into
the generator and get the sound. Its fields (`style`, `neg`, `role`, `proc`,
`aff`) are prompt-shaped. This library's card is a *lesson* about one term,
with prompts as supporting evidence. Do not inherit the schema; the shapes
genuinely differ and forcing them together degrades both.

**Bootstrap:** the existing corpus is already evidence. 482 prompts and 946
attached demos, with stored styles verified to arrive essentially verbatim.
Any term recorded as a literal span can be searched across all existing
prompts, so a new card can launch with real demos already attached rather
than starting empty.

## 3. What a card is

One card = one **term**. Not one instrument, not one prompt.

Fields, in rough card order:

| Field | Purpose |
|---|---|
| Term | The canonical name |
| **What you hear** | **The sound as a listener experiences it. Leads the card — see below** |
| Lay gloss | What it actually is, in plain language — usually the mechanism. Supports the above, never replaces it |
| Synonym ring | Musician's slang + what a lay person would actually type |
| Misconception | The thing people commonly get wrong ("reverb is not echo") |
| What it's known for | Its characteristic use and effect |
| Origin | Era and scene — see §7 on names |
| First / Peak | Decade the term appeared, and the decades that popularised it. Often decades apart, which is why both are kept. Searchable |
| Domains | One or more parents (§4) |
| Kinds | One or more of: instrument/tool, technique (§4) |
| Resolution | Does the model actually distinguish this, or does it collapse into its parent? (§5) |
| Range | Most terms are a dial, not a switch — note how the extremes behave |
| Demos | Attached takes, with the prompt span recorded, vouched for by ear (§5, §6) |
| Stamp | Model version + date for every uptake verdict (§8) |

### Describe the sound, not the mechanism (added 2026-08-21)

The first pass of cards failed this and it took a reader to notice. Every gloss led with
**how the thing is made** — tines, coiled springs, foil ribbons, vocal folds — because
mechanism is the easy thing to write. Nine of twenty-two cards described no sound at all.
A reader could finish the Hammond card knowing about tonewheels and drawbars and still be
unable to pick the instrument out of a song.

That misses the stated first-priority audience: someone who knows what they like but not
what it is called. They recognise music **by ear**, so the card has to hand them something
they can match against a memory.

**`sounds` is therefore a required field and the first thing on the card.** Concrete over
abstract — "a giant thud that stops dead", not "a percussive articulation"; "a thick
breathy roar that seems to inhale", not "a tonewheel organ timbre". Say what it does to
the sound, what it feels like, and where in a song you notice it. The test for any card:
*could somebody who had never heard the word still recognise this from what is written?*

`validate.mjs` requires it and enforces a length floor, because a one-line answer here is
nearly always mechanism in disguise.

Two things fell out of doing it that were not the goal. The sensory text is folded into the
search blob, so the page became searchable by ear-words — "boing" finds spring reverb,
"shhh" finds brushes, "breathes" finds sidechain compression, "lurch" finds breakbeat.
And the [[no-artist-names-written]] rule stops hurting here: with the sound properly
described, a card no longer needs to gesture at a record it is not allowed to name.

## 4. Taxonomy

Two tiers, with **song theory as a peer of instruments** at the top level.

```
Generic Domain          Guitar · Drums · Keys · Voice · Microphone ·
                        Room & Space · Production · Harmony · Rhythm ·
                        Form · Arrangement
   └── Leaf             a specific instrument/tool, or a specific technique
```

Three rules that keep this from leaking:

- **The top tier is "domain", not "instrument".** Without this, harmony,
  rhythm, form and arrangement terms have nowhere to live — and those are
  half the stated purpose. "Call and response" belongs to no instrument.
- **A leaf may have several parents.** Plate reverb, close-miking and
  compression genuinely belong under drums *and* voice *and* guitar. A strict
  tree forces an arbitrary pick or a duplicate card; a `parents: []` array
  costs nothing in a flat data file. Selecting Guitar still shows every
  guitar thing — that interaction is unaffected.
- **Tool and technique are not exclusive.** Brushes, a slide, a pick, a bow,
  a capo are each an object *and* a way of playing. Tag both and stop
  arbitrating.

## 5. Evidence

### Demonstrated, or merely documented

A demo is attached to a term as a *claim* that it demonstrates it. Whether it
actually does is a listening judgement — it cannot be read off the prompt, because
a word appearing in a prompt is no evidence it survived into the audio.

This does more than gatekeep. It gives the page an honest, visible "documented but
not yet demonstrated" status — the page can admit what it hasn't proven, which is
the credibility a lay reader needs — and it doubles as the work queue.

How that judgement is recorded changed once already; see the next section.

### How support is actually recorded (revised 2026-08-21)

The first build made this a curator's three-state approval, edited on the card and synced
back to `lexicon_data.js`. **Replaced the same day with a simple up-vote**, and the reasons
are worth keeping:

- **Agreement, not decree.** "Does this track demonstrate this term?" is a question anyone
  listening can answer, and several people agreeing is stronger evidence than one person
  ruling. A count also degrades honestly — two votes says two, not "approved".
- **It works today.** The database whitelists paths, and `lex_appr` was denied (probed, not
  assumed), which left approvals stranded in one browser behind a console change. Votes are
  counters in the existing `likes` map, keyed `lexev:<cardId>:<entry>`, so they need **no new
  rule** — and that map's rule permits a change of exactly ±1 per write, so a count cannot be
  inflated. Reusing the open path was the whole reason to prefer this shape.
- **One system, not two.** The sync tool and the local approval buffer are gone. Live counts
  live in Firebase like the ♥ counts; nothing about a vote needs committing.

**Evidence is ordered by support, best first.** The strongest demonstration of a term
should be the first thing under the lesson, not whichever example happened to be written
first. Ties keep the authored order, which is curated — the cleanest test case is written
first deliberately — so an unvoted card still reads in a considered sequence rather than an
arbitrary one. Reordering moves existing nodes rather than re-rendering, so a vote cast
part-way down a page does not throw the reader's position.

**The vote is per (term, demo) pair, never per track.** The same recording can plainly
demonstrate one term and say nothing about another, so a per-track score would be meaningless.

A term reads as *demonstrated* once at least one listener has vouched for at least one of its
demos; zero votes reads as "documented, not yet demonstrated", which is the honest state and
what every card says today.

`state` survives in `lexicon_data.js` for one narrow job: `'rejected'` strikes a piece of
evidence that is simply wrong, so it is greyed and excluded from the tally rather than left
to be voted down. The page no longer edits it.

**Voting on a demo is still not the same act as setting the card's `res.verdict`.** Demos are
evidence; a verdict is a claim about the generator and carries a model version and date (§8).
Agreement that a track demonstrates a term is not the same as a finding about how the model
behaves, and the page keeps them apart.

### More examples: letting a growing corpus reach the cards

Curated evidence is the lesson — each item carries a hand-written reason it was chosen,
and nothing can generate that. But new prompts kept arriving with no route to the card
that documents their term: at the time this was added, **301 entries already matched a
term's wording and were invisible to the page**.

So each card carries a **"N more examples"** button that expands the rest. They are
labelled *not curated, not vouched for*, carry no reason, and do not count toward the
card's support tally. What they give a reader is the honest scale of a term's use — for
four-on-the-floor, "87 more" *is* a finding — and what they give the project is a path by
which writing a prompt is the entire act of attaching it.

Three decisions here exist specifically to stop this becoming a maintenance burden:

1. **Matched at runtime against `LIB`.** No generated list, no cache, no sync step. Add a
   prompt to the vocal library and the relevant lesson picks it up on next load with
   nothing to run and nothing to remember.
2. **The vocabulary is short stems, not inflections.** `match:['brush']` catches brushed,
   brushes, brushing; `['sidechain','side-chain']` catches both spellings and all their
   endings. One or two strings per card — there is no list of word forms to keep up.
   Absent, it falls back to the card's own `ev` spans.
3. **Computed once at load and rendered in chunks of 12.** The cost is cards × entries,
   and that product is what grows; doing it per keystroke of the search box would not
   survive a hundred cards against five thousand prompts. Expansion patches one card, so
   opening a list of 87 never re-renders the page.

`validate.mjs` reports total reachable-but-uncurated entries every run, so drift is a
number you see rather than something discovered months later — and it **fails** if a
card's entire vocabulary matches nothing, which is what a typo looks like. Individual
unused spelling variants are deliberate future-proofing and are not flagged; nagging
about those every run is how a real typo gets waved through.

**A vote promotes an example out of this list and into the evidence above it** (revised
after the first real vote landed on one). Keeping the two strictly apart was wrong in a way
a vote exposes immediately: vouch for a discovered take and it sorted to the top of a list
that stays collapsed, so the one example a person had actually confirmed was the one they
could not see.

A vote is the whole signal of what deserves prominence; where an example came from is a
detail of how it was found. So a vouched-for discovery now outranks a curated example with
no support, sits in the evidence list, counts toward the tally, and is labelled *vouched
for, not written up* — honest about lacking a reason, rather than hidden for it. It leaves
the "more" list at the same moment, so nothing appears twice.

That also means a vote can change which examples belong to a lesson, not just their order.
Reordering nodes cannot express a membership change, so the page tracks a signature of what
is promoted and does a real re-render when it shifts, patching in place otherwise.

### Learned: private progress, not shared state

Each card can be marked **learned**, with **Unlearned / Learned** filters and a running
count. This is the lay reader's route through the material — the page is meant to teach,
and a reader working through it needs to know where they got to.

It is stored in `localStorage`, **not** in the shared database, and that separation is the
point: a vote is a claim about the material and belongs to everyone; whether you have read
a lesson is about you and belongs in your browser. Putting progress next to the votes would
have made one person's reading look like evidence.

(Asked for as a cookie; localStorage does the same client-side job without being attached
to every request, has room to grow, and is already how the votes and hearts persist here.)

### Negative-use evidence proves the opposite (added 2026-08-21)

A demo attached to a prompt that **excluded** a term demonstrates its absence, not the term.
Obvious once stated; got wrong anyway. The autotune card originally cited four prompts that
all listed autotune as a NEGATIVE, so every demo on it was a track with no autotune in it —
the card looked fully evidenced and proved the opposite of its subject. Four positive uses
existed in the corpus the whole time, including one entry named for the effect.

The cause was mechanical: 311 of 315 corpus uses are negatives, so the first matches found
were all negatives, and nothing in the page or the validator distinguished them.

Three fixes, all in place:

- **`validate.mjs` fails a card whose evidence is entirely negative-use.** Derived by
  checking whether the recorded span sits in the entry's `style` or only in its `neg`, so it
  cannot drift out of step with the data and needs no hand-tagging.
- **The page labels them** — violet edge, *excluded here · listen for its absence* — and
  counts them separately: "1 candidate attached … plus 3 exclusion tests".
- **The vote changes meaning with them.** On a positive it reads *Supports*, meaning "I hear
  the term". On a negative it reads *Stayed out*, because hearing the term there would mean
  the suppression FAILED. The same button would otherwise have collected the two opposite
  claims into one number.

Negative evidence is worth keeping — it is the only way to test whether suppression works,
which matters far beyond any single card, since every prompt in the library carries eight
mandated negatives on the assumption that it does. It just cannot stand alone.

### Minimal pairs

The strongest form of evidence, and the default for a term whose uptake is in
question: **two generations from an identical prompt, one word changed.**

The comparison *is* the documentation. It teaches the reader, it tests uptake
without requiring a confident claim about a black box, and — because the
prompt span is recorded (§6) — the highlight in the pop-out literally shows
the diff.

### Commissioned demos must lean in hard (added 2026-08-21)

The first commissioned set — five vocal fry prompts, #408-412 — came back **barely showing
the term**, and the reason is a method error worth keeping.

Those prompts followed the vocal library's house conventions closely: genre-first opening, a
full plausible arrangement, a naturally-reading vocal clause. Those conventions optimise for
a *usable, well-rounded prompt*. A demonstration prompt has the opposite goal — **isolate one
variable and overdrive it** — and the two pull against each other.

Four of the five had a structural reason the effect would be minimised. Indie-pop and alt-R&B
both imply melodic singing, so fry confined to phrase-ends or onsets is the smallest possible
dose of it. Screaming is the genre default in hardcore, which hides the fry mechanism rather
than exposing it. An art-pop string quartet plus a clean top line simply outweighs the fried
bottom. **The genre was doing more work than the term.**

So, for any prompt written to demonstrate a term:

- **Pick a setting that wants the effect, or almost no genre at all.** A strong genre cue
  pulls hard toward that genre's conventions, and the generator prepends its own detected
  base genre on top of ours, so the pull is doubled.
- **Strip the arrangement.** Every named instrument is a competing instruction.
- **Put the term in the opening** — the highest-weight position — not buried mid-prose.
- **Overdo it.** Constant rather than occasional, the whole vocal rather than the edges. A
  subtle correct instance proves nothing when the question is whether the word registers at all.
- **Use the negatives against the genre's default vocal behaviour**, not just against
  unwanted production.

This does not invalidate #408-412. They stay, they keep their demos — a demoed entry is never
edited (§ the never-retro-fix rule) — and they become the **low-dose end** of the range. A
second set written the other way makes the contrast between them an experiment in its own
right: same term, weak framing against strong framing.

### Resolution: does the term survive at all?

Some specifics almost certainly resolve ("palm mute"). Others may collapse
entirely into their parent — one make of electric guitar versus another may
produce nothing the model distinguishes, with the rest being connotation.

**Saying so is the single most useful thing this page can tell a lay
reader**, and it is only expressible because the parent→child relationship is
recorded. It is a first-class field, not a sentence buried in prose.

### Continuous vs momentary — and why timestamps are text

- **Continuous properties** (palm mute, ribbon warmth, brushes, a room
  sound) are present throughout. Generate a short, purpose-built take where
  the technique is the whole point. Nothing to seek to.
- **Momentary events** (key change, stop-time, false ending, a drop) are a
  single moment and need a time reference.

**Tested 2026-08-21 — no seek mechanism exists:**

| Attempted | Result |
|---|---|
| `embed/<uuid>?time=77` | ignored — playhead 0:00, `currentTime` 0 |
| `embed/<uuid>?t=77` | ignored |
| `song/<uuid>?time=77` | ignored — pressed play, started at 0:00 |
| `/s/<short>?time=77` | redirects to `song/<uuid>?sh=…&time=77`, still 0:00 |
| raw mp3 from the Pages origin | stalls — `readyState 0`, never errors, never loads metadata |

The embed is a cross-origin iframe with no postMessage API, so the parent
page cannot seek it; and the audio is still referer-locked, so hosting our
own `<audio>` element is out. There is no in-page or out-of-page seek.

Consequences, both of which are fine:

1. The timestamp is **text on the card** — "key change at 2:14". A reader
   needs to know what to listen *for*, not only where; the text does more
   work than a seek would have.
2. For momentary terms, **generate a demo where the event happens early**,
   so the scrub is short. A content answer to a technical problem.

## 6. The prompt pop-out

The prompt is **secondary** on this page — evidence, not the product. It
lives in a pop-out, not on the card face.

- Full positive *and* negative prompt, with the same easy copy behaviour as
  the vocal library. Sometimes the lesson is in the negative; the eight
  mandated negatives are a standing example.
- **The precise span the lesson is about is highlighted.**
- **Copy yields the plain prompt** — no highlight markup in the clipboard. A highlight is
also **click-to-copy on its own**: hovering one shows a Copy badge and clicking yields just
that phrase, which is usually what you want to paste into a prompt you are writing and is
fiddly to select by hand inside a wrapped monospace block. The confirmation is a `::after`
badge rather than swapped text — a highlight must never rewrite the quoted prompt in front
of the reader, which is what the buttons' own "Copied" label would have done.

Recording the span: store the **literal phrase as it appears in that prompt**,
per demo, and highlight every occurrence. Not character offsets — those go
silently wrong the moment a prompt is edited. Expect to handle inflection
("palm mute" appearing as "palm-muted") by storing the literal that is
actually present.

**`validate.mjs` must fail if a recorded span is not present in its prompt.**
Same pattern as the existing rule that validation fails when an attached demo
has no title. This is the one failure mode that would quietly rot the page's
credibility — a card claiming to demonstrate a term the prompt never
contained — so it is a validated invariant, not a convention.

Bonus: a recorded literal span is also the search key for mining the existing
corpus (§2).

## 7. Names in the origin field

The standing rule holds: **no artist or band names written into any repo
file.** Origin stories are made of names, so this will bite on roughly the
second card.

Policy: write origin as **era and scene** — "West Coast studio pop, mid-60s"
— rather than attributing to people. Where a name is genuinely load-bearing,
hash it the way the artist study keys already are. The era-and-scene form
reads better for a lay person anyway.

### One carve-out: the exemplar record (added 2026-08-21)

A lesson is far more useful when it can say *you have heard this on…* — a reader
recognises a sound from one familiar record faster than from any description. Hashing is
useless for that, since the entire point is that they can go and listen.

So a card may carry an optional **`exemplar`**: title, artist, year, and one line on what
to listen for, marked as either the record that **popularised** the term or the one that
best **exemplifies** it — often different records, and the difference is part of the lesson.

**The guard narrowed rather than lifted.** `findDenied` still scans term, gloss,
misconception, known-for, origin, range, resolution note, synonyms and evidence reasons
exactly as before; names are legal *only* inside `exemplar`. That is stronger than relaxing
the rule, because a name now cannot drift into a synonym ring or an origin line by accident
— verified by planting one and watching validation fail.

**`data.js` is untouched and the rule there stays absolute.** The reason the no-names rule
exists is that the vocal library ships prompts reconstructing an artist's sound, and naming
names there reads as imitation. A lessons page citing the record that popularised gated
reverb is ordinary music history. Different context, different exposure — agreed with
BlazeDale 2026-08-21 on exactly that basis.

Optional by design: melisma, drone, counterpoint and syncopation are older than recording,
and inventing a canonical record for them would be worse than leaving the field empty.

## 8. Verdicts have a shelf life

Every uptake judgement is about **one model version at one date**. The
generator changes underneath us; a page full of undated verdicts rots
silently and looks authoritative while doing it.

Stamp model version and date on every verdict from the first card. Cheap now,
miserable to retrofit across a hundred cards.

## 9. Site structure

- **Splash page** at the site root with two doors, a sentence each. Keep it
  dumb. A unified search across both libraries is tempting and should be
  resisted for v1 — it would force a shared card model, and the whole point
  of §2 is that these two things have different shapes.
- **Repo renamed to `Sound-Lexicon`** (2026-08-21), so the URL doesn't name
  one half of a two-half site. New URL:
  `blazedale.github.io/Sound-Lexicon/`. Note the **old Pages URL now 404s** —
  GitHub redirects the repo URL on rename but not the Pages URL.
- **Cards must be deep-linkable** — a stable URL fragment per card. This is
  the precondition for the real payoff of one repo: a term card pointing at
  the library entries that use it, and eventually the reverse. Free if
  designed in, awkward to retrofit.
- **Like keys need a namespace prefix.** The ♥ counters are keyed per card in
  a shared Firebase namespace; two pages numbering their own cards will
  collide and share heart counts. Trivial now, a data migration later.
- Free to run, and open-source but for the existing Firebase dependency,
  which is reused deliberately for consistency with the vocal library.

## 10. Scope

"All instruments and techniques" is unbounded — the voice alone took 400+
entries. Microphones in particular are a rabbit hole, and the suspicion is
that the model responds to mic terminology by connotation rather than
anything physical (itself a finding worth one card, not sixty).

**Take guitar end to end first** as a vertical slice: enough to prove the card
shape, the minimal-pair method, and the browse interaction, before declaring
the schema correct.

## 10a. Which terms earn a card (added 2026-08-21)

**Only terms that teach something non-obvious.** Raised on `unison`, and correctly: "several
people play the same note" is a definition, not a lesson. No misconception to correct,
nothing hidden in the mechanism, and knowing the word changes nothing about how you would
write a prompt. A page of those is a glossary, and §1 says this is not a glossary.

The test, before writing:

- **Is there a real misconception waiting?** If the common-mistake field has to be stretched
  to fill, the term is too obvious. Every strong card had one ready: the gate is on the
  reverb and not the drum; warmth is brightness a ribbon fails to capture; falsetto is the
  opposite of belting rather than a weaker version; a breakdown is the emptying-out and not
  the drop.
- **Would a lay reader be surprised by anything on the card?**
- **Does the word do work in a prompt** — should its presence or absence change the audio?

A thin term can still earn its place as a **comparison** — unison exists mainly to be told
apart from double-tracking and stacked harmony — but the card has to say that outright
rather than implying the term carries a lesson on its own.

This is the second selection filter, and it pulls against the first. Choosing only terms the
corpus already supports biases the page toward whatever happened to get prompted; choosing
only terms that are easy to describe biases it toward the obvious. **The terms worth having
are usually the ones with a surprise in them**, and those are exactly the ones that need
demos commissioned rather than mined.

## 11. Open questions

- Where does the boundary sit between a term that deserves a card and one
  that is a synonym on another card's ring?
- Does a card ever assert a verdict in prose, or does the minimal pair always
  stand on its own? (Leaning: pair first, prose only where the pair is
  ambiguous.)
- Do theory-domain cards need a notation or diagram affordance, or is audio
  plus plain language enough for the lay reader?
- Ordering within a domain — alphabetical, or curated from most to least
  fundamental?

## 12. Deferred, deliberately

- Unified cross-library search.
- Reverse links from vocal entries to the techniques they demonstrate.
- **Pushing a ♥ through to a like on the generator's own site.** Asked and declined
  2026-08-21. Two blockers, recorded so this is not re-investigated: hearts here are keyed
  per ENTRY, not per song, so there is nothing song-shaped to send; and suno.com returns no
  `Access-Control-Allow-Origin` header at all (checked, not assumed), so a browser refuses
  any cross-origin request from the Pages origin. Liking also requires being authenticated
  as a Suno user, and a visitor's session cookies are SameSite-protected and unreachable
  from our page — the same cross-origin wall that blocks seeking the embed (§5).
  A server-side relay holding one account's credentials could technically forward likes,
  and should not: every visitor's heart would become a like from that one account, which is
  a fabricated signal on a page whose whole value is not fabricating signals. The borrowed
  -credential route is separately on record as classifier-blocked.
  The honest version, if it is ever wanted: per-song hearts that link out so a visitor
  likes the track themselves, as themselves.
- Any automated uptake detection. Nothing in the generator's data exposes how
  a word was weighted; genre-level classification of a finished track cannot
  confirm a term landed. **The only readout is the audio**, and that means a
  person listening. Do not rebuild this conclusion from scratch later.
