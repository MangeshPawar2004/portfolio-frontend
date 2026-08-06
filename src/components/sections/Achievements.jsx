import { motion } from 'framer-motion'
import { Trophy, Award, Star, Zap, BookOpen, Users } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import SectionReveal from '@/components/animations/SectionReveal'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren'
import { useCertificates } from '@/hooks/useCertificates'
import CountUp from '@/components/animations/CountUp'

// ── Static highlights — things that don't change often ─────────
const STATS = [
    { value: 10, suffix: '+', label: 'Months at Cogitate', icon: '🏢' },
    { value: 32, suffix: '', label: 'Schema tables designed', icon: '🗄️' },
    { value: 1, suffix: '', label: 'Promotion earned', icon: '🚀' },
    { value: 3, suffix: '+', label: 'Production systems built', icon: '⚙️' },
]

// ── Notable highlights — hardcoded since these are yours specifically
const HIGHLIGHTS = [
    {
        icon: Trophy,
        color: { bg: '#2d1f0d', text: '#FBB040', border: 'rgba(245,158,11,0.2)' },
        title: 'Promoted intern → full-time',
        subtitle: 'Cogitate · Aug 2024',
        desc: 'Promoted from Software Developer Intern to Associate Full Stack Developer after 10 months — based on production contributions to the DEB billing platform.',
    },
    {
        icon: Zap,
        color: { bg: '#1a2e4a', text: '#60A5FA', border: 'rgba(59,130,246,0.2)' },
        title: 'Autonomous Agent POC',
        subtitle: 'Cogitate internal · 2025',
        desc: 'Assigned by tech lead to investigate and prototype a long-running Planner–Generator–Evaluator coding agent for the .NET billing codebase using Cursor Pro.',
    },
    {
        icon: BookOpen,
        color: { bg: '#1f2d1a', text: '#34D399', border: 'rgba(52,211,153,0.2)' },
        title: 'Final Year Project — Blockchain',
        subtitle: 'Dr. D. Y. Patil Institute · 2025',
        desc: 'Built a Secure P2P Energy Trading Platform with RSA digital signatures, SHA-256/Keccak-256 hashing, Solidity smart contracts, and on-chain transaction anchoring.',
    },
    {
        icon: Star,
        color: { bg: '#2d1f3d', text: '#C4B5FD', border: 'rgba(167,139,250,0.2)' },
        title: 'B.E. AI & Data Science',
        subtitle: 'Dr. D. Y. Patil Institute · 2021–2025',
        desc: 'Graduated with a strong academic record in Artificial Intelligence & Data Science. Completed coursework spanning ML, distributed systems, and bio-inspired computing.',
    },
]

// ── Certificate card from DB ───────────────────────────────────
const CERT_ICONS = {
    certification: '🏅',
    award: '🏆',
    hackathon: '⚡',
    publication: '📝',
    recognition: '✨',
    other: '🎖️',
}

const CERT_COLORS = {
    certification: { bg: '#1a2e4a', text: '#60A5FA', border: 'rgba(59,130,246,0.15)' },
    award: { bg: '#2d1f0d', text: '#FBB040', border: 'rgba(245,158,11,0.15)' },
    hackathon: { bg: '#2d1f3d', text: '#C4B5FD', border: 'rgba(167,139,250,0.15)' },
    publication: { bg: '#1f2d1a', text: '#34D399', border: 'rgba(52,211,153,0.15)' },
    recognition: { bg: '#1f1a2e', text: '#F9A8D4', border: 'rgba(249,168,212,0.15)' },
    other: { bg: '#1a1a1a', text: '#A1A1AA', border: 'rgba(161,161,170,0.1)' },
}

function CertCard({ cert, index }) {
    const colors = CERT_COLORS[cert.category] || CERT_COLORS.other
    const icon = CERT_ICONS[cert.category] || CERT_ICONS.other

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="flex items-start gap-4 p-4 rounded-[var(--radius-md)]
                 border group hover:border-[var(--border-hover)]
                 hover:-translate-y-0.5 transition-all duration-200"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
        >
            {/* Icon */}
            <div
                className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center
                   justify-center text-lg flex-shrink-0"
                style={{ backgroundColor: colors.bg, borderColor: colors.border, border: '1px solid' }}
            >
                {cert.imageUrl
                    ? <img src={cert.imageUrl} alt="" className="w-6 h-6 object-contain rounded" />
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
                                className="px-1.5 py-0.5 rounded text-[10px] font-mono
                           border"
                                style={{
                                    backgroundColor: colors.bg,
                                    color: colors.text,
                                    borderColor: colors.border,
                                }}
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
        <section id="achievements" className="section border-t border-[var(--border)]">
            <div className="container">

                <SectionReveal>
                    <SectionHeading
                        eyebrow="Achievements"
                        title="Milestones & recognition."
                        subtitle="Professional highlights, academic achievements, and certifications."
                    />
                </SectionReveal>

                {/* ── Stats row ─────────────────────────────────── */}
                <SectionReveal delay={0.1}>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 mb-14">
                        {STATS.map(({ value, suffix, label, icon }) => (
                            <div
                                key={label}
                                className="p-5 rounded-[var(--radius-md)] text-center
                           bg-[var(--bg-card)] border border-[var(--border)]"
                            >
                                <div className="text-2xl mb-2">{icon}</div>
                                <p className="text-3xl font-black text-[var(--text-primary)] leading-none mb-1">
                                    <CountUp end={value} suffix={suffix} />
                                </p>
                                <p className="text-xs text-[var(--text-muted)] leading-snug">{label}</p>
                            </div>
                        ))}
                    </div>
                </SectionReveal>

                {/* ── Two column: highlights + certs ────────────── */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

                    {/* Notable highlights — static cards */}
                    <div>
                        <SectionReveal>
                            <p className="text-[11px] font-black uppercase tracking-[0.15em]
                            text-[var(--text-muted)] mb-6">
                                Notable Highlights
                            </p>
                        </SectionReveal>

                        <StaggerContainer className="space-y-4">
                            {HIGHLIGHTS.map(({ icon: Icon, color, title, subtitle, desc }) => (
                                <StaggerItem key={title}>
                                    <div
                                        className="p-5 rounded-[var(--radius-md)] border group
                               hover:-translate-y-0.5 hover:border-[var(--border-hover)]
                               transition-all duration-200"
                                        style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border)' }}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div
                                                className="w-10 h-10 rounded-[var(--radius-sm)]
                                   flex items-center justify-center flex-shrink-0"
                                                style={{ backgroundColor: color.bg, border: `1px solid ${color.border}` }}
                                            >
                                                <Icon size={17} style={{ color: color.text }} />
                                            </div>

                                            <div className="min-w-0">
                                                <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                                                    <p className="text-sm font-bold text-[var(--text-primary)] leading-snug">
                                                        {title}
                                                    </p>
                                                </div>
                                                <p className="text-[11px] font-semibold mb-2"
                                                    style={{ color: color.text }}>
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
                            <p className="text-[11px] font-black uppercase tracking-[0.15em]
                            text-[var(--text-muted)] mb-6">
                                Certifications & Awards
                            </p>
                        </SectionReveal>

                        {isLoading && (
                            <div className="space-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="h-20 rounded-[var(--radius-md)]
                                          bg-[var(--bg-card)] border border-[var(--border)]
                                          animate-pulse" />
                                ))}
                            </div>
                        )}

                        {!isLoading && certs.length === 0 && (
                            <div className="p-8 rounded-[var(--radius-md)] border border-[var(--border)]
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