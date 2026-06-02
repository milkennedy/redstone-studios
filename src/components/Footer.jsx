import { Link } from 'react-router-dom'
import { Logo } from './ui.jsx'

const CAL = 'https://calendly.com/milkennedy/15min'

export default function Footer() {
  return (
    <footer className="border-t border-stone bg-ink2 px-8 pb-10 pt-16">
      <div className="mx-auto max-w-content">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-3 font-display text-[1.3rem] text-cream">
              <Logo className="h-[26px] w-[26px]" />
              Redstone Studios
            </Link>
            <p className="mt-4 max-w-[320px] text-[0.95rem] text-muted">
              A boutique AI transformation studio. We fix the gap between AI investment and AI value.
            </p>
          </div>
          <div>
            <h4 className="mb-5 font-body text-[0.78rem] font-medium uppercase tracking-[0.18em] text-muted2">Navigate</h4>
            {[['Home', '/'], ['Services', '/services'], ['About', '/about'], ['Contact', '/contact']].map(([t, to]) => (
              <Link key={to} to={to} className="mb-3 block text-[0.95rem] text-muted transition-colors hover:text-copperLt">{t}</Link>
            ))}
          </div>
          <div>
            <h4 className="mb-5 font-body text-[0.78rem] font-medium uppercase tracking-[0.18em] text-muted2">Get Started</h4>
            <a href={CAL} target="_blank" rel="noopener noreferrer" className="mb-3 block text-[0.95rem] text-muted transition-colors hover:text-copperLt">Book a Call</a>
            <Link to="/services" className="mb-3 block text-[0.95rem] text-muted transition-colors hover:text-copperLt">View Services</Link>
            <Link to="/contact" className="mb-3 block text-[0.95rem] text-muted transition-colors hover:text-copperLt">Discuss Requirements</Link>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-stone pt-7 text-[0.82rem] text-muted2">
          <span>© {new Date().getFullYear()} Redstone Studios. All rights reserved.</span>
          <span>Founded by Mike Kennedy, PhD</span>
        </div>
      </div>
    </footer>
  )
}
