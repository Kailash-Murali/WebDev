'use client'

import { useState } from 'react'

const projects = [
  {
    num: '01',
    title: 'Bray-PPE',
    tags: ['Python', 'YOLOv8', 'Azure', 'React'],
    desc: 'Real-time YOLOv8 pipeline for PPE compliance detection. Azure-hosted, React dashboard.',
    privateBadge: 'Private · Bray International',
    link: null,
    collab: null,
  },
  {
    num: '02',
    title: 'Bray-LTP',
    tags: ['Python', 'LightGBM', 'Azure', 'React'],
    desc: 'LightGBM supply chain lead time predictor on Azure with React operations dashboard.',
    privateBadge: 'Private · Bray International',
    link: null,
    collab: null,
  },
  {
    num: '03',
    title: 'Kaavalan',
    tags: ['Python', 'Computer Vision', 'Surveillance'],
    desc: 'Smart surveillance with real-time object detection and intelligent alerting.',
    privateBadge: null,
    link: 'https://github.com/Kailash-Murali/kaavalan',
    collab: null,
  },
  {
    num: '04',
    title: 'Secure-Stego-UPI',
    tags: ['PyTorch', 'DCGAN', 'Cryptography', 'Biometrics'],
    desc: 'Coverless GAN steganography + biometric auth for tamper-evident UPI verification.',
    privateBadge: null,
    link: 'https://github.com/V4run05/Secure-Stego-UPI',
    collab: 'w/ V4run05',
  },
  {
    num: '05',
    title: 'Aram AI',
    tags: ['Python', 'Agentic AI', 'LegalTech'],
    desc: 'Explainable agentic AI for the Indian legal domain via conversational AI.',
    privateBadge: null,
    link: 'https://github.com/Kailash-Murali/learn-law-2.0',
    collab: null,
  },
]

function Card({ p }: { p: typeof projects[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="proj-card"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 24,
        borderRadius: 12,
        border: `1px solid ${hovered ? 'rgba(240,240,236,0.4)' : 'var(--border)'}`,
        background: 'var(--card)',
        minHeight: 220,
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Large number */}
      <span
        className="font-bebas"
        style={{
          position: 'absolute', top: 20, right: 20,
          fontSize: '2.8rem', color: 'var(--border)',
          lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
        }}
      >
        {p.num}
      </span>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingRight: 48 }}>
        <h3
          className="font-bebas"
          style={{ fontSize: 22, color: 'var(--fg)' }}
        >
          {p.title}
        </h3>

        <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>
          {p.desc}
        </p>

        {p.privateBadge && (
          <span
            className="pill"
            style={{
              alignSelf: 'flex-start',
              fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase',
              padding: '3px 8px', borderRadius: 4,
              border: '1px solid var(--border)', color: 'var(--muted)',
            }}
          >
            {p.privateBadge}
          </span>
        )}

        {p.link && (
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              alignSelf: 'flex-start',
              fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--muted)',
              borderBottom: '1px solid var(--border)',
              paddingBottom: 1,
            }}
          >
            View Repo →
          </a>
        )}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginTop: 16 }}>
        {p.tags.map(t => (
          <span
            key={t}
            className="pill"
            style={{
              fontSize: 10, letterSpacing: '0.07em', textTransform: 'uppercase',
              padding: '3px 8px', borderRadius: 4,
              border: '1px solid var(--border)', color: 'var(--muted)',
            }}
          >
            {t}
          </span>
        ))}
        {p.collab && (
          <span
            className="pill"
            style={{
              marginLeft: 'auto',
              fontSize: 10, letterSpacing: '0.07em', textTransform: 'uppercase',
              padding: '3px 8px', borderRadius: 99,
              border: '1px solid var(--border)', color: 'var(--muted)',
            }}
          >
            {p.collab}
          </span>
        )}
      </div>
    </div>
  )
}

export default function Projects() {
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
        03 / 05
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
            marginBottom: 40,
          }}
        >
          WHAT I&apos;VE BUILT
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 18,
          }}
        >
          {projects.map(p => <Card key={p.num} p={p} />)}
        </div>
      </div>
    </section>
  )
}
