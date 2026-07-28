'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

// ─── Geometry ────────────────────────────────────────────────────────────────
const R      = 200  // plate radius
const CY     = R    // dome pivot y in SVG coords (= plate center y)
const SVG_W  = R
const SVG_H  = 2 * R

// Blade angles: 0° = right (+x), positive = clockwise (SVG convention)
// Sections run top-to-bottom on the plate: -90° (up) → +90° (down)
const SECTION_ANGLES = [-90, -45, 0, 45, 90]  // degrees
const SECTIONS       = ['Hero', 'About', 'Projects', 'Experience', 'Contact']

const R_TICK_OUT = 180   // tick outer radius
const R_TICK_MAJ = 169   // major tick inner (11 px long)
const R_TICK_MIN = 175   // minor tick inner (5 px long)
const R_LABEL    = 146   // label text radius
// Pixelated 8-bit cursor: P = pixel size, CURSOR_X = start (past hub)
const P          = 5
const CURSOR_X   = 18
// 17 cols × 9 rows, pointing right; row 4 is the horizontal shaft (sits at CY)
const CURSOR_ROWS: number[][] = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],  // shaft
  [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
]
const R_DOME     = 46    // dome knob radius

// Pre-compute ticks: 5 major + 2 minor per gap = 13 total
type Tick = { deg: number; isMajor: boolean; sectionIdx?: number }
const TICKS: Tick[] = []
for (let i = 0; i < 5; i++) {
  TICKS.push({ deg: SECTION_ANGLES[i], isMajor: true, sectionIdx: i })
  if (i < 4) {
    TICKS.push({ deg: SECTION_ANGLES[i] + 15, isMajor: false })
    TICKS.push({ deg: SECTION_ANGLES[i] + 30, isMajor: false })
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const toRad = (d: number) => (d * Math.PI) / 180
const px    = (r: number, deg: number) => r * Math.cos(toRad(deg))
const py    = (r: number, deg: number) => r * Math.sin(toRad(deg))

/** SVG arc path from section A → B at radius r, centred on dome (0, CY) */
function glowPath(fromIdx: number, toIdx: number, r: number): string {
  const a1 = SECTION_ANGLES[fromIdx], a2 = SECTION_ANGLES[toIdx]
  const x1 = px(r, a1), y1 = CY + py(r, a1)
  const x2 = px(r, a2), y2 = CY + py(r, a2)
  // higher index → larger angle → clockwise in SVG (+y is down)
  const cw   = toIdx > fromIdx
  let   diff = a2 - a1
  if ( cw && diff <= 0) diff += 360
  if (!cw && diff >= 0) diff -= 360
  const large = Math.abs(diff) > 180 ? 1 : 0
  const sweep = cw ? 1 : 0
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${large} ${sweep} ${x2.toFixed(2)} ${y2.toFixed(2)}`
}

/** Shortest signed angular distance, normalised to (−180, 180] */
function normDiff(diff: number): number {
  diff = diff % 360
  if (diff >  180) diff -= 360
  if (diff < -180) diff += 360
  return diff
}

// ─── Component ───────────────────────────────────────────────────────────────
interface Props { activeIndex: number; goTo: (i: number) => void }

export default function KnobNav({ activeIndex, goTo }: Props) {
  const { toggleTheme } = useTheme()

  const [visible,      setVisible]      = useState(true)   // open on first load
  const [glow,         setGlow]         = useState<{ d: string; key: number } | null>(null)
  const [focusedLabel, setFocusedLabel] = useState<number | null>(null)
  const [bladeFocused, setBladeFocused] = useState(false)

  const bladeAngle = useMotionValue(SECTION_ANGLES[activeIndex])
  const prevIdx    = useRef(activeIndex)
  const overPanel  = useRef(false)
  const overStrip  = useRef(false)
  const panelRef   = useRef<HTMLDivElement>(null)
  const stripRef   = useRef<HTMLDivElement>(null)

  // Fix 1 – visible on load, retract after 1.6 s
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1600)
    return () => clearTimeout(t)
  }, [])

  // Fix 1 – hover-trigger show/hide
  const tryClose = useCallback(() => {
    if (!overPanel.current && !overStrip.current) setVisible(false)
  }, [])

  useEffect(() => {
    const strip = stripRef.current, panel = panelRef.current
    if (!strip || !panel) return
    const se = () => { overStrip.current = true;  setVisible(true) }
    const sl = () => { overStrip.current = false; tryClose() }
    const pe = () => { overPanel.current = true }
    const pl = () => { overPanel.current = false; tryClose() }
    strip.addEventListener('mouseenter', se)
    strip.addEventListener('mouseleave', sl)
    panel.addEventListener('mouseenter', pe)
    panel.addEventListener('mouseleave', pl)
    return () => {
      strip.removeEventListener('mouseenter', se)
      strip.removeEventListener('mouseleave', sl)
      panel.removeEventListener('mouseenter', pe)
      panel.removeEventListener('mouseleave', pl)
    }
  }, [tryClose])

  // Fix 3 – animate blade + glow on section change
  useEffect(() => {
    const prev = prevIdx.current
    if (prev === activeIndex) return
    prevIdx.current = activeIndex

    // Glow trail along swept arc
    setGlow({ d: glowPath(prev, activeIndex, R_TICK_OUT - 5), key: Date.now() })

    // Fix 3 – continuous forward rotation: 4→0 continues CW through the back of the plate
    const from = bladeAngle.get()
    let to: number
    if (prev === 4 && activeIndex === 0) {
      to = from + 180  // wrap forward: 90° + 180° = 270° ≡ −90°
    } else {
      to = from + normDiff(SECTION_ANGLES[activeIndex] - from)
    }
    animate(bladeAngle, to, { duration: 0.42, ease: [0.0, 0.0, 0.2, 1] })
  }, [activeIndex, bladeAngle])

  const advance = () => goTo(activeIndex === 4 ? 0 : activeIndex + 1)

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    goTo(e.deltaY > 0 ? Math.min(4, activeIndex + 1) : Math.max(0, activeIndex - 1))
  }

  // Label opacity by distance from active section
  const labelOpacity = (i: number) => {
    const d = Math.abs(i - activeIndex)
    return d === 0 ? 1 : d === 1 ? 0.42 : 0.18
  }

  const platePath = `M 0 0 A ${R} ${R} 0 0 1 0 ${SVG_H} Z`

  return (
    <>
      {/* Fix 2 – 64 px hover-trigger strip (generous, no dead zones) */}
      <div
        ref={stripRef}
        aria-hidden
        style={{
          position: 'fixed', left: 0, top: 0,
          width: 64, height: '100vh',
          zIndex: 499,
        }}
      />

      {/* Knob assembly */}
      <div
        ref={panelRef}
        style={{
          position: 'fixed', left: 0, top: '50%',
          transform: `translateY(-50%) translateX(${visible ? '0px' : `-${SVG_W}px`})`,
          transition: visible
            ? 'transform 0.42s cubic-bezier(0.34,1.2,0.64,1)'
            : 'transform 0.32s ease-in',
          zIndex: 500,
          width: SVG_W,
          height: SVG_H,
        }}
        onWheel={onWheel}
      >
        {/* Backdrop blur clipped to semicircle */}
        <div
          aria-hidden
          style={{
            position: 'absolute', inset: 0,
            clipPath: `path('${platePath}')`,
            background: 'rgba(8,8,8,0.90)',
            backdropFilter:         'blur(22px)',
            WebkitBackdropFilter:   'blur(22px)',
          }}
        />

        {/* ── SVG ── */}
        <svg
          width={SVG_W}
          height={SVG_H}
          style={{ position: 'relative', display: 'block', overflow: 'visible' }}
          role="navigation"
          aria-label="Section navigation"
        >
          <defs>
            <radialGradient id="kn-plate" cx="0%" cy="50%" r="100%">
              <stop offset="0%"   stopColor="#1e1e1e" />
              <stop offset="100%" stopColor="#090909" />
            </radialGradient>
            <radialGradient id="kn-dome" cx="30%" cy="26%" r="68%">
              <stop offset="0%"   stopColor="#2c2c2c" />
              <stop offset="55%"  stopColor="#141414" />
              <stop offset="100%" stopColor="#060606" />
            </radialGradient>
            <filter id="kn-edge" x="-5%" y="-2%" width="112%" height="104%">
              <feDropShadow dx="-1" dy="0" stdDeviation="5"
                floodColor="#000" floodOpacity="0.85" />
            </filter>
          </defs>

          {/* Plate fill */}
          <path d={platePath} fill="url(#kn-plate)" filter="url(#kn-edge)" />

          {/* Curved-edge highlight */}
          <path
            d={`M 0 0 A ${R} ${R} 0 0 1 0 ${SVG_H}`}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />

          {/* ── Tick marks ── */}
          {TICKS.map((t, i) => {
            const isActive = t.sectionIdx === activeIndex
            const inner    = t.isMajor ? R_TICK_MAJ : R_TICK_MIN
            return (
              <line
                key={i}
                x1={px(R_TICK_OUT, t.deg)}  y1={CY + py(R_TICK_OUT, t.deg)}
                x2={px(inner, t.deg)}        y2={CY + py(inner, t.deg)}
                strokeLinecap="round"
                stroke={
                  isActive  ? 'rgba(240,240,236,0.95)' :
                  t.isMajor ? 'rgba(240,240,236,0.30)' :
                               'rgba(240,240,236,0.09)'
                }
                strokeWidth={isActive ? 2.2 : t.isMajor ? 1.5 : 0.8}
              />
            )
          })}

          {/* ── Glow arc ── */}
          {glow && (
            <path
              key={glow.key}
              d={glow.d}
              fill="none"
              stroke="rgba(240,240,236,0.5)"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ animation: 'glow-fade 0.4s ease-out forwards' }}
            />
          )}

          {/* ── Labels (Fix 2 – large hit areas, keyboard, focus rings) ── */}
          {SECTIONS.map((name, i) => {
            const lx       = px(R_LABEL, SECTION_ANGLES[i])
            const ly       = CY + py(R_LABEL, SECTION_ANGLES[i])
            const isActive = i === activeIndex
            const isFocused = focusedLabel === i
            return (
              <g
                key={name}
                role="button"
                tabIndex={0}
                aria-label={`Go to ${name}`}
                aria-pressed={isActive}
                onClick={() => goTo(i)}
                onFocus={() => setFocusedLabel(i)}
                onBlur={() => setFocusedLabel(null)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goTo(i) }
                }}
                style={{ outline: 'none', cursor: 'none' }}
              >
                {/* Generous clickable ellipse */}
                <ellipse cx={lx} cy={ly} rx={38} ry={16} fill="transparent" />
                {/* Keyboard focus ring */}
                {isFocused && (
                  <ellipse
                    cx={lx} cy={ly} rx={40} ry={18}
                    fill="none"
                    stroke="rgba(240,240,236,0.45)"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                  />
                )}
                {/* Label text — horizontal/upright (no rotation needed) */}
                <text
                  x={lx} y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontFamily:     'var(--font-bebas, sans-serif)',
                    fontSize:       isActive ? 13 : 11,
                    fontWeight:     isActive ? 'bold' : 'normal',
                    fill:           'rgba(240,240,236,1)',
                    opacity:        labelOpacity(i),
                    letterSpacing:  '0.12em',
                    pointerEvents:  'none',
                    userSelect:     'none',
                  }}
                >
                  {name.toUpperCase()}
                </text>
              </g>
            )
          })}

          {/* ── Dome knob (half-visible at screen edge) ── */}
          <circle
            cx={0} cy={CY} r={R_DOME}
            fill="url(#kn-dome)"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1"
          />
          {/* Dome specular highlight */}
          <ellipse
            cx={12} cy={CY - 15} rx={14} ry={9}
            fill="rgba(255,255,255,0.06)"
            style={{ pointerEvents: 'none' }}
          />

          {/* ── Blade (Fix 2 hit area, Fix 3 rotation + press + glow) ── */}
          {/*    Paths in global SVG coords; transformOrigin = dome centre     */}
          <motion.g
            style={{
              rotate:          bladeAngle,
              transformOrigin: `0px ${CY}px`,
              cursor:          'none',
              outline:         'none',
            }}
            // Fix 3 – click-in press: scale 0.96, spring bounce on release
            whileTap={{ scale: 0.96 }}
            transition={{ scale: { type: 'spring', stiffness: 360, damping: 22 } }}
            role="button"
            tabIndex={0}
            aria-label="Click to advance to next section"
            onClick={advance}
            onFocus={() => setBladeFocused(true)}
            onBlur={() => setBladeFocused(false)}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ')               { e.preventDefault(); advance() }
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown')  goTo(Math.min(4, activeIndex + 1))
              if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')    goTo(Math.max(0, activeIndex - 1))
            }}
          >
            {/* Hit area covering full cursor extent */}
            <rect
              x={-10} y={CY - 4 * P - 8}
              width={CURSOR_X + 17 * P + 10} height={9 * P + 16}
              fill="transparent"
            />

            {/* Pixelated 8-bit cursor — right-pointing arrow, crispEdges */}
            <g transform={`translate(${CURSOR_X}, ${CY - 4 * P})`}>
              {CURSOR_ROWS.map((row, r) =>
                row.map((on, c) => on ? (
                  <rect
                    key={`${r}-${c}`}
                    x={c * P} y={r * P}
                    width={P} height={P}
                    fill="rgba(240,240,236,0.84)"
                    shapeRendering="crispEdges"
                  />
                ) : null)
              )}
            </g>

            {/* Hub circle (covers blade base) */}
            <circle
              cx={0} cy={CY} r={14}
              fill="#131313"
              stroke="rgba(255,255,255,0.16)"
              strokeWidth="1"
            />
            {/* Keyboard focus ring on hub */}
            {bladeFocused && (
              <circle
                cx={0} cy={CY} r={20}
                fill="none"
                stroke="rgba(240,240,236,0.45)"
                strokeWidth="1"
                strokeDasharray="4 3"
              />
            )}
          </motion.g>

          {/* ── Index counter ── */}
          <text
            x={14} y={26}
            style={{
              fontFamily:    'var(--font-bebas, sans-serif)',
              fontSize:       11,
              fill:          'rgba(240,240,236,0.36)',
              letterSpacing: '0.15em',
              userSelect:    'none',
              pointerEvents: 'none',
            }}
          >
            {String(activeIndex + 1).padStart(2, '0')}/05
          </text>

          {/* ── Theme toggle ── */}
          <g
            role="button"
            tabIndex={0}
            aria-label="Toggle theme"
            onClick={toggleTheme}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleTheme() }
            }}
            style={{ cursor: 'none', outline: 'none' }}
          >
            <circle cx={R - 22} cy={CY} r={16} fill="transparent" />
            <text
              x={R - 22} y={CY}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize:      14,
                fill:          'rgba(240,240,236,0.38)',
                userSelect:    'none',
                pointerEvents: 'none',
              }}
            >
              ☯
            </text>
          </g>
        </svg>
      </div>
    </>
  )
}
