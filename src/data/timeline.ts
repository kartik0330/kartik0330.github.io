// "2026 in review". Set `show: true` to publish an entry.
// Entries with show: false come from the 2026 inventory and are waiting for review.

export type TimelineEntry = {
  month: string; // "Sep"
  title: string;
  detail: string;
  kind: 'work' | 'project' | 'learning';
  project?: string; // slug in src/content/projects
  show: boolean;
};

export const year = 2026;

export const timeline: TimelineEntry[] = [
  {
    month: 'Jan–Oct',
    title: 'Multiplayer mini-games at Liquidnitro',
    detail: 'Network-synced gameplay, path generation and obstacle systems as Software Engineer II.',
    kind: 'work',
    project: 'mini-games',
    show: true,
  },
  {
    month: 'Feb',
    title: 'Unreal Engine 5.6 certificate',
    detail: 'Completed a Udemy single-player Unreal Engine 5.6 course.',
    kind: 'learning',
    show: false,
  },
  {
    month: 'Mar',
    title: 'Unreal Engine C++ multiplayer exploration',
    detail: 'Lobby and level travel in a UE 5.6 C++ project.',
    kind: 'learning',
    show: false,
  },
  {
    month: 'Jun',
    title: 'Fluxus architecture',
    detail: 'DI-first Unity 6 architecture for a multiplayer traversal sandbox.',
    kind: 'project',
    project: 'fluxus',
    show: false,
  },
  {
    month: 'Jul',
    title: 'Fowl Play begins',
    detail: 'Physics locomotion and a pooled weapon framework in Unity 6 URP.',
    kind: 'project',
    project: 'fowl-play',
    show: true,
  },
  {
    month: 'Aug',
    title: 'Egg Launcher and surface painting',
    detail: 'Ballistic aiming, landing preview and paint where shots hit.',
    kind: 'project',
    project: 'fowl-play',
    show: true,
  },
  {
    month: 'Sep',
    title: 'AI game-design pipeline',
    detail: 'Claude Code router and critic agents, 27 tracked concepts in a day.',
    kind: 'project',
    project: 'ai-design-pipeline',
    show: false,
  },
  {
    month: 'Sep',
    title: 'Blockout Studio',
    detail: 'Image or prompt to a playable greybox level, shipped as a Unity package.',
    kind: 'project',
    project: 'blockout-studio',
    show: true,
  },
  {
    month: 'Sep',
    title: 'Water character prototype',
    detail: 'GPU water skin, droplets, splashes and puddles, with a designer tuning panel.',
    kind: 'project',
    project: 'fowl-play',
    show: true,
  },
  {
    month: 'Sep–Oct',
    title: 'WATERMARK pre-production',
    detail: '35 decision records and game-research agents for an online arena game.',
    kind: 'project',
    project: 'watermark',
    show: false,
  },
  {
    month: 'Oct',
    title: 'Paisa Lab',
    detail: 'FastAPI and SQLite learning platform with a paper-trading simulator.',
    kind: 'project',
    project: 'paisa-lab',
    show: false,
  },
  {
    month: 'Oct',
    title: 'Data structures and algorithms in C++20, C# and Unity',
    detail: 'A self-built course with a study site and spaced repetition.',
    kind: 'learning',
    show: false,
  },
];
