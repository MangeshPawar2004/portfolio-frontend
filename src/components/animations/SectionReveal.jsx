import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

/**
 * Wraps any section — triggers reveal once when 15% of the section enters viewport.
 * Usage: <SectionReveal><YourSection /></SectionReveal>
 */
export default function SectionReveal({ children, delay = 0, className = '' }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}