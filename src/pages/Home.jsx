import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView, useSpring, animate } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Layers, GitBranch, Map, ShieldAlert } from 'lucide-react'
import { BookButton, GhostLink, Eyebrow, Reveal } from '../components/ui.jsx'

/* ---------- Animated blueprint hex ---------- */
function Blueprint() {
  return (
    <svg className="absolute right-[-5%] top-1/2 h-[760px] w-[760px] -translate-y-1/2 opacity-[0.18]" viewBox="0 0 400 400" fill="none">
      <g stroke="#b5673c" strokeWidth="0.5">
        {[
          'M200,40 L330,115 L330,285 L200,360 L70,285 L70,115 Z',
          'M200,80 L295,135 L295,265 L200,320 L105,265 L105,135 Z',
          'M200,120 L260,155 L260,245 L200,280 L140,245 L140,155 Z',
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 2.2, delay: 0.4 + i * 0.3, ease: 'easeInOut' }}
          />
        ))}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2, duration: 1 }}
          style={{ transformOrigin: '200px 200px' }}
        >
          <line x1="200" y1="40" x2="200" y2="120" />
          <line x1="330" y1="115" x2="260" y2="155" />
          <line x1="330" y1="285" x2="260" y2="245" />
          <line x1="200" y1="360" x2="200" y2="280" />
          <line x1="70" y1="285" x2="140" y2="245" />
          <line x1="70" y1="115" x2="140" y2="155" />
        </motion.g>
      </g>
    </svg>
  )
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 160])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0.7, 0.3, 1] } },
  }

  return (
    <header ref={ref} className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(181,103,60,0.10),transparent_70%),linear-gradient(180deg,#1a1714_0%,#14110f_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,transparent_30%,rgba(0,0,0,0.55)_100%)]" />
      <Blueprint />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto w-full max-w-content px-8">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-[880px]">
          <motion.div variants={item}><span className="eyebrow mb-7">Boutique AI Transformation Studio</span></motion.div>
          <motion.h1 variants={item} className="mb-7 font-display text-[clamp(2.8rem,7vw,5.4rem)] font-normal leading-[1.05] tracking-tight text-balance">
            Build an <span className="shimmer">AI-Native</span> Organization
          </motion.h1>
          <motion.p variants={item} className="mb-10 max-w-[660px] text-[clamp(1.05rem,1.8vw,1.35rem)] font-light text-cream2">
            Redstone Studios helps executive teams identify, design, implement, and scale AI-powered workflows that improve productivity, decision-making, and organizational performance.
          </motion.p>
          <motion.div variants={item} className="flex flex-wrap gap-4">
            <BookButton />
            <GhostLink to="/services">View Services</GhostLink>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.72rem] uppercase tracking-[0.2em] text-muted2"
      >
        Scroll
        <motion.span
          className="h-9 w-px bg-gradient-to-b from-copper to-transparent"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </header>
  )
}

/* ---------- Problem ---------- */
const problems = [
  { icon: Layers, n: '01', h: 'Fragmented Adoption', p: 'Departments are piloting tools independently with no shared standards, no integration strategy, and no accountability for outcomes.' },
  { icon: GitBranch, n: '02', h: 'Unchanged Workflows', p: 'AI has been layered on top of legacy processes rather than used to redesign them. The underlying operating model remains the same.' },
  { icon: Map, n: '03', h: 'No Implementation Roadmap', p: 'Executives lack a clear, practical path from AI curiosity to measurable productivity. Strategy and execution remain disconnected.' },
  { icon: ShieldAlert, n: '04', h: 'Governance Gaps', p: 'Without clear AI policy, risk frameworks, or change management, organizations expose themselves to compliance, security, and reputational risk.' },
]

function Problem() {
  return (
    <section className="px-8 py-28">
      <div className="mx-auto max-w-content">
        <Reveal className="mb-14 max-w-[760px]">
          <Eyebrow>The Problem</Eyebrow>
          <h2 className="mb-5 font-display text-[clamp(2.1rem,4.5vw,3.3rem)]">AI Tools Are Everywhere. Results Are Not.</h2>
          <p className="text-[1.08rem] text-muted">
            Most organizations have purchased AI tools. Very few have changed anything about how they actually work. Teams experiment in isolation, governance is absent, workflows remain unchanged — and the productivity gains leadership promised the board have not materialized.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {problems.map((p, i) => {
            const Icon = p.icon
            return (
              <Reveal key={p.n} delay={i * 0.08}>
                <div className="group h-full rounded-md border border-stone bg-ink3 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-copper/50">
                  <div className="mb-4 flex items-center justify-between">
                    <Icon className="text-copper transition-transform duration-300 group-hover:scale-110" size={26} strokeWidth={1.5} />
                    <span className="font-display text-[0.9rem] tracking-widest text-copper">{p.n}</span>
                  </div>
                  <h3 className="mb-3 font-display text-[1.35rem] text-cream">{p.h}</h3>
                  <p className="text-[0.98rem]">{p.p}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------- Approach ---------- */
const phases = [
  { h: 'Assess', p: 'Map current state and spot top opportunities.' },
  { h: 'Design', p: 'Redesign workflows, governance, and teams.' },
  { h: 'Deploy', p: 'Implement tools, train teams, set standards.' },
  { h: 'Scale', p: 'Expand across departments and iterate.' },
]

function Approach() {
  return (
    <section className="bg-ink2 px-8 py-28">
      <div className="mx-auto max-w-content">
        <Reveal className="mb-14 max-w-[760px]">
          <Eyebrow>The Redstone Approach</Eyebrow>
          <h2 className="mb-5 font-display text-[clamp(2.1rem,4.5vw,3.3rem)]">Strategy. Design. Deployment. Scale.</h2>
          <p className="text-[1.08rem] text-muted">
            Redstone Studios is not a chatbot shop, and not traditional IT consultants. We are a boutique AI transformation studio operating at the intersection of organizational strategy and applied AI implementation. We fix the gap between AI investment and AI value.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {phases.map((ph, i) => (
            <Reveal key={ph.h} delay={i * 0.1}>
              <div className="group relative border-t-2 border-stone pt-9 transition-colors duration-500 hover:border-copper">
                <div className="mb-4 font-display text-[2.4rem] text-copper/85">0{i + 1}</div>
                <h3 className="mb-2 font-display text-[1.4rem]">{ph.h}</h3>
                <p className="text-[0.95rem]">{ph.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-[820px] text-[1.1rem] leading-relaxed text-muted">
            Our four-phase model ensures that every engagement moves from discovery to measurable organizational change — not just tool installation.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- Animated metric ---------- */
function Counter({ value, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.2, 0.7, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])
  return <span ref={ref}>{display}{suffix}</span>
}

const metrics = [
  { big: 4, suffix: '', lbl: 'Phase Model', p: 'Assess, Design, Deploy, Scale — a complete transformation framework.' },
  { big: 12, suffix: '+', lbl: 'Workflow Types', p: 'High-value operational workflows redesigned for AI-native execution.' },
  { big: 10, suffix: '+', lbl: 'Sectors Served', p: 'From mining and forestry to government and Indigenous enterprise.' },
  { big: 5, suffix: '', lbl: 'Engagement Options', p: 'Structured programs designed for every stage of organizational readiness.' },
]

function Metrics() {
  return (
    <section className="border-t border-stone px-8 py-28">
      <div className="mx-auto grid max-w-content grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
        {metrics.map((m, i) => (
          <Reveal key={m.lbl} delay={i * 0.1} className="text-center">
            <div className="font-display text-[3.4rem] leading-none text-cream">
              <Counter value={m.big} suffix={m.suffix} />
            </div>
            <div className="mb-2 mt-3 text-[0.78rem] uppercase tracking-[0.16em] text-copperLt">{m.lbl}</div>
            <p className="text-[0.88rem] text-muted2">{m.p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section className="border-t border-stone bg-[radial-gradient(ellipse_60%_100%_at_80%_50%,rgba(181,103,60,0.18),transparent_70%),#211d1a] px-8 py-28 text-center">
      <Reveal className="mx-auto max-w-content">
        <h2 className="mb-5 font-display text-[clamp(2rem,4vw,3rem)]">Ready to Redesign How Your Organization Works?</h2>
        <p className="mx-auto mb-10 max-w-[560px] text-[1.05rem]">
          Redstone Studios works with a select number of organizations at any given time. If you are an executive leader serious about AI transformation — not experimentation — we want to hear from you.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <BookButton />
          <GhostLink to="/services">Explore Services</GhostLink>
        </div>
      </Reveal>
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
