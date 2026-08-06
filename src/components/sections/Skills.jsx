import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useSkills } from '@/hooks/useSkills'
import SectionHeading from '@/components/ui/SectionHeading'
import Skeleton from '@/components/ui/Skeleton'
import SectionReveal from '@/components/animations/SectionReveal'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren'
import { AI_TECH_NAMES } from '@/constants'

// ── Category colors ────────────────────────────────────────────
const CATEGORY_COLORS = {
  frontend: { bg: '#1a2e4a', text: '#60A5FA', dot: '#3B82F6', border: 'rgba(59,130,246,0.15)' },
  backend: { bg: '#0d2e1f', text: '#34D399', dot: '#10B981', border: 'rgba(16,185,129,0.15)' },
  database: { bg: '#2d1f0d', text: '#FBB040', dot: '#F59E0B', border: 'rgba(245,158,11,0.15)' },
  devops: { bg: '#2d1f3d', text: '#C4B5FD', dot: '#8B5CF6', border: 'rgba(139,92,246,0.15)' },
  language: { bg: '#1f1a2e', text: '#F9A8D4', dot: '#EC4899', border: 'rgba(236,72,153,0.15)' },
  tools: { bg: '#1a1f2d', text: '#93C5FD', dot: '#60A5FA', border: 'rgba(96,165,250,0.15)' },
  other: { bg: '#1a1a1a', text: '#A1A1AA', dot: '#71717A', border: 'rgba(113,113,122,0.15)' },
}

// AI/ML gets special purple-to-blue gradient treatment
const AI_STYLE = {
  bg: 'linear-gradient(135deg, #1a0d2e 0%, #0d1a2e 100%)',
  border: 'rgba(167,139,250,0.25)',
  text: '#C4B5FD',
  dot: '#A78BFA',
  glow: 'rgba(139,92,246,0.15)',
}

function isAISkill(skill) {
  const name = (skill.name || '').toLowerCase()
  return AI_TECH_NAMES.some((ai) => name.includes(ai))
}

// ── Proficiency bar ────────────────────────────────────────────
function ProficiencyBar({ value = 0, color = '#3B82F6' }) {
  return (
    <div className="h-[3px] w-full rounded-full mt-3 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-hover)' }}>
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

// ── Standard skill card ────────────────────────────────────────
function SkillCard({ skill }) {
  const colors = CATEGORY_COLORS[skill.category] || CATEGORY_COLORS.other

  return (
    <motion.div
      whileHover={{ y: -3, borderColor: colors.dot }}
      transition={{ duration: 0.18 }}
      className="p-4 rounded-[var(--radius-md)] border cursor-default group"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: colors.border,
      }}
    >
      {/* Icon / initials */}
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-9 h-9 rounded-[var(--radius-sm)] flex items-center
                     justify-center text-xs font-black flex-shrink-0"
          style={{ backgroundColor: colors.bg, color: colors.text }}
        >
          {skill.iconUrl
            ? <img src={skill.iconUrl} alt={skill.name} className="w-5 h-5 object-contain" />
            : skill.name.slice(0, 2).toUpperCase()
          }
        </div>
        {skill.experienceYears && (
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            {skill.experienceYears}y
          </span>
        )}
      </div>

      <p className="text-sm font-bold text-[var(--text-primary)] leading-tight">
        {skill.name}
      </p>
      <p className="text-[10px] text-[var(--text-muted)] capitalize mt-0.5">
        {skill.category}
      </p>

      {skill.proficiency > 0 && (
        <>
          <ProficiencyBar value={skill.proficiency} color={colors.dot} />
          <p className="text-[10px] mt-1 text-right opacity-0 group-hover:opacity-100
                        transition-opacity" style={{ color: colors.text }}>
            {skill.proficiency}%
          </p>
        </>
      )}
    </motion.div>
  )
}

// ── AI skill card — distinct glowing style ─────────────────────
function AISkillCard({ skill }) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: `0 0 24px ${AI_STYLE.glow}` }}
      transition={{ duration: 0.2 }}
      className="relative p-4 rounded-[var(--radius-md)] border cursor-default overflow-hidden group"
      style={{
        background: AI_STYLE.bg,
        borderColor: AI_STYLE.border,
      }}
    >
      {/* Subtle animated glow in top-right corner */}
      <div
        className="absolute -top-4 -right-4 w-16 h-16 rounded-full opacity-20
                   group-hover:opacity-40 transition-opacity duration-500"
        style={{
          background: 'radial-gradient(circle, #A78BFA, transparent)',
          filter: 'blur(8px)',
        }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div className="flex items-start justify-between mb-3 relative z-10">
        <div
          className="w-9 h-9 rounded-[var(--radius-sm)] flex items-center
                     justify-center text-xs font-black flex-shrink-0"
          style={{ backgroundColor: 'rgba(139,92,246,0.2)', color: AI_STYLE.text }}
        >
          {skill.iconUrl
            ? <img src={skill.iconUrl} alt={skill.name} className="w-5 h-5 object-contain" />
            : skill.name.slice(0, 2).toUpperCase()
          }
        </div>
        {skill.experienceYears && (
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ backgroundColor: 'rgba(139,92,246,0.15)', color: AI_STYLE.text }}
          >
            {skill.experienceYears}y
          </span>
        )}
      </div>

      <p className="text-sm font-bold relative z-10"
        style={{ color: AI_STYLE.text }}>
        {skill.name}
      </p>
      <p className="text-[10px] mt-0.5 relative z-10"
        style={{ color: 'rgba(167,139,250,0.6)' }}>
        AI / ML
      </p>

      {skill.proficiency > 0 && (
        <ProficiencyBar value={skill.proficiency} color={AI_STYLE.dot} />
      )}
    </motion.div>
  )
}

// ── Skeleton ───────────────────────────────────────────────────
function SkillCardSkeleton() {
  return (
    <div className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-card)]
                    border border-[var(--border)] space-y-3">
      <div className="flex justify-between">
        <Skeleton className="w-9 h-9 rounded-lg" />
        <Skeleton className="w-7 h-4 rounded-full" />
      </div>
      <Skeleton className="h-3.5 w-3/4" />
      <Skeleton className="h-[3px] w-full rounded-full" />
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
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
      {[
        { label: 'Total Skills', value: skills.length },
        { label: 'Categories', value: new Set(skills.map((s) => s.category)).size },
        { label: 'Avg Proficiency', value: avgProficiency ? `${avgProficiency}%` : '—' },
        { label: 'AI / ML Tools', value: aiCount, highlight: true },
      ].map(({ label, value, highlight }) => (
        <div
          key={label}
          className="p-5 rounded-[var(--radius-md)] border text-center"
          style={{
            backgroundColor: highlight ? 'rgba(139,92,246,0.08)' : 'var(--bg-card)',
            borderColor: highlight ? 'rgba(167,139,250,0.2)' : 'var(--border)',
          }}
        >
          <p className={`text-2xl font-black mb-1 ${highlight ? 'text-[#C4B5FD]' : 'text-[var(--text-primary)]'
            }`}>
            {value}
          </p>
          <p className="text-xs text-[var(--text-muted)]">{label}</p>
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
    <section id="skills" className="section border-t border-[var(--border)]">
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
            <div className="mb-12 p-6 rounded-[var(--radius-xl)] border"
              style={{
                background: 'linear-gradient(135deg, rgba(26,13,46,0.8) 0%, rgba(13,26,46,0.8) 100%)',
                borderColor: 'rgba(167,139,250,0.2)',
                boxShadow: '0 0 40px rgba(139,92,246,0.05)',
              }}>

              {/* AI section header */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(139,92,246,0.2)' }}>
                  <Sparkles size={14} style={{ color: AI_STYLE.text }} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.12em]"
                    style={{ color: AI_STYLE.text }}>
                    AI / ML Stack
                  </p>
                  <p className="text-[10px]" style={{ color: 'rgba(167,139,250,0.5)' }}>
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
            <div className="flex flex-wrap gap-2 mb-8">
              {availableTabs.map((tab) => {
                const count =
                  tab.key === 'all'
                    ? stdSkills.length
                    : stdSkills.filter((s) => s.category === tab.key).length
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveCategory(tab.key)}
                    className={`px-4 py-2 rounded-lg text-xs font-bold
                                transition-all duration-200 ${activeCategory === tab.key
                        ? 'bg-[var(--accent)] text-white shadow-sm shadow-[var(--accent)]/20'
                        : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]'
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
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
              <div className="mt-12 p-6 rounded-[var(--radius-lg)]
                            bg-[var(--bg-card)] border border-[var(--border)]">
                <p className="text-[10px] font-black uppercase tracking-[0.12em]
                            text-[var(--text-muted)] mb-4">
                  Core Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {allSkills
                    .filter((s) => s.isFeatured)
                    .sort((a, b) => (a.displayOrder ?? 99) - (b.displayOrder ?? 99))
                    .map((s) => {
                      const colors = isAISkill(s)
                        ? { bg: 'rgba(139,92,246,0.1)', text: AI_STYLE.text, dot: AI_STYLE.dot, border: AI_STYLE.border }
                        : CATEGORY_COLORS[s.category] || CATEGORY_COLORS.other
                      return (
                        <span
                          key={s._id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5
                                   rounded-full text-xs font-semibold border"
                          style={{
                            backgroundColor: colors.bg,
                            color: colors.text,
                            borderColor: colors.border || colors.dot + '30',
                          }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: colors.dot }} />
                          {s.name}
                        </span>
                      )
                    })}
                </div>
              </div>
            </SectionReveal>
          )}

      </div>
    </section>
  )
}