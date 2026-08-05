import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

/**
 * Animates a number from 0 to `end` when it enters the viewport.
 * Used for metrics, stats, experience years.
 */
export default function CountUp({ end, duration = 1500, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })
  const rafRef = useRef(null)

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()

    const step = (now) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }

    rafRef.current = requestAnimationFrame(step)
    return () => rafRef.current && cancelAnimationFrame(rafRef.current)
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}