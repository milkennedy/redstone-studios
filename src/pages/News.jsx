import { ArrowUpRight } from 'lucide-react'
import { PrimaryCTA, Eyebrow, Reveal, Topo } from '../components/ui.jsx'
import { Link } from 'react-router-dom'
import { NEWS } from './news.js'
import { NEWSLETTERS } from './newsletters.js'

function PageHero() {
  return (
    <header className="relative overflow-hidden border-b border-line">
      <Topo className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] text-forest/[0.06]" />
      <div className="relative mx-auto max-w-content px-6 pb-16 pt-36 md:px-10 md:pb-20 md:pt-44">
        <Reveal><Eyebrow className="mb-6">News</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h1 className="t-hero max-w-4xl text-balance text-ink">What we&rsquo;re watching.</h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="t-lead mt-7 max-w-prose text-muted">
            Announcements and developments shaping AI, housing and natural capital in Canada — and what they mean for the work.
          </p>
        </Reveal>
      </div>
    </header>
  )
}

function Newsletters() {
  if (!NEWSLETTERS.length) return null
  return (
    <section className="border-b border-line bg-paper2/60 px-6 py-14 md:px-10 md:py-16">
      <div className="mx-auto max-w-content">
        <Reveal><Eyebrow className="mb-6">The Signal Monthly</Eyebrow></Reveal>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {NEWSLETTERS.map((n, i) => (
            <Reveal key={n.slug} delay={(i % 3) * 0.05}>
              <Link to={`/newsletter/${n.slug}`} className="group block h-full bg-paper p-7 transition-colors duration-300 hover:bg-paper2">
                <div className="label text-muted2">{n.issue} · {n.date}</div>
                <h3 className="t-h3 mt-3 text-ink transition-colors group-hover:text-forest">{n.title}</h3>
                <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-muted">{n.intro}</p>
                <div className="mt-5 text-[0.9rem] font-medium text-forest">Read the issue →</div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Feed() {
  return (
    <section className="px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-content">
        <div className="border-t border-line">
          {NEWS.map((n) => (
            <Reveal key={n.url}>
              <article className="grid grid-cols-1 gap-6 border-b border-line py-10 md:grid-cols-[0.5fr_1.5fr] md:gap-14 md:py-12">
                <div>
                  <div className="label text-muted2">{n.date}</div>
                  <div className="label mt-2 text-forest">{n.source}</div>
                  {n.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {n.tags.map((t) => (
                        <span key={t} className="rounded-full border border-line px-3 py-1 text-[0.74rem] font-medium text-muted">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <a href={n.url} target="_blank" rel="noopener noreferrer" className="group inline-block">
                    <h2 className="t-h3 max-w-2xl text-ink transition-colors group-hover:text-forest">
                      {n.title}
                      <ArrowUpRight size={20} className="ml-2 inline-block text-forest transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </h2>
                  </a>
                  <p className="mt-4 max-w-prose text-[1.02rem] leading-relaxed text-muted">{n.summary}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-content">
        <Reveal>
          <p className="t-lead max-w-prose text-muted">Working through what these shifts mean for your organization?</p>
          <div className="mt-7"><PrimaryCTA /></div>
        </Reveal>
      </div>
    </section>
  )
}

export default function News() {
  return (
    <main>
      <PageHero />
      <Newsletters />
      <Feed />
      <CTA />
    </main>
  )
}
