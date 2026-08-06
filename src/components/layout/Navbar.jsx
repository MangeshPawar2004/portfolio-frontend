import CommandPaletteTrigger from '@/components/ui/CommandPaletteTrigger'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, FileText } from 'lucide-react'
import { NAV_LINKS, SOCIAL_LINKS } from '@/constants'
import { useSettings } from '@/hooks/useSettings'
import MobileNav from '@/components/ui/MobileNav'
import { cn } from '@/lib/utils'

function GitHubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  )
}

function LinkedInIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { data: settings } = useSettings()
  const isHome = location.pathname === '/'

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
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          'navbar-glass',
          scrolled && 'navbar-glass-scrolled'
        )}
      >
        <nav className="container flex items-center justify-between h-16">

          {/* Logo — bold, boxy */}
          <Link
            to="/"
            className="font-bold text-lg tracking-tight text-[var(--text-primary)]
                       hover:text-[var(--accent)] transition-colors
                       font-['Space_Grotesk',sans-serif]"
          >
            {settings?.heroName?.split(' ')[0] ?? 'Portfolio'}
            <span className="text-[var(--accent)]">.</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              isHome ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-semibold text-[var(--text-secondary)]
                             hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]
                             transition-all duration-200 tracking-wide uppercase"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  className="px-3 py-2 text-sm font-semibold text-[var(--text-secondary)]
                             hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]
                             transition-all duration-200 tracking-wide uppercase"
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
              className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)]
                         transition-colors"
              aria-label="GitHub"
            >
              <GitHubIcon size={16} />
            </a>
            {/* LinkedIn */}
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[var(--text-muted)] hover:text-[var(--accent)]
                         transition-colors"
              aria-label="LinkedIn"
            >
              <LinkedInIcon size={16} />
            </a>
            <CommandPaletteTrigger />

            {/* Resume */}
            {settings?.resumeUrl && (
              <a
                href={settings.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 flex items-center gap-1.5 px-3 py-1.5 text-sm
                           font-semibold border-2 border-[var(--border)]
                           text-[var(--text-secondary)]
                           hover:text-[var(--text-primary)] hover:border-[var(--text-primary)]
                           transition-all tracking-wide uppercase"
              >
                <FileText size={13} />
                Resume
              </a>
            )}

            {/* CTA — orange boxy */}
            <a
              href={isHome ? '#contact' : '/#contact'}
              className="ml-1 px-5 py-1.5 text-sm font-bold tracking-wider uppercase
                         bg-[var(--accent)] text-white border-2 border-[var(--accent)]
                         hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)]
                         transition-colors"
            >
              Hire me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[var(--text-primary)]
                       hover:text-[var(--accent)] transition-colors"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={2.5} />
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <MobileNav isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}