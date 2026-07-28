'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [big, setBig] = useState(false)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.left = `${x - 5}px`
        dotRef.current.style.top  = `${y - 5}px`
      }
      if (ringRef.current) {
        const s = big ? 54 : 36
        ringRef.current.style.left = `${x - s / 2}px`
        ringRef.current.style.top  = `${y - s / 2}px`
      }
    }

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement
      setBig(!!el.closest('a, button, .proj-card, .pill'))
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [big])

  const ringSize = big ? 54 : 36

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed', zIndex: 9999,
          width: 10, height: 10,
          borderRadius: '50%',
          background: 'var(--fg)',
          pointerEvents: 'none',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed', zIndex: 9998,
          width: ringSize, height: ringSize,
          borderRadius: '50%',
          border: '1px solid var(--cursor-ring)',
          pointerEvents: 'none',
          transition: 'width 0.18s ease, height 0.18s ease',
        }}
      />
    </>
  )
}
