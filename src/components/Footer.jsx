import { Link } from 'react-router-dom'
import { Logo, CAL, ACADEMY } from './ui.jsx'

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      {/* CTA strip */}
      <div className="mx-auto max-w-content px-6 py-20 md:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <h2 className="t-h2 max-w-2xl text-paper">Let's build what's next — together.</h2>
          <a href={CAL} target="_blank" rel="noopener noreferrer" className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-forest px-6 py-3.5 text-[0.95rem] font-medium text-paper transition-colors duration-300 ease-smooth hover:bg-forestLt">
            Let's Talk
            <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      <div className="mx-auto h-px max-w-content bg-lineDk" />

      <div className="mx-auto max-w-content px-6 py-14 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2.5 text-[1.05rem] font-semibold tracking-tight text-paper">
              <Logo className="h-7 w-7 text-forestLt" />
              <span>Mike Kennedy</span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-paperMut">
              An applied AI innovation studio led by Mike Kennedy, PhD. We combine science, data, AI and entrepreneurship to solve some of Canada's most important challenges.
            </p>
            <div className="label mt-6 text-forestLt">People · Planet · Profit</div>
          </div>
          <div>
            <h4 className="label mb-5 text-paperMut">Navigate</h4>
            {[['Home', '/'], ['About', '/about'], ['News', '/news'], ['Sectors', '/sectors'], ['Contact', '/contact']].map(([t, to]) => (
              <Link key={to} to={to} className="mb-3 block w-fit text-[0.95rem] text-paperMut transition-colors hover:text-paper">{t}</Link>
            ))}
          </div>
          <div>
            <h4 className="label mb-5 text-paperMut">Engage</h4>
            <a href={ACADEMY} target="_blank" rel="noopener noreferrer" className="mb-3 block w-fit text-[0.95rem] text-paperMut transition-colors hover:text-paper">AI Builder Academy ↗</a>
            <a href={CAL} target="_blank" rel="noopener noreferrer" className="mb-3 block w-fit text-[0.95rem] text-paperMut transition-colors hover:text-paper">Let's Talk</a>
            <Link to="/sectors" className="mb-3 block w-fit text-[0.95rem] text-paperMut transition-colors hover:text-paper">View Sectors</Link>
            <Link to="/about" className="mb-3 block w-fit text-[0.95rem] text-paperMut transition-colors hover:text-paper">About Mike</Link>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-lineDk pt-7 text-[0.82rem] text-paperMut">
          <span>© {new Date().getFullYear()} Mike Kennedy. All rights reserved.</span>
          <span>Applied AI Innovation Studio · Canada</span>
        </div>
      </div>
    </footer>
  )
}
