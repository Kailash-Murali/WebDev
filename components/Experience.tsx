'use client'

const work = [
  {
    date: 'May 2026 – Jul 2026',
    role: 'AI Solutions Engineer',
    org: 'Bray International Inc.',
    detail: 'YOLOv8 PPE pipeline + LightGBM LTP predictor on Azure with React dashboards.',
  },
  {
    date: 'May 2025 – Jun 2025',
    role: 'Analytics Intern',
    org: 'Ashok Leyland, Chennai',
    detail: 'Fuzzy-match vehicle classification. AI governance per ISO 42001.',
  },
]

const leadership = [
  {
    date: 'Feb 2026',
    role: 'Finance Organiser',
    org: 'Vibrance 2026, VIT Chennai',
    detail: '140+ events, team of 8.',
  },
  {
    date: 'Oct 2025',
    role: 'Finance Coordinator',
    org: 'TechnoVIT 2025',
    detail: '120+ club events.',
  },
  {
    date: 'Jul 2025 – Mar 2026',
    role: 'Treasurer',
    org: 'VITC Quiz Club',
    detail: null,
  },
]

function Entry({ e }: { e: typeof work[0] }) {
  return (
    <div
      style={{
        position: 'relative',
        paddingLeft: 20,
        borderLeft: '1px solid var(--border)',
      }}
    >
      {/* Timeline dot */}
      <div
        style={{
          position: 'absolute',
          left: -5, top: 6,
          width: 9, height: 9,
          borderRadius: '50%',
          background: 'var(--fg)',
          boxShadow: '0 0 0 3px var(--bg)',
        }}
      />
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: 2,
        }}
      >
        {e.date}
      </p>
      <h4
        className="font-bebas"
        style={{ fontSize: 19, color: 'var(--fg)', lineHeight: 1.1 }}
      >
        {e.role}
      </h4>
      <p style={{ fontSize: 13, color: 'var(--muted)' }}>{e.org}</p>
      {e.detail && (
        <p
          style={{
            marginTop: 6,
            fontSize: 13,
            color: 'var(--muted)',
            opacity: 0.75,
            lineHeight: 1.6,
            fontFamily: 'var(--font-inter)',
          }}
        >
          {e.detail}
        </p>
      )}
    </div>
  )
}

export default function Experience() {
  return (
    <section
      style={{
        width: '100%', height: '100%',
        position: 'relative',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Section number */}
      <span
        className="font-bebas"
        style={{
          position: 'absolute', top: 32, right: 48,
          fontSize: 11, letterSpacing: '0.2em',
          color: 'var(--muted)', userSelect: 'none', pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        04 / 05
      </span>

      {/* Scrollable inner container */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '48px clamp(80px, 10vw, 160px) 48px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <h2
          className="font-bebas"
          style={{
            fontSize: 'clamp(48px, 7vw, 96px)',
            color: 'var(--fg)',
            lineHeight: 1,
            marginBottom: 48,
          }}
        >
          WHERE I&apos;VE BEEN
        </h2>

        {/* Two-column timeline */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
            marginBottom: 56,
          }}
        >
          {/* Work */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--muted)', marginBottom: 28,
              }}
            >
              Work Experience
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {work.map((e, i) => <Entry key={i} e={e} />)}
            </div>
          </div>

          {/* Leadership */}
          <div>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
                color: 'var(--muted)', marginBottom: 28,
              }}
            >
              Leadership
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
              {leadership.map((e, i) => <Entry key={i} e={e} />)}
            </div>
          </div>
        </div>

        {/* Resume download */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <a
            href="./Resume.pdf"
            download="Kailash_Murali_Resume.pdf"
            className="font-bebas"
            style={{
              fontSize: 14, letterSpacing: '0.15em',
              padding: '14px 40px',
              border: '1px solid var(--border)',
              borderRadius: 2,
              color: 'var(--fg)',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--fg)'
              e.currentTarget.style.color = 'var(--bg)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--fg)'
            }}
          >
            Download Résumé ↓
          </a>
        </div>
      </div>
    </section>
  )
}
