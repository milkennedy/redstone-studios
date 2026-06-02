import { PrimaryCTA, GhostCTA, Eyebrow, Reveal, Topo } from '../components/ui.jsx'
import { SECTORS } from './sectors.js'

const dot = { forest: 'bg-forest', river: 'bg-river', copper: 'bg-copper' }
const text = { forest: 'text-forest', river: 'text-river', copper: 'text-copper' }

function PageHero() {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <Topo className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] text-forest/[0.06]" />
      <div className="relative mx-auto max-w-content px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44">
        <Reveal><Eyebrow className="mb-6">Projects</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h1 className="t-hero max-w-4xl text-balance text-ink">Applied AI across the sectors that build the country.</h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="t-lead mt-7 max-w-prose text-muted">
            We work where the problems are real and the data is messy — housing, natural assets, forestry, livestock, energy and mining. Each engagement is scoped to ship something that works.
          </p>
        </Reveal>
      </div>
    </header>
  )
}

function SectorList() {
  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-content">
        <div className="border-t border-line">
          {SECTORS.map((s, i) => (
            <Reveal key={s.name}>
              <article className="group grid grid-cols-1 gap-8 border-b border-line py-12 transition-colors duration-300 md:grid-cols-[0.5fr_1.5fr] md:gap-14 md:py-14">
                <div>
                  <div className="flex items-center gap-3">
                    <span className={`h-2 w-2 rounded-full ${dot[s.color]}`} />
                    <span className="label text-muted2">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h2 className="t-h3 mt-4 text-ink">{s.name}</h2>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className="rounded-full border border-line px-3 py-1 text-[0.74rem] font-medium text-muted">{t}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="max-w-prose text-[1.08rem] leading-relaxed text-ink/80">{s.summary}</p>
                  <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-2.5 sm:grid-cols-2">
                    {s.capabilities.map((c) => (
                      <li key={c} className="flex items-start gap-2.5 text-[0.95rem] text-muted">
                        <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${dot[s.color]}`} />{c}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

const engagements = [
  ['Discovery', 'Map the opportunity', 'A focused sprint to find where AI creates real leverage — with a prioritized roadmap and a clear-eyed readiness assessment you can act on.'],
  ['Build', 'Design and ship', 'We design and build the systems, platforms and data products — into production, alongside your team, with the standards to make adoption stick.'],
  ['Embedded', 'Ongoing AI leadership', 'A fractional Chief AI role: guiding strategy, decisions and delivery over time, without the cost of a full-time executive hire.'],
]

function Engage() {
  return (
    <section className="border-y border-line bg-ink text-paper">
      <div className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
        <Reveal><Eyebrow className="mb-6" tone="paper">How we engage</Eyebrow></Reveal>
        <Reveal delay={0.05}><h2 className="t-h2 max-w-3xl text-paper">Three ways to work together.</h2></Reveal>
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-lineDk bg-lineDk md:grid-cols-3">
          {engagements.map(([tag, title, body], i) => (
            <Reveal key={tag} delay={i * 0.06}>
              <div className="h-full bg-ink p-8 md:p-10">
                <div className="label text-forestLt">{String(i + 1).padStart(2, '0')} · {tag}</div>
                <h3 className="t-h3 mt-4 text-paper">{title}</h3>
                <p className="mt-3 text-[0.97rem] leading-relaxed text-paperMut">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <PrimaryCTA>Work With Us</PrimaryCTA>
            <GhostCTA to="/about" dark>About Mike</GhostCTA>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default function Projects() {
  return (
    <main>
      <PageHero />
      <SectorList />
      <Engage />
    </main>
  )
}
