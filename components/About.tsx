'use client'

export default function About() {
  return (
    <section
      style={{
        width: '100%', height: '100%',
        position: 'relative',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 'clamp(120px, 12vw, 200px)',
        paddingRight: 80,
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
        }}
      >
        02 / 05
      </span>

      {/* Heading */}
      <h2
        className="font-bebas"
        style={{
          fontSize: 'clamp(48px, 7vw, 96px)',
          color: 'var(--fg)',
          lineHeight: 1,
          marginBottom: 48,
        }}
      >
        WHO I AM
      </h2>

      {/* Two-column grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 56,
          alignItems: 'start',
        }}
      >
        {/* Left — image */}
        <div style={{ position: 'relative', paddingBottom: 14, paddingRight: 14 }}>
          {/* Ghost border offset */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              border: '1px solid var(--border)',
              clipPath: 'polygon(0 0, 100% 0, 96% 92%, 88% 100%, 0 100%)',
              transform: 'translate(14px, 14px)',
              pointerEvents: 'none',
              zIndex: -1,
            }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="./profile.jpg"
            alt="Kailash Murali T"
            style={{
              width: 260, height: 360,
              objectFit: 'cover',
              objectPosition: 'top',
              clipPath: 'polygon(0 0, 100% 0, 96% 92%, 88% 100%, 0 100%)',
              filter: 'grayscale(100%)',
              transition: 'filter 0.5s ease',
              display: 'block',
            }}
            onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0%)')}
            onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(100%)')}
          />
        </div>

        {/* Right — text */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '1rem',
              lineHeight: 1.9,
              color: 'var(--muted)',
              maxWidth: 520,
            }}
          >
            I&apos;m Kailash Murali T — a Computer Science (AI &amp; ML) student at VIT Chennai.
            I work at the intersection of machine learning, systems design, and product thinking.
            I&apos;ve interned at{' '}
            <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>Bray International</strong>
            {' '}and{' '}
            <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>Ashok Leyland</strong>,
            led finance for large-scale fests, and serve as Treasurer of the{' '}
            <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>VITC Quiz Club</strong>.
            Outside code, I&apos;m a passionate sports enthusiast and quizzer.
          </p>
        </div>
      </div>
    </section>
  )
}
