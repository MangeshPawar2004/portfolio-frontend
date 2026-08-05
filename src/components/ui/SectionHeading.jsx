import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle, center = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={center ? 'text-center' : ''}
    >
      {eyebrow && (
        <p className="text-xs font-semibold tracking-widest uppercase text-[#3B82F6] mb-3">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[#F5F5F5] mb-4">{title}</h2>
      {subtitle && (
        <p className="text-[#A1A1AA] max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}