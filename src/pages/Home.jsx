import { Cpu, LineChart, Database, Boxes, FlaskConical, Rocket } from 'lucide-react'
import { PrimaryCTA, GhostCTA, ArrowLink, Eyebrow, Reveal, Topo } from '../components/ui.jsx'
import { SECTORS } from './sectors.js'
import mike from '../assets/mike.jpg'

/* ============ HERO ============ */
function Hero() {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <Topo className="pointer-events-none absolute -right-40 top-1/2 h-[760px] w-[760px] -translate-y-1/2 text-forest/[0.07]" />
      <div className="relative mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        <div className="min-w-0">
          <Reveal><Eyebrow className="mb-6">Applied AI Innovation Studio</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <div className="label mb-4 text-muted">Mike Kennedy, PhD</div>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="t-hero text-balance text-ink">
              Applying AI to build <span className="text-forest">better communities</span>, stronger economies, and healthier ecosystems.
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="t-lead mt-7 max-w-prose text-muted">
              Redstone Studios combines science, data, AI and entrepreneurship to solve some of Canada's most important challenges.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <PrimaryCTA>Work With Us</PrimaryCTA>
              <GhostCTA to="/projects">View Projects</GhostCTA>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="min-w-0 lg:justify-self-end">
          <figure className="relative mx-auto w-full max-w-[380px]">
            <div className="overflow-hidden rounded-lg border border-line bg-paper2">
              <img
                src={mike}
                alt="Mike Kennedy, PhD — Founder, Redstone Studios"
                className="aspect-[4/5] w-full object-cover object-[50%_16%] grayscale-[0.85] contrast-[1.02]"
              />
            </div>
            <figcaption className="mt-4 flex items-center justify-between border-t border-line pt-3">
              <span className="text-[0.95rem] font-medium text-ink">Mike Kennedy, PhD</span>
              <span className="label text-muted">Founder</span>
            </figcaption>
            <span className="pointer-events-none absolute -left-3 -top-3 -z-10 h-24 w-24 border-l border-t border-forest/40" />
          </figure>
        </Reveal>
      </div>
    </header>
  )
}

/* ============ CREDIBILITY STRIP ============ */
const ventures = ['UBC', 'Green Analytics', 'Open Housing Canada', 'Green Metrics', 'Precision Livestock Diagnostics', 'Wolastoqey Forest Partnership']

function Ventures() {
  return (
    <section className="border-b border-line bg-paper2/60">
      <div className="mx-auto max-w-content px-6 py-10 md:px-10">
        <div className="label mb-5 text-muted2">Ventures & affiliations</div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {ventures.map((v) => (
            <span key={v} className="text-[0.95rem] font-medium text-muted">{v}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ PEOPLE / PLANET / PROFIT ============ */
const pillars = [
  ['People', 'Better communities', 'Housing, services and institutions that work better for the people who depend on them.', 'forest'],
  ['Planet', 'Healthier ecosystems', 'Natural capital, forests and land managed with science, data and long-term stewardship.', 'river'],
  ['Profit', 'Stronger economies', 'Ventures and decision systems that turn applied research into durable economic value.', 'copper'],
]
const ring = { forest: 'text-forest', river: 'text-river', copper: 'text-copper' }

function Pillars() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-content">
        <Reveal><Eyebrow className="mb-6">The idea</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="t-h2 max-w-3xl text-ink">People. Planet. Profit. Treated as one system.</h2></Reveal>
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
          {pillars.map(([tag, title, body, color], i) => (
            <Reveal key={tag} delay={i * 0.06}>
              <div className="h-full bg-paper p-8 md:p-10">
                <svg viewBox="0 0 48 48" className={`h-10 w-10 ${ring[color]}`} fill="none" aria-hidden="true">
                  <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="24" cy="24" r="13" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
                  <circle cx="24" cy="24" r="4" fill="currentColor" />
                </svg>
                <div className="label mt-6 text-muted2">{tag}</div>
                <h3 className="t-h3 mt-2 text-ink">{title}</h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-muted">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ WHAT WE BUILD ============ */
const builds = [
  [Cpu, 'AI Systems', 'Production AI that does real work inside operations — not demos.'],
  [LineChart, 'Decision Intelligence', 'Platforms that turn data and models into decisions leaders can act on.'],
  [Database, 'Data Products', 'Pipelines and products that make institutional data usable and durable.'],
  [Boxes, 'Digital Twins', 'Living models of assets, land and systems for planning and foresight.'],
  [FlaskConical, 'Applied Research', 'University-grade research translated into tools organizations can use.'],
  [Rocket, 'Commercial Ventures', 'Ideas built into companies — from prototype to going concern.'],
]

function Build() {
  return (
    <section className="border-y border-line bg-ink text-paper">
      <div className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
        <Reveal><Eyebrow className="mb-6" tone="paper">What we build</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="t-h2 max-w-3xl text-paper">From applied research to systems in production.</h2></Reveal>
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-lineDk bg-lineDk sm:grid-cols-2 lg:grid-cols-3">
          {builds.map(([Icon, title, body], i) => (
            <Reveal key={title} delay={(i % 3) * 0.05}>
              <div className="group h-full bg-ink p-8 transition-colors duration-300 hover:bg-ink3">
                <Icon size={22} strokeWidth={1.5} className="text-forestLt" />
                <h3 className="mt-5 text-[1.2rem] font-semibold text-paper">{title}</h3>
                <p className="mt-2 text-[0.97rem] leading-relaxed text-paperMut">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ SELECTED WORK (sectors) ============ */
const accent = { forest: 'bg-forest', river: 'bg-river', copper: 'bg-copper' }

function Work() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-content">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal><Eyebrow className="mb-6">Where we work</Eyebrow></Reveal>
            <Reveal delay={0.05}><h2 className="t-h2 max-w-2xl text-ink">Frontier sectors, real-world problems.</h2></Reveal>
          </div>
          <Reveal delay={0.1}><ArrowLink to="/projects">All projects</ArrowLink></Reveal>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((s, i) => (
            <Reveal key={s.name} delay={(i % 3) * 0.05}>
              <div className="group relative h-full bg-paper p-8 transition-colors duration-300 hover:bg-paper2 md:p-9">
                <span className={`absolute left-0 top-0 h-px w-12 ${accent[s.color]} transition-all duration-300 group-hover:w-full`} />
                <div className="flex items-baseline justify-between">
                  <div className="label text-muted2">{String(i + 1).padStart(2, '0')}</div>
                </div>
                <h3 className="t-h3 mt-5 text-ink">{s.name}</h3>
                <p className="mt-3 text-[0.97rem] leading-relaxed text-muted">{s.short}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full border border-line px-3 py-1 text-[0.74rem] font-medium text-muted">{t}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ ABOUT PREVIEW ============ */
function AboutPreview() {
  return (
    <section className="border-t border-line bg-paper2/60 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="overflow-hidden rounded-lg border border-line">
            <img src={mike} alt="Mike Kennedy, PhD" className="aspect-[4/4.4] w-full object-cover object-[50%_16%] grayscale-[0.85]" />
          </div>
        </Reveal>
        <div className="flex flex-col justify-center">
          <Reveal><Eyebrow className="mb-6">The founder</Eyebrow></Reveal>
          <Reveal delay={0.05}><h2 className="t-h2 text-ink">A scientist, economist and builder.</h2></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-prose text-[1.05rem] leading-relaxed text-muted">
              Mike Kennedy, PhD is an environmental economist, AI researcher and entrepreneur with two decades translating complex systems into tools organizations can use — across housing, natural capital, forestry and agriculture.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8"><ArrowLink to="/about">More about Mike</ArrowLink></div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ============ CTA ============ */
function CTA() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-content">
        <Reveal><Eyebrow className="mb-6">Work with us</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-h2 max-w-3xl text-ink">If you're solving a problem that matters, let's talk.</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-lead mt-6 max-w-prose text-muted">
            We take on a small number of engagements at a time so the work gets our full attention. Tell us what you're trying to build.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <PrimaryCTA>Work With Us</PrimaryCTA>
            <GhostCTA to="/projects">View Projects</GhostCTA>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Ventures />
      <Pillars />
      <Build />
      <Work />
      <AboutPreview />
      <CTA />
    </main>
  )
}
