'use client'

import { motion } from 'framer-motion'

// Each marquee row: many copies of the text so it scrolls seamlessly
const makeRow = (text: string, isItalic: boolean) => {
  const copies = Array(12).fill(text)
  return copies.map((t, i) => (
    <span
      key={i}
      className="font-bebas px-8"
      style={{
        fontStyle: isItalic ? 'italic' : 'normal',
        fontSize: 'clamp(3rem, 6vw, 5.5rem)',
        color: 'var(--fg)',
      }}
    >
      {t}
    </span>
  ))
}

// Rows: 1,3,5 → left; 2,4 → right
// Text alternates Welcome (italic) / வணக்கம் (upright)
const rows = [
  { text: 'Welcome', italic: true, dir: 'left' },
  { text: 'வணக்கம்', italic: false, dir: 'right' },
  { text: 'Welcome', italic: true, dir: 'left' },
  { text: 'வணக்கம்', italic: false, dir: 'right' },
  { text: 'Welcome', italic: true, dir: 'left' },
]

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
})

export default function Hero({ loaded }: { loaded: boolean }) {
  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex flex-col justify-center"
      style={{ minHeight: '100svh' }}
    >
      {/* Layer 1 — marquee watermark */}
      <div
        className="absolute inset-0 z-0 flex flex-col justify-around overflow-hidden pointer-events-none"
        style={{ opacity: 0.07 }}
      >
        {rows.map((row, i) => (
          <div key={i} className="overflow-hidden">
            <div className={row.dir === 'left' ? 'marquee-left' : 'marquee-right'}>
              {makeRow(row.text, row.italic)}
              {/* Duplicate for seamless loop */}
              {makeRow(row.text, row.italic)}
            </div>
          </div>
        ))}
      </div>

      {/* Layer 2 — foreground content */}
      <div className="relative z-10 px-8 md:px-16 lg:px-24 pt-24">
        {loaded && (
          <>
            <motion.h1
              className="font-bebas leading-none"
              style={{
                fontSize: 'clamp(72px, 12vw, 160px)',
                color: 'var(--fg)',
              }}
              {...fadeUp(2.4)}
            >
              Hello, there!
            </motion.h1>

            <motion.p
              className="font-bebas"
              style={{
                fontSize: 'clamp(48px, 7vw, 96px)',
                color: 'var(--muted)',
                letterSpacing: '0.04em',
                lineHeight: 1,
              }}
              {...fadeUp(2.6)}
            >
              KAILASH MURALI
            </motion.p>

            <motion.p
              className="mt-4 uppercase tracking-[0.18em]"
              style={{ fontSize: 11, color: 'var(--muted)' }}
              {...fadeUp(2.8)}
            >
              Developer · Quizzer · Creator
            </motion.p>
          </>
        )}
      </div>

      {/* Scroll cue */}
      {loaded && (
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.6 }}
        >
          <div
            className="w-px"
            style={{
              height: 40,
              background: 'linear-gradient(to bottom, var(--fg), transparent)',
              animation: 'breathe 2s ease-in-out infinite',
            }}
          />
        </motion.div>
      )}
    </section>
  )
}
