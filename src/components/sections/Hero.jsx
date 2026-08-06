import { motion } from 'framer-motion'
import { ArrowRight, Mail, MapPin } from 'lucide-react'
import { useSettings } from '@/hooks/useSettings'
import { SOCIAL_LINKS } from '@/constants'

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Single centered glow — not two competing ones */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 40%, rgba(59,130,246,0.06) 0%, transparent 65%)',
        }}
      />
      {/* Faint grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          opacity: 0.35,
          maskImage: 'radial-gradient(ellipse 80% 80% at 20% 40%, black 0%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 80% at 20% 40%, black 0%, transparent 100%)',
        }}
      />
    </div>
  )
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
}

const item = {
  hidden:  { opacity: 0, y: 22 },
  show:    { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function Hero() {
  const { data: settings } = useSettings()

  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      <HeroBackground />

      {/* Full-width container for proper alignment with rest of page */}
      <div className="container relative z-10 py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl"
        >

          {/* ── Availability pill ── */}
          <motion.div variants={item} className="mb-8">
            {settings?.availableForWork ? (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                               text-xs font-semibold tracking-wide
                               bg-[var(--success-muted)] border border-[var(--success)]/20
                               text-[var(--success)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full
                                   bg-[var(--success)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5
                                   bg-[var(--success)]" />
                </span>
                {settings.availabilityNote || 'Open to new opportunities'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                               text-xs font-medium bg-[var(--bg-subtle)]
                               border border-[var(--border)] text-[var(--text-muted)]">
                <MapPin size={11} />
                Navi Mumbai, India
              </span>
            )}
          </motion.div>

          {/* ── Name — the largest, most dominant element ── */}
          <motion.div variants={item} className="mb-6">
            <h1 className="font-black text-[var(--text-primary)] leading-[1.05]">
              {settings?.heroName || 'Mangesh Pawar'}
            </h1>
          </motion.div>

          {/* ── What he does — fixed copy, accent on action not title ── */}
          <motion.div variants={item} className="mb-6">
            <p className="text-xl sm:text-2xl font-medium leading-relaxed text-[var(--text-secondary)]">
              Full Stack Developer &amp; AI Engineer —{' '}
              <span className="accent-gradient font-semibold">
                building production systems
              </span>{' '}
              that actually ship.
            </p>
          </motion.div>

          {/* ── Tagline ── */}
          <motion.div variants={item} className="mb-12">
            <p className="text-base text-[var(--text-muted)] max-w-xl leading-relaxed">
              {settings?.heroTagline ||
                'React · Node.js · .NET · Azure · LangChain. Currently at Cogitate, open to AI Engineer and Full Stack roles.'}
            </p>
          </motion.div>

          {/* ── CTAs — clear hierarchy: primary fills, secondary is ghost ── */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-14">
            {/* Primary — filled, high contrast */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                         text-sm font-semibold text-white bg-[var(--accent)]
                         hover:bg-[var(--accent-hover)] transition-colors duration-200
                         shadow-lg shadow-[var(--accent)]/20"
            >
              View Projects
              <ArrowRight size={15} />
            </a>

            {/* Secondary — outlined, clearly lower priority */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl
                         text-sm font-semibold text-[var(--text-secondary)]
                         border border-[var(--border-hover)]
                         hover:text-[var(--text-primary)] hover:border-[var(--text-muted)]
                         transition-all duration-200"
            >
              Contact Me
            </a>
          </motion.div>

          {/* ── Social links — icons only, spaced, no separator clutter ── */}
          <motion.div variants={item}
            className="flex items-center gap-1">
            {[
              { href: SOCIAL_LINKS.github,   icon: Mail,   label: 'GitHub' },
              { href: SOCIAL_LINKS.linkedin, icon: Mail, label: 'LinkedIn' },
              { href: SOCIAL_LINKS.email,    icon: Mail,     label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="p-2.5 rounded-lg text-[var(--text-muted)]
                           hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]
                           transition-all duration-200"
              >
                <Icon size={17} />
              </a>
            ))}

            <span className="mx-3 h-4 w-px bg-[var(--border)]" />

            <span className="text-xs text-[var(--text-muted)]">
              Based in India · Remote-friendly
            </span>
          </motion.div>

        </motion.div>
      </div>

      {/* ── Scroll hint — bottom center ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-[var(--border)]
                     flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-[var(--text-muted)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}