---
title: Blockout Studio
summary: "Sketch in, playable level out. A Unity tool I'm building that turns a reference image or a one-line prompt into a greybox level you can walk around in minutes."
category: personal
org: Solo project
role: Solo developer
period: Sep 2026 – Present
year: 2026
status: in-progress
stack: [Unity Editor tooling, C#, UPM package, Python, Preact, Blender, Claude Code]
highlights:
  - Building an embeddable Unity package that turns a reference image or text prompt into a dimensioned, playable greybox level with colliders, clip walls and out-of-bounds zones.
  - Built a desktop studio (Python and Preact) that drives a running Unity Editor over a local bridge, with Blender sync for hand edits.
  - Added a Theme Kit that restyles a whole level from a single reference image.
cover: ../../assets/projects/blockout-studio/cover.png
coverAlt: Overhead view of a generated greybox level with platforms, walls, a water pool and coloured gameplay zones
gallery:
  - src: ../../assets/projects/blockout-studio/before.png
    caption: Before. A hand-built test room.
  - src: ../../assets/projects/blockout-studio/after.png
    caption: After. A full level rebuilt from a reference layout.
  - src: ../../assets/projects/blockout-studio/seethrough-play.png
    caption: Playing the generated level in-engine
featured: true
order: 3
---

## Why I'm building it

Greyboxing by hand is slow, and the first version almost always gets thrown away. I want to go from a sketch to something I can play in minutes, then spend my time iterating on the fun instead of placing cubes.

## How it works today

1. **Input:** a reference image, a sketch or a text prompt.
2. **Layout:** the image becomes a dimensioned plan of floors, walls, ramps and zones.
3. **Build:** C# builders inside the Unity Editor generate the greybox, ready to play.
4. **Theme:** the Theme Kit restyles the level from one reference image.
5. **Iterate:** a desktop studio manages candidates, syncs with Blender for hand edits, and talks to the live Editor.

## Next up

It's a personal tool and very much a work in progress. On the list: better layout reading from rough sketches, smarter traversal checks (can the player actually reach every platform?), and a cleaner one-click flow inside the Editor.
