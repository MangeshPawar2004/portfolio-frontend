// src/components/ui/SectionHeading.jsx — FULL REPLACEMENT
import { motion } from 'framer-motion'

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={center ? 'text-center' : ''}
    >
      {/* Eyebrow — tight tracking, bold, small */}
      {eyebrow && (
        <p className="text-[11px] font-black tracking-[0.15em] uppercase
                      text-[var(--accent)] mb-4">
          {eyebrow}
        </p>
      )}

      {/* Title — dominant, no margin bottom if no subtitle */}
      <h2 className={`text-[var(--text-primary)] ${subtitle ? 'mb-4' : ''}`}>
        {title}
      </h2>

      {/* Subtitle — muted, comfortable reading width */}
      {subtitle && (
        <p className="text-[var(--text-muted)] text-base leading-relaxed max-w-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}