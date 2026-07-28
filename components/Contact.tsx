'use client'

import { useState, FormEvent } from 'react'

function EmailSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  )
}

function LinkedInSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1S4.98 2.12 4.98 3.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z" />
    </svg>
  )
}

function GitHubSVG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

type Fields = { name: string; email: string; message: string }
type Errs   = Partial<Record<keyof Fields, string>>

const inputBase: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--border)',
  color: 'var(--fg)',
  fontFamily: 'var(--font-inter)',
  fontSize: 14,
  padding: '10px 0',
  outline: 'none',
  width: '100%',
}

export default function Contact() {
  const [form, setForm] = useState<Fields>({ name: '', email: '', message: '' })
  const [errs, setErrs] = useState<Errs>({})

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    setErrs(er => ({ ...er, [k]: undefined }))
  }

  const validate = (): boolean => {
    const e: Errs = {}
    if (!form.name.trim())  e.name    = 'Name required'
    if (!form.email.trim()) e.email   = 'Email required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message required'
    setErrs(e)
    return !Object.keys(e).length
  }

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    window.open(
      `mailto:kailashmurali17@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    )
  }

  const links = [
    { icon: <EmailSVG />,    label: 'kailashmurali17@gmail.com',                          href: 'mailto:kailashmurali17@gmail.com' },
    { icon: <LinkedInSVG />, label: 'LinkedIn',                                            href: 'https://www.linkedin.com/in/kailash-murali-t-66721b28b/' },
    { icon: <GitHubSVG />,   label: 'GitHub',                                              href: 'https://github.com/Kailash-Murali' },
  ]

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
        05 / 05
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
          SAY HELLO
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 48,
          }}
        >
          {/* Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {links.map(item => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  fontFamily: 'var(--font-inter)',
                  fontSize: 14, color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--fg)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--muted)')}
              >
                {item.icon}
                {item.label}
              </a>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={submit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {(['name', 'email'] as const).map(k => (
              <div key={k}>
                <input
                  type={k === 'email' ? 'email' : 'text'}
                  placeholder={k === 'name' ? 'Your Name' : 'Your Email'}
                  value={form[k]}
                  onChange={set(k)}
                  style={{
                    ...inputBase,
                    borderBottomColor: errs[k] ? 'var(--fg)' : 'var(--border)',
                  }}
                />
                {errs[k] && (
                  <p style={{ marginTop: 4, fontSize: 11, color: 'var(--fg)', opacity: 0.7, fontFamily: 'var(--font-inter)' }}>
                    {errs[k]}
                  </p>
                )}
              </div>
            ))}
            <div>
              <textarea
                placeholder="Your Message"
                rows={5}
                value={form.message}
                onChange={set('message')}
                style={{
                  ...inputBase,
                  resize: 'none',
                  borderBottomColor: errs.message ? 'var(--fg)' : 'var(--border)',
                }}
              />
              {errs.message && (
                <p style={{ marginTop: 4, fontSize: 11, color: 'var(--fg)', opacity: 0.7, fontFamily: 'var(--font-inter)' }}>
                  {errs.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              style={{
                alignSelf: 'flex-start',
                fontFamily: 'var(--font-inter)',
                fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '12px 32px',
                border: '1px solid var(--border)',
                color: 'var(--fg)',
                background: 'transparent',
                cursor: 'none',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--fg)'; e.currentTarget.style.color = 'var(--bg)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--fg)' }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
