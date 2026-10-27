// "2026 quest log". Set `show: true` to publish a quest.
// Quests with show: false come from the 2026 inventory and are waiting for review.

export type Quest = {
  title: string;
  detail: string;
  when: string; // "Feb 2026 – now"
  status: 'complete' | 'active';
  reward?: string; // short headline result, shown as a chip
  project?: string; // slug in src/content/projects
  show: boolean;
};

export type QuestTrack = {
  id: 'main' | 'side' | 'skill';
  label: string;
  blurb: string;
  quests: Quest[];
};

export const year = 2026;

export const questLog: QuestTrack[] = [
  {
    id: 'main',
    label: 'Main quest',
    blurb: 'Shipping to live players at Liquidnitro Games.',
    quests: [
      {
        title: 'Ship to live players',
        detail: 'New features and add-on mechanics for a live mobile game, in Lua on Unity.',
        when: 'Feb 2026 – now',
        status: 'active',
        reward: 'Features + add-ons',
        project: 'liveops-title',
        show: true,
      },
      {
        title: 'Move the numbers',
        detail: 'Shipped A/B tests to live players and let the data pick the winner, helping lift revenue per player.',
        when: '2026',
        status: 'complete',
        project: 'liveops-title',
        show: true,
      },
      {
        title: 'Learn a live codebase from the inside',
        detail: 'Four months of learning by debugging, then Claude Code to ramp up faster without losing quality.',
        when: 'Feb – May 2026',
        status: 'complete',
        project: 'liveops-title',
        show: true,
      },
      {
        title: 'Ship features on an unreleased title',
        detail: 'Feature implementation and bug fixing from spec to a stable, tested build.',
        when: 'Nov 2025 – Feb 2026',
        status: 'complete',
        project: 'feature-title',
        show: true,
      },
    ],
  },
  {
    id: 'side',
    label: 'Side quests',
    blurb: 'Personal prototypes, built on my own time.',
    quests: [
      {
        title: 'WATERMARK: make the body the ammo',
        detail: 'A playable water character. Every shot drains you, every puddle can refill you.',
        when: 'Sep 2026 – now',
        status: 'active',
        reward: 'Playable prototype',
        project: 'watermark',
        show: true,
      },
      {
        title: 'Blockout Studio: sketch to level',
        detail: 'A Unity tool that turns a reference image or prompt into a playable greybox level.',
        when: 'Sep 2026 – now',
        status: 'active',
        reward: 'Image → level',
        project: 'blockout-studio',
        show: true,
      },
      {
        title: 'Fluxus architecture',
        detail: 'DI-first Unity 6 architecture for a multiplayer traversal sandbox.',
        when: 'May – Jun 2026',
        status: 'complete',
        project: 'fluxus',
        show: false,
      },
      {
        title: 'AI game-design pipeline',
        detail: 'Claude Code router and critic agents, 27 tracked concepts in a day.',
        when: 'Sep 2026',
        status: 'complete',
        project: 'ai-design-pipeline',
        show: false,
      },
      {
        title: 'Paisa Lab',
        detail: 'FastAPI and SQLite learning platform with a paper-trading simulator.',
        when: 'Oct 2026',
        status: 'complete',
        project: 'paisa-lab',
        show: false,
      },
    ],
  },
  {
    id: 'skill',
    label: 'Skill unlocks',
    blurb: 'New tools in the inventory this year.',
    quests: [
      {
        title: 'Lua for live gameplay',
        detail: 'Writing and debugging Lua inside Unity, with LuaPerfect attached to the running project.',
        when: 'Feb 2026',
        status: 'complete',
        show: true,
      },
      {
        title: 'Claude Code, used well',
        detail: 'Custom skills, agents and hooks, and driving the Unity Editor through the Unity CLI. Lean on tokens, strict on quality.',
        when: '2026',
        status: 'complete',
        show: true,
      },
      {
        title: 'Unreal Engine 5.6 certificate',
        detail: 'Completed a Udemy single-player Unreal Engine 5.6 course.',
        when: 'Feb 2026',
        status: 'complete',
        show: false,
      },
      {
        title: 'Data structures and algorithms',
        detail: 'A self-built course in C++20, C# and Unity.',
        when: 'Oct 2026 – now',
        status: 'active',
        show: false,
      },
    ],
  },
];
