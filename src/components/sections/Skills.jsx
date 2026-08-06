import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useSkills } from '@/hooks/useSkills'
import SectionHeading from '@/components/ui/SectionHeading'
import Skeleton from '@/components/ui/Skeleton'
import SectionReveal from '@/components/animations/SectionReveal'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren'
import { AI_TECH_NAMES } from '@/constants'

function isAISkill(skill) {
  const name = (skill.name || '').toLowerCase()
  return AI_TECH_NAMES.some((ai) => name.includes(ai))
}

// ── Proficiency bar ────────────────────────────────────────────
function ProficiencyBar({ value = 0 }) {
  return (
    <div className="h-[3px] w-full mt-3 overflow-hidden bg-[var(--border)]">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="h-full bg-[var(--accent)]"
      />
    </div>
  )
}

// ── Standard skill card ────────────────────────────────────────
function SkillCard({ skill }) {
  return (
    <motion.div
      whileHover={{ y: -3, borderColor: 'var(--text-primary)' }}
      transition={{ duration: 0.18 }}
      className="p-4 border-2 border-[var(--border)] cursor-default group
                 bg-[var(--bg-card)] hover:shadow-[var(--shadow-md)]
                 transition-all duration-200"
    >
      {/* Icon / initials */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-9 h-9 flex items-center
                     justify-center text-xs font-black flex-shrink-0
                     bg-[var(--accent-light)] text-[var(--accent)]
                     border-2 border-[var(--accent-muted)]"
        >
          {skill.iconUrl
            ? <img src={skill.iconUrl} alt={skill.name} className="w-5 h-5 object-contain" />
            : skill.name.slice(0, 2).toUpperCase()
          }
        </div>
        {skill.experienceYears && (
          <span
            className="text-[10px] font-bold px-1.5 py-0.5
                       bg-[var(--accent-light)] text-[var(--accent)]
                       border border-[var(--accent-muted)]"
          >
            {skill.experienceYears}y
          </span>
        )}
      </div>

      <p className="text-sm font-bold text-[var(--text-primary)] leading-tight">
        {skill.name}
      </p>
      <p className="text-[10px] text-[var(--text-muted)] capitalize mt-0.5
                    tracking-wider uppercase">
        {skill.category}
      </p>

      {skill.proficiency > 0 && (
        <>
          <ProficiencyBar value={skill.proficiency} />
          <p className="text-[10px] mt-1 text-right opacity-0 group-hover:opacity-100
                        transition-opacity text-[var(--accent)]">
            {skill.proficiency}%
          </p>
        </>
      )}
    </motion.div>
  )
}

// ── AI skill card — distinct accent style ─────────────────────
function AISkillCard({ skill }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="relative p-4 border-2 border-[var(--accent)]
                 cursor-default overflow-hidden group
                 bg-[var(--accent-light)]
                 hover:shadow-[var(--shadow-md)]
                 transition-all duration-200"
    >
      {/* Icon */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div
          className="w-9 h-9 flex items-center
                     justify-center text-xs font-black flex-shrink-0
                     bg-[var(--accent-muted)] text-[var(--accent)]
                     border-2 border-[var(--accent)]"
        >
          {skill.iconUrl
            ? <img src={skill.iconUrl} alt={skill.name} className="w-5 h-5 object-contain" />
            : skill.name.slice(0, 2).toUpperCase()
          }
        </div>
        {skill.experienceYears && (
          <span
            className="text-[10px] font-bold px-1.5 py-0.5
                       bg-[var(--accent-muted)] text-[var(--accent)]"
          >
            {skill.experienceYears}y
          </span>
        )}
      </div>

      <p className="text-sm font-bold relative z-10 text-[var(--accent)]">
        {skill.name}
      </p>
      <p className="text-[10px] mt-0.5 relative z-10 text-[var(--accent)] opacity-60
                    tracking-wider uppercase">
        AI / ML
      </p>

      {skill.proficiency > 0 && (
        <ProficiencyBar value={skill.proficiency} />
      )}
    </motion.div>
  )
}

// ── Skeleton ───────────────────────────────────────────────────
function SkillCardSkeleton() {
  return (
    <div className="p-4 bg-[var(--bg-card)]
                    border-2 border-[var(--border)] space-y-3">
      <div className="flex justify-between">
        <Skeleton className="w-9 h-9" />
        <Skeleton className="w-7 h-4" />
      </div>
      <Skeleton className="h-3.5 w-3/4" />
      <Skeleton className="h-[3px] w-full" />
    </div>
  )
}

// ── Stats strip ────────────────────────────────────────────────
function StatsStrip({ skills, aiCount }) {
  const withProficiency = skills.filter((s) => s.proficiency > 0)
  const avgProficiency = withProficiency.length
    ? Math.round(withProficiency.reduce((s, x) => s + x.proficiency, 0) / withProficiency.length)
    : null

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
      {[
        { label: 'Total Skills', value: skills.length },
        { label: 'Categories', value: new Set(skills.map((s) => s.category)).size },
        { label: 'Avg Proficiency', value: avgProficiency ? `${avgProficiency}%` : '—' },
        { label: 'AI / ML Tools', value: aiCount, highlight: true },
      ].map(({ label, value, highlight }) => (
        <div
          key={label}
          className={`p-5 text-center border-2 ${
            highlight
              ? 'bg-[var(--accent-light)] border-[var(--accent)]'
              : 'bg-[var(--bg-card)] border-[var(--border)]'
          }`}
        >
          <p className={`text-2xl font-black mb-1 ${
            highlight ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
          }`}>
            {value}
          </p>
          <p className="text-xs text-[var(--text-muted)] tracking-wider uppercase font-semibold">
            {label}
          </p>
        </div>
      ))}
    </div>
  )
}

// ── Category filter ────────────────────────────────────────────
const CATEGORY_TABS = [
  { key: 'all', label: 'All' },
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'database', label: 'Database' },
  { key: 'devops', label: 'Cloud' },
  { key: 'language', label: 'Languages' },
  { key: 'tools', label: 'Tools' },
]

// ── Main Skills section ────────────────────────────────────────
export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all')
  const { data, isLoading, isError } = useSkills()

  const allSkills = data?.data ?? []
  const aiSkills = allSkills.filter(isAISkill)
  const stdSkills = allSkills.filter((s) => !isAISkill(s))

  const filteredStd =
    activeCategory === 'all'
      ? stdSkills
      : stdSkills.filter((s) => s.category === activeCategory)

  const availableTabs = CATEGORY_TABS.filter(
    (t) => t.key === 'all' || stdSkills.some((s) => s.category === t.key)
  )

  return (
    <section id="skills" className="section border-t-2 border-[var(--border)]">
      <div className="container">

        <SectionReveal>
          <SectionHeading
            eyebrow="Skills"
            title="Tools I work with."
            subtitle="Built across production systems, final-year projects, and independent learning."
          />
        </SectionReveal>

        {!isLoading && allSkills.length > 0 && (
          <SectionReveal delay={0.1}>
            <div className="mt-10">
              <StatsStrip skills={allSkills} aiCount={aiSkills.length} />
            </div>
          </SectionReveal>
        )}

        {/* ── AI Stack strip ─────────────────────────────── */}
        {!isLoading && aiSkills.length > 0 && (
          <SectionReveal delay={0.15}>
            <div className="mb-12 p-6 border-2 border-[var(--accent)]
                            bg-[var(--accent-light)]">

              {/* AI section header */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-7 h-7 flex items-center justify-center
                                bg-[var(--accent-muted)] border-2 border-[var(--accent)]">
                  <Sparkles size={14} className="text-[var(--accent)]" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em]
                                text-[var(--accent)]">
                    AI / ML Stack
                  </p>
                  <p className="text-[10px] text-[var(--accent)] opacity-60">
                    LangChain · FAISS · Python pipelines · Autonomous agents
                  </p>
                </div>
              </div>

              <StaggerContainer
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
              >
                {aiSkills
                  .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99))
                  .map((skill) => (
                    <StaggerItem key={skill._id}>
                      <AISkillCard skill={skill} />
                    </StaggerItem>
                  ))}
              </StaggerContainer>
            </div>
          </SectionReveal>
        )}

        {/* ── Standard skills ────────────────────────────── */}
        {!isLoading && !isError && availableTabs.length > 1 && (
          <SectionReveal delay={0.2}>
            <div className="flex flex-wrap gap-0 mb-8 border-2 border-[var(--border)] w-fit">
              {availableTabs.map((tab) => {
                const count =
                  tab.key === 'all'
                    ? stdSkills.length
                    : stdSkills.filter((s) => s.category === tab.key).length
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveCategory(tab.key)}
                    className={`px-4 py-2.5 text-xs font-bold tracking-wider uppercase
                                transition-all duration-200 border-r-2 border-[var(--border)]
                                last:border-r-0 ${activeCategory === tab.key
                        ? 'bg-[var(--accent)] text-white'
                        : 'bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
                      }`}
                  >
                    {tab.label}
                    <span className="ml-1.5 opacity-60 text-[10px]">{count}</span>
                  </button>
                )
              })}
            </div>
          </SectionReveal>
        )}

        {isError && (
          <p className="text-sm text-[var(--error)] py-8">
            Failed to load skills. Check backend connection.
          </p>
        )}

        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {Array.from({ length: 10 }).map((_, i) => <SkillCardSkeleton key={i} />)}
          </div>
        )}

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
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
              >
                {filteredStd.length > 0
                  ? filteredStd
                    .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99))
                    .map((skill) => (
                      <StaggerItem key={skill._id}>
                        <SkillCard skill={skill} />
                      </StaggerItem>
                    ))
                  : (
                    <div className="col-span-full py-16 text-center">
                      <p className="text-sm text-[var(--text-muted)]">
                        No skills in this category.
                      </p>
                    </div>
                  )
                }
              </StaggerContainer>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Core stack strip */}
        {!isLoading && activeCategory === 'all' &&
          allSkills.filter((s) => s.isFeatured).length > 0 && (
            <SectionReveal delay={0.25}>
              <div className="mt-12 p-6 bg-[var(--bg-card)]
                              border-2 border-[var(--border)]">
                <p className="text-[10px] font-black uppercase tracking-[0.12em]
                            text-[var(--text-muted)] mb-4">
                  Core Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {allSkills
                    .filter((s) => s.isFeatured)
                    .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99))
                    .map((s) => (
                      <span
                        key={s._id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5
                                 text-xs font-bold border-2
                                 bg-[var(--accent-light)] text-[var(--accent)]
                                 border-[var(--accent-muted)]
                                 tracking-wider uppercase"
                      >
                        <span className="w-1.5 h-1.5 bg-[var(--accent)] flex-shrink-0" />
                        {s.name}
                      </span>
                    ))}
                </div>
              </div>
            </SectionReveal>
          )}

      </div>
    </section>
  )
}