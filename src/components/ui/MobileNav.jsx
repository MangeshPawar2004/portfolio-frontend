import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, FileText } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useSettings } from '@/hooks/useSettings'
import { SOCIAL_LINKS } from '@/constants'

function GitHubIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

const MOBILE_NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export default function MobileNav({ isOpen, onClose }) {
  const { data: settings } = useSettings()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={onClose}
          />

          {/* Drawer — slides in from right */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72
                       bg-[var(--bg-base)] border-l-2 border-[var(--text-primary)]
                       flex flex-col md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b-2 border-[var(--border)]">
              <span className="font-bold text-[var(--text-primary)]
                               font-['Space_Grotesk',sans-serif]">
                {settings?.heroName?.split(' ')[0] ?? 'Menu'}
                <span className="text-[var(--accent)]">.</span>
              </span>
              <button
                onClick={onClose}
                className="p-1.5 text-[var(--text-muted)]
                           hover:text-[var(--accent)]
                           transition-colors"
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto p-5">
              <ul className="space-y-1">
                {MOBILE_NAV_LINKS.map(({ label, href }, i) => (
                  <motion.li
                    key={href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    {isHome ? (
                      <a
                        href={href}
                        onClick={onClose}
                        className="flex items-center w-full px-3 py-3 text-sm
                                   font-bold text-[var(--text-secondary)]
                                   tracking-wider uppercase
                                   hover:text-[var(--accent)] hover:bg-[var(--accent-light)]
                                   transition-colors"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        to={`/${href}`}
                        onClick={onClose}
                        className="flex items-center w-full px-3 py-3 text-sm
                                   font-bold text-[var(--text-secondary)]
                                   tracking-wider uppercase
                                   hover:text-[var(--accent)] hover:bg-[var(--accent-light)]
                                   transition-colors"
                      >
                        {label}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>

              {/* Resume CTA */}
              {settings?.resumeUrl && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-6"
                >
                  <a
                    href={settings.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm
                               font-bold border-2 border-[var(--border)]
                               text-[var(--text-secondary)] tracking-wider uppercase
                               hover:text-[var(--text-primary)]
                               hover:border-[var(--text-primary)] transition-all"
                  >
                    <FileText size={14} />
                    Download Resume
                  </a>
                </motion.div>
              )}
            </nav>

            {/* Footer — socials */}
            <div className="p-5 border-t-2 border-[var(--border)] space-y-4">
              <div className="flex items-center gap-2">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5
                             text-xs font-bold text-[var(--text-muted)]
                             bg-[var(--bg-subtle)] hover:text-[var(--accent)]
                             tracking-wider uppercase transition-colors"
                >
                  <GitHubIcon size={14} /> GitHub
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5
                             text-xs font-bold text-[var(--text-muted)]
                             bg-[var(--bg-subtle)] hover:text-[var(--accent)]
                             tracking-wider uppercase transition-colors"
                >
                  <LinkedInIcon size={14} /> LinkedIn
                </a>
                <a
                  href={SOCIAL_LINKS.email}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5
                             text-xs font-bold text-[var(--text-muted)]
                             bg-[var(--bg-subtle)] hover:text-[var(--accent)]
                             tracking-wider uppercase transition-colors"
                >
                  <Mail size={14} /> Email
                </a>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}