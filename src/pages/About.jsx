import { PrimaryCTA, Eyebrow, Reveal, Topo } from '../components/ui.jsx'
import mike from '../assets/mike.jpg'

const roles = ['Founder & CEO', 'Environmental Economist', 'AI Researcher', 'Housing Innovator', 'Natural Capital Strategist', 'University Researcher', 'Product Builder']

const nodes = [
  ['UBC', 'University research base in environmental and resource economics.', 'river'],
  ['Green Analytics', 'Founded — environmental economics and natural capital advisory.', 'forest'],
  ['Green Metrics', 'Founded — measurement and data for sustainability performance.', 'forest'],
  ['Open Housing Canada', 'Founded — housing innovation and supply systems.', 'copper'],
  ['Precision Livestock Diagnostics', 'Founded — AI diagnostics for animal agriculture.', 'copper'],
  ['Wolastoqey Forest Partnership', 'Strategic partner — Indigenous-led forest stewardship.', 'forest'],
]
const dot = { forest: 'bg-forest', river: 'bg-river', copper: 'bg-copper' }
const stroke = { forest: '#2E5E4E', river: '#355C7D', copper: '#B26E3A' }

// hexagon node coordinates around centre (500,280)
const pos = [
  [500, 86], [792, 188], [792, 372], [500, 474], [208, 372], [208, 188],
]

function PageHero() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div className="min-w-0">
          <Reveal><Eyebrow className="mb-6">About</Eyebrow></Reveal>
          <Reveal delay={0.05}><h1 className="t-hero text-balance text-ink">Mike Kennedy, PhD</h1></Reveal>
          <Reveal delay={0.1}>
            <p className="t-lead mt-6 max-w-prose text-muted">
              A scientist, economist and entrepreneur applying AI to the systems that shape communities, economies and ecosystems.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap gap-2">
              {roles.map((r) => (
                <span key={r} className="rounded-full border border-line px-3.5 py-1.5 text-[0.8rem] font-medium text-muted">{r}</span>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.12} className="lg:justify-self-end">
          <div className="overflow-hidden rounded-lg border border-line">
            <img src={mike} alt="Mike Kennedy, PhD — Founder, Redstone Studios" className="aspect-[4/4.6] w-full max-w-[400px] object-cover object-[50%_16%] grayscale-[0.85]" />
          </div>
        </Reveal>
      </div>
    </header>
  )
}

function Bio() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 lg:grid-cols-[0.4fr_1.6fr] lg:gap-16">
        <Reveal><Eyebrow>Background</Eyebrow></Reveal>
        <div className="max-w-prose space-y-6 text-[1.12rem] leading-relaxed text-ink/80">
          <Reveal delay={0.05}><p>Mike Kennedy, PhD is an environmental economist, AI researcher, entrepreneur and applied-technology builder with two decades of experience translating complex systems into practical tools that organizations can use.</p></Reveal>
          <Reveal delay={0.1}><p>His work spans environmental and resource economics, precision agriculture, housing policy and Indigenous forestry partnerships. He has founded and led ventures including <span className="font-medium text-ink">Green Analytics</span>, <span className="font-medium text-ink">Green Metrics</span>, <span className="font-medium text-ink">Open Housing Canada</span> and <span className="font-medium text-ink">Precision Livestock Diagnostics</span>, and serves as a strategic partner in the Wolastoqey Forest Partnership.</p></Reveal>
          <Reveal delay={0.15}><p>Through Redstone Studios, Mike brings doctoral-level rigor and hands-on entrepreneurial execution to every engagement — working directly with leaders to ground AI in real-world systems, not vendor promises.</p></Reveal>
        </div>
      </div>
    </section>
  )
}

function Ecosystem() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-paper2/60 px-6 py-20 md:px-10 md:py-28">
      <Topo className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 text-forest/[0.05]" />
      <div className="relative mx-auto max-w-content">
        <Reveal><Eyebrow className="mb-6">The ecosystem</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="t-h2 max-w-3xl text-ink">Not a resume — a connected system of ventures.</h2></Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-lg border border-line bg-paper p-4 md:p-8">
            <svg viewBox="0 0 1000 560" className="w-full" role="img" aria-label="Ecosystem map of Mike Kennedy's ventures and affiliations">
              {/* edges */}
              <g stroke="#cdc8ba" strokeWidth="1.25">
                {pos.map(([x, y], i) => <line key={i} x1="500" y1="280" x2={x} y2={y} />)}
              </g>
              {/* outer nodes */}
              {pos.map(([x, y], i) => (
                <g key={i}>
                  <circle cx={x} cy={y} r="30" fill="#F7F6F2" stroke={stroke[nodes[i][2]]} strokeWidth="2" />
                  <text x={x} y={y + 6} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="17" fontWeight="500" fill={stroke[nodes[i][2]]}>{i + 1}</text>
                </g>
              ))}
              {/* centre */}
              <circle cx="500" cy="280" r="58" fill="#2E5E4E" />
              <text x="500" y="274" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="600" fill="#F7F6F2">Mike</text>
              <text x="500" y="298" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="600" fill="#F7F6F2">Kennedy</text>
            </svg>
          </div>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {nodes.map(([name, desc, color], i) => (
            <Reveal key={name} delay={(i % 3) * 0.05}>
              <div className="flex gap-3.5 border-t border-line pt-4">
                <span className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${dot[color]} font-mono text-[0.72rem] font-medium text-paper`}>{i + 1}</span>
                <div>
                  <div className="text-[1rem] font-semibold text-ink">{name}</div>
                  <p className="mt-1 text-[0.92rem] leading-relaxed text-muted">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Quote() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-content">
        <Reveal>
          <blockquote className="max-w-4xl text-balance text-[clamp(1.5rem,1rem+1.6vw,2.25rem)] font-medium leading-[1.25] tracking-tight text-ink">
            <span className="text-forest">“</span>I keep a deliberately small client roster — so I'm directly involved in every engagement, start to finish.<span className="text-forest">”</span>
          </blockquote>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PrimaryCTA>Work With Us</PrimaryCTA>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <main>
      <PageHero />
      <Bio />
      <Ecosystem />
      <Quote />
    </main>
  )
}
