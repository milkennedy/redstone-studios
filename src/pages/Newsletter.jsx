import { useParams, Navigate, Link } from 'react-router-dom'
import { PrimaryCTA, Eyebrow, Reveal } from '../components/ui.jsx'
import { NEWSLETTERS } from './newsletters.js'

export default function Newsletter() {
  const { slug } = useParams()
  const issue = NEWSLETTERS.find((n) => n.slug === slug)
  if (!issue) return <Navigate to="/news" replace />

  return (
    <main>
      <header className="border-b border-line">
        <div className="mx-auto max-w-content px-6 pb-14 pt-36 md:px-10 md:pb-18 md:pt-44">
          <Reveal><Eyebrow className="mb-6">The Signal Monthly · {issue.issue}</Eyebrow></Reveal>
          <Reveal delay={0.05}>
            <h1 className="t-hero max-w-4xl text-balance text-ink">{issue.title}</h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="label mt-6 text-muted2">{issue.date} · Mike Kennedy, PhD</div>
          </Reveal>
        </div>
      </header>

      <article className="px-6 py-16 md:px-10 md:py-20">
        <div className="mx-auto max-w-prose">
          <Reveal>
            <p className="text-[1.15rem] leading-relaxed text-ink/80">{issue.intro}</p>
          </Reveal>
          {issue.sections.map((sec, i) => (
            <Reveal key={sec.heading} delay={0.05}>
              <section className="mt-12">
                <h2 className="t-h3 border-t border-line pt-8 text-ink">{sec.heading}</h2>
                <div className="mt-4 space-y-4">
                  {sec.body.map((p, j) => (
                    <p key={j} className="text-[1.05rem] leading-relaxed text-muted">{p}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
          {issue.closing && (
            <Reveal delay={0.05}>
              <p className="mt-12 border-t border-line pt-8 text-[1.05rem] leading-relaxed text-ink/80">{issue.closing}</p>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <div className="mt-12 flex flex-wrap items-center gap-4">
              <PrimaryCTA />
              <Link to="/news" className="text-[0.95rem] font-medium text-muted transition-colors hover:text-ink">← Back to News</Link>
            </div>
          </Reveal>
        </div>
      </article>
    </main>
  )
}
