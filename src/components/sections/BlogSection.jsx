import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Calendar, Tag } from 'lucide-react'
import { useBlogPosts } from '@/hooks/useBlog'
import SectionHeading from '@/components/ui/SectionHeading'
import Skeleton from '@/components/ui/Skeleton'
import SectionReveal from '@/components/animations/SectionReveal'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerChildren'
import { formatDate, readTime } from '@/lib/utils'

// ── Blog card ──────────────────────────────────────────────────
function BlogCard({ post, featured = false }) {
    const {
        title, slug, excerpt, coverImage,
        tags = [], publishedAt, readTimeMinutes, category,
    } = post

    const estReadTime = readTimeMinutes || readTime(post.content || '')

    return (
        <motion.article
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`group flex flex-col rounded-[var(--radius-lg)]
                  bg-[var(--bg-card)] border border-[var(--border)]
                  overflow-hidden h-full
                  hover:border-[var(--border-hover)]
                  hover:shadow-[var(--shadow-md)]
                  transition-all duration-250
                  ${featured ? 'lg:flex-row' : ''}`}
        >
            {/* Cover image */}
            {coverImage && (
                <div
                    className={`bg-[var(--bg-subtle)] overflow-hidden flex-shrink-0
                      ${featured
                            ? 'lg:w-2/5 h-52 lg:h-auto'
                            : 'h-44'
                        }`}
                >
                    <img
                        src={coverImage}
                        alt={title}
                        className="w-full h-full object-cover
                       group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                    />
                </div>
            )}

            {/* No cover — category-colored header strip */}
            {!coverImage && (
                <div
                    className={`bg-gradient-to-br from-[var(--accent-muted)] to-[var(--bg-subtle)]
                      flex items-end p-5 flex-shrink-0
                      ${featured ? 'lg:w-2/5 h-52 lg:h-auto' : 'h-28'}`}
                >
                    {category && (
                        <span className="text-xs font-bold uppercase tracking-[0.12em]
                             text-[var(--accent)] px-2.5 py-1 rounded-full
                             bg-[var(--accent)]/10 border border-[var(--accent)]/20">
                            {category}
                        </span>
                    )}
                </div>
            )}

            {/* Content */}
            <div className={`flex flex-col flex-1 p-5 ${featured ? 'lg:p-7' : ''}`}>

                {/* Category + read time */}
                <div className="flex items-center gap-3 mb-3">
                    {category && !coverImage && null}
                    {category && coverImage && (
                        <span className="text-[10px] font-bold uppercase tracking-wider
                             text-[var(--accent)]">
                            {category}
                        </span>
                    )}
                    <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
                        <Clock size={10} />
                        {estReadTime} min read
                    </span>
                    {publishedAt && (
                        <span className="flex items-center gap-1 text-[11px] text-[var(--text-muted)]">
                            <Calendar size={10} />
                            {formatDate(publishedAt)}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3
                    className={`font-bold text-[var(--text-primary)] leading-snug mb-3
                      group-hover:text-[var(--accent)] transition-colors duration-200
                      ${featured ? 'text-xl' : 'text-base'}`}
                >
                    {title}
                </h3>

                {/* Excerpt */}
                {excerpt && (
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1 mb-4">
                        {excerpt.length > 120 ? excerpt.slice(0, 120) + '…' : excerpt}
                    </p>
                )}

                {/* Tags */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded
                           text-[10px] font-mono text-[var(--text-muted)]
                           bg-[var(--bg-subtle)] border border-[var(--border)]"
                            >
                                <Tag size={8} />
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Read more */}
                <Link
                    to={`/blog/${slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold
                     text-[var(--accent)] hover:text-[var(--accent-hover)]
                     transition-colors duration-200 mt-auto"
                >
                    Read article
                    <ArrowRight size={12}
                        className="group-hover:translate-x-0.5 transition-transform duration-200" />
                </Link>
            </div>
        </motion.article>
    )
}

// ── Skeleton card ──────────────────────────────────────────────
function BlogCardSkeleton() {
    return (
        <div className="rounded-[var(--radius-lg)] bg-[var(--bg-card)]
                    border border-[var(--border)] overflow-hidden">
            <Skeleton className="h-44 w-full rounded-none" />
            <div className="p-5 space-y-3">
                <Skeleton className="h-3 w-1/3" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
            </div>
        </div>
    )
}

// ── Main section ───────────────────────────────────────────────
export default function BlogSection() {
    const { data, isLoading, isError } = useBlogPosts({ limit: 6 })
    const posts = data?.data ?? []

    if (!isLoading && !isError && posts.length === 0) return null

    const [featured, ...rest] = posts

    return (
        <section id="blog" className="section border-t border-[var(--border)]">
            <div className="container">

                <SectionReveal>
                    <div className="flex flex-col sm:flex-row sm:items-end
                          justify-between gap-4 mb-14">
                        <SectionHeading
                            eyebrow="Blog"
                            title="Writing & thinking."
                            subtitle="Technical deep-dives, case studies, and project learnings."
                        />
                        <Link
                            to="/blog"
                            className="flex-shrink-0 inline-flex items-center gap-2 text-sm
                         font-semibold text-[var(--accent)]
                         hover:text-[var(--accent-hover)] transition-colors"
                        >
                            All posts <ArrowRight size={14} />
                        </Link>
                    </div>
                </SectionReveal>

                {/* Error */}
                {isError && (
                    <p className="text-sm text-[var(--error)] py-8">
                        Failed to load blog posts.
                    </p>
                )}

                {/* Skeletons */}
                {isLoading && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <BlogCardSkeleton key={i} />
                        ))}
                    </div>
                )}

                {/* Posts grid — featured post is full-width on first row */}
                {!isLoading && !isError && posts.length > 0 && (
                    <StaggerContainer className="space-y-6">

                        {/* Featured post — spans full width */}
                        {featured && (
                            <StaggerItem>
                                <BlogCard post={featured} featured />
                            </StaggerItem>
                        )}

                        {/* Remaining posts — 3-column grid */}
                        {rest.length > 0 && (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {rest.map((post) => (
                                    <StaggerItem key={post._id}>
                                        <BlogCard post={post} />
                                    </StaggerItem>
                                ))}
                            </div>
                        )}

                    </StaggerContainer>
                )}

            </div>
        </section>
    )
}