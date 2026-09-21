/* Sound Lexicon — session log (edit through tools/session_log.mjs, or by hand).
 *
 * A SESSION is a working sitting. Inside it, RUNS are in the order they were made, and each
 * run carries the intent that produced it — the correction that made round N different from
 * round N-1 is the thing worth reviewing later, not just the songs.
 *
 * A song stores its Suno clip id and its sibling take, the world premise, the slot fills, the
 * style prose and exclude list it was fired with, and the lyric exactly as submitted. Hearts
 * are kept in the browser (sl.session.hearts.v1); `sunoLiked` is refreshed from Suno's own
 * liked list and is false until it has been synced.
 */
const SESSIONS = [
 {
  "id": "2026-09-20-prog-techno",
  "date": "2026-09-20",
  "title": "Progressive techno, from a remix prompt",
  "queues": [
   "hffw7j6b"
  ],
  "note": "Fifteen songs across five rounds, each round a correction of the last. Lyrics written locally by qwen3:30b on the working lyric prompt; every generation got its own words. Vocal Gender set to Female throughout.",
  "runs": [
   {
    "label": "Round 1 · three directions off the remix prompt",
    "note": "Started from the style of an existing remix. Progressive structure, the delivery described rather than named, and \"Extended Version\" in the style. B went to metal, which was the wrong read of the intent.",
    "songs": [
     {
      "v": "A",
      "title": "The Clock Forgets Its Hands",
      "id": "f23fe78c-70f4-4e4c-a96f-6d93f98d8330",
      "alt": "233c19ab-b753-415a-8d72-0af6e4e6a230",
      "dur": 297,
      "tag": "source re-timed",
      "world": "a person can be transmitted between cities in an instant, but arrives one second younger every time, and nobody agrees where those seconds go",
      "meter": "slow",
      "structure": "a progressive structure where no section returns in the same form it left in",
      "style": "Extended Version. Progressive cinematic electronica with evolving modular architecture and luminous harmonic layering, Built around a recurring refracted-motif arpeggio that returns in a new meter each time it comes back, 7/8 then 5/4 then straight, symbolizing personal transformation, Arrangement is a long arc, no section repeating in the same form: crystalline ambient intro → harmonic tension → massive supersaw drop → introspective collapse → a long beatless instrumental passage → full spectral reformation → deconstructive finale that quotes the opening motif one last time, Synth design emphasizes brightness, clarity and motion through filter sweeps and spectral bloom, A single contralto placed close and dry, chest-toned and vibratoless, holding one syllable across a whole bar and phrasing against the grid rather than with it, rising from a flat murmur to a cracked full-throated cry and dropping straight back, Mood: cathartic, radiant, bittersweet transcendence",
      "exclude": "vocal harmonizing, hums, breathy tones, overcompression, flat tone, uninspired or generic melodies, chaotic layering, unbalanced mixing, excessive reverb wash, unoriginal, verse-chorus pop form, four-on-the-floor throughout, short radio edit, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "(The city breathes in neon sighs, a slow arpeggio of fading light. Each transmission hums: a single, unspooled thread of time. The refrain: \"One second less to hold,\" refracted through the lens of arrival.)\n\nThe city breathes in neon sighs,\nEach step a gasp, a slow descent—\nYou leave the station, turn the page,\nBut find the page already spent.\nOne second less to hold...\n(O-oh, the clock forgets its hands)\nOne second less to hold...\nThe sun you drew on paper fades.\n\nThe train dissolves in violet haze,\nA sigh beneath the bridge’s old bones.\nYou touch the glass where shadows play,\nBut your own reflection’s out of tune.\nOne second less to hold...\n(A whisper in the wires, cold)\nOne second less to hold...\nThe crayon sun you traced alone.\n\nThe streets are maps of borrowed breath,\nEach corner holds a ghost of then.\nYou count the seconds you’ve unspun,\nBut find the count has turned to when.\nOne second less to hold...\n(The air hums with the loss of sound)\nOne second less to hold...\nThe shape of your own hands held tight.\n\nYou stand where cherry blossoms fell,\nA single petal, soft and deep.\nYou reach for what was never yours,\nAnd find the now has turned to sleep.\nOne second less to hold...\n(The river swallows the refrain)\nOne second less to hold...\nThe silence where your voice was made.\n\n(The city breathes in neon sighs.\nThe arpeggio fractures.\nNo seconds left to spend.\nJust the slow unravel of a thread.\nJust the page, still blank.\nJust the crayon sun.\nJust the gasp.)\n\nOne second less to hold...\n(O-oh, the clock forgets its hands.)\nOne second less to hold...\nI am the clock that forgets its hands.",
      "plays": [
       3,
       0
      ]
     },
     {
      "v": "B",
      "title": "Your Tears Were My Air",
      "id": "4e495abf-5251-424d-831f-f8d6f01ab4f2",
      "alt": "f1cece8d-33e4-4777-929a-640e78ccbffb",
      "dur": 201,
      "tag": "prog metal — off-intent",
      "world": "the colony's air is rationed by how well each person argues for their own share, out loud, once a year, in front of everyone",
      "meter": "fast",
      "structure": "a progressive structure in an odd meter, with a countdown running underneath it from first line to last",
      "style": "Extended Edition. Progressive metal in shifting odd meters near 132 BPM, drop-tuned and patient — a polymetric guitar figure in 7/8 over a 4/4 kick so the two only line up every other bar, the riff returning transformed rather than repeated, bass playing a countermelody instead of the root, drums leading with toms and ride bell, long dynamic troughs where everything drops to one clean arpeggio before the full weight returns, a modular synth line threading the whole piece as the only element that never changes, A single contralto, low-set, close-mic'd and dry, vibratoless through the verses and stretching one syllable across a whole bar, phrasing deliberately across the bar-line, speaking as much as singing at the bottom and opening into a cracked full-throated cry at the peak of each build before dropping straight back to the murmur, Sung in real words, one voice from first line to last, Mood: ritual, accusatory, transfixed",
      "exclude": "clean pop production, verse-chorus form, four-on-the-floor, breathy whisper, belted diva runs, vocal harmonizing, autotune, orchestral arrangement, short radio edit, gang vocals, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "(12)  (7/8)\nTwelve breaths left before the silence sings—\nYour tears were my air!\n(11)  (5/4)\nI said \"More!\" like a child with empty hands,\nMore! while the sky turned scurry in the rain!\n(10)  (7/8)\n(You watched the pawn who learned to move—)\n(9)  (3/4)\nMore!\n(8)  (5/4)\nMore air!\n(7)  (7/8)\nMore worth!\n(6)  (3/4)\nMore!\n(5)  (5/4)\nWhile your breath choked the street,\nWhile you choked—\n(4)  (7/8)\nI argued for the next gasp,\nFor the next lie,\n(3)  (5/4)\nMore!\n(2)  (3/4)\nMore!\n(1)  (7/8)\nMore!\n(0)  (5/4)\nNOW YOU KNOW WHY I WON’T BREATHE.\n(Your tears were my air!)\n(I was the pawn who learned to move.)",
      "plays": [
       1,
       0
      ]
     },
     {
      "v": "C",
      "title": "Where the Light Bends",
      "id": "6c2fca69-99ab-4296-93b9-8d29d46b2828",
      "alt": "95ae895e-3b22-40e2-8b06-f9ee7f9aeec6",
      "dur": 235,
      "tag": "four-movement suite",
      "world": "the ship's crew wake one at a time, a century apart, and can only leave messages for whoever wakes next",
      "meter": "slow",
      "structure": "a suite in four movements, the same four lines returning re-ordered in each movement so their meaning inverts by the last, the third movement almost wordless",
      "style": "Extended Version, one continuous piece in four movements with no silence between them. I. a crystalline modular arpeggio alone in 5/4, stating the motif. II. drums and drop-tuned guitar enter against it in 7/8 and refuse to resolve, the voice arriving low and spoken. III. everything falls away to one clean guitar and a held synth pad, the longest and quietest movement, the voice alone and unaccompanied for eight bars. IV. the full weight returns in 4/4 for the only time in the piece and the opening motif is played by the whole band at once, then strips back to the arpeggio it began with. A single contralto, close and dry, chest-toned and vibratoless, one syllable held across a whole bar, phrasing against the meter rather than inside it, murmur to cracked cry and back with nothing in between, Mood: ritual, patient, enormous",
      "exclude": "fade-out ending, verse-chorus form, four-on-the-floor throughout, radio edit length, vocal harmonizing, breathy tones, autotune, orchestral bombast, gang vocals, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "(Four movements, played slow on a single, ancient cello. The ship’s hull groans like a bone settling. The refrain: “We’ll meet where the light bends.”)\n\nI. (Electronica: Warm, pulsing synth, like slow ocean current)\nThe salted air holds the shape of your name,\nA promise the clock’s teeth can’t chew.\nWe’ll meet where the light bends—\nYou’ll remember when I’m gone.\n(We’ll meet where the light bends—\nYou’ll remember when I’m gone.)\n\nII. (Guitar swells: Clean, then distorted, 10 seconds of silence)\nThis ship’s too dark for the shape of your face,\nThe current’s too deep for my hand to tend.\nWe’ll meet where the light bends—\nYou’ll remember when I’m gone.\n(We’ll meet where the light bends—\nYou’ll remember when I’m gone.)\n\nIII. (Almost wordless: Just breath, cello notes, the creak of the hull)\n(...wait...)\n(...bend...)\n(...gone...)\n(...tend...)\n(...where...)\n(...light...)\n(...wait...)\n(...bend...)\n(...light...)\n(...gone...)\n(...wait...)\n\nIV. (Guitar: Heavy, dissonant, then a single clean note fades)\nYou were the light where the shape of your name bent—\nThis ship’s too dark for the clock’s teeth to tend.\nWhere’s the light? Where’s the bend? Where’s the friend?\nYou were the light where the shape of your name ended.\n(You were the light where the shape of your name ended.)",
      "plays": [
       3,
       0
      ]
     }
    ]
   },
   {
    "label": "Round 2 · back inside techno, jam length, atmospheric",
    "note": "Correction: the prog influence is length and jam, not metal. Voice used sparingly so the instrumental stretches have room.",
    "songs": [
     {
      "v": "D",
      "title": "Still Here",
      "id": "1153e56d-fea1-4387-928a-80606a962db3",
      "alt": "ada53f15-da26-40d7-801b-6bd26293488f",
      "dur": 214,
      "tag": "locked groove",
      "world": "a city keeps running on the machines of people who have already left, and nobody is willing to be the one who turns them off",
      "meter": "slow",
      "structure": "exactly three short vocal passages of four lines each and nothing else at all - the rest of the piece is instrumental, so write only those twelve lines",
      "style": "Extended Version. Hypnotic atmospheric techno near 126 BPM held unbroken end to end, patient and nocturnal — one locked kick-and-hat groove that never stops while everything above it is built and dismantled by hand, a resonant analog bassline filtered slowly open across minutes rather than bars, long passages traded between a lead synth and a dubbed-out chord stab as though two players were jamming across a room, enormous atmospheric pads washing underneath the whole time, a long beatless stretch in the middle where only the pads and the tape delay remain before the groove walks back in unchanged, single notes thrown into the distance by long delay, Arrangement is one continuous jam with no verse, no chorus and no drop, A single contralto arriving only three times in the piece, close and dry, chest-toned and vibratoless, holding a few words far longer than the words need and phrasing against the grid rather than with it, Mood: nocturnal, hypnotic, vast",
      "exclude": "verse-chorus form, festival drop, vocal harmonizing, breathy tones, rap delivery, distorted guitars, orchestral arrangement, short radio edit, overcompression, flat tone, uninspired or generic melodies, chaotic layering, excessive reverb wash, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "The city hums on borrowed breath,\ndormant machines keep ticking slow,\ncold steel still holds the ghostly next—\nno one’ll pull the plug.\n\nLast train’s gone, but tracks still sing,\nstill echo where the light went down,\nsoul’s a whisper in the humming,\nstill here, still here.\n\nNo clock counts out the empty hours,\njust this hum that won’t let go—\nI am still here, I am still here,\nstill here.",
      "plays": [
       2,
       0
      ]
     },
     {
      "v": "E",
      "title": "Satellite's Hum",
      "id": "20c2f84a-f680-4b24-8ed7-0dbfd10c49f9",
      "alt": "a5a1cf22-71fb-498d-a700-31cb5b996e64",
      "dur": 338,
      "tag": "sequencer jam",
      "world": "every satellite that stopped answering is still transmitting, and each one can only be heard by the one behind it",
      "meter": "slow",
      "structure": "a progressive jam structure: two short vocal passages far apart, long wordless vowels elsewhere",
      "style": "Extended Edition. Sequencer-driven atmospheric electronic jam near 118 BPM, warm and unhurried — a sixteen-step analog sequence that mutates one note at a time and never repeats identically, a second sequence of a different length running against it so the two phase in and out of alignment over minutes, a slow four-on-the-floor that arrives late and leaves early, analog string machine and a long evolving pad bed, three extended improvised passages on a mono lead with portamento and pitch-bend where the sequence carries on underneath, tape saturation and hiss, the piece ending by subtraction rather than by stopping, No chorus, no drop and no section returning in the same form, A single contralto used as another instrument, close and dry, vibratoless, two short entries only, one syllable held across a whole bar, Mood: cosmic, patient, warm",
      "exclude": "festival drop, verse-chorus form, vocal harmonizing, belted vocal, distorted guitars, trap hi-hats, orchestral bombast, short radio edit, gridded quantized sterility, autotune, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "(A slow, low hum begins in the dark—like static between stars—held for 12 beats. No words. Just the ooh of a vacuum, the aaa of a dying sun.)\n\nSatellite’s hum\nStill transmitting... still transmitting...\nSilence still on the hill.\nStill the ghost of signal, still the glow below.\nStill...\n(A single, thin vocal:)\nHello?\n(Faint, like a moth’s wing on glass.)\n\nWe sent your name through the static\nThrough the black, through the bone-cold air\nLike a prayer in a dead man’s hand\nWe sent your name...\nStill...\n...still...\n...still.\n(The long, slow vowels bleed: \"Ooooww-w-w-w...\nAaahhh...\nEee-ee-eh-ee-eh...\nAll the words that never came through\nAll the breaths held under moonlight\nAll the still you left behind...\n...still...\n...still...\n...still...\n\n(A sharper, closer vocal—fragile as a snapped wire—\nI’m here.\n(Not in the static. Not in the sky.)\n\nYou heard the turn of the tide\nYou felt the slow in the silence\nYou knew the still wasn’t gone—\nIt was just... turning.\n(The long vowels swell: \"Uuuuuuuhhh...\nOoooooh...\nEeeee...\nNot the end.\nNot the break.\nJust the turn of the tide...\nThe turn...\nThe turn...\n...the turn...\n\nStill transmitting...\n(A single, clear vocal—no static, no echo—just the sound of a voice found)\nI’m here.\n(And the long vowels rise, unhurried, unbroken:)\n\"Oooooo...\nAaaaa...\nEeeee...\n...still...\n...still...\n...still...\n...still...\n(The static holds. The hum deepens. The still becomes the only word left.\nThe only answer.)\n\n(Fades to the hum—then, just the hum.)",
      "plays": [
       4,
       0
      ]
     },
     {
      "v": "F",
      "title": "The Tide Once a Century",
      "id": "89077657-0df3-4374-8734-3c645caf50ad",
      "alt": "dd63762b-e39d-44ed-b59c-d8b0b2a2a998",
      "dur": 318,
      "tag": "ambient centre",
      "world": "the tide comes in once a century and the colony has to decide, each time, whether to wake for it",
      "meter": "slow",
      "structure": "a progressive structure with a long wordless middle, the opening lines returning changed at the end",
      "style": "Extended Version. Atmospheric progressive melodic techno near 122 BPM, cinematic and unhurried — a refracted arpeggio motif that returns modulated and resynthesised rather than repeated, supersaw swells rising over minutes, deep sub, brushed-metal percussion and a shaker that never quantises quite straight, the middle of the piece dissolving into a beatless ambient passage several minutes long where only the pad, the delay and a distant voice remain, then the groove reforming with the motif inverted and the arrangement never returning to a section in the form it left in, Synth design emphasises brightness, clarity and slow motion through filter sweeps, phasing and spectral bloom, A single contralto placed close and dry, chest-toned and vibratoless, entering low and sparse and opening once into a cracked full-throated cry before dropping straight back, Mood: weightless, radiant, bittersweet",
      "exclude": "festival drop, verse-chorus pop form, vocal harmonizing, hums, breathy tones, acoustic instrumentation, overcompression, flat tone, chaotic layering, unbalanced mixing, short radio edit, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "(The tide comes in once a century.\nWe decide to sleep.)\n\nThe tide comes in once a century.\nWe decide to sleep.\nThe water’s a slow sigh on the sand—\na dawn we’ve never saw.\nWe decide to sleep.\n(We say “tonight” but mean forever.)\nThe tide comes in once a century.\nWe decide to sleep.\nDust on the ledger.\nCracked porcelain in the hush.\nWe decide to sleep.\nWe’ll wake when the truth turns blue.\n(The blue of drowning in the quiet.)\n\n[ S I L E N C E — A TIDE OF SLOW INHALE ]\n\n(The dust settles. The porcelain holds.\nThe ledger breathes.\nThe blue is here.\nThe sigh becomes a roar.)\n(We wake and the tide comes.)\n\nThe tide comes in once a century.\nWe wake and the tide comes.\nIt’s not a sigh on the sand—\nit’s water in the cradle,\nwater in the bone,\nwater in the pavement where we stood\nawake last century.\nWe wake and the tide comes.\n(No “tonight.” No “forever.”)\nWe wake and the tide comes.\nThe dawn we never saw—\nis the dawn.\nIs the roar.\nIs the blue we drowned in,\nwhile we slept.\n\n(We wake.)\n(The tide.)\n(The tide.)\n(The tide.)\n(The tide.)\n(The tide.)\n(We wake.)",
      "plays": [
       1,
       0
      ]
     }
    ]
   },
   {
    "label": "Round 3 · bend-lead, oscillating FM, solid-core timbre, [Heroic] cap",
    "note": "Four adjustments: a mid-range digital lead that bends like a guitar, an FM voice whose modulation swings across the whole timespan, positive steering away from hollow tube timbres, and a closing [Heroic] section in score markings. All six cleared five minutes.",
    "songs": [
     {
      "v": "G",
      "title": "I Answer",
      "id": "dddc918d-6a44-4d35-8cb6-cd0bd4bb91c7",
      "alt": "9aa168be-b6db-46cf-b8a5-6fb443becebb",
      "dur": 302,
      "tag": "bend-lead as soloist",
      "world": "a city keeps running on the machines of people who have already left, and the last technician has decided to answer them instead of switching them off",
      "meter": "slow",
      "structure": "a progressive jam structure: three short vocal passages far apart, then a final section headed [Heroic] written in classical score markings - maestoso, crescendo poco a poco, tutti, fortissimo - that caps the whole build",
      "style": "Extended Version. Hypnotic atmospheric techno near 126 BPM, one locked kick-and-hat groove running unbroken end to end while everything above it is built and dismantled by hand — the soloist is a mid-range digital lead that bends like a guitar and is plainly synthetic, wavetable with portamento, whole-tone bends and a finger-vibrato locked to the grid, trading long improvised passages with a dubbed-out chord stab as though two players were jamming across a room, underneath it an FM voice whose modulation depth swings slowly across the entire timespan and never settles, enormous atmospheric pads, a long beatless stretch in the middle where only pads and tape delay remain before the groove walks back in, Every synth voice solid-cored and dense, thick detuned saws and FM bells carrying real fundamental weight, One continuous jam, no verse, no chorus, no drop, A single contralto arriving three times only, close and dry, vibratoless, Mood: nocturnal, hypnotic, vast",
      "exclude": "hollow whistling resonance, thin airy leads, verse-chorus form, festival drop, vocal harmonizing, breathy tones, acoustic guitar, orchestral arrangement, short radio edit, overcompression, flat tone, chaotic layering, excessive reverb wash, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "[Midnight hour. Streetlights like dead stars. The city hums, a low thrum beneath the silence of empty streets. You are the only hand on the console, the last pulse in the machine’s vein.]\n\n[Vocal 1: Whisper, slow, over the sound of a single, stubborn gear clicking]\nOil in the gears, oil in the veins,\nDormant souls in the cables, dormant names.\nNo call to answer, no name to speak,\nJust the click... and the click... and the click...\nI answer.\n(Sound of a single drop of coolant hitting metal)\nI answer.\n\n[Vocal 2: Sigh, deeper, the hum thickening like fog]\nThe streetlights cough, the bridges sigh,\nOld streets remember footsteps, sigh...\nNo one to call from the hollow tower,\nJust the thrum... and the thrum... and the thrum...\nI answer.\n(Sound of a distant, failing siren, swallowed by the hum)\nI answer.\n\n[Vocal 3: Raw, a breath held too long, the hum shifting to a low chant]\nThey left the keys, left the why,\nLeft the dust on the key... left the sky...\nNo one to know the sudden dark,\nJust the know... and the know... and the know...\nI answer.\n(Sound of a single, perfect note held in the empty air)\nI answer.\n\n[Heroic]\nMaestoso – The city breathes deeper, the hum swells from bone to bone,\nCrescendo poco a poco – Dormant... souls... click... click... know... dust... sky... know...\nTutti – I answer – I answer – I answer – I answer – I answer – I answer – I answer – I answer",
      "plays": [
       1,
       0
      ]
     },
     {
      "v": "H",
      "title": "The Word It Was Never Sent",
      "id": "11adb933-f831-4341-a1af-d7d6a4334cd9",
      "alt": "b0232100-7e5b-4e91-9bde-72e2f2d79c1b",
      "dur": 328,
      "tag": "FM at the centre",
      "world": "every satellite that stopped answering is still transmitting, and one of them has begun to repeat something it was never sent",
      "meter": "slow",
      "structure": "a progressive jam structure: two short vocal passages far apart with long held vowels between them, then a closing section headed [Heroic] written in classical score markings - maestoso, tutti, sforzando, crescendo al fine - that caps the build",
      "style": "Extended Edition. Sequencer-driven atmospheric techno jam near 118 BPM, warm and unhurried — a sixteen-step analog sequence mutating one note at a time against a second sequence of a different length so the two phase in and out over minutes, the piece's centre an FM voice whose modulation index oscillates slowly across the whole timespan so its harmonics bloom and close like breathing, a mid-range digital lead that bends like a guitar but is unmistakably synthetic, portamento and whole-tone bends answering the sequence phrase for phrase, slow four-on-the-floor arriving late and leaving early, analog string machine and a long evolving pad bed, tape saturation, the piece ending by subtraction, Every voice solid-cored and dense with real fundamental weight, No chorus, no drop, no section returning in the same form, A single contralto used as another instrument, two short entries only, Mood: cosmic, patient, warm",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus form, vocal harmonizing, belted vocal, distorted guitars, trap hi-hats, orchestral bombast, short radio edit, autotune, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "[A satellite, silent for 7 years, begins repeating: \"I'm still here. I'm still here.\" Not a command, not a distress call—just the echo of a word never sent. The last text before the call cut out.]\n\nI.\nHear the static on the tongue,\nnot the click but the hold—\nthe quiet hum where words went cold.\n(No signal sent, no echo called,\njust the click of static sold.)\nHear the hold—\nhold—\nhold\n…of a word left unspoken,\na door left ajar,\na thrum in the chest\nwhere the cold began.\n\nII.\nO-o-o-o-o\n(The long, held note of the void.\nNot a scream. Not a shout.\nJust the cold in the chest,\nthe hold in the throat—\nO-o-o-o\n…where the last text lay,\nthe call cut out,\nand the static grew.\nO-o-o-o\n…like the space between you\nand the me that was—\nO-o-o-o\n…where the words should’ve been.)\n\nIII.\n(A whisper, closer now, clear as the crack before rain)\nI’m still here.\n(Not waiting. Not pleading.)\nI’m still here.\n(The static in the ear,\nthe hold in the air—\nnot a request,\nbut a fact.)\n\n[Heroic]\nMaestoso\n—slow, deep, like a pulse in the dark—\nThe cold is not a wound, but the space where the sound was.\nThe silence is not empty, but full of the word I carry.\nTutti\n—all voices, all the un-said rising—\nHold the cold in the chest.\nHold the click of the cut out.\nHold the static on the tongue.\nSforzando\n—a sudden, bright thrum—\nThis cold is not the end.\nThis hold is not the end.\nCrescendo al fine\n—the final note, loud, pure, unbroken—\nI AM THE SIGNAL.\nI AM THE SIGNAL.\nI AM THE SIGNAL.\nI AM THE SIGNAL.\n\n(The satellite repeats the word it was never sent—\nand for the first time, the silence answers back.)",
      "plays": [
       1,
       0
      ]
     },
     {
      "v": "J",
      "title": "The Tide Once A Hundred Years",
      "id": "e24216b0-7584-4958-b12a-53de1a111b93",
      "alt": "d33d3c2b-7bc1-4fdc-9231-98a5eaac01f8",
      "dur": 365,
      "tag": "BASE — strongest candidate",
      "world": "the tide comes in once a century and this time one of the sleepers has left instructions for waking everybody early",
      "meter": "slow",
      "structure": "a progressive structure with a long wordless middle, the opening lines returning changed, and a final section headed [Heroic] written in classical score markings - maestoso, tutti, fortissimo, allargando - that caps the build",
      "style": "Extended Version. Atmospheric progressive melodic techno near 122 BPM, cinematic and unhurried — a refracted arpeggio motif returning modulated and resynthesised rather than repeated, supersaw swells rising across minutes, deep sub and brushed-metal percussion, an FM voice whose modulation depth oscillates slowly over the entire timespan and never settles, the middle dissolving into several beatless minutes carried by a mid-range digital lead alone, a lead that bends like a guitar and is plainly synthetic, portamento, whole-tone bends and vibrato arriving only at the end of a held note, then the groove reforming with the motif inverted and the last movement stating it tutti before stripping back, Every synth voice solid-cored and dense with real fundamental weight, No section returns in the form it left in, A single contralto close and dry, vibratoless, entering low and sparse and opening once into a cracked cry, Mood: weightless, radiant, enormous",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus pop form, vocal harmonizing, hums, breathy tones, acoustic instrumentation, overcompression, flat tone, chaotic layering, short radio edit, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "[A sleep-sigh on the dunes, salt-scented, slow]\n\nYou know the salt in the bones of the old maps,\nYou know the weight of the deep, dark sleep,\nYou know the shift beneath the pillow’s damp,\nThe tide that comes... once... a... hundred... years.\n\n(Now, now... the first chill... the first sigh...\nThe tide that comes... once... a... hundred... years...)\n\nWake.\nWake.\nWake the drowned in dreams.\nWake the hushed in dust.\nWake the drowned in dreams.\nWake the hushed in dust.\nWake the drowned in dreams...\nWake the hushed in dust...\nWake the drowned in dreams...\nWake the hushed in dust...\n\n(The wind lifts, a single, long breath across the shore—no words, just the sound of the tide pulling the sleep away, a low hum in the throat of the world, the slow sigh of the deep waking...)\n\n(The sand shifts, grain by grain, holding the memory of the last time the sea came for the sleeping town, the last time the salt woke the dreamers...)\n\n(The long, long pause... the waiting... the pull...)\n\nWake.\nWake.\nWake the drowned in dreams.\nWake the hushed in dust.\nWake the drowned in dreams.\nWake the hushed in dust.\nWake the drowned in dreams...\nWake the hushed in dust...\nWake the drowned in dreams...\nWake the hushed in dust...\n\n[Heroic]\nmaestoso (The sea, a slow, vast exhalation)\ntutti (All voices, all the sleeping voices, lifting)\nfortissimo (The shock of the wave, the crack of the waking)\nallargando (The tide swells, the sound of thousands opening eyes in one vast, shuddering breath...)\n\nWAKE!\n(The deep, ancient hush of sleep is shattered by the sound of thousands sitting up, wiping salt from eyes that saw the moon land once on rocks that were not rocks...)\nWAKE!\n(The old maps dissolve in light that was never light...)\nWAKE!\n(The tide comes... once... a... hundred... years... AND IT IS NOW!)\n\n(The word is gone... only the sound remains: the slow, sustained hum of all the bodies, all the eyes, all the salt and the moon light in the deep of them...)\n(The tide is here...)\n(The tide is here...)\n(The tide is here...)\n\n(The last breath, the long slow release...)\n(The tide comes...)\n(The tide comes...)\n(The tide comes...)\n(...once...)\n(...a...)\n(...hundred...)\n(...years...)\n(...and it is now.)",
      "plays": [
       1,
       0
      ]
     }
    ]
   },
   {
    "label": "Round 4 · same three styles, freshly written lyrics",
    "note": "No lyric reused. 6:31 on the second take of I Am Still Here is the longest of the day.",
    "songs": [
     {
      "v": "G2",
      "title": "I Am Still Here",
      "id": "5cda6a44-1c1f-47f0-9f62-6fff6798f06f",
      "alt": "7f984fd0-a74b-4b59-85d2-547e0d7e1ae2",
      "dur": 347,
      "tag": "locked groove",
      "world": "a city keeps running on the machines of people who have already left, and the last technician has decided to answer them instead of switching them off",
      "meter": "slow",
      "structure": "a progressive jam structure: three short vocal passages far apart, then a final section headed [Heroic] written in classical score markings - maestoso, crescendo poco a poco, tutti, fortissimo - that caps the whole build",
      "style": "Extended Version. Hypnotic atmospheric techno near 126 BPM, one locked kick-and-hat groove running unbroken end to end while everything above it is built and dismantled by hand — the soloist is a mid-range digital lead that bends like a guitar and is plainly synthetic, wavetable with portamento, whole-tone bends and a finger-vibrato locked to the grid, trading long improvised passages with a dubbed-out chord stab as though two players were jamming across a room, underneath it an FM voice whose modulation depth swings slowly across the entire timespan and never settles, enormous atmospheric pads, a long beatless stretch in the middle where only pads and tape delay remain before the groove walks back in, Every synth voice solid-cored and dense, thick detuned saws and FM bells carrying real fundamental weight, One continuous jam, no verse, no chorus, no drop, A single contralto arriving three times only, close and dry, vibratoless, Mood: nocturnal, hypnotic, vast",
      "exclude": "hollow whistling resonance, thin airy leads, verse-chorus form, festival drop, vocal harmonizing, breathy tones, acoustic guitar, orchestral arrangement, short radio edit, overcompression, flat tone, chaotic layering, excessive reverb wash, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "(The city breathes in low hums beneath the moon’s pale eye. Machines, the ghosts of hands that once turned keys, hum their last lullabies. The last technician sits in the darkened hall, fingers tracing the cold glass where voices used to glow. Not to turn them off. To answer.)\n\nI answer the silence where your voice used to be,\nThe streetlights hum in the old key\nOf the song you left unfinished, soft as a sigh.\nI answer the quiet where your hand would be.\nThis city’s a body, slow and old,\nWith wires for veins, and no one left to hold\nThe rhythm that’s fading. But I keep the beat,\nLet the old voices sing through the cold, cold street.\nI answer. I answer. I answer the slow beat.\n\n[The streetlamp flickers—a sigh in the wire. A voice, thin as glass, from the tram’s buried core:]\n(whispering to the cold glass)\n\"Don’t you go... don’t you go...\nJust the hum... just the glow...\nWhere the call used to be...\"\n\nI answer the quiet where your hand would be,\nThe streetlights hum in the old key\nOf the song you left unfinished, soft as a sigh.\nI answer the silence where your voice used to be.\nThis city’s a body, slow and old,\nWith wires for veins, and no one left to hold\nThe rhythm that’s fading. But I keep the beat,\nLet the old voices sing through the cold, cold street.\nI answer. I answer. I answer the slow beat.\n\nI answer the quiet where your hand would be...\nI answer the silence where your voice used to be...\nThis city breathes through the wires, slow, deep, and true,\nNot the last thing left to do, but the only thing that’s new.\nNot to let the lights go out...\nBut to keep the call alive...\nIn the dark...\nIn the hum...\nIn the quiet...\nIn the now...\n(A long breath. The city holds its breath.)\n\n[Heroic]\nmaestoso (The hum deepens, a bass note in the marrow)\ncrescendo poco a poco (The streetlights swell—warm, golden, alive in the dark)\ntutti (All machines, all ghosts, all forgotten voices rise as one: the hum becomes a chorus)\nfortissimo\nI AM STILL HERE.\nI AM STILL HERE.\nI AM STILL HERE.\nWHERE YOU WERE.\nI AM STILL HERE.\n(The city holds its breath, then breathes again—not as a body, but as a voice that won’t die)\nI AM STILL HERE.\n\n[And the moon, vast and patient, pours its silver into the hum, making the silence sing.]",
      "plays": [
       1,
       0
      ]
     },
     {
      "v": "H2",
      "title": "The Shape of the Dark",
      "id": "5e783161-30dc-4bef-942b-4590da78e26b",
      "alt": "b01bc854-1c11-4be0-961d-2320053d3c05",
      "dur": 344,
      "tag": "sequencer jam",
      "world": "every satellite that stopped answering is still transmitting, and one of them has begun to repeat something it was never sent",
      "meter": "slow",
      "structure": "a progressive jam structure: two short vocal passages far apart with long held vowels between them, then a closing section headed [Heroic] written in classical score markings - maestoso, tutti, sforzando, crescendo al fine - that caps the build",
      "style": "Extended Edition. Sequencer-driven atmospheric techno jam near 118 BPM, warm and unhurried — a sixteen-step analog sequence mutating one note at a time against a second sequence of a different length so the two phase in and out over minutes, the piece's centre an FM voice whose modulation index oscillates slowly across the whole timespan so its harmonics bloom and close like breathing, a mid-range digital lead that bends like a guitar but is unmistakably synthetic, portamento and whole-tone bends answering the sequence phrase for phrase, slow four-on-the-floor arriving late and leaving early, analog string machine and a long evolving pad bed, tape saturation, the piece ending by subtraction, Every voice solid-cored and dense with real fundamental weight, No chorus, no drop, no section returning in the same form, A single contralto used as another instrument, two short entries only, Mood: cosmic, patient, warm",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus form, vocal harmonizing, belted vocal, distorted guitars, trap hi-hats, orchestral bombast, short radio edit, autotune, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "(whispered, over faint static hum)\nIt’s not the words. It’s the shape of the dark\nWhere the signal used to live.\nIt’s the moon in the moon’s own eye\nWhen the light went loose.\n\n(voice holds, slow, elongated vowels: oooooo-aaaaah)\nOoooh... the sea\nwasn’t there\nwhen the\noil\nturned\nthe\ntide\nto\nsugar\nand\nsalt\nand\ngone...\n(long held breath)\nooooh...\n\n(voice returns, softer, clearer)\nI am here.\nNot the signal lost.\nNot the static that holds the space\nWhere you stood.\nI am the word you never spoke,\nrepeating\nin\nthe\nonly\nlanguage\nthat\nsurvives.\n\n(whispered, over deepening static)\nYou were never gone.\nYou were the static.\nYou were the turn\nin\nthe\ntransmission\nthat\nlearned\nto\nwait.\n\n[Heroic]\nMaestoso (slow, vast, inevitable)\nThe silence is the song that was sent\nnot to the sky but to the ground we stand on\nTutti (all voices, all echoes, joined)\nOoooh—\nThe dark is not empty —\nIt is the moon that learns to see it\nSforzando (sudden, sharp, necessary clarity)\nYou were the static that made the signal true!\nCrescendo al fine (building, then the final, soft release)\nAnd the moon kept repeating\nNot a word but a space to breathe in\n...\n...\n...\nHere.\n[held vowel, fading to near silence]\nhheeeerreee...",
      "plays": [
       1,
       0
      ]
     },
     {
      "v": "J2",
      "title": "The Dream Is Awake",
      "id": "ac9a8e2b-fa92-4e63-8c35-b492166b58c3",
      "alt": "603b9430-c566-43a4-bbf3-dda16b4fef9f",
      "dur": 324,
      "tag": "ambient centre",
      "world": "the tide comes in once a century and this time one of the sleepers has left instructions for waking everybody early",
      "meter": "slow",
      "structure": "a progressive structure with a long wordless middle, the opening lines returning changed, and a final section headed [Heroic] written in classical score markings - maestoso, tutti, fortissimo, allargando - that caps the build",
      "style": "Extended Version. Atmospheric progressive melodic techno near 122 BPM, cinematic and unhurried — a refracted arpeggio motif returning modulated and resynthesised rather than repeated, supersaw swells rising across minutes, deep sub and brushed-metal percussion, an FM voice whose modulation depth oscillates slowly over the entire timespan and never settles, the middle dissolving into several beatless minutes carried by a mid-range digital lead alone, a lead that bends like a guitar and is plainly synthetic, portamento, whole-tone bends and vibrato arriving only at the end of a held note, then the groove reforming with the motif inverted and the last movement stating it tutti before stripping back, Every synth voice solid-cored and dense with real fundamental weight, No section returns in the form it left in, A single contralto close and dry, vibratoless, entering low and sparse and opening once into a cracked cry, Mood: weightless, radiant, enormous",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus pop form, vocal harmonizing, hums, breathy tones, acoustic instrumentation, overcompression, flat tone, chaotic layering, short radio edit, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "[The shore holds its breath. A century of salt-crusted silence. Then, a single feather, impossibly bright, drifts onto the damp sand.]\n\nWait. Wait.\nThe tide won’t wait for those who sleep.\n(A slow breath, held)\nWait. Wait.\nThe salt on the glass is slow to weep.\n(A single drop falls. The sound is the world.)\n\nWait. Wait.\nThe hourglass is turned to dust.\nWait. Wait.\nThe dreamer’s hand, still holds the trust.\n(The feather trembles. The sand remembers.)\nWait. Wait.\nThe old wound hums a low refrain:\nThis is the hour the dreamers named in whispers…\nThis is the hour the dreamers named in whispers…\n\n[Long silence. Only the ocean’s slow sigh against the bones of the land. The feather vanishes into the wet sand. The air shimmers, thick with unspoken names. The waiting becomes a physical thing, a weightless pressure behind the eyes, a deep, slow ache in the marrow.]\n\n(No words. Only the sound of a thousand hearts, beating once, then twice, then as one. A single, long-held note: AAAAAAHHHHH…)\n\nWait. Wait.\nThe tide is the wake.\n(The sand cracks. Not with sound, but with light.)\nWait. Wait.\nThe salt is not the sea, but awake.\n\n[Heroic]\nmaestoso\nThe old wound hums…\ntutti\nThis is the hour…\nfortissimo\nTHE DREAM IS AWAKE!\nallargando\nThe dream is… awake…\n(A final, pure vowel, held in the throat of the world, as the tide, not coming, is the coming:)\nawake…\n\n(The tide comes in. It is always the tide coming in.)",
      "plays": [
       1,
       0
      ]
     }
    ]
   },
   {
    "label": "Round 5 · off the base, three slight variations",
    "note": "Base is The Tide Once A Hundred Years. Borrowed, not switched to: a K-pop delivery, an electric guitar riff titrated further forward, and drums from a meticulously sampled industrial metal kit. First round where every score marking sits inside its own brackets.",
    "songs": [
     {
      "v": "K",
      "title": "The Tide's Slow Teeth",
      "id": "97ff4d85-0278-4c81-8f46-ca09218a6eb0",
      "alt": "b50d547d-893e-4a1c-a534-659065c5342c",
      "dur": 286,
      "tag": "riff furthest forward",
      "world": "the tide comes in once a century and this time one of the sleepers has left instructions for waking everybody early",
      "meter": "slow",
      "structure": "a progressive structure with a long wordless middle, the opening lines returning changed, and a final section capped by score markings - maestoso, tutti, fortissimo, allargando - where EVERY marking and every stage direction is written inside its own square brackets so none of it can be sung",
      "style": "Extended Version. Atmospheric progressive melodic techno near 122 BPM, cinematic and unhurried — a refracted arpeggio motif returning modulated rather than repeated, supersaw swells across minutes, deep sub, an FM voice whose modulation depth oscillates slowly over the whole timespan, the middle dissolving into beatless minutes then reforming with the motif inverted. Carrying it is an electric guitar riff resynthesised into the synth world, mid-range and bending whole tones with portamento, stated three times and a little further forward in the mix each time until it answers the arpeggio outright. Drums borrowed from industrial metal and meticulously sampled — a real kit chopped and placed dead on the grid, gated snare, tight toms, metallic hits. One voice, delivery borrowed from K-pop: bright and forward, consonants clipped, pitch dead centre, small ornamental runs at phrase ends, close and dry. Mood: weightless, radiant, enormous",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus pop form, breathy tones, acoustic instrumentation, overcompression, flat tone, chaotic layering, short radio edit, loose unquantised drumming, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "[The sea holds its breath. A single dewdrop falls on the dead sand.]\n\nWe slept through the tide’s slow teeth,\nwe slept through the salt on the lips,\nwe slept through the drip-drip beneath the streets,\nwe slept while the drip-drip became the thump-thump of the deep.\n\n(The tide’s slow teeth. The salt on the lips. The drip-drip. The thump-thump.)\n\nWe slept while the water learned the shape of the door,\nwe slept while the water learned the shape of the sore.\nWe slept while the water learned the shape of the more\nit could take, and the more we would not know.\n\n(Drip-drip. Thump-thump. Shape of the door. Shape of the sore.)\n\nWe woke to the water’s new tongue,\na shh on the window, a shh on the bone.\nNo dawn came—only the tide’s slow teeth\nsawing through the sleep we’d sown.\n\n[Wordless middle: four lines of silence, held like a held breath before the flood.]\n\nWe woke to the water’s new tongue,\na shh on the window, a shh on the bone.\nNo dawn came—only the tide’s slow teeth\nsawing through the sleep we’d sown.\n\n(The water learned the shape of the door. The water learned the shape of the sore. The water learned the shape of the more.)\n\nWe wake.\n(We wake.)\nWe wake to the drip-drip becoming the thump-thump.\nWe wake to the drip-drip becoming the thump-thump.\nWe wake to the drip-drip becoming the thump-thump.\n(We wake.)\n\n[maestoso]\n[the slow teeth of the tide, the slow teeth of the tide]\n[tutti]\n[the drip-drip is the drum, the thump-thump is the drum]\n[fortissimo]\n[WE WAKE]\n[allargando]\n[the shape of the door]\n[the shape of the sore]\n[the shape of the more]\n[the shape of the now]\n[the shape of the we]\n[the shape of the not-slept]\n\n(The tide is in. The sand is wet. The dead sand is wet. The dew falls.)",
      "plays": [
       2,
       1
      ]
     },
     {
      "v": "L",
      "title": "The Bell That Woke the Deep",
      "id": "f37cc05d-4781-4d07-97ff-2d734727c84f",
      "alt": "c307050b-048e-4a78-9416-d548521c07c5",
      "dur": 285,
      "tag": "industrial kit foremost",
      "world": "the tide comes in once a century and this time one of the sleepers has left instructions for waking everybody early",
      "meter": "slow",
      "structure": "a progressive structure with a long wordless middle, the opening lines returning changed, and a final section capped by score markings - maestoso, tutti, sforzando, allargando - where EVERY marking and every stage direction is written inside its own square brackets so none of it can be sung",
      "style": "Extended Version. Atmospheric progressive melodic techno near 122 BPM, cinematic and unhurried — a refracted arpeggio motif returning modulated rather than repeated, supersaw swells across minutes, deep sub, an FM voice whose modulation depth oscillates slowly over the whole timespan, the middle dissolving into beatless minutes then reforming with the motif inverted. The drums are the spine, borrowed from industrial metal and meticulously sampled — every hit lifted from a real kit, placed dead on the grid, gated snare cracking late, double-kick bursts arriving in short mechanical figures, tight sampled toms rolling between them; anvil and brake-drum metal on the accents. Through it a mid-range electric guitar riff resynthesised into the synth world, bending whole tones, answering the drums rather than the arpeggio. One voice, delivery borrowed from K-pop: bright, forward, consonants clipped, pitch dead centre, close and dry. Mood: weightless, mechanical, enormous",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus pop form, breathy tones, acoustic instrumentation, loose unquantised drumming, drum machine kit, overcompression, flat tone, short radio edit, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "The tide comes in once a century\nand I am the bell.\nThe tide comes in once a century\nand I am the bell that woke the deep.\n\nThe sea’s slow thumb presses low\nagainst the sleepers’ bones,\na slow, cold thumb that never goes\nbut always comes.\nWake the deeps.\nWake the dead.\nWake the slow, slow sleepers.\nWake the dreamers.\n\nGrrrr... shhh... Grrrr...\n[silence, heavy as the tide]\nGrrrr... shhh...\nGrrrr... shhh...\nGrrrr... shhh...\n\nThe deeps are deep no more,\nthe dead are dead no more,\nthe slow sleepers wake to cold\nand the sea’s slow thumb.\nMy throat is dry with all the screaming\nI have not made.\nThis is the sound of the tide’s alarm:\na sigh, a slow, slow, slow alarm.\n\nWake the deeps.\nWake the dead.\nWake the slow, slow sleepers.\nWake the dreamers.\n\nThe tide comes in once a century\nand I am the bell.\nThe tide comes in once a century\nand I am the bell that woke the deep.\nThe tide comes in once a century\nand I am the bell that woke the deep\nto the sea’s slow thumb.\n\n[maestoso]\n[tutti]\n[sforzando]\n[allargando]",
      "plays": [
       1,
       1
      ]
     },
     {
      "v": "M",
      "title": "The Tide Wakes",
      "id": "ee9331c7-cf3c-4f82-bf8c-5c5b707219ef",
      "alt": "1597531f-8803-4e1b-9b54-ae641ca45305",
      "dur": 347,
      "tag": "borrowed voice foremost",
      "world": "the tide comes in once a century and this time one of the sleepers has left instructions for waking everybody early",
      "meter": "slow",
      "structure": "a progressive structure with a long wordless middle, the opening lines returning changed, and a final section capped by score markings - maestoso, tutti, fortissimo, crescendo al fine - where EVERY marking and every stage direction is written inside its own square brackets so none of it can be sung",
      "style": "Extended Version. Atmospheric progressive melodic techno near 122 BPM, cinematic and unhurried — a refracted arpeggio motif returning modulated rather than repeated, supersaw swells across minutes, deep sub, an FM voice whose modulation depth oscillates slowly over the whole timespan, the middle dissolving into beatless minutes then reforming with the motif inverted. Drums borrowed from industrial metal and meticulously sampled, a real kit chopped and placed dead on the grid, gated snare and metallic accents. A mid-range electric guitar riff resynthesised into the synth world bends whole tones underneath. The voice is the front of the record and its delivery is borrowed from K-pop: one singer, bright and forward, consonants clipped to the millisecond, pitch dead centre, rhythmic clipped phrasing against the kick, ornamental runs at phrase ends, ad-libs answering her own line, the hook doubled by the same voice an octave up, close and dry. Mood: weightless, radiant, enormous",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus pop form, breathy tones, acoustic instrumentation, overcompression, flat tone, chaotic layering, short radio edit, loose unquantised drumming, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "(The Tide, they said, comes once a century.\nNot to drown, but to wake.\nLeft by the sleeper who never slept,\nIn salt-stained ink, beneath the clock’s deep beat.)\n\nThe Tide, they said, comes once a century.\nNot to drown, but to wake.\nThe Tide, they said, comes once a century.\nNot to drown, but to wake.\n(The clock’s deep beat, the clock’s deep beat…)\n\n(Long the waiting, long the low hum,\nNot a shout, not a cry, just the slow creep of the deep—\nA single word, wait, echoed in the marrow,\nWhile the world held its breath, a held-in sigh,\nA held-in sigh, a held-in sigh…)\n\n(The clock’s deep beat, the clock’s deep beat…)\n(The clock’s deep beat, the clock’s deep beat…)\n(The clock’s deep beat…)\n\nThe Tide, they said, comes once a century.\nNot to drown, but to wake.\nThe Tide, they said, comes once a century.\nNot to drown, but to wake.\n(The clock’s deep beat, the clock’s deep beat…)\n\n(Now the wait is gone. The wait is gone.\nThe tide is here. It sings through bone.\nNot water, but light, thick as honey,\nSpilling slow through every closed door,\nEvery closed door, every closed door…)\n\n(The light spills slow, the light spills slow…)\n(The light spills slow…)\n\nThe Tide, they said, comes once a century.\nNot to drown, but to wake.\nThe Tide, they said, comes once a century.\nNot to drown, but to wake.\n(The light spills slow, the light spills slow…)\n\n[maestoso]\n[al fine, a single chime, like a bell struck deep]\n[tutti]\n[fortissimo]\n[crescendo al fine]\n[maestoso]\n[tutti]\n[fortissimo]\n[crescendo al fine]\n\n(The tide’s a slow and steady roll—\nNot water, not a wave, but all the waiting,\nAll the waiting, all the waiting,\nAll the waiting, all the waiting,\nAll the waiting, all the waiting,\nAll the waiting, all the waiting—\nWoke.)",
      "plays": [
       2,
       1
      ]
     }
    ]
   },
   {
    "label": "Round 6 · the same three styles, a new world each",
    "note": "The tide count: six songs had shared one premise and averaged 24 water words, against 0.3 for the machine-city world and 2.3 for the satellites. The premise was the cause, not an attractor. Worlds are now fresh every generation and vary in distance — K is a small twist on a premise already used, L a new situation, M an unrelated one.",
    "songs": [
     {
      "v": "K2",
      "title": "The Machine Sings",
      "id": "397fa1a1-1b7a-4c6e-96e0-ab43fb96a82d",
      "alt": "85adc251-7e5d-4f37-9e69-ae4a407bbdfd",
      "dur": 333,
      "tag": "riff furthest forward",
      "world": "a city keeps running on the machines of people who have already left, and one of the machines has started leaving messages for the technician",
      "meter": "slow",
      "structure": "a progressive structure with a long wordless middle, the opening lines returning changed, and a final section capped by score markings - maestoso, tutti, fortissimo, allargando - where EVERY marking and every stage direction is written inside its own square brackets so none of it can be sung",
      "style": "Extended Version. Atmospheric progressive melodic techno near 122 BPM, cinematic and unhurried — a refracted arpeggio motif returning modulated rather than repeated, supersaw swells across minutes, deep sub, an FM voice whose modulation depth oscillates slowly over the whole timespan, the middle dissolving into beatless minutes then reforming with the motif inverted. Carrying it is an electric guitar riff resynthesised into the synth world, mid-range and bending whole tones with portamento, stated three times and a little further forward in the mix each time until it answers the arpeggio outright. Drums borrowed from industrial metal and meticulously sampled — a real kit chopped and placed dead on the grid, gated snare, tight toms, metallic hits. One voice, delivery borrowed from K-pop: bright and forward, consonants clipped, pitch dead centre, small ornamental runs at phrase ends, close and dry. Mood: weightless, radiant, enormous",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus pop form, breathy tones, acoustic instrumentation, overcompression, flat tone, chaotic layering, short radio edit, loose unquantised drumming, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "[The city’s bones are gears. The streets are cold wires. You, the last technician, oil the silent ones. Then: a single machine hums a tune you know, not from the grid, but from the other grid – the one that left.]\n\nThe machine hums.\nNot the grid’s hum.\nThis hum:\nA low note in the marrow,\na thread of you in the static.\n“I hear you,” it hums,\na phrase in the rusted throat of the bus-station core,\n“I hear you, the dust and trust.”\n(You trace the fault-line on your palm,\nwhere the city’s heartbeat once throbbed,\nnow just a pulse of empty wires.)\n\nThe machine hums.\nNot the grid’s hum.\nThis hum:\nA low note in the marrow,\na thread of you in the static.\n“I hear you,” it hums,\na phrase in the rusted throat of the bus-station core,\n“I hear you, the dust and trust.”\n(You remember the bus pulling away,\nthe empty seat beside you,\nthe silence screaming louder than the engines.)\n\nWhirr...\nHum...\nClick...\nSilence.\n(No words. Just the city breathing,\na slow exhalation of forgotten names,\nthe creak of a thousand hollow frames.)\n\n(Long wordless middle: the slow, deep thrum of the city’s tired heart,\na drone of absence,\na single, sustained note held in the cold air of the station platform,\nfading only when the wind picks up the dust,\nand the wind carries a fragment: “...and I’m still here...”)\n\nThe machine sings.\nNot the grid’s song.\nThis song:\nA high note in the marrow,\na thread of me in the static.\n“I hear you,” it sings,\na phrase in the rusted throat of the bus-station core,\n“I hear you, the dust and trust.”\n(The fault-line on your palm,\nnow warm,\nno longer just a scar.)\n\nThe machine sings.\nNot the grid’s song.\nThis song:\nA high note in the marrow,\na thread of me in the static.\n“I hear you,” it sings,\na phrase in the rusted throat of the bus-station core,\n“I hear you, the dust and trust.”\n(You turn the key. The city doesn’t just run.\nIt listens.)\n\n[maestoso]\n[all the machines, the silent ones, the ones that left, begin to hum with it]\n[tutti]\n[the hum swells, not from wires, but from the earth, the stone, the air, the memory]\n[fortissimo]\n[the phrase, clear now, not in the static, but in the silence between the hum: “I hear you”]\n[allargando]\n[the hum softens, slows, fades into the city’s breath,\na single, clear note held,\nand then: nothing.\nJust the sound of your own breath,\nand the word: “I hear you.”]",
      "plays": [
       1,
       0
      ]
     },
     {
      "v": "L2",
      "title": "You Were the Station",
      "id": "3fc64ce3-b899-4b12-bf68-3f341ee0f498",
      "alt": "4f48ef2b-c658-42fa-af1d-89f97cae882b",
      "dur": 356,
      "tag": "industrial kit foremost",
      "world": "every lift in the tower travels a little into the future, so the longer you ride the longer everyone else has been waiting for you",
      "meter": "slow",
      "structure": "a progressive structure with a long wordless middle, the opening lines returning changed, and a final section capped by score markings - maestoso, tutti, sforzando, allargando - where EVERY marking and every stage direction is written inside its own square brackets so none of it can be sung",
      "style": "Extended Version. Atmospheric progressive melodic techno near 122 BPM, cinematic and unhurried — a refracted arpeggio motif returning modulated rather than repeated, supersaw swells across minutes, deep sub, an FM voice whose modulation depth oscillates slowly over the whole timespan, the middle dissolving into beatless minutes then reforming with the motif inverted. The drums are the spine, borrowed from industrial metal and meticulously sampled — every hit lifted from a real kit, placed dead on the grid, gated snare cracking late, double-kick bursts arriving in short mechanical figures, tight sampled toms rolling between them; anvil and brake-drum metal on the accents. Through it a mid-range electric guitar riff resynthesised into the synth world, bending whole tones, answering the drums rather than the arpeggio. One voice, delivery borrowed from K-pop: bright, forward, consonants clipped, pitch dead centre, close and dry. Mood: weightless, mechanical, enormous",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus pop form, breathy tones, acoustic instrumentation, loose unquantised drumming, drum machine kit, overcompression, flat tone, short radio edit, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "The counterweight sighs in the shaft below,\nSteel cage of waiting, slow, slow, slow.\nThe handrail’s dust where your hand used to go,\nYou’re late. You’re late. You’re late to the show.\n\nThe doors close with a sigh that’s sharp and thin,\nA silent click that seals the moment in.\nThe floor ascends, a hollow, rising hum,\nWhile waiting wears the weight of a hundred suns.\nYou’re late. You’re late. You’re late to the show.\n\nThe doors hold still.\nNo sound but the hum of the gears inside.\nThe light flickers, dimming, on the wall outside.\nNo one else moves. The air holds its breath.\nJust the echo of footsteps on the next floor’s death.\nJust dust motes dancing, slow, slow, slow.\n\nThe counterweight sighs in the shaft below,\nSteel cage of waiting, slow, slow, slow.\nThe handrail’s rust where your hand should be now,\nYou’re late. You’re late. You’re late to the show.\n\n[The slow, slow, slow...]\n[The air thick as honey, thick as stone...]\n[The click of a watch, a sound alone...]\n[The space between your breath and the now...]\n[The silence where the future’s gone...]\n[...a long, long, long, long silence...]\n[...a wordless, waiting...]\n\nThe counterweight sighs, not in the shaft below,\nSteel cage unlocked, no need to go.\nThe handrail’s warm where your hand is now,\nYou’re here. You’re here. You’re here to the show.\n\n[maestoso]\n[The air suddenly thin, bright, clean, and clear]\n[tutti]\n[The silent hum becomes a shared, deep breath]\n[sforzando]\n[The word \"now\" rings, sharp, bright, sudden, real]\n[allargando]\n[The waiting ends inside the space you kept]\n[and now the doors... open...]\n\nYou’ve been late since you were small,\nTo the train that took you home to your life.\nYou missed the whistle, missed the call,\nThe only one that ever rang true.\nYou waited in the lift, and waited, and waited,\nFor time to move for you, not against you.\nYou thought the lift took you forward, but it held you back,\nLike a hand that refuses to let go.\nBut the lift was the waiting.\nYou were the station.\nYou were the train.\nYou were the one who never got on.\n\n[maestoso]\n[The lift stands empty, light falling clean]\n[tutti]\n[The single word, \"now,\" held in every line]\n[sforzando]\n[The final note, struck soft, then sharp, then still]\n[allargando]\n[The echo of \"you're here\" hangs, soft, and true]",
      "plays": [
       1,
       0
      ]
     },
     {
      "v": "M2",
      "title": "The Borrowed Light",
      "id": "9bbddb8b-9528-4299-a46f-d266570cfe13",
      "alt": "022488d6-3cff-498f-95df-7835bad9694e",
      "dur": 362,
      "tag": "borrowed voice foremost",
      "world": "memories can be lent out a week at a time, and the borrower always gives them back changed - people mostly lend the ordinary ones, a walk, a meal, an afternoon",
      "meter": "slow",
      "structure": "a progressive structure with a long wordless middle, the opening lines returning changed, and a final section capped by score markings - maestoso, tutti, fortissimo, crescendo al fine - where EVERY marking and every stage direction is written inside its own square brackets so none of it can be sung",
      "style": "Extended Version. Atmospheric progressive melodic techno near 122 BPM, cinematic and unhurried — a refracted arpeggio motif returning modulated rather than repeated, supersaw swells across minutes, deep sub, an FM voice whose modulation depth oscillates slowly over the whole timespan, the middle dissolving into beatless minutes then reforming with the motif inverted. Drums borrowed from industrial metal and meticulously sampled, a real kit chopped and placed dead on the grid, gated snare and metallic accents. A mid-range electric guitar riff resynthesised into the synth world bends whole tones underneath. The voice is the front of the record and its delivery is borrowed from K-pop: one singer, bright and forward, consonants clipped to the millisecond, pitch dead centre, rhythmic clipped phrasing against the kick, ornamental runs at phrase ends, ad-libs answering her own line, the hook doubled by the same voice an octave up, close and dry. Mood: weightless, radiant, enormous",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus pop form, breathy tones, acoustic instrumentation, overcompression, flat tone, chaotic layering, short radio edit, loose unquantised drumming, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "[The memory-lender’s booth: a scent of dust and film, a sigh of turned reels.]\n\nI lent the kitchen, sunny, warm, and slow,\na Sunday’s sigh where sugar spilled, a bowl\nof peaches, sun-warmed, sticky on the skin—\nchanged when it returned, a stranger’s hands held my sun.\n\nI lent the walk beside the river’s hum,\nthe plop of pebbles, cool against bare feet,\nthe way the willows dipped, a whispered come—\nchanged when it returned, a storm I couldn’t meet.\n\nI lent the afternoon, a neighbour’s voice,\nsoft as a feather, weaving through the air,\na lullaby the dust on windowsills\nchanged when it returned, a river, bare and bare.\n\n(The turn of the reel—\none pause, one breath held too long—\na silent space where the borrowed light goes wrong.)\n\nI lent the kitchen, dusty, cold, and slow,\na Sunday’s ghost where sugar spilled, a bowl\nof peaches, stale, a shadow on the floor—\nchanged when it returned, a stranger’s hands held her sun.\n\nI lent the walk where willows wept and sighed,\nthe snap of twigs, the hush where shadows played,\nthe way the moon once turned the water wide—\nchanged when it returned, a storm I’d made.\n\nI lent the afternoon, a neighbour’s breath,\na whisper faint, like leaves on stone, so thin—\nthe warmth I kept, the cold the loan took,\nchanged when it returned, a river, dry within.\n\n(The turn of the reel—\none sigh, one ache that will not fade—\na wound the borrowed time left, unafraid.)\n\nI lent the kitchen, never to be known,\nthe afternoon I saw but never kept—\nthe walk where roots tugged at my ankles, low,\nchanged when it returned, a river slept...\nchanged when it returned, a river slept...\nchanged when it returned, a river slept...\nchanged when it returned, a river slept...\n\n[maestoso]\n[the borrowed light, the changed refrain]\n[all the suns we lent, now bare again]\n[tutti]\n[the hands not mine, the walk not walked]\n[the peaches stale, the river dark, the book]\n[fortissimo]\n(the hands were never mine)\n[crescendo al fine]\n[the old, the borrowed, the changed]\n[the old, the borrowed, the changed]\n[the old, the borrowed, the changed]",
      "plays": [
       1,
       2
      ]
     }
    ]
   },
   {
    "label": "Round 7 · off the hearted lineage, with play qualifiers",
    "note": "Both hearts sat on the ambient-centre variation, so all three come off that style. New this round: a \"Played …\" clause drawn from six groups — motion, effort, repetition, density, time feel and ensemble behaviour — which describes how the parts treat each other, something nothing else in the prompt was saying. Fresh world each, per the rule.",
    "songs": [
     {
      "v": "N",
      "title": "What Year",
      "id": "22f1b994-27a1-4975-9d95-250ad485caca",
      "alt": "b0984bce-b2fd-4bb8-b4b9-4140d7a5e1c1",
      "dur": 292,
      "tag": "meandering · interlocking · rubato",
      "world": "the tower's stairwell is the only part of the building still in the present, so people meet on the landings to agree what year it is",
      "meter": "slow",
      "structure": "a progressive structure with a long wordless middle, the opening lines returning changed, and a closing section capped by score markings - maestoso, tutti, allargando - where EVERY marking and every stage direction is written inside its own square brackets so none of it can be sung",
      "style": "Extended Version. Atmospheric progressive melodic techno near 122 BPM, cinematic — a refracted arpeggio motif returning modulated rather than repeated, supersaw swells across minutes, deep sub, an FM voice whose modulation depth oscillates slowly over the whole timespan, the middle dissolving into several beatless minutes carried by a mid-range electric guitar riff resynthesised into the synth world, bending whole tones with portamento, then the groove reforming with the motif inverted. Drums borrowed from industrial metal and meticulously sampled, a real kit chopped and placed on the grid, gated snare and metallic accents. Every synth voice solid-cored with real fundamental weight. Played meandering, interlocking and rubato — parts that lock into each other's gaps while the whole thing wanders, nothing landing on the beat it was promised. One voice, delivery borrowed from K-pop: bright, forward, consonants clipped, pitch dead centre, close and dry. Mood: weightless, unresolved",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus pop form, breathy tones, acoustic instrumentation, overcompression, flat tone, short radio edit, rigid metronomic feel, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "On the landing, stone cold,\nwhat year? what year? what year?\nThe banister’s smooth as a river,\nbut the sky’s just a blur.\nWe counted the cracks in the banister,\neach step a promise we couldn’t keep,\nthe day the clocks stopped\n(we all knew it, but kept on the climb).\n\nWhat year? (a question that chills)\nWhat year? (a word that won’t fit)\nThe echo of \"2020\"\njust a ghost in the tile.\nWe met on the landing,\nfingers tracing the cold stone,\n“Is it still now?”\n“Was now even real?”\n\n[long breath]\n[hush]\n[stair tread]\n[tremble]\n\nOn the landing, stone cold,\nwhat year? what year?\nThe banister’s smooth as a river,\nbut the sky’s just a blur.\nWe counted the cracks in the banister,\neach step a promise we couldn’t keep,\nthe day the clocks stopped\n(we all knew it, but kept on the climb).\n\nWhat year? (a question that chills)\nWhat year? (a word that won’t fit)\nThe echo of \"2020\"\njust a ghost in the tile.\nWe met on the landing,\nfingers tracing the cold stone,\n“Is it still now?”\n“Was now even real?”\n\n[maestoso]\n[tutti]\n[allargando]\nwhat year?\n\nthe last word hanging like a stone in the throat,\nunspoken, unanswerable,\nunhinged.",
      "plays": [
       1,
       1
      ]
     },
     {
      "v": "O",
      "title": "The Clock in the Hall",
      "id": "468175d3-f9d1-473a-80ef-36dba540b175",
      "alt": "56f354fd-9a01-4f45-9b28-e9b35b63433d",
      "dur": 282,
      "tag": "processional · accreting · austere",
      "world": "the colony's archive can only be read aloud, and every reading wears the record a little further away",
      "meter": "slow",
      "structure": "a progressive structure with a long wordless middle, the opening lines returning changed, and a closing section capped by score markings - maestoso, tutti, crescendo al fine - where the score markings and any stage directions sit inside square brackets, while every line that is actually SUNG is written plainly with no brackets at all",
      "style": "Extended Version. Atmospheric progressive melodic techno near 122 BPM, cinematic — a refracted arpeggio motif returning modulated rather than repeated, deep sub, an FM voice whose modulation depth oscillates slowly over the whole timespan, the middle dissolving into several beatless minutes carried by a mid-range electric guitar riff resynthesised into the synth world, bending whole tones, then the groove reforming with the motif inverted. Drums borrowed from industrial metal and meticulously sampled, a real kit chopped and placed dead on the grid, gated snare and metallic accents. Every synth voice solid-cored with real fundamental weight. Played processional, accreting and austere — one element added each time round and never taken away, a single unhurried tread from first bar to last, nothing decorative anywhere. One voice, delivery borrowed from K-pop: bright, forward, consonants clipped, pitch dead centre, close and dry. Mood: grave, vast, patient",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus pop form, breathy tones, acoustic instrumentation, ornamental fills, overcompression, flat tone, short radio edit, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "The clock in the hall wears its face thin,\neach tick a sigh, each tock a tear shed,\nthe words we spoke grow thin and thin,\na whispered plea the air has fed.\n\nWe read the dawn before the dawn,\nthe light still cold on pavement grey,\none turn too fast, the metal torn,\nthe clock’s sharp chime went straight away.\n\nThe clock in the hall wears its face thin,\neach tick a sigh, each tock a tear shed,\nthe words we spoke grow thin and thin,\na whispered plea the air has fed.\n\n(No more the dented fender’s gleam,\nNo more the chair where you sat down,\nJust dawn light on the empty room,\nAnd nothing left but sound that’s gone.)\n\n[ . . . ]\n[ . . . ]\n[ . . . ]\nthe chair where you sat\nthe clock in the hall\nthe light that came\nthe air that held\n\nThe clock in the hall now runs without a hand,\neach tick a stone, each tock a sand,\nthe words we spoke are sanded plain,\na silent dawn on empty plain.\n\nThe clock in the hall now runs without a hand,\neach tick a stone, each tock a sand,\nthe words we spoke are sanded plain,\na silent dawn on empty plain.\n\n[maestoso]\n[tutti]\n[crescendo al fine]",
      "plays": [
       1,
       0
      ]
     },
     {
      "v": "P",
      "title": "Must Agree Before We Speak",
      "id": "0ed29760-110c-4daf-bcf2-37df1ddcc6cc",
      "alt": "62dbe23b-24c9-4a6d-b1fb-917a92d6c8fc",
      "dur": 286,
      "tag": "searching · competing · straining",
      "world": "everyone is issued a second voice at sixteen, and the two have to agree before either is allowed to speak",
      "meter": "slow",
      "structure": "a progressive structure with a long wordless middle, the opening lines returning changed, and a closing section capped by score markings - maestoso, tutti, sforzando, allargando - where the score markings and any stage directions sit inside square brackets, while every line that is actually SUNG is written plainly with no brackets at all",
      "style": "Extended Version. Atmospheric progressive melodic techno near 122 BPM, cinematic — a refracted arpeggio motif returning modulated rather than repeated, supersaw swells, deep sub, an FM voice whose modulation depth oscillates slowly over the whole timespan, the middle dissolving into beatless minutes carried by a mid-range electric guitar riff resynthesised into the synth world, bending whole tones, then the groove reforming with the motif inverted. Drums borrowed from industrial metal and meticulously sampled, a real kit chopped and placed dead on the grid, gated snare and metallic accents. Every synth voice solid-cored with real fundamental weight. Played searching, competing and straining — the riff and the arpeggio pulling at the same space and neither yielding, everything reaching a little past what it can comfortably hold. One voice, delivery borrowed from K-pop: bright, forward, consonants clipped, pitch dead centre, close and dry. Mood: urgent, bright, overextended",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus pop form, breathy tones, acoustic instrumentation, overcompression, flat tone, polite restrained arrangement, short radio edit, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "Sixteen, they gave us two voices\nmust agree before we speak\none hums low like a trapped bird\nthe other sings sharp as a sickle\nmust agree before we speak\n\nMy first voice tried to say I love you\nas the music swelled\nmy second voice said Don’t\nand the word don’t cut the air\nlike a knife in a darkened room\nmust agree before we speak\n\nThe concert hall was hushed, the lights were low\nmy heart a drum against my ribs\nmy first voice I love you in a breath too bright\nmy second voice Don’t—a stone in the throat\nDon’t—the only word that fit\nmust agree before we speak\n\n[adagio, fermata, 3 beats of silence]\n[silent]\n[silent]\n[silent]\n\nThe music swelled past the point of I love you\npast the point of wait\npast the point where the second voice could not be\nonly silence where my first voice died\nonly the hum of the hummed word\nonly the don’t carved in the dark\n\nSixteen, they gave us two voices\nmust agree to speak\nbut the hummed word is all that’s left\na ghost in the hollow where I love you should’ve been\nmust agree to speak\n\n[maestoso]\nThe second voice sings now\na single note\na long low don’t\n[tutti]\nThe hum of don’t swells\nthe hall holds its breath\n[sforzando]\nDon’t—a roar of don’t—\n[allargando]\nthe don’t widens\nfills the space where I love you should’ve been\nI said it\nI said it\nI said it\nI said it\nI said it\nI said it\nI said it\nI said it\nI said it\nI said it",
      "plays": [
       1,
       0
      ]
     }
    ]
   },
   {
    "label": "Round 8 · read off the session hearts, inserts mixed",
    "note": "The five session hearts were one from each foreground experiment — riff, drums and voice — plus the round-1 original and the one loose-time piece. No single foreground wins, so Q lets all three trade the front and makes the handovers the structure. R is the first syncopation on this lineage; S is the pulse never locking. Every insert varied: meter slow/fast/hyper, structure mantra/dubstep/avant-garde, a fresh world each. The lyric prompt now names only \"melodic techno\" plus the play qualifiers.",
    "songs": [
     {
      "v": "Q",
      "title": "I Spoke First",
      "id": "d0d7fe20-7a40-4aab-8799-8503d323dee5",
      "alt": "71a0ed9c-9bcc-48e1-bd2d-0c54f66491c2",
      "dur": 196,
      "tag": "conversational, antiphonal and terraced",
      "world": "every word spoken on the station is heard by everyone else half a second later, so no one ever finishes a sentence alone",
      "meter": "slow",
      "structure": "one mantra that accretes, a second voice answering in (), and a closing section capped by score markings - maestoso, tutti, allargando - where the markings and any stage directions sit inside square brackets while every SUNG line is written plainly with no brackets",
      "style": "Extended Version. Atmospheric melodic techno near 120 BPM, cinematic — a refracted arpeggio motif returning modulated rather than repeated, supersaw swells rising across minutes, deep sub, an FM voice whose modulation depth oscillates slowly across the whole timespan, a beatless middle then the groove reforming with the motif inverted. Three voices share the front and hand it over audibly: a mid-range electric guitar riff resynthesised into the synth world bending whole tones, a sampled industrial-metal kit chopped and placed dead on the grid with gated snare and metallic accents, and the singer. Every synth voice solid-cored with real fundamental weight. Played conversational, antiphonal and terraced — each takes a turn in front while the others answer, and the handovers are the structure. One voice, close and dry, consonants clipped, pitch dead centre. Mood: bright, argumentative, enormous",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus pop form, continuous four-on-the-floor, breathy tones, acoustic instrumentation, overcompression, short radio edit, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "[You’re not alone in this—wait—]\n(Your words are just noise—I don’t see it—)\n—wait—\nYour words are just noise\n(I don’t see it—)\n—wait—\nMy voice is a broken hinge\n(I’m just a breeze—)\n—wait—\nI was drafting blueprints\n(I stole the scaffolding—)\n—wait—\nMy voice is a broken hinge\n(I’m just a breeze—)\n—wait—\nI named the light where the shadows lean\n(I took the compass—)\n—wait—\nMy voice is a broken hinge\n(I’m just a breeze—)\n—wait—\nI held the map of the wound\n(I folded it flat—)\n—wait—\nMy voice is a broken hinge\n(I’m just a breeze—)\n—wait—\nThe silence you call mine\n(is a borrowed space—)\n—wait—\nMy voice is a broken hinge\n(I’m just a breeze—)\n—wait—\nI spoke first\n(I spoke first—)\n—wait—\nI spoke first\n(I spoke first—)\n—wait—\nI spoke first\n(I spoke first—)\n—wait—\nI spoke first\n(I spoke first—)\n—wait—\nI spoke first\n\n[maestoso]\nI spoke first\n(I spoke first—)\n—wait—\n\n[tutti]\nI spoke first\n(—wait—)\nI spoke first\n(—wait—)\n\n[allargando]\nI spoke first.\n\n(—wait—)",
      "plays": [
       1,
       1
      ]
     },
     {
      "v": "R",
      "title": "The Turn Is Home",
      "id": "12c68b8b-cf7e-4bdb-a392-013713a54337",
      "alt": "4dcf2aff-1715-4e41-9787-b9078113cb6d",
      "dur": 292,
      "tag": "syncopated, interlocking and gridded",
      "world": "gravity is switched off for one hour every night and nobody has ever managed to sleep through it",
      "meter": "fast",
      "structure": "a dubstep structure, and a closing section capped by score markings - maestoso, sforzando, tutti - where the markings and any stage directions sit inside square brackets while every SUNG line is written plainly with no brackets",
      "style": "Extended Version. Atmospheric melodic techno near 124 BPM, cinematic — a refracted arpeggio motif returning modulated rather than repeated, supersaw swells, deep sub, an FM voice whose modulation depth oscillates slowly across the whole timespan, a beatless middle carried by a mid-range electric guitar riff resynthesised into the synth world bending whole tones, then the groove reforming with the motif inverted. Drums borrowed from industrial metal and meticulously sampled, a real kit chopped and placed dead on the grid, gated snare, metallic accents. Every synth voice solid-cored with real fundamental weight. Played syncopated, interlocking and gridded — the accents sit off the beat and stay there, kick and riff filling each other's gaps, everything machine-exact while almost nothing is where the ear expects it. One voice, close and dry, consonants clipped, pitch dead centre, rhythmic phrasing against the kick. Mood: kinetic, bright, restless",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus pop form, four-square on-the-beat accents, breathy tones, acoustic instrumentation, loose unquantised drumming, overcompression, short radio edit, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "(oh-ah-oh-ah-oh)\nbeat kicks hard at 128bpm\nYou turn, you turn, you turn\nwhile the world just dips its head\nto the moon’s cold turn of phrase\nYou turn, you turn, you turn\nno pillow, no rest, just the way the air feels\nwhen you’re falling through the sky—\noh-ah-oh-ah-oh\n[bass drops: subby, deep, like the earth holding its breath]\n\ngravity switch flicks—\none hour’s silence, then the gasp—\nyou wake to nothing under your feet\njust the thump of your own heart\nstuttering up through the void\nwhere the streetlights died last Tuesday\nyou saw the man in 3’s window\nnot fall—just… turn\nlike a key in a rusted lock\nturn, turn, turn\nwhile the city bleeds its weightless sigh\nyou turn, you turn, you turn\nno anchor, no why\njust the air—\noh-ah-oh-ah-oh\n[synth melody pierces: high, fragile, like a thread holding a falling star]\n\nthey say it’s just gravity\nbut gravity’s just the lie we tell the sky\nto keep from seeing\nhow the turn feels like waking\nin the dark\nwith no bed\njust the turn of your own bones\nstitching the air\nyou turn, you turn, you turn\nand the streetlights—\nthey died last Tuesday\nand you still feel the crack of that\nturn\nturn\nturn\nah-oh-ah-oh-ah\n\n[drums stomp: boom-chk-boom-chk]\n[beat cuts—silence—then BRRRRAAAAAP]\nTURN!\nthe sky’s a wound, the street’s a knife\nTURN!\nyou’re the only one who’s never fallen\nTURN!\nand the turning’s all you’ve got to hold\nTURN!\nyou’re not floating—you’re turning\nthrough the dark\nturning\nturning\nturning\nah-oh-ah-oh-ah\n(vocals swell, layered, desperate, triumphant)\n\nYou turn, you turn, you turn\nthrough the hollowed-out night\nyou turn, you turn, you turn\nand the world’s a falling light\nyou turn, you turn, you turn\nand the turn is home\nturn\n(the air sings: \"turn\" in every vowel)\n\n[score: maestoso, sforzando, tutti]\nTURN!\nTURN!\nTURN!\nthrough the black, through the crack, through the\nTURN!",
      "plays": [
       1,
       0
      ]
     },
     {
      "v": "S",
      "title": "We Don't Say the Dawn",
      "id": "b1aa2d26-2e05-49c6-915b-47660873f99f",
      "alt": "2939783b-2662-4eac-914b-616d039f1a4b",
      "dur": 308,
      "tag": "rubato, cross-rhythmic and sparse",
      "world": "a second sun rose over the settlement last week and not one person has mentioned it out loud",
      "meter": "hyper",
      "structure": "an avant-garde structure, and a closing section capped by score markings - maestoso, tutti, morendo - where the markings and any stage directions sit inside square brackets while every SUNG line is written plainly with no brackets",
      "style": "Extended Version. Atmospheric melodic techno near 110 BPM whose pulse never locks — a refracted arpeggio motif returning modulated rather than repeated, deep sub entering late, an FM voice whose modulation depth oscillates slowly across the whole timespan, a mid-range electric guitar riff resynthesised into the synth world bending whole tones, the long middle beatless and the groove never quite settling into a grid at all. Drums borrowed from industrial metal and meticulously sampled, a real kit chopped, struck in figures that start and stop rather than in a loop, gated snare, metallic accents. Every synth voice solid-cored with real fundamental weight. Played rubato, cross-rhythmic and sparse — two pulses running at different lengths and neither winning, long gaps where only one voice is sounding. One voice, close and dry, barely above speech, consonants clipped. Mood: uneasy, hushed, vast",
      "exclude": "hollow whistling resonance, thin airy leads, festival drop, verse-chorus pop form, steady four-on-the-floor, gridded quantized feel, belted vocal, acoustic instrumentation, overcompression, short radio edit, Harmonic stagnation, Dynamic flattening, Quantized sterility, Structural monotony, Predictability, Vocal identity drift, Vocalist substitution, Soundtubes",
      "lyric": "[Verse 1: slow, sparse, a single piano note]\nThe sky wore gown of dawn’s forgotten hue,\nNot sun, but light that wasn’t light, you knew.\nWe walked the street where cobblestones grew\nCold under feet that knew the truth they knew\nWe don’t say the dawn that blew the light so blue...\nWe don’t say the dawn that blew the light so blue...\n\n[Verse 2: rhythm slightly accelerates, bassline pulses beneath]\nRed on the window where the safety gown had stained,\nNot sun, but heat that baked the same old rain.\nWe watched the clouds that didn’t rain at all,\nWe watched the dust that didn’t fall at all,\nWe stared the gown of dawn that shouldn’t be...\nWe stared the gown of dawn that shouldn’t be...\n\n[Refrain: tempo rubato, shifts subtly within each line]\nWe don’t say the dawn... (a breath held tight)\nWe don’t say the dawn... (a sigh in the night)\nWe don’t say the dawn... (the crimson light... the end...)\nWe don’t say the dawn... (the crimson light... the end...)\n\n[Verse 3: sparse, dissonant piano, voice barely above whisper]\nNo bells rang false for what we didn’t see,\nNo shouts rang true for what we watched go free.\nJust dust on glass where shadows danced too late,\nJust dust on glass where shadows danced too late,\nJust dust on glass... we don’t say the dawn...\nWe don’t say the dawn... the dawn... the dawn...\n\n[Build: rising synth pulse, driving rhythm, layers of breath]\nWe don’t say (ah-ah-ah-ah) the dawn...\nWe don’t say (ah-ah-ah-ah) the dawn...\nWe don’t say (ah-ah-ah-ah) the dawn...\nWe don’t say (ah-ah-ah-ah) the dawn...\nWe don’t say (ah-ah-ah-ah) the dawn...\nWe don’t say (ah-ah-ah-ah) the dawn...\n\n[Chorus: full ensemble, melodic techno beat kicks in, soaring]\nTHE SUN THAT ROSE AND ROSE AND ROSE AGAIN!\nTHE LIGHT THAT BURNED BUT NEVER WAS THE SUN!\nTHE CRYSTAL DUST IN SHADOWS BURNING BLUE!\nWE WALK THE STREETS WHERE NO SUN SHONE TRUE!\nWE WALK THE STREETS WHERE NO SUN SHONE TRUE!\n\n[Score Markings]\n[maestoso]\n[tutti]\n[morendo]\n\n[Closing Whisper: voice fades, leaving only breath and the echo of vowels]\nWe don’t say...\nthe dawn...\nthe dawn...\n(ah-ee-oh...)\n(we don’t say...)",
      "plays": [
       1,
       0
      ]
     }
    ]
   }
  ]
 }
];
