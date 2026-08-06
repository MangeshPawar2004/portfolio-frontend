import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, Calendar, Tag, Share2, Check } from 'lucide-react'
import { useState } from 'react'
import { useBlogPost } from '@/hooks/useBlog'
import Skeleton from '@/components/ui/Skeleton'
import FadeIn from '@/components/animations/FadeIn'
import { formatDate, readTime } from '@/lib/utils'

// ── Skeleton ───────────────────────────────────────────────────
function LoadingSkeleton() {
    return (
        <div className="container pt-8 pb-16 max-w-3xl space-y-6">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-4/5" />
            <div className="flex gap-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-64 w-full rounded-xl" />
            {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className={`h-4 w-${i % 3 === 0 ? 'full' : i % 3 === 1 ? '5/6' : '4/5'}`} />
            ))}
        </div>
    )
}

// ── Copy link button ───────────────────────────────────────────
function CopyLinkButton() {
    const [copied, setCopied] = useState(false)

    const copy = () => {
        navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <button
            onClick={copy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm
                 font-medium border border-[var(--border)] text-[var(--text-secondary)]
                 hover:text-[var(--text-primary)] hover:border-[var(--border-hover)]
                 transition-all duration-200"
        >
            {copied ? <Check size={14} className="text-[var(--success)]" /> : <Share2 size={14} />}
            {copied ? 'Copied!' : 'Share'}
        </button>
    )
}

// ── Simple markdown-to-HTML renderer ──────────────────────────
// For a production app use react-markdown. This handles basic cases.
function PostContent({ content }) {
    if (!content) return null

    // Convert markdown to styled HTML elements
    const lines = content.split('\n')
    const elements = []
    let i = 0

    while (i < lines.length) {
        const line = lines[i]

        if (line.startsWith('## ')) {
            elements.push(
                <h2 key={i} className="text-2xl font-bold text-[var(--text-primary)]
                                mt-10 mb-4 leading-snug">
                    {line.slice(3)}
                </h2>
            )
        } else if (line.startsWith('### ')) {
            elements.push(
                <h3 key={i} className="text-lg font-bold text-[var(--text-primary)]
                                mt-8 mb-3">
                    {line.slice(4)}
                </h3>
            )
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
            elements.push(
                <li key={i} className="text-[var(--text-secondary)] leading-relaxed
                                list-none flex items-start gap-2 my-1.5">
                    <span className="text-[var(--accent)] mt-1.5 flex-shrink-0">›</span>
                    {line.slice(2)}
                </li>
            )
        } else if (line.startsWith('```')) {
            // Collect code block
            const codeLines = []
            i++
            while (i < lines.length && !lines[i].startsWith('```')) {
                codeLines.push(lines[i])
                i++
            }
            elements.push(
                <pre
                    key={i}
                    className="my-6 p-5 rounded-[var(--radius-md)] bg-[var(--bg-subtle)]
                     border border-[var(--border)] overflow-x-auto text-sm
                     font-mono text-[var(--text-secondary)] leading-relaxed"
                >
                    {codeLines.join('\n')}
                </pre>
            )
        } else if (line.startsWith('> ')) {
            elements.push(
                <blockquote
                    key={i}
                    className="my-6 pl-5 border-l-2 border-[var(--accent)]
                     text-[var(--text-muted)] italic leading-relaxed"
                >
                    {line.slice(2)}
                </blockquote>
            )
        } else if (line.trim() === '') {
            elements.push(<div key={i} className="my-3" />)
        } else {
            // Inline bold **text**
            const withBold = line.replace(
                /\*\*(.*?)\*\*/g,
                '<strong class="font-semibold text-[#EDEDED]">$1</strong>'
            )
            elements.push(
                <p
                    key={i}
                    className="text-[var(--text-secondary)] leading-[1.85] my-2"
                    dangerouslySetInnerHTML={{ __html: withBold }}
                />
            )
        }
        i++
    }

    return <div className="mt-8">{elements}</div>
}

// ── Main component ─────────────────────────────────────────────
export default function BlogDetail() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const { data: post, isLoading, isError } = useBlogPost(slug)

    if (isLoading) {
        return <div className="pt-16 min-h-screen"><LoadingSkeleton /></div>
    }

    if (isError || !post) {
        return (
            <div className="pt-16 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-6xl font-black text-[var(--border)] mb-4">404</p>
                    <h1 className="text-xl font-bold text-[var(--text-primary)] mb-2">Post not found</h1>
                    <p className="text-sm text-[var(--text-muted)] mb-8">
                        This article doesn't exist or was unpublished.
                    </p>
                    <Link to="/#blog"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm
                       font-semibold bg-[var(--accent)] text-white
                       hover:bg-[var(--accent-hover)] transition-colors">
                        <ArrowLeft size={14} /> Back to blog
                    </Link>
                </div>
            </div>
        )
    }

    const {
        title, content, excerpt, coverImage,
        tags = [], category, publishedAt,
        readTimeMinutes, relatedProjects = [],
    } = post

    const estReadTime = readTimeMinutes || readTime(content || '')

    return (
        <div className="pt-16 min-h-screen">
            <div className="container max-w-3xl py-10">

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)]
                     hover:text-[var(--text-primary)] transition-colors mb-10 group"
                >
                    <ArrowLeft size={14}
                        className="group-hover:-translate-x-1 transition-transform duration-200" />
                    All posts
                </button>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {category && (
                        <p className="text-[11px] font-black uppercase tracking-[0.15em]
                          text-[var(--accent)] mb-4">
                            {category}
                        </p>
                    )}

                    <h1 className="text-[var(--text-primary)] mb-5 leading-[1.1]">
                        {title}
                    </h1>

                    {excerpt && (
                        <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-6">
                            {excerpt}
                        </p>
                    )}

                    {/* Meta row */}
                    <div className="flex flex-wrap items-center gap-4 mb-8
                          pb-8 border-b border-[var(--border)]">
                        <div className="flex items-center gap-4 text-sm text-[var(--text-muted)]">
                            {publishedAt && (
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={13} />
                                    {formatDate(publishedAt)}
                                </span>
                            )}
                            <span className="flex items-center gap-1.5">
                                <Clock size={13} />
                                {estReadTime} min read
                            </span>
                        </div>

                        <div className="ml-auto">
                            <CopyLinkButton />
                        </div>
                    </div>
                </motion.div>

                {/* Cover image */}
                {coverImage && (
                    <FadeIn delay={0.1}>
                        <div className="rounded-[var(--radius-xl)] overflow-hidden
                            border border-[var(--border)] mb-4">
                            <img
                                src={coverImage}
                                alt={title}
                                className="w-full object-cover max-h-[420px]"
                            />
                        </div>
                    </FadeIn>
                )}

                {/* Post body */}
                <FadeIn delay={0.15}>
                    <PostContent content={content} />
                </FadeIn>

                {/* Tags */}
                {tags.length > 0 && (
                    <FadeIn delay={0.2}>
                        <div className="mt-12 pt-8 border-t border-[var(--border)]">
                            <p className="text-[10px] font-black uppercase tracking-[0.12em]
                            text-[var(--text-muted)] mb-3">
                                Tagged
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1.5 px-3 py-1
                               rounded-full text-xs font-mono
                               bg-[var(--bg-subtle)] text-[var(--text-muted)]
                               border border-[var(--border)]"
                                    >
                                        <Tag size={10} />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                )}

                {/* Related projects */}
                {relatedProjects.length > 0 && (
                    <FadeIn delay={0.25}>
                        <div className="mt-10 pt-8 border-t border-[var(--border)]">
                            <p className="text-[10px] font-black uppercase tracking-[0.12em]
                            text-[var(--text-muted)] mb-4">
                                Related Projects
                            </p>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {relatedProjects.map((proj) => (
                                    <Link
                                        key={proj._id}
                                        to={`/projects/${proj.slug}`}
                                        className="p-4 rounded-[var(--radius-md)]
                               bg-[var(--bg-card)] border border-[var(--border)]
                               hover:border-[var(--border-hover)]
                               hover:-translate-y-0.5 hover:shadow-[var(--shadow-sm)]
                               transition-all duration-200"
                                    >
                                        <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                                            {proj.title}
                                        </p>
                                        {proj.shortDescription && (
                                            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                                                {proj.shortDescription.slice(0, 80)}…
                                            </p>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                )}

                {/* Bottom CTA */}
                <FadeIn delay={0.3}>
                    <div className="mt-12 pt-8 border-t border-[var(--border)]
                          flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                                Found this useful?
                            </p>
                            <p className="text-xs text-[var(--text-muted)]">
                                Let's talk about it or check out my projects.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <CopyLinkButton />
                            <Link
                                to="/#contact"
                                className="px-4 py-2 rounded-lg text-sm font-semibold
                           bg-[var(--accent)] text-white
                           hover:bg-[var(--accent-hover)] transition-colors"
                            >
                                Get in touch
                            </Link>
                        </div>
                    </div>
                </FadeIn>

            </div>
        </div>
    )
}