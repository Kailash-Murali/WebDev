'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const steps = 100
    const stepMs = 1800 / steps
    let n = 0
    const iv = setInterval(() => {
      n += 1
      setCount(n)
      if (n >= 100) clearInterval(iv)
    }, stepMs)

    const t = setTimeout(() => setVisible(false), 2200)

    return () => {
      clearInterval(iv)
      clearTimeout(t)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={() => {
      document.body.style.overflow = ''
      onDone()
    }}>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[1000] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg)' }}
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div
            className="font-bebas select-none"
            style={{ fontSize: 120, color: 'var(--fg)', lineHeight: 1 }}
          >
            KM
          </div>

          <div
            className="mt-6 overflow-hidden"
            style={{ width: 180, height: 1, background: 'var(--border)', position: 'relative' }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0, left: 0,
                height: '100%',
                background: 'var(--fg)',
                animation: 'loading-bar 1.8s ease-in-out forwards',
              }}
            />
          </div>

          <div
            className="mt-4 font-bebas tracking-widest"
            style={{ fontSize: 13, color: 'var(--muted)', letterSpacing: '0.2em' }}
          >
            {String(count).padStart(3, '0')}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
