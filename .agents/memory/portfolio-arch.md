---
name: Portfolio architecture
description: Core layout decisions for Kailash Murali T portfolio — stacked panel system, knob nav, no scroll
---

## Layout
5 sections (Hero, About, Projects, Experience, Contact) are `position:fixed, inset:0` panels layered like a card deck.
`overflow:hidden` on both `html` and `body` — no scroll anywhere, ever.
`transform-origin: center bottom` on all panels so scale animations anchor to the bottom edge.

## Panel state machine
activeIndex drives 6 visual states per panel (derived from `diff = panelIndex - activeIndex`):
- active (diff=0): z:50, scale:1, y:0, opacity:1
- below-1..4 (diff=1..4): progressively smaller/lower/more opaque
- exited (diff<0): scale:1.04, y:'-100%', opacity:0

Framer Motion variants with inline `transition` per variant key; `initial={false}` so panels snap to start state on mount.

## Knob nav
Ghost component: `translateX(-100%)` by default, slides in when mouse enters the 48px trigger strip at left edge.
Show/hide logic uses `useRef` booleans (`overNav`, `overStrip`) to avoid race conditions — NOT `relatedTarget`.
Dial: 80×80px SVG outer tick ring (32 ticks, 5 major at section angles) + inner rotating knob (56×56px, nub indicator).
Major tick positions mapped to section indices: `MAJOR_TICK_BY_SECTION = [20, 26, 0, 6, 12]` (tick indices in 32-tick ring).
Inner knob rotation angles: [-135, -67.5, 0, 67.5, 135]° per section.

## CSS vars added beyond the base set
`--divider`, `--tick-major`, `--tick-minor`, `--cursor-ring`, `--knob-bg` — all theme-aware (dark/light).

## Keyboard nav
Arrow Down/Right → next; Arrow Up/Left → prev; 1–5 → jump. Listener in page.tsx useEffect with functional setState to avoid stale closure.

## Inner scroll
Projects and Experience have `overflow-y: auto` inner containers, NOT the panel itself. Contact and About also have inner containers for consistency.

**Why:** Spec forbids any panel-level scroll; only inner content areas may scroll.
