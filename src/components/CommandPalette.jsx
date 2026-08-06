import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import Fuse from 'fuse.js'
import { Search, ArrowUpRight, Hash, FileText, Layers, Command } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useCommandPalette, closeCommandPalette } from '@/hooks/useCommandPalette'
import { useProjects } from '@/hooks/useProjects'
import { useSkills } from '@/hooks/useSkills'
import { useBlogPosts } from '@/hooks/useBlog'
import { useSettings } from '@/hooks/useSettings'
import {
    PALETTE_NAV_COMMANDS,
    PALETTE_LINK_COMMANDS,
} from '@/constants'

// ── Result item types ──────────────────────────────────────────
const TYPE_STYLES = {
    nav: { color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
    project: { color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
    skill: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
    blog: { color: '#A78BFA', bg: 'rgba(167,139,250,0.1)' },
    link: { color: '#71717A', bg: 'rgba(113,113,122,0.1)' },
}

function ResultItem({ item, isActive, onClick }) {
    const ref = useRef(null)
    const style = TYPE_STYLES[item.type] || TYPE_STYLES.nav

    useEffect(() => {
        if (isActive && ref.current) {
            ref.current.scrollIntoView({ block: 'nearest' })
        }
    }, [isActive])

    return (
        <button
            ref={ref}
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3
                  text-left rounded-[var(--radius-sm)] transition-all duration-100
                  ${isActive
                    ? 'bg-[var(--bg-hover)]'
                    : 'hover:bg-[var(--bg-subtle)]'
                }`}
        >
            {/* Icon badge */}
            <div
                className="w-8 h-8 rounded-lg flex items-center justify-center
                   flex-shrink-0 text-sm"
                style={{ backgroundColor: style.bg, color: style.color }}
            >
                {item.emoji || item.icon || '→'}
            </div>

            {/* Label + subtitle */}
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {item.label}
                </p>
                {item.subtitle && (
                    <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
                        {item.subtitle}
                    </p>
                )}
            </div>

            {/* Type badge */}
            <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5
                   rounded flex-shrink-0"
                style={{ backgroundColor: style.bg, color: style.color }}
            >
                {item.type}
            </span>

            {isActive && <ArrowUpRight size={13} className="text-[var(--text-muted)] flex-shrink-0" />}
        </button>
    )
}

function GroupLabel({ label }) {
    return (
        <p className="px-4 pt-3 pb-1.5 text-[10px] font-black uppercase tracking-[0.15em]
                  text-[var(--text-muted)]">
            {label}
        </p>
    )
}

// ── Main component ─────────────────────────────────────────────
export default function CommandPalette() {
    const { open } = useCommandPalette()
    const [query, setQuery] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const inputRef = useRef(null)
    const navigate = useNavigate()

    const { data: projectsData } = useProjects({ limit: 50 })
    const { data: skillsData } = useSkills()
    const { data: blogData } = useBlogPosts()
    const { data: settings } = useSettings()

    const projects = projectsData?.data ?? []
    const skills = skillsData?.data ?? []
    const posts = blogData?.data ?? []

    // ── Build searchable items ─────────────────────────────────
    const allItems = [
        ...PALETTE_NAV_COMMANDS.map((c) => ({ ...c, type: 'nav', emoji: c.icon })),
        ...PALETTE_LINK_COMMANDS.map((c) => ({ ...c, type: 'link', emoji: c.icon })),
        ...projects.map((p) => ({
            id: `project-${p._id}`,
            label: p.title,
            subtitle: p.shortDescription,
            type: 'project',
            emoji: '🗂️',
            action: 'navigate',
            href: `/projects/${p.slug}`,
        })),
        ...skills.map((s) => ({
            id: `skill-${s._id}`,
            label: s.name,
            subtitle: `${s.category} · ${s.proficiency ? s.proficiency + '%' : 'skill'}`,
            type: 'skill',
            emoji: '🛠️',
            action: 'scroll',
            href: '#skills',
        })),
        ...posts.map((p) => ({
            id: `blog-${p._id}`,
            label: p.title,
            subtitle: p.excerpt,
            type: 'blog',
            emoji: '📝',
            action: 'navigate',
            href: `/blog/${p.slug}`,
        })),
    ]

    // ── Fuse search ────────────────────────────────────────────
    const fuse = new Fuse(allItems, {
        keys: ['label', 'subtitle'],
        threshold: 0.35,
        minMatchCharLength: 1,
    })

    const results = query.trim()
        ? fuse.search(query).map((r) => r.item)
        : allItems

    // Group results when no query
    const grouped = query.trim()
        ? null
        : {
            nav: results.filter((r) => r.type === 'nav'),
            project: results.filter((r) => r.type === 'project'),
            skill: results.filter((r) => r.type === 'skill'),
            blog: results.filter((r) => r.type === 'blog'),
            link: results.filter((r) => r.type === 'link'),
        }

    const flatResults = grouped
        ? [
            ...grouped.nav,
            ...grouped.project,
            ...grouped.skill,
            ...grouped.blog,
            ...grouped.link,
        ]
        : results

    // ── Focus input when opened ────────────────────────────────
    useEffect(() => {
        if (open) {
            setQuery('')
            setActiveIndex(0)
            setTimeout(() => inputRef.current?.focus(), 50)
        }
    }, [open])

    // ── Execute command ────────────────────────────────────────
    const execute = useCallback(
        (item) => {
            closeCommandPalette()

            if (item.action === 'navigate') {
                navigate(item.href)
            } else if (item.action === 'scroll') {
                if (window.location.pathname !== '/') {
                    navigate('/')
                    setTimeout(() => {
                        document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
                    }, 300)
                } else {
                    document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })
                }
            } else if (item.action === 'link') {
                window.open(item.href, '_blank', 'noopener,noreferrer')
            } else if (item.action === 'resume') {
                if (settings?.resumeUrl) window.open(settings.resumeUrl, '_blank')
            }
        },
        [navigate, settings]
    )

    // ── Keyboard navigation ────────────────────────────────────
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1))
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((i) => Math.max(i - 1, 0))
        } else if (e.key === 'Enter') {
            e.preventDefault()
            if (flatResults[activeIndex]) execute(flatResults[activeIndex])
        }
    }

    // Reset active on query change
    useEffect(() => setActiveIndex(0), [query])

    if (!open) return null

    const content = (
        <AnimatePresence>
            {open && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
                        onClick={closeCommandPalette}
                    />

                    {/* Palette */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: -8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: -8 }}
                        transition={{ duration: 0.18, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="fixed top-[15vh] left-1/2 -translate-x-1/2 z-[101]
                       w-full max-w-xl mx-4"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Command palette"
                    >
                        <div
                            className="rounded-[var(--radius-xl)] border border-[var(--border-hover)]
                         bg-[var(--bg-card)] shadow-[var(--shadow-lg)]
                         overflow-hidden"
                        >
                            {/* Search input */}
                            <div className="flex items-center gap-3 px-4 py-4
                              border-b border-[var(--border)]">
                                <Search size={16} className="text-[var(--text-muted)] flex-shrink-0" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search projects, skills, blog posts..."
                                    className="flex-1 bg-transparent text-sm text-[var(--text-primary)]
                             placeholder:text-[var(--text-muted)]
                             focus:outline-none"
                                    autoComplete="off"
                                />
                                <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 rounded
                                bg-[var(--bg-subtle)] border border-[var(--border)]
                                text-[10px] text-[var(--text-muted)] font-mono">
                                    ESC
                                </kbd>
                            </div>

                            {/* Results */}
                            <div className="max-h-[420px] overflow-y-auto py-2">
                                {flatResults.length === 0 ? (
                                    <div className="py-12 text-center">
                                        <p className="text-sm text-[var(--text-muted)]">
                                            No results for "{query}"
                                        </p>
                                    </div>
                                ) : grouped ? (
                                    // Grouped view when no query
                                    <>
                                        {grouped.nav.length > 0 && (
                                            <>
                                                <GroupLabel label="Navigation" />
                                                <div className="px-2">
                                                    {grouped.nav.map((item, i) => (
                                                        <ResultItem
                                                            key={item.id}
                                                            item={item}
                                                            isActive={flatResults.indexOf(item) === activeIndex}
                                                            onClick={() => execute(item)}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                        {grouped.project.length > 0 && (
                                            <>
                                                <GroupLabel label="Projects" />
                                                <div className="px-2">
                                                    {grouped.project.map((item) => (
                                                        <ResultItem
                                                            key={item.id}
                                                            item={item}
                                                            isActive={flatResults.indexOf(item) === activeIndex}
                                                            onClick={() => execute(item)}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                        {grouped.skill.length > 0 && (
                                            <>
                                                <GroupLabel label="Skills" />
                                                <div className="px-2">
                                                    {grouped.skill.map((item) => (
                                                        <ResultItem
                                                            key={item.id}
                                                            item={item}
                                                            isActive={flatResults.indexOf(item) === activeIndex}
                                                            onClick={() => execute(item)}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                        {grouped.blog.length > 0 && (
                                            <>
                                                <GroupLabel label="Blog" />
                                                <div className="px-2">
                                                    {grouped.blog.map((item) => (
                                                        <ResultItem
                                                            key={item.id}
                                                            item={item}
                                                            isActive={flatResults.indexOf(item) === activeIndex}
                                                            onClick={() => execute(item)}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                        {grouped.link.length > 0 && (
                                            <>
                                                <GroupLabel label="Links" />
                                                <div className="px-2">
                                                    {grouped.link.map((item) => (
                                                        <ResultItem
                                                            key={item.id}
                                                            item={item}
                                                            isActive={flatResults.indexOf(item) === activeIndex}
                                                            onClick={() => execute(item)}
                                                        />
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    // Flat search results
                                    <div className="px-2">
                                        {flatResults.map((item, i) => (
                                            <ResultItem
                                                key={item.id}
                                                item={item}
                                                isActive={i === activeIndex}
                                                onClick={() => execute(item)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer hint */}
                            <div className="flex items-center justify-between px-4 py-2.5
                              border-t border-[var(--border)]
                              bg-[var(--bg-subtle)]">
                                <div className="flex items-center gap-4 text-[10px] text-[var(--text-muted)]">
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-hover)]
                                    border border-[var(--border)] font-mono">↑↓</kbd>
                                        navigate
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-hover)]
                                    border border-[var(--border)] font-mono">↵</kbd>
                                        open
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-hover)]
                                    border border-[var(--border)] font-mono">ESC</kbd>
                                        close
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                                    <Command size={10} />
                                    <span>K</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )

    return createPortal(content, document.body)
}