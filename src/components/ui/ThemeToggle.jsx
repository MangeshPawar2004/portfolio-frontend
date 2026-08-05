// Standalone toggle — can be placed anywhere
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle({ size = 'md' }) {
  const { toggle, isDark } = useTheme()

  const dims = size === 'sm'
    ? { track: 'w-10 h-5', thumb: 'w-4 h-4', translate: 'translate-x-5' }
    : { track: 'w-12 h-6', thumb: 'w-5 h-5', translate: 'translate-x-6' }

  return (
    <button
      onClick={toggle}
      className={`relative inline-flex items-center rounded-full transition-colors duration-300
                  ${dims.track}
                  ${isDark ? 'bg-[#1d3f6e]' : 'bg-amber-100'}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      role="switch"
      aria-checked={!isDark}
    >
      <motion.div
        className={`absolute left-0.5 rounded-full flex items-center justify-center
                    bg-white shadow-sm ${dims.thumb}`}
        animate={{ x: isDark ? 0 : parseInt(dims.translate) }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {isDark
          ? <Moon size={10} className="text-[#3B82F6]" />
          : <Sun size={10} className="text-amber-500" />
        }
      </motion.div>
    </button>
  )
}