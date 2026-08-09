# tools

The library data lives in **`data.js`** (`LIB`, `RECENT`, `STUDY_META`). The HTML
loads it via `<script src="data.js">` and is view-only — edit entries in `data.js`,
not the HTML. (Two files now, so the page is no longer a single shareable file.)

## build.mjs — regenerate artist_studies.md

Promoted inspirations studies (the `inspiration` entries in `LIB`) are the single
source; `artist_studies.md` is generated from them.

```
node tools/build.mjs          # regenerate the GENERATED region of artist_studies.md
node tools/build.mjs --check  # exit 1 if the file is out of sync (used by validate)
```

Only the region between the `<!-- BEGIN GENERATED … -->` / `<!-- END GENERATED -->`
markers is touched. Studies 1–3 above the marker are hand-authored and left alone.
Study-level prose (temperament note, date) lives in `STUDY_META` in `data.js`, keyed
by the study slug (`fam` minus `"inspirations · "`).

## song_titles.mjs — make demo song names searchable

`data.js` stores only Suno song **UUIDs**; the song's *name* lives on Suno. This
scrapes the `og:title` off each song page into the generated `SONG_TITLES` block in
`data.js`, and the page folds those titles into each card's search blob — so typing
a song name in the search box finds the entry that demos it (they also show as the
tile tooltip and in the side-player header).

```
node tools/song_titles.mjs          # fetch titles for demos that lack one
node tools/song_titles.mjs --all    # re-fetch everything (a song was renamed)
node tools/song_titles.mjs --check  # exit 1 if any demo is missing a title
```

Run it after attaching demos, before committing. Suno's pages aren't CORS-readable,
so this can't happen in the browser — the titles have to be baked in here. If a song
is private/deleted the fetch yields nothing; add that one line by hand and the tool
will preserve it.

## validate.mjs — pre-commit check

Run before every commit:

```
node tools/validate.mjs
```

Loads `data.js` and checks:

- **char caps** — every `style` ≤ 1000, every `lyric` ≤ 5000
- **numbering** — integer entry numbers unique
- **RECENT** — every id in the most-recent batch resolves to a real entry
- **no artist names** — entry name/fam/style/neg **and** `RECENT.label` checked against a hashed denylist (see below); names never appear in the repo
- **mandated negatives** — the 7 mandated terms must *not* be pre-baked into `neg` (appended at copy time)
- **version stamp + masthead** — `VERSION`/`UPDATED` set; title/counts derive at runtime; static `<title>` stays count-free
- **HTML wiring** — references `data.js`; inline script parses; `<div>`/`<section>` balanced
- **song titles** — every attached demo has a `SONG_TITLES` entry (else its song name isn't searchable), no stale entries, no artist name in a title, and the HTML still feeds titles into the search blob
- **artist_studies.md** — `(NNN)` labels match their prompts, and the generated region is in sync (`build --check`)

Exit `1` on any failure. Pass a path as arg 1 to validate a different `data.js` (self-testing).

## denylist.mjs — artist-name guard (name-free)

Artist/band names may be **spoken** (chat, CLI args, memory) but are **never written**
into the tracked files — prompts, labels, metadata, none of it. To keep a guard without
storing names, `denylist.hashes.json` holds only SHA-256 hashes:

```
node tools/denylist.mjs add "Some Band" "Another Act"   # append hashes; names are ephemeral CLI args
node tools/denylist.mjs count
```

`validate.mjs` hashes the word n-grams of every entry (and `RECENT.label`) and flags any
match. Add a name here whenever you start a new artist study.

## pre-commit hook (commit gate)

`tools/hooks/pre-commit` runs `validate.mjs` and blocks the commit if it fails.
It's wired via `core.hooksPath`, so it's version-controlled — but each clone must
opt in once:

```
git config core.hooksPath tools/hooks
```

Bypass in a pinch with `git commit --no-verify`.

## Version / counts

Bump `VERSION` / `UPDATED` in `data.js` — the only place. The `<title>`, `<meta>`,
masthead heading, sub-line, and footer all derive from those + `LIB` counts at
runtime, so entry counts never need hand-editing and can't go stale.

## Register & grit — write them into the prompt, never score them by hand

The two map axes are **derived from the prompt text alone**. Nobody assigns `reg`/`grit`
numbers by judgement — not for new entries, not for old ones. One rule for the whole
library, so there is never a second class of "trusted" numbers.

- **Register** = where the voice sits, low → high. **Grit** = how rough the tone is,
  clean → torn. They are independent: #12 is low+smooth, #97 low+rough, #125 high+smooth,
  #19 high+rough.
- **Every entry's vocal sentence must name one register qualifier and one grit qualifier.**
  A prompt naming neither reads *neutral* and sits dead-centre on the map — a silent loss
  of coverage. Treat a missing qualifier as a defect in the prompt.

Four rules that come out of validating this against the legacy hand scores:

1. **Keep the qualifier inside the vocal clause** — the sentence after
   `a unique and specific vocalist:`. The reader scopes to that clause; anything outside
   it is ignored.
2. **Keep instrument words out of that clause.** "voice sitting low in the mix" once made
   #41 read register 1.5 against a true 6.3.
3. **Negation is read, and is a legitimate tool.** "no grit", "without rasp", "no cry"
   all read as smooth — a deliberate way to pin the clean end.
4. **Volume is not grit.** "shouted", "belted", "pushed hard" describe effort, not
   roughness — "shouted hooks" made #46 read grit 9.2 against a true 4.0. If the voice is
   genuinely rough, add a tone word too.

### Vocabulary (both axes 0–10)

**Register** — profundo/subharmonic `0.8` · bass/cavernous/bellow `1.5–2` · baritone `2.5` ·
contralto `3` · alto `4` · mid-register/mid-tone/speech range `5` · mezzo/baritone-tenor `5.5` ·
tenor `6` · high/upper register/top notes `7.5` · countertenor/head voice `8` ·
falsetto/soprano/shriek `8.5` · whistle register `9.5`

**Grit** — pristine/pure/glassy/silken `0.6` · clean/clear/smooth/polished `1.2` ·
breathy/airy/whispered `1.6` · soft/gentle/tender `1.8` · warm/round/velvet `2.5` ·
nasal/pinched/reedy `4` · husky/smoky/woody `5` · weathered/worn/frayed/cracked `5.5` ·
grain/gritty/sandy/buzzing `6.2` · rasp/gravel/hoarse/rough `6.8` ·
growl/snarl/bark/throaty `8` · distorted/shredded/screamed/guttural/harsh `9.2`

Validated before adoption against the 100 legacy hand scores: register r=0.90 (90% within
2 points), grit r=0.81. Rules 3 and 4 above are what took grit from r=0.62 to r=0.81.

## Workflow for adding / editing entries

1. Edit `data.js` (and `STUDY_META` if it's a promoted study; bump `VERSION`/`UPDATED` if releasing).
2. `node tools/build.mjs` — regenerate `artist_studies.md`.
3. `node tools/timbre.mjs` — re-derive register/grit after **any** style edit.
4. `node tools/song_titles.mjs` — if you attached demos, pull their song titles.
5. `node tools/validate.mjs` — must pass (the hook runs this too).
6. Commit.

## timbre.mjs — derive the map coordinates

```
node tools/timbre.mjs           # regenerate the TIMBRE block in data.js
node tools/timbre.mjs --check   # exit 1 if out of sync (validate runs this)
node tools/timbre.mjs --report  # what each entry resolved to, and whether the prompt said
```

Writes a generated `TIMBRE` block keyed by entry number: `{r, g, rk, gk, z}` — register,
grit, whether the prompt actually *named* each axis, and the genre family. The map reads
this, never the legacy `reg`/`grit` fields (which stay in `data.js` untouched as the
historical hand-scored record, and are no longer used to draw anything).

An entry whose prompt names neither axis resolves to neutral (5/5) and is drawn hollow —
visible as "the prompt didn't say" rather than as a claim the prompt never made.
