'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

const navLinks = ['About', 'Skills', 'Projects', 'Resume', 'Contact']

export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          key="navbar"
          className="fixed top-0 inset-x-0 z-[100] flex items-center justify-between px-8 py-4"
          style={{
            backdropFilter: 'blur(14px)',
            backgroundColor: 'rgba(10,10,10,0.8)',
            borderBottom: '1px solid var(--border)',
          }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo */}
          <span className="font-bebas text-[20px] select-none">
            <span style={{ color: 'var(--fg)' }}>K</span>
            <span style={{ color: 'var(--muted)' }}>M</span>
          </span>

          {/* Center links — desktop */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <li key={link}>
                <button
                  onClick={() => scrollTo(link)}
                  className="text-[11px] uppercase tracking-[0.15em] transition-opacity hover:opacity-100"
                  style={{ color: 'var(--muted)' }}
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          {/* Right: toggle + hamburger */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[20px]"
              style={{ border: '1px solid var(--border)', color: 'var(--fg)' }}
            >
              ☯
            </button>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen(o => !o)}
              className="md:hidden flex flex-col gap-[5px] justify-center items-center w-8 h-8"
              aria-label="Menu"
            >
              <span
                className="block w-5 h-px transition-all"
                style={{
                  backgroundColor: 'var(--fg)',
                  transform: menuOpen ? 'rotate(45deg) translate(3px, 3px)' : '',
                }}
              />
              <span
                className="block w-5 h-px"
                style={{
                  backgroundColor: 'var(--fg)',
                  opacity: menuOpen ? 0 : 1,
                  transition: 'opacity 0.2s',
                }}
              />
              <span
                className="block w-5 h-px transition-all"
                style={{
                  backgroundColor: 'var(--fg)',
                  transform: menuOpen ? 'rotate(-45deg) translate(3px, -3px)' : '',
                }}
              />
            </button>
          </div>
        </motion.nav>
      )}

      {/* Mobile menu */}
      {visible && menuOpen && (
        <motion.div
          key="mobile-menu"
          className="fixed top-[65px] inset-x-0 z-[99] md:hidden flex flex-col items-center gap-6 py-8"
          style={{
            backdropFilter: 'blur(14px)',
            backgroundColor: 'rgba(10,10,10,0.95)',
            borderBottom: '1px solid var(--border)',
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-[13px] uppercase tracking-[0.15em]"
              style={{ color: 'var(--fg)' }}
            >
              {link}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
