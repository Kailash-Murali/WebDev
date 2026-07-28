'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

const links = ['About', 'Projects', 'Experience', 'Contact']

export default function Navbar() {
  const [show, setShow] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const goTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  const isLight = theme === 'light'
  const bg = isLight ? 'rgba(240,240,236,0.92)' : 'rgba(10,10,10,0.82)'
  const borderB = isLight ? '1px solid rgba(10,10,10,0.10)' : '1px solid var(--border)'
  const textColor = isLight ? '#0a0a0a' : 'var(--fg)'
  const mutedColor = isLight ? 'rgba(10,10,10,0.38)' : 'var(--muted)'
  const ringBorder = isLight ? '1px solid rgba(10,10,10,0.25)' : '1px solid var(--border)'

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.nav
            key="nav"
            className="fixed top-0 inset-x-0 z-[200] flex items-center justify-between px-8 py-4"
            style={{ backdropFilter: 'blur(14px)', background: bg, borderBottom: borderB }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <span className="font-bebas text-[20px] select-none">
              <span style={{ color: textColor }}>K</span>
              <span style={{ color: mutedColor }}>M</span>
            </span>

            <ul className="hidden md:flex items-center gap-8">
              {links.map(l => (
                <li key={l}>
                  <button
                    onClick={() => goTo(l)}
                    className="text-[11px] uppercase tracking-[0.15em]"
                    style={{ color: mutedColor }}
                    onMouseEnter={e => (e.currentTarget.style.color = textColor)}
                    onMouseLeave={e => (e.currentTarget.style.color = mutedColor)}
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ border: ringBorder, color: textColor, fontSize: 18 }}
              >
                ☯
              </button>
              <button
                onClick={() => setMenuOpen(o => !o)}
                className="md:hidden flex flex-col gap-[5px] w-8 h-8 justify-center items-center"
                aria-label="Menu"
              >
                {[
                  menuOpen ? 'rotate(45deg) translate(3px,3px)' : '',
                  '',
                  menuOpen ? 'rotate(-45deg) translate(3px,-3px)' : '',
                ].map((tf, i) => (
                  <span
                    key={i}
                    className="block w-5 h-px"
                    style={{
                      background: textColor,
                      transform: tf,
                      opacity: i === 1 && menuOpen ? 0 : 1,
                      transition: 'transform 0.2s, opacity 0.2s',
                    }}
                  />
                ))}
              </button>
            </div>
          </motion.nav>

          {menuOpen && (
            <motion.div
              key="mobile-nav"
              className="fixed top-[65px] inset-x-0 z-[199] md:hidden flex flex-col items-center gap-6 py-8"
              style={{ backdropFilter: 'blur(14px)', background: bg, borderBottom: borderB }}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {links.map(l => (
                <button key={l} onClick={() => goTo(l)} className="text-[13px] uppercase tracking-[0.15em]" style={{ color: textColor }}>
                  {l}
                </button>
              ))}
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}
