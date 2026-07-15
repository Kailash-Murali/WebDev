import type { Metadata } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { ThemeProvider } from '@/context/ThemeContext'
import CustomCursor from '@/components/CustomCursor'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Kailash Murali T — Portfolio',
  description: 'Developer · Quizzer · Creator',
  icons: { icon: '/logo.jpg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bebasNeue.variable} ${inter.variable}`}>
      <body>
        <ThemeProvider>
          <CustomCursor />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
