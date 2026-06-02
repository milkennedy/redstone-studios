import { Link } from 'react-router-dom'
import { Logo, CAL } from './ui.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-stone bg-ink2">
      {/* CTA strip */}
      <div className="mx-auto max-w-content px-6 py-20 md:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="t-h2 max-w-2xl font-display text-cream">Let's build your AI-native organization.</h2>
          <a href={CAL} target="_blank" rel="noopener noreferrer" className="group inline-flex shrink-0 items-center gap-2.5 rounded-sm bg-copper px-7 py-4 text-[0.9rem] font-medium tracking-wide text-white transition-all duration-300 ease-smooth hover:bg-copperLt">
            Book an AI Transformation Call
            <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      <div className="hairline mx-auto max-w-content" />

      <div className="mx-auto max-w-content px-6 py-14 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3 font-display text-[1.25rem] text-cream">
              <Logo className="h-7 w-7" />
              <span>Redstone <span className="text-copperLt">Studios</span></span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-muted">
              A boutique AI transformation studio operating at the intersection of organizational strategy and applied AI implementation. We fix the gap between AI investment and AI value.
            </p>
          </div>
          <div>
            <h4 className="mb-5 font-body text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted2">Navigate</h4>
            {[['Home', '/'], ['Services', '/services'], ['About', '/about'], ['Contact', '/contact']].map(([t, to]) => (
              <Link key={to} to={to} className="mb-3 block w-fit text-[0.95rem] text-muted transition-colors hover:text-copperLt">{t}</Link>
            ))}
          </div>
          <div>
            <h4 className="mb-5 font-body text-[0.72rem] font-medium uppercase tracking-[0.22em] text-muted2">Get Started</h4>
            <a href={CAL} target="_blank" rel="noopener noreferrer" className="mb-3 block w-fit text-[0.95rem] text-muted transition-colors hover:text-copperLt">Book a Call</a>
            <Link to="/services" className="mb-3 block w-fit text-[0.95rem] text-muted transition-colors hover:text-copperLt">View Services</Link>
            <Link to="/contact" className="mb-3 block w-fit text-[0.95rem] text-muted transition-colors hover:text-copperLt">Discuss Requirements</Link>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-stone/60 pt-7 text-[0.8rem] text-muted2">
          <span>© {new Date().getFullYear()} Redstone Studios. All rights reserved.</span>
          <span>Founded by Mike Kennedy, PhD · Canada</span>
        </div>
      </div>
    </footer>
  )
}
