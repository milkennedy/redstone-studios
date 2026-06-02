import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Kicker, Reveal, RevealHeading } from '../components/ui.jsx'
import mike from '../assets/mike.jpg'

const industries = [
  ['Housing & Construction', 'Automate estimating, proposal generation, project reporting, and compliance documentation to accelerate project delivery.'],
  ['Mining & Natural Resources', 'Streamline regulatory reporting, environmental compliance, field data collection, and operational intelligence across remote sites.'],
  ['Forestry', 'Apply AI to harvest planning, environmental monitoring, regulatory submissions, and community engagement documentation.'],
  ['Agriculture & Food', 'Deploy AI workflows for production planning, compliance reporting, supply chain analysis, and market intelligence.'],
  ['Utilities', 'Redesign operational reporting, customer communication, regulatory compliance, and asset management workflows.'],
  ['Indigenous Economic Development', 'Support Nation-led enterprises with AI tools for grant writing, project management, and land stewardship documentation.'],
  ['Government & Crown Corporations', 'Improve policy analysis, public communications, program reporting, and procurement workflows.'],
  ['Professional Services', 'Redesign how knowledge work gets done — from client deliverables to internal operations — to increase output per professional.'],
]

const outcomes = [
  ['Construction Company', 'A mid-sized construction firm was spending 40+ hours per proposal on formatting, scope writing, and compliance documentation.', 'Redesigned the proposal workflow using an AI-assisted knowledge base, template system, and review process.', 'Proposal preparation time reduced by approximately 60%, freeing senior estimators to focus on client relationships and pricing strategy.', '~60%', 'less time per proposal'],
  ['Natural Resource Company', 'A resource organization was managing regulatory compliance manually across multiple sites and permit categories.', 'Automated compliance reporting workflows connected field data collection to structured regulatory submissions.', 'Compliance reporting time reduced significantly, with fewer errors and faster regulatory response cycles.', 'Faster', 'regulatory response cycles'],
  ['Non-Profit Organization', 'A non-profit was under-resourced for grant writing and program reporting, limiting its ability to pursue new funding.', 'Implemented AI-assisted grant writing workflows and structured program reporting templates tied to outcome data.', 'Grant application output increased substantially with the same team, improving quality and capacity to pursue diverse funding.', 'More', 'grant output, same team'],
]

function FounderFeature() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  return (
    <section className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div ref={ref} className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative overflow-hidden rounded-sm border border-stone">
            <div className="aspect-[4/4.7] overflow-hidden">
              <motion.img src={mike} alt="Mike Kennedy, PhD — Founder, Redstone Studios" style={{ y, scale: 1.12 }} className="h-full w-full object-cover object-[50%_18%]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-7 pt-20">
              <h3 className="font-display text-[1.7rem] text-cream">Mike Kennedy, PhD</h3>
              <div className="mt-1 text-[0.92rem] text-copperLt">Founder, Redstone Studios</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['AI Strategist', 'Economist', 'Builder'].map((t) => (
                  <span key={t} className="rounded-sm border border-copperLt/30 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.14em] text-copperLt">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Reveal><Kicker className="mb-7">Founder</Kicker></Reveal>
          <RevealHeading as="h2" text="A rare combination of rigor and execution" className="t-h2 font-display text-cream" />
          <div className="mt-8 space-y-6 text-[1.08rem] leading-relaxed text-muted">
            <Reveal delay={0.1}><p>Mike Kennedy, PhD is an AI strategist, environmental economist, entrepreneur, and applied technology builder with two decades of experience translating complex systems into practical tools that organizations can use.</p></Reveal>
            <Reveal delay={0.15}><p>His work spans environmental and resource economics, precision agriculture, housing policy, and Indigenous forestry partnerships. He has founded and led organizations including <span className="text-cream2">Green Analytics</span>, <span className="text-cream2">Green Metrics</span>, <span className="text-cream2">BuildBlox</span>, <span className="text-cream2">Open Housing Canada</span>, and <span className="text-cream2">Precision Livestock Diagnostics</span> — and has served as a strategic partner in the Wolastoqey Forest Partnership.</p></Reveal>
            <Reveal delay={0.2}><p>At Redstone Studios, Mike brings doctoral-level analytical rigor and hands-on entrepreneurial execution to every client engagement. He works directly with executive teams to ensure that AI transformation is grounded in organizational reality — not vendor promises.</p></Reveal>
          </div>
          <Reveal delay={0.25}>
            <blockquote className="mt-10 border-l-2 border-copper pl-6 font-display text-[1.3rem] italic leading-snug text-cream2">
              "Redstone Studios maintains a deliberately small client roster to ensure Mike's direct involvement in every engagement."
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Industries() {
  return (
    <section className="border-y border-stone bg-ink2 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-content">
        <div className="mb-16 max-w-3xl">
          <Reveal><Kicker className="mb-7">Industries</Kicker></Reveal>
          <RevealHeading as="h2" text="Built for organizations that do real work" className="t-h2 font-display text-cream" />
          <Reveal delay={0.15}>
            <p className="mt-7 text-[1.05rem] leading-relaxed text-muted">We serve organizations operating in complex, regulated, and high-stakes environments. Our engagements are calibrated to the operational realities of each sector — not retrofitted from a generic playbook.</p>
          </Reveal>
        </div>
        <div className="border-t border-stone/70">
          {industries.map(([h, p], i) => (
            <Reveal key={h} delay={(i % 2) * 0.06}>
              <div className="group grid grid-cols-1 gap-2 border-b border-stone/70 py-7 transition-colors duration-300 hover:border-copper/50 md:grid-cols-[0.4fr_1fr] md:gap-12">
                <h4 className="font-display text-[1.35rem] text-cream transition-colors group-hover:text-copperLt">{h}</h4>
                <p className="max-w-2xl text-[0.98rem] leading-relaxed text-muted">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Outcomes() {
  return (
    <section className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-content">
        <div className="mb-16 max-w-3xl">
          <Reveal><Kicker className="mb-7">Example Outcomes</Kicker></Reveal>
          <RevealHeading as="h2" text="What AI transformation looks like in practice" className="t-h2 font-display text-cream" />
          <Reveal delay={0.15}>
            <p className="mt-7 text-[1.05rem] leading-relaxed text-muted">Illustrative examples of the types of outcomes organizations have achieved through structured AI workflow transformation. These are representative scenarios, not client-specific claims or guarantees of results.</p>
          </Reveal>
        </div>
        <div className="space-y-px overflow-hidden rounded-sm border border-stone bg-stone">
          {outcomes.map(([title, challenge, approach, outcome, stat, statLbl], i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="grid grid-cols-1 gap-8 bg-ink3 p-9 transition-colors duration-300 hover:bg-ink4 md:grid-cols-[1fr_2fr] md:gap-14 md:p-12">
                <div>
                  <h3 className="t-h3 font-display text-cream">{title}</h3>
                  <div className="mt-6">
                    <div className="font-display text-[3rem] leading-none text-copperLt">{stat}</div>
                    <div className="mt-2 text-[0.8rem] uppercase tracking-[0.14em] text-muted2">{statLbl}</div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {[['Challenge', challenge], ['Approach', approach], ['Outcome', outcome]].map(([k, v]) => (
                    <div key={k}>
                      <div className="mb-2 flex items-center gap-2"><span className="h-px w-4 bg-copper" /><span className="kicker">{k}</span></div>
                      <p className={`text-[0.92rem] leading-relaxed ${k === 'Outcome' ? 'text-cream2' : 'text-muted'}`}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <p className="mt-8 text-[0.85rem] leading-relaxed text-muted2">Individual results will vary based on organizational context, starting conditions, and implementation quality.</p>
        </Reveal>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <main>
      <section className="relative overflow-hidden px-6 pb-16 pt-40 md:px-10 md:pb-20 md:pt-48">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_25%_15%,rgba(181,103,60,0.13),transparent_65%)]" />
        <div className="relative mx-auto max-w-content">
          <Reveal><Kicker className="mb-8">About</Kicker></Reveal>
          <RevealHeading as="h1" text="Strategy built" className="t-h1 font-display text-cream" />
          <RevealHeading as="h1" text="from experience" className="t-h1 font-display italic text-copperLt" delay={0.1} />
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-prose text-[1.12rem] leading-relaxed text-cream2">Redstone Studios maintains a deliberately small client roster to ensure the founder's direct involvement in every engagement.</p>
          </Reveal>
        </div>
      </section>
      <FounderFeature />
      <Industries />
      <Outcomes />
    </main>
  )
}
