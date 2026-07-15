'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  onDone: () => void
}

export default function LoadingScreen({ onDone }: Props) {
  const [visible, setVisible] = useState(true)
  const [count, setCount] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    // Lock scroll
    document.documentElement.style.overflow = 'hidden'

    // Animate counter 0→100 over 1800ms
    const duration = 1800
    const steps = 100
    const stepTime = duration / steps
    let current = 0
    intervalRef.current = setInterval(() => {
      current += 1
      setCount(current)
      if (current >= 100) {
        clearInterval(intervalRef.current!)
      }
    }, stepTime)

    // Hide after 2200ms
    const hideTimer = setTimeout(() => {
      setVisible(false)
    }, 2200)

    return () => {
      clearInterval(intervalRef.current!)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={() => {
      document.documentElement.style.overflow = ''
      onDone()
    }}>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'var(--bg)' }}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* KM */}
          <div
            className="font-bebas select-none"
            style={{ fontSize: 120, color: 'var(--fg)', lineHeight: 1 }}
          >
            KM
          </div>

          {/* Line */}
          <div
            className="mt-6"
            style={{
              width: 200,
              height: 1,
              backgroundColor: 'var(--border)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                backgroundColor: 'var(--fg)',
                animation: 'loading-line 1.8s ease-in-out forwards',
              }}
            />
          </div>

          {/* Counter */}
          <div
            className="mt-4 font-bebas tracking-widest"
            style={{ fontSize: 14, color: 'var(--muted)', letterSpacing: '0.2em' }}
          >
            {String(count).padStart(3, '0')}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
