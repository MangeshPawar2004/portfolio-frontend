import { motion } from 'framer-motion'
import { Code2, Brain, Server, Zap } from 'lucide-react'
import { useSettings } from '@/hooks/useSettings'
import Section from '@/components/layout/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import FadeIn from '@/components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren'

const HIGHLIGHTS = [
  {
    icon: Code2,
    label: 'Full Stack',
    desc: 'React, Node.js, .NET — end to end.',
  },
  {
    icon: Brain,
    label: 'AI / GenAI',
    desc: 'LangChain, FAISS, Python pipelines.',
  },
  {
    icon: Server,
    label: 'Cloud & Infra',
    desc: 'Azure Functions, Cosmos DB, SQL Server.',
  },
  {
    icon: Zap,
    label: 'Blockchain',
    desc: 'Solidity, Hardhat, Ethers.js.',
  },
]

const QUICK_FACTS = [
  { label: 'Role',       value: 'Associate Full Stack Developer' },
  { label: 'Company',   value: 'Cogitate · Navi Mumbai' },
  { label: 'Education', value: 'B.E. AI & DS · DY Patil' },
  { label: 'Experience', value: '1+ yr production systems' },
  { label: 'Stack',     value: 'MERN · .NET · Azure · Python' },
  { label: 'Status',    value: '🟢 Open to roles' },
]

export default function About() {
  const { data: settings } = useSettings()

  return (
    <Section id="about">
      <div className="grid lg:grid-cols-2 gap-16 items-start">

        {/* ── Left column ───────────────────────────── */}
        <div>
          <SectionHeading
            eyebrow="About me"
            title="Engineering with intention."
          />

          {/* Summary */}
          <FadeIn delay={0.15}>
            <p className="mt-6 text-base leading-relaxed text-[var(--text-secondary)]">
              {settings?.aboutSummary ||
                'Associate Full Stack Developer at Cogitate with 1+ year building production billing systems. Specialising in React, Node.js, .NET, Azure, and AI/ML integrations.'}
            </p>
          </FadeIn>

          {/* Background — visually separated */}
          {settings?.aboutBackground && (
            <FadeIn delay={0.2}>
              <p className="mt-5 text-sm leading-relaxed text-[var(--text-muted)]">
                {settings.aboutBackground}
              </p>
            </FadeIn>
          )}

          {/* ── Stat grid — boxy ── */}
          <FadeIn delay={0.25}>
            <div className="mt-10 grid grid-cols-2 gap-3">
              {QUICK_FACTS.map(({ label, value }) => (
                <div
                  key={label}
                  className="p-4 bg-[var(--bg-card)]
                             border-2 border-[var(--border)]
                             hover:border-[var(--text-primary)]
                             transition-colors duration-200"
                >
                  <p className="text-[10px] font-black uppercase tracking-[0.12em]
                                text-[var(--accent)] mb-1.5">
                    {label}
                  </p>
                  <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* ── Right column ──────────────────────────── */}
        <div className="space-y-6">

          {/* Highlight cards — boxy */}
          <StaggerContainer className="grid grid-cols-2 gap-3">
            {HIGHLIGHTS.map(({ icon: Icon, label, desc }) => (
              <StaggerItem key={label}>
                <div
                  className="p-5 border-2 border-[var(--border)]
                             bg-[var(--bg-card)] group cursor-default
                             hover:border-[var(--text-primary)]
                             transition-all duration-200
                             hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 flex items-center
                               justify-center mb-4 bg-[var(--accent-light)]
                               border-2 border-[var(--accent-muted)]"
                  >
                    <Icon size={18} className="text-[var(--accent)]" />
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

          {/* Specialities — inside its own card */}
          {settings?.aboutSpecialities?.length > 0 && (
            <FadeIn delay={0.3}>
              <div className="p-5 border-2 border-[var(--border)]
                              bg-[var(--bg-card)]">
                <p className="text-[10px] font-black uppercase tracking-[0.12em]
                              text-[var(--text-muted)] mb-3">
                  Specialities
                </p>
                <div className="flex flex-wrap gap-2">
                  {settings.aboutSpecialities.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 text-xs font-semibold
                                 bg-[var(--bg-subtle)] text-[var(--text-secondary)]
                                 border-2 border-[var(--border)]"
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
    </Section>
  )
}