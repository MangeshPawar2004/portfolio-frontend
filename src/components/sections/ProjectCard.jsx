// src/components/sections/ProjectCard.jsx
import { ExternalLink, FolderGit2, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { truncate } from '@/lib/utils'

const STATUS_STYLES = {
  completed: { bg: 'var(--success-muted)', text: 'var(--success)', border: 'var(--success)' },
  ongoing:   { bg: 'var(--accent-light)', text: 'var(--accent)', border: 'var(--accent)' },
  planned:   { bg: '#F3F0FF', text: '#7C3AED', border: '#7C3AED' },
}

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || STATUS_STYLES.completed
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px]
                 font-bold capitalize tracking-wider uppercase border-2"
      style={{ background: s.bg, color: s.text, borderColor: s.border }}
    >
      <span className="w-1.5 h-1.5" style={{ backgroundColor: s.text }} />
      {status}
    </span>
  )
}

export default function ProjectCard({ project }) {
  const {
    title,
    slug,
    shortDescription,
    techStack = [],
    thumbnailUrl,
    githubUrl,
    liveDemoUrl,
    status,
    isFeatured,
  } = project

  return (
    <motion.article
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="group flex flex-col h-full
                 bg-[var(--bg-card)] border-2 border-[var(--border)]
                 overflow-hidden
                 hover:border-[var(--text-primary)]
                 hover:shadow-[var(--shadow-md)]
                 transition-all duration-200"
    >
      {/* ── Thumbnail ──────────────────────────────── */}
      <div className="relative h-48 bg-[var(--bg-subtle)] overflow-hidden flex-shrink-0">

        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover
                       group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          /* Initials placeholder */
          <div className="w-full h-full flex items-center justify-center bg-[var(--bg-subtle)]">
            <span className="text-5xl font-black tracking-tighter select-none
                             text-[var(--border-hover)]">
              {title.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}

        {/* Status badge — top left */}
        <div className="absolute top-3 left-3">
          {status && <StatusBadge status={status} />}
        </div>

        {/* External link — top right, appears on hover */}
        {liveDemoUrl && (
          <a
            href={liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="absolute top-3 right-3 p-2
                       bg-white/90 backdrop-blur-sm
                       text-[var(--text-muted)] hover:text-[var(--accent)]
                       border-2 border-[var(--border)]
                       opacity-0 group-hover:opacity-100
                       transition-all duration-200 -translate-y-1 group-hover:translate-y-0"
            aria-label="Live demo"
          >
            <ExternalLink size={13} />
          </a>
        )}
      </div>

      {/* ── Content ────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 pt-4">

        {/* Title */}
        <h3 className="text-base font-bold text-[var(--text-primary)] leading-snug mb-2
                       group-hover:text-[var(--accent)] transition-colors duration-200">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1">
          {truncate(shortDescription, 100)}
        </p>

        {/* Tech tags — visually separated with top border */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t-2 border-[var(--border)]">
            {techStack.slice(0, 4).map((tech) => (
              <span
                key={tech.name || tech}
                className="px-2 py-0.5 text-[11px] font-mono font-semibold
                           bg-[var(--bg-subtle)] text-[var(--text-muted)]
                           border border-[var(--border)]"
              >
                {tech.name || tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="px-2 py-0.5 text-[11px] font-mono
                               bg-[var(--bg-subtle)] text-[var(--text-muted)]
                               border border-[var(--border)]">
                +{techStack.length - 4}
              </span>
            )}
          </div>
        )}

        {/* ── Bottom row: GitHub + Case Study CTA ── */}
        <div className="flex items-center justify-between mt-4 gap-3">

          {/* GitHub icon */}
          {githubUrl ? (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 text-[var(--text-muted)]
                         hover:text-[var(--accent)] hover:bg-[var(--accent-light)]
                         transition-all duration-200"
              aria-label="View source code"
            >
              <FolderGit2 size={15} />
            </a>
          ) : (
            <div /> /* spacer */
          )}

          {/* Case study — boxy orange button */}
          <Link
            to={`/projects/${slug}`}
            className="inline-flex items-center gap-1.5 px-4 py-2
                       text-xs font-bold tracking-wider uppercase
                       bg-[var(--accent)] text-white
                       border-2 border-[var(--accent)]
                       hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)]
                       transition-all duration-200"
          >
            Case study
            <ArrowUpRight size={12} />
          </Link>
        </div>

      </div>
    </motion.article>
  )
}