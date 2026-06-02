import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

export const CAL = 'https://calendly.com/milkennedy/15min'

export function Logo({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="18" width="26" height="11" rx="1.5" fill="#b5673c" />
      <line x1="16" y1="18" x2="16" y2="29" stroke="#14110f" strokeWidth="1.4" />
      <line x1="3" y1="23.5" x2="29" y2="23.5" stroke="#14110f" strokeWidth="1.4" />
      <path d="M16 18 C16 12, 11 11, 11 6 C14 8, 16 6, 16 3 C16 6, 18 8, 21 6 C21 11, 16 12, 16 18Z" fill="#d59873" />
    </svg>
  )
}

/* Solid primary — used sparingly */
export function PrimaryCTA({ children = 'Book an AI Transformation Call', href = CAL, className = '' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2.5 rounded-sm bg-copper px-7 py-4 font-body text-[0.9rem] font-medium tracking-wide text-white transition-all duration-300 ease-smooth hover:bg-copperLt ${className}`}
    >
      {children}
      <ArrowRight size={17} className="transition-transform duration-300 ease-smooth group-hover:translate-x-1" />
    </a>
  )
}

/* Underlined editorial link — the BCG "Learn More" pattern */
export function ArrowLink({ to, href, children, className = '' }) {
  const inner = (
    <span className="group inline-flex items-center gap-2 font-body text-[0.92rem] font-medium tracking-wide text-cream">
      <span className="link-underline pb-0.5">{children}</span>
      <ArrowUpRight size={16} className="text-copperLt transition-transform duration-300 ease-smooth group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  )
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{inner}</a>
  return <Link to={to} className={className}>{inner}</Link>
}

export function Kicker({ children, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-8 bg-copper" />
      <span className="kicker">{children}</span>
    </div>
  )
}

/* Scroll reveal with subtle clip + rise */
export function Reveal({ children, delay = 0, className = '', y = 24 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* Letter-by-letter / word-by-word headline rise */
export function RevealHeading({ text, className = '', as: Tag = 'h2', delay = 0 }) {
  const words = text.split(' ')
  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-top">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: delay + i * 0.05, ease: [0.2, 0.7, 0.3, 1] }}
          >
            {w}{i < words.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
