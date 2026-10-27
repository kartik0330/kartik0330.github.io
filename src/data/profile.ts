// Single source of truth for personal details. Used by the site and the resume.
// The phone number is never committed: it comes from research/.env.private (git-ignored)
// and is only used by the private resume build (`npm run pdf -- --private`).

export const profile = {
  name: 'Kartik Mangal',
  role: 'Software Engineer II',
  headline: 'Unity Game Developer · Multiplayer & Gameplay Systems',
  location: 'Noida, India',
  email: 'kartikmangal229@gmail.com',
  phone: import.meta.env.PRIVATE_RESUME ? import.meta.env.RESUME_PHONE : undefined,
  linkedin: 'https://www.linkedin.com/in/kartikmangal',
  github: 'https://github.com/kartik0330',
  studio: {
    name: 'BreadCrumbs',
    blurb: 'my indie game label, where I prototype physics-driven gameplay and build AI-assisted dev tools',
  },
  yearsExperience: 6,
  tagline:
    'I build network-synced gameplay, physics-driven mechanics, and the tools that make games faster to make.',
  about: [
    "I'm a game developer from Noida with six years of shipping Unity games: Roblox and Photon deathmatch at Totality Corp, real-money slot games for web and mobile at Arrise Solutions, and network-synced multiplayer mini-games at Liquidnitro Games, where I'm a Software Engineer II.",
    "Outside work I run BreadCrumbs, my indie label. In 2026 that meant Fowl Play, a physics platformer prototype with a GPU water character, and Blockout Studio, a Unity tool that turns a reference image into a playable greybox level.",
    'I care about clean architecture (SOLID, design patterns, DI), measurable performance, and using AI tooling, Claude Code especially, to move from idea to playable faster without losing code quality.',
  ],
  summary:
    'Unity game developer with 6 years of experience across multiplayer, real-money slot and mobile titles. Builds network-synced gameplay with Photon Fusion, physics-based mechanics, and editor tooling, with a focus on SOLID architecture, performance and AI-assisted workflows.',
  education: {
    school: 'Indian Institute of Information Technology, Jabalpur',
    degree: 'B.Tech, Electronics and Communication Engineering',
    period: 'Jul 2018 – May 2022',
    location: 'Jabalpur, India',
  },
};
