---
title: Fowl Play
summary: A physics-driven third-person platformer prototype with an egg launcher that paints the world and a fully simulated water character.
category: personal
org: BreadCrumbs (indie)
role: Solo developer
period: Jul 2026 – Sep 2026
year: 2026
stack: [Unity 6, URP 17, C#, Cinemachine, New Input System, ScriptableObjects, Custom shaders, Object pooling]
highlights:
  - Engineered physics-based third-person platforming (coyote time, air control, wall-slide, jelly squash and stretch), tuned entirely through ScriptableObjects.
  - Built a pooled weapon and fire-mode framework and an Egg Launcher with momentum and recoil, an aim arc with a live preview and landing ring, and ballistics that land on the crosshair.
  - Made the world paintable. Shots paint the exact surface they hit, building on the paint-as-traversal idea.
  - Prototyped a stylised water character and water launcher with a GPU water-skin shader, droplet simulation, splashes and puddles, and an in-Editor tuning panel with presets for designers.
  - Built a Cinemachine camera that makes walls between it and the player see-through, plus player-only clip walls and out-of-bounds zones.
cover: ../../assets/projects/fowl-play/cover.png
coverAlt: A green-and-yellow rooster character aiming the egg launcher at painted green wall surfaces in a greybox level
gallery:
  - src: ../../assets/projects/fowl-play/egg-launcher-aim.png
    caption: Egg Launcher aim arc with landing-ring preview
  - src: ../../assets/projects/fowl-play/water-launcher-splash.png
    caption: Water character firing a water blob, with splash at the landing ring
  - src: ../../assets/projects/fowl-play/water-sequence.png
    caption: "Water launcher sequence: ready, in flight, splash, puddle"
featured: true
order: 1
---

## Overview

Fowl Play started as a game concept: a rooster obstacle course where eggs splat into paint and the paint helps you get around. It grew into my main prototyping sandbox for 2026. I built it solo in Unity 6 with URP, one system at a time, keeping each mechanic data-driven so it can be tuned without touching code.

## Systems

- **Locomotion:** physics-based movement with coyote time, mid-air control and wall-slide, plus "jelly" squash and stretch for feel. Every number lives in a ScriptableObject profile.
- **Weapons:** a pooled projectile and fire-mode framework (ported from my earlier WeaponSystem project) powering five weapons. The Egg Launcher has momentum, recoil, an aim-driven arc with a live preview and landing ring, and gamepad rebinding.
- **Paint:** projectiles paint the surface they actually hit, so the level records where you've been.
- **Camera:** a Cinemachine rig that makes walls between it and the player see-through, plus aim solved so the shot lands on the crosshair rather than the muzzle line.
- **Water:** a water character whose body is a GPU water skin with droplet simulation and squash and stretch. A water launcher fires blobs that cost the shooter's own water, with splash and puddle effects and a live designer tuning panel.

## What I learned

Iterating with screenshot sheets (jump, run, dive and splash progressions) made the water work far easier to judge than tweaking values blind. It's a habit I'm keeping for every visual system.
