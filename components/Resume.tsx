'use client'

import { motion } from 'framer-motion'

const entries = [
  {
    date: '2024 – Present',
    role: 'Web Developer',
    org: 'OSPC, VIT Chennai',
  },
  {
    date: '2023 – Present',
    role: 'Graduate Student',
    org: 'VIT Chennai',
  },
]

export default function Resume() {
  return (
    <section
      id="resume"
      className="px-8 md:px-16 lg:px-24 py-24 md:py-36"
      style={{ backgroundColor: 'rgba(var(--fg-rgb), 0.03)' }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.h2
          className="font-bebas mb-16 text-center"
          style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--fg)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          RESUME
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ backgroundColor: 'var(--border)' }}
          />

          <div className="flex flex-col gap-12">
            {entries.map((entry, i) => {
              const isOdd = i % 2 === 0 // odd entries (0-indexed 0,2,4…) slide from left
              return (
                <motion.div
                  key={i}
                  className={`relative flex items-center gap-8 ${isOdd ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: isOdd ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isOdd ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <p
                      className="text-[11px] uppercase tracking-[0.12em] mb-1"
                      style={{ color: 'var(--muted)' }}
                    >
                      {entry.date}
                    </p>
                    <h3
                      className="font-bebas"
                      style={{ fontSize: 22, color: 'var(--fg)' }}
                    >
                      {entry.role}
                    </h3>
                    <p style={{ fontSize: 13, color: 'var(--muted)' }}>{entry.org}</p>
                  </div>

                  {/* Dot */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
                    style={{
                      backgroundColor: 'var(--fg)',
                      boxShadow: '0 0 0 4px var(--bg)',
                    }}
                  />

                  {/* Empty half */}
                  <div className="flex-1" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
