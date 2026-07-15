# Portfolio — Kailash Murali T

Premium personal portfolio rebuilt with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## How to run

The workflow "Start application" runs:

```
npm run dev
```

This starts Next.js on port 5000. No environment variables or secrets required.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Animation | Framer Motion |
| Fonts | Bebas Neue (display), Inter (body) via next/font |

## Project structure

```
app/
  globals.css       CSS vars, marquee keyframes, base reset
  layout.tsx        Root layout: fonts, ThemeProvider, CustomCursor
  page.tsx          Page: LoadingScreen + all sections

components/
  LoadingScreen.tsx 2.2s intro: KM, animated line, counter 000→100
  Navbar.tsx        Fixed navbar (appears after 60px scroll), ☯ toggle
  Hero.tsx          Full-height hero with marquee watermark + text
  About.tsx         Two-column: heading + profile image + bio
  Skills.tsx        Pill tags with stagger animation
  Projects.tsx      Card grid (3 projects)
  Resume.tsx        Vertical timeline (2 entries)
  Contact.tsx       Two-column: info + contact form (mailto fallback)
  Footer.tsx        Simple centered footer
  CustomCursor.tsx  10px dot + 36px ring cursor

context/
  ThemeContext.tsx  Dark/light toggle, persists to localStorage

public/
  profile.jpg       Profile photo
  logo.jpg          Favicon
```

## Design system

- **Dark mode (default):** `#0a0a0a` bg, `#f0f0ec` text
- **Light mode:** `#f0f0ec` bg, `#0a0a0a` text
- Toggle: class `light` on `<html>` via the ☯ button in the navbar
- Zero color — only black, white, and their opacities

## User preferences

_None recorded yet._
