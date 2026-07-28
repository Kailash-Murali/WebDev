# Kailash Murali T — Portfolio

Stack: Next.js 14 · TypeScript · Tailwind CSS · Framer Motion  
Layout: Stacked fixed panels — no page scroll, knob-driven navigation  
Sections: Loader → Hero → About → Projects → Experience → Contact  
Projects: Bray-PPE (pvt) · Bray-LTP (pvt) · Kaavalan · Secure-Stego-UPI (w/ V4run05) · Aram AI  
Features: Card-stack leaf animation · Ghost knob nav · Custom cursor · ☯ toggle · Resume download  

## Setup

```bash
npm install
npm run dev   # → localhost:3000
```

**Note:** Add `profile.jpg` and `Resume.pdf` to `/public` before running.

## Navigation

- **Knob (left edge):** hover the left 48px of the screen to reveal the ghost knob assembly
  - Click the dial to advance panels; scroll wheel on the dial for prev/next
  - Click section pills to jump directly
- **Keyboard:** Arrow Down/Right = next · Arrow Up/Left = prev · 1–5 = jump to panel
- **Mobile:** tap ☰ at the left edge to toggle the knob
