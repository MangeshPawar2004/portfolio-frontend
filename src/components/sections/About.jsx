import { motion } from 'framer-motion'
import { Zap, Code2, Brain, Server } from 'lucide-react'
import { useSettings } from '@/hooks/useSettings'
import SectionHeading from '@/components/ui/SectionHeading'
import FadeIn from '@/components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren'

const HIGHLIGHTS = [
  {
    icon: Code2,
    label: 'Full Stack',
    desc: 'React, Node.js, .NET — frontend to backend to deployment.',
  },
  {
    icon: Brain,
    label: 'AI / GenAI',
    desc: 'LangChain, FAISS, Python pipelines and autonomous agent POCs.',
  },
  {
    icon: Server,
    label: 'Cloud & Infra',
    desc: 'Azure Functions, Cosmos DB, SQL Server, multi-tenant architecture.',
  },
  {
    icon: Zap,
    label: 'Blockchain',
    desc: 'Solidity, Hardhat, Ethers.js — on-chain anchoring and RSA signatures.',
  },
]

const QUICK_FACTS = [
  { label: 'Role',       value: 'Associate Full Stack Developer' },
  { label: 'Company',   value: 'Cogitate, Navi Mumbai' },
  { label: 'Education', value: 'B.E. AI & Data Science, DY Patil' },
  { label: 'Experience','value': '1+ year production systems' },
  { label: 'Stack',     value: 'MERN · .NET · Azure · Python' },
  { label: 'Status',    value: 'Open to AI / FS roles' },
]

export default function About() {
  const { data: settings } = useSettings()

  return (
    <section id="about" className="section border-t border-[#242424]">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — text */}
          <div>
            <SectionHeading
              eyebrow="About me"
              title="Engineering with intention."
              subtitle={
                settings?.aboutSummary ||
                "Associate Full Stack Developer with 1+ year building production systems at Cogitate. I specialise in full-stack web development, AI integrations, and cloud-native architectures on Azure."
              }
            />

            <FadeIn delay={0.2}>
              <p className="mt-5 text-[#71717A] leading-relaxed">
                {settings?.aboutBackground ||
                  "Graduated with a B.E. in AI & Data Science from Dr. D. Y. Patil Institute of Technology. Promoted from intern to full-time developer after 10 months. Currently working on the DigitalEdge Billing platform — a multi-tenant insurance billing engine serving carrier-level workloads on Azure."}
              </p>
            </FadeIn>

            {/* Quick facts grid */}
            <FadeIn delay={0.3}>
              <div className="mt-8 grid grid-cols-2 gap-px bg-[#242424] rounded-xl overflow-hidden border border-[#242424]">
                {QUICK_FACTS.map(({ label, value }) => (
                  <div key={label} className="bg-[#0B0B0B] p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#3B82F6] mb-1">
                      {label}
                    </p>
                    <p className="text-sm text-[#F5F5F5] font-medium">{value}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right — speciality cards */}
          <div>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {HIGHLIGHTS.map(({ icon: Icon, label, desc }) => (
                <StaggerItem key={label}>
                  <div className="card p-5 h-full group cursor-default">
                    <div className="w-9 h-9 rounded-lg bg-[#1d3f6e] flex items-center justify-center mb-4
                                    group-hover:bg-[#2563EB] transition-colors">
                      <Icon size={17} className="text-[#3B82F6] group-hover:text-white transition-colors" />
                    </div>
                    <h4 className="text-sm font-semibold text-[#F5F5F5] mb-1.5">{label}</h4>
                    <p className="text-xs text-[#71717A] leading-relaxed">{desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Specialities from settings */}
            {settings?.aboutSpecialities?.length > 0 && (
              <FadeIn delay={0.4}>
                <div className="mt-6 p-5 rounded-xl border border-[#242424] bg-[#111111]">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#71717A] mb-3">
                    Specialities
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {settings.aboutSpecialities.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-md text-xs bg-[#161616] text-[#A1A1AA]
                                   border border-[#242424]"
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