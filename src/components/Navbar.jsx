import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo, CAL, EASE } from './ui.jsx'

const links = [
  { to: '/about', label: 'About' },
  { to: '/news', label: 'News' },
  { to: '/sectors', label: 'Sectors' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
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
      className={`fixed inset-x-0 top-0 z-[1000] transition-colors duration-300 ease-smooth ${
        scrolled ? 'border-b border-line bg-paper/85 backdrop-blur-xl' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <Link to="/" className="flex items-center gap-3 text-[1.35rem] font-semibold tracking-tight text-ink">
          <Logo className="h-9 w-9 shrink-0 text-forest" />
          <span>Mike Kennedy</span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className="group relative py-1 text-[0.92rem] font-medium">
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'text-ink' : 'text-muted transition-colors group-hover:text-ink'}>{l.label}</span>
                  {isActive && <motion.span layoutId="nav-underline" className="absolute -bottom-0.5 left-0 h-px w-full bg-forest" />}
                </>
              )}
            </NavLink>
          ))}
          <a href={CAL} target="_blank" rel="noopener noreferrer" className="rounded-md bg-forest px-5 py-2.5 text-[0.9rem] font-medium text-paper transition-colors duration-300 ease-smooth hover:bg-forestDk">
            Let's Talk
          </a>
        </div>

        <button onClick={() => setOpen((o) => !o)} className="text-ink md:hidden" aria-label="Menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[-1] bg-ink/30 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: EASE }}
              className="fixed right-0 top-0 flex h-[100svh] w-[80vw] max-w-[340px] flex-col justify-center gap-1 border-l border-line bg-paper px-10 md:hidden"
            >
              {[{ to: '/', label: 'Home' }, ...links].map((l) => (
                <NavLink key={l.to} to={l.to} className={({ isActive }) => `block border-b border-line py-4 text-[1.4rem] font-medium ${isActive ? 'text-forest' : 'text-ink'}`}>
                  {l.label}
                </NavLink>
              ))}
              <a href={CAL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex w-fit rounded-md bg-forest px-6 py-3 font-medium text-paper">Let's Talk</a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
