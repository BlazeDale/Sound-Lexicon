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

const LEX_VERSION = 'v3';
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
     gloss   plain language, no jargon. The lay reader's entry point.
     syn     synonym ring: musician's slang AND what someone would actually type
     myth    the thing people commonly get wrong
     known   characteristic use and effect
     origin  era and scene — never a name (§7)
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
  gloss:`The side of the picking hand rests on the strings right where they meet the bridge, so each note comes out short and thick instead of ringing on. It is the difference between a guitar that sings and a guitar that chugs.`,
  syn:[`chug`,`chugging`,`muted strumming`,`chunky guitar`,`choppy guitar`,`that ch-ch-ch guitar sound`,`damped strings`],
  myth:`It is not the same as playing quietly. A palm mute can be brutally loud — what makes it a mute is that the note stops fast, not that it is soft.`,
  known:`The engine of punk, metal and hard-rock rhythm playing. It turns a chord into a percussion instrument, which is what lets a guitar lock tightly to the kick drum instead of floating over it.`,
  origin:`Clipped rhythm playing in late-1950s surf and rockabilly; hard rock and metal made it the default rhythm texture from the 1970s onward.`,
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
  gloss:`Wire or nylon brushes used instead of drumsticks. They can be swept across the drumhead for a continuous shhh, or tapped for a soft, blunt hit with no crack to it.`,
  syn:[`brushed drums`,`wire brushes`,`swept snare`,`swishing drums`,`soft jazz drums`,`that brushy sound`],
  myth:`Brushes are not just quiet sticks. A stick played softly still goes tick; a brush can produce a sustained sweeping sound that a stick physically cannot make at any volume.`,
  known:`Jazz ballads, torch songs, and any arrangement that wants a pulse without a backbeat hitting the listener. They keep time as a texture rather than as a series of events.`,
  origin:`Early-20th-century dance bands needing a kit that would not drown a room; became the standard ballad voice of postwar small-group jazz.`,
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
  gloss:`An electric piano from the 1960s and 70s whose hammers strike small metal tines instead of strings. Bell-like and round when played gently; it growls when played hard.`,
  syn:[`electric piano`,`e-piano`,`bell piano`,`that warm keyboard sound`,`tine piano`,`suitcase piano`],
  myth:`It is not a synthesiser and not a digital piano. It is a mechanical instrument with moving parts — the sound is metal actually being struck, not a waveform being generated.`,
  known:`Neo-soul, 1970s jazz fusion, lounge, and trip-hop. Its signature quality is that it fills space without competing: warm, round, and slightly out of focus by design.`,
  origin:`Developed from a wartime portable-instrument idea in the mid-1950s, mass-produced through the 60s and 70s, then rediscovered by 1990s hip-hop and neo-soul producers.`,
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
  gloss:`Singing several — sometimes many — different notes on a single syllable, instead of one note per syllable. The word stretches while the melody keeps moving underneath it.`,
  syn:[`runs`,`vocal runs`,`riffs`,`ornamentation`,`curls`,`that thing where they sing lots of notes on one word`],
  myth:`It is not vibrato. Vibrato wobbles around a single pitch; melisma actually travels between different pitches. It is also not inherently showing off — it is the default in several of the world's oldest vocal traditions.`,
  known:`Gospel and R&B runs, but equally Qawwali, flamenco, Byzantine chant and sean-nós. In pop it reads as virtuosity; in devotional music it reads as intensity.`,
  origin:`Ancient and near-universal in liturgical singing; entered Western popular music through gospel and soul, and became a mainstream pop expectation from the late 1980s.`,
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
  gloss:`A microphone that senses sound with a thin strip of metal foil hanging in a magnet, rather than a stiff plastic diaphragm. It does not capture the very top end, which listeners hear as warm or smooth.`,
  syn:[`ribbon mic`,`warm mic`,`vintage mic`,`smooth microphone`,`old radio mic`,`velocity mic`],
  myth:`Warmth is not something the microphone adds — it is brightness the microphone fails to capture. A ribbon is gentle at the top because the foil is heavy and slow to move, not because it enriches anything.`,
  known:`Broadcast and big-band recording from the 1930s to the 50s; now reached for deliberately on brass, guitar amps, and voices that would otherwise sound harsh.`,
  origin:`Broadcast and record studios of the 1930s. The standard studio voice microphone until condensers displaced it in the 1950s, then revived as a deliberate period choice.`,
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
  gloss:`Singing — or more often screaming — louder than the microphone and the preamp behind it can cleanly handle, so the signal overloads and breaks up. The distortion is not added afterwards. It happens at the moment of capture, inside the equipment.`,
  syn:[`mic overload`,`blown-out vocal`,`clipping the mic`,`redlining`,`cranking the mic`,`hot signal`,`trashed vocal`,`the mic cannot take it`],
  myth:`It is not the singer's voice distorting. A perfectly clean voice can be driven into the red, and a shredded, fraying voice can be captured spotlessly. This is the equipment breaking up, not the throat — the two get confused because records that want one usually want both at once.`,
  known:`Hardcore, garage rock, sludge and lo-fi indie — anywhere a recording is meant to sound like it barely survived the performance. It reads as urgency and refusal to polish, which is exactly why it kept being used long after it stopped being an accident.`,
  origin:`Began as a mistake in cheap rooms and basement shows; adopted on purpose from the late-1970s punk underground, became a signature of 1980s hardcore and 1990s lo-fi and garage revival, and returned as deliberate, exaggerated clipping in 2010s hyperpop.`,
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
  gloss:`Reverb made by vibrating a large sheet of steel and listening to it with pickups. It gives a dense, smooth wash with no sense of a room's shape — big, but not like anywhere in particular.`,
  syn:[`plate`,`lush reverb`,`smooth reverb`,`studio reverb`,`the wash`,`that big vocal reverb`],
  myth:`It is not a recording of a room. There is no room involved at all — a plate is a piece of furniture-sized hardware. The reason it sounds unnatural in a pleasing way is that no physical space decays that evenly.`,
  known:`Vocals and snare drums from the late 1950s on. It is why so many classic records sound enormous without sounding like a church.`,
  origin:`German studio hardware of the late 1950s; the default studio reverb through the 60s and 70s, until digital units displaced it.`,
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
  gloss:`The bass and pads are automatically turned down every time the kick drum hits, then let straight back up. You hear it as a rhythmic breathing or pumping underneath the track.`,
  syn:[`pumping`,`ducking`,`the pump`,`sidechain`,`that breathing sound`,`the whoosh in dance music`],
  myth:`The pumping is usually the point, not a side effect. It started as a mixing fix to stop the kick and bass fighting each other, but in dance music it is now added deliberately and exaggerated well past what any fix would need.`,
  known:`House, trance, EDM and nu-disco. It is the mechanism behind the sense that dance music is inhaling and exhaling rather than simply repeating.`,
  origin:`A broadcast and mixing technique from the 1960s; became an audible musical effect in late-1990s French house and filtered disco.`,
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
  gloss:`One note held or repeated underneath everything else while the melody moves above it. It does not change to follow the chords — the chords change around it.`,
  syn:[`held note`,`sustained bass`,`pedal tone`,`the hum`,`that one note underneath`,`tambura`],
  myth:`A drone is not simply a long chord. The point is that it stays put while the harmony moves against it — the friction between the fixed note and the moving one is the whole effect.`,
  known:`Indian classical music, Highland pipes, Appalachian fiddle, doom metal and ambient. It is one of the oldest harmonic devices in existence.`,
  origin:`Predates written harmony; arrived independently in folk and devotional traditions across Europe, Asia and North Africa.`,
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
  gloss:`The kick drum lands on every single beat — one, two, three, four — with no gaps. It is the steadiest pulse available, and it is why you can dance to a track you have never heard before.`,
  syn:[`four to the floor`,`steady kick`,`dance beat`,`thumping kick`,`straight kick`,`that boom boom boom boom`],
  myth:`It describes the kick drum only — not the tempo, and not the genre. A slow, sad song can be four-on-the-floor, and plenty of very fast music is not.`,
  known:`Disco first, then house, techno and most dance music since. Also common in rock and indie whenever a track wants relentlessness instead of swing.`,
  origin:`Named for the bass-drum pedal on the floor; became the defining figure of mid-1970s disco and carried into house and techno through the 80s.`,
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
  gloss:`The whole song moves up (or down) into a different key partway through, usually for a final chorus. Everything shifts together, so it lands as a lift rather than as a wrong note.`,
  syn:[`modulation`,`key lift`,`stepping up`,`gear change`,`when it goes up at the end`,`truck-driver's modulation`],
  myth:`It is not the singer straining higher — the entire arrangement moves with them. And it is not automatically cheesy: the unprepared last-chorus lift is only one kind, and most other key changes are designed to be invisible.`,
  known:`The final-chorus lift in ballads, contest pop and schlager. Used sparingly it is a structural device; used at the last chorus with a drum fill announcing it, it is a genre signature in its own right.`,
  origin:`A standard device in European art music long before popular song; the undisguised late-chorus lift is a mid-20th-century pop habit, strongest in contest and schlager traditions.`,
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
  gloss:`One voice or instrument makes a statement and another answers it. The answer is a genuine reply — it waits its turn rather than playing along underneath.`,
  syn:[`call-and-answer`,`question and answer`,`trading`,`back-and-forth`,`antiphony`,`when the choir answers the singer`],
  myth:`It is not the same as backing vocals or harmony. Backing vocals sing with the lead; a response happens after the call, in the gap the call deliberately leaves open.`,
  known:`West African musical practice and everything descended from it — work songs, field hollers, gospel, blues, jazz trading, hip-hop crowd chants. Sea shanties arrived at the same structure independently.`,
  origin:`West African musical practice carried into the Americas; independently present in European work-song and liturgical traditions.`,
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
  gloss:`A huge reverb is put on the drum and then chopped off a fraction of a second after it starts, instead of being allowed to fade. You get the size of an enormous room with none of the ring — a giant thud that stops dead.`,
  syn:[`gated snare`,`the 80s drum sound`,`big snare`,`that huge stopping snare`,`gated ambience`,`the drum that cuts off`],
  myth:`The gate is on the reverb, not on the drum. Nothing is being cut from the hit itself — the enormous room around it is switched off mid-decay, which is why it sounds impossible rather than merely loud.`,
  known:`The defining drum sound of 1980s pop, new wave and synth-pop, and the fastest way to date a record to that decade. Later picked up again without irony by synthwave.`,
  origin:`A studio accident in early-1980s London — a talkback microphone run through heavy compression and a noise gate; spread through 1980s pop and new wave, and returned deliberately in 2010s synthwave and darksynth.`,
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
  gloss:`A separate way of making high notes, where only the edges of the vocal folds vibrate. It comes out lighter and more hollow than an ordinary voice pushed high, and it can be reached easily where a normal high note takes force.`,
  syn:[`the light high voice`,`airy high notes`,`the thin register`,`breathy high singing`,`head voice`,`when they go up soft and floaty`],
  myth:`Falsetto and head voice are not the same thing, though they are treated as synonyms constantly. Head voice is the ordinary voice carried high with the folds still fully vibrating; falsetto is a different mechanism that has thinned out. And falsetto is not automatically quiet — it can be belted hard.`,
  known:`Doo-wop and soul, disco, indie folk and modern R&B. It reads as either vulnerability or ecstasy depending almost entirely on how hard it is pushed, with very little in between.`,
  origin:`Ancient in liturgical singing wherever high voices were wanted; entered popular music through gospel and doo-wop, and became a mainstream pop expectation from the 1970s onward.`,
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
  gloss:`Rather than pressing a string down behind a fret, a smooth hard object is laid on top of it and moved along. The pitch slides continuously instead of stepping, so the guitar can cry and wail between the notes.`,
  syn:[`bottleneck`,`slide`,`steel`,`that crying guitar`,`whining guitar`,`glass slide`,`the guitar that sounds like singing`],
  myth:`It is not a whammy bar or a pitch-bend effect. Nothing is stretching the string — the note is being carried along it by hand, which is why a slide can travel any distance and stop anywhere between two frets.`,
  known:`Delta blues first, then rock, country and gospel. It is the closest a guitar gets to a human voice, which is why it so often answers a singer rather than accompanying one.`,
  origin:`The American South around the turn of the twentieth century, played with a knife back or a cut-off bottle neck; carried into electric blues and from there into rock and country.`,
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
  gloss:`An electric organ that makes its sound with spinning metal wheels beside magnetic pickups. Nine sliders called drawbars mix its harmonics, and it is nearly always heard through a cabinet with a rotating speaker that sets the sound swirling.`,
  syn:[`Hammond`,`drawbar organ`,`tonewheel organ`,`gospel organ`,`that church organ sound`,`the swirly organ`],
  myth:`The swirl is not the organ. It comes from a separate rotating-speaker cabinet, and a Hammond heard without one sounds startlingly plain. The two are so rarely separated that most listeners hear them as a single instrument.`,
  known:`Gospel, soul, ska, blues and progressive rock. Its signature move is the swell — rising underneath a voice rather than playing a part of its own.`,
  origin:`Designed in 1930s America as an affordable church instrument; taken up by gospel congregations and carried into soul, ska and rock across the 1960s.`,
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
  gloss:`A drum pattern lifted from the few seconds of an old record where everything except the drums drops out, then looped. Its swing and its slight unevenness come from having been played by a person, once, decades ago.`,
  syn:[`breaks`,`the break`,`chopped drums`,`sampled drums`,`that shuffly drum loop`,`looped drums`],
  myth:`It is not a drum-machine pattern. The whole point is that it is a recording of a human drummer being reused, which is why breakbeats feel loose in a way programmed beats have to work hard to imitate.`,
  known:`Hip-hop, jungle, drum and bass, big beat and trip-hop. Entire families of genres exist because of a handful of seconds of drumming recorded around 1970.`,
  origin:`New York block parties of the early 1970s, where DJs extended the drum break of a funk record by cutting between two copies of it; became the foundation of hip-hop and, sped up, of 1990s UK jungle.`,
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
  gloss:`Putting the emphasis where the beat is not. Notes land in the gaps between counts rather than on them, so the rhythm pulls against the pulse instead of confirming it.`,
  syn:[`offbeat`,`off the beat`,`upbeat accents`,`that pushed feel`,`against the grid`,`the funky bit`],
  myth:`Syncopation is not the same as being fast or complicated. A slow, very simple part can be heavily syncopated, and a rapid busy part played squarely on the beat is not syncopated at all.`,
  known:`Ragtime, jazz, funk, ska, reggae and effectively all dance music. It is the most reliable single ingredient of what people mean when they call music groovy.`,
  origin:`Fundamental to West African rhythmic practice and carried into the Americas; entered notated Western music through ragtime around 1900 and has been standard in popular song ever since.`,
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
  gloss:`Reverb made by sending the sound down an actual coiled spring and listening to what comes back. It is boingy and metallic rather than smooth, and it splashes audibly when hit hard.`,
  syn:[`spring`,`boing`,`that surf guitar reverb`,`twangy reverb`,`amp reverb`,`drip`,`the splashy one`],
  myth:`It is not a small version of a room. A spring imitates no space at all — the drip and rattle are the spring's own resonance, which is exactly why it sounds cheap in a way people came to love rather than tolerate.`,
  known:`Surf and rockabilly guitar, dub, garage rock and outlaw country. Because it was built into guitar amplifiers, it became the default meaning of the word reverb for a whole generation of players.`,
  origin:`Developed in the 1930s for organ cabinets, then built into guitar amplifiers from the early 1960s; adopted on purpose by surf, dub and garage scenes for its cheapness and its splash.`,
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
  gloss:`How the individual notes inside chords move from one chord to the next. Good voice-leading shifts each part as little as it can, so a change of chord feels like a step rather than a jump.`,
  syn:[`how the chords connect`,`inner parts`,`part-writing`,`smooth changes`,`the movement underneath`,`when chords flow`],
  myth:`It is not the melody, and it is not the chord progression either. It is what happens to the notes underneath the melody while the progression changes — and you notice its absence far more readily than its presence.`,
  known:`Baroque and classical writing, jazz standards, bossa nova and chamber pop — anywhere harmony is meant to feel inevitable rather than blocky. It is the difference between chords that merely follow one another and chords that lead into one another.`,
  origin:`Codified in European church polyphony and taught as part-writing from the Renaissance onward; carried into jazz harmony and, through arrangers, into twentieth-century popular song.`,
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
  gloss:`The band stops together, leaving a hole. One voice or instrument carries on alone in the gap, then everyone comes back in. The silence is arranged, not an accident.`,
  syn:[`the drop-out`,`band hits`,`breaks`,`hits and holds`,`that bit where everything stops`,`the pause`],
  myth:`It is not a pause, and it is not a fade. Nobody has stopped counting — the pulse continues silently through the gap, which is exactly why the return lands where the ear was already expecting it.`,
  known:`Blues, vaudeville, mariachi, rock and roll and hip-hop. It is the oldest way of making a single voice sound enormous: remove everything else.`,
  origin:`Long-standing in blues and early jazz performance and a staple of vaudeville stagecraft; carried into rock and roll and later into hip-hop arrangement.`,
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
  gloss:`The same singer records the same part twice and both takes play at once. The tiny differences of timing and pitch between them thicken the voice and blur its edges.`,
  syn:[`doubling`,`double-tracked vocals`,`stacked vocals`,`thickened vocals`,`twice-sung`,`that wide vocal sound`],
  myth:`It is not harmony, and it is not a chorus effect. Both takes sing the identical part — the width comes entirely from human inaccuracy, which is why a perfectly copied track sounds like nothing at all while a slightly out-of-tune second take sounds enormous.`,
  known:`1960s pop, shoegaze, grunge and bedroom pop. It is the standard way to make a thin or shy voice sound assured without making it louder.`,
  origin:`A 1960s studio practice, quickly automated with tape-delay trickery so nobody had to sing everything twice; became a default of pop production and a deliberate aesthetic in 1990s alternative and 2010s bedroom pop.`,
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

];
