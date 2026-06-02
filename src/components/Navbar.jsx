import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from './ui.jsx'

const CAL = 'https://calendly.com/milkennedy/15min'
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
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [loc.pathname])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-[1000] border-b transition-all duration-500 ${
        scrolled
          ? 'border-stone bg-ink/80 backdrop-blur-xl'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-8 py-[1.15rem]">
        <Link to="/" className="flex items-center gap-3 font-display text-[1.3rem] text-cream" data-cursor>
          <Logo className="h-[26px] w-[26px] shrink-0" />
          Redstone Studios
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `relative text-[0.92rem] tracking-wide transition-colors duration-200 ${
                  isActive ? 'text-cream' : 'text-muted hover:text-cream'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 h-px w-full bg-copper"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
          <a
            href={CAL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-copper px-5 py-2.5 text-[0.88rem] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-copperLt"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-cream md:hidden"
          aria-label="Menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.3, 1] }}
            className="fixed right-0 top-0 flex h-screen w-[78vw] max-w-[320px] flex-col justify-center gap-7 border-l border-stone bg-ink2 p-12 md:hidden"
          >
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-2xl ${isActive ? 'text-cream' : 'text-muted'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <a
              href={CAL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-fit rounded bg-copper px-6 py-3 font-medium text-white"
            >
              Book a Call
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
