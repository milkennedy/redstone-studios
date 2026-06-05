import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { PrimaryCTA, Eyebrow, Reveal, Topo, EASE } from '../components/ui.jsx'
import mike from '../assets/mike.jpg'
import signature from '../assets/signature.png'

/* Role chips — direct links open in a new tab; chips with `links` open a popover */
const UBC_URL = 'https://dais.chbe.ubc.ca/people/michael-kennedy/'
const roles = [
  {
    label: 'Founder & CEO',
    links: [
      { name: 'Green Analytics', url: 'https://www.greenanalytics.ca/' },
      { name: 'Green Metrics Technology', url: 'https://www.greenmetrics.ca/' },
      { name: 'Precision Livestock Diagnostics', url: 'https://www.precisionlivestockdiagnostics.com/' },
      { name: 'Nature Capital Group', soon: true },
      { name: 'Wolastoqey Forest Partnership', soon: true },
      { name: 'IMPACT', url: 'https://biximpact.com/' },
    ],
  },
  {
    label: 'Environmental Economist',
    note: 'Two decades of environmental and resource economics — explore the practice at Green Analytics.',
    links: [{ name: 'Visit Green Analytics', url: 'https://www.greenanalytics.ca/' }],
  },
  {
    label: 'AI Researcher',
    links: [
      { name: 'UBC — Data Analytics & Intelligent Systems Lab', url: UBC_URL },
      { name: 'Open Housing Canada', url: 'https://openhousingcanada.ca/' },
      { name: 'Green Metrics Technology', url: 'https://www.greenmetrics.ca/' },
    ],
  },
  {
    label: 'Housing Innovator',
    links: [
      { name: 'BuildBlox', url: 'https://buildblox.ca' },
      { name: 'Open Housing Canada', url: 'https://openhousingcanada.ca/' },
    ],
  },
  {
    label: 'Natural Capital Strategist',
    links: [
      { name: 'Birch Natural Assets', url: 'https://www.birchassets.ca/' },
      { name: 'Green Analytics', url: 'https://www.greenanalytics.ca/' },
      { name: 'IMPACT', url: 'https://biximpact.com/' },
      { name: 'Wolastoqey Forest Partnership', soon: true },
    ],
  },
  {
    label: 'University Researcher',
    links: [
      { name: 'UBC — Data Analytics & Intelligent Systems Lab', url: UBC_URL },
      { name: 'Open Housing Canada', url: 'https://openhousingcanada.ca/' },
    ],
  },
  {
    label: 'Product Builder',
    links: [
      { name: 'BuildBlox', url: 'https://buildblox.ca' },
      { name: 'BuildSense', url: 'https://www.greenmetrics.ca/buildsenseai' },
      { name: 'Precision Livestock Diagnostics', url: 'https://www.precisionlivestockdiagnostics.com/' },
      { name: 'Birch', url: 'https://www.birchassets.ca/' },
      { name: 'IMPACT', url: 'https://biximpact.com/' },
    ],
  },
]

function RoleChips() {
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (open == null) return
    const close = () => setOpen(null)
    document.addEventListener('click', close)
    const esc = (e) => { if (e.key === 'Escape') setOpen(null) }
    document.addEventListener('keydown', esc)
    return () => { document.removeEventListener('click', close); document.removeEventListener('keydown', esc) }
  }, [open])

  const chip = 'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[0.8rem] font-medium transition-colors duration-200'

  return (
    <div className="mt-8 flex flex-wrap gap-2">
      {roles.map((r, i) =>
        r.url ? (
          <a
            key={r.label}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${chip} border-line text-muted hover:border-forest/50 hover:text-ink`}
          >
            {r.label}
            <ArrowUpRight size={12} className="text-forest" />
          </a>
        ) : (
          <div key={r.label} className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setOpen(open === i ? null : i) }}
              className={`${chip} ${open === i ? 'border-forest/60 text-ink' : 'border-line text-muted hover:border-forest/50 hover:text-ink'}`}
              aria-expanded={open === i}
            >
              {r.label}
              <span className={`text-forest transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`} aria-hidden="true">▾</span>
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: EASE }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute left-0 top-full z-50 mt-2 w-72 rounded-lg border border-line bg-paper p-4 shadow-[0_12px_32px_rgba(17,19,21,0.10)]"
                >
                  {r.note && <p className="mb-3 text-[0.85rem] leading-relaxed text-muted">{r.note}</p>}
                  <ul className="space-y-2.5">
                    {r.links.map((l) =>
                      l.soon ? (
                        <li key={l.name} className="flex items-center justify-between gap-3 text-[0.88rem] text-muted2">
                          {l.name}
                          <span className="label shrink-0 text-[0.62rem] text-muted2">Coming soon</span>
                        </li>
                      ) : (
                        <li key={l.name}>
                          <a
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between gap-3 text-[0.88rem] font-medium text-ink transition-colors hover:text-forest"
                          >
                            {l.name}
                            <ArrowUpRight size={13} className="shrink-0 text-forest transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      )}
    </div>
  )
}

// Ecosystem ventures — summaries drawn from Mike's CV (2026)
const VENTURES = [
  {
    name: 'UBC',
    url: 'https://dais.chbe.ubc.ca/people/michael-kennedy/',
    kind: 'Research & Training',
    role: 'Research Associate — Data Analytics & Intelligent Systems Lab',
    years: '2018 – Present',
    color: 'river',
    summary:
      'Directs applied research on AI for sustainability, smart-infrastructure data systems, and the commercialization pathway for university-led technology.',
    highlights: [
      'Built and led the Urban Data Lab — one of Canada’s largest campus-as-a-living-lab sustainability data programs',
      'Supervises applied research with 25+ Master’s students per year across UBC and BCIT',
      'Co-author, “AI for Sustainability” — International Journal of Information Management (2020)',
    ],
  },
  {
    name: 'Green Analytics',
    url: 'https://www.greenanalytics.ca/',
    role: 'Founder & President',
    years: '2010 – Present',
    color: 'forest',
    summary:
      'Environmental economics and applied AI firm serving federal, provincial, municipal and Indigenous clients — translating environmental science into systems that produce measurable economic value.',
    highlights: [
      '50+ commissioned studies for federal departments, provincial ministries, conservation authorities and industry',
      'Recurring research partner to Natural Resources Canada, ECCC and the Federation of Canadian Municipalities',
      'Employee-oriented, B Corp-aligned multidisciplinary team operating at national scale',
    ],
  },
  {
    name: 'Green Metrics',
    url: 'https://www.greenmetrics.ca/',
    role: 'Founder & CTO',
    years: '2016 – Present',
    color: 'forest',
    summary:
      'AI-enabled housing technology company building digital operating systems for housing delivery — leading product strategy and engineering across the BuildBlox and BuildSense platforms.',
    highlights: [
      'BuildBlox — parcel intelligence and project origination for laneway, infill and offsite housing',
      'BuildSense — building intelligence unifying code, energy, carbon and retrofit data',
      'Active commercialization with manufacturers, municipalities and Indigenous partners across Western Canada',
    ],
  },
  {
    name: 'Open Housing Canada',
    url: 'https://openhousingcanada.ca/',
    kind: 'Not-for-Profit Corporation',
    role: 'Co-Founder · Director, Governance & Strategy',
    years: '2024 – Present',
    color: 'copper',
    summary:
      'Non-profit building open data infrastructure and an AI commons for Canadian housing delivery — leading strategy on DASH: Digitally Accelerated Standardized Housing.',
    highlights: [
      'Leading DASH 2.0 in partnership with CMHC and BC Housing (2026)',
      'Standardized plans, digital permitting and AI-enabled municipal workflows',
      'Presented to the federal Minister of Housing and the Bank of Canada',
    ],
  },
  {
    name: 'Precision Livestock Diagnostics',
    url: 'https://www.precisionlivestockdiagnostics.com/',
    role: 'Founder & Strategic Lead',
    years: '2023 – Present',
    color: 'copper',
    summary:
      'Precision-agriculture venture applying computer vision, drone monitoring and edge AI to livestock health and productivity across swine, poultry and beef operations.',
    highlights: [
      'Business partners span veterinarians, hardware manufacturers and livestock producers',
      'Backed by start-up capital from founding shareholders',
      'Technology at TRL 10 — deployed in commercial operations',
      'Principal Investigator — CAAIN project on digital automation in swine finishing',
    ],
  },
  {
    name: 'Wolastoqey Forest Partnership',
    soon: true,
    role: 'Co-Founder & Strategic Lead',
    years: '2024 – Present',
    color: 'forest',
    summary:
      'Indigenous-led forest carbon and natural capital initiative operationalizing improved forest management, biodiversity readiness and private-land stewardship across the traditional territory of the Wolastoqey Nation.',
    highlights: [
      '25,000+ acres of private woodlots under management',
      'Co-Lead — Indigenous Services Canada seed grant (2026)',
      'Structuring private-land carbon and biodiversity-market systems in Atlantic Canada',
    ],
  },
  {
    name: 'Nature Capital Group',
    url: 'https://carellacapitalcorp.com/',
    linkLabel: 'Visit Carella Capital',
    kind: 'Investment Partnership',
    role: 'Partner — with Fab Carella, Carella Capital Corp',
    color: 'river',
    summary:
      'Investment partnership between Mike Kennedy and Fab Carella (Carella Capital Corp) taking long-term positions to advance forest, agriculture, grassland, and marine and water conservation.',
    highlights: [
      'Patient, long-term capital aligned with conservation outcomes',
      'Focus areas — forests, agriculture, grasslands, marine and water systems',
      'Partnership with Carella Capital Corp',
    ],
  },
]

// Centre node — shown by default and when the hub is clicked
const HUB = {
  name: 'Mike Kennedy, PhD',
  role: 'Founder, applied AI strategist & environmental economist',
  years: '16 years cross-sector',
  color: 'forest',
  summary:
    'Canadian entrepreneur building operational systems for housing delivery, environmental markets and industrial modernization — recognized for translating advanced research into deployable products at the intersection of technology, regulation and community.',
  highlights: [
    'Founder of multiple Canadian technology ventures',
    'Major competitive research grants led or co-led across housing, agriculture and natural capital',
    'PhD, Business Information Systems — Washington State University',
  ],
}

const dot = { forest: 'bg-forest', river: 'bg-river', copper: 'bg-copper' }
const stroke = { forest: '#2E5E4E', river: '#355C7D', copper: '#B26E3A' }

// ring node coordinates around centre (500,280)
const pos = [
  [500, 86], [735, 159], [792, 323], [630, 455], [370, 455], [208, 323], [266, 159],
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
            <RoleChips />
          </Reveal>
        </div>
        <Reveal delay={0.12} className="lg:justify-self-end">
          <figure>
            <div className="overflow-hidden rounded-lg border border-line">
              <img src={mike} alt="Mike Kennedy, PhD — Applied AI Innovation Studio" className="aspect-[4/4.6] w-full max-w-[400px] object-cover object-[50%_16%] grayscale-[0.85]" />
            </div>
            <figcaption className="label mt-3 text-muted2">June 4th, 2026</figcaption>
          </figure>
        </Reveal>
      </div>
    </header>
  )
}

function Bio() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 lg:grid-cols-[0.4fr_1.6fr] lg:gap-16">
        <Reveal><Eyebrow>About Mike Kennedy</Eyebrow></Reveal>
        <div className="max-w-prose space-y-6 text-[1.12rem] leading-relaxed text-ink/80">
          <Reveal delay={0.05}><p>I have spent my career bringing together people, data, technology, and capital to solve complex problems.</p></Reveal>
          <Reveal delay={0.08}><p>As an entrepreneur, researcher, and technology builder, I work at the intersection of artificial intelligence, housing, natural resources, agriculture, energy, and environmental stewardship. My focus is simple: helping organizations make better decisions and create lasting value for people, communities, and the planet.</p></Reveal>
          <Reveal delay={0.11}><p>Over the past twenty years, I have founded companies, launched products, led research initiatives, and built partnerships across industry, government, academia, and Indigenous communities. From improving housing delivery and natural asset management to advancing precision agriculture and applied AI, my work is grounded in turning ideas into practical solutions that deliver measurable outcomes.</p></Reveal>
          <Reveal delay={0.14}><p>I believe the most meaningful progress happens when talented people come together around a shared purpose. Whether I am building a company, supporting a community initiative, mentoring future leaders, or working with clients, my goal is the same: leave things better than I found them.</p></Reveal>
          <Reveal delay={0.17}><p>At the end of the day, I am a father, partner, coach, entrepreneur, and lifelong learner who believes that technology should serve people, strengthen communities, and create opportunities for future generations.</p></Reveal>
          <Reveal delay={0.2}>
            <div className="pt-6">
              <img src={signature} alt="Mike Kennedy's signature" className="h-24 w-auto" style={{ mixBlendMode: 'multiply' }} />
              <div className="label mt-3 text-muted2">Mike Kennedy, PhD · Vancouver, BC</div>
              <p className="mt-8 max-w-prose border-t border-line pt-6 text-[0.92rem] leading-relaxed text-muted">
                I acknowledge that I live and work on the traditional, ancestral, and unceded territory of the xʷməθkʷəy̓əm (Musqueam), Sḵwx̱wú7mesh (Squamish), and səlilwətaɬ (Tsleil-Waututh) Nations.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Ecosystem() {
  const [sel, setSel] = useState(null)
  const active = sel == null ? HUB : VENTURES[sel]

  return (
    <section className="relative overflow-hidden border-y border-line bg-paper2/60 px-6 py-20 md:px-10 md:py-28">
      <Topo className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 text-forest/[0.05]" />
      <div className="relative mx-auto max-w-content">
        <Reveal><Eyebrow className="mb-6">The ecosystem</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="t-h2 max-w-3xl text-ink">Not a resume — a connected system of ventures, research and partnerships.</h2></Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            {/* Interactive map */}
            <div className="overflow-hidden rounded-lg border border-line bg-paper p-4 md:p-6">
              <svg viewBox="0 0 1000 560" className="w-full" aria-label="Interactive ecosystem map of Mike Kennedy's ventures — select a circle to view details">
                {/* edges */}
                {pos.map(([x, y], i) => (
                  <line
                    key={i} x1="500" y1="280" x2={x} y2={y}
                    stroke={sel === i ? stroke[VENTURES[i].color] : '#cdc8ba'}
                    strokeWidth={sel === i ? 1.75 : 1.25}
                    style={{ transition: 'stroke 0.25s' }}
                  />
                ))}
                {/* outer nodes */}
                {pos.map(([x, y], i) => {
                  const v = VENTURES[i]
                  const on = sel === i
                  return (
                    <g
                      key={v.name}
                      className="cursor-pointer"
                      onClick={() => setSel(i)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(i) } }}
                      aria-label={`View ${v.name}`}
                    >
                      <circle cx={x} cy={y} r="44" fill="transparent" />
                      <circle
                        cx={x} cy={y} r={on ? 34 : 30}
                        fill={on ? stroke[v.color] : '#F7F6F2'}
                        stroke={stroke[v.color]} strokeWidth="2"
                        style={{ transition: 'all 0.25s' }}
                      />
                      <text x={x} y={y + 6} textAnchor="middle" fontFamily="'IBM Plex Mono', monospace" fontSize="17" fontWeight="500" fill={on ? '#F7F6F2' : stroke[v.color]} style={{ transition: 'fill 0.25s' }}>{i + 1}</text>
                    </g>
                  )
                })}
                {/* centre — click to return to the hub view */}
                <g
                  className="cursor-pointer"
                  onClick={() => setSel(null)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSel(null) } }}
                  aria-label="View Mike Kennedy overview"
                >
                  {sel == null && <circle cx="500" cy="280" r="68" fill="none" stroke="#2E5E4E" strokeWidth="1.5" opacity="0.45" />}
                  <circle cx="500" cy="280" r="58" fill="#2E5E4E" />
                  <text x="500" y="274" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="600" fill="#F7F6F2">Mike</text>
                  <text x="500" y="298" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="600" fill="#F7F6F2">Kennedy</text>
                </g>
              </svg>
              {/* chip navigation */}
              <div className="mt-4 flex flex-wrap gap-2 border-t border-line pt-4">
                {VENTURES.map((v, i) => (
                  <button
                    key={v.name}
                    onClick={() => setSel(i)}
                    className={`rounded-full border px-3.5 py-1.5 text-[0.78rem] font-medium transition-colors duration-200 ${
                      sel === i ? `border-transparent ${dot[v.color]} text-paper` : 'border-line text-muted hover:text-ink'
                    }`}
                  >
                    {i + 1} · {v.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Detail panel */}
            <div className="rounded-lg border border-line bg-paper p-7 md:p-8 lg:min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={sel ?? 'hub'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: EASE }}
                >
                  <div className="flex items-center gap-3">
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${dot[active.color]} font-mono text-[0.78rem] font-medium text-paper`}>
                      {sel == null ? '·' : sel + 1}
                    </span>
                    <span className="label text-muted2">{sel == null ? 'The hub' : (active.kind || 'Venture')}</span>
                  </div>
                  <h3 className="t-h3 mt-5 text-ink">{active.name}</h3>
                  <div className="label mt-2 text-muted">{active.role}{active.years ? ` · ${active.years}` : ''}</div>
                  <p className="mt-5 text-[0.98rem] leading-relaxed text-muted">{active.summary}</p>
                  <ul className="mt-6 space-y-2.5">
                    {active.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-[0.92rem] leading-relaxed text-muted">
                        <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${dot[active.color]}`} />{h}
                      </li>
                    ))}
                  </ul>
                  {active.soon && (
                    <div className="label mt-6 text-muted2">Website coming soon</div>
                  )}
                  {active.url && (
                    <a
                      href={active.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-6 inline-flex items-center gap-1.5 text-[0.92rem] font-medium text-forest"
                    >
                      <span className="link-underline pb-0.5">{active.linkLabel || 'Visit site'}</span>
                      <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-0.5">→</span>
                    </a>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        <p className="mt-6 text-[0.85rem] text-muted2">Select a circle — or the hub — to explore each part of the system.</p>
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
    </main>
  )
}
