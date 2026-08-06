import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProjects } from '@/hooks/useProjects'
import Section from '@/components/layout/Section'
import Skeleton from '@/components/ui/Skeleton'
import ProjectCard from './ProjectCard'
import SectionReveal from '@/components/animations/SectionReveal'

const FILTERS = [
  { key: 'all',       label: 'All' },
  { key: 'completed', label: 'Completed' },
  { key: 'ongoing',   label: 'Ongoing' },
  { key: 'planned',   label: 'Planned' },
]

function ProjectCardSkeleton() {
  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--bg-card)]
                    border border-[var(--border)] overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="flex gap-2 pt-3 border-t border-[var(--border)]">
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-5 w-14 rounded" />
        </div>
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const { data, isLoading, isError } = useProjects({ limit: 20 })

  const projects = data?.data ?? []
  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.status === activeFilter)

  // Determine grid columns based on project count
  const gridCols =
    filtered.length === 1
      ? 'grid-cols-1 max-w-md'
      : filtered.length === 2
      ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <Section id="projects">

      {/* ── Header block ───────────────────────────── */}
      <SectionReveal>
        <div className="mb-10">
          {/* Eyebrow */}
          <p className="text-xs font-bold tracking-[0.15em] uppercase
                        text-[var(--accent)] mb-4">
            Projects
          </p>

          {/* Title + filter on same row at md+ */}
          <div className="flex flex-col sm:flex-row sm:items-end
                          justify-between gap-6">
            <h2 className="text-[var(--text-primary)]">
              Things I've built.
            </h2>

            {/* Filter tabs — right of heading on desktop */}
            <div className="flex items-center gap-1 p-1 rounded-[var(--radius-md)]
                            bg-[var(--bg-card)] border border-[var(--border)]
                            self-start sm:self-auto flex-shrink-0">
              {FILTERS.map(({ key, label }) => {
                const count = key === 'all'
                  ? projects.length
                  : projects.filter((p) => p.status === key).length

                return (
                  <button
                    key={key}
                    onClick={() => setActiveFilter(key)}
                    disabled={count === 0 && key !== 'all'}
                    className={`px-3.5 py-2 rounded-[var(--radius-sm)] text-xs font-semibold
                                transition-all duration-200 ${
                      activeFilter === key
                        ? 'bg-[var(--accent)] text-white shadow-sm'
                        : count === 0
                        ? 'text-[var(--border-hover)] cursor-not-allowed'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {label}
                    {count > 0 && (
                      <span className={`ml-1.5 text-[10px] ${
                        activeFilter === key ? 'text-white/70' : 'text-[var(--text-muted)]'
                      }`}>
                        {count}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Subtitle */}
          <p className="mt-3 text-[var(--text-muted)] text-sm">
            Production systems, final-year projects, and experiments.
          </p>
        </div>
      </SectionReveal>

      {/* ── Error ─────────────────────────────────── */}
      {isError && (
        <div className="py-16 text-center">
          <p className="text-[var(--error)] text-sm mb-1">Failed to load projects</p>
          <p className="text-[var(--text-muted)] text-xs">
            Make sure the backend is running on port 5000
          </p>
        </div>
      )}

      {/* ── Skeletons ─────────────────────────────── */}
      {isLoading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* ── Project grid ──────────────────────────── */}
      {!isLoading && !isError && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className={`grid gap-8 ${gridCols}`}
          >
            {filtered.length > 0
              ? filtered.map((project, i) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.4 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))
              : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-[var(--text-muted)] text-sm">
                    No {activeFilter !== 'all' ? activeFilter : ''} projects yet.
                  </p>
                </div>
              )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* ── Count — subtle, not competing with cards ── */}
      {!isLoading && filtered.length > 0 && (
        <p className="mt-10 text-center text-[11px] text-[var(--text-muted)]">
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
          {activeFilter !== 'all' ? ` · ${activeFilter}` : ''}
        </p>
      )}

    </Section>
  )
}