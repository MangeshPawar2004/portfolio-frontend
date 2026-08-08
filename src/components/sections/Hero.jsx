import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Mail } from 'lucide-react'
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

/* ── Marquee ticker strip ── */
const TICKER_ITEMS = [
  'SYSTEMS',
  'LANGCHAIN & FAISS',
  'CLOUD ARCHITECTURE',
  'FULL STACK DEVELOPMENT',
  'AI ENGINEERING',
  'REACT & NODE.JS',
  '.NET & AZURE',
]

function MarqueeTicker() {
  return (
    <div className="w-full overflow-hidden bg-[#1A1A1A] py-3.5 border-t border-[#2A2A2A]">
      <div className="marquee-track flex items-center">
        {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span key={i} className="flex items-center gap-4 px-4 whitespace-nowrap">
            <span className="text-xs md:text-sm font-bold tracking-[0.15em] text-white uppercase">
              {item}
            </span>
            <span className="text-[var(--accent)] font-extrabold text-sm md:text-base">+</span>
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
  const techStack = ['REACT', 'NODE.JS', '.NET', 'AZURE', 'LANGCHAIN']

  return (
    <section className="relative min-h-[100vh] flex flex-col justify-between overflow-hidden bg-[var(--bg-base)]">

      {/* Font loading for Playfair Display serif title */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap"
        rel="stylesheet"
      />

      {/* ── Decorative corner geometric shapes (matching reference image) ── */}
      <div
        className="hidden md:block absolute top-28 right-8 lg:top-32 lg:right-16 xl:right-28 pointer-events-none z-0"
        aria-hidden="true"
      >
        {/* Tilted outline square */}
        <div className="w-48 h-48 lg:w-72 lg:h-72 border-[4px] lg:border-[5px] border-[var(--accent)] -rotate-12 bg-transparent" />
        {/* Solid filled orange square below/overlapping */}
        <div className="w-40 h-40 lg:w-60 lg:h-60 bg-[var(--accent)] -mt-20 lg:-mt-28 ml-2 lg:ml-4" />
      </div>

      {/* ── Main Hero Content ── */}
      <div className="container relative z-10 flex-1 flex items-center pt-28 pb-16 lg:pt-36 lg:pb-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-5xl lg:max-w-6xl"
        >

          {/* Availability pill */}
          <motion.div variants={item} className="mb-6">
            <span className="inline-flex items-center gap-2.5 px-5 py-2.5 md:px-6 md:py-3 border border-[var(--accent)]
                             text-xs md:text-sm font-bold tracking-wider uppercase
                             text-[var(--accent)] bg-transparent">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--accent)]" />
              {settings?.availableForWork
                ? (settings.availabilityNote || 'OPEN TO AI ENGINEER AND FULL STACK DEVELOPER ROLES')
                : 'OPEN TO AI ENGINEER AND FULL STACK DEVELOPER ROLES'}
            </span>
          </motion.div>

          {/* Greeting text */}
          <motion.div variants={item} className="mb-3">
            <p className="text-sm md:text-base font-extrabold tracking-widest text-[var(--text-primary)] uppercase">
              HI, I'M {(settings?.heroName || 'MANGESH').split(' ')[0].toUpperCase()}.
            </p>
          </motion.div>

          {/* Bold Serif Headline */}
          <motion.div variants={item} className="mb-6">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight uppercase"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              <span className="text-[var(--text-primary)]">A FULL STACK</span>
              <br />
              <span className="text-[var(--text-primary)]">DEVELOPER </span>
              <span className="text-[var(--accent)]">& AI</span>
              <br />
              <span className="text-[var(--accent)]">ENGINEER</span>
            </h1>
          </motion.div>

          {/* Tech stack line with orange '+' separators */}
          <motion.div variants={item} className="mb-8">
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              {techStack.map((tech, i) => (
                <span key={tech} className="flex items-center gap-2 md:gap-3">
                  <span className="text-xs md:text-sm font-bold tracking-widest text-[var(--text-primary)] uppercase">
                    {tech}
                  </span>
                  {i < techStack.length - 1 && (
                    <span className="text-[var(--accent)] font-extrabold text-xs md:text-sm">+</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-5 mb-10">
            {/* Primary CTA: Filled Orange */}
            <Link
              to="/projects"
              className="inline-flex items-center gap-2.5 px-9 py-4 md:px-10 md:py-4.5
                         text-xs md:text-sm font-extrabold tracking-wider uppercase
                         text-white bg-[var(--accent)]
                         hover:bg-[var(--accent-hover)] transition-colors duration-200"
            >
              View Projects
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>

            {/* Secondary CTA: Black Outline */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2.5 px-9 py-4 md:px-10 md:py-4.5
                         text-xs md:text-sm font-extrabold tracking-wider uppercase
                         text-[var(--text-primary)] bg-transparent
                         border-2 border-[var(--text-primary)]
                         hover:bg-[var(--text-primary)] hover:text-white
                         transition-all duration-200"
            >
              Let's Talk
            </Link>
          </motion.div>

          {/* Social Links & Location Info */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-1.5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
              >
                <GitHubIcon size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-1.5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.email}
                aria-label="Email"
                className="p-1.5 text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
              >
                <Mail size={18} />
              </a>
            </div>

            <span className="text-gray-400 font-light mx-1">|</span>

            <span className="text-xs font-bold tracking-widest uppercase text-[var(--text-primary)]">
              BASED IN INDIA · REMOTE-FRIENDLY
            </span>
          </motion.div>

        </motion.div>
      </div>

      {/* ── Scroll indicator mouse ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="self-center my-4 flex flex-col items-center gap-1 z-10"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-4 h-7 border-2 border-[var(--text-primary)] flex items-start justify-center pt-1"
        >
          <div className="w-1 h-1.5 bg-[var(--text-primary)]" />
        </motion.div>
      </motion.div>

      {/* ── Marquee Ticker Strip at bottom ── */}
      <MarqueeTicker />

    </section>
  )
}