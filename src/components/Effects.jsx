import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[10000] h-[2px] w-full origin-left bg-gradient-to-r from-copperDk via-copper to-copperLt"
    />
  )
}

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [variant, setVariant] = useState('default') // default | link
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const over = (e) => setVariant(e.target.closest('a, button, [data-cursor]') ? 'link' : 'default')
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  if (!enabled) return null
  const size = variant === 'link' ? 48 : 30

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[10001] rounded-full border border-copperLt/60 mix-blend-difference"
        animate={{ x: pos.x - size / 2, y: pos.y - size / 2, width: size, height: size }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.5 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[10001] h-1 w-1 rounded-full bg-copperLt"
        animate={{ x: pos.x - 2, y: pos.y - 2, opacity: variant === 'link' ? 0 : 1 }}
        transition={{ type: 'spring', stiffness: 900, damping: 35 }}
      />
    </>
  )
}
