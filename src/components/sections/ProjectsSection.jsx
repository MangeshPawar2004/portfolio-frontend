import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlidersHorizontal } from 'lucide-react'
import { useProjects } from '@/hooks/useProjects'
import SectionHeading from '@/components/ui/SectionHeading'
import { ProjectCardSkeleton } from '@/components/ui/Skeleton'
import ProjectCard from './ProjectCard'

const FILTERS = ['All', 'completed', 'ongoing', 'planned']

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const { data, isLoading, isError } = useProjects({ limit: 20 })

  const projects = data?.data ?? []

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.status === activeFilter)

  return (
    <section id="projects" className="section border-t border-[#242424]">
      <div className="container">

        {/* Heading + filter row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Projects"
            title="Things I've built."
            subtitle="Production systems, final-year projects, and side experiments."
          />

          {/* Filter tabs */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <SlidersHorizontal size={14} className="text-[#71717A]" />
            <div className="flex items-center gap-1 p-1 rounded-lg bg-[#111111] border border-[#242424]">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize ${
                    activeFilter === f
                      ? 'bg-[#3B82F6] text-white'
                      : 'text-[#71717A] hover:text-[#F5F5F5]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error state */}
        {isError && (
          <div className="text-center py-16">
            <p className="text-[#EF4444] mb-2">Failed to load projects</p>
            <p className="text-sm text-[#71717A]">Make sure your backend is running on port 5000</p>
          </div>
        )}

        {/* Loading skeletons */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Project grid */}
        {!isLoading && !isError && (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {filtered.length > 0
                  ? filtered.map((project, i) => (
                      <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                      >
                        <ProjectCard project={project} />
                      </motion.div>
                    ))
                  : (
                      <div className="col-span-full text-center py-16">
                        <p className="text-[#71717A]">
                          No {activeFilter !== 'All' ? activeFilter : ''} projects yet.
                        </p>
                      </div>
                    )}
              </motion.div>
            </AnimatePresence>

            {/* Count */}
            {filtered.length > 0 && (
              <p className="mt-8 text-center text-xs text-[#71717A]">
                Showing {filtered.length} project{filtered.length !== 1 ? 's' : ''}
                {activeFilter !== 'All' ? ` · ${activeFilter}` : ''}
              </p>
            )}
          </>
        )}

      </div>
    </section>
  )
}