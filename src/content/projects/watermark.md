---
title: WATERMARK
summary: "Your body is your ammo. A playable water character for an online arena game I'm designing: every shot drains you, every puddle can refill you."
category: personal
org: Solo project
role: Solo developer
period: Sep 2026 – Present
year: 2026
status: in-progress
stack: [Unity 6, URP 17, C#, Cinemachine, New Input System, ScriptableObjects, Claude Code]
highlights:
  - Turned a jelly-sphere character into a body made of water that wobbles, stretches on the run, squashes on landing, sheds droplets and melts into a puddle on a dive.
  - Built a Water Launcher whose shots are paid for out of the shooter's own body, landing as a splash (droplet crown, jets, spatter) and a puddle that spreads, dries up and can be stood in to refill.
  - Split the system into three layers (gameplay numbers, a light CPU droplet simulation, a GPU-drawn water skin) so the visuals never feed back into gameplay, keeping the shared state small enough to network.
  - Gave designers four tuning assets and an in-Editor panel with sliders, presets and test buttons, all live-editable in Play mode.
cover: ../../assets/projects/watermark/cover.png
coverAlt: A glossy water character with a visible water level inside its body fires the water launcher; the blob bursts into a splash further down the arena
gallery:
  - src: ../../assets/projects/watermark/water-body.png
    caption: The water body at rest, with the follow camera
  - src: ../../assets/projects/watermark/tank-drain.png
    caption: Three shots later. The water level inside the body has dropped, because the body is the ammo.
  - src: ../../assets/projects/watermark/splash-sequence.png
    caption: "An earlier look-dev pass of the splash: ready, in flight, splash, puddle"
featured: true
order: 2
---

## The idea

WATERMARK is an online arena game I'm designing for up to six players. The hook is one rule: **your mass is your ammo**. Shooting drains you, the water you spend stays on the floor, and puddles become something to fight over.

Before writing any more design, I wanted to feel that rule in my hands. So I built the character first.

## What's playable today

- **A body made of water.** It wobbles, stretches when it runs, squashes when it lands, throws droplets, and you can see the water level inside it.
- **A launcher that costs you.** Each blob comes out of your own body. It lands exactly on the crosshair, splashes, and leaves a puddle that spreads, dries up, and refills you if you stand in it.
- **Built to tune.** Four designer assets and a tuning panel (sliders, presets, test buttons) work live while the game runs.
- **Built to network.** What the game counts (tank level, puddles) is kept apart from what you see (droplets, water skin), so only a few numbers ever need to sync.

All shots on this page were captured from the live Unity Editor with the Unity CLI.

## Next up

- Put the arena round loop around the character: a shared pool that drains over the round.
- Network the tank and puddle state with server-authoritative netcode.
- Give the hit-box the same size as the water, so a full tank is a bigger target.
- First playtests at four players.
