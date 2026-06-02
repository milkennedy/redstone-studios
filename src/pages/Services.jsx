import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ArrowLink, Kicker, Reveal, RevealHeading, CAL } from '../components/ui.jsx'

const tiers = [
  ['01', 'AI Discovery Sprint', 'Organizations that need clarity before committing to transformation.', ['Current-state AI audit', 'Opportunity prioritization framework', 'Executive readiness report', '90-day implementation roadmap'], false],
  ['02', 'AI Productivity Accelerator', 'Teams ready to redesign workflows and capture real productivity gains.', ['2–4 high-value workflow redesigns', 'AI tool selection and configuration', 'Team training and adoption program', 'Productivity measurement dashboard'], true],
  ['03', 'AI Transformation Program', 'Organizations ready to implement AI across multiple departments.', ['Full operating model redesign', 'Cross-department workflow automation', 'AI governance and policy framework', 'Change management and leadership coaching'], false],
]

const workflows = [
  ['Executive Briefing Automation', 'AI-generated summaries, briefing notes, and board reports from raw data and document sources.'],
  ['Proposal Generation', 'Customized proposals drafted in a fraction of the time using organizational knowledge bases.'],
  ['Meeting Intelligence', 'Automated transcription, action-item extraction, and follow-up triggering from every session.'],
  ['Client Onboarding', 'Streamlined sequences that reduce manual handoffs and accelerate time-to-value.'],
  ['Financial Analysis', 'AI-assisted modeling, variance analysis, and scenario planning that cuts analyst time by 60%+.'],
  ['Grant Writing', 'Structured workflows that improve consistency, compliance, and submission quality at scale.'],
  ['Policy & Regulatory Review', 'Accelerated policy analysis, gap identification, and compliance documentation.'],
  ['Knowledge Management', 'Knowledge bases that surface institutional expertise on demand.'],
  ['CRM Automation', 'Workflows that log interactions, surface insights, and trigger follow-ups automatically.'],
  ['Field Data Collection', 'Tools that convert unstructured field observations into operational intelligence.'],
  ['Project Reporting', 'Automated status reports, milestone tracking, and stakeholder updates.'],
  ['Regulatory Compliance', 'Compliance monitoring, documentation, and audit prep that reduces risk exposure.'],
]

const funding = ['Federal and provincial innovation grants', 'SR&ED tax credits for eligible AI development', 'Workforce training and upskilling incentives', 'Indigenous business development funding', 'Municipal digital transformation programs', 'Sector-specific productivity incentives']

function PageHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-40 md:px-10 md:pb-28 md:pt-48">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_80%_15%,rgba(181,103,60,0.13),transparent_65%)]" />
      <div className="relative mx-auto max-w-content">
        <Reveal><Kicker className="mb-8">Services</Kicker></Reveal>
        <RevealHeading as="h1" text="Structured engagements." className="t-h1 font-display text-cream" />
        <RevealHeading as="h1" text="Measurable outcomes." className="t-h1 font-display italic text-copperLt" delay={0.1} />
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-prose text-[1.12rem] leading-relaxed text-cream2">
            Every engagement is scoped clearly and designed to produce specific, executive-accountable results. Choose the entry point that matches your organization's readiness.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Tiers() {
  return (
    <section className="px-6 py-20 md:px-10">
      <div className="mx-auto max-w-content">
        {tiers.map(([n, name, best, items, featured], i) => (
          <Reveal key={name} delay={i * 0.06}>
            <div className={`group grid grid-cols-1 gap-8 border-t py-12 transition-colors duration-300 lg:grid-cols-[auto_1fr_1.2fr_auto] lg:items-start lg:gap-12 ${featured ? 'border-copper/60' : 'border-stone/70 hover:border-copper/40'}`}>
              <span className="font-display text-[1.5rem] text-copper/70">{n}</span>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="t-h3 font-display text-cream">{name}</h3>
                  {featured && <span className="rounded-sm bg-copper px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.16em] text-white">Most Popular</span>}
                </div>
                <p className="mt-3 max-w-sm text-[0.97rem] leading-relaxed text-muted"><span className="text-cream2">Best for:</span> {best}</p>
              </div>
              <ul className="grid grid-cols-1 gap-y-2.5 sm:grid-cols-2 lg:gap-x-8">
                {items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-[0.93rem] text-muted">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-copper" />{it}
                  </li>
                ))}
              </ul>
              <a href={CAL} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 self-center whitespace-nowrap text-[0.9rem] font-medium text-cream transition-colors lg:self-start">
                <span className="link-underline pb-0.5">Book a Call</span>
                <ArrowRight size={15} className="text-copperLt transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </Reveal>
        ))}

        {/* Duo */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-sm bg-gradient-to-br from-copper to-copperDk p-10 md:p-12">
              <h3 className="t-h3 mb-4 font-display text-white">Enterprise AI Studio</h3>
              <p className="max-w-md text-[1rem] leading-relaxed text-white/90">For complex, multi-department organizations requiring a fully embedded transformation partner. Custom scope, built around your organizational architecture.</p>
              <Link to="/contact" className="group mt-8 inline-flex items-center gap-2.5 rounded-sm bg-ink px-6 py-3.5 font-medium text-cream transition-all duration-300 ease-smooth hover:bg-ink2">
                Discuss Your Requirements <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-sm border border-stone bg-ink3 p-10 md:p-12">
              <h3 className="t-h3 mb-4 font-display text-cream">Fractional Chief AI Officer</h3>
              <p className="max-w-md text-[1rem] leading-relaxed text-muted">Ongoing executive AI leadership on a monthly retainer. Redstone Studios serves as your organization's senior AI strategist — attending leadership meetings, guiding decisions, managing implementation, and ensuring continuous progress without the cost of a full-time hire.</p>
              <ArrowLink href={CAL} className="mt-8 inline-block">Learn More</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Workflows() {
  return (
    <section className="border-y border-stone bg-ink2 px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-content">
        <div className="mb-16 max-w-3xl">
          <Reveal><Kicker className="mb-7">Workflow Transformation</Kicker></Reveal>
          <RevealHeading as="h2" text="AI applied where it creates the most value" className="t-h2 font-display text-cream" />
          <Reveal delay={0.15}>
            <p className="mt-7 text-[1.05rem] leading-relaxed text-muted">
              We identify and redesign the workflows that consume the most time and produce the least leverage — the operational bottlenecks executive teams deal with every week.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden border border-stone bg-stone sm:grid-cols-2 lg:grid-cols-3">
          {workflows.map(([h, p], i) => (
            <Reveal key={h} delay={(i % 3) * 0.06}>
              <div className="group h-full bg-ink3 p-7 transition-colors duration-300 hover:bg-ink4">
                <div className="mb-3 font-display text-[0.85rem] text-copper/60">{String(i + 1).padStart(2, '0')}</div>
                <h4 className="mb-2 font-display text-[1.2rem] text-cream">{h}</h4>
                <p className="text-[0.9rem] leading-relaxed text-muted2">{p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Funding() {
  return (
    <section className="px-6 py-28 md:px-10 md:py-36">
      <div className="mx-auto max-w-content">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Reveal><Kicker className="mb-7">Funding & Incentives</Kicker></Reveal>
            <RevealHeading as="h2" text="Canadian organizations may have access to funding support" className="t-h2 font-display text-cream" />
            <Reveal delay={0.15}>
              <p className="mt-7 text-[1.05rem] leading-relaxed text-muted">
                Many Canadian organizations — businesses, non-profits, Indigenous enterprises, municipalities, and Crown corporations — may be eligible for government programs, tax credits, training grants, or innovation incentives that can offset a portion of the cost of AI adoption.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-[0.88rem] leading-relaxed text-muted2">
                Redstone Studios does not guarantee eligibility for any funding program or specific rebate amounts. Funding availability, eligibility criteria, and application outcomes are determined by the administering bodies. We recommend engaging your accountant or financial advisor in parallel.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-sm border border-stone bg-ink3 p-10 md:p-12">
              <h3 className="mb-7 font-display text-[1.3rem] text-cream">What May Be Available</h3>
              <ul>
                {funding.map((f, i) => (
                  <li key={f} className="flex items-start gap-4 border-t border-stone/60 py-4 first:border-0 first:pt-0">
                    <span className="font-display text-[0.85rem] text-copper/70">{String(i + 1).padStart(2, '0')}</span>
                    <span className="text-[0.97rem] text-muted">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function Services() {
  return (
    <main>
      <PageHero />
      <Tiers />
      <Workflows />
      <Funding />
    </main>
  )
}
