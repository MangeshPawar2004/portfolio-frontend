import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, Sun, Moon, FileText, Mail } from 'lucide-react'
import { NAV_LINKS, SOCIAL_LINKS } from '@/constants'
import { useSettings } from '@/hooks/useSettings'
import { useTheme } from '@/context/ThemeContext'
import MobileNav from '@/components/ui/MobileNav'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { toggle, isDark }        = useTheme()
  const location                  = useLocation()
  const { data: settings }        = useSettings()
  const isHome                    = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile nav on route change
  useEffect(() => setMenuOpen(false), [location])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-[var(--border)] bg-[var(--bg-base)]/90 backdrop-blur-md'
            : 'bg-transparent'
        )}
      >
        <nav className="container flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="font-semibold text-[var(--text-primary)] tracking-tight
                       hover:text-[#3B82F6] transition-colors"
          >
            {settings?.heroName?.split(' ')[0] ?? 'Portfolio'}
            <span className="text-[#3B82F6]">.</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) =>
              isHome ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                             transition-colors relative group"
                >
                  {link.label}
                  {/* Underline hover effect */}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#3B82F6]
                                   group-hover:w-full transition-all duration-200" />
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                             transition-colors"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* GitHub */}
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]
                         hover:bg-[var(--bg-subtle)] rounded-lg transition-all"
              aria-label="GitHub"
            >
              <Mail size={16} />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]
                         hover:bg-[var(--bg-subtle)] rounded-lg transition-all"
              aria-label="LinkedIn"
            >
              <Mail size={16} />
            </a>

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]
                         hover:bg-[var(--bg-subtle)] rounded-lg transition-all"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <motion.div
                key={isDark ? 'moon' : 'sun'}
                initial={{ rotate: -30, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Moon size={16} /> : <Sun size={16} className="text-amber-400" />}
              </motion.div>
            </button>

            {/* Resume */}
            {settings?.resumeUrl && (
              <a
                href={settings.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm
                           font-medium border border-[var(--border)] text-[var(--text-secondary)]
                           hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]
                           transition-all"
              >
                <FileText size={13} /> Resume
              </a>
            )}

            {/* CTA */}
            <a
              href={isHome ? '#contact' : '/#contact'}
              className="ml-1 px-4 py-1.5 rounded-lg text-sm font-medium
                         bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors"
            >
              Hire me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)]
                       hover:bg-[var(--bg-subtle)] rounded-lg transition-all"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <MobileNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}