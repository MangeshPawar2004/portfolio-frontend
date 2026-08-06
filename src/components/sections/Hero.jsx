import { motion } from 'framer-motion'
import { ArrowRight, ExternalLink, Mail, MapPin } from 'lucide-react'
import { useSettings } from '@/hooks/useSettings'
import { SOCIAL_LINKS } from '@/constants'

/* ── Inline GitHub icon ── */
function GitHubIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

/* ── Inline LinkedIn icon ── */
function LinkedInIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

/* ── Decorative star SVG ── */
function OrangeStar({ size = 24, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
        fill="currentColor"
      />
    </svg>
  )
}

/* ── Marquee ticker strip ── */
const TICKER_ITEMS = [
  'FULL STACK DEVELOPMENT',
  'AI ENGINEERING',
  'REACT & NODE.JS',
  '.NET & AZURE',
  'BLOCKCHAIN',
  'PRODUCTION SYSTEMS',
  'LANGCHAIN & FAISS',
  'CLOUD ARCHITECTURE',
]

function MarqueeTicker() {
  return (
    <div className="w-full overflow-hidden border-t-2 border-b-2 border-[var(--text-primary)]
                    bg-[var(--text-primary)] py-3 -rotate-1 scale-[1.02]">
      <div className="marquee-track">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-4 whitespace-nowrap">
            <span className="text-sm font-bold tracking-[0.1em] text-[var(--bg-base)]">
              {item}
            </span>
            <OrangeStar size={14} className="text-[var(--accent)]" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Animation variants ── */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Hero() {
  const { data: settings } = useSettings()

  return (
    <section className="relative min-h-[100vh] flex flex-col overflow-hidden">

      {/* ── Decorative corner shapes ── */}
      <div className="absolute top-20 right-8 md:right-16 lg:right-24" aria-hidden="true">
        <div className="w-24 h-24 md:w-40 md:h-40 border-4 border-[var(--accent)]
                        rotate-12 transition-transform" />
        <div className="w-16 h-16 md:w-28 md:h-28 bg-[var(--accent)]
                        -mt-8 ml-12 md:-mt-12 md:ml-20" />
      </div>

      {/* ── Main content ── */}
      <div className="container relative z-10 flex-1 flex items-center py-32 lg:py-40">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >

          {/* Availability pill */}
          <motion.div variants={item} className="mb-8">
            {settings?.availableForWork ? (
              <span className="inline-flex items-center gap-2.5 px-4 py-2 border-2 border-[var(--success)]
                               text-xs font-bold tracking-[0.08em] uppercase
                               text-[var(--success)] bg-[var(--success-muted)]">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-ring absolute inline-flex h-full w-full
                                   bg-[var(--success)]" style={{ borderRadius: '50%' }} />
                  <span className="relative inline-flex h-2 w-2 bg-[var(--success)]"
                        style={{ borderRadius: '50%' }} />
                </span>
                {settings.availabilityNote || 'Open to new opportunities'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[var(--border)]
                               text-xs font-bold tracking-[0.08em] uppercase text-[var(--text-muted)]">
                <MapPin size={12} />
                Navi Mumbai, India
              </span>
            )}
          </motion.div>

          {/* Intro line */}
          <motion.div variants={item} className="mb-3">
            <p className="text-base md:text-lg font-semibold text-[var(--text-secondary)]
                          tracking-wide uppercase flex items-center gap-3">
              HI, I'M {(settings?.heroName || 'MANGESH').split(' ')[0].toUpperCase()}.
            </p>
          </motion.div>

          {/* Big headline */}
          <motion.div variants={item} className="mb-6">
            <h1 className="text-[var(--text-primary)] leading-[0.95] uppercase">
              A FULL STACK
              <br />
              <span className="inline-flex items-center gap-3 md:gap-5">
                DEVELOPER
                <OrangeStar size={36} className="text-[var(--accent)] spin-slow
                                                 hidden sm:inline-block" />
              </span>
              <br />
              <span className="text-[var(--accent)]">& AI ENGINEER</span>
            </h1>
          </motion.div>

          {/* Skills strip */}
          <motion.div variants={item} className="mb-10">
            <div className="flex items-center gap-3 flex-wrap">
              {['REACT', 'NODE.JS', '.NET', 'AZURE', 'LANGCHAIN'].map((tech, i) => (
                <span key={tech} className="flex items-center gap-3">
                  <span className="text-sm md:text-base font-bold tracking-[0.08em]
                                   text-[var(--text-primary)]">
                    {tech}
                  </span>
                  {i < 4 && (
                    <OrangeStar size={10} className="text-[var(--accent)]" />
                  )}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA buttons — boxy */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-14">
            {/* Primary — filled orange */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 px-8 py-4
                         text-sm font-bold tracking-wider uppercase
                         text-white bg-[var(--accent)]
                         hover:bg-[var(--accent-hover)] transition-colors duration-200
                         border-2 border-[var(--accent)]"
            >
              View Projects
              <ArrowRight size={16} strokeWidth={2.5} />
            </a>

            {/* Secondary — outlined, boxy */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 px-8 py-4
                         text-sm font-bold tracking-wider uppercase
                         text-[var(--text-primary)] bg-transparent
                         border-2 border-[var(--text-primary)]
                         hover:bg-[var(--text-primary)] hover:text-[var(--bg-base)]
                         transition-all duration-200"
            >
              Let's Talk
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={item} className="flex items-center gap-1">
            {[
              { href: SOCIAL_LINKS.github, icon: GitHubIcon, label: 'GitHub' },
              { href: SOCIAL_LINKS.linkedin, icon: LinkedInIcon, label: 'LinkedIn' },
              { href: SOCIAL_LINKS.email, icon: Mail, label: 'Email' },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="p-3 text-[var(--text-muted)]
                           hover:text-[var(--accent)] hover:bg-[var(--accent-light)]
                           transition-all duration-200 border-2 border-transparent
                           hover:border-[var(--accent)]"
              >
                <Icon size={18} strokeWidth={2} />
              </a>
            ))}

            <span className="mx-4 h-5 w-[2px] bg-[var(--border)]" />

            <span className="text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)]">
              Based in India · Remote-friendly
            </span>
          </motion.div>

        </motion.div>
      </div>

      {/* ── Marquee ticker strip — sits at bottom of hero ── */}
      <MarqueeTicker />

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-[var(--text-primary)]
                     flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-[var(--text-primary)]" />
        </motion.div>
      </motion.div>
    </section>
  )
}