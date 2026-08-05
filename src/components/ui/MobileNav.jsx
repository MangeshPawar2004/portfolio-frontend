import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Moon, Sun, FileText, MailIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '@/context/ThemeContext'
import { useSettings } from '@/hooks/useSettings'
import { SOCIAL_LINKS } from '@/constants'

const MOBILE_NAV_LINKS = [
  { label: 'About',      href: '#about' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

export default function MobileNav({ isOpen, onClose }) {
  const { toggle, isDark } = useTheme()
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
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={onClose}
          />

          {/* Drawer — slides in from right */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72
                       bg-[var(--bg-card)] border-l border-[var(--border)]
                       flex flex-col md:hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--border)]">
              <span className="font-semibold text-[var(--text-primary)]">
                {settings?.heroName?.split(' ')[0] ?? 'Menu'}
                <span className="text-[#3B82F6]">.</span>
              </span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-[var(--text-muted)]
                           hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]
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
                        className="flex items-center w-full px-3 py-3 rounded-xl text-sm
                                   font-medium text-[var(--text-secondary)]
                                   hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]
                                   transition-colors"
                      >
                        {label}
                      </a>
                    ) : (
                      <Link
                        to={`/${href}`}
                        onClick={onClose}
                        className="flex items-center w-full px-3 py-3 rounded-xl text-sm
                                   font-medium text-[var(--text-secondary)]
                                   hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]
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
                    className="flex items-center gap-2 w-full px-4 py-3 rounded-xl text-sm
                               font-medium border border-[var(--border)]
                               text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                               hover:border-[var(--border-hover)] transition-all"
                  >
                    <FileText size={14} />
                    Download Resume
                  </a>
                </motion.div>
              )}
            </nav>

            {/* Footer — socials + dark mode */}
            <div className="p-5 border-t border-[var(--border)] space-y-4">
              <div className="flex items-center gap-2">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                             text-xs font-medium text-[var(--text-muted)]
                             bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]
                             transition-colors"
                >
                  <MailIcon size={14} /> GitHub
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                             text-xs font-medium text-[var(--text-muted)]
                             bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]
                             transition-colors"
                >
                  <Mail size={14} /> LinkedIn
                </a>
                <a
                  href={SOCIAL_LINKS.email}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl
                             text-xs font-medium text-[var(--text-muted)]
                             bg-[var(--bg-subtle)] hover:text-[var(--text-primary)]
                             transition-colors"
                >
                  <Mail size={14} /> Email
                </a>
              </div>

              {/* Dark mode toggle */}
              <button
                onClick={toggle}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl
                           bg-[var(--bg-subtle)] border border-[var(--border)]
                           text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                           transition-colors"
              >
                <span>{isDark ? 'Dark mode' : 'Light mode'}</span>
                {isDark
                  ? <Moon size={14} className="text-[#3B82F6]" />
                  : <Sun size={14} className="text-amber-400" />
                }
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}