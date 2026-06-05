import { useEffect } from 'react'
import { Routes, Route, useLocation, Link, Navigate } from 'react-router-dom'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { ScrollProgress } from './components/Effects.jsx'
import { PrimaryCTA, GhostCTA, EASE } from './components/ui.jsx'
import Home from './pages/Home.jsx'
import Sectors from './pages/Sectors.jsx'
import About from './pages/About.jsx'
import News from './pages/News.jsx'
import Newsletter from './pages/Newsletter.jsx'
import Contact from './pages/Contact.jsx'

const TITLES = {
  '/': 'Mike Kennedy, PhD | Applied AI Innovation Studio',
  '/sectors': 'Sectors — Mike Kennedy',
  '/about': 'About Mike Kennedy, PhD',
  '/news': 'News — Mike Kennedy',
  "/contact": "Let's Talk — Mike Kennedy",
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = TITLES[pathname] || 'Mike Kennedy'
  }, [pathname])
  return null
}

function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function NotFound() {
  return (
    <main className="flex min-h-[72svh] items-center px-6 md:px-10">
      <div className="mx-auto w-full max-w-content">
        <div className="label mb-5 text-forest">Error 404</div>
        <h1 className="t-hero text-ink">This page doesn't exist.</h1>
        <p className="t-lead mt-6 max-w-prose text-muted">
          The page you're looking for may have moved or never existed. Let's get you back on track.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <PrimaryCTA to="/">Return Home</PrimaryCTA>
          <GhostCTA to="/sectors">View Sectors</GhostCTA>
        </div>
      </div>
    </main>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgress />
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/sectors" element={<Page><Sectors /></Page>} />
          <Route path="/projects" element={<Navigate to="/sectors" replace />} />
          <Route path="/about" element={<Page><About /></Page>} />
          <Route path="/news" element={<Page><News /></Page>} />
          <Route path="/newsletter/:slug" element={<Page><Newsletter /></Page>} />
          <Route path="/contact" element={<Page><Contact /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  )
}
