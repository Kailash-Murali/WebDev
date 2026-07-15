'use client'

import { motion } from 'framer-motion'

const skills = ['Python', 'Java', 'C', 'C++', 'HTML', 'CSS', 'JavaScript', 'Quizzing']

export default function Skills() {
  return (
    <section
      id="skills"
      className="px-8 md:px-16 lg:px-24 py-24 md:py-36"
      style={{ backgroundColor: 'rgba(var(--fg-rgb), 0.03)' }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="font-bebas mb-12"
          style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--fg)' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
        >
          SKILLS
        </motion.h2>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              className="px-5 py-2 rounded-full text-[13px] uppercase tracking-[0.1em] cursor-default"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--muted)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                borderColor: 'var(--fg)',
                color: 'var(--fg)',
                boxShadow: 'inset 0 0 12px rgba(var(--fg-rgb), 0.08)',
              }}
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  )
}
