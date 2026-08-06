// Small "⌘K" hint button shown in navbar on desktop
import { Command } from 'lucide-react'
import { openCommandPalette } from '@/hooks/useCommandPalette'

export default function CommandPaletteTrigger() {
    return (
        <button
            onClick={openCommandPalette}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5
                 rounded-lg text-xs text-[var(--text-muted)]
                 bg-[var(--bg-subtle)] border border-[var(--border)]
                 hover:border-[var(--border-hover)] hover:text-[var(--text-secondary)]
                 transition-all duration-200"
            aria-label="Open command palette"
        >
            <Command size={11} />
            <span>K</span>
        </button>
    )
}