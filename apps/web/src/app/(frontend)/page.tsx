import React from 'react'

// Stage 0 skeleton — the "live, empty skeleton carrying the palette and type"
// (docs/STAGE-0-KICKOFF.md, Definition of Done). It renders nothing of the product
// (no Works, no vitrine, no membrane — those are Stages 1–2). Its only job is to prove
// the palette and the two typefaces are in place, in the register of the House:
// paper ground, ink text, a single red mark, hairline rules, generous space.

const page: React.CSSProperties = {
  maxWidth: '72ch',
  margin: '0 auto',
  padding: 'var(--space-8) var(--space-4)',
  minHeight: '100dvh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}

const kicker: React.CSSProperties = {
  fontFamily: 'var(--font-text), system-ui, sans-serif',
  fontSize: 'var(--step-meta)',
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--red)',
  margin: 0,
}

// The wordmark is ALWAYS the official PNG asset (wordmark-ink.png / wordmark-paper.png)
// and is NEVER set as live text (docs/04-DESIGN.md §5). Paper ground ⇒ the ink wordmark.
const wordmark: React.CSSProperties = {
  display: 'block',
  height: 'auto',
  width: 'clamp(13rem, 34vw, 22rem)',
  margin: 'var(--space-4) 0 0',
}

const standfirst: React.CSSProperties = {
  fontFamily: 'var(--font-text), system-ui, sans-serif',
  fontWeight: 300,
  fontSize: 'var(--step-lead)',
  maxWidth: 'var(--measure)',
  margin: 'var(--space-4) 0 0',
}

const rule: React.CSSProperties = {
  borderTop: 'var(--rule) solid var(--ink)',
  margin: 'var(--space-6) 0',
}

const specimenRow: React.CSSProperties = {
  display: 'flex',
  gap: 'var(--space-3)',
  flexWrap: 'wrap',
}

const swatch = (bg: string, fg: string): React.CSSProperties => ({
  flex: '1 1 8rem',
  minWidth: '8rem',
  background: bg,
  color: fg,
  border: 'var(--rule) solid var(--ink)',
  padding: 'var(--space-3)',
  fontFamily: 'var(--font-text), system-ui, sans-serif',
  fontSize: 'var(--step-meta)',
  lineHeight: 1.4,
})

const colophon: React.CSSProperties = {
  fontFamily: 'var(--font-text), system-ui, sans-serif',
  fontSize: 'var(--step-meta)',
  color: 'var(--ink)',
  margin: 0,
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
}

export default function Page() {
  return (
    <main style={page}>
      <p style={kicker}>Stage 0 — Foundation</p>

      {/* Official wordmark — PNG asset, never live type (§5). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/wordmark-ink.png" alt="Titanica" style={wordmark} />

      <p style={standfirst}>A House of Intelligence.</p>

      <hr style={rule} />

      {/* Palette specimen — proof the closed set is wired (no #FFFFFF anywhere). */}
      <div style={specimenRow} aria-label="Palette">
        <div style={swatch('var(--paper)', 'var(--ink)')}>
          Paper
          <br />
          #F2EEE5
        </div>
        <div style={swatch('var(--ink)', 'var(--paper)')}>
          Ink
          <br />
          #1C1A16
        </div>
        <div style={swatch('var(--red)', 'var(--paper)')}>
          Red
          <br />
          #C02D1C
        </div>
      </div>

      <hr style={rule} />

      {/* Type specimen — the two faces, and no third. */}
      <p style={{ ...kicker, color: 'var(--ink)' }}>Display — Bodoni Moda 500</p>
      <p className="display" style={{ fontSize: 'var(--step-h2)', margin: 'var(--space-2) 0 0' }}>
        Understanding remains rare.
      </p>
      <p style={{ ...kicker, color: 'var(--ink)', marginTop: 'var(--space-5)' }}>
        Text — Libre Franklin
      </p>
      <p style={{ maxWidth: 'var(--measure)', margin: 'var(--space-2) 0 0' }}>
        Information is now abundant. Access is no longer the problem. Judgment is. The
        interface withholds where the web would flourish, and the withholding reads as
        authority.
      </p>

      <hr style={rule} />

      <p style={colophon}>
        The skeleton stands. <span aria-hidden="true" style={{ color: 'var(--red)' }}>&rarr;</span>
      </p>
    </main>
  )
}
