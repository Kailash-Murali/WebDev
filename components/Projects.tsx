'use client'

import { motion } from 'framer-motion'

const projects = [
  {
    num: '01',
    title: 'Portfolio Website',
    desc: 'A premium portfolio based on the eternal truths of order and chaos.',
    tags: ['HTML', 'CSS', 'Next.js'],
    link: { label: 'View Old Portfolio →', href: 'https://github.com/Kailash-Murali/Portfolio' },
  },
  {
    num: '02',
    title: 'Facebook Clone',
    desc: 'Experimenting with the basic web development stack by cloning the Facebook page.',
    tags: ['HTML', 'CSS', 'JS'],
    link: null,
  },
  {
    num: '03',
    title: 'Image Compression + AI',
    desc: 'Coming soon.',
    tags: ['?'],
    link: null,
  },
]

export default function Projects() {
  return (
    <section id="projects" className="px-8 md:px-16 lg:px-24 py-24 md:py-36">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-bebas mb-12"
          style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--fg)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          PROJECTS
        </motion.h2>

        <div
          className="grid gap-6"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.num}
              className="relative flex flex-col justify-between p-6 rounded-[12px]"
              style={{
                border: '1px solid var(--border)',
                backgroundColor: 'var(--card)',
                minHeight: 220,
              }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{
                y: -4,
                borderColor: 'rgba(var(--fg-rgb), 0.3)',
                transition: { duration: 0.2 },
              }}
            >
              {/* Number top-right */}
              <span
                className="absolute top-5 right-6 font-bebas"
                style={{ fontSize: 36, color: 'var(--border)', lineHeight: 1 }}
              >
                {p.num}
              </span>

              <div className="flex flex-col gap-3 pr-12">
                <h3
                  className="font-bebas"
                  style={{ fontSize: 24, color: 'var(--fg)' }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>
                  {p.desc}
                </p>

                {/* Old portfolio link */}
                {p.link && (
                  <a
                    href={p.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="uppercase text-[11px] tracking-[0.1em] underline underline-offset-4"
                    style={{ color: 'var(--muted)' }}
                  >
                    {p.link.label}
                  </a>
                )}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {p.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-[0.08em] px-2 py-1 rounded"
                    style={{ border: '1px solid var(--border)', color: 'var(--muted)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
