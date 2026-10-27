// Single source of truth for personal details. Used by the site and the resume.
// The phone number is never committed: it comes from research/.env.private (git-ignored)
// and is only used by the private resume build (`npm run pdf -- --private`).

export const profile = {
  name: 'Kartik Mangal',
  role: 'Software Engineer II',
  headline: 'Gameplay Programmer · LiveOps, Multiplayer & Gameplay Systems',
  location: 'Hyderabad, India',
  email: 'kartikmangal229@gmail.com',
  phone: import.meta.env.PRIVATE_RESUME ? import.meta.env.RESUME_PHONE : undefined,
  linkedin: 'https://www.linkedin.com/in/kartikmangal',
  github: 'https://github.com/kartik0330',
  yearsExperience: 6,
  studios: 4,
  tagline:
    'I ship gameplay to live players, build network-synced multiplayer, and make tools that get ideas playable faster.',
  about: [
    "I'm a gameplay programmer based in Hyderabad with six years of shipping games: Roblox and Photon deathmatch at Totality Corp, real-money slot games for web and mobile at Arrise Solutions, and now LiveOps and multiplayer work at Liquidnitro Games, where I'm a Software Engineer II.",
    'Since February 2026 I have been building new features and add-on mechanics for a live mobile game: Lua gameplay on Unity, design-driven configs, and A/B-tested experiments with real players.',
    "On my own time I prototype the things I want to play. Right now that's WATERMARK, a water character whose body is its ammo, and Blockout Studio, a tool that turns a sketch into a playable greybox level.",
    'I care about clean architecture (HLD, LLD, SOLID, design patterns), measurable performance, and using Claude Code to move from idea to playable faster without losing code quality.',
  ],
  summary:
    'Gameplay programmer with 6 years of experience in Unity and C# across LiveOps, multiplayer, real-money casino and mobile games. Builds new features, add-on mechanics and A/B-tested experiments in Lua and C# for a live mobile game, with a background in Photon Fusion and SignalR multiplayer, physics-based gameplay and Unity Editor tooling.',
  education: {
    school: 'Indian Institute of Information Technology, Jabalpur',
    degree: 'B.Tech, Electronics and Communication Engineering',
    period: 'Jul 2018 – May 2022',
    location: 'Jabalpur, India',
  },
};
