import { motion } from 'framer-motion'
import { Trophy, Award, Star, Zap, BookOpen, Users } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import SectionReveal from '@/components/animations/SectionReveal'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren'
import { useCertificates } from '@/hooks/useCertificates'
import CountUp from '@/components/animations/CountUp'

// ── Static highlights ─────────────────────────────────────────
const STATS = [
    { value: 10, suffix: '+', label: 'Months at Cogitate', icon: '🏢' },
    { value: 32, suffix: '', label: 'Schema tables designed', icon: '🗄️' },
    { value: 1, suffix: '', label: 'Promotion earned', icon: '🚀' },
    { value: 3, suffix: '+', label: 'Production systems built', icon: '⚙️' },
]

const HIGHLIGHTS = [
    {
        icon: Trophy,
        title: 'Promoted intern → full-time',
        subtitle: 'Cogitate · Aug 2024',
        desc: 'Promoted from Software Developer Intern to Associate Full Stack Developer after 10 months — based on production contributions to the DEB billing platform.',
    },
    {
        icon: Zap,
        title: 'Autonomous Agent POC',
        subtitle: 'Cogitate internal · 2025',
        desc: 'Assigned by tech lead to investigate and prototype a long-running Planner–Generator–Evaluator coding agent for the .NET billing codebase using Cursor Pro.',
    },
    {
        icon: BookOpen,
        title: 'Final Year Project — Blockchain',
        subtitle: 'Dr. D. Y. Patil Institute · 2025',
        desc: 'Built a Secure P2P Energy Trading Platform with RSA digital signatures, SHA-256/Keccak-256 hashing, Solidity smart contracts, and on-chain transaction anchoring.',
    },
    {
        icon: Star,
        title: 'B.E. AI & Data Science',
        subtitle: 'Dr. D. Y. Patil Institute · 2021–2025',
        desc: 'Graduated with a strong academic record in Artificial Intelligence & Data Science. Completed coursework spanning ML, distributed systems, and bio-inspired computing.',
    },
]

// ── Certificate card from DB ───────────────────────────────────
const CERT_ICONS = {
    certification: '🏅', award: '🏆', hackathon: '⚡',
    publication: '📝', recognition: '✨', other: '🎖️',
}

function CertCard({ cert, index }) {
    const icon = CERT_ICONS[cert.category] || CERT_ICONS.other

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="flex items-start gap-4 p-4 border-2
                 border-[var(--border)] group hover:border-[var(--text-primary)]
                 hover:-translate-y-0.5 transition-all duration-200
                 bg-[var(--bg-card)]"
        >
            {/* Icon */}
            <div
                className="w-10 h-10 flex items-center
                   justify-center text-lg flex-shrink-0
                   bg-[var(--accent-light)] border-2 border-[var(--accent-muted)]"
            >
                {cert.imageUrl
                    ? <img src={cert.imageUrl} alt="" className="w-6 h-6 object-contain" />
                    : icon
                }
            </div>

            <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-[var(--text-primary)] leading-snug mb-0.5">
                    {cert.title}
                </p>
                <p className="text-xs text-[var(--text-muted)]">
                    {cert.issuer}
                    {cert.issueDate && (
                        <span className="ml-2">
                            · {new Date(cert.issueDate).getFullYear()}
                        </span>
                    )}
                </p>
                {cert.skills?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {cert.skills.slice(0, 3).map((s) => (
                            <span
                                key={s}
                                className="px-1.5 py-0.5 text-[10px] font-mono
                           border-2 border-[var(--border)]
                           bg-[var(--bg-subtle)] text-[var(--text-muted)]"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {cert.credentialUrl && (
                <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text-muted)] hover:text-[var(--accent)]
                     opacity-0 group-hover:opacity-100 flex-shrink-0
                     transition-all duration-200"
                    aria-label="View credential"
                >
                    ↗
                </a>
            )}
        </motion.div>
    )
}

// ── Main section ───────────────────────────────────────────────
export default function Achievements() {
    const { data, isLoading } = useCertificates()
    const certs = data?.data ?? []

    return (
        <section id="achievements" className="section border-t-2 border-[var(--border)]">
            <div className="container">

                <SectionReveal>
                    <SectionHeading
                        eyebrow="Achievements"
                        title="Milestones & recognition."
                        subtitle="Professional highlights, academic achievements, and certifications."
                    />
                </SectionReveal>

                {/* ── Stats row — boxy ── */}
                <SectionReveal delay={0.1}>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-12 mb-14">
                        {STATS.map(({ value, suffix, label, icon }) => (
                            <div
                                key={label}
                                className="p-5 text-center
                           bg-[var(--bg-card)] border-2 border-[var(--border)]
                           hover:border-[var(--text-primary)] transition-colors"
                            >
                                <div className="text-2xl mb-2">{icon}</div>
                                <p className="text-3xl font-black text-[var(--text-primary)] leading-none mb-1">
                                    <CountUp end={value} suffix={suffix} />
                                </p>
                                <p className="text-xs text-[var(--text-muted)] leading-snug
                                              tracking-wider uppercase font-semibold">
                                    {label}
                                </p>
                            </div>
                        ))}
                    </div>
                </SectionReveal>

                {/* ── Two column: highlights + certs ── */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Notable highlights */}
                    <div>
                        <SectionReveal>
                            <p className="text-[11px] font-black uppercase tracking-[0.2em]
                            text-[var(--text-muted)] mb-6 flex items-center gap-2">
                                <span className="w-6 h-[2px] bg-[var(--text-muted)] inline-block" />
                                Notable Highlights
                            </p>
                        </SectionReveal>

                        <StaggerContainer className="space-y-4">
                            {HIGHLIGHTS.map(({ icon: Icon, title, subtitle, desc }) => (
                                <StaggerItem key={title}>
                                    <div
                                        className="p-5 border-2 border-[var(--border)] group
                               hover:-translate-y-0.5 hover:border-[var(--text-primary)]
                               transition-all duration-200 bg-[var(--bg-card)]"
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div
                                                className="w-10 h-10
                                   flex items-center justify-center flex-shrink-0
                                   bg-[var(--accent-light)] border-2 border-[var(--accent-muted)]"
                                            >
                                                <Icon size={17} className="text-[var(--accent)]" />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-[var(--text-primary)] leading-snug mb-1">
                                                    {title}
                                                </p>
                                                <p className="text-[11px] font-bold mb-2
                                                              text-[var(--accent)] tracking-wider uppercase">
                                                    {subtitle}
                                                </p>
                                                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                                                    {desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    </div>

                    {/* Certificates from DB */}
                    <div>
                        <SectionReveal>
                            <p className="text-[11px] font-black uppercase tracking-[0.2em]
                            text-[var(--text-muted)] mb-6 flex items-center gap-2">
                                <span className="w-6 h-[2px] bg-[var(--text-muted)] inline-block" />
                                Certifications & Awards
                            </p>
                        </SectionReveal>

                        {isLoading && (
                            <div className="space-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="h-20
                                          bg-[var(--bg-card)] border-2 border-[var(--border)]
                                          animate-pulse" />
                                ))}
                            </div>
                        )}

                        {!isLoading && certs.length === 0 && (
                            <div className="p-8 border-2 border-[var(--border)]
                              border-dashed text-center">
                                <p className="text-sm text-[var(--text-muted)]">
                                    No certificates added yet.
                                </p>
                                <p className="text-xs text-[var(--text-muted)] mt-1">
                                    Add via admin panel or Postman.
                                </p>
                            </div>
                        )}

                        {!isLoading && certs.length > 0 && (
                            <div className="space-y-3">
                                {certs.map((cert, i) => (
                                    <CertCard key={cert._id} cert={cert} index={i} />
                                ))}
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </section>
    )
}