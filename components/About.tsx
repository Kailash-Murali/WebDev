'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
})

export default function About() {
  return (
    <section id="about" className="px-8 md:px-16 lg:px-24 py-24 md:py-36">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Left: heading */}
        <motion.div {...fadeUp(0)}>
          <h2
            className="font-bebas leading-none"
            style={{ fontSize: 'clamp(48px, 7vw, 96px)', color: 'var(--fg)' }}
          >
            WHO I AM
          </h2>
        </motion.div>

        {/* Right: image + text */}
        <div className="flex flex-col gap-8">
          {/* Image with clip-path and ghost border */}
          <motion.div className="relative self-start" {...fadeUp(0.1)}>
            {/* Ghost border */}
            <div
              className="absolute"
              style={{
                inset: 0,
                border: '1px solid var(--border)',
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
                transform: 'translate(16px, 16px)',
              }}
            />
            {/* Image */}
            <div
              className="relative overflow-hidden group"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
                width: 260,
              }}
            >
              <Image
                src="/profile.jpg"
                alt="Kailash Murali T"
                width={260}
                height={320}
                style={{
                  filter: 'grayscale(100%)',
                  transition: 'filter 0.4s ease',
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'grayscale(0%)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'grayscale(100%)')}
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.p
            className="leading-relaxed"
            style={{ color: 'var(--muted)', fontSize: 15, maxWidth: 480 }}
            {...fadeUp(0.2)}
          >
            I&apos;m Kailash Murali T, an avid programmer and student at VIT Chennai.
            Stack: Python, Java, C/C++, HTML, CSS &amp; JS. Passionate about quizzing
            with multiple accolades.
          </motion.p>
        </div>
      </div>
    </section>
  )
}
