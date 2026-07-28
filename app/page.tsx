'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Loader from '@/components/Loader'
import KnobNav from '@/components/KnobNav'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Contact from '@/components/Contact'

// OxygenOS decelerate — snappy settle, no overshoot
const DECEL = [0.0, 0.0, 0.2, 1] as const

// OnePlus-style: incoming panels lift + un-tilt; outgoing panel tilts forward and peels off
const panelVariants = {
  active:    { scale: 1,    y: 0,       rotateX: 0,  opacity: 1,    transition: { duration: 0.5,  ease: DECEL } },
  'below-1': { scale: 0.96, y: 12,      rotateX: -2, opacity: 1,    transition: { duration: 0.5,  ease: DECEL } },
  'below-2': { scale: 0.92, y: 22,      rotateX: -3, opacity: 0.85, transition: { duration: 0.5,  ease: DECEL } },
  'below-3': { scale: 0.88, y: 30,      rotateX: -4, opacity: 0.7,  transition: { duration: 0.5,  ease: DECEL } },
  'below-4': { scale: 0.85, y: 36,      rotateX: -5, opacity: 0.55, transition: { duration: 0.5,  ease: DECEL } },
  // Exited: slight forward tilt + scale-down as it peels off the top
  exited:    { scale: 0.92, y: '-100%', rotateX: 3,  opacity: 0,    transition: { duration: 0.48, ease: DECEL } },
} as const

type VariantKey = keyof typeof panelVariants

function getVariant(diff: number): VariantKey {
  if (diff === 0) return 'active'
  if (diff === 1) return 'below-1'
  if (diff === 2) return 'below-2'
  if (diff === 3) return 'below-3'
  if (diff >= 4)  return 'below-4'
  return 'exited'
}

function getZIndex(diff: number): number {
  if (diff === 0) return 50
  if (diff === 1) return 49
  if (diff === 2) return 48
  if (diff === 3) return 47
  if (diff >= 4)  return 46
  return 45
}

export default function Page() {
  const [loaded, setLoaded]           = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const goTo = useCallback((i: number) => {
    setActiveIndex(Math.max(0, Math.min(4, i)))
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight')
        setActiveIndex(i => Math.min(4, i + 1))
      else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft')
        setActiveIndex(i => Math.max(0, i - 1))
      else if (['1', '2', '3', '4', '5'].includes(e.key))
        setActiveIndex(Number(e.key) - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />

      {loaded && (
        <>
          <KnobNav activeIndex={activeIndex} goTo={goTo} />

          {([0, 1, 2, 3, 4] as const).map(i => {
            const diff = i - activeIndex
            return (
              <motion.div
                key={i}
                initial={false}
                variants={panelVariants}
                animate={getVariant(diff)}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: getZIndex(diff),
                  // perspective applied to each panel's own transform chain
                  transformPerspective: 1000,
                  transformOrigin: 'center bottom',
                  willChange: 'transform, opacity',
                }}
              >
                {i === 0 && <Hero loaded={loaded} />}
                {i === 1 && <About />}
                {i === 2 && <Projects />}
                {i === 3 && <Experience />}
                {i === 4 && <Contact />}
              </motion.div>
            )
          })}
        </>
      )}
    </>
  )
}
