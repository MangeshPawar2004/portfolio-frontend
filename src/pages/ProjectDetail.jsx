import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ExternalLink, Calendar,
  Users, Clock, Tag as TagIcon, CheckCircle2,
  AlertTriangle, Lightbulb, TrendingUp
} from 'lucide-react'
import { useProject } from '@/hooks/useProjects'
import Badge from '@/components/ui/Badge'
import Tag from '@/components/ui/Tag'
import Skeleton from '@/components/ui/Skeleton'
import FadeIn from '@/components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren'
import { PROJECT_STATUS_COLORS } from '@/constants'
import { formatDate } from '@/lib/utils'

const STATUS_VARIANT = { completed: 'success', ongoing: 'accent', planned: 'purple' }

// ── Sub-components ────────────────────────────────────────────

function DetailSection({ icon: Icon, title, children }) {
  return (
    <FadeIn>
      <div className="py-8 border-t border-[#242424]">
        <div className="flex items-center gap-2 mb-5">
          {Icon && <Icon size={16} className="text-[#3B82F6]" />}
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[#A1A1AA]">
            {title}
          </h3>
        </div>
        {children}
      </div>
    </FadeIn>
  )
}

function MetaCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#111111] border border-[#242424]">
      <div className="w-8 h-8 rounded-lg bg-[#1d3f6e] flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={14} className="text-[#3B82F6]" />
      </div>
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-widest text-[#71717A] mb-0.5">
          {label}
        </p>
        <p className="text-sm font-medium text-[#F5F5F5]">{value || '—'}</p>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="container py-12 space-y-8 max-w-4xl">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-3/4" />
      <Skeleton className="h-5 w-full max-w-2xl" />
      <Skeleton className="h-72 w-full" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-20" />)}
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { data: project, isLoading, isError } = useProject(slug)

  // ── Loading ──────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen">
        <LoadingSkeleton />
      </div>
    )
  }

  // ── Error / Not found ────────────────────────────────────────
  if (isError || !project) {
    return (
      <div className="pt-16 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl font-bold text-[#242424] mb-4">404</p>
          <h1 className="text-xl font-semibold text-[#F5F5F5] mb-2">Project not found</h1>
          <p className="text-[#71717A] mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg
                       bg-[#3B82F6] text-white text-sm font-medium hover:bg-[#2563EB] transition-colors"
          >
            <ArrowLeft size={14} /> Back to home
          </Link>
        </div>
      </div>
    )
  }

  const {
    title, shortDescription, problemStatement, solution,
    techStack = [], keyFeatures = [], architecture,
    implementationDetails, challenges, outcomes,
    metrics = [], thumbnailUrl, media = [],
    githubUrl, liveDemoUrl, caseStudyUrl,
    myRole, teamSize, duration, status,
    category, tags = [], createdAt,
  } = project

  // All screenshots — hero thumbnail + gallery media
  const screenshots = [
    ...(thumbnailUrl ? [{ url: thumbnailUrl, caption: 'Overview', _id: 'thumb' }] : []),
    ...media.filter((m) => m.isVisible !== false),
  ]

  return (
    <div className="pt-16 min-h-screen">

      {/* ── Back button ───────────────────────────────────────── */}
      <div className="container pt-8 pb-0 max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-[#71717A]
                     hover:text-[#F5F5F5] transition-colors mb-8 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          All projects
        </button>

        {/* ── Header ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Category + status */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {category && (
              <span className="text-xs text-[#3B82F6] font-medium uppercase tracking-wider">
                {category}
              </span>
            )}
            {category && status && (
              <span className="text-[#242424]">·</span>
            )}
            {status && (
              <Badge variant={STATUS_VARIANT[status] || 'default'}>{status}</Badge>
            )}
          </div>

          <h1 className="text-[#F5F5F5] mb-4 max-w-3xl">{title}</h1>

          <p className="text-lg text-[#A1A1AA] leading-relaxed max-w-2xl mb-6">
            {shortDescription}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {githubUrl && (
              <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                            bg-[#161616] border border-[#242424] text-[#F5F5F5]
                            hover:border-[#3a3a3a] hover:bg-[#1a1a1a] transition-all">
                <ExternalLink size={15} /> View Code
              </a>
            )}
            {liveDemoUrl && (
              <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                            bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors">
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
          </div>
        </motion.div>
      </div>

      {/* ── Hero image ─────────────────────────────────────────── */}
      {thumbnailUrl && (
        <FadeIn delay={0.2}>
          <div className="container max-w-4xl mb-2">
            <div className="rounded-2xl overflow-hidden border border-[#242424] bg-[#111111]">
              <img
                src={thumbnailUrl}
                alt={`${title} screenshot`}
                className="w-full object-cover max-h-[480px]"
              />
            </div>
          </div>
        </FadeIn>
      )}

      {/* ── Body ──────────────────────────────────────────────── */}
      <div className="container max-w-4xl pb-16">

        {/* Meta cards */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-8">
            <MetaCard icon={Users}    label="My Role"    value={myRole} />
            <MetaCard icon={Users}    label="Team Size"  value={teamSize ? `${teamSize} people` : null} />
            <MetaCard icon={Clock}    label="Duration"   value={duration} />
            <MetaCard icon={Calendar} label="Year"
              value={createdAt ? new Date(createdAt).getFullYear() : null} />
          </div>
        </FadeIn>

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <DetailSection icon={TagIcon} title="Tech Stack">
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <div
                  key={tech.name || tech}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                             bg-[#111111] border border-[#242424] text-sm text-[#A1A1AA]"
                >
                  {tech.name || tech}
                  {tech.category && (
                    <span className="text-[10px] text-[#71717A] capitalize">
                      · {tech.category}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </DetailSection>
        )}

        {/* Problem */}
        {problemStatement && (
          <DetailSection icon={AlertTriangle} title="Problem Statement">
            <p className="text-[#A1A1AA] leading-relaxed whitespace-pre-line">
              {problemStatement}
            </p>
          </DetailSection>
        )}

        {/* Solution */}
        {solution && (
          <DetailSection icon={Lightbulb} title="Solution">
            <p className="text-[#A1A1AA] leading-relaxed whitespace-pre-line">
              {solution}
            </p>
          </DetailSection>
        )}

        {/* Key Features */}
        {keyFeatures.length > 0 && (
          <DetailSection icon={CheckCircle2} title="Key Features">
            <StaggerContainer className="grid sm:grid-cols-2 gap-3">
              {keyFeatures.map((feature, i) => (
                <StaggerItem key={i}>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#111111] border border-[#242424]">
                    <CheckCircle2 size={15} className="text-[#10B981] mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-[#A1A1AA] leading-relaxed">{feature}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </DetailSection>
        )}

        {/* Architecture */}
        {architecture && (
          <DetailSection title="Architecture">
            <div className="p-5 rounded-xl bg-[#0d1117] border border-[#242424] font-mono text-sm">
              <p className="text-[#A1A1AA] leading-relaxed whitespace-pre-line">
                {architecture}
              </p>
            </div>
          </DetailSection>
        )}

        {/* Implementation Details */}
        {implementationDetails && (
          <DetailSection title="Implementation Details">
            <p className="text-[#A1A1AA] leading-relaxed whitespace-pre-line">
              {implementationDetails}
            </p>
          </DetailSection>
        )}

        {/* Challenges */}
        {challenges && (
          <DetailSection icon={AlertTriangle} title="Challenges">
            <p className="text-[#A1A1AA] leading-relaxed whitespace-pre-line">
              {challenges}
            </p>
          </DetailSection>
        )}

        {/* Outcomes */}
        {outcomes && (
          <DetailSection icon={TrendingUp} title="Outcomes">
            <p className="text-[#A1A1AA] leading-relaxed whitespace-pre-line">
              {outcomes}
            </p>
          </DetailSection>
        )}

        {/* Metrics */}
        {metrics.length > 0 && (
          <DetailSection icon={TrendingUp} title="Metrics">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {metrics.map((m) => (
                <div key={m.label}
                  className="p-4 rounded-xl bg-[#111111] border border-[#242424] text-center">
                  <p className="text-2xl font-bold text-[#3B82F6] mb-1">{m.value}</p>
                  <p className="text-xs text-[#71717A]">{m.label}</p>
                </div>
              ))}
            </div>
          </DetailSection>
        )}

        {/* Screenshots gallery */}
        {screenshots.length > 1 && (
          <DetailSection title="Screenshots">
            <div className="grid sm:grid-cols-2 gap-4">
              {screenshots.slice(1).map((media) => (
                <div key={media._id}
                  className="rounded-xl overflow-hidden border border-[#242424] bg-[#111111]">
                  <img
                    src={media.url}
                    alt={media.caption || media.altText || title}
                    className="w-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {media.caption && (
                    <p className="px-3 py-2 text-xs text-[#71717A] border-t border-[#242424]">
                      {media.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </DetailSection>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <FadeIn>
            <div className="py-8 border-t border-[#242424]">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => <Tag key={tag}>#{tag}</Tag>)}
              </div>
            </div>
          </FadeIn>
        )}

        {/* Bottom CTA */}
        <FadeIn>
          <div className="py-8 border-t border-[#242424] flex flex-col sm:flex-row
                          items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[#F5F5F5] mb-1">
                Interested in this project?
              </p>
              <p className="text-sm text-[#71717A]">
                Let's talk about it or check out the code.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                              border border-[#242424] text-[#A1A1AA] hover:text-[#F5F5F5]
                              hover:border-[#3a3a3a] transition-all">
                  <ExternalLink size={14} /> Code
                </a>
              )}
              <Link to="/#contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                           bg-[#3B82F6] text-white hover:bg-[#2563EB] transition-colors">
                Get in touch
              </Link>
            </div>
          </div>
        </FadeIn>

      </div>
    </div>
  )
}