import { Mail, ArrowUp } from 'lucide-react'
import { SOCIAL_LINKS } from '@/constants'
import { useSettings } from '@/hooks/useSettings'

export default function Footer() {
  const { data: settings } = useSettings()
  const year = new Date().getFullYear()

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="border-t border-[#242424] bg-[#0B0B0B]">
      <div className="container py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <p className="text-sm font-medium text-[#A1A1AA]">
            {settings?.heroName ?? 'Mangesh Pawar'}
          </p>
          <p className="text-xs text-[#71717A]">
            © {year} · Built with MERN stack
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#71717A] hover:text-[#F5F5F5] transition-colors"
            aria-label="GitHub"
          >
            GitHub
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#71717A] hover:text-[#F5F5F5] transition-colors"
            aria-label="LinkedIn"
          >
            LinkedIn
          </a>
          <a
            href={SOCIAL_LINKS.email}
            className="p-2 text-[#71717A] hover:text-[#F5F5F5] transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
          <button
            onClick={scrollToTop}
            className="p-2 text-[#71717A] hover:text-[#F5F5F5] border border-[#242424]
                       rounded-lg hover:border-[#3a3a3a] transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  )
}