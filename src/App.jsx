import { useEffect } from 'react'
import { Routes, Route, useLocation, Link } from 'react-router-dom'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { ScrollProgress, CustomCursor } from './components/Effects.jsx'
import { PrimaryCTA } from './components/ui.jsx'
import Home from './pages/Home.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'

const TITLES = {
  '/': 'Mike Kennedy — AI Transformation Advisor',
  '/services': 'Services — Mike Kennedy',
  '/about': 'About — Mike Kennedy, PhD',
  '/contact': 'Contact — Mike Kennedy',
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = TITLES[pathname] || 'Mike Kennedy — AI Transformation Advisor'
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <main className="flex min-h-[70svh] items-center px-6 md:px-10">
      <div className="mx-auto w-full max-w-content">
        <div className="kicker mb-6">Error 404</div>
        <h1 className="t-h1 font-display text-cream">This page doesn't exist.</h1>
        <p className="mt-6 max-w-prose text-[1.05rem] leading-relaxed text-muted">
          The page you're looking for may have moved or never existed. Let's get you back on track.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-8">
          <PrimaryCTA>Book an AI Transformation Call</PrimaryCTA>
          <Link to="/" className="link-underline pb-0.5 text-[0.92rem] font-medium text-cream">Return Home</Link>
        </div>
      </div>
    </main>
  )
}

function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.2, 0.7, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <ScrollProgress />
        <CustomCursor />
        <Navbar />
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Page><Home /></Page>} />
            <Route path="/services" element={<Page><Services /></Page>} />
            <Route path="/about" element={<Page><About /></Page>} />
            <Route path="/contact" element={<Page><Contact /></Page>} />
            <Route path="*" element={<Page><NotFound /></Page>} />
          </Routes>
        </AnimatePresence>
        <Footer />
      </div>
    </MotionConfig>
  )
}
