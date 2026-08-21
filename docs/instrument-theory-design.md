# Instrument & Theory Library — design

Status: **draft**, agreed in conversation 2026-08-21. Nothing built yet.
This is a spec, not a task list. Where a decision was made, the reasoning is
recorded with it so a later session doesn't re-litigate it.

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
| Lay gloss | What it is, in plain language, no jargon |
| Synonym ring | Musician's slang + what a lay person would actually type |
| Misconception | The thing people commonly get wrong ("reverb is not echo") |
| What it's known for | Its characteristic use and effect |
| Origin | Era and scene — see §7 on names |
| Domains | One or more parents (§4) |
| Kinds | One or more of: instrument/tool, technique (§4) |
| Resolution | Does the model actually distinguish this, or does it collapse into its parent? (§5) |
| Range | Most terms are a dial, not a switch — note how the extremes behave |
| Demos | Approved takes, with the prompt span recorded (§5, §6) |
| Stamp | Model version + date for every uptake verdict (§8) |

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

### Approval state

Every demo attached to a card carries a state: **candidate**, **approved**,
or **rejected for this term**. Approval is a listening judgement, made by
ear, by hand.

This does more than gatekeep. It gives the page an honest, visible
"documented but not yet demonstrated" status — the page can admit what it
hasn't proven, which is the credibility a lay reader needs — and it doubles
as the work queue.

### Minimal pairs

The strongest form of evidence, and the default for a term whose uptake is in
question: **two generations from an identical prompt, one word changed.**

The comparison *is* the documentation. It teaches the reader, it tests uptake
without requiring a confident claim about a black box, and — because the
prompt span is recorded (§6) — the highlight in the pop-out literally shows
the diff.

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
- **Copy yields the plain prompt** — no highlight markup in the clipboard.

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
- Any automated uptake detection. Nothing in the generator's data exposes how
  a word was weighted; genre-level classification of a finished track cannot
  confirm a term landed. **The only readout is the audio**, and that means a
  person listening. Do not rebuild this conclusion from scratch later.
