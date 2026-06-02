import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { BookButton, GhostLink, Eyebrow, Reveal } from '../components/ui.jsx'
import mike from '../assets/mike.jpg'

const industries = [
  ['Housing & Construction', 'Automate estimating, proposal generation, project reporting, and compliance documentation to reduce overhead and accelerate project delivery.'],
  ['Mining & Natural Resources', 'Streamline regulatory reporting, environmental compliance, field data collection, and operational intelligence workflows across remote sites.'],
  ['Forestry', 'Apply AI to harvest planning, environmental monitoring, regulatory submissions, and community engagement documentation.'],
  ['Agriculture & Food', 'Deploy AI workflows for production planning, compliance reporting, supply chain analysis, and market intelligence.'],
  ['Utilities', 'Redesign operational reporting, customer communication, regulatory compliance, and asset management workflows using AI.'],
  ['Indigenous Economic Development', 'Support Nation-led enterprises with AI tools for grant writing, project management, land stewardship documentation, and capacity building.'],
  ['Government & Crown Corporations', 'Improve policy analysis, public communications, program reporting, and procurement workflows with structured AI implementation.'],
  ['Professional Services', 'Redesign how knowledge work gets done — from client deliverables to internal operations — to increase output per professional without increasing headcount.'],
]

const outcomes = [
  {
    h: 'Construction Company',
    challenge: 'A mid-sized construction firm was spending 40+ hours per proposal on formatting, scope writing, and compliance documentation.',
    approach: 'Redesigned the proposal workflow using an AI-assisted knowledge base, template system, and review process.',
    outcome: 'Proposal preparation time reduced by approximately 60%, freeing senior estimators to focus on client relationships and pricing strategy.',
  },
  {
    h: 'Natural Resource Company',
    challenge: 'A resource sector organization was managing regulatory compliance manually across multiple sites and permit categories.',
    approach: 'Automated compliance reporting workflows connected field data collection to structured regulatory submissions.',
    outcome: 'Compliance reporting time reduced significantly, with fewer errors and faster regulatory response cycles.',
  },
  {
    h: 'Non-Profit Organization',
    challenge: 'A non-profit was under-resourced for grant writing and program reporting, limiting its ability to pursue new funding.',
    approach: 'Implemented AI-assisted grant writing workflows and structured program reporting templates tied to outcome data.',
    outcome: 'Grant application output increased substantially with the same team, improving quality and capacity to pursue diverse funding.',
  },
]

function FounderImage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20])
  return (
    <div ref={ref} className="sticky top-24 overflow-hidden rounded-xl border border-stone bg-gradient-to-b from-[#4a3528] to-[#2a201a] p-[10px]">
      <div className="relative aspect-[4/4.6] overflow-hidden rounded-lg">
        <motion.img
          src={mike}
          alt="Mike Kennedy, PhD — Founder, Redstone Studios"
          style={{ y, scale: 1.08 }}
          className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
      </div>
      <div className="p-5">
        <h3 className="font-display text-[1.8rem]">Mike Kennedy, PhD</h3>
        <div className="mt-1 text-[0.95rem] text-copperLt">Founder, Redstone Studios</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {['AI Strategist', 'Economist', 'Builder'].map((t) => (
            <span key={t} className="rounded border border-copper/40 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-copperLt">{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-stone bg-[radial-gradient(ellipse_70%_80%_at_25%_20%,rgba(181,103,60,0.12),transparent_70%),#181614] px-8 pb-16 pt-44">
        <div className="mx-auto max-w-content">
          <Reveal>
            <Eyebrow>About</Eyebrow>
            <h1 className="mb-5 font-display text-[clamp(2.6rem,6vw,4.4rem)]">Strategy Built<br />From Experience</h1>
            <p className="max-w-[640px] text-[1.12rem] text-cream2">Redstone Studios maintains a deliberately small client roster to ensure the founder's direct involvement in every engagement.</p>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <section className="px-8 py-28">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal><FounderImage /></Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>Founder</Eyebrow>
            <h2 className="mb-7 mt-2 font-display text-[clamp(2rem,4vw,2.9rem)]">A Rare Combination of Rigor and Execution</h2>
            <div className="space-y-5 text-[1.05rem]">
              <p>Mike Kennedy, PhD is an AI strategist, environmental economist, entrepreneur, and applied technology builder with two decades of experience translating complex systems into practical tools that organizations can use.</p>
              <p>His work spans environmental and resource economics, precision agriculture, housing policy, and Indigenous forestry partnerships. He has founded and led organizations including Green Analytics, Green Metrics, BuildBlox, Open Housing Canada, and Precision Livestock Diagnostics — and has served as a strategic partner in the Wolastoqey Forest Partnership.</p>
              <p>At Redstone Studios, Mike brings doctoral-level analytical rigor and hands-on entrepreneurial execution to every client engagement. He works directly with executive teams to ensure that AI transformation is grounded in organizational reality — not vendor promises.</p>
            </div>
            <div className="mt-8 rounded-md border border-copper/35 bg-copper/10 px-6 py-5 text-[1rem] text-cream2">
              Redstone Studios maintains a deliberately small client roster to ensure Mike's direct involvement in every engagement.
            </div>
          </Reveal>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-ink2 px-8 py-28">
        <div className="mx-auto max-w-content">
          <Reveal className="mb-14 max-w-[760px]">
            <Eyebrow>Industries</Eyebrow>
            <h2 className="mb-5 font-display text-[clamp(2.1rem,4.5vw,3.3rem)]">Built for Organizations That Do Real Work</h2>
            <p className="text-[1.08rem] text-muted">We serve organizations operating in complex, regulated, and high-stakes environments. Our engagements are calibrated to the operational realities of each sector — not retrofitted from a generic playbook.</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {industries.map(([h, p], i) => (
              <Reveal key={h} delay={(i % 2) * 0.08}>
                <div className="group h-full rounded-md border border-stone bg-ink3 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-copper/50">
                  <h4 className="mb-2 font-display text-[1.3rem] text-cream">{h}</h4>
                  <p className="text-[0.94rem]">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="px-8 py-28">
        <div className="mx-auto max-w-content">
          <Reveal className="mb-14 max-w-[760px]">
            <Eyebrow>Example Outcomes</Eyebrow>
            <h2 className="mb-5 font-display text-[clamp(2.1rem,4.5vw,3.3rem)]">What AI Transformation Looks Like in Practice</h2>
            <p className="text-[1.08rem] text-muted">The following are illustrative examples of the types of outcomes organizations have achieved through structured AI workflow transformation. These are representative scenarios, not client-specific claims or guarantees of results.</p>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {outcomes.map((o, i) => (
              <Reveal key={o.h} delay={i * 0.1}>
                <div className="h-full rounded-lg border border-stone bg-ink3 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-copper/50">
                  <h4 className="mb-5 font-display text-[1.4rem]">{o.h}</h4>
                  {[['Challenge', o.challenge], ['Approach', o.approach]].map(([k, v]) => (
                    <div key={k} className="mb-4">
                      <span className="mb-1 block text-[0.72rem] uppercase tracking-[0.12em] text-copperLt">{k}</span>
                      <p className="text-[0.93rem]">{v}</p>
                    </div>
                  ))}
                  <div className="mt-5 border-t border-stone pt-4">
                    <span className="mb-1 block text-[0.72rem] uppercase tracking-[0.12em] text-copperLt">Example Outcome</span>
                    <p className="text-[0.93rem] text-cream2">{o.outcome}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15}>
            <div className="mt-10 rounded-md border border-[rgba(80,110,160,0.3)] bg-[rgba(30,45,70,0.3)] px-6 py-5 text-[0.9rem] text-muted">
              These scenarios illustrate typical engagement patterns and representative outcomes. Individual results will vary based on organizational context, starting conditions, and implementation quality.
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-stone bg-[radial-gradient(ellipse_60%_100%_at_80%_50%,rgba(181,103,60,0.18),transparent_70%),#181614] px-8 py-28 text-center">
        <Reveal className="mx-auto max-w-content">
          <h2 className="mb-5 font-display text-[clamp(2rem,4vw,3rem)]">Work Directly With the Founder</h2>
          <p className="mx-auto mb-10 max-w-[560px] text-[1.05rem]">Redstone works with a select number of organizations at any given time. If you're serious about AI transformation, let's talk.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <BookButton />
            <GhostLink to="/services">View Services</GhostLink>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
