'use client'

import { useState } from 'react'
import LoadingScreen from '@/components/LoadingScreen'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Resume from '@/components/Resume'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Page() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <LoadingScreen onDone={() => setLoaded(true)} />
      {loaded && <Navbar />}
      <main>
        <Hero loaded={loaded} />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
