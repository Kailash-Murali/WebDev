'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext'

const SECTIONS = ['Hero', 'About', 'Projects', 'Experience', 'Contact']

// Minor ticks between each pair of major section ticks
const MINOR_PER_GAP = 2

// Build full tick list: major (section) and minor (in-between)
type Tick = { type: 'major'; sectionIdx: number } | { type: 'minor' }
const TICKS: Tick[] = []
for (let i = 0; i < SECTIONS.length; i++) {
  TICKS.push({ type: 'major', sectionIdx: i })
  if (i < SECTIONS.length - 1) {
    for (let m = 0; m < MINOR_PER_GAP; m++) {
      TICKS.push({ type: 'minor' })
    }
  }
}
// Total: 5 major + 8 minor = 13 ticks

interface Props {
  activeIndex: number
  goTo: (i: number) => void
}

export default function PinNav({ activeIndex, goTo }: Props) {
  const [hoveredSection, setHoveredSection] = useState<number | null>(null)
  const [showTooltip,   setShowTooltip]    = useState<number | null>(null)
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      {/* ── Desktop tick nav ───────────────────────────────────── */}

      {/* Tooltip — appears to the left of the nav */}
      {showTooltip !== null && (
        <div
          className="pin-nav-desktop"
          style={{
            position: 'fixed',
            right: 40,
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 501,
            pointerEvents: 'none',
          }}
        >
          {(() => {
            const tickHeight = 10   // px per tick slot (line + gap)
            const totalTicks = TICKS.length
            const totalHeight = (totalTicks - 1) * tickHeight
            const sectionTickIdx = showTooltip * (MINOR_PER_GAP + 1)
            const offsetFromCenter = sectionTickIdx * tickHeight - totalHeight / 2

            return (
              <div style={{ transform: `translateY(${offsetFromCenter}px)` }}>
                <span style={{
                  display: 'inline-block',
                  background: 'var(--bg)',
                  color: 'var(--fg)',
                  fontSize: 11,
                  fontWeight: 500,
                  fontFamily: 'system-ui, -apple-system, "Segoe UI", sans-serif',
                  letterSpacing: '0.06em',
                  padding: '4px 10px',
                  borderRadius: 5,
                  border: '1px solid var(--border)',
                  whiteSpace: 'nowrap',
                }}>
                  {SECTIONS[showTooltip]}
                </span>
              </div>
            )
          })()}
        </div>
      )}

      {/* Tick column */}
      <div
        className="pin-nav-desktop"
        style={{
          position: 'fixed',
          right: 16,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 500,
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 6,
        }}
      >
        {TICKS.map((tick, idx) => {
          if (tick.type === 'major') {
            const si        = tick.sectionIdx
            const dist      = Math.abs(si - activeIndex)
            const isActive  = si === activeIndex
            const isHovered = hoveredSection === si

            const width = isActive
              ? 22
              : isHovered
                ? 16
                : dist === 1 ? 14 : dist === 2 ? 12 : 10

            const opacity = isActive
              ? 1
              : isHovered
                ? 0.72
                : dist === 1 ? 0.38 : dist === 2 ? 0.22 : 0.14

            const height = isActive ? 3 : 2

            return (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                aria-label={`Go to ${SECTIONS[si]}`}
                aria-pressed={isActive}
                onClick={() => goTo(si)}
                onMouseEnter={() => { setHoveredSection(si); setShowTooltip(si) }}
                onMouseLeave={() => { setHoveredSection(null); setShowTooltip(null) }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(si) }
                }}
                style={{
                  width: 28,     // generous hit area
                  height: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  cursor: 'pointer',
                  outline: 'none',
                }}
              >
                <div
                  style={{
                    width,
                    height,
                    background: 'var(--fg)',
                    opacity,
                    borderRadius: 2,
                    transition: 'width 0.2s ease, opacity 0.2s ease, background 0.4s ease',
                  }}
                />
              </div>
            )
          } else {
            // Minor tick — purely decorative, not clickable
            return (
              <div key={idx} style={{ width: 28, height: 8, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <div style={{ width: 6, height: 1.5, background: 'var(--tick-minor)', borderRadius: 1 }} />
              </div>
            )
          }
        })}

        {/* Theme Toggle Button */}
        <div
          role="button"
          tabIndex={0}
          aria-label="Toggle theme"
          onClick={toggleTheme}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTheme() }
          }}
          style={{
            marginTop: 12,
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            cursor: 'pointer',
            opacity: 0.5,
            transition: 'opacity 0.2s, transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
            fontSize: 23,
            outline: 'none',
            transformOrigin: 'right center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.transform = 'scale(1.4)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.5'
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          {theme === 'dark' ? '☯' : '☯'}
        </div>
      </div>

      {/* ── Mobile bottom dot nav ──────────────────────────────── */}
      <div
        className="pin-nav-mobile"
        style={{
          position: 'fixed',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 500,
          alignItems: 'center',
          gap: 10,
          padding: '8px 16px',
          borderRadius: 99,
          background: 'var(--knob-bg)',
          border: '1px solid var(--border)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {SECTIONS.map((name, si) => {
          const isActive = si === activeIndex
          return (
            <button
              key={si}
              aria-label={`Go to ${name}`}
              aria-pressed={isActive}
              onClick={() => goTo(si)}
              style={{
                width: isActive ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: 'var(--fg)',
                opacity: isActive ? 1 : 0.3,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 0.25s ease, opacity 0.25s ease',
                outline: 'none',
              }}
            />
          )
        })}

        {/* Theme toggle — mobile */}
        <div
          role="button"
          aria-label="Toggle theme"
          tabIndex={0}
          onClick={toggleTheme}
          onKeyDown={e => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTheme() }
          }}
          style={{
            marginLeft: 6,
            fontSize: 18,
            lineHeight: 1,
            cursor: 'pointer',
            opacity: 0.6,
            userSelect: 'none',
          }}
        >
          ☯
        </div>
      </div>
    </>
  )
}
