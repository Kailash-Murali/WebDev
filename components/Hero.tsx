'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

const roles = ['Developer', 'Quizzer', 'Sports Enthusiast']

// Tamil characters sit in U+0B80–U+0BFF — use italic for all others (English)
const isEnglish = (w: string) => !/[\u0B80-\u0BFF]/.test(w)

function makeTrack(words: string[]) {
  // 4 repetitions for seamless -25% loop
  return Array(4).fill(words).flat().map((w, i) => (
    <span
      key={i}
      className="font-bebas whitespace-nowrap"
      style={{
        fontSize: 'clamp(3.2rem, 5.5vw, 5.2rem)',
        fontStyle: isEnglish(w) ? 'italic' : 'normal',
        color: 'var(--fg)',
        padding: '0 2rem',
        userSelect: 'none',
        pointerEvents: 'none',
      }}
    >
      {w}
    </span>
  ))
}

// Seven rows — alternating direction, different durations to prevent sync.
// All nine bilingual pairs distributed across rows.
const rowConfigs = [
  { words: ['Welcome', 'வணக்கம்', 'Tamilan', 'தமிழன்'],                          duration: 42, reverse: false },
  { words: ['Kalaignan', 'கலைஞன்', 'Football', 'விளையாட்டு'],                       duration: 36, reverse: true  },
  { words: ['Code', 'கணினி', 'Art', 'கலை', 'Anbu', 'அன்பு'],                     duration: 39, reverse: false },
  { words: ['Porupu', 'பொறுப்பு', 'Sirapu', 'சிறப்பு', 'Welcome', 'வணக்கம்'],    duration: 33, reverse: true  },
  { words: ['Tamilan', 'தமிழன்', 'Code', 'கணினி', 'Kalaignan', 'கலைஞன்'],          duration: 45, reverse: false },
  { words: ['Football', 'விளையாட்டு', 'Anbu', 'அன்பு', 'Art', 'கலை'],            duration: 30, reverse: true  },
  { words: ['Sirapu', 'சிறப்பு', 'Porupu', 'பொறுப்பு', 'Welcome', 'வணக்கம்'],    duration: 38, reverse: false },
]

export default function Hero({ loaded }: { loaded: boolean }) {
  const { theme } = useTheme()
  const mqOpacity = theme === 'light' ? 0.038 : 0.055

  return (
    <section
      style={{
        width: '100%', height: '100%',
        position: 'relative',
        background: 'var(--bg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Section number */}
      <span
        className="font-bebas"
        style={{
          position: 'absolute', top: 32, right: 48,
          fontSize: 11, letterSpacing: '0.2em',
          color: 'var(--muted)', userSelect: 'none', pointerEvents: 'none',
        }}
      >
        01 / 05
      </span>

      {/* Marquee background */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2px',
          overflow: 'hidden', pointerEvents: 'none',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? mqOpacity : 0 }}
        transition={{ duration: 1.2, delay: 2.3 }}
      >
        {rowConfigs.map((cfg, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.div
              style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content', willChange: 'transform' }}
              animate={{ x: cfg.reverse ? ['-25%', '0%'] : ['0%', '-25%'] }}
              transition={{ duration: cfg.duration, repeat: Infinity, ease: 'linear' }}
            >
              {makeTrack(cfg.words)}
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* Foreground content */}
      <div style={{ position: 'relative', zIndex: 1, paddingLeft: 'clamp(120px, 12vw, 200px)' }}>
        {loaded && (
          <>
            <motion.h1
              className="font-bebas"
              style={{
                fontSize: 'clamp(80px, 12vw, 160px)',
                lineHeight: 0.88,
                letterSpacing: '0.02em',
                color: 'var(--fg)',
              }}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 2.5 }}
            >
              KAILASH MURALI T
            </motion.h1>

            <div style={{ display: 'flex', alignItems: 'center', marginTop: 20 }}>
              {roles.map((role, i) => (
                <motion.div
                  key={role}
                  style={{ display: 'flex', alignItems: 'center' }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 2.8 + i * 0.08 }}
                >
                  {i > 0 && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: 1, height: 14,
                        background: 'var(--divider)',
                        margin: '0 16px',
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 12,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                    }}
                  >
                    {role}
                  </span>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
