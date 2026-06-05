import { Quote } from 'lucide-react'
import { Eyebrow, Reveal } from './ui.jsx'

/* ============ TESTIMONIALS ============
   Each entry: { quote: [paragraphs], attribution }
*/
const TESTIMONIALS = [
  {
    quote: [
      'Mike took what felt like an overwhelming challenge and turned it into a simple, enjoyable experience. As a volunteer with only basic computer skills, I was amazed at how easily he transformed our vision into a beautiful digital archive that preserves our community’s history for future generations.',
      'His patience, creativity, and ability to explain technology in plain language made all the difference.',
    ],
    attribution: 'Senior Volunteer, Historical Society',
  },
  {
    quote: [
      'Mike has a unique ability to connect technology with real business needs. He introduced practical AI tools that improved our workflows, helped our team make better decisions, and increased productivity without disrupting how we work.',
      'Most importantly, he understands that technology should empower people, not replace them.',
    ],
    attribution: 'Corporate Executive, Alberta',
  },
  {
    quote: [
      'Working with Mike transformed how I research opportunities and serve clients. He introduced AI tools and workflows that fit naturally into my business, helping me work faster, stay informed, and focus more time on client relationships.',
      'He makes advanced technology approachable and immediately useful.',
    ],
    attribution: 'Wealth Manager, British Columbia',
  },
]

export default function Testimonials() {
  return (
    <section className="border-t border-line bg-paper2/60 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-content">
        <Reveal><Eyebrow className="mb-6">In their words</Eyebrow></Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-h2 max-w-3xl text-ink">Trusted by the people we build alongside.</h2>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.attribution} delay={(i % 3) * 0.06}>
              <figure className="group flex h-full flex-col bg-paper p-8 transition-colors duration-300 hover:bg-paper2 md:p-9">
                <Quote size={26} strokeWidth={1.5} className="text-forest/70" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 space-y-4 text-[1rem] leading-relaxed text-ink">
                  {t.quote.map((p, j) => (
                    <p key={j}>
                      {j === 0 && '“'}{p}{j === t.quote.length - 1 && '”'}
                    </p>
                  ))}
                </blockquote>
                <figcaption className="mt-7 border-t border-line pt-4">
                  <div className="label text-muted">{t.attribution}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
