import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const CAL = 'https://calendly.com/milkennedy/15min'
export const EASE = [0.22, 0.61, 0.36, 1]

/* Topographic peak mark — concentric contours rising to a node */
export function Logo({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.25">
        <circle cx="16" cy="17" r="13.4" />
        <circle cx="16" cy="15.5" r="9" />
        <circle cx="16" cy="14" r="4.6" />
      </g>
      <circle cx="16" cy="12.4" r="1.7" fill="#B26E3A" />
    </svg>
  )
}

/* Mono eyebrow with a short rule */
export function Eyebrow({ children, className = '', tone = 'forest' }) {
  const c = tone === 'paper' ? 'text-copper' : tone === 'river' ? 'text-river' : 'text-forest'
  const rule = tone === 'paper' ? 'bg-copper/60' : 'bg-forest/50'
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className={`h-px w-7 shrink-0 ${rule}`} />
      <span className={`label min-w-0 ${c}`}>{children}</span>
    </div>
  )
}

/* Primary — solid forest. Internal (to) or external (href). */
export function PrimaryCTA({ children = "Let's Talk", href, to = '/contact', className = '' }) {
  const cls = `group inline-flex items-center justify-center gap-2 rounded-md bg-forest px-6 py-3.5 text-[0.95rem] font-medium text-paper transition-colors duration-300 ease-smooth hover:bg-forestDk ${className}`
  const inner = <>{children}<ArrowRight size={17} className="transition-transform duration-300 ease-smooth group-hover:translate-x-1" /></>
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  return <Link to={to} className={cls}>{inner}</Link>
}

/* Secondary — outline. */
export function GhostCTA({ children = 'View Sectors', href, to = '/sectors', className = '', dark = false }) {
  const border = dark ? 'border-paper/25 text-paper hover:bg-paper/10' : 'border-ink/15 text-ink hover:bg-ink/[0.04]'
  const cls = `group inline-flex items-center justify-center gap-2 rounded-md border px-6 py-3.5 text-[0.95rem] font-medium transition-colors duration-300 ease-smooth ${border} ${className}`
  const inner = <>{children}<ArrowRight size={17} className="transition-transform duration-300 ease-smooth group-hover:translate-x-1" /></>
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{inner}</a>
  return <Link to={to} className={cls}>{inner}</Link>
}

/* Editorial underline link */
export function ArrowLink({ to, href, children, className = '', dark = false }) {
  const inner = (
    <span className={`group inline-flex items-center gap-1.5 text-[0.95rem] font-medium ${dark ? 'text-paper' : 'text-ink'}`}>
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowUpRight size={16} className="text-forest transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  )
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{inner}</a>
  return <Link to={to} className={className}>{inner}</Link>
}

/* Subtle fade-up reveal — <=300ms motion budget */
export function Reveal({ children, delay = 0, y = 14, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.3, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Decorative topographic contour lines (very subtle) */
export function Topo({ className = '', stroke = 'currentColor' }) {
  return (
    <svg className={className} viewBox="0 0 600 600" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g stroke={stroke} strokeWidth="1">
        {[260, 210, 165, 125, 90, 60, 35].map((r, i) => (
          <ellipse key={i} cx={320 - i * 6} cy={300 + i * 4} rx={r} ry={r * 0.82} />
        ))}
      </g>
    </svg>
  )
}
