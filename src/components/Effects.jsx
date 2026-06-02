import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[10000] h-[2px] w-full origin-left bg-gradient-to-r from-copper to-copperLt"
    />
  )
}

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Only enable on devices with a fine pointer
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const over = (e) => {
      const t = e.target
      setHovering(!!t.closest('a, button, [data-cursor]'))
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[10001] rounded-full border border-copperLt/70 mix-blend-difference"
        animate={{
          x: pos.x - (hovering ? 22 : 14),
          y: pos.y - (hovering ? 22 : 14),
          width: hovering ? 44 : 28,
          height: hovering ? 44 : 28,
          opacity: 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30, mass: 0.4 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[10001] h-1 w-1 rounded-full bg-copperLt"
        animate={{ x: pos.x - 2, y: pos.y - 2 }}
        transition={{ type: 'spring', stiffness: 900, damping: 35 }}
      />
    </>
  )
}
