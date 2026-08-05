import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

// Slide-and-fade: outgoing page slides up and fades, incoming fades in from below.
// Kept subtle — this is a portfolio, not a showreel.
const variants = {
  initial:  { opacity: 0, y: 16 },
  animate:  { opacity: 1, y: 0,  transition: { duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] } },
  exit:     { opacity: 0, y: -8, transition: { duration: 0.2,  ease: 'easeIn' } },
}

export default function PageTransition({ children }) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}