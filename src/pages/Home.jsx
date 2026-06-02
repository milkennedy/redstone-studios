import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { PrimaryCTA, ArrowLink, Kicker, Reveal, RevealHeading } from '../components/ui.jsx'
import mike from '../assets/mike.jpg'

/* ============ HERO ============ */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])
  const blueprint = useTransform(scrollYProgress, [0, 1], [0, -120])
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 70])

  return (
    <header ref={ref} className="relative flex min-h-[92svh] items-center overflow-hidden pb-20 pt-32 md:pt-36">
      {/* atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_72%_35%,rgba(181,103,60,0.13),transparent_64%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#14110f_0%,#19150f_55%,#14110f_100%)]" />

      {/* drifting blueprint */}
      <motion.svg style={{ y: blueprint }} className="pointer-events-none absolute left-[-12%] top-1/2 h-[640px] w-[640px] -translate-y-1/2 opacity-[0.10]" viewBox="0 0 400 400" fill="none">
        <g stroke="#b5673c" strokeWidth="0.5">
          {['M200,30 L340,110 L340,290 L200,370 L60,290 L60,110 Z','M200,75 L300,130 L300,270 L200,325 L100,270 L100,130 Z','M200,120 L260,155 L260,245 L200,280 L140,245 L140,155 Z'].map((d,i)=>(
            <motion.path key={i} d={d} initial={{pathLength:0,opacity:0}} animate={{pathLength:1,opacity:0.6}} transition={{duration:2.4,delay:0.5+i*0.35,ease:'easeInOut'}} />
          ))}
        </g>
      </motion.svg>

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto grid w-full max-w-content grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-[1.25fr_0.85fr] lg:gap-16">
        {/* text */}
        <div>
          <Reveal delay={0.1}><Kicker className="mb-7">AI Transformation Advisor</Kicker></Reveal>
          <h1 className="t-hero font-display text-cream">
            <RevealHeading as="span" text="Build an" delay={0.2} className="block" />
            <span className="block">
              <span className="rise-mask inline-block align-top">
                <motion.span className="inline-block italic text-copperLt" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease: [0.2, 0.7, 0.3, 1] }}>AI-Native</motion.span>
              </span>
              {'\u00A0'}
              <span className="rise-mask inline-block align-top">
                <motion.span className="inline-block" initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: [0.2, 0.7, 0.3, 1] }}>Organization</motion.span>
              </span>
            </span>
          </h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8 }} className="mt-9">
            <p className="max-w-prose text-[1.1rem] font-light leading-relaxed text-cream2">
              I help executive teams identify, design, implement, and scale AI-powered workflows that improve productivity, decision-making, and organizational performance.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-4">
              <PrimaryCTA />
              <ArrowLink to="/services" className="self-center">View Services</ArrowLink>
            </div>
          </motion.div>
        </div>

        {/* portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[340px] lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-sm border border-stone">
            <div className="aspect-[4/4.7] overflow-hidden">
              <motion.img src={mike} alt="Mike Kennedy \u2014 AI Transformation Advisor" style={{ y: portraitY, scale: 1.1 }} className="h-full w-full object-cover object-[50%_14%]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/65 to-transparent p-6 pt-16">
              <div className="font-display text-[1.5rem] leading-none text-cream">Mike Kennedy</div>
              <div className="mt-2 text-[0.82rem] uppercase tracking-[0.16em] text-copperLt">AI Transformation Advisor</div>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-3 -top-3 -z-10 h-full w-full rounded-sm border border-copper/30" />
        </motion.div>
      </motion.div>
    </header>
  )
}

/* ============ PROBLEM ============ */
const problems = [
  ['01', 'Fragmented Adoption', 'Departments are piloting tools independently with no shared standards, no integration strategy, and no accountability for outcomes.'],
  ['02', 'Unchanged Workflows', 'AI has been layered on top of legacy processes rather than used to redesign them. The underlying operating model remains the same.'],
  ['03', 'No Implementation Roadmap', 'Executives lack a clear, practical path from AI curiosity to measurable productivity. Strategy and execution remain disconnected.'],
  ['04', 'Governance Gaps', 'Without clear AI policy, risk frameworks, or change management, organizations expose themselves to compliance, security, and reputational risk.'],
]

function Problem() {
  return (
    <section className="relative px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-content">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal><Kicker className="mb-7">The Problem</Kicker></Reveal>
            <RevealHeading as="h2" text="AI tools are everywhere. Results are not." className="t-h2 font-display text-cream" />
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-prose text-[1.05rem] leading-relaxed text-muted">
                Most organizations have purchased AI tools. Very few have changed anything about how they actually work. Teams experiment in isolation, governance is absent, workflows remain unchanged — and the productivity gains leadership promised the board have not materialized.
              </p>
            </Reveal>
          </div>
          <div>
            {problems.map(([n, h, p], i) => (
              <Reveal key={n} delay={i * 0.08}>
                <div className="group grid grid-cols-[auto_1fr] gap-6 border-t border-stone/70 py-8 transition-colors duration-300 hover:border-copper/60">
                  <span className="font-display text-[1.6rem] text-copper/70 transition-colors group-hover:text-copperLt">{n}</span>
                  <div>
                    <h3 className="mb-2 font-display text-[1.45rem] text-cream">{h}</h3>
                    <p className="text-[0.98rem] leading-relaxed text-muted">{p}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ============ APPROACH (sticky scroll) ============ */
const phases = [
  ['Assess', 'Map current state and spot top opportunities.', 'I begin with a clear-eyed audit of how work actually happens — surfacing the workflows that consume the most time and return the least leverage.'],
  ['Design', 'Redesign workflows, governance, and teams.', 'I rebuild the operating model around AI-native execution: new processes, clear governance, and teams structured to capture the gains.'],
  ['Deploy', 'Implement tools, train teams, set standards.', 'I put working systems into the hands of your people, with the training and standards needed to make adoption stick.'],
  ['Scale', 'Expand across departments and iterate.', 'I extend what works across the organization, measuring impact and compounding returns department by department.'],
]

function Approach() {
  return (
    <section className="border-y border-stone bg-ink2 px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-content">
        <div className="mb-12 max-w-3xl">
          <Reveal><Kicker className="mb-7">How I Work</Kicker></Reveal>
          <RevealHeading as="h2" text="Strategy. Design. Deployment. Scale." className="t-h2 font-display text-cream" />
          <Reveal delay={0.15}>
            <p className="mt-7 text-[1.05rem] leading-relaxed text-muted">
              I'm not a chatbot vendor, and not a traditional IT consultant. My four-phase model ensures every engagement moves from discovery to measurable organizational change — not just tool installation.
            </p>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-stone bg-stone md:grid-cols-2">
          {phases.map(([h, sub, body], i) => (
            <Reveal key={h} delay={(i % 2) * 0.1}>
              <div className="group relative h-full bg-ink3 p-9 transition-colors duration-500 hover:bg-ink4 md:p-11">
                <span className="watermark absolute right-6 top-4 text-[5rem] leading-none">0{i + 1}</span>
                <div className="relative">
                  <div className="mb-1 flex items-center gap-3">
                    <span className="h-px w-6 bg-copper" />
                    <span className="kicker">Phase 0{i + 1}</span>
                  </div>
                  <h3 className="t-h3 mb-3 mt-4 font-display text-cream">{h}</h3>
                  <p className="mb-4 font-display text-[1.05rem] italic text-copperLt">{sub}</p>
                  <p className="text-[0.97rem] leading-relaxed text-muted">{body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============ METRICS ============ */
function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [d, setD] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, value, { duration: 1.6, ease: [0.2, 0.7, 0.3, 1], onUpdate: (v) => setD(Math.round(v)) })
    return () => c.stop()
  }, [inView, value])
  return <span ref={ref}>{d}{suffix}</span>
}

const metrics = [
  [4, '', 'Phase Model', 'Assess, Design, Deploy, Scale — a complete transformation framework.'],
  [12, '+', 'Workflow Types', 'High-value operational workflows redesigned for AI-native execution.'],
  [10, '+', 'Sectors Served', 'From mining and forestry to government and Indigenous enterprise.'],
  [5, '', 'Engagement Options', 'Structured programs designed for every stage of organizational readiness.'],
]

function Metrics() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto grid max-w-content grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-4">
        {metrics.map(([big, suf, lbl, p], i) => (
          <Reveal key={lbl} delay={i * 0.1}>
            <div className="border-t border-copper/40 pt-5">
              <div className="font-display text-[clamp(3rem,5vw,4.5rem)] leading-none text-cream"><Counter value={big} suffix={suf} /></div>
              <div className="mt-4 font-body text-[0.72rem] uppercase tracking-[0.2em] text-copperLt">{lbl}</div>
              <p className="mt-3 text-[0.88rem] leading-relaxed text-muted2">{p}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ============ CTA ============ */
function CTA() {
  return (
    <section className="relative overflow-hidden border-t border-stone px-6 py-24 md:px-10 md:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_75%_50%,rgba(181,103,60,0.16),transparent_70%)]" />
      <div className="relative mx-auto max-w-content">
        <div className="max-w-3xl">
          <Reveal><Kicker className="mb-7">Begin</Kicker></Reveal>
          <RevealHeading as="h2" text="Ready to redesign how your organization works?" className="t-h1 font-display text-cream" />
          <Reveal delay={0.15}>
            <p className="mt-7 max-w-prose text-[1.1rem] leading-relaxed text-muted">
              I work with a select number of organizations at any given time. If you're an executive leader serious about AI transformation — not experimentation — I want to hear from you.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-8">
              <PrimaryCTA />
              <ArrowLink to="/services">Explore Services</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Approach />
      <Metrics />
      <CTA />
    </main>
  )
}
