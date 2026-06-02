import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { BookButton, GhostLink, Eyebrow, Reveal } from '../components/ui.jsx'

const CAL = 'https://calendly.com/milkennedy/15min'

const tiers = [
  {
    name: 'AI Discovery Sprint',
    best: 'Organizations that need clarity before committing to transformation.',
    items: ['Current-state AI audit', 'Opportunity prioritization framework', 'Executive readiness report', '90-day implementation roadmap'],
    featured: false,
  },
  {
    name: 'AI Productivity Accelerator',
    best: 'Teams ready to redesign workflows and capture real productivity gains.',
    items: ['2–4 high-value workflow redesigns', 'AI tool selection and configuration', 'Team training and adoption program', 'Productivity measurement dashboard'],
    featured: true,
  },
  {
    name: 'AI Transformation Program',
    best: 'Organizations ready to implement AI across multiple departments.',
    items: ['Full operating model redesign', 'Cross-department workflow automation', 'AI governance and policy framework', 'Change management and leadership coaching'],
    featured: false,
  },
]

const workflows = [
  ['Executive Briefing Automation', 'AI-generated executive summaries, briefing notes, and board reports from raw data and document sources.'],
  ['Proposal Generation', 'Structured, customized proposals drafted in a fraction of the time using organizational knowledge bases and templates.'],
  ['Meeting Intelligence', 'Automated transcription, action-item extraction, and follow-up workflow triggering from every leadership session.'],
  ['Client Onboarding', 'Streamlined onboarding sequences that reduce manual handoffs and accelerate time-to-value for new clients and partners.'],
  ['Financial Analysis', 'AI-assisted financial modeling, variance analysis, and scenario planning that reduces analyst time by 60% or more.'],
  ['Grant Writing', 'Structured grant application workflows that improve consistency, compliance, and submission quality at scale.'],
  ['Policy & Regulatory Review', 'AI-accelerated policy analysis, regulatory gap identification, and compliance documentation workflows.'],
  ['Knowledge Management', 'Organizational knowledge bases that surface institutional expertise on demand, reducing reliance on individual memory.'],
  ['CRM Automation', 'AI-powered CRM workflows that log interactions, surface insights, and trigger follow-ups without manual data entry.'],
  ['Field Data Collection', 'Structured field reporting tools that convert unstructured field observations into actionable operational intelligence.'],
  ['Project Reporting', 'Automated project status reports, milestone tracking, and stakeholder updates generated from existing project data.'],
  ['Regulatory Compliance', 'AI-assisted compliance monitoring, documentation generation, and audit preparation that reduces risk exposure.'],
]

const funding = [
  'Federal and provincial innovation grants',
  'SR&ED tax credits for eligible AI development',
  'Workforce training and upskilling incentives',
  'Indigenous business development funding',
  'Municipal digital transformation programs',
  'Sector-specific productivity incentives',
]

export default function Services() {
  return (
    <main>
      {/* Hero */}
      <section className="relative border-b border-stone bg-[radial-gradient(ellipse_70%_80%_at_75%_20%,rgba(181,103,60,0.12),transparent_70%),#181614] px-8 pb-16 pt-44">
        <div className="mx-auto max-w-content">
          <Reveal>
            <Eyebrow>Services</Eyebrow>
            <h1 className="mb-5 font-display text-[clamp(2.6rem,6vw,4.4rem)]">Structured Engagements.<br />Measurable Outcomes.</h1>
            <p className="max-w-[660px] text-[1.12rem] text-cream2">
              Every Redstone Studios engagement is scoped clearly and designed to produce specific, executive-accountable results. Choose the entry point that matches your organization's readiness.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tiers */}
      <section className="px-8 py-28">
        <div className="mx-auto max-w-content">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {tiers.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <div className={`relative flex h-full flex-col rounded-lg border bg-ink3 p-10 transition-all duration-300 hover:-translate-y-1 ${t.featured ? 'border-copper' : 'border-stone hover:border-copper/55'}`}>
                  {t.featured && (
                    <span className="absolute -top-3 left-8 rounded bg-copper px-3 py-1 text-[0.68rem] uppercase tracking-[0.14em] text-white">Most Popular</span>
                  )}
                  <h3 className="mb-4 font-display text-[1.6rem]">{t.name}</h3>
                  <p className="mb-6 min-h-[3.2em] text-[0.92rem] text-muted2"><span className="font-medium text-cream2">Best for:</span> {t.best}</p>
                  <ul className="mb-8 flex-grow">
                    {t.items.map((it) => (
                      <li key={it} className="flex items-start gap-3 border-b border-stone/60 py-2.5 text-[0.95rem] text-muted last:border-0">
                        <Check size={16} className="mt-1 shrink-0 text-copper" />{it}
                      </li>
                    ))}
                  </ul>
                  <a href={CAL} target="_blank" rel="noopener noreferrer" className={`inline-flex w-full items-center justify-center gap-2 rounded px-6 py-3.5 text-[0.95rem] font-medium transition-all duration-300 ${t.featured ? 'bg-copper text-white hover:-translate-y-0.5 hover:bg-copperLt' : 'border border-copper/45 text-copperLt hover:border-copperLt hover:bg-copper/10 hover:text-cream'}`}>
                    Book a Call
                  </a>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Duo */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-lg bg-copper p-11 text-white">
                <h3 className="mb-4 font-display text-[1.7rem] text-white">Enterprise AI Studio</h3>
                <p className="text-[1rem] text-white/90">For complex, multi-department organizations requiring a fully embedded transformation partner. Custom scope, built around your organizational architecture.</p>
                <Link to="/contact" className="group mt-6 inline-flex items-center gap-2 rounded bg-ink px-7 py-4 font-medium text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-ink2">
                  Discuss Your Requirements <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-lg border border-stone bg-ink3 p-11">
                <h3 className="mb-4 font-display text-[1.7rem]">Fractional Chief AI Officer</h3>
                <p className="text-[1rem]">Ongoing executive AI leadership on a monthly retainer. Redstone Studios serves as your organization's senior AI strategist — attending leadership meetings, guiding decisions, managing implementation, and ensuring continuous progress without the cost of a full-time hire.</p>
                <GhostLink href={CAL} className="mt-6">Learn More →</GhostLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Workflows */}
      <section className="bg-ink2 px-8 py-28">
        <div className="mx-auto max-w-content">
          <Reveal className="mb-14 max-w-[760px]">
            <Eyebrow>Workflow Transformation</Eyebrow>
            <h2 className="mb-5 font-display text-[clamp(2.1rem,4.5vw,3.3rem)]">AI Applied Where It Creates the Most Value</h2>
            <p className="text-[1.08rem] text-muted">
              We identify and redesign the workflows that consume the most time and produce the least leverage. These are not hypothetical use cases — they are the operational bottlenecks executive teams deal with every week.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {workflows.map(([h, p], i) => (
              <Reveal key={h} delay={(i % 3) * 0.08}>
                <div className="group h-full rounded-md border border-stone border-l-2 border-l-copper bg-ink3 p-6 transition-all duration-300 hover:translate-x-1 hover:border-l-copperLt">
                  <h4 className="mb-2 font-display text-[1.18rem] text-cream">{h}</h4>
                  <p className="text-[0.9rem] leading-relaxed text-muted2">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Funding */}
      <section className="px-8 py-28">
        <div className="mx-auto max-w-content">
          <Reveal className="mb-14 max-w-[760px]">
            <Eyebrow>Funding & Incentives</Eyebrow>
            <h2 className="mb-5 font-display text-[clamp(2.1rem,4.5vw,3.3rem)]">Canadian Organizations May Have Access to Funding Support</h2>
            <p className="text-[1.08rem] text-muted">
              AI transformation is a significant investment. Many Canadian organizations — businesses, non-profits, Indigenous enterprises, municipalities, and Crown corporations — may be eligible for government programs, tax credits, training grants, or innovation incentives that can offset a portion of the cost of AI adoption.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-lg border border-stone bg-ink3 p-11">
                <h3 className="mb-4 font-display text-[1.7rem]">What May Be Available</h3>
                <ul className="mt-4">
                  {funding.map((f) => (
                    <li key={f} className="flex items-start gap-3 py-2 text-[0.97rem] text-muted">
                      <Check size={16} className="mt-1 shrink-0 text-copper" />{f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="h-full rounded-lg border border-stone bg-ink3 p-11">
                <h3 className="mb-4 font-display text-[1.7rem]">Our Role</h3>
                <p className="text-[1rem]">Redstone Studios can help identify potential funding pathways relevant to your organization and engagement scope. We work with you and your advisors to understand what programs may apply to your situation.</p>
                <p className="mt-5 text-[0.88rem] text-muted2">Redstone Studios does not guarantee eligibility for any funding program or specific rebate amounts. Funding availability, eligibility criteria, and application outcomes are determined by the administering bodies. We recommend engaging your accountant or financial advisor in parallel.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-stone bg-[radial-gradient(ellipse_60%_100%_at_20%_50%,rgba(181,103,60,0.18),transparent_70%),#181614] px-8 py-28 text-center">
        <Reveal className="mx-auto max-w-content">
          <h2 className="mb-5 font-display text-[clamp(2rem,4vw,3rem)]">Not Sure Which Engagement Fits?</h2>
          <p className="mx-auto mb-10 max-w-[560px] text-[1.05rem]">Book a 15-minute call and we'll help you find the right entry point for your organization's readiness.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <BookButton />
            <GhostLink to="/about">Meet the Founder</GhostLink>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
