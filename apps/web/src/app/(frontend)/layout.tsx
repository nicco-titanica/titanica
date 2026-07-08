import React from 'react'
import type { Metadata } from 'next'
import { Bodoni_Moda, Libre_Franklin } from 'next/font/google'

import './styles.css'

// The two faces, and no third (docs/04-DESIGN.md §3).
// Bodoni Moda 500 — display only. Italic is loaded solely to lift one word in a
// headline (§3); it is never used for running text.
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
})

// Libre Franklin — all text. Only upright styles are loaded: Franklin is never italic (§3).
const franklin = Libre_Franklin({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal'],
  variable: '--font-text',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Titanica',
  description: 'A House of Intelligence.',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bodoni.variable} ${franklin.variable}`}>
      <body>{children}</body>
    </html>
  )
}
