---
title: Vijayi Dash
summary: An endless runner with a data-driven obstacle system, state-machine locomotion and event-driven architecture.
category: professional
org: Totality Corp
role: Game Developer
period: Oct 2022 – Dec 2022
year: 2022
stack: [Unity 3D, C#, ScriptableObjects, DOTween, New Input System]
highlights:
  - Developed a complete obstacle system using ScriptableObjects and DOTween.
  - Used the State design pattern and the New Input System to handle player locomotion.
  - Used the Observer pattern to avoid runtime exceptions and unnecessary per-tick memory allocations.
  - Implemented physics-based collision detection with primitive colliders and Rigidbody components.
  - Optimised performance using profiling-led techniques.
order: 5
---

## Overview

A runner built around clean architecture. Obstacles are authored as ScriptableObject data and animated with DOTween. Player locomotion is a state machine driven by the New Input System, and gameplay events use the Observer pattern instead of per-frame polling.
