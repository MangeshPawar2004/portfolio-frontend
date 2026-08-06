// src/components/ui/SectionHeading.jsx
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
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={center ? 'text-center' : ''}
    >
      {/* Eyebrow — orange, uppercase, bold */}
      {eyebrow && (
        <p className="text-[11px] font-black tracking-[0.2em] uppercase
                      text-[var(--accent)] mb-4 flex items-center gap-2">
          <span className="w-8 h-[2px] bg-[var(--accent)] inline-block" />
          {eyebrow}
        </p>
      )}

      {/* Title — dominant */}
      <h2 className={`text-[var(--text-primary)] ${subtitle ? 'mb-4' : ''}`}>
        {title}
      </h2>

      {/* Subtitle — muted */}
      {subtitle && (
        <p className="text-[var(--text-muted)] text-base leading-relaxed max-w-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}