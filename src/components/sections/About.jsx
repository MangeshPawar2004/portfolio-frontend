// src/components/sections/About.jsx — FULL REPLACEMENT
import { motion } from 'framer-motion'
import { Code2, Brain, Server, Zap } from 'lucide-react'
import { useSettings } from '@/hooks/useSettings'
import SectionHeading from '@/components/ui/SectionHeading'
import FadeIn from '@/components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren'

const HIGHLIGHTS = [
  {
    icon: Code2,
    label: 'Full Stack',
    desc: 'React, Node.js, .NET — end to end.',
    color: { bg: '#1a2e4a', icon: '#3B82F6', hover: '#2563EB' },
  },
  {
    icon: Brain,
    label: 'AI / GenAI',
    desc: 'LangChain, FAISS, Python pipelines.',
    color: { bg: '#2d1f3d', icon: '#A78BFA', hover: '#8B5CF6' },
  },
  {
    icon: Server,
    label: 'Cloud & Infra',
    desc: 'Azure Functions, Cosmos DB, SQL Server.',
    color: { bg: '#1f2d1a', icon: '#34D399', hover: '#10B981' },
  },
  {
    icon: Zap,
    label: 'Blockchain',
    desc: 'Solidity, Hardhat, Ethers.js.',
    color: { bg: '#2d1f0d', icon: '#F59E0B', hover: '#D97706' },
  },
]

// Replaces the old HTML table
const QUICK_FACTS = [
  { label: 'Role',       value: 'Associate Full Stack Developer' },
  { label: 'Company',   value: 'Cogitate · Navi Mumbai' },
  { label: 'Education', value: 'B.E. AI & DS · DY Patil' },
  { label: 'Experience','value': '1+ yr production systems' },
  { label: 'Stack',     value: 'MERN · .NET · Azure · Python' },
  { label: 'Status',    value: '🟢 Open to roles' },
]

export default function About() {
  const { data: settings } = useSettings()

  return (
    <section id="about" className="section border-t border-[var(--border)]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* ── Left column ───────────────────────────── */}
          <div>
            <SectionHeading
              eyebrow="About me"
              title="Engineering with intention."
            />

            {/* Summary — only one paragraph, clean */}
            <FadeIn delay={0.15}>
              <p className="mt-6 text-base leading-relaxed text-[var(--text-secondary)]">
                {settings?.aboutSummary ||
                  'Associate Full Stack Developer at Cogitate with 1+ year building production billing systems. Specialising in React, Node.js, .NET, Azure, and AI/ML integrations.'}
              </p>
            </FadeIn>

            {/* Background — visually separated with top margin */}
            {settings?.aboutBackground && (
              <FadeIn delay={0.2}>
                <p className="mt-4 text-sm leading-relaxed text-[var(--text-muted)]">
                  {settings.aboutBackground}
                </p>
              </FadeIn>
            )}

            {/* ── Stat grid — replaces the old table ── */}
            <FadeIn delay={0.25}>
              <div className="mt-10 grid grid-cols-2 gap-3">
                {QUICK_FACTS.map(({ label, value }) => (
                  <div
                    key={label}
                    className="p-4 rounded-[var(--radius-md)] bg-[var(--bg-card)]
                               border border-[var(--border)] hover:border-[var(--border-hover)]
                               transition-colors duration-200"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em]
                                  text-[var(--accent)] mb-1.5">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-[var(--text-primary)] leading-snug">
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* ── Right column ──────────────────────────── */}
          <div className="space-y-4">

            {/* Highlight cards — unified style */}
            <StaggerContainer className="grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map(({ icon: Icon, label, desc, color }) => (
                <StaggerItem key={label}>
                  <div
                    className="p-5 rounded-[var(--radius-md)] border border-[var(--border)]
                               bg-[var(--bg-card)] group cursor-default
                               hover:border-[var(--border-hover)] transition-all duration-200
                               hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                  >
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center
                                 justify-center mb-4 transition-colors duration-200"
                      style={{ backgroundColor: color.bg }}
                    >
                      <Icon size={18} style={{ color: color.icon }} />
                    </div>

                    <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">
                      {label}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Specialities — inside its own card, not floating */}
            {settings?.aboutSpecialities?.length > 0 && (
              <FadeIn delay={0.3}>
                <div className="p-5 rounded-[var(--radius-md)] border border-[var(--border)]
                               bg-[var(--bg-card)]">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em]
                                text-[var(--text-muted)] mb-3">
                    Specialities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {settings.aboutSpecialities.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full text-xs font-medium
                                   bg-[var(--bg-subtle)] text-[var(--text-secondary)]
                                   border border-[var(--border)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}