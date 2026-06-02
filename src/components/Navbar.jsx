import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo, CAL } from './ui.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [loc.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[1000] transition-all duration-500 ease-smooth ${
        scrolled ? 'border-b border-stone/70 bg-ink/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="flex items-center gap-3 font-display text-[1.25rem] text-cream" data-cursor>
          <Logo className="h-7 w-7 shrink-0" />
          <span>Mike <span className="text-copperLt">Kennedy</span></span>
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="group relative py-1 text-[0.9rem] tracking-wide">
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'text-cream' : 'text-muted transition-colors group-hover:text-cream'}>{l.label}</span>
                  {isActive && <motion.span layoutId="nav-ul" className="absolute -bottom-0.5 left-0 h-px w-full bg-copper" />}
                </>
              )}
            </NavLink>
          ))}
          <a href={CAL} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-copper/50 px-5 py-2.5 text-[0.85rem] font-medium tracking-wide text-copperLt transition-all duration-300 ease-smooth hover:border-copperLt hover:bg-copper hover:text-white">
            Book a Call
          </a>
        </div>

        <button onClick={() => setOpen((o) => !o)} className="text-cream md:hidden" aria-label="Menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[-1] bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: [0.2, 0.7, 0.3, 1] }}
              className="fixed right-0 top-0 flex h-[100svh] w-[80vw] max-w-[340px] flex-col justify-center gap-2 border-l border-stone bg-ink2 px-10 md:hidden"
            >
              {links.map((l, i) => (
                <motion.div key={l.to} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.07 }}>
                  <NavLink to={l.to} className={({ isActive }) => `block border-b border-stone/50 py-4 font-display text-[1.8rem] ${isActive ? 'text-cream' : 'text-muted'}`}>
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
              <a href={CAL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-fit rounded-sm bg-copper px-6 py-3 font-medium text-white">Book a Call</a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
