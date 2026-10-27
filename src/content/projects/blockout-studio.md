---
title: Blockout Studio
summary: An AI-assisted level-greyboxing tool, shipped as a Unity package, that turns a reference image or a prompt into a themed, playable greybox level.
category: personal
org: BreadCrumbs (indie)
role: Solo developer
period: Sep 2026
year: 2026
stack: [Unity Editor tooling, UPM package, C#, Python, pywebview, Preact, HTTP/SSE bridge, Blender, Claude Code]
highlights:
  - Built Blockout Studio, an embeddable Unity package that turns a reference image or text prompt into a dimensioned, playable greybox level.
  - Built a Python and Preact desktop app (pywebview) that talks to a running Unity Editor over a local HTTP/SSE bridge, with Blender sync for hand edits.
  - Added a Theme Kit that restyles a whole level from a single reference image, and used it to build the "Water Gardens" demo level.
  - About 17k lines across the tool, C# level builders and evals, written alongside a plain-language guide for designers.
cover: ../../assets/projects/blockout-studio/cover.png
coverAlt: Overhead view of a generated greybox level with platforms, walls, a water pool and coloured gameplay zones
gallery:
  - src: ../../assets/projects/blockout-studio/before.png
    caption: Before. A hand-built test room.
  - src: ../../assets/projects/blockout-studio/after.png
    caption: After. A full level rebuilt from a reference layout by Blockout Studio.
  - src: ../../assets/projects/blockout-studio/seethrough-play.png
    caption: Playing the generated level in-engine
featured: true
order: 2
---

## Why I built it

Greyboxing a level by hand is slow, and the first version is almost always thrown away. I wanted to go from a sketch or a reference map to something I could actually play in minutes, then iterate on it.

## How it works

1. **Input:** a reference image, a sketch or a text prompt.
2. **Layout:** the image is turned into a dimensioned layout of floors, walls, ramps and zones.
3. **Build:** C# builders inside the Unity Editor generate the greybox, with colliders, player-only clip walls and out-of-bounds zones.
4. **Theme:** the Theme Kit restyles the level from a single reference image.
5. **Iterate:** a Python and Preact desktop app manages projects and candidates, syncs with Blender for hand edits, and talks to the live Editor over a local bridge.

It ships as a UPM package (`com.breadcrumbs.blockout-studio`), so it can be dropped into any Unity 6 project.

## Built with AI

The tool started life as a Claude Code skill (image to Unity blockout) and grew into a standalone app. Claude Code drove the Unity Editor through the Unity CLI during development, which let me test every builder change in-engine straight away.
