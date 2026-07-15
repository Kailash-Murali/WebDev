'use client'

import { motion } from 'framer-motion'
import { useState, FormEvent } from 'react'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1S4.98 2.12 4.98 3.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

interface FormState {
  name: string
  email: string
  message: string
}

interface Errors {
  name?: string
  email?: string
  message?: string
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})

  const validate = (): boolean => {
    const e: Errors = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (evt: FormEvent) => {
    evt.preventDefault()
    if (!validate()) return
    const mailto = `mailto:kailashmurali17@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
    window.open(mailto)
  }

  const field = (key: keyof FormState) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(f => ({ ...f, [key]: e.target.value }))
      if (errors[key]) setErrors(er => ({ ...er, [key]: undefined }))
    },
  })

  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${hasError ? 'var(--fg)' : 'var(--border)'}`,
    boxShadow: hasError ? '0 2px 8px rgba(var(--fg-rgb), 0.15)' : 'none',
    color: 'var(--fg)',
    fontSize: 14,
    padding: '10px 0',
    outline: 'none',
    width: '100%',
    transition: 'border-color 0.3s, box-shadow 0.3s',
  })

  return (
    <section id="contact" className="px-8 md:px-16 lg:px-24 py-24 md:py-36">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-bebas mb-16"
          style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--fg)' }}
          {...fadeUp(0)}
        >
          CONTACT
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Info */}
          <motion.div className="flex flex-col gap-6" {...fadeUp(0.1)}>
            <a
              href="mailto:kailashmurali17@gmail.com"
              className="flex items-center gap-3 text-[14px]"
              style={{ color: 'var(--muted)' }}
            >
              kailashmurali17@gmail.com
            </a>

            <div className="flex flex-col gap-4">
              <p className="text-[11px] uppercase tracking-[0.12em]" style={{ color: 'var(--muted)' }}>
                Social Links
              </p>
              <a
                href="https://www.linkedin.com/in/kailash-murali-t-66721b28b/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[14px] transition-opacity hover:opacity-100"
                style={{ color: 'var(--muted)' }}
              >
                <LinkedInIcon /> LinkedIn
              </a>
              <a
                href="https://github.com/Kailash-Murali"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[14px] transition-opacity hover:opacity-100"
                style={{ color: 'var(--muted)' }}
              >
                <GitHubIcon /> GitHub
              </a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            noValidate
            {...fadeUp(0.2)}
          >
            <div>
              <input
                type="text"
                placeholder="Your Name"
                style={inputStyle(!!errors.name)}
                {...field('name')}
              />
              {errors.name && (
                <p className="mt-1 text-[11px]" style={{ color: 'var(--muted)' }}>
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                style={inputStyle(!!errors.email)}
                {...field('email')}
              />
              {errors.email && (
                <p className="mt-1 text-[11px]" style={{ color: 'var(--muted)' }}>
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows={5}
                style={{ ...inputStyle(!!errors.message), resize: 'none' }}
                {...field('message')}
              />
              {errors.message && (
                <p className="mt-1 text-[11px]" style={{ color: 'var(--muted)' }}>
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="self-start px-8 py-3 text-[12px] uppercase tracking-[0.15em] transition-all"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--fg)',
                background: 'transparent',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = 'var(--fg)'
                el.style.color = 'var(--bg)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = 'transparent'
                el.style.color = 'var(--fg)'
              }}
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
