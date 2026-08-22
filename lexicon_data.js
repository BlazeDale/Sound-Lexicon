/* Terminology Lessons — data (edit here, not the HTML).
 *
 * A card is a TERM, not a prompt. This file deliberately does NOT share data.js's
 * prompt-shaped schema (style/neg/role/proc/aff) — see docs/instrument-theory-design.md §2.
 * The prompt is evidence, and it is not duplicated here: each evidence item points at a
 * numbered entry in LIB (data.js) by `n`, and the page reads that entry's real prompt and
 * demos at runtime. One source of truth, no drift, and the cross-link the design doc
 * wanted in §9 falls out for free.
 *
 * DOMAINS : the top tier. "Domain", not "instrument" — song theory sits here as a peer,
 *           which is what gives harmony/rhythm/form/arrangement terms a home (§4).
 * LEX     : the cards. `domains` is an ARRAY — a leaf may have several parents (plate
 *           reverb is genuinely a drum, voice AND guitar tool). `kinds` is an array too,
 *           and the two values are NOT exclusive (brushes are an object and a technique).
 *
 * Honesty rules this file is built to keep:
 *   - `res.verdict` starts 'untested' and stays there until a person listens. Nothing on
 *     this page may assert that the generator does or does not resolve a term until that
 *     happens. `res.model`/`res.date` stamp WHICH generator and WHEN (§8) — a verdict
 *     without them is a verdict that will rot silently, so validate.mjs rejects one.
 *   - Every evidence `span` must appear LITERALLY in that entry's prompt. Not character
 *     offsets — those go wrong the moment a prompt is edited. validate.mjs fails if a span
 *     is missing, so a card can never claim to demonstrate a term its prompt never had (§6).
 *   - `state` is the listening judgement: 'candidate' until approved by ear, then
 *     'approved' or 'rejected'. Everything here starts as a candidate, which is why the
 *     page currently says "documented, not yet demonstrated" — an honest state, not a gap (§5).
 *   - No artist or band names anywhere. Origin is era and scene (§7).
 *
 * Loaded as a classic <script> AFTER data.js, so LIB is already a global.
 */

const LEX_VERSION = 'v10';
const LEX_UPDATED = '2026-08-21';

/* ---------- TOP TIER: domains, not instruments ----------
   `kind` splits the rail into the two families the doc argues are peers: the physical
   ones you can point at, and the theory ones you cannot. Purely presentational. */
const DOMAINS = [
  { id:'guitar',      name:'Guitar',        kind:'physical', blurb:`Strings, hands and amplifiers — how a guitar is played and what it is played through.` },
  { id:'drums',       name:'Drums',         kind:'physical', blurb:`The kit, what strikes it, and how the strike is shaped.` },
  { id:'keys',        name:'Keys',          kind:'physical', blurb:`Pianos, organs and electric keyboards — mechanical instruments with characters of their own.` },
  { id:'voice',       name:'Voice',         kind:'physical', blurb:`Vocal technique as terminology. The sister library covers timbre in depth; this covers the words.` },
  { id:'microphone',  name:'Microphone',    kind:'physical', blurb:`What captures the sound, and how much of the result is really the microphone.` },
  { id:'room',        name:'Room & Space',  kind:'physical', blurb:`Reverb, ambience and the impression of somewhere — real rooms and invented ones.` },
  { id:'production',  name:'Production',    kind:'physical', blurb:`What happens to a sound after it is played: compression, saturation, the mix.` },
  { id:'harmony',     name:'Harmony',       kind:'theory',   blurb:`How notes sound together, and what moves against what.` },
  { id:'rhythm',      name:'Rhythm',        kind:'theory',   blurb:`Where the hits land, and where they deliberately do not.` },
  { id:'form',        name:'Form',          kind:'theory',   blurb:`The shape of a song over time — sections, arrivals, endings.` },
  { id:'arrangement', name:'Arrangement',   kind:'theory',   blurb:`Who plays what, when, and who answers whom.` }
];

/* ---------- THE CARDS ----------
   One card = one term. Fields in rough card order (§3):
     id      stable URL fragment — deep-linkable, never renumber
     term    canonical name
     sounds  WHAT YOU HEAR. Sensory and recognisable — what the thing does to the sound,
             what it feels like, where in a song you notice it. This LEADS the card, because
             the first-priority reader knows what they like but not what it is called, and
             recognises music by ear rather than by mechanism. Concrete over abstract: "a
             giant thud that stops dead", not "a percussive articulation". Test each one by
             asking whether somebody who had never heard the word could still match it to a
             memory. Mechanism is NOT this field.
     gloss   what it actually is, in plain language and no jargon — usually the mechanism.
             Supports `sounds`; never replaces it.
     syn     synonym ring: musician's slang AND what someone would actually type
     myth    the thing people commonly get wrong
     known   characteristic use and effect
     origin  era and scene — never a name (§7)
     first   decade the term first appeared; peak    decades that popularised it (may be
             empty when a term has no particular era). Both searchable — see the note below.
     domains one or more parents
     kinds   'instrument' and/or 'technique' — not exclusive
     match   OPTIONAL discovery vocabulary: the literal word-stems that mean this term
             in a prompt, matched case-insensitively. Powers the "more examples" button,
             which finds matching entries in LIB at RUNTIME — there is no generated list
             to regenerate and nothing to keep in sync, so the corpus can grow without
             this file changing. Keep the stems SHORT ('brush' catches brushed/brushes/
             brushing); that is what stops this becoming a list of inflections to
             maintain forever. Defaults to the distinct `ev` spans when absent.
     nature  'continuous' | 'momentary' — decides whether a demo needs a time reference (§5)
     range   most terms are a dial, not a switch
     res     resolution: does the generator actually distinguish this? (§5)
     ev      evidence: {n, span, state, why}
*/
const LEX = [

{
  id:'palm-mute',
  term:`Palm mute`,
  sounds:`A guitar that stops talking and starts thumping. Each strum lands as a short, fat, muffled chunk with the ring cut off it, so chords hit like blows instead of chiming. Lift the hand and the same riff suddenly blooms open and rings out — that switch between choked and open is usually the whole hook.`,
  gloss:`The side of the picking hand rests on the strings right where they meet the bridge, so each note comes out short and thick instead of ringing on. It is the difference between a guitar that sings and a guitar that chugs.`,
  syn:[`chug`,`chugging`,`muted strumming`,`chunky guitar`,`choppy guitar`,`that ch-ch-ch guitar sound`,`damped strings`],
  myth:`It is not the same as playing quietly. A palm mute can be brutally loud — what makes it a mute is that the note stops fast, not that it is soft.`,
  known:`The engine of punk, metal and hard-rock rhythm playing. It turns a chord into a percussion instrument, which is what lets a guitar lock tightly to the kick drum instead of floating over it.`,
  origin:`Clipped rhythm playing in late-1950s surf and rockabilly; hard rock and metal made it the default rhythm texture from the 1970s onward.`,
  first:`1950s`, peak:[`1970s`,`1980s`,`1990s`],
  exemplar:{ kind:'exemplifies', title:`Master of Puppets`, artist:`Metallica`, year:`1986`,
    listen:`The title track is palm-muted downpicking for eight minutes. Listen to the choked, chugging verses against the ringing clean section in the middle — the same guitar, the hand on and then off the strings.` },
  domains:['guitar'],
  match:['palm mut','palm-mut'],
  kinds:['technique'],
  nature:'continuous',
  range:`A dial, not a switch. Heel barely touching and the note still rings, just tightened. Heel pressed hard across the bridge and there is almost no pitch left, only thud. Most recorded rhythm guitar sits in between and moves within a single riff.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Likely one of the safer bets — but note what the corpus cannot tell us. All eight prompts using "palm-muted" also say "distorted", and most name a heavy genre outright. So the open question is not whether the phrase registers, but whether it registers as an articulation at all, or merely as one more cue for "heavy rock guitar". A minimal pair against an otherwise identical prompt is the only way to separate those.` },
  ev:[
    { n:194, span:`palm-muted`, state:'candidate', why:`The cleanest test case on the card: a short root prompt where palm-muted guitar is nearly the whole instruction, with little else competing.` },
    { n:144, span:`palm-muted`, state:'candidate', why:`The extreme end of the dial — "palm-muted churn alternating with vast sustained power chords" puts muted and unmuted side by side inside one prompt.` },
    { n:127, span:`palm-muted`, state:'candidate', why:`Palm muting used for rhythmic precision rather than heaviness, locked to a syncopated figure.` },
    { n:18,  span:`palm-muted`, state:'candidate', why:`Pop-punk context — the same technique at a lighter distortion setting.` }
  ]
},

{
  id:'brushes',
  term:`Brushes`,
  sounds:`Instead of a crack on the backbeat, a soft continuous shhh circling round and round like someone sweeping a floor in time. Nothing snaps, nothing cuts through. You feel the beat as a wash rather than counting it, and the room seems smaller and later at night than it did a moment ago.`,
  gloss:`Wire or nylon brushes used instead of drumsticks. They can be swept across the drumhead for a continuous shhh, or tapped for a soft, blunt hit with no crack to it.`,
  syn:[`brushed drums`,`wire brushes`,`swept snare`,`swishing drums`,`soft jazz drums`,`that brushy sound`],
  myth:`Brushes are not just quiet sticks. A stick played softly still goes tick; a brush can produce a sustained sweeping sound that a stick physically cannot make at any volume.`,
  known:`Jazz ballads, torch songs, and any arrangement that wants a pulse without a backbeat hitting the listener. They keep time as a texture rather than as a series of events.`,
  origin:`Early-20th-century dance bands needing a kit that would not drown a room; became the standard ballad voice of postwar small-group jazz.`,
  first:`1920s`, peak:[`1940s`,`1950s`],
  exemplar:{ kind:'exemplifies', title:`Fly Me to the Moon`, artist:`Frank Sinatra`, year:`1964`,
    listen:`The kit never once cracks. The pulse arrives as a continuous sweep rather than as hits, which is why the arrangement can stay this quiet and still swing.` },
  domains:['drums'],
  match:['brush'],
  kinds:['instrument','technique'],
  nature:'continuous',
  range:`From a circular sweep with no articulation at all, to "brushed-then-struck" where the brush lands like a soft stick — a phrase the sister library uses verbatim in #1.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The best-evidenced term on this page and, awkwardly, one of the least testable as it stands: 68 corpus prompts use a brush word, and essentially all of them also name a genre that already implies brushes. The honest question is whether "brushed" adds anything that "late-night noir jazz ballad" has not already supplied. This is a term where the answer might genuinely be no.` },
  ev:[
    { n:2,  span:`brushed`, state:'candidate', why:`Brushes as the defining texture of the whole arrangement — the phrase sits in the opening clause.` },
    { n:16, span:`brushed`, state:'candidate', why:`"Brushed shuffle drums" — brushes carrying a groove rather than a ballad, which is the less obvious use.` },
    { n:1,  span:`brushed`, state:'candidate', why:`"Brushed-then-struck snare" — the range described in one phrase, inside a single prompt.` },
    { n:12, span:`brushed`, state:'candidate', why:`"Soft brushed kit" in a gospel setting, where the brushes are supporting rather than leading.` }
  ]
},

{
  id:'rhodes',
  term:`Rhodes electric piano`,
  sounds:`A soft hollow bell tone with a woody knock at the front of each note, blurred at the edges as though heard through warm air. Chords sit back behind everything else and glow rather than cut. Lean on the keys and it barks — the bell turns gritty and starts to bite.`,
  gloss:`An electric piano from the 1960s and 70s whose hammers strike small metal tines instead of strings. Bell-like and round when played gently; it growls when played hard.`,
  syn:[`electric piano`,`e-piano`,`bell piano`,`that warm keyboard sound`,`tine piano`,`suitcase piano`],
  myth:`It is not a synthesiser and not a digital piano. It is a mechanical instrument with moving parts — the sound is metal actually being struck, not a waveform being generated.`,
  known:`Neo-soul, 1970s jazz fusion, lounge, and trip-hop. Its signature quality is that it fills space without competing: warm, round, and slightly out of focus by design.`,
  origin:`Developed from a wartime portable-instrument idea in the mid-1950s, mass-produced through the 60s and 70s, then rediscovered by 1990s hip-hop and neo-soul producers.`,
  first:`1950s`, peak:[`1970s`,`1990s`,`2000s`],
  exemplar:{ kind:'exemplifies', title:`Riders on the Storm`, artist:`The Doors`, year:`1971`,
    listen:`The electric piano is the whole atmosphere here. Bell-like and slightly blurred under the rain, and it never once competes with the voice — that reluctance to cut through is the instrument's defining quality.` },
  domains:['keys'],
  match:['rhodes'],
  kinds:['instrument'],
  nature:'continuous',
  range:`Played softly it is pure bell tone. Dug into, the tines overdrive into a bark. Running it through tremolo or chorus is so standard that many listeners believe the wobble is part of the instrument itself.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The sharpest test on this page of the question the whole library exists to ask: does a specific make resolve, or does it collapse into its category? If "Rhodes" and "electric piano" produce the same result, that is a more valuable finding than fifty cards confirming things that were obvious — and it would tell us how much of the rest of the Keys domain is worth writing.` },
  ev:[
    { n:20, span:`Rhodes`, state:'candidate', why:`The canonical neo-soul use — "Rhodes electric piano" named outright, so the make and the category appear together.` },
    { n:39, span:`Rhodes`, state:'candidate', why:`"Smoky Rhodes chords" in trip-hop, where the instrument is atmosphere rather than a lead.` },
    { n:79, span:`Rhodes`, state:'candidate', why:`"Muzak Rhodes" — the make used as a period and mood signifier, which is exactly the collapse risk worth testing.` },
    { n:68, span:`Rhodes`, state:'candidate', why:`"Muted Rhodes" sitting far back in a cool-jazz arrangement.` }
  ]
},

{
  id:'melisma',
  term:`Melisma`,
  sounds:`One syllable stretches out and the voice goes travelling — three notes, or thirty — rippling upward and sliding back down before the word finally lands. The vowel bends and catches on the way, so you hear a singer decorating a word rather than merely singing it. Held long enough it stops sounding like melody and starts sounding like weeping, or like ecstasy.`,
  gloss:`Singing several — sometimes many — different notes on a single syllable, instead of one note per syllable. The word stretches while the melody keeps moving underneath it.`,
  syn:[`runs`,`vocal runs`,`riffs`,`ornamentation`,`curls`,`that thing where they sing lots of notes on one word`],
  myth:`It is not vibrato. Vibrato wobbles around a single pitch; melisma actually travels between different pitches. It is also not inherently showing off — it is the default in several of the world's oldest vocal traditions.`,
  known:`Gospel and R&B runs, but equally Qawwali, flamenco, Byzantine chant and sean-nós. In pop it reads as virtuosity; in devotional music it reads as intensity.`,
  origin:`Ancient and near-universal in liturgical singing; entered Western popular music through gospel and soul, and became a mainstream pop expectation from the late 1980s.`,
  first:`ancient`, peak:[`1990s`,`2000s`],
  exemplar:{ kind:'popularised', title:`Vision of Love`, artist:`Mariah Carey`, year:`1990`,
    listen:`Widely credited with making melisma a mainstream pop expectation. Listen to the ends of phrases, where a single syllable travels through a dozen notes before the word finally lands.` },
  domains:['voice'],
  match:['melisma'],
  kinds:['technique'],
  nature:'continuous',
  range:`From a light three-note curl at the end of a phrase — #20 calls it "light agile melisma curling around the phrase-ends" — to sustained microtonal runs that carry the entire line, as in #11.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`One of the few terms in the corpus with evidence pointing both ways. It appears in 52 positive prompts and also in negative prompts (#4, #16) written specifically to keep it out. If it works as a negative, that is a strong signal it resolves — a term the model can be asked to suppress is a term it recognises. That inference is worth testing directly, because it would apply to every other term used as a negative.` },
  ev:[
    { n:11, span:`melisma`, state:'candidate', why:`The maximal end — "long microtonal melisma" as the central feature of the vocal, not an ornament on it.` },
    { n:20, span:`melisma`, state:'candidate', why:`The minimal end — "light agile melisma curling around the phrase-ends".` },
    { n:16, span:`melismatic`, state:'candidate', why:`The lesson is in the NEGATIVE here: "melismatic runs" appears in the neg field, an attempt to suppress the term. Note the inflection — the literal recorded is what is actually present, not the dictionary form.` },
    { n:4,  span:`melisma`, state:'candidate', why:`A second negative-field use, in a coldwave prompt where any soul inflection was unwanted.` }
  ]
},

{
  id:'ribbon-mic',
  term:`Ribbon microphone`,
  sounds:`Everything sits a step further back with the glare taken off. Sss sounds soften, brass loses its bite, cymbals turn to air, and the very top of the sound is simply not there — not muffled, just absent. A voice reads as close and old rather than bright and present.`,
  gloss:`A microphone that senses sound with a thin strip of metal foil hanging in a magnet, rather than a stiff plastic diaphragm. It does not capture the very top end, which listeners hear as warm or smooth.`,
  syn:[`ribbon mic`,`warm mic`,`vintage mic`,`smooth microphone`,`old radio mic`,`velocity mic`],
  myth:`Warmth is not something the microphone adds — it is brightness the microphone fails to capture. A ribbon is gentle at the top because the foil is heavy and slow to move, not because it enriches anything.`,
  known:`Broadcast and big-band recording from the 1930s to the 50s; now reached for deliberately on brass, guitar amps, and voices that would otherwise sound harsh.`,
  origin:`Broadcast and record studios of the 1930s. The standard studio voice microphone until condensers displaced it in the 1950s, then revived as a deliberate period choice.`,
  first:`1930s`, peak:[`1930s`,`1940s`,`1950s`],
  domains:['microphone'],
  match:['ribbon mic','ribbon-mic','ribbon microphone'],
  kinds:['instrument'],
  nature:'continuous',
  range:`From "single ribbon mic, dry close porch-recording feel" (#3), where the mic is the entire signal chain, to "vintage ribbon mic into overdriven tube preamp" (#1), where the preamp is plainly doing most of the audible work.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Carrying a standing suspicion, recorded here before any test so that confirming it later does not look like hindsight: microphone terminology may operate entirely by connotation. All 11 corpus prompts using "ribbon mic" also say something like vintage, warm, dry, porch-close, or 1930s. The model may be responding to that surrounding period language and ignoring the microphone completely. This is the strongest minimal-pair candidate on the page — and if it collapses, that single finding covers the whole Microphone domain, which is otherwise a sixty-card rabbit hole.` },
  ev:[
    { n:3,  span:`ribbon mic`, state:'candidate', why:`"Single ribbon mic, dry close porch-recording feel, minimal processing" — the least cluttered chain in the corpus, so the best candidate for an A/B.` },
    { n:36, span:`ribbon mic`, state:'candidate', why:`"Single ribbon mic, dry porch-close capture, no processing" — a near-duplicate of the above in a different genre, useful as a consistency check.` },
    { n:1,  span:`ribbon mic`, state:'candidate', why:`The opposite case — the mic named inside a long chain, where isolating its contribution should be impossible.` },
    { n:12, span:`ribbon mic`, state:'candidate', why:`"Warm vintage ribbon mic" paired with room ambience, the connotation-cluster the note above warns about.` }
  ]
},

{
  id:'mic-into-the-red',
  term:`Driving the mic into the red`,
  sounds:`The sound tears. At the loudest moments the voice stops getting louder and starts breaking into a crushed, fuzzy rasp — edges fraying, consonants splattering. You can hear the equipment failing, and it sounds like the performance is barely being contained. The whole recording feels one notch too hot, and the excitement is in that.`,
  gloss:`Singing — or more often screaming — louder than the microphone and the preamp behind it can cleanly handle, so the signal overloads and breaks up. The distortion is not added afterwards. It happens at the moment of capture, inside the equipment.`,
  syn:[`mic overload`,`blown-out vocal`,`clipping the mic`,`redlining`,`cranking the mic`,`hot signal`,`trashed vocal`,`the mic cannot take it`],
  myth:`It is not the singer's voice distorting. A perfectly clean voice can be driven into the red, and a shredded, fraying voice can be captured spotlessly. This is the equipment breaking up, not the throat — the two get confused because records that want one usually want both at once.`,
  known:`Hardcore, garage rock, sludge and lo-fi indie — anywhere a recording is meant to sound like it barely survived the performance. It reads as urgency and refusal to polish, which is exactly why it kept being used long after it stopped being an accident.`,
  origin:`Began as a mistake in cheap rooms and basement shows; adopted on purpose from the late-1970s punk underground, became a signature of 1980s hardcore and 1990s lo-fi and garage revival, and returned as deliberate, exaggerated clipping in 2010s hyperpop.`,
  first:`1970s`, peak:[`1980s`,`1990s`,`2010s`],
  domains:['microphone','voice'],
  match:['into the red','driven into clipping','blown-out','blown out','overdriven mic','overdriven dynamic mic','cranked dynamic mic','overdriven console','overdriven tube preamp'],
  kinds:['technique'],
  nature:'continuous',
  range:`A wide dial, and the corpus happens to sit at three points on it. "Cranked dynamic mic ... light tape drive" (#27) is hot but intact — you hear the push, not the breakup. "Mic driven into the red" (#8, #72) is audibly wrecked. "Mic driven into clipping" (#13) is the far end, where consonants start losing their edges.

Worth knowing before you open the examples below: the word "blown-out" travels. It gets applied to a whole mix, a drop or a master about as often as to a microphone, so it is a looser instruction than the explicit "mic driven into..." phrasing — and several of the matched examples are overloaded records rather than overloaded microphones.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`This is the sharp test of the whole Microphone domain, and it is deliberately paired with the ribbon-mic card. That card suspects microphone terms work purely by connotation — but ribbon warmth is subtle, so a null result there would prove very little. Overload is not subtle: it is a gross, unmistakable change to the sound. If the generator can do this and cannot do ribbon warmth, the boundary is about subtlety rather than about microphones. If it cannot do even this, the entire domain is connotation, and that single finding is worth more than sixty careful cards.

A confound to design around before trusting any result: nearly every prompt using these phrases ALSO describes a voice that is already fraying, cracking or shouted full-force. So the existing corpus cannot separate "the model overloaded the capture chain" from "the model made someone shout". #70 is the one entry that puts the ambiguity in a single prompt, and a minimal pair against a calm vocal is what would settle it.` },
  ev:[
    { n:13, span:`Mic driven into clipping`, state:'candidate', why:`The far end of the dial, and the most explicit about mechanism — the prompt names the clipping and the room bleed rather than describing a sound.` },
    { n:27, span:`Cranked dynamic mic`, state:'candidate', why:`The light end: hot and pushed, with "light tape drive", but nothing is meant to be actually broken. If the generator treats this the same as #13, the term is a switch and not a dial.` },
    { n:70, span:`Overdriven dynamic mic`, state:'candidate', why:`The sharpest case on the card. This prompt describes the VOICE as "a blown-out mid-high yowl" and the CHAIN as an overdriven mic, separately, in one breath — so it is the natural place to hear whether the generator distinguishes a wrecked singer from a wrecked microphone.` },
    { n:8,  span:`Mic driven into the red`, state:'candidate', why:`The same literal phrase as #72 in a completely unrelated genre — a consistency check on the wording itself rather than on the style around it.` }
  ]
},

{
  id:'plate-reverb',
  term:`Plate reverb`,
  sounds:`A wide, smooth, silvery halo behind the voice that fades away evenly to nothing. Enormous, but not like anywhere — no walls, no corners, no echo you could pace out. Voices and snares sit inside a shimmer that flatters everything and belongs to no room you have ever stood in.`,
  gloss:`Reverb made by vibrating a large sheet of steel and listening to it with pickups. It gives a dense, smooth wash with no sense of a room's shape — big, but not like anywhere in particular.`,
  syn:[`plate`,`lush reverb`,`smooth reverb`,`studio reverb`,`the wash`,`that big vocal reverb`],
  myth:`It is not a recording of a room. There is no room involved at all — a plate is a piece of furniture-sized hardware. The reason it sounds unnatural in a pleasing way is that no physical space decays that evenly.`,
  known:`Vocals and snare drums from the late 1950s on. It is why so many classic records sound enormous without sounding like a church.`,
  origin:`German studio hardware of the late 1950s; the default studio reverb through the 60s and 70s, until digital units displaced it.`,
  first:`1950s`, peak:[`1960s`,`1970s`],
  exemplar:{ kind:'exemplifies', title:`Bridge Over Troubled Water`, artist:`Simon and Garfunkel`, year:`1970`,
    listen:`The lead vocal sits in a wide, smooth, evenly-decaying halo that belongs to no room you could pace out. That absence of any sense of walls is what distinguishes a plate from a real space.` },
  domains:['room','voice','drums','guitar'],
  match:['plate reverb','plate-reverb'],
  kinds:['instrument'],
  nature:'continuous',
  range:`From "only short plate reverb" (#241), where it merely thickens a voice, to "drenched in deep plate reverb that smears the phrase-tails" (#37), where it becomes the dominant texture of the record.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`A test of whether the generator separates reverb types or hears one generic reverb control. Plate, spring, hall and chamber are physically very different things, and the corpus uses all four as though they were distinct — but that is our assumption showing, not evidence. This card is also the page's working example of a leaf with several parents: it belongs to Room & Space, but equally to voice, drums and guitar, and forcing it under one would have meant either an arbitrary pick or four duplicate cards.` },
  ev:[
    { n:37,  span:`plate reverb`, state:'candidate', why:`The maximal end — reverb as the main event, "smearing the phrase-tails".` },
    { n:241, span:`plate reverb`, state:'candidate', why:`The minimal end — "only short plate reverb", chosen precisely to stay out of the way.` },
    { n:48,  span:`plate reverb`, state:'candidate', why:`"Lush plate reverb, voice clear above the wash" — the classic vocal application.` },
    { n:284, span:`plate reverb`, state:'candidate', why:`"Plate reverb on everything except the lead" — reverb used to separate a voice from its own arrangement.` }
  ]
},

{
  id:'sidechain-compression',
  term:`Sidechain compression`,
  sounds:`The track breathes. On every kick drum everything else ducks away for an instant and swells back up, so the music pulses in and out like lungs. Once you notice it you cannot stop hearing it — the whole record seems to inhale on the beat and exhale between beats.`,
  gloss:`The bass and pads are automatically turned down every time the kick drum hits, then let straight back up. You hear it as a rhythmic breathing or pumping underneath the track.`,
  syn:[`pumping`,`ducking`,`the pump`,`sidechain`,`that breathing sound`,`the whoosh in dance music`],
  myth:`The pumping is usually the point, not a side effect. It started as a mixing fix to stop the kick and bass fighting each other, but in dance music it is now added deliberately and exaggerated well past what any fix would need.`,
  known:`House, trance, EDM and nu-disco. It is the mechanism behind the sense that dance music is inhaling and exhaling rather than simply repeating.`,
  origin:`A broadcast and mixing technique from the 1960s; became an audible musical effect in late-1990s French house and filtered disco.`,
  first:`1960s`, peak:[`1990s`,`2000s`,`2010s`],
  exemplar:{ kind:'popularised', title:`One More Time`, artist:`Daft Punk`, year:`2000`,
    listen:`The pumping is not subtle and is not hidden. Everything ducks on each kick and swells back between them, so the track audibly breathes — this is the record that made the effect a genre signature rather than a mixing fix.` },
  domains:['production'],
  match:['sidechain','side-chain'],
  kinds:['technique'],
  nature:'continuous',
  range:`The corpus supplies three intensity settings of the same term in three prompts: "sidechained pads" (#88) as subtle glue, "brutal sidechain pump" (#J1), and "hard sidechain breathing" (#J3). That makes this the easiest term on the page to test as a range rather than a yes/no.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Worth testing for degree, not existence. Because three prompts already sit at different intensities with otherwise different material, the first real experiment here is whether the intensity words — subtle, brutal, hard — move the result at all, or whether every mention produces the same amount of pump.` },
  ev:[
    { n:95, span:`sidechained`, state:'candidate', why:`"Sidechained pumping pads" in nu-disco — the effect in its native habitat.` },
    { n:'J1', span:`sidechain`, state:'candidate', why:`"Brutal sidechain pump" — the loud end of the intensity range.` },
    { n:'J3', span:`sidechain`, state:'candidate', why:`"Hard sidechain breathing" — a second high-intensity reading, useful for checking consistency of wording.` },
    { n:106, span:`side-chained`, state:'candidate', why:`Hyphenated inflection — "punchy side-chained drums". Recorded as it actually appears, which is the whole reason spans are literals and not dictionary forms.` }
  ]
},

{
  id:'drone',
  term:`Drone`,
  sounds:`One note that simply will not go away, humming underneath everything from beginning to end. Chords move above it and it stays put, so each change rubs against it — sometimes sweet, sometimes sour — and the music stops feeling like it is travelling anywhere. There is a faint buzz where the held note grinds against the others. Hypnotic, and slightly airless on purpose.`,
  gloss:`One note held or repeated underneath everything else while the melody moves above it. It does not change to follow the chords — the chords change around it.`,
  syn:[`held note`,`sustained bass`,`pedal tone`,`the hum`,`that one note underneath`,`tambura`],
  myth:`A drone is not simply a long chord. The point is that it stays put while the harmony moves against it — the friction between the fixed note and the moving one is the whole effect.`,
  known:`Indian classical music, Highland pipes, Appalachian fiddle, doom metal and ambient. It is one of the oldest harmonic devices in existence.`,
  origin:`Predates written harmony; arrived independently in folk and devotional traditions across Europe, Asia and North Africa.`,
  first:`ancient`, peak:[`1960s`,`1990s`],
  exemplar:{ kind:'exemplifies', title:`Tomorrow Never Knows`, artist:`The Beatles`, year:`1966`,
    listen:`One chord for the whole song over a held drone, with everything else moving above it. The harmony never resolves anywhere, which is why it feels hypnotic rather than unfinished.` },
  domains:['harmony'],
  match:['drone','droning'],
  kinds:['technique'],
  nature:'continuous',
  range:`From an instrument built to produce it — "pumping harmonium drone" (#11), "fiddle drone" (#3) — to a drone created as a by-product of an effect, as in "feedback drone" (#8).`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Complicated by a collision the test design has to account for: "drone" names both the harmonic device described here and a set of genres (drone metal, drone ambient). A prompt saying "drone" may be steering genre rather than harmony, and a demo that sounds right could be right for the wrong reason. Separate the two before trusting any result — probably by testing the word against a genre it does not belong to.` },
  ev:[
    { n:11, span:`drone`, state:'candidate', why:`"Pumping harmonium drone" — the device in the tradition it is most identified with.` },
    { n:3,  span:`drone`, state:'candidate', why:`"Fiddle drone" in an Appalachian setting — the same device, a different continent, no genre-name collision.` },
    { n:8,  span:`drone`, state:'candidate', why:`"Feedback drone" — here the word sits inside a metal prompt, exactly where the genre-versus-device ambiguity bites.` },
    { n:37, span:`droning`, state:'candidate', why:`"Droning organ" — inflected form, recorded as it appears.` }
  ]
},

{
  id:'four-on-the-floor',
  term:`Four-on-the-floor`,
  sounds:`A kick drum straight down the middle — boom, boom, boom, boom — identical, unhurried, never missing. There is no puzzle to it: your body locks on within two bars and stays locked. Everything above can be as strange as it likes, because the floor never moves.`,
  gloss:`The kick drum lands on every single beat — one, two, three, four — with no gaps. It is the steadiest pulse available, and it is why you can dance to a track you have never heard before.`,
  syn:[`four to the floor`,`steady kick`,`dance beat`,`thumping kick`,`straight kick`,`that boom boom boom boom`],
  myth:`It describes the kick drum only — not the tempo, and not the genre. A slow, sad song can be four-on-the-floor, and plenty of very fast music is not.`,
  known:`Disco first, then house, techno and most dance music since. Also common in rock and indie whenever a track wants relentlessness instead of swing.`,
  origin:`Named for the bass-drum pedal on the floor; became the defining figure of mid-1970s disco and carried into house and techno through the 80s.`,
  first:`1970s`, peak:[`1970s`,`1980s`,`1990s`],
  exemplar:{ kind:'popularised', title:`Stayin' Alive`, artist:`Bee Gees`, year:`1977`,
    listen:`Kick on all four, unvarying, for the entire song. The hi-hat opens on the offbeats to lighten it, which is exactly the disco treatment the card describes.` },
  domains:['rhythm'],
  match:['four-on-the-floor','four on the floor'],
  kinds:['technique'],
  nature:'continuous',
  range:`Binary at its core — the kick either lands on all four or it does not — but what surrounds it is not. Disco (#22) puts hi-hat sizzle on the offbeats to lighten it; techno strips them away to make it relentless.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The most-used term on this page: 91 corpus prompts. What makes it interesting is that it appears in negative prompts about as readily as positive ones — #10, #11, #17 and #33 all exclude it. Terms that get used as negatives tend to be terms that are actually landing, since nobody bothers suppressing a word that does nothing. That is a reasonable inference and still only an inference until somebody listens to a pair.` },
  ev:[
    { n:22, span:`four-on-the-floor`, state:'candidate', why:`"Four-on-the-floor kick" in disco — the term in the genre that named it.` },
    { n:17, span:`four-on-the-floor`, state:'candidate', why:`Negative use: a boom-bap prompt excluding it, because the whole point of that groove is that the kick does NOT land on all four.` },
    { n:10, span:`four-on-the-floor`, state:'candidate', why:`A second negative use, in reggae — where excluding it protects the one-drop.` },
    { n:33, span:`four-on-the-floor`, state:'candidate', why:`A third negative, in nu-metal. Three independent negatives is itself a small piece of evidence about how the term behaves.` }
  ]
},

{
  id:'key-change',
  term:`Key change`,
  sounds:`Everything lifts at once. The last chorus arrives brighter and higher, the singer sounds like they are reaching a little harder, and the whole band has climbed with them — a physical sensation of the song standing up. Done bluntly there is a half-second hinge where the old key ends and the new one starts, and you can hear the join.`,
  gloss:`The whole song moves up (or down) into a different key partway through, usually for a final chorus. Everything shifts together, so it lands as a lift rather than as a wrong note.`,
  syn:[`modulation`,`key lift`,`stepping up`,`gear change`,`when it goes up at the end`,`truck-driver's modulation`],
  myth:`It is not the singer straining higher — the entire arrangement moves with them. And it is not automatically cheesy: the unprepared last-chorus lift is only one kind, and most other key changes are designed to be invisible.`,
  known:`The final-chorus lift in ballads, contest pop and schlager. Used sparingly it is a structural device; used at the last chorus with a drum fill announcing it, it is a genre signature in its own right.`,
  origin:`A standard device in European art music long before popular song; the undisguised late-chorus lift is a mid-20th-century pop habit, strongest in contest and schlager traditions.`,
  first:`pre-1900`, peak:[`1960s`,`1970s`,`1980s`],
  exemplar:{ kind:'exemplifies', title:`Livin' on a Prayer`, artist:`Bon Jovi`, year:`1986`,
    listen:`The lift before the last chorus is completely undisguised — the whole band climbs a step and a half at once, announced rather than smuggled. It is the version of the device the card calls the maximal one.` },
  domains:['form'],
  match:['key change','key-change'],
  kinds:['technique'],
  nature:'momentary',
  range:`#E2 has "one late shimmering key change handled with restraint" — the event minimised. #356 decorates it: "a string flourish arriving on the key change". #355 is the maximal version, "lifting the final section a whole tone with no attempt to disguise it".`,
  res:{ verdict:'untested', model:null, date:null,
    note:`A structural instruction rather than a timbral one, which makes it a different kind of test from most of this page: the generator has to place an event at a particular point in a form, not colour a sound. Worth knowing early, because if form instructions do not land, a large part of the Form and Arrangement domains is documentation of things we cannot demonstrate.` },
  ev:[
    { n:355, span:`key change`, state:'candidate', why:`The maximal, undisguised version — announced by a drum fill, lifting the final section a whole tone.` },
    { n:356, span:`key change`, state:'candidate', why:`Decorated: a string flourish arrives on the change, so the moment is marked by more than pitch.` },
    { n:360, span:`key change`, state:'candidate', why:`"A key change before the last one" — placement specified relative to song structure, which is the harder instruction.` },
    { n:'E2', span:`key change`, state:'candidate', why:`The restrained end — deliberately underplayed, and the best test of whether subtlety survives at all.` }
  ]
},

{
  id:'call-and-response',
  term:`Call and response`,
  sounds:`A gap, then an answer. One voice sings a line and stops; something else — a choir, a horn section, a crowd — fills the space it left, and the two trade back and forth. The pleasure is entirely in the gap: you start anticipating the reply, and when it lands the music feels populated rather than performed.`,
  gloss:`One voice or instrument makes a statement and another answers it. The answer is a genuine reply — it waits its turn rather than playing along underneath.`,
  syn:[`call-and-answer`,`question and answer`,`trading`,`back-and-forth`,`antiphony`,`when the choir answers the singer`],
  myth:`It is not the same as backing vocals or harmony. Backing vocals sing with the lead; a response happens after the call, in the gap the call deliberately leaves open.`,
  known:`West African musical practice and everything descended from it — work songs, field hollers, gospel, blues, jazz trading, hip-hop crowd chants. Sea shanties arrived at the same structure independently.`,
  origin:`West African musical practice carried into the Americas; independently present in European work-song and liturgical traditions.`,
  first:`ancient`, peak:[`1950s`,`1960s`],
  exemplar:{ kind:'exemplifies', title:`Shout`, artist:`The Isley Brothers`, year:`1959`,
    listen:`Built entirely on a lead line answered by a group, over and over. The pleasure is in the gap — you start anticipating the answer, and the record keeps rewarding it.` },
  domains:['arrangement'],
  match:['call-and-response','call and response'],
  kinds:['technique'],
  nature:'continuous',
  range:`From an occasional answering figure decorating a chorus, to "call-and-response as the whole architecture" (#148), where the form consists of nothing else.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The most interesting term on the page to test, because it constrains arrangement rather than sound. It requires the generator to leave a gap and then fill it with a different voice — a structural demand, not a timbral one. If it lands, that is real evidence the model can be steered on form. If it does not, that limitation is worth knowing before anyone writes a hundred more Form and Arrangement cards. Either result is worth more than a confirmation.` },
  ev:[
    { n:148, span:`call-and-response`, state:'candidate', why:`"Call-and-response as the whole architecture" — the maximal case, where failure would be unmissable.` },
    { n:61,  span:`call-and-response`, state:'candidate', why:`A sea shanty built on lead-and-crew answering, with the prompt explicitly "leaving gaps for the crew to answer".` },
    { n:52,  span:`call-and-response`, state:'candidate', why:`Gospel, where the choir answers the shout — the tradition most listeners will recognise instantly.` },
    { n:178, span:`call-and-response`, state:'candidate', why:`The outlier worth having: call-and-response between synths rather than voices, testing whether the term survives outside its home genre.` }
  ]
},


{
  id:'gated-reverb',
  term:`Gated reverb`,
  sounds:`A snare that sounds like it was hit in an aircraft hangar and then had the hangar switched off. Each hit blooms out huge for a fraction of a second and stops dead — a giant thud with a hard edge on the end of it, no tail, no ring. Drums sound colossal and slightly unreal at the same time.`,
  gloss:`A huge reverb is put on the drum and then chopped off a fraction of a second after it starts, instead of being allowed to fade. You get the size of an enormous room with none of the ring — a giant thud that stops dead.`,
  syn:[`gated snare`,`the 80s drum sound`,`big snare`,`that huge stopping snare`,`gated ambience`,`the drum that cuts off`],
  myth:`The gate is on the reverb, not on the drum. Nothing is being cut from the hit itself — the enormous room around it is switched off mid-decay, which is why it sounds impossible rather than merely loud.`,
  known:`The defining drum sound of 1980s pop, new wave and synth-pop, and the fastest way to date a record to that decade. Later picked up again without irony by synthwave.`,
  origin:`A studio accident in early-1980s London — a talkback microphone run through heavy compression and a noise gate; spread through 1980s pop and new wave, and returned deliberately in 2010s synthwave and darksynth.`,
  first:`1980s`, peak:[`1980s`,`2010s`],
  exemplar:{ kind:'popularised', title:`In the Air Tonight`, artist:`Phil Collins`, year:`1981`,
    listen:`The drums stay away for three and a half minutes, so when the fill finally arrives the gated snare is the first thing you have heard hit hard — huge, and cut off dead. It is the sound this whole card describes, and the record that made every studio want it.` },
  domains:['production','drums'],
  match:['gated reverb','gated snare','gated drum','gated ambience'],
  kinds:['technique'],
  nature:'continuous',
  range:`From one texture among many — "gated reverb drums" sitting in a list of synth parts (#86) — to a root prompt where "gated reverb snares" leads the whole instruction (#182).`,
  res:{ verdict:'untested', model:null, date:null,
    note:`A good test of whether the generator hears an effect or a decade. Every corpus prompt using it also says 1980s, synthwave or new wave, so the term may be doing nothing the period cue has not already done — the same connotation trap the ribbon-mic card describes, in a different domain. One encouraging detail: it also appears as a negative in #243, and a word worth suppressing is usually a word that registers.` },
  ev:[
    { n:182, span:`gated reverb snares`, state:'candidate', why:`A root prompt where the effect leads rather than decorates — the least cluttered case, and the best candidate for a pair.` },
    { n:86,  span:`gated reverb drums`, state:'candidate', why:`The ordinary use: one item in a list of period synth parts, where the decade is doing much of the work.` },
    { n:49,  span:`gated reverb drums`, state:'candidate', why:`Names "gated ambience" separately in the same prompt, so the gating is applied twice over and should be unmissable if it lands at all.` },
    { n:243, span:`gated reverb`, state:'candidate', why:`The lesson is in the NEGATIVE: an ambient prompt excluding it outright, which is a small piece of evidence that the term is recognised.` }
  ]
},

{
  id:'falsetto',
  term:`Falsetto`,
  sounds:`The voice thins out and floats. It goes high without the strain you expect — breathy, hollow, a little glassy, as though the singer stepped sideways into a lighter instrument instead of pushing harder. Often you can hear the exact moment they flip into it, a small break or catch, and that flip is half the thrill.`,
  gloss:`A separate way of making high notes, where only the edges of the vocal folds vibrate. It comes out lighter and more hollow than an ordinary voice pushed high, and it can be reached easily where a normal high note takes force.`,
  syn:[`the light high voice`,`airy high notes`,`the thin register`,`breathy high singing`,`head voice`,`when they go up soft and floaty`],
  myth:`Falsetto and head voice are not the same thing, though they are treated as synonyms constantly. Head voice is the ordinary voice carried high with the folds still fully vibrating; falsetto is a different mechanism that has thinned out. And falsetto is not automatically quiet — it can be belted hard.`,
  known:`Doo-wop and soul, disco, indie folk and modern R&B. It reads as either vulnerability or ecstasy depending almost entirely on how hard it is pushed, with very little in between.`,
  origin:`Ancient in liturgical singing wherever high voices were wanted; entered popular music through gospel and doo-wop, and became a mainstream pop expectation from the 1970s onward.`,
  first:`ancient`, peak:[`1950s`,`1970s`,`2000s`],
  exemplar:{ kind:'exemplifies', title:`Kiss`, artist:`Prince`, year:`1986`,
    listen:`The entire lead vocal sits in falsetto, and it is the loud kind rather than the fragile kind — pushed hard, thin and glassy, with none of the strain a chest voice would show at that pitch.` },
  domains:['voice'],
  match:['falsetto'],
  kinds:['technique'],
  nature:'continuous',
  range:`#9 is the fragile end — "a thin breathy falsetto floating high in the head voice, barely supported". #5 is the opposite — "a strong belted falsetto" with grit at the top. Same mechanism, opposite effect.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The most-used vocal term in the corpus: 99 prompts, and a great many more excluding it. The interesting question is not whether it registers but whether its RANGE does — whether "fragile breathy falsetto" and "belted falsetto" produce genuinely different results or one generic high voice. #9 and #5 are close to a ready-made pair already, which makes this the cheapest range test on the page.` },
  ev:[
    { n:9,   span:`falsetto`, state:'candidate', why:`The fragile end, and useful for the misconception too — the prompt names falsetto and head voice in the same breath, exactly as singers usually conflate them.` },
    { n:5,   span:`falsetto`, state:'candidate', why:`The loud end: "a strong belted falsetto" with head-voice flips and grit, which most listeners would not expect the word to cover.` },
    { n:140, span:`falsetto`, state:'candidate', why:`Falsetto used as an answering voice rather than a lead — a third role for the same mechanism.` },
    { n:2,   span:`falsetto`, state:'candidate', why:`Negative use, in a noir-jazz prompt protecting a low unadorned croon.` }
  ]
},

{
  id:'slide-guitar',
  term:`Slide guitar`,
  sounds:`A guitar that whines and cries between the notes instead of stepping between them. Pitches swoop and slither, wobbling around a note the way a voice does, and you can hear the object rattling faintly against the strings. It sounds like something moaning — which is why it answers singers so well.`,
  gloss:`Rather than pressing a string down behind a fret, a smooth hard object is laid on top of it and moved along. The pitch slides continuously instead of stepping, so the guitar can cry and wail between the notes.`,
  syn:[`bottleneck`,`slide`,`steel`,`that crying guitar`,`whining guitar`,`glass slide`,`the guitar that sounds like singing`],
  myth:`It is not a whammy bar or a pitch-bend effect. Nothing is stretching the string — the note is being carried along it by hand, which is why a slide can travel any distance and stop anywhere between two frets.`,
  known:`Delta blues first, then rock, country and gospel. It is the closest a guitar gets to a human voice, which is why it so often answers a singer rather than accompanying one.`,
  origin:`The American South around the turn of the twentieth century, played with a knife back or a cut-off bottle neck; carried into electric blues and from there into rock and country.`,
  first:`1900s`, peak:[`1930s`,`1960s`,`1970s`],
  exemplar:{ kind:'exemplifies', title:`Statesboro Blues`, artist:`The Allman Brothers Band`, year:`1971`,
    listen:`The opening slide figure on the Fillmore East recording. Every note arrives by sliding into it rather than being fretted, and the pitch is never quite still — the guitar is doing what a voice does.` },
  domains:['guitar'],
  match:['slide guitar','bottleneck'],
  kinds:['instrument','technique'],
  nature:'continuous',
  range:`From a lone acoustic resonator carrying an entire arrangement — "does everything: bassline, riff, answer-phrase to every vocal line" (#148) — to distorted electric slide used as "animal noise" (#156).`,
  res:{ verdict:'untested', model:null, date:null,
    note:`One of the better candidates for actually resolving, because the mechanism produces something acoustically distinctive — continuous pitch movement — rather than a tone colour. Failure is correspondingly easy to hear: stepped notes with a blues tone would be a clean negative that needs no expertise to judge. Worth testing alongside "bottleneck" (#147 uses that word for the same thing), which would show whether two names for one technique behave alike.` },
  ev:[
    { n:148, span:`slide guitar`, state:'candidate', why:`The maximal case — one slide guitar carrying the entire arrangement, so failure would be impossible to miss.` },
    { n:36,  span:`slide guitar`, state:'candidate', why:`A lone resonator in a field-recording setting, with a "distant bottleneck answer" named separately in the same prompt.` },
    { n:1,   span:`Slide guitar`, state:'candidate', why:`Electric and amplified rather than acoustic. Note the capital S — the literal is recorded as it actually appears, not as the dictionary form.` },
    { n:156, span:`slide guitar`, state:'candidate', why:`The far edge: slide as texture and noise rather than melody, testing whether the term survives outside its home idiom.` }
  ]
},

{
  id:'hammond-organ',
  term:`Hammond organ`,
  sounds:`A thick, breathy roar that seems to inhale. Each note starts with a faint percussive click, and chords swell up from underneath rather than arriving — then the whole sound begins to rotate, wobbling and swirling around the room as though the speaker were spinning, which it is. Pushed hard it stops sounding like an organ and starts sounding like a crowd shouting.`,
  gloss:`An electric organ that makes its sound with spinning metal wheels beside magnetic pickups. Nine sliders called drawbars mix its harmonics, and it is nearly always heard through a cabinet with a rotating speaker that sets the sound swirling.`,
  syn:[`Hammond`,`drawbar organ`,`tonewheel organ`,`gospel organ`,`that church organ sound`,`the swirly organ`],
  myth:`The swirl is not the organ. It comes from a separate rotating-speaker cabinet, and a Hammond heard without one sounds startlingly plain. The two are so rarely separated that most listeners hear them as a single instrument.`,
  known:`Gospel, soul, ska, blues and progressive rock. Its signature move is the swell — rising underneath a voice rather than playing a part of its own.`,
  origin:`Designed in 1930s America as an affordable church instrument; taken up by gospel congregations and carried into soul, ska and rock across the 1960s.`,
  first:`1930s`, peak:[`1960s`,`1970s`],
  exemplar:{ kind:'exemplifies', title:`A Whiter Shade of Pale`, artist:`Procol Harum`, year:`1967`,
    listen:`The organ carries the whole record. You can hear the faint click at the start of each note and the rotating-speaker swirl underneath, and it swells up under the voice rather than playing a part of its own.` },
  domains:['keys'],
  match:['hammond','drawbar'],
  kinds:['instrument'],
  nature:'continuous',
  range:`The corpus holds two completely different uses under one name: the sustained "Hammond organ swell" holding a chord under a voice (#12), and percussive "Hammond stabs" punched on the offbeat in ska (#191).`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Like the Rhodes card, this asks whether a specific make resolves or collapses into its category — but with an extra layer worth separating. Even if "Hammond" registers, it may be registering the rotating speaker rather than the organ, since the two almost never travel apart. The swell-versus-stab split in the corpus also means this can be tested for articulation as well as for timbre, which most instrument terms cannot.` },
  ev:[
    { n:12,  span:`Hammond organ swell`, state:'candidate', why:`The signature use, named in full — the sustained swell under a voice in a church setting.` },
    { n:52,  span:`Hammond organ`, state:'candidate', why:`"Swelling Hammond organ" in a gospel shout, where the instrument is competing with a full room rather than supporting a soloist.` },
    { n:191, span:`Hammond stabs`, state:'candidate', why:`The opposite articulation: short percussive offbeat stabs in ska. If this and #12 sound alike, the word is carrying timbre but not playing style.` },
    { n:5,   span:`Hammond swell`, state:'candidate', why:`The shortened form, in a soul revue — a wording check against the fuller phrasing in #12.` }
  ]
},

{
  id:'breakbeat',
  term:`Breakbeat`,
  sounds:`Drums that lurch. The snare cracks a fraction late, the hats are uneven, the loop leans and rolls instead of marching — and every few bars you hear it come back around to the same seam, because it is the same few seconds repeating. It sounds like a person playing, slightly worn and slightly dusty.`,
  gloss:`A drum pattern lifted from the few seconds of an old record where everything except the drums drops out, then looped. Its swing and its slight unevenness come from having been played by a person, once, decades ago.`,
  syn:[`breaks`,`the break`,`chopped drums`,`sampled drums`,`that shuffly drum loop`,`looped drums`],
  myth:`It is not a drum-machine pattern. The whole point is that it is a recording of a human drummer being reused, which is why breakbeats feel loose in a way programmed beats have to work hard to imitate.`,
  known:`Hip-hop, jungle, drum and bass, big beat and trip-hop. Entire families of genres exist because of a handful of seconds of drumming recorded around 1970.`,
  origin:`New York block parties of the early 1970s, where DJs extended the drum break of a funk record by cutting between two copies of it; became the foundation of hip-hop and, sped up, of 1990s UK jungle.`,
  first:`1970s`, peak:[`1980s`,`1990s`],
  exemplar:{ kind:'popularised', title:`Amen, Brother`, artist:`The Winstons`, year:`1969`,
    listen:`Six seconds of drum break near the middle became the most sampled recording in history. Hearing it in its original setting, played once by a person and not looped, is the fastest way to understand what a breakbeat actually is.` },
  domains:['rhythm','drums'],
  match:['breakbeat','break beat'],
  kinds:['technique'],
  nature:'continuous',
  range:`#39 is slow and dusty, #113 is "crisp rolling breakbeats" at drum-and-bass speed, and the corpus also holds a hammering punk-rave version. One idea stretched across an enormous tempo range.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Interesting because the term names an ORIGIN rather than a sound. A generator has no crate to dig in — whatever it makes is synthesised, so it cannot literally be a breakbeat. The real question is whether the word gets it to produce the looseness and swing that sampled drums carry, or a clean programmed pattern with a genre label attached. That difference is audible, and it is one of the few places where a term can be judged partly on feel rather than on timbre.` },
  ev:[
    { n:39,  span:`breakbeat`, state:'candidate', why:`"Downtempo dusty breakbeat with cracking snare" — the trip-hop end, slow enough that any stiffness would show.` },
    { n:53,  span:`breakbeat`, state:'candidate', why:`A vocal explicitly "riding the breakbeat", so the rhythm has to be present enough for a delivery to lock to it.` },
    { n:113, span:`breakbeats`, state:'candidate', why:`Plural, and at drum-and-bass tempo — "crisp rolling breakbeats". The literal is recorded as it appears.` },
    { n:124, span:`breakbeat`, state:'candidate', why:`"Hard breakbeat drums" inside a live psychedelic-soul arrangement, where a sampled feel would be at odds with everything around it.` }
  ]
},

{
  id:'syncopation',
  term:`Syncopation`,
  sounds:`The accents land in the cracks. Just as you expect a hit on the beat it arrives a fraction early or late, or the beat is left empty and the note falls between it and the next, so the rhythm trips and catches and tugs at you. It is the thing that makes your head nod without anybody asking it to.`,
  gloss:`Putting the emphasis where the beat is not. Notes land in the gaps between counts rather than on them, so the rhythm pulls against the pulse instead of confirming it.`,
  syn:[`offbeat`,`off the beat`,`upbeat accents`,`that pushed feel`,`against the grid`,`the funky bit`],
  myth:`Syncopation is not the same as being fast or complicated. A slow, very simple part can be heavily syncopated, and a rapid busy part played squarely on the beat is not syncopated at all.`,
  known:`Ragtime, jazz, funk, ska, reggae and effectively all dance music. It is the most reliable single ingredient of what people mean when they call music groovy.`,
  origin:`Fundamental to West African rhythmic practice and carried into the Americas; entered notated Western music through ragtime around 1900 and has been standard in popular song ever since.`,
  first:`ancient`, peak:[`1900s`,`1970s`],
  exemplar:{ kind:'popularised', title:`Maple Leaf Rag`, artist:`Scott Joplin`, year:`1899`,
    listen:`Ragtime is syncopation as the entire premise: a steady left hand against a right hand that keeps landing between the beats. The friction between the two is the whole style.` },
  domains:['rhythm'],
  match:['syncopat'],
  kinds:['technique'],
  nature:'continuous',
  range:`The corpus applies it to two very different layers — a voice using "punchy syncopated phrasing" against ska upstrokes (#46), and a purely instrumental "syncopated hi-hat grid" in techno (#81). Whether one word moves both is a real question.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`A structural instruction rather than a timbral one, so it belongs with call-and-response and stop-time. It is also the term on this page most likely to be already implied: ask for funk, ska or garage and syncopation arrives whether or not it was named. That makes a minimal pair against an otherwise identical prompt the only way to see whether the word does any work of its own — and a null result here would say something about genre cues generally, not just about this term.` },
  ev:[
    { n:46,  span:`syncopated`, state:'candidate', why:`Syncopation in the VOCAL — phrasing riding the upstroke offbeats — rather than in the drums, which is the harder ask.` },
    { n:94,  span:`syncopation`, state:'candidate', why:`The noun rather than the adjective, with the voice "gliding on the syncopation". A wording check as much as a content one.` },
    { n:81,  span:`syncopated`, state:'candidate', why:`Purely instrumental: a "syncopated hi-hat grid" over a straight four-on-the-floor kick, so the two rhythmic ideas can be judged separately.` },
    { n:62,  span:`syncopated`, state:'candidate', why:`Syncopated phrases riding a polyrhythm in afrobeat — the densest rhythmic context, where the term has the most competition.` }
  ]
},

{
  id:'spring-reverb',
  term:`Spring reverb`,
  sounds:`A metallic, splashy shimmer with a distinct boing inside it, wobbling slightly and clattering whenever a loud note hits. It does not sound like a room at all — it sounds like a springy metal box, drippy and cheap in the way that became the sound of surf guitar and dub. Knock the amp and it crashes like stage thunder.`,
  gloss:`Reverb made by sending the sound down an actual coiled spring and listening to what comes back. It is boingy and metallic rather than smooth, and it splashes audibly when hit hard.`,
  syn:[`spring`,`boing`,`that surf guitar reverb`,`twangy reverb`,`amp reverb`,`drip`,`the splashy one`],
  myth:`It is not a small version of a room. A spring imitates no space at all — the drip and rattle are the spring's own resonance, which is exactly why it sounds cheap in a way people came to love rather than tolerate.`,
  known:`Surf and rockabilly guitar, dub, garage rock and outlaw country. Because it was built into guitar amplifiers, it became the default meaning of the word reverb for a whole generation of players.`,
  origin:`Developed in the 1930s for organ cabinets, then built into guitar amplifiers from the early 1960s; adopted on purpose by surf, dub and garage scenes for its cheapness and its splash.`,
  first:`1930s`, peak:[`1960s`,`1970s`],
  exemplar:{ kind:'popularised', title:`Misirlou`, artist:`Dick Dale and His Del-Tones`, year:`1962`,
    listen:`Surf guitar through an amplifier's spring reverb, and the springs are audible as a metallic splash on every attack. The drip and clatter here is exactly what distinguishes a spring from any other reverb.` },
  domains:['room','guitar'],
  match:['spring reverb'],
  kinds:['instrument'],
  nature:'continuous',
  range:`From a period detail — "Telecaster twang with spring reverb" (#16) — to a voice "drowned in spring reverb and tape delay" (#82), where it stops being an effect and becomes the texture.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The direct partner to the plate-reverb card, and together they are the cleanest test of whether the generator separates reverb types at all. Plate and spring are physically and audibly very different — smooth and dense against metallic and boingy — so a pair swapping only that one word should be unmistakable if the distinction lands. If both produce the same generic wash, that single result answers the whole Room and Space domain rather than just this card.` },
  ev:[
    { n:16,  span:`spring reverb`, state:'candidate', why:`The classic pairing — spring reverb on a twanging electric in a country setting, the sound most people picture when they picture the effect.` },
    { n:70,  span:`spring reverb`, state:'candidate', why:`"Trashy spring reverb" in garage rock, where cheapness is the intent rather than a compromise.` },
    { n:82,  span:`spring reverb`, state:'candidate', why:`The maximal end — a voice drowned in it in dub techno, so the reverb is the main texture and not a detail.` },
    { n:69,  span:`spring reverb`, state:'candidate', why:`Negative use: a modern dancehall prompt excluding "vintage spring reverb" to keep the production clean and current.` }
  ]
},

{
  id:'voice-leading',
  term:`Voice-leading`,
  sounds:`Mostly you hear its absence. When it is good, chord changes slip past almost unnoticed — the harmony seems to melt from one shape into the next and you follow without being told to. When it is bad, every change lands as a lump: the whole block of notes jumps somewhere else at once and the music sounds typed rather than played. Listen underneath the tune for small stepwise movements, and for one note holding still while everything shifts around it.`,
  gloss:`How the individual notes inside chords move from one chord to the next. Good voice-leading shifts each part as little as it can, so a change of chord feels like a step rather than a jump.`,
  syn:[`how the chords connect`,`inner parts`,`part-writing`,`smooth changes`,`the movement underneath`,`when chords flow`],
  myth:`It is not the melody, and it is not the chord progression either. It is what happens to the notes underneath the melody while the progression changes — and you notice its absence far more readily than its presence.`,
  known:`Baroque and classical writing, jazz standards, bossa nova and chamber pop — anywhere harmony is meant to feel inevitable rather than blocky. It is the difference between chords that merely follow one another and chords that lead into one another.`,
  origin:`Codified in European church polyphony and taught as part-writing from the Renaissance onward; carried into jazz harmony and, through arrangers, into twentieth-century popular song.`,
  first:`pre-1900`, peak:[`1950s`,`1960s`],
  domains:['harmony'],
  match:['voice-leading','voice leading'],
  kinds:['technique'],
  nature:'continuous',
  range:`The corpus only ever modifies it, never measures it — "graceful" (#48), "rich" (#67), "sophisticated" (#68), "lush" (#54). Whether any of those adjectives change anything is precisely what needs finding out.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The hardest term on this page to demonstrate, and included partly for that reason. Voice-leading is an internal property of an arrangement rather than a sound, so there may be nothing to point at even when it is done well — a minimal pair could be genuinely useless here. The honest possible outcome is that this card documents a term the page cannot demonstrate, which is worth recording rather than hiding: it marks the edge of what listening to two takes can settle, and every Harmony card written later will sit near that edge.` },
  ev:[
    { n:67,  span:`voice-leading`, state:'candidate', why:`Baroque, where voice-leading is the point of the idiom rather than a refinement of it — the best chance of hearing it if it can be heard at all.` },
    { n:68,  span:`voice-leading`, state:'candidate', why:`Bossa and cool jazz: "sophisticated voice-leading" with rich harmonic movement, a different tradition with the same underlying craft.` },
    { n:48,  span:`voice-leading`, state:'candidate', why:`Dream-pop — a modern context where the term is doing decorative work rather than structural, and so the most likely to show nothing.` },
    { n:54,  span:`voice-leading`, state:'candidate', why:`"Lush voice-leading threads the orchestration" — voice-leading across a whole arrangement rather than within a keyboard part.` }
  ]
},

{
  id:'stop-time',
  term:`Stop-time`,
  sounds:`Everything drops out at once. The band cuts, leaving a hole with one voice or one instrument alone inside it, and the silence around them is suddenly enormous. You can feel the beat still running even though nothing is playing it — and when the band slams back in, it lands exactly where you were already counting.`,
  gloss:`The band stops together, leaving a hole. One voice or instrument carries on alone in the gap, then everyone comes back in. The silence is arranged, not an accident.`,
  syn:[`the drop-out`,`band hits`,`breaks`,`hits and holds`,`that bit where everything stops`,`the pause`],
  myth:`It is not a pause, and it is not a fade. Nobody has stopped counting — the pulse continues silently through the gap, which is exactly why the return lands where the ear was already expecting it.`,
  known:`Blues, vaudeville, mariachi, rock and roll and hip-hop. It is the oldest way of making a single voice sound enormous: remove everything else.`,
  origin:`Long-standing in blues and early jazz performance and a staple of vaudeville stagecraft; carried into rock and roll and later into hip-hop arrangement.`,
  first:`1900s`, peak:[`1920s`,`1950s`],
  exemplar:{ kind:'exemplifies', title:`I Got You (I Feel Good)`, artist:`James Brown`, year:`1965`,
    listen:`The band cuts out entirely and leaves the voice alone in the hole, then slams back in exactly where you were still counting. The silence is arranged down to the beat.` },
  domains:['form'],
  match:['stop-time','stop time'],
  kinds:['technique'],
  nature:'momentary',
  range:`From "a stop-time tag" as a named structural section (#152), through "halting stop-time breaks where the riff hangs in the air" (#150), to "a stop-time hole where everything drops but the surface noise of the vinyl" (#384).`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Like key change, an instruction about placing an event in time rather than colouring a sound — and possibly the hardest of that group, because it asks the generator to arrange a silence and then re-enter in the right place. Two things make it a good test anyway: failure is unmistakable, and it needs no expertise to judge, so a lay reader can rule on this card as confidently as a musician could. If form instructions land anywhere, they should land here.` },
  ev:[
    { n:150, span:`stop-time`, state:'candidate', why:`"Halting stop-time breaks where the riff hangs in the air", with dynamics named as the structure — the clearest statement of intent in the corpus.` },
    { n:155, span:`stop-time`, state:'candidate', why:`"Stop-time silences before the final cry" — the device placed at a specific point in the form rather than used throughout.` },
    { n:152, span:`stop-time`, state:'candidate', why:`Stop-time as a named section of the song shape, "verse-chorus with a stop-time tag", which is the most structural framing of the four.` },
    { n:384, span:`stop-time`, state:'candidate', why:`The most extreme: everything drops but the surface noise of the vinyl, so the silence itself has to be audible rather than merely empty.` }
  ]
},

{
  id:'double-tracking',
  term:`Double-tracking`,
  sounds:`One voice that sounds like slightly more than one. Wider and thicker, with a faint blur at the edges of words, and the consonants not quite lining up — a tiny smear on every t and s. It sounds assured and a little unreal, the singer somehow further away and larger than life at once.`,
  gloss:`The same singer records the same part twice and both takes play at once. The tiny differences of timing and pitch between them thicken the voice and blur its edges.`,
  syn:[`doubling`,`double-tracked vocals`,`stacked vocals`,`thickened vocals`,`twice-sung`,`that wide vocal sound`],
  myth:`It is not harmony, and it is not a chorus effect. Both takes sing the identical part — the width comes entirely from human inaccuracy, which is why a perfectly copied track sounds like nothing at all while a slightly out-of-tune second take sounds enormous.`,
  known:`1960s pop, shoegaze, grunge and bedroom pop. It is the standard way to make a thin or shy voice sound assured without making it louder.`,
  origin:`A 1960s studio practice, quickly automated with tape-delay trickery so nobody had to sing everything twice; became a default of pop production and a deliberate aesthetic in 1990s alternative and 2010s bedroom pop.`,
  first:`1960s`, peak:[`1960s`,`1990s`,`2010s`],
  exemplar:{ kind:'popularised', title:`Tomorrow Never Knows`, artist:`The Beatles`, year:`1966`,
    listen:`Artificial double-tracking was invented at these sessions to save singing everything twice. The vocal sounds like slightly more than one person, wider and blurred at the edges of words, without any harmony being sung.` },
  domains:['arrangement','voice'],
  match:['double-track','doubling','stacked harmon','vocal stack'],
  kinds:['technique'],
  nature:'continuous',
  range:`#L1 has a voice "doubling itself slightly out of tune at the chorus" — the flaw used as the effect. #113 doubles "an octave up in fragile falsetto", which is closer to arrangement than to thickening.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The clearest positive-and-negative split on the page after falsetto: a handful of prompts ask for it, and many more exclude it to protect a solo unadorned voice. That asymmetry is useful, because if the negative works the term is being recognised. The subtler question is whether the generator produces two takes with genuine human variation or one take with a widening effect on it — different things that sound alike until compared directly, and exactly the kind of distinction a minimal pair is for.` },
  ev:[
    { n:'L1', span:`doubling`, state:'candidate', why:`The essence of the technique stated outright: "doubling itself slightly out of tune at the chorus", with the imperfection named as the point.` },
    { n:113,  span:`doubling`, state:'candidate', why:`Doubling an octave up in falsetto — the same word used for an arrangement decision rather than for thickening, which tests how wide the term is.` },
    { n:2,    span:`vocal doubling`, state:'candidate', why:`Negative use, protecting a single close noir-jazz croon. Note the literal is the two-word phrase as it appears in the negative.` },
    { n:11,   span:`vocal doubling`, state:'candidate', why:`A second negative, in a devotional prompt where a single unaccompanied-sounding voice was the whole intent.` }
  ]
},

{
  id:'autotune',
  term:`Autotune`,
  sounds:`The pitch snaps instead of sliding. Notes arrive already dead in tune and lock there, and the small scoops a voice normally makes between them get flattened into hard little steps, so the line moves in jumps like a staircase. Held notes sit unnaturally still — no drift, no wobble — and the voice takes on a glassy, faintly electronic ring around the edges. You hear it most at the ends of phrases, where a person would sag and this simply does not.`,
  gloss:`Software that pulls sung notes onto the nearest correct pitch. How fast it pulls is a setting: slow enough and it is an invisible repair, instant and it becomes the hard snapping effect people ask for by name.`,
  syn:[`auto-tune`,`pitch correction`,`tuned vocals`,`that robot voice`,`hard-tuned vocals`,`snapped vocals`],
  myth:`Two different things share one name, and confusing them causes most of the arguments. Gentle correction is meant to be inaudible and is on nearly every record you have ever heard. The hard snap is a deliberate effect. Hearing autotune does not mean somebody could not sing — usually it means somebody wanted that sound.`,
  known:`Late-1990s pop onward as invisible repair; the hard setting became a signature of trap, hyperpop and modern R&B, where the artificiality is the point rather than an embarrassment.`,
  origin:`A pitch-correction tool released in the late 1990s, adapted from seismic data analysis; its most extreme setting was used as an obvious effect on a hit almost immediately and has never stopped being one.`,
  first:`1990s`, peak:[`2000s`,`2010s`,`2020s`],
  exemplar:{ kind:'popularised', title:`Believe`, artist:`Cher`, year:`1998`,
    listen:`The first hit to use the hard setting as an audible effect rather than a repair. Listen to the ends of phrases, where the pitch snaps between notes in hard steps instead of sliding — the engineers claimed it was a vocoder for years.` },
  domains:['production','voice'],
  match:['autotune','auto-tune','pitch correction'],
  kinds:['technique'],
  nature:'continuous',
  range:`The corpus covers this end to end, which is rarer than it sounds. #23 has "the autotune snap an audible part of the timbre" and #90 has it "fused into the timbre" — the effect as the instrument. #321 is the other extreme: "a light autotune sheen on the sustained notes", present but not announcing itself.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The most-used term in the whole corpus by a distance: 315 prompts, but 311 of them are NEGATIVE — entry after entry excluding it to protect a human-sounding voice. That lopsidedness makes it the best test on this page of whether negatives work at all, which is a far bigger question than this one term: every prompt in the library carries eight mandated negatives on the assumption that they do.

Only four prompts ask for it, and all four are cited below, because a demo attached to a prompt that EXCLUDED the term demonstrates its absence rather than the term. That sounds obvious and was got wrong here first time round — this card originally cited four negatives and nothing else, so every one of its demos was a track with no autotune in it.` },
  ev:[
    { n:23,  span:`autotune snap`, state:'candidate', why:`The definitive case — an entry built around the effect, with "the autotune snap an audible part of the timbre" and notes locking and gliding artificially.` },
    { n:90,  span:`autotune`, state:'candidate', why:`Hyperpop, with autotune and formant-shift "fused into the timbre" rather than applied over it — the effect as the instrument itself.` },
    { n:321, span:`autotune`, state:'candidate', why:`The subtle end: "a light autotune sheen on the sustained notes". If this and #23 sound alike, the term is a switch rather than the dial the card describes.` },
    { n:1,   span:`autotune`, state:'candidate', why:`The suppression test, and the only negative kept: excluded alongside "pitch correction" in the same list, so the idea is ruled out twice over. Listen for its ABSENCE, not its presence.` }
  ]
},

{
  id:'tape-saturation',
  term:`Tape saturation`,
  sounds:`Everything softens at the corners. The sharpest transients get quietly rounded off, loud moments thicken and squash instead of stabbing, and a warm haze settles over the whole thing — often with a faint hiss behind it. Bass sounds fatter, cymbals lose their glassiness, and the record feels a little older and a little further away than it did, as though it has been played a few times before reaching you.`,
  gloss:`What happens when magnetic tape is fed more signal than it can hold cleanly. The peaks compress and distort gently instead of clipping, adding harmonics that most people hear as warmth.`,
  syn:[`tape warmth`,`analog warmth`,`tape hiss`,`that warm old sound`,`driven to tape`,`analogue glue`],
  myth:`It is distortion, technically — just very polite distortion. People reach for it because it makes things sound cleaner and more expensive, which is odd given that what it actually does is damage the signal in a flattering way.`,
  known:`Every record made before digital, and deliberately imitated ever since. It is the default meaning of the word warm when applied to a recording.`,
  origin:`An unavoidable property of magnetic tape from the 1950s onward, tolerated and then exploited; reproduced deliberately in software from the 1990s once digital recording proved unforgivingly clean.`,
  first:`1950s`, peak:[`1960s`,`1970s`],
  domains:['production'],
  match:['tape saturation','tape warmth','tape hiss','tape-thick'],
  kinds:['technique'],
  nature:'continuous',
  range:`"Light tape saturation on the voice" (#1) is a finishing touch you would not name if it were absent. "Soaked in cassette distortion and tape saturation so the voice grinds lo-fi and gritty" (#64) is the same idea taken far enough to become the texture.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Worth testing for degree rather than presence, because the corpus already sits at two clearly different intensities with the same words. It also shares the ribbon-mic problem: every prompt using it also says analog, vintage or 1970s, so the term may be riding on period language. If "light tape saturation" and "soaked in tape saturation" produce the same result, that is a finding about intensity modifiers generally.` },
  ev:[
    { n:1,   span:`tape saturation`, state:'candidate', why:`"Light tape saturation on the voice" — the subtle end, and specifically placed on the voice rather than the whole mix.` },
    { n:64,  span:`tape saturation`, state:'candidate', why:`The extreme end: soaked in it until the voice grinds. If the intensity words do anything, this and #1 should be plainly different.` },
    { n:21,  span:`tape saturation`, state:'candidate', why:`"Light tape saturation, close and dry" in grunge — the same light setting in a harsher genre, as a consistency check on #1.` },
    { n:139, span:`tape saturation`, state:'candidate', why:`Applied to a whole industrial arrangement with red-lined samples rather than to a voice, testing whether the term works on a mix.` }
  ]
},

{
  id:'close-miking',
  term:`Close-miking`,
  sounds:`The singer is suddenly inches from your ear. You hear breath being taken, lips parting, the small click of a tongue, the scrape of fingers moving on a string — all the noises a performance makes that a room would normally swallow. The voice also gets noticeably fuller and heavier at the bottom just from being near the microphone, so it sounds intimate and slightly too large at once, like someone confiding in you.`,
  gloss:`Placing the microphone very near the source instead of back in the room. Almost no room sound gets captured, and a directional microphone close up exaggerates low frequencies — an effect called proximity.`,
  syn:[`close mic`,`right up on the mic`,`intimate capture`,`in your ear`,`breath detail`,`dry and close`],
  myth:`It is not the same as singing quietly, though the two nearly always arrive together. You can close-mic a scream. What close-miking actually removes is the room — which is why it reads as private rather than as soft.`,
  known:`Confessional folk, bedroom pop, modern country and ASMR-adjacent production. It is the standard way to make a listener feel spoken to rather than performed at.`,
  origin:`Made practical by directional microphones from the 1930s, and by crooners who realised they no longer had to project; became the default for popular vocals once multitrack recording arrived.`,
  first:`1930s`, peak:[`1940s`,`2010s`],
  exemplar:{ kind:'exemplifies', title:`Skinny Love`, artist:`Bon Iver`, year:`2007`,
    listen:`Breath, lip noise and the creak of the chair are all left in. There is almost no room on the voice at all, which is what makes it feel like someone talking directly to you rather than performing.` },
  domains:['microphone'],
  match:['close-mic','close mic'],
  kinds:['technique'],
  nature:'continuous',
  range:`From "close-mic'd and conversational" as one production choice among many (#106) to "sung almost into the listener's ear ... audible breath and lip detail" (#9), where the closeness is the entire idea of the record.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The most testable term in the Microphone domain, because unlike ribbon warmth it has an audible consequence a listener can name: breath and mouth noise that would otherwise not be there. That gives a clear pass/fail a lay reader can judge — either you can hear the singer breathing or you cannot. If close-miking lands and ribbon does not, that sharpens the connotation suspicion considerably: the model may respond to described consequences but not to named equipment.` },
  ev:[
    { n:9,   span:`Close-mic`, state:'candidate', why:`The maximal case — breath and lip detail named explicitly as the point. Note the capital C, recorded as it appears.` },
    { n:202, span:`close-mic`, state:'candidate', why:`"Close-mic captured with audible breath and string squeak" — the consequence spelled out for the guitar as well as the voice.` },
    { n:106, span:`close-mic`, state:'candidate', why:`A modern pop production where closeness is one choice among many rather than the concept, so it should be the subtler result.` },
    { n:1,   span:`close-mic`, state:'candidate', why:`Negative use: "breathy close-mic" excluded from a raw swamp-blues rasp meant to sound like a room, not an ear.` }
  ]
},

{
  id:'tape-delay',
  term:`Tape delay`,
  sounds:`An echo that falls apart as it repeats. The first repeat is nearly the sound itself; each one after is darker, softer and more smeared, wobbling slightly out of tune as it goes, until the last few are just warm blurred shapes. Push it and the repeats pile up and start to howl. It feels like the sound is receding down a corridor rather than bouncing off a wall.`,
  gloss:`Echo made by recording onto a loop of tape and playing it back a fraction of a second later, over and over. Each pass through the machine degrades the copy a little more, which is why the repeats decay in quality as well as in volume.`,
  syn:[`echo`,`delay`,`dub echo`,`echo throws`,`slapback`,`that trailing-off echo`],
  myth:`It is not reverb. Reverb is a wash with no countable events in it; delay produces distinct repeats you could tap along with. And the degrading is not a fault being tolerated — it is the reason people still use tape delay when a perfect digital echo is free.`,
  known:`Dub above all, where the echo is played as an instrument in real time, plus psychedelia, rockabilly and ambient. In dub it is not decoration; it is the arrangement.`,
  origin:`Studio tape machines of the 1950s used as echo units; taken up as a compositional tool in 1960s and 70s Jamaican dub, where the mixing desk and the delay became instruments in their own right.`,
  first:`1950s`, peak:[`1960s`,`1970s`],
  exemplar:{ kind:'exemplifies', title:`King Tubby Meets Rockers Uptown`, artist:`Augustus Pablo`, year:`1976`,
    listen:`Dub, where the delay is played live as an instrument. Listen to a snare thrown into the repeats and decaying — each echo darker and more smeared than the last, which is the tape degrading in real time.` },
  domains:['room'],
  match:['tape delay','tape-delay','dub delay','delay throw','echo throw'],
  kinds:['instrument'],
  nature:'continuous',
  range:`From "analogue tape delay" holding an ambient space open behind everything (#146) to a voice "drowned in spring reverb and tape delay" in dub techno (#82), where the repeats are louder than the source.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The best structural test in the Room and Space domain, because unlike reverb this term has a countable consequence: distinct repeats at a spacing you could tap. Either they are there or they are not, and no expertise is needed to say which. Worth running against the spring and plate cards as a set — if the generator produces one generic wash for all three, that answers the whole domain; if it separates echo from reverb but not plate from spring, that draws the line in a specific and useful place.` },
  ev:[
    { n:82,  span:`tape delay`, state:'candidate', why:`Dub techno, with the voice drowned in delay and spring reverb together — the maximal case, and a chance to hear whether the two effects stay distinct.` },
    { n:146, span:`tape delay`, state:'candidate', why:`Ambient, where the delay is holding the space open rather than throwing repeats — the same tool doing an almost opposite job.` },
    { n:170, span:`tape delay`, state:'candidate', why:`Trip-hop with vinyl crackle and hiss alongside, so the delay has to be audible through a deliberately degraded mix.` },
    { n:172, span:`tape delay`, state:'candidate', why:`Boom-bap, where the beat gives a clear pulse to hear the repeat spacing against — the easiest of the four to judge by counting.` }
  ]
},

{
  id:'mellotron',
  term:`Mellotron`,
  sounds:`Strings, flutes or a choir that are almost convincing and then quietly are not. The notes waver in pitch, sag and breathe unevenly, and each one runs out after a few seconds no matter how long you hold the key — so chords sink and have to be renewed. There is a soft hiss and a faint clunk underneath. It sounds like an orchestra remembered rather than an orchestra playing, which is why it always reads as haunted or nostalgic.`,
  gloss:`A 1960s keyboard with a strip of recorded tape under every key. Pressing a key drags its tape across a playback head, so you are hearing a real player — recorded once, decades ago — and the tape physically runs out after about eight seconds.`,
  syn:[`tron`,`tape keyboard`,`that wobbly string sound`,`ghostly strings`,`string machine`,`haunted orchestra`],
  myth:`It is not a synthesiser imitating strings — it is actual recordings of real players, one short tape per note. The wobble and the drift are not effects applied to it; they are the tape stretching and the motor faltering, and every unit sounds slightly different because of how worn its tapes are.`,
  known:`Psychedelia and progressive rock, and everything since that wants a sound to feel like a half-remembered library record. The flute and choir settings are the ones most people can identify without knowing the name.`,
  origin:`Built in early-1960s Britain from an American tape-keyboard design intended for home entertainment; adopted by psychedelic and progressive bands who wanted orchestras they could not afford, and revived by hauntology and library-music revivalists.`,
  first:`1960s`, peak:[`1960s`,`1970s`,`2010s`],
  exemplar:{ kind:'popularised', title:`Strawberry Fields Forever`, artist:`The Beatles`, year:`1967`,
    listen:`The flute figure opening the song is a Mellotron, and it is audibly a tape struggling — the pitch wavers and each note runs out. That instability is the instrument, not a fault in the recording.` },
  domains:['keys'],
  match:['mellotron','string-machine','string machine'],
  kinds:['instrument'],
  nature:'continuous',
  range:`"Faint Mellotron" tucked deep into a Britpop mix (#28) against "a Mellotron flute choir wowing in and out of tune as the tape stretches" (#386), where the instability is the whole reason it is there.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The third make-versus-category test on the page, after Rhodes and Hammond, and the most likely of the three to resolve — because what identifies a Mellotron is not its timbre but its FAULTS, and those are describable: pitch wobble, uneven attack, notes that die after a few seconds. #386 is unusually valuable here because it names the fault outright rather than the instrument's sound, so it can be compared against prompts that only name the make.` },
  ev:[
    { n:386, span:`Mellotron`, state:'candidate', why:`Names the defining fault, not just the instrument — a flute choir wowing in and out of tune as the tape stretches. The clearest statement of what the word is supposed to mean.` },
    { n:233, span:`mellotron`, state:'candidate', why:`Private-press psych, the instrument in its native habitat alongside combo organ and tremolo guitar.` },
    { n:242, span:`Mellotron`, state:'candidate', why:`"Mellotron-soft choir pads" in a lullaby — the make used as a texture word, which is the collapse risk worth testing.` },
    { n:28,  span:`Mellotron`, state:'candidate', why:`"Faint Mellotron" buried in a dense Britpop mix, where the make is a period signal more than an audible part.` }
  ]
},

{
  id:'behind-the-beat',
  term:`Behind the beat`,
  sounds:`The singer is late and never catches up, on purpose. Every phrase starts a hair after you expect it and leans back against the rhythm, so the music seems to drag slightly even though nothing has slowed down — the band is exactly on time underneath. It feels unhurried, heavy-lidded, a little weary or a little cool depending on the song, and it is the difference between a performance that pushes at you and one that lets you come to it.`,
  gloss:`Placing notes fractionally after the beat rather than on it, while the tempo stays exactly where it was. A feel, not a change of speed — the gap is far too small to count and far too large to miss.`,
  syn:[`laid back`,`dragging`,`lazy phrasing`,`behind the pocket`,`relaxed timing`,`singing late`],
  myth:`It is not slowing down, and it is not sloppy timing. The player knows precisely where the beat is and is choosing to sit late against it, consistently — which is much harder than landing on the beat, and is why a machine imitating it usually sounds wrong.`,
  known:`Blues, soul, bossa nova, reggae toasting, trip-hop and outlaw country. Wherever music is meant to feel cool rather than urgent, this is usually how it is done.`,
  origin:`Fundamental to blues and jazz phrasing and carried into everything descended from them; named and taught as a deliberate technique rather than discovered, because players did it long before anyone described it.`,
  first:`ancient`, peak:[`1950s`,`1990s`],
  exemplar:{ kind:'exemplifies', title:`Untitled (How Does It Feel)`, artist:`D'Angelo`, year:`2000`,
    listen:`The vocal and the band sit noticeably late against the pulse for the whole record, and never catch up. Nothing has slowed down — the beat is exactly where you expect, and everything else leans behind it.` },
  domains:['rhythm'],
  match:['behind the beat','behind-the-beat'],
  kinds:['technique'],
  nature:'continuous',
  range:`"Singing just behind the beat with an unhurried cool" (#68) is the gentle version. "Dragging behind the beat with weary defiance" (#98) leans much further, to where the delay is audible as attitude rather than as feel.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`A pure feel instruction, and possibly the subtlest thing documented on this page: the difference between landing on the beat and landing just after it is a few tens of milliseconds. That makes it a genuinely hard test and a valuable one, because if the generator can place a voice consistently late against a steady band, it is doing something more sophisticated than assembling textures. A null result would also be informative, and easy to hear — the voice would simply sit square.` },
  ev:[
    { n:68, span:`behind the beat`, state:'candidate', why:`Bossa and cool jazz, the idiom the phrase belongs to, and stated gently — "just behind the beat with an unhurried cool".` },
    { n:98, span:`behind the beat`, state:'candidate', why:`"Dragging behind the beat with weary defiance" — the furthest-back version in the corpus, so the easiest to hear if the term lands at all.` },
    { n:16, span:`behind the beat`, state:'candidate', why:`Outlaw country, where dropping behind the beat is paired with letting phrase-ends fall flat — two related timing choices in one prompt.` },
    { n:10, span:`behind the beat`, state:'candidate', why:`Reggae toasting, where riding behind the beat works against a groove that is already displacing its own accents.` }
  ]
},

{
  id:'breakdown',
  term:`Breakdown`,
  sounds:`The floor drops out. Somewhere in the middle the drums and bass simply leave, and what is left — a single voice, a pad, a filtered loop — sounds suddenly exposed and much closer. Tension gathers while almost nothing is happening, often with something rising underneath, and then everything crashes back at once and hits far harder than it did before it left. The relief is the point.`,
  gloss:`A section where the arrangement strips down to a fraction of itself, holds there, and then returns in full. What counts as stripped varies by genre, but the shape is always the same: remove, wait, restore.`,
  syn:[`the drop-out`,`the quiet bit`,`the build`,`stripped section`,`when the beat drops out`,`the bit before the drop`],
  myth:`In dance music people often use breakdown to mean the drop, which is its opposite — the breakdown is the emptying-out, the drop is the return. And a breakdown in metal means something different again: a slow, heavy, half-time riff section rather than a thinning at all.`,
  known:`Trance and house, where the breakdown is the emotional centre of the track; also metalcore, drum and bass and bluegrass, each meaning something slightly different by the word.`,
  origin:`Arrangement practice long predating the name; formalised in disco and house extended mixes of the 1970s and 80s, where a long emptying and rebuild gave a DJ somewhere to mix.`,
  first:`1970s`, peak:[`1990s`,`2000s`],
  exemplar:{ kind:'exemplifies', title:`Insomnia`, artist:`Faithless`, year:`1995`,
    listen:`The long emptying-out before the drop is the structural centre of the track, not an interlude. Everything strips away, tension builds with almost nothing playing, and the return hits harder for the absence.` },
  domains:['form'],
  match:['breakdown'],
  kinds:['technique'],
  nature:'momentary',
  range:`"Dropout breakdowns" as brief punctuation between riffs (#33) against "a long push and pull between the breakdown and the euphoric drop" (#88), where the section is a whole movement of the track.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`A form instruction like stop-time and key change, but a more forgiving one — a breakdown is a long, obvious event rather than a single instant, so it should be the easiest of the three for a generator to place and the easiest for a listener to confirm. That is exactly why it is worth testing early: if form instructions land anywhere, they land here, and a failure here would strongly suggest the whole Form domain is documentation of things we cannot demonstrate.` },
  ev:[
    { n:88, span:`breakdown`, state:'candidate', why:`Trance, where the breakdown is the emotional centre and explicitly set against the drop — the clearest structural framing in the corpus.` },
    { n:'E5', span:`breakdown`, state:'candidate', why:`"A true breakdown and rebuild" named as extended tension-release, so the return matters as much as the emptying.` },
    { n:33, span:`breakdowns`, state:'candidate', why:`Nu-metal "dropout breakdowns" — plural, brief and used as punctuation rather than as a section. The literal is recorded as it appears.` },
    { n:'J1', span:`breakdowns`, state:'candidate', why:`"Hollowed breakdowns and wall-of-sound returns" in a disco-gospel hybrid, where the contrast is the arrangement's whole engine.` }
  ]
},

{
  id:'unison',
  term:`Unison`,
  sounds:`Several voices or instruments playing exactly the same notes at the same time — and it sounds bigger and more certain than one, without sounding like a chord. Nothing is stacked above or below; the line simply gets thicker, wider and more insistent, and any slight disagreement in tuning or timing between the players adds a shimmer at the edges. It reads as a crowd agreeing.`,
  gloss:`Two or more parts on the same pitch, rather than on different notes of a chord. Octaves apart still counts. The effect is emphasis and weight, not harmony.`,
  syn:[`in unison`,`all together`,`doubled line`,`everyone on the same note`,`gang vocal`,`one voice, many people`],
  myth:`Unison is not harmony — there is only one note being sung, however many people are singing it. And it is not the same as double-tracking, where one person records twice: unison usually means genuinely different players, which is why it thickens without the tell-tale smearing.`,
  known:`Riff-writing in rock and metal, where guitar and bass hitting a figure together makes it land like a fist; gang shouts in punk and hardcore; and prog, where unison across the whole band is used to show off precision.`,
  origin:`As old as group singing. Its use as a deliberate arranging effect in popular music comes largely from work song and congregational singing, and from big-band writing where a section plays a line as one.`,
  first:`ancient`, peak:[`1970s`,`1980s`],
  exemplar:{ kind:'exemplifies', title:`Smoke on the Water`, artist:`Deep Purple`, year:`1972`,
    listen:`The riff is doubled rather than harmonised — the same notes played together, which makes it land like a single much larger instrument. Nothing is stacked above or below it.` },
  domains:['arrangement'],
  match:['unison'],
  kinds:['technique'],
  nature:'continuous',
  range:`#143 has "precise unison hits" as a display of accuracy; #157 has a voice "doubling its own hook in loose unison", where the looseness is the charm. #U2 goes further and puts the stacks "deliberately out of unison" — the same idea used as a fault on purpose.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`A useful counterpart to the double-tracking card: both thicken a line, but unison implies separate performers and double-tracking implies one performer twice. If the generator treats them as the same instruction, that is worth knowing, because they are not interchangeable in practice. The tighter question is whether "precise unison" and "loose unison" differ at all, which the corpus sets up almost by accident across #143 and #157.` },
  ev:[
    { n:143, span:`unison`, state:'candidate', why:`"Precise unison hits" across a whole prog band in shifting meters — accuracy as the point, so any raggedness would be a clear failure.` },
    { n:157, span:`unison`, state:'candidate', why:`"Doubling its own hook in loose unison" — the opposite instruction, where imprecision is wanted.` },
    { n:71,  span:`unison`, state:'candidate', why:`Massed voices roared in unison, which is the plain crowd-of-people case most listeners would picture first.` },
    { n:'U2', span:`unison`, state:'candidate', why:`Stacks held "deliberately out of unison" so the phrasing rubs against itself — the term used by negation, which tests whether it is understood at all.` }
  ]
},

{
  id:'modal',
  term:`Modal`,
  sounds:`The music circles instead of arriving. Chords change and the tune moves, but the decisive pull home that most songs make never quite happens — so it can hang in one colour for a long time without sounding stuck. Often there is a slightly ancient or foreign flavour to it, a note in the scale sitting a step away from where a pop ear expects, and the whole thing feels more like weather than like a journey.`,
  gloss:`Music built on a mode rather than on ordinary major or minor. A mode uses a different arrangement of steps, which removes the strong leading note that normally makes a piece want to resolve.`,
  syn:[`modal harmony`,`dorian`,`mixolydian`,`churchy`,`folky`,`that ancient-sounding scale`,`floating harmony`],
  myth:`It does not mean the music has no key or no rules. A mode is a scale like any other — what it lacks is the one strong pull toward home that major and minor have, which is why modal music sounds open rather than unresolved. It is also not inherently sad; several modes are brighter than major.`,
  known:`Plainchant and folk song, jazz from the late 1950s, and a great deal of psychedelia, metal and film music. It is the standard way to make a piece sound old, wide or unplaceable.`,
  origin:`The system of European liturgical chant, retained in folk traditions after art music narrowed to major and minor; deliberately revived by jazz players in the late 1950s and by folk-rock and psychedelia in the 1960s.`,
  first:`pre-1900`, peak:[`1950s`,`1960s`],
  exemplar:{ kind:'popularised', title:`So What`, artist:`Miles Davis`, year:`1959`,
    listen:`Two chords in nine minutes. The harmony stops moving and the interest shifts entirely to the line above it — this is the record that made modal writing a mainstream idea rather than a scholarly one.` },
  domains:['harmony'],
  match:['modal'],
  kinds:['technique'],
  nature:'continuous',
  range:`From "long modal phrases" in unaccompanied chant, where there is no harmony at all and the mode IS the melody (#51), to "modal Eastern color" laid over progressive metal (#130), where it is a flavour on top of ordinary rock harmony.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The second Harmony card, and a fairer test than voice-leading because a mode has an audible surface: a listener may not name the flat seventh but they will hear that something sounds old or foreign. That gives a lay reader something to judge. Watch for a confound, though — every corpus prompt using the word also names a tradition (chant, maqam, Appalachian, Eastern), so the model may be reaching for the genre rather than the harmony. The clean test is asking for a modal version of something with no modal tradition at all.` },
  ev:[
    { n:51,  span:`modal`, state:'candidate', why:`Plainchant: unaccompanied and monophonic, so there is nothing but the mode to hear — the purest case available.` },
    { n:'H2', span:`modal`, state:'candidate', why:`An Appalachian folk hymn, the same harmonic idea in a Western folk tradition rather than a liturgical one.` },
    { n:130, span:`modal`, state:'candidate', why:`"Modal Eastern color" over progressive metal — the mode as an overlay on a rock arrangement, which is the harder and more modern use.` },
    { n:118, span:`modal`, state:'candidate', why:`"Modal melodies in relaxed repeating phrases" in organic house, where the circling quality matters more than any period flavour.` }
  ]
},

{
  id:'belting',
  term:`Belting`,
  sounds:`Full-power singing carried much higher than a speaking voice should comfortably go, and you can hear the effort in it. The tone is bright, forward and slightly strained, with a hard ringing edge that cuts through everything else, and the vowels tend to flatten and widen as the singer pushes. It sounds like someone shouting in tune — thrilling, and always faintly like it might not survive another line.`,
  gloss:`Carrying the heavy chest register up into high notes at full volume, instead of letting the voice thin into a lighter register. It is loud by definition, and physically demanding.`,
  syn:[`belting it out`,`full voice`,`chest voice up high`,`powerhouse singing`,`going for it`,`that big note`],
  myth:`Belting is not just singing loudly, and it is not the same as shouting — it is a specific way of carrying one register upward that takes considerable control. It is also the opposite of falsetto rather than a stronger version of it: falsetto thins out to go high, belting refuses to.`,
  known:`Musical theatre, gospel, soul and stadium rock. It is the sound of the last chorus, and the reason a key change so often arrives underneath it.`,
  origin:`Emerged in early-twentieth-century musical theatre and vaudeville, where singers had to fill a room without amplification; carried into gospel, soul and rock, and now the default expectation for a big pop chorus.`,
  first:`1900s`, peak:[`1960s`,`1980s`],
  exemplar:{ kind:'exemplifies', title:`I Will Always Love You`, artist:`Whitney Houston`, year:`1992`,
    listen:`The final chorus is chest voice carried far higher than speaking range at full power, with the effort audible in the tone. It is the reference recording for the technique, and the key change underneath it is doing half the work.` },
  domains:['voice'],
  match:['belting','belted'],
  kinds:['technique'],
  nature:'continuous',
  range:`#27 is belting as power — "at full force, screaming up into sustained banshee wails". #18 is belting as strain — "up into the register where the voice thins and cracks", where the failure is the expressive point.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The natural partner to the falsetto card: they are the two ways of going high, and they are opposites. That makes a pair unusually clean — the same prompt asking for a belted high note and a falsetto one should produce plainly different voices, and if it does not, the entire vocal-register vocabulary is in question. Like autotune, this term appears heavily as a negative too, so it can be tested in both directions with material that already exists.` },
  ev:[
    { n:27, span:`belting`, state:'candidate', why:`"Belting at full force" in hard rock — the maximal, unambiguous case.` },
    { n:18, span:`belting`, state:'candidate', why:`Belting to the point of failure, "where the voice thins and cracks" — the same technique with the strain made audible on purpose.` },
    { n:9,  span:`belting`, state:'candidate', why:`Negative use, protecting a fragile indie-folk falsetto — the direct opposite of the technique, excluded by name.` },
    { n:16, span:`belting`, state:'candidate', why:`A second negative, in outlaw country, where an unpushed conversational baritone was the whole intent.` }
  ]
},

{
  id:'condenser-mic',
  term:`Condenser microphone`,
  sounds:`Detail, and lots of it. The top end is right there — breath, sibilance, the click of a pick, the air moving in a room — and everything sounds present and immediate, as though a veil has been lifted off the performance. Push a loud voice into one and the same sensitivity turns against you: the top goes brittle and spiky, and consonants start to spit.`,
  gloss:`A microphone that senses sound with a very light, electrically charged membrane. Being light, it responds to fast detail a heavier design would miss — which is why it captures high frequencies so completely.`,
  syn:[`condenser`,`studio mic`,`the detailed one`,`bright mic`,`large-diaphragm mic`,`the crisp microphone`],
  myth:`Brighter is not the same as better. A condenser hears more of everything, including the things you did not want — room noise, mouth noise, harshness in a strained voice — which is exactly why an engineer sometimes reaches for a duller microphone on purpose.`,
  known:`The default studio vocal microphone since the 1950s, and standard on acoustic guitar, cymbals and anything whose appeal is in its detail.`,
  origin:`Invented in the 1910s and made practical for studios by the 1930s; displaced the ribbon as the standard voice microphone through the 1950s and has held that position since.`,
  first:`1910s`, peak:[`1950s`,`1960s`],
  domains:['microphone'],
  match:['condenser'],
  kinds:['instrument'],
  nature:'continuous',
  range:`The corpus splits it cleanly: "warm vintage condenser" (#2, #22) against "bright studio condenser" (#32). Same category of microphone, two opposite adjectives — and whether those adjectives do anything is the useful question.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The direct partner to the ribbon-mic card and the pair that would settle the Microphone domain. Ribbon and condenser are genuinely opposite in the one respect a listener can hear — the top end is absent on one and emphasised on the other — so a prompt-pair swapping only that word should be plainly different if microphone terms register at all. If both produce the same voice, the connotation suspicion is confirmed and the domain shrinks from sixty cards to about three.` },
  ev:[
    { n:32, span:`condenser`, state:'candidate', why:`"Bright studio condenser" — the bright end named outright, and the clearest counterweight to the ribbon card.` },
    { n:2,  span:`condenser`, state:'candidate', why:`"Warm vintage condenser, valve signal path" — the same microphone type described as warm, which tests whether the adjective or the noun is steering.` },
    { n:20, span:`condenser`, state:'candidate', why:`"Warm condenser, intimate close capture" in neo-soul, pairing the microphone with close-miking so the two can be judged together.` },
    { n:22, span:`condenser`, state:'candidate', why:`Disco falsetto through a vintage condenser and plush ambience — a high, bright voice, where a condenser's top end has the most to do.` }
  ]
},

{
  id:'room-bleed',
  term:`Room bleed`,
  sounds:`You can hear the space the band was standing in. Drums leak faintly into the vocal microphone, the guitar arrives twice — once straight and once off the walls — and a common air glues everything into one event. Instruments overlap where a modern mix would keep them apart, and the whole thing sounds like people playing at the same time in the same place, because they were.`,
  gloss:`Sound from one source arriving in a microphone meant for another. Unavoidable when a band records together in one room, and increasingly chosen on purpose now that it is avoidable.`,
  syn:[`bleed`,`live room sound`,`spill`,`played live in a room`,`leakage`,`all in one take`],
  myth:`It is not the same as reverb. Reverb is an effect added to a track; bleed is other instruments genuinely arriving in the wrong microphone. You cannot turn it down later — it is baked into every track at once, which is why it forces commitment and why engineers spent decades trying to eliminate it.`,
  known:`Soul and Motown-era recording, gospel, live jazz, and any modern record chasing the feeling of a band rather than an assembly. It is the main reason old records sound like a performance and new ones can sound like a construction.`,
  origin:`Unavoidable in the single-room recording of the 1950s and 60s; deliberately eliminated by multitrack isolation in the 1970s, then deliberately reintroduced once its absence started to sound sterile.`,
  first:`1950s`, peak:[`1960s`,`1970s`],
  exemplar:{ kind:'exemplifies', title:`Respect`, artist:`Aretha Franklin`, year:`1967`,
    listen:`Cut live in one room, and you can hear it — horns leaking into everything, a shared ambience gluing the parts together, instruments overlapping in a way a modern isolated session would never produce.` },
  domains:['room'],
  match:['room bleed','live-room bleed','room bleeding'],
  kinds:['technique'],
  nature:'continuous',
  range:`"Tight live-room bleed" (#V3) is controlled — enough to glue, not enough to blur. "Hot live capture with room bleed" (#122) lets it run, and the leakage becomes part of the arrangement rather than a side effect of it.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Interesting because it asks for an ARTEFACT of how a recording was made rather than for a sound. The generator has no room and no microphones, so nothing can literally bleed — the question is whether the word produces the audible consequences anyway: instruments sharing an ambience, a slightly cluttered midrange, a sense of one take. It sits with breakbeat in that respect, and the two would make a good joint test of whether process words work at all.` },
  ev:[
    { n:122, span:`room bleed`, state:'candidate', why:`"Hot live capture with room bleed" behind a full gospel-Motown arrangement — the maximal case, with many sources to leak into each other.` },
    { n:62,  span:`room bleed`, state:'candidate', why:`"Live-band capture, warm room bleed" in afrobeat, where interlocking parts depend on sounding simultaneous rather than assembled.` },
    { n:'V3', span:`live-room bleed`, state:'candidate', why:`"Tight live-room bleed" — the controlled end, and a different literal worth recording separately.` },
    { n:5,   span:`live-room bleed`, state:'candidate', why:`A soul revue with an overdriven console, where the bleed is one part of a deliberately old signal chain.` }
  ]
},

{
  id:'counterpoint',
  term:`Counterpoint`,
  sounds:`Two tunes at once, and both of them are tunes. Neither is accompanying the other — they move independently, crossing over, pulling apart, arriving together at the ends of phrases — and your attention keeps flipping between them. It sounds busy in a satisfying rather than cluttered way, because each line makes complete sense on its own if you follow it.`,
  gloss:`Two or more melodies played at the same time, each written to stand up alone while still fitting the others. Distinct from harmony, where one line leads and the rest supply notes underneath it.`,
  syn:[`two melodies at once`,`interweaving lines`,`independent parts`,`polyphony`,`call it a conversation`,`the parts weaving`],
  myth:`It is not the same as harmony, and it is not the same as unison. In harmony the other parts support the melody; in counterpoint they compete with it. That is why counterpoint can sound crowded on first listen and obvious on the fifth.`,
  known:`Baroque keyboard writing above all, plus highlife and soukous guitar, progressive rock, and any arrangement where two guitars or a bass and a voice are genuinely arguing rather than agreeing.`,
  origin:`Formalised in European church polyphony from the Renaissance and taught as a discipline ever since; arrived independently in West African guitar traditions, where interlocking independent lines are the basis of the style.`,
  first:`pre-1900`, peak:[`1960s`,`1970s`],
  exemplar:{ kind:'exemplifies', title:`Scarborough Fair / Canticle`, artist:`Simon and Garfunkel`, year:`1966`,
    listen:`Two different songs sung simultaneously, each complete on its own. Follow either line and it makes sense; hear both and they fit — which is the entire definition.` },
  domains:['arrangement'],
  match:['counterpoint'],
  kinds:['technique'],
  nature:'continuous',
  range:`#344 has "two electric guitars in loose counterpoint", where the independence is casual. #143 has "interlocking counterpoint" across shifting meters, where it is a display of precision. #253 goes furthest: a ground bass cycling unchanged while everything else moves against it.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`One of the hardest asks on the page, and worth it. Counterpoint requires the generator to write two things that are individually coherent and mutually compatible — not a texture but an act of composition. If it lands, that is a much stronger claim about the model than any timbre card could make. If it produces one melody with a busy accompaniment, that is a clean and informative failure, and it would suggest the Arrangement domain has a ceiling.` },
  ev:[
    { n:253, span:`Counterpoint`, state:'candidate', why:`The clearest case in the corpus: counterpoint named as the borrowed element, with a ground bass of eight notes cycling unchanged beneath moving parts. Note the capital C.` },
    { n:143, span:`counterpoint`, state:'candidate', why:`"Interlocking counterpoint" in shifting time signatures — the precision end, where failure would be obvious.` },
    { n:105, span:`counterpoint`, state:'candidate', why:`"Two-guitar counterpoint" in highlife, the West African tradition where interlocking lines are the whole style rather than a technique applied to it.` },
    { n:344, span:`counterpoint`, state:'candidate', why:`"Two electric guitars in loose counterpoint", one grinding chords while the other picks — the informal rock version of the same idea.` }
  ]
},

{
  id:'stacked-harmony',
  term:`Stacked harmony`,
  sounds:`One voice becomes a chord. The lead is joined by other voices singing different notes in exactly the same rhythm, so the line moves as a single block — and it stops sounding like a person and starts sounding like a choir, or like a sunbeam. Stack it high and it glows and thickens; the effect is always larger than any of the voices inside it, and the words stay perfectly clear because everyone is singing them together.`,
  gloss:`Several vocal parts on different notes of a chord, moving in the same rhythm as the lead. Unlike counterpoint the parts do not move independently, and unlike unison they are not on the same note.`,
  syn:[`harmony stack`,`stacked vocals`,`block harmony`,`close harmony`,`vocal wall`,`singing in thirds`],
  myth:`Stacking is not the same as double-tracking or unison, though all three make a voice bigger. Double-tracking is one singer twice on the same note; unison is several people on the same note; stacking is several different notes at once. Only the last one is harmony.`,
  known:`Bluegrass and gospel quartets, doo-wop, 1960s harmony pop and the folk-rock that followed it, and modern pop choruses where a single tracked voice is stacked into a wall.`,
  origin:`Rooted in shape-note and gospel congregational singing and in barbershop practice; became a pop production default once multitracking let one singer supply every part.`,
  first:`pre-1900`, peak:[`1950s`,`1960s`],
  exemplar:{ kind:'exemplifies', title:`God Only Knows`, artist:`The Beach Boys`, year:`1966`,
    listen:`The last section stacks the vocal parts until the lead is no longer identifiable as one person. Every voice moves in the same rhythm on different notes, which is exactly what separates stacking from counterpoint.` },
  domains:['arrangement','voice'],
  match:['harmony stack','stacked harmon','harmony stacked'],
  kinds:['technique'],
  nature:'continuous',
  range:`From "high harmony stack behind the lead" as one ingredient of a bluegrass band (#50), to #201 where "the vocal blend is the whole point" and three and four parts interweave and trade the lead between them.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Worth testing against unison and double-tracking as a set of three, because all three thicken a voice and they are constantly confused by ear. If the generator produces the same widened voice for all three, that is one finding covering three cards. The negatives help here too: several prompts exclude harmony stacks specifically to keep a single voice exposed, so suppression can be tested alongside production.` },
  ev:[
    { n:201, span:`harmony stack`, state:'candidate', why:`"The vocal blend is the whole point" — three and four parts interweaving and answering in thirds and fifths, so failure would be unmissable.` },
    { n:50,  span:`harmony stack`, state:'candidate', why:`Bluegrass, where a high harmony stack sits behind the lead as one part of a band rather than as the point.` },
    { n:165, span:`harmony stack`, state:'candidate', why:`Negative use — "auto-tuned harmony stacks" excluded from a prompt chasing a 1960s harmony sound, so the exclusion is about treatment rather than about harmony itself.` },
    { n:269, span:`harmony stack`, state:'candidate', why:`A second negative, protecting a spoken-word piece where any sung harmony would break the conceit.` }
  ]
},

{
  id:'minor-key',
  term:`Minor key`,
  sounds:`The music turns dark before a single word registers. Chords land heavy and shadowed rather than bright and open, and tunes tend to sag downward where a major-key tune would climb. It reads instantly as sad, serious or menacing — and it is the fastest emotional decision a piece of music makes, usually settled within a second or two of the first chord.`,
  gloss:`Music built on a minor scale, whose third note sits a semitone lower than a major scale's. That single lowered note is most of what listeners hear as sadness.`,
  syn:[`minor`,`sad key`,`dark chords`,`in a minor`,`gloomy`,`that serious sound`],
  myth:`Minor does not actually mean sad — it means minor. Enormous amounts of joyful music are in minor keys: klezmer, much dance music, plenty of folk. The sad association is a learned Western convention, strong enough to feel like a fact but not one.`,
  known:`Everywhere, but it is load-bearing in trance and metal, in Eastern European and Middle Eastern traditions where it carries no sadness at all, and in film scoring where it is the shorthand for threat.`,
  origin:`One half of the major-minor system that replaced the older church modes in European art music from the seventeenth century; the emotional convention attached to it hardened through nineteenth-century Romanticism.`,
  first:`pre-1900`, peak:[],
  domains:['harmony'],
  match:['minor-key','minor key'],
  kinds:['technique'],
  nature:'continuous',
  range:`"Minor-key arpeggios ringing on clean electric guitar" (#160) uses it as colour. "Rich minor-key harmonic movement" (#E5) uses it as structure. #268 excludes "minor-key gloom" specifically, which shows the convention being resisted rather than used.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The most basic harmonic instruction there is, which makes it the right control for the whole Harmony domain. If the generator cannot reliably produce a minor key on request, then voice-leading and modal have no chance and those cards can be read accordingly. If it can, the interesting question moves immediately to whether it can do minor WITHOUT the sadness — which #268 suggests somebody has already wanted, since it excludes the gloom rather than the key.` },
  ev:[
    { n:297, span:`minor-key`, state:'candidate', why:`"A long minor-key arpeggio" driving uplifting trance — minor used for euphoria rather than sadness, which is the misconception made audible.` },
    { n:'E5', span:`minor-key`, state:'candidate', why:`"Rich minor-key harmonic movement" through a breakdown and rebuild, so the key is structural rather than decorative.` },
    { n:160, span:`minor-key`, state:'candidate', why:`College-rock arpeggios on clean guitar, where minor supplies mood without any drama around it.` },
    { n:268, span:`minor-key`, state:'candidate', why:`Negative use, and an unusually precise one: it excludes "minor-key gloom" rather than the minor key itself.` }
  ]
},

{
  id:'fuzz',
  term:`Fuzz`,
  sounds:`A guitar that has stopped sounding like a guitar. The note collapses into a thick woolly buzz — closer to a swarm, or a torn speaker cone, than to a string — and then holds there, sustaining far longer than a clean note would. Single notes thicken into something almost vocal; chords turn to mush. It is warm, saturated and always a little out of control.`,
  gloss:`Extreme distortion that squares the signal off almost completely, rather than merely roughening its edges. The original devices were built to imitate a broken amplifier and are still doing that.`,
  syn:[`fuzzbox`,`fuzz pedal`,`that buzzy guitar`,`woolly distortion`,`torn speaker sound`,`the bee-in-a-jar tone`],
  myth:`Fuzz is not just more distortion. Overdrive and distortion roughen a note while keeping its shape; fuzz replaces the shape almost entirely, which is why it sustains so long and why chords stop working under it. In practice they sit on a scale, and the ear places fuzz well past where distortion stops.`,
  known:`1960s garage and psychedelia, stoner and doom metal, shoegaze and noise pop. It reads as primitive and unpolished even when it took great care to achieve.`,
  origin:`A 1960s studio accident with a damaged channel, quickly built into pedals; became the defining guitar sound of garage and psychedelia and has been revived by every heavy scene since.`,
  first:`1960s`, peak:[`1960s`,`1990s`,`2000s`],
  exemplar:{ kind:'popularised', title:`(I Can't Get No) Satisfaction`, artist:`The Rolling Stones`, year:`1965`,
    listen:`The riff was meant to be replaced by horns later and never was. That thick, woolly buzz is a fuzz box standing in for a brass section, and it made the sound a permanent part of rock.` },
  domains:['guitar'],
  match:['fuzz'],
  kinds:['instrument','technique'],
  nature:'continuous',
  range:`"Fuzz guitar with backwards swells" (#37) is fuzz as psychedelic colour. #55 has a clean voice "floating detached over the fuzz", where it is a bed rather than a lead. #72 puts it on the bass instead — "fuzz-drenched bass" — which is a different instrument doing the same thing.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`A good test of a distinction the generator may not make. Fuzz, overdrive and distortion are three different degrees with three different names, and the corpus uses all of them freely — 23 prompts say fuzz, 46 say distorted guitar. If asking for fuzz produces ordinary distortion, that is worth knowing, because the same question applies to every family of near-synonyms in this library. Easy to judge by ear too: real fuzz sustains and loses chord definition, and distortion does neither.` },
  ev:[
    { n:37, span:`Fuzz`, state:'candidate', why:`"Fuzz guitar with backwards swells" leading an acid-rock arrangement — the term in its home idiom. Note the capital F.` },
    { n:55, span:`fuzz`, state:'candidate', why:`Stoner rock, with a clean detached voice floating over the fuzz — the contrast should make any failure of the guitar tone obvious.` },
    { n:72, span:`fuzz`, state:'candidate', why:`"Fuzz-drenched bass" rather than guitar, testing whether the term carries to another instrument.` },
    { n:70, span:`fuzz`, state:'candidate', why:`"A fuzzed reverb-soaked rawness" applied to the whole garage-rock texture rather than to one part.` }
  ]
},

{
  id:'wah',
  term:`Wah`,
  sounds:`A guitar vowel. The tone sweeps between a dark ooo and a nasal aah and back again, so the instrument seems to be talking, or crying, or asking a question. Rocked in time with the beat it stops being a tone and becomes a rhythm part — that chicka-chicka scratching under funk and disco. Left parked in one position it simply sounds honky and pinched, which is its other, sneakier use.`,
  gloss:`A pedal that sweeps a narrow boost up and down the frequency range as the player rocks their foot. The moving peak imitates the way a mouth changes shape between vowels, which is why it sounds like speech.`,
  syn:[`wah pedal`,`wah-wah`,`talking guitar`,`crying guitar`,`that chicka-chicka guitar`,`quacky guitar`],
  myth:`It is not the same as a talkbox, which routes the actual guitar sound through a tube into the player's mouth so real words can be formed. A wah only suggests a vowel; a talkbox produces one. They are constantly confused because both make a guitar sound like it is speaking.`,
  known:`Funk and disco rhythm playing, psychedelic and blues-rock lead work, and 1970s film scoring, where a parked wah is shorthand for a city street.`,
  origin:`A mid-1960s pedal derived from a trumpet mute effect, intended for horn players; guitarists took it over almost immediately and it became a defining sound of funk and psychedelia.`,
  first:`1960s`, peak:[`1970s`],
  exemplar:{ kind:'exemplifies', title:`Voodoo Child (Slight Return)`, artist:`The Jimi Hendrix Experience`, year:`1968`,
    listen:`The opening bars are a wah pedal being rocked in time with nothing else playing. The guitar audibly says a vowel, and it is the clearest recorded demonstration of what the pedal does.` },
  domains:['guitar'],
  match:['wah'],
  kinds:['instrument','technique'],
  nature:'continuous',
  range:`The corpus captures the two opposite jobs cleanly: "wah rhythm guitar" (#22, #14) chopping percussively under a groove, and "wah lead" (#72) sweeping slowly across long sludge-metal notes.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Unusually testable for a guitar effect, because the movement is the whole point — a static filtered tone is a clear failure and a sweeping one is a clear success, and no expertise is needed to tell them apart. The rhythm-versus-lead split makes it doubly useful: it can be tested for the sound and separately for whether the generator applies it in time with the beat, which is a much harder ask.` },
  ev:[
    { n:22, span:`wah`, state:'candidate', why:`"Wah rhythm guitar" in disco — the percussive chopping use, where the sweep has to move in time with the beat.` },
    { n:72, span:`wah`, state:'candidate', why:`"Wah lead" over Southern sludge — slow sweeps on long notes, the opposite job for the same pedal.` },
    { n:14, span:`wah`, state:'candidate', why:`Funk with a talkbox in the same arrangement, which is a useful chance to hear whether the generator separates the two effects the misconception warns about.` },
    { n:57, span:`wah`, state:'candidate', why:`Madchester, where wah rhythm guitar sits inside a loose shuffling break rather than a tight funk grid.` }
  ]
},

{
  id:'compression',
  term:`Compression`,
  sounds:`The gap between loud and quiet closes up. Quiet details rise into view — breath, finger squeak, the tail of a note — while the loudest moments stop leaping out, so everything sits forward and steady and nothing gets away from you. Overdone, it starts to breathe audibly: the whole sound ducks down after each hit and swells back up in the gaps, and cymbals seem to suck at the edges.`,
  gloss:`Automatic volume control that turns the signal down whenever it exceeds a threshold, then lifts the whole thing back up. The result is a smaller distance between the loudest and quietest parts.`,
  syn:[`compressed`,`squashed`,`levelled`,`glued`,`punchy`,`limited`,`that pumping sound`],
  myth:`It makes things sound louder by making them quieter — the peaks come down first, and only then does everything get raised. It is also not the same as sidechain compression, which is this tool wired so that one sound ducks a different one. Same device, quite different purpose.`,
  known:`Every commercial record ever released, which is why it is invisible until it is overdone. Deliberately audible compression is a genre signal in itself: hip-hop drums, 1970s rock, and anything wanting to sound aggressive.`,
  origin:`Broadcast equipment from the 1930s built to stop transmitters overloading; adopted by studios as a creative tool, and central to the loudness competition that shaped records from the 1990s on.`,
  first:`1930s`, peak:[`1990s`,`2000s`],
  domains:['production'],
  match:['compressed','compression','compressor'],
  kinds:['technique'],
  nature:'continuous',
  range:`"Lightly compressed" (#18) is the invisible setting nobody would notice missing. "Compressed overdriven disco bass played like a rock riff" (#J1) is the audible end, where the squashing is a texture in its own right.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Complicated by an ambiguity in the word itself, which is worth knowing before testing. Several corpus prompts use "compressed" in a purely figurative sense — phrasing compressed into small bent figures, a chord chime compressed into downstrokes — meaning condensed rather than dynamically controlled. So a discovery list for this term will contain false positives, and any test has to use prompts where the audio sense is unmistakable. That ambiguity is itself a finding about how carefully these prompts have to be read.` },
  ev:[
    { n:18,  span:`compressed`, state:'candidate', why:`"Close dynamic mic, lightly compressed" — the invisible end, named in a signal chain so the audio sense is unambiguous.` },
    { n:'J1', span:`Compressed`, state:'candidate', why:`"Compressed overdriven disco bass" alongside a brutal sidechain pump, so both meanings of the device appear in one prompt. Note the capital C.` },
    { n:14,  span:`tape compression`, state:'candidate', why:`"Tape compression" names the mechanism rather than the effect — a different literal, and a chance to see whether the specific form behaves like the generic one.` },
    { n:146, span:`compressed`, state:'candidate', why:`Negative use: "bright compressed loudness" excluded from an ambient piece that needs its dynamics left intact.` }
  ]
},

{
  id:'swing',
  term:`Swing`,
  sounds:`The beat limps, pleasantly. Instead of splitting each beat into two even halves, the first half is stretched and the second clipped short, so pairs of notes fall long-short, long-short in a rolling, skipping gait. It is the difference between marching and strolling — and it makes music sound human before anything else has had a chance to.`,
  gloss:`Playing pairs of notes unevenly rather than evenly, with the first of each pair longer than the second. How uneven is a sliding scale, and players adjust it constantly without counting.`,
  syn:[`swung`,`shuffle`,`that skipping feel`,`bouncy rhythm`,`triplet feel`,`loping`],
  myth:`It is not the same as being behind the beat. Swing changes the SPACING inside each beat while everybody stays lined up; playing behind the beat shifts a whole part late while the spacing stays even. A performance can do both at once, which is why they are so often conflated.`,
  known:`Jazz above all — the word names an entire era of it — plus blues shuffles, boogie, hip-hop that programs a swing amount into its drums, and UK garage, which is built on an extreme setting of it.`,
  origin:`Emerged in early jazz and blues from the rhythmic practices of the African diaspora; named and formalised as a style in the 1930s, and later rebuilt as a numeric setting in drum machines and sequencers.`,
  first:`1920s`, peak:[`1930s`,`1940s`],
  exemplar:{ kind:'exemplifies', title:`Sing, Sing, Sing`, artist:`Benny Goodman`, year:`1937`,
    listen:`Nearly nine minutes of swung eighths at speed. Every pair of notes falls long-short, and the tom pattern underneath makes the unevenness impossible to miss.` },
  domains:['rhythm'],
  match:['swing'],
  kinds:['technique'],
  nature:'continuous',
  range:`The corpus holds swing as a whole genre — "big-band swing" (#26), "Western swing" (#101), "gypsy-jazz manouche swing" (#47) — and separately as a feel a vocalist rides (#44). Whether the word means a style or a rhythm to the generator is exactly the ambiguity worth testing.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The clearest genre-versus-mechanism collision on the page. Swing names both a rhythmic ratio and an entire era of jazz, and nearly every corpus use is the genre. So a demo that sounds right may be right for the wrong reason — the generator may be reaching for big bands rather than for uneven eighth notes. The clean test is asking for swing in a style that has no swing tradition at all, which is the same design the drone card needs for the same reason.` },
  ev:[
    { n:44,  span:`swing`, state:'candidate', why:`A spoken-word recitation "riding the swing" — the only case in the corpus where swing is clearly a feel rather than a genre, since nothing is being sung.` },
    { n:26,  span:`swing`, state:'candidate', why:`"Big-band swing" — the genre reading, and the direct comparison that makes #44 informative.` },
    { n:101, span:`swing`, state:'candidate', why:`"Western swing", the same rhythmic idea inside a country tradition rather than a jazz one.` },
    { n:47,  span:`swing`, state:'candidate', why:`"Gypsy-jazz manouche swing" at speed, where the unevenness has to survive a very fast tempo to be audible at all.` }
  ]
},

{
  id:'vibrato',
  term:`Vibrato`,
  sounds:`The held note wobbles. Instead of sitting perfectly still, a sustained note pulses gently up and down in pitch several times a second — a shimmer that makes a voice sound warm and alive, and quietly disguises the fact that holding a note dead straight is very hard. Too much and it turns into a bleat or a wobble you cannot ignore; too little and the voice sounds cold, or synthetic, or nervous.`,
  gloss:`A regular, small oscillation in the pitch of a sustained note. Singers and string players produce it deliberately; on most instruments it is the main way a long note is kept alive.`,
  syn:[`wobble`,`the shake on long notes`,`warble`,`tremble`,`that operatic wobble`,`sustained shimmer`],
  myth:`It is not melisma, though both make a note move. Melisma travels between different pitches carrying the melody along; vibrato circles a single pitch and never leaves it. It is also not a decoration added on top — most trained voices do it by default, and singing without it is the deliberate choice.`,
  known:`Opera and musical theatre, where it is constant and expected, against indie, folk and modern pop, where its absence is a deliberate signal of intimacy or coolness.`,
  origin:`Present in singing and string playing for centuries as an occasional ornament; became continuous and expected in Western classical singing during the nineteenth century, and its deliberate removal became a pop stance in the twentieth.`,
  first:`pre-1900`, peak:[`1950s`,`1960s`],
  exemplar:{ kind:'exemplifies', title:`Nessun Dorma`, artist:`Luciano Pavarotti`, year:`1972`,
    listen:`Every sustained note carries an even, continuous vibrato — pitch pulsing gently around a centre it never leaves. The final held note is the clearest demonstration of the difference from melisma.` },
  domains:['voice'],
  match:['vibrato'],
  kinds:['technique'],
  nature:'continuous',
  range:`#7 is constant — "even vibrato woven through every sustained note". #2 is rationed — "smooth vibrato arriving only at phrase ends". #3 excludes "vibrato wobble" specifically, naming the failure rather than the technique.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`A rare case where the useful test is about CONTROL rather than presence. Almost any sung output will have some vibrato, so the question is whether the generator can be told when to use it — constantly, only at phrase ends, or not at all. #7 and #2 are close to a ready-made pair for exactly that, and #3 adds the suppression case. If placement can be steered, that is a strong result about vocal instructions generally; if every voice wobbles the same way regardless, that limit applies well beyond this card.` },
  ev:[
    { n:7, span:`vibrato`, state:'candidate', why:`Operatic and continuous — "even vibrato woven through every sustained note", the maximal and most conventional case.` },
    { n:2, span:`vibrato`, state:'candidate', why:`"Smooth vibrato arriving only at phrase ends" — placement specified rather than amount, which is the harder instruction.` },
    { n:3, span:`vibrato wobble`, state:'candidate', why:`Negative use, and it excludes the FAULT rather than the technique — a precision worth testing against a blunt exclusion.` },
    { n:4, span:`vibrato`, state:'candidate', why:`A blunt negative excluding vibrato outright, for direct comparison with #3.` }
  ]
},

{
  id:'vocal-fry',
  term:`Vocal fry`,
  sounds:`The bottom of the voice gives out and starts rattling. Instead of a note you get a slow dry creak — a run of clicks so close together they smear into a rasp, like a door easing open or a stick dragged along railings. It sits below where singing can reach, carries almost no pitch at all, and depending entirely on how it arrives it reads as either offhand and intimate or genuinely broken.`,
  gloss:`The lowest vocal register, where the folds come together slackly and flap in irregular pulses instead of vibrating evenly. It takes very little air, which is why it turns up on its own at the end of a sentence when breath runs out.`,
  syn:[`creak`,`creaky voice`,`glottal fry`,`croak`,`the low crackle`,`that rattle at the end of sentences`],
  myth:`It is not damage, and it is not rasp. Rasp is a note being roughened while it still sounds; fry is a different mechanism producing almost no note at all. It is also not new — it became a much-discussed speech habit in the 2000s, which left people thinking singers had started doing something novel, when it is one of the oldest sounds a voice can make.`,
  known:`Phrase-ends in modern pop and R&B, conversational indie and bedroom recording, ASMR, and extreme metal — where, driven hard, it is the actual mechanism behind screaming.`,
  origin:`Present in speech and singing everywhere and always; entered Western popular music through conversational delivery on one side and the false-cord screaming of 1980s extreme metal on the other, then became a widely-noticed feature of everyday speech in the 2000s.`,
  first:`ancient`, peak:[`1980s`,`2000s`,`2010s`],
  domains:['voice'],
  match:['vocal fry','creaking rattle','fry scream'],
  kinds:['technique'],
  nature:'continuous',
  range:`Enormous, and the five entries below were written to cover it deliberately: fry as the collapse at the end of a line (#408), as the scrape a phrase starts from (#409), as a register held for a whole vocal (#410), as the thing a scream is actually made of (#411), and as a deliberate contrast against a clean top line (#412).`,
  res:{ verdict:'untested', model:null, date:null,
    note:`The only card here whose evidence was COMMISSIONED rather than found. All 482 existing prompts contained not one instance of the term, so five were written to fill the gap — one per mechanism — and demoed. That makes this the cleanest test on the page by some distance: everywhere else the variable is tangled with whatever else the prompt was written for, whereas here the prompts exist for no reason but this term.

#412 is a minimal pair built into a single take — clean sustained top and dropped creaking bottom in the same phrase, one voice — so it can be judged without comparing two files. The obvious first question is whether the generator distinguishes the five mechanisms at all, or produces one generic creak whenever the word appears.` },
  ev:[
    { n:412, span:`vocal fry`, state:'candidate', why:`The built-in pair: a clean upper line and a fried bottom alternating inside the same phrase, so the contrast is audible in one take without any A/B.` },
    { n:410, span:`vocal fry`, state:'candidate', why:`Fry held as the entire timbre for a whole vocal, with the throat asked for almost no tone at all — the maximal case, and the easiest to falsify.` },
    { n:408, span:`vocal fry`, state:'candidate', why:`Fry as collapse: pitch giving out on the last word of every line, which is the form most listeners have actually heard without naming it.` },
    { n:409, span:`vocal fry`, state:'candidate', why:`Fry as attack rather than decay — each phrase starting on a scrape and blooming up into tone. The hardest placement of the five to get right.` },
    { n:411, span:`vocal fry`, state:'candidate', why:`Fry driven until it tears into a scream, which tests whether the term survives being pushed past the point where most listeners would still call it fry.` }
  ]
},

{
  id:'tremolo',
  term:`Tremolo`,
  sounds:`The volume pulses. A held note or chord swells and ducks and swells again, several times a second — the pitch never moves, only how loud it is, so it sounds like the sound is being fanned. Slow, it lurches seasickly. Fast, it stops being a wobble and becomes a shudder that reads as a texture in its own right.`,
  gloss:`A regular oscillation in VOLUME. On an amplifier or pedal a circuit turns the signal up and down; on a string instrument, rapidly repeating one note achieves something similar by entirely different means.`,
  syn:[`amp tremolo`,`that pulsing guitar`,`throb`,`wobble`,`choppy effect`,`tremolo picking`],
  myth:`Tremolo and vibrato are swapped, industry-wide and permanently. Tremolo is volume; vibrato is pitch. But a guitar's whammy bar is called a tremolo arm and it bends pitch — vibrato — while a famous line of amplifiers labelled its tremolo circuit "vibrato". The names have been wrong for seventy years and nobody has fixed them, so a player asking for one and an engineer hearing it can mean two different things.`,
  known:`Surf and rockabilly guitar, 1960s psychedelia, gothic country and shoegaze. Separately, "tremolo picking" in black metal means rapid repeated notes and involves no circuit at all.`,
  origin:`Built into guitar amplifiers through the 1950s and immediately central to surf and psychedelia; revived by shoegaze and dream-pop in the late 1980s.`,
  first:`1950s`, peak:[`1960s`,`1990s`],
  exemplar:{ kind:'exemplifies', title:`Crimson and Clover`, artist:`Tommy James and the Shondells`, year:`1968`,
    listen:`The long outro runs the voice and guitar through tremolo until the volume is pulsing several times a second. Nothing changes pitch — only loudness — which is the distinction the whole card is about.` },
  domains:['guitar','production'],
  match:['tremolo'],
  kinds:['instrument','technique'],
  nature:'continuous',
  range:`#25 is gentle amp tremolo on a hollow-body. #41 has "tremolo swells" used as shoegaze texture rather than as an effect on a part. #19 is the other meaning entirely — "tremolo-picked" guitar, rapid repeated notes, no circuit involved.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`A rare case where one word carries two unrelated meanings inside the same corpus: the amplifier effect (#25, #41, #60) and the picking technique (#19). If the generator produces picking when the effect was wanted, that is not a failure to hear the word — it is the word being genuinely ambiguous, and any test has to say which is meant. Worth pairing with the vibrato card too, since the industry has had those two backwards for seventy years and the generator learned from text written by people using them wrongly.` },
  ev:[
    { n:25, span:`tremolo`, state:'candidate', why:`The classic use: a hollow-body guitar with amp tremolo in a 1950s rockabilly setting, where the pulse should be plainly audible.` },
    { n:41, span:`tremolo`, state:'candidate', why:`"Tremolo swells" in shoegaze — the effect as an atmosphere rather than an ornament on a part.` },
    { n:60, span:`Tremolo`, state:'candidate', why:`"Tremolo baritone guitar" in gothic country, slow and exposed, so any wobble in volume has nowhere to hide. Note the capital T.` },
    { n:19, span:`Tremolo`, state:'candidate', why:`The ambiguity itself: "Tremolo-picked distorted guitar" in black metal, where the word means rapid picking. The most useful item here for telling the two senses apart.` }
  ]
},

{
  id:'transients',
  term:`Transients`,
  sounds:`The first few thousandths of a second of a note — the click of the pick, the thud of the hammer, the puff of breath before a flute tone settles. You do not hear it as a separate event; you hear it as what the instrument IS. Soften it and everything turns rounder and further away; sharpen it and the same performance jumps forward and hits harder without getting louder.`,
  gloss:`The brief loud burst at the onset of a sound, before it settles into a steady tone. Almost all the information the ear uses to identify an instrument is packed into it.`,
  syn:[`attack`,`the click`,`the hit`,`initial burst`,`snap`,`punch`],
  myth:`Almost everything that tells you which instrument you are hearing lives in that first fraction of a second, not in the note that follows. Cut the attack off a recorded piano and most listeners can no longer identify it — it turns into something closer to an organ. The "tone" we think we are recognising is largely the attack, which is also why heavy compression makes a mix sound lifeless: it is flattening the part that carried the identity.`,
  known:`Drum production, where punch is almost entirely a transient question; mixing and mastering; and sampling, where a badly-cut start turns a recognisable instrument into a synth pad.`,
  origin:`Understood through early-20th-century acoustics research; became a practical production concern once compressors, and later samplers and transient shapers, let engineers reshape attacks directly.`,
  first:`1930s`, peak:[`1980s`,`2000s`],
  domains:['production','drums'],
  match:['transient'],
  kinds:['technique'],
  nature:'continuous',
  range:`Narrower in the corpus than in life. Every use is the Reese-bass spec — "a single reese bass transient at structural breaks only" — meaning one isolated attack event rather than the attack of every note.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`An honest limit worth stating before anyone reads too much into the evidence below. The corpus only ever uses "transient" in one narrow sense: a single isolated bass onset at a structural break. That IS a transient, so the term is being used correctly, but none of these demos can show the perceptual claim this card is actually about — that identity lives in the attack. Testing that needs a commissioned pair: the same phrase with sharp attacks and with softened ones, nothing else changed. Until then this card documents a real and surprising fact it cannot yet demonstrate.` },
  ev:[
    { n:131, span:`transient`, state:'candidate', why:`"A single reese bass transient at structural breaks only, non-rhythmic, non-repeating" — the most explicit statement of the intent in the corpus.` },
    { n:84,  span:`transient`, state:'candidate', why:`The same spec inside dense industrial techno, where a single onset has to cut through a wall of sound to register at all.` },
    { n:91,  span:`transient`, state:'candidate', why:`"Single reese transient at the break" in melodic dubstep — sparser surroundings, so the onset should be easier to hear.` },
    { n:117, span:`transient`, state:'candidate', why:`A fourth use of the same spec, useful mainly as a consistency check on whether the wording produces the same event each time.` }
  ]
},

{
  id:'backbeat',
  term:`Backbeat`,
  sounds:`A hard snare crack on beats two and four, every bar, against a kick on one and three. It is what makes you nod on the offbeats instead of the downbeats, and it is so deeply built into Western popular music that its absence registers as something being missing rather than merely different.`,
  gloss:`Accenting the second and fourth beats of a four-beat bar, usually with a snare, against a kick drum on one and three.`,
  syn:[`two and four`,`the snare on the offbeat`,`that rock beat`,`crack on the two`,`the snap`,`straight beat`],
  myth:`It feels universal and it is not. Most of the world's musical traditions do not accent two and four at all — the backbeat is a specifically African-American innovation that spread through gospel, blues and R&B until it became the default sound of popular music nearly everywhere. What sounds like "how music goes" is a regional habit less than a century old.`,
  known:`Rock and roll, soul, Motown, country and effectively all Western pop since the 1950s. It is the single most recognisable rhythmic feature of the last seventy years of recorded music.`,
  origin:`Emerged in African-American gospel, blues and rhythm and blues through the 1940s, and became the defining rhythmic signature of rock and roll from the mid-1950s onward.`,
  first:`1940s`, peak:[`1950s`,`1960s`,`1970s`],
  exemplar:{ kind:'popularised', title:`Rock Around the Clock`, artist:`Bill Haley and His Comets`, year:`1954`,
    listen:`The snare cracks on two and four for the entire record with nothing else competing for attention. This is the song usually credited with making that accent the default of popular music.` },
  domains:['rhythm','drums'],
  match:['backbeat'],
  kinds:['technique'],
  nature:'continuous',
  range:`From "cracking backbeat" carrying a whole soul arrangement (#K1) to "four-on-the-snare backbeat" (#121), which doubles it up until the accent is on every beat and the idea nearly cancels itself out.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Best used as a control, in the way the minor-key card is. This is the most default thing in Western popular music, so producing it on request proves very little — the interesting test is the opposite direction: whether it can be SUPPRESSED. Ask for a groove with no backbeat and see whether the snare stays off two and four, or creeps back because everything the model learned puts it there. A failure to suppress would say something about defaults generally, well beyond this term.` },
  ev:[
    { n:121, span:`backbeat`, state:'candidate', why:`"Four-on-the-snare backbeat" — the term pushed to its limit, where accenting every beat arguably stops being a backbeat at all.` },
    { n:31,  span:`backbeat`, state:'candidate', why:`"Big backbeat drums" in a wide stadium arrangement, the plainest and most foregrounded use.` },
    { n:122, span:`backbeat`, state:'candidate', why:`"Heavy backbeat drums" inside a dense live Motown-style band, where it competes with piano, horns and a room.` },
    { n:25,  span:`backbeat`, state:'candidate', why:`"Brushed-to-backbeat drums" — a transition into the backbeat rather than a constant one, which is the harder instruction.` }
  ]
},

{
  id:'formants',
  term:`Formants`,
  sounds:`The reason a voice still sounds like that person whether they sing high or low. Underneath the note sit fixed resonant peaks shaped by the throat and mouth, and they barely move when the pitch does — they are what makes an "ee" an "ee" and an "oh" an "oh". Move them and the singer stops sounding like a person of that size: the chipmunk effect is formants sliding upward when they should have stayed put.`,
  gloss:`Resonant peaks in the vocal tract that shape vowels and carry a voice's identity. They are largely independent of pitch, which is why the same vowel stays the same vowel across a singer's whole range.`,
  syn:[`vowel resonance`,`vocal tract resonance`,`formant shift`,`the chipmunk effect`,`throat shape`,`vowel colour`],
  myth:`Pitch and formants are separate things, and that is why speeding a recording up sounds *wrong* rather than simply higher. Raise the pitch alone and you get a higher voice; drag the formants up with it and you get a smaller person. Modern pitch software keeps the two apart deliberately — which is precisely how a voice can be moved an octave and still sound human.`,
  known:`Vocoders and talkboxes, hyperpop, and the formant control sitting in every pitch-correction plugin. It is also why a vocoder sounds like a robot *speaking* rather than a synth merely playing.`,
  origin:`Described by 19th-century acoustics and central to 20th-century speech research; became a production control once vocoders and later digital pitch-shifters made formants adjustable independently of pitch.`,
  first:`1930s`, peak:[`1970s`,`2010s`],
  exemplar:{ kind:'exemplifies', title:`Do You Feel Like We Do`, artist:`Peter Frampton`, year:`1976`,
    listen:`The talkbox section is formants made visible. The guitar supplies the pitch while a mouth shapes the vowels over it, so you hear words without a voice — proof that vowel and pitch are separate things.` },
  domains:['voice','production'],
  match:['formant'],
  kinds:['technique'],
  nature:'continuous',
  range:`#14 is a talkbox: mouth-shaped vowels riding a synth carrier, formants supplied by an actual mouth. #208 is a vocoder doing it electronically. #90 fuses formant-shift with autotune until it is part of the timbre. #246 is the strangest — a sine wave tracking the singer's formants an octave above.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Unusually well-evidenced for a perceptual term, and unusually testable, because formant errors are obvious to anyone: a voice with mismatched formants sounds like the wrong size of person, and nobody needs the word to hear that. The sharpest test is #90 against a plain pitch-shift — if the generator raises pitch and formants together it will produce a chipmunk, and if it holds formants steady it will produce a human, and the difference is unmistakable.` },
  ev:[
    { n:14,  span:`formant`, state:'candidate', why:`A talkbox, where the formants come from a real mouth shaping a synth carrier — the mechanism at its most physical.` },
    { n:90,  span:`formant`, state:'candidate', why:`Hyperpop with formant-shift and autotune fused into one timbre. The best test of whether pitch and formants are being handled separately.` },
    { n:208, span:`formant`, state:'candidate', why:`A vocoder doing electronically what #14 does mechanically — the same idea by another route, and a check on whether the word or the device is steering.` },
    { n:246, span:`formant`, state:'candidate', why:`The outlier: a sine wave tracking the voice's formants an octave above, which asks the generator to treat formants as something separable and followable.` }
  ]
},

{
  id:'rubato',
  term:`Rubato`,
  sounds:`The tempo breathes. A phrase pushes forward and then hangs back, notes stretched and squeezed against the beat — and yet nobody loses their place, because the pulse is still there, remembered rather than played. It makes the music sound spoken instead of counted, and it is most of why a slow performance can feel human rather than merely slow.`,
  gloss:`Deliberately flexible timing — stealing time from some notes and paying it back on others across a phrase. The name is literally "robbed time".`,
  syn:[`give and take`,`elastic tempo`,`free time`,`pushing and pulling`,`out of tempo`,`played loose`],
  myth:`Classically it does not mean the whole band slowing down. In its original form the accompaniment holds strict time while only the melody stretches against it, and the tension between the two IS the effect. Everybody slowing together is a later and much blunter thing that inherited the name.`,
  known:`Romantic piano, opera, fado, tango and chamber pop — and any ballad where a lead is meant to sound like a person talking rather than a part being counted.`,
  origin:`Eighteenth and nineteenth-century European performance practice, codified in the Romantic era; carried into popular ballad singing wherever a lead was meant to sound spoken rather than measured.`,
  first:`pre-1900`, peak:[`1900s`,`1960s`],
  exemplar:{ kind:'exemplifies', title:`Barco Negro`, artist:`Amalia Rodrigues`, year:`1955`,
    listen:`Fado, where the voice stretches and hangs while the guitars hold their place underneath. It is the strict original sense of the word — the melody robbing time, not the ensemble slowing down.` },
  domains:['rhythm'],
  match:['rubato'],
  kinds:['technique'],
  nature:'continuous',
  range:`#7 and #67 apply it to everything at once — "rubato-rich", "stately and rubato". #114 does the strict original: the vocal's "rubato yearning" set explicitly against a rigid pulse underneath.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`#114 makes this one of the sharpest tests on the page, because it asks for the hard version by accident — a rubato vocal over a rigid pulse. That requires the generator to hold two different time-feels at once, which is a much stronger claim than merely slowing down. And the failure mode is precise and nameable rather than vague: if everything slows together, the term has been read as ritardando, which is a different word for a different thing.` },
  ev:[
    { n:114, span:`rubato`, state:'candidate', why:`The strict original sense, and the hardest ask: a rubato vocal explicitly set against a rigid pulse, so two time-feels have to coexist.` },
    { n:7,   span:`rubato`, state:'candidate', why:`"Rubato-rich" opera, the idiom the word belongs to, where the whole ensemble is expected to move with the singer.` },
    { n:76,  span:`rubato`, state:'candidate', why:`Fado, where rubato is inseparable from the emotional convention of the style rather than a technique applied to it.` },
    { n:67,  span:`rubato`, state:'candidate', why:`"Stately and rubato" in a baroque aria — restrained, and the most likely of the four to show nothing if the effect is subtle.` }
  ]
},

{
  id:'sub-bass',
  term:`Sub-bass`,
  sounds:`Felt before it is heard. Below roughly 60 Hz the ear largely stops reporting pitch and starts reporting pressure — the chest, the floor and the room answer before the note does. On a small speaker it can be entirely absent while the music still works; on a big system it is most of what you are actually experiencing.`,
  gloss:`Frequencies at the very bottom of hearing, roughly below 60 Hz. Pitch perception is weak down there, so sub-bass reads as weight and pressure more than as notes.`,
  syn:[`sub`,`808`,`low end`,`the rumble`,`chest frequencies`,`subs`],
  myth:`You routinely hear a bass note that is not physically in the air. Small speakers cannot reproduce sub frequencies at all, yet the bassline still sounds present — the ear reconstructs the missing fundamental from the harmonics above it. Which means a mix can be judged, quite successfully, on speakers that are not playing its lowest part.`,
  known:`Dub and sound-system culture, drum and bass, dubstep and trap — anywhere the lowest octave is a musical part in its own right rather than a by-product of the bass instrument.`,
  origin:`Became a compositional element through Jamaican sound-system culture in the 1960s and 70s and the club systems built after it; the 808 drum machine made it a standard pop ingredient from the 1980s.`,
  first:`1970s`, peak:[`1990s`,`2010s`],
  exemplar:{ kind:'exemplifies', title:`King Tubby Meets Rockers Uptown`, artist:`Augustus Pablo`, year:`1976`,
    listen:`Sound-system dub, where the lowest octave is the point rather than a by-product. Worth trying on a phone and then on something with real low end — on the phone you will hear a bass note that is not being reproduced at all.` },
  domains:['production'],
  match:['sub bass','sub-bass'],
  kinds:['technique'],
  nature:'continuous',
  range:`"Deep sub bassline" (#82) is foundation — pressure under everything else. "Booming 808 sub-bass with sliding glides" (#23) is the opposite: the sub carrying melody, gliding between pitches down where pitch is hardest to hear.`,
  res:{ verdict:'untested', model:null, date:null,
    note:`Awkward to judge, and the awkwardness is itself the lesson. Whether you can hear this at all depends on what you are listening on — laptop speakers and most phones reproduce almost nothing below 100 Hz, so a demo that sounds thin there may be entirely correct. Anyone voting on this card should say what they listened on. That caveat applies to no other card here, which is a good argument for testing it deliberately rather than in passing.` },
  ev:[
    { n:23, span:`sub-bass`, state:'candidate', why:`"Booming 808 sub-bass with sliding glides" — sub carrying actual melody, which is the hardest thing to do down there and the easiest to get wrong.` },
    { n:82, span:`sub bass`, state:'candidate', why:`Dub techno, the tradition that made sub-bass a musical part rather than a by-product.` },
    { n:89, span:`sub bass`, state:'candidate', why:`"Deep warm sub bass" under liquid drum and bass, where it has to sit beneath a busy break without muddying it.` },
    { n:87, span:`sub bass`, state:'candidate', why:`"Booming sub bass" in future bass, alongside supersaw chords that occupy a completely different part of the spectrum.` }
  ]
},
];
