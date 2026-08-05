import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Code, Briefcase, Mail } from 'lucide-react'
import { NAV_LINKS, SOCIAL_LINKS } from '@/constants'
import { useSettings } from '@/hooks/useSettings'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { data: settings } = useSettings()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [location])

  const isHome = location.pathname === '/'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-[#242424] bg-[#0B0B0B]/90 backdrop-blur-md'
          : 'bg-transparent'
      )}
    >
      <nav className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className="font-semibold text-[#F5F5F5] tracking-tight hover:text-[#3B82F6] transition-colors"
        >
          {settings?.heroName?.split(' ')[0] ?? 'Portfolio'}
          <span className="text-[#3B82F6]">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {isHome
            ? NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors"
                >
                  {link.label}
                </a>
              ))
            : NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  className="text-sm text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
        </div>

        {/* Social icons + CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors rounded-md hover:bg-[#161616]"
            aria-label="GitHub"
          >
            <Code size={17} />
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors rounded-md hover:bg-[#161616]"
            aria-label="LinkedIn"
          >
            <Briefcase size={17} />
          </a>
          <a
            href={isHome ? '#contact' : '/#contact'}
            className="ml-2 px-4 py-1.5 text-sm font-medium rounded-lg
                       bg-[#3B82F6] text-white hover:bg-[#2563EB]
                       transition-colors"
          >
            Hire me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-[#242424] bg-[#0B0B0B]"
          >
            <div className="container py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="py-3 px-2 text-[#A1A1AA] hover:text-[#F5F5F5] border-b border-[#161616] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-4">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
                   className="p-2 text-[#A1A1AA] hover:text-[#F5F5F5]">
                  <Code size={18} />
                </a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer"
                   className="p-2 text-[#A1A1AA] hover:text-[#F5F5F5]">
                  <Briefcase size={18} />
                </a>
                <a href={SOCIAL_LINKS.email}
                   className="p-2 text-[#A1A1AA] hover:text-[#F5F5F5]">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}