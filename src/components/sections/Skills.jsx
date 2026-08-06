import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSkills } from '@/hooks/useSkills'
import Section from '@/components/layout/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import Skeleton from '@/components/ui/Skeleton'
import SectionReveal from '@/components/animations/SectionReveal'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren'

// ── Category filter tabs ───────────────────────────────────────
const CATEGORIES = [
  { key: 'all',      label: 'All' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend',  label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'devops',   label: 'Cloud / DevOps' },
  { key: 'language', label: 'Languages' },
  { key: 'tools',    label: 'Tools' },
]

// Category accent colors
const CATEGORY_COLORS = {
  frontend: { bg: '#1a2e4a', text: '#60A5FA', dot: '#3B82F6' },
  backend:  { bg: '#0d2e1f', text: '#34D399', dot: '#10B981' },
  database: { bg: '#2d1f0d', text: '#FBB040', dot: '#F59E0B' },
  devops:   { bg: '#2d1f3d', text: '#C4B5FD', dot: '#8B5CF6' },
  language: { bg: '#1f1a2e', text: '#F9A8D4', dot: '#EC4899' },
  tools:    { bg: '#1a1f2d', text: '#93C5FD', dot: '#60A5FA' },
  other:    { bg: '#1a1a1a', text: '#A1A1AA', dot: '#71717A' },
}

// ── Proficiency bar ────────────────────────────────────────────
function ProficiencyBar({ value = 0, color = '#3B82F6' }) {
  return (
    <div className="h-1 w-full bg-[var(--bg-subtle)] rounded-full overflow-hidden mt-3">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

// ── Single skill card ──────────────────────────────────────────
function SkillCard({ skill }) {
  const colors = CATEGORY_COLORS[skill.category] || CATEGORY_COLORS.other

  return (
    <motion.div
      whileHover={{ y: -3, borderColor: colors.dot }}
      transition={{ duration: 0.18 }}
      className="card p-4 cursor-default group"
    >
      {/* Top row: icon placeholder + category dot */}
      <div className="flex items-start justify-between mb-2">
        {/* Icon or initials avatar */}
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {skill.iconUrl
            ? <img src={skill.iconUrl} alt={skill.name} className="w-5 h-5 object-contain" />
            : skill.name.slice(0, 2).toUpperCase()
          }
        </div>

        {/* Experience years badge */}
        {skill.experienceYears && (
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {skill.experienceYears}y
          </span>
        )}
      </div>

      {/* Name */}
      <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
        {skill.name}
      </p>

      {/* Category label */}
      <p className="text-[10px] text-[var(--text-muted)] capitalize mt-0.5 mb-1">
        {skill.category}
      </p>

      {/* Proficiency bar */}
      {skill.proficiency > 0 && (
        <ProficiencyBar value={skill.proficiency} color={colors.dot} />
      )}

      {/* Proficiency number — appears on hover */}
      {skill.proficiency > 0 && (
        <p
          className="text-[10px] mt-1 text-right transition-opacity duration-200
                     opacity-0 group-hover:opacity-100"
          style={{ color: colors.text }}
        >
          {skill.proficiency}%
        </p>
      )}
    </motion.div>
  )
}

// ── Skeleton loader for skill card ─────────────────────────────
function SkillCardSkeleton() {
  return (
    <div className="card p-4 space-y-3">
      <div className="flex justify-between">
        <Skeleton className="w-9 h-9 rounded-lg" />
        <Skeleton className="w-8 h-4 rounded-full" />
      </div>
      <Skeleton className="h-3.5 w-3/4" />
      <Skeleton className="h-2.5 w-1/2" />
      <Skeleton className="h-1 w-full rounded-full mt-2" />
    </div>
  )
}

// ── Stats strip ────────────────────────────────────────────────
function StatsStrip({ skills }) {
  const byCategory = skills.reduce((acc, s) => {
    acc[s.category] = (acc[s.category] || 0) + 1
    return acc
  }, {})

  const avgProficiency = skills.filter((s) => s.proficiency > 0).length > 0
    ? Math.round(
        skills.filter((s) => s.proficiency > 0)
          .reduce((sum, s) => sum + s.proficiency, 0) /
        skills.filter((s) => s.proficiency > 0).length
      )
    : null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
      {[
        { label: 'Total Skills',    value: skills.length },
        { label: 'Categories',      value: Object.keys(byCategory).length },
        { label: 'Avg Proficiency', value: avgProficiency ? `${avgProficiency}%` : '—' },
        { label: 'Featured',        value: skills.filter((s) => s.isFeatured).length },
      ].map(({ label, value }) => (
        <div key={label} className="p-5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-center">
          <p className="text-2xl font-bold text-[var(--text-primary)]">{value}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">{label}</p>
        </div>
      ))}
    </div>
  )
}

// ── Main Skills section ────────────────────────────────────────
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { data, isLoading, isError } = useSkills()

  const skills = data?.data ?? []

  const filtered = activeCategory === 'all'
    ? skills
    : skills.filter((s) => s.category === activeCategory)

  // Only show categories that have data
  const availableCategories = CATEGORIES.filter(
    (c) => c.key === 'all' || skills.some((s) => s.category === c.key)
  )

  return (
    <Section id="skills">

      <SectionReveal>
        <SectionHeading
          eyebrow="Skills"
          title="Tools I work with."
          subtitle="Built across production systems, final-year projects, and independent learning."
        />
      </SectionReveal>

      {/* Stats strip */}
      {!isLoading && skills.length > 0 && (
        <SectionReveal delay={0.1}>
          <div className="mt-10">
            <StatsStrip skills={skills} />
          </div>
        </SectionReveal>
      )}

      {/* Category filter */}
      {!isLoading && availableCategories.length > 1 && (
        <SectionReveal delay={0.15}>
          <div className="flex flex-wrap gap-2 mt-2 mb-8">
            {availableCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat.key
                    ? 'bg-[#3B82F6] text-white shadow-sm shadow-[#3B82F6]/25'
                    : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
                }`}
              >
                {cat.label}
                {cat.key !== 'all' && (
                  <span className="ml-1.5 opacity-60">
                    {skills.filter((s) => s.category === cat.key).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </SectionReveal>
      )}

      {/* Error */}
      {isError && (
        <p className="text-[var(--error)] py-8 text-sm">
          Failed to load skills. Check backend connection.
        </p>
      )}

      {/* Loading grid */}
      {isLoading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => <SkillCardSkeleton key={i} />)}
        </div>
      )}

      {/* Skills grid */}
      {!isLoading && !isError && (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <StaggerContainer
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
            >
              {filtered.length > 0
                ? filtered
                    .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99))
                    .map((skill) => (
                      <StaggerItem key={skill._id}>
                        <SkillCard skill={skill} />
                      </StaggerItem>
                    ))
                : (
                    <div className="col-span-full py-16 text-center">
                      <p className="text-[var(--text-muted)] text-sm">
                        No skills in this category yet.
                      </p>
                    </div>
                  )
              }
            </StaggerContainer>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Featured callout — shown only on "All" tab */}
      {activeCategory === 'all' && !isLoading && skills.filter((s) => s.isFeatured).length > 0 && (
        <SectionReveal delay={0.2}>
          <div className="mt-10 p-6 rounded-xl bg-[var(--bg-card)] border border-[var(--border)]">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4">
              Core stack
            </p>
            <div className="flex flex-wrap gap-2">
              {skills
                .filter((s) => s.isFeatured)
                .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99))
                .map((s) => {
                  const colors = CATEGORY_COLORS[s.category] || CATEGORY_COLORS.other
                  return (
                    <span
                      key={s._id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                                 text-xs font-medium border"
                      style={{
                        backgroundColor: colors.bg,
                        color: colors.text,
                        borderColor: colors.dot + '40',
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: colors.dot }}
                      />
                      {s.name}
                    </span>
                  )
                })}
            </div>
          </div>
        </SectionReveal>
      )}

    </Section>
  )
}