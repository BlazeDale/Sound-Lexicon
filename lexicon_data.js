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

const LEX_VERSION = 'v1';
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
  id:'plate-reverb',
  term:`Plate reverb`,
  gloss:`Reverb made by vibrating a large sheet of steel and listening to it with pickups. It gives a dense, smooth wash with no sense of a room's shape — big, but not like anywhere in particular.`,
  syn:[`plate`,`lush reverb`,`smooth reverb`,`studio reverb`,`the wash`,`that big vocal reverb`],
  myth:`It is not a recording of a room. There is no room involved at all — a plate is a piece of furniture-sized hardware. The reason it sounds unnatural in a pleasing way is that no physical space decays that evenly.`,
  known:`Vocals and snare drums from the late 1950s on. It is why so many classic records sound enormous without sounding like a church.`,
  origin:`German studio hardware of the late 1950s; the default studio reverb through the 60s and 70s, until digital units displaced it.`,
  domains:['room','voice','drums','guitar'],
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
}

];
