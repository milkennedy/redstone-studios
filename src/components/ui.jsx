import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export function Logo({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="18" width="26" height="11" rx="1.5" fill="#b5673c" />
      <line x1="16" y1="18" x2="16" y2="29" stroke="#181614" strokeWidth="1.4" />
      <line x1="3" y1="23.5" x2="29" y2="23.5" stroke="#181614" strokeWidth="1.4" />
      <path d="M16 18 C16 12, 11 11, 11 6 C14 8, 16 6, 16 3 C16 6, 18 8, 21 6 C21 11, 16 12, 16 18Z" fill="#d59873" />
    </svg>
  )
}

const CAL = 'https://calendly.com/milkennedy/15min'

export function BookButton({ children = 'Book an AI Transformation Call', className = '' }) {
  return (
    <a
      href={CAL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded bg-copper px-7 py-4 font-body text-[0.95rem] font-medium text-white shadow-[0_10px_30px_-12px_rgba(181,103,60,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-copperLt hover:shadow-[0_16px_40px_-12px_rgba(181,103,60,0.7)] ${className}`}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  )
}

export function GhostLink({ to, href, children, className = '' }) {
  const cls = `group inline-flex items-center gap-2 rounded border border-copper/45 bg-transparent px-7 py-4 font-body text-[0.95rem] font-medium text-copperLt transition-all duration-300 hover:border-copperLt hover:bg-copper/10 hover:text-cream ${className}`
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>{children}</a>
  return <Link to={to} className={cls}>{children}</Link>
}

export function Eyebrow({ children }) {
  return <span className="eyebrow mb-7">{children}</span>
}

// Scroll reveal wrapper
export function Reveal({ children, delay = 0, y = 28, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.2, 0.7, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
