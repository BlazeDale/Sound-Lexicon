// Survivors' Plot - lo-fi game-music runs on Suno's Simple tab.
// The prompt lives in docs/survivors-plot-prompt.txt; each create fills its INPUTS block.
// Shared queue: queue.html?q=sjm9xyp5 ("Survivors' Plot · lo-fi").
// verdict: '' (unheard) | 'keep' | 'maybe' | 'cut'  - filled in by ear, later.
const SP_QUEUE = 'sjm9xyp5';
const SP_PROMPT = 'v1';
const SP_CREATES = [
  { n: 1, date: '2026-09-27', prompt: 'v1',
    inputs: { mood: 'cozy', energy: 'low', setting: 'campfire inside the walls at dusk', weather: 'light rain', threat: 'none', loop: 'yes', len: '2:30' },
    clips: [ { id: '4cf1c26f-339c-4350-b059-b06f39a7de26', title: 'Okay for Now' }, { id: '81f76f59-69bb-439c-b99a-90309fcfd85b', title: 'Dusk Inside the Walls' } ] },
  { n: 2, date: '2026-09-27', prompt: 'v1',
    inputs: { mood: 'hopeful', energy: 'steady', setting: 'morning chores in the rooftop garden', weather: 'clear, birdsong', threat: 'none', loop: 'yes', len: '2:30' },
    clips: [ { id: '13d1382d-ae8e-4fca-bb80-f44ad139bb28', title: 'Safe for Another Day' }, { id: '5b8c682a-9b01-4d83-951f-a87c065491df', title: 'Quietly Okay for Now' } ] },
  { n: 3, date: '2026-09-27', prompt: 'v1',
    inputs: { mood: 'wistful', energy: 'low', setting: 'night watch on the wall, flashlight off', weather: 'cold wind', threat: 'distant', loop: 'yes', len: '3:00' },
    clips: [ { id: 'df758a55-363f-4271-b940-907ac66a6c10', title: 'Watch Still Keeping Time' }, { id: '1496ca60-e8d1-47ce-8969-fbd622a3bda9', title: 'Watch Still Keeping Time' } ] },
  { n: 4, date: '2026-09-27', prompt: 'v1',
    inputs: { mood: 'cozy', energy: 'busy', setting: 'workshop, sawdust and a radio', weather: 'overcast', threat: 'none', loop: 'yes', len: '2:30' },
    clips: [ { id: '731a6405-4424-4ba0-9d62-4a4be9dafe11', title: 'Safe for Now' }, { id: '6b4ff184-291c-4a9c-ab11-acd57174942f', title: 'Cozy Survival Workshop' } ] },
];
