// Roles, newest first. Bullet points live on the matching project files in
// src/content/projects (matched by `org`), so the site and resume share them.

export type Role = {
  org: string;
  title: string;
  start: string; // "Jun 2025"
  end: string; // "Present"
  location?: string;
  stack: string[];
  summary: string;
};

export const experience: Role[] = [
  {
    org: 'Liquidnitro Games',
    title: 'Software Engineer II',
    start: 'Jun 2025',
    end: 'Present',
    stack: ['Unity 3D', 'C#', 'Photon Fusion', 'Perforce', 'Visual Studio'],
    summary:
      'Building network-synced multiplayer mini-games: netcode, real-time path generation and obstacle systems for players and AI.',
  },
  {
    org: 'Arrise Solutions Pvt. Ltd.',
    title: 'Game Developer',
    start: 'Jun 2023',
    end: 'May 2025',
    stack: ['Unity 3D', 'C#', 'SVN', 'Jenkins', 'Spine', 'NGUI', 'UGUI'],
    summary: 'Front-end developer on real-money slot games for web and mobile.',
  },
  {
    org: 'BR Softech',
    title: 'Unity Developer',
    start: 'Mar 2023',
    end: 'May 2023',
    stack: ['Unity 3D', 'C#', 'SignalR', 'GitHub Desktop'],
    summary: 'Unity development with SignalR-based real-time networking.',
  },
  {
    org: 'Totality Corp',
    title: 'Game Developer',
    start: 'Oct 2020',
    end: 'Dec 2022',
    stack: ['Unity 3D', 'C#', 'Photon PUN', 'Roblox', 'Lua'],
    summary: 'Built multiplayer combat and endless-runner games in Unity and Roblox.',
  },
];
