import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import Fuse from 'fuse.js'
import { useBlogPosts } from '@/hooks/useBlog'
import Skeleton from '@/components/ui/Skeleton'
import { formatDate, readTime } from '@/lib/utils'
import { Clock, Calendar, Tag } from 'lucide-react'

function BlogCardSkeleton() {
    return (
        <div className="rounded-[var(--radius-lg)] bg-[var(--bg-card)]
                    border border-[var(--border)] overflow-hidden">
            <Skeleton className="h-40 w-full rounded-none" />
            <div className="p-5 space-y-3">
                <Skeleton className="h-3 w-1/4" />
                <Skeleton className="h-5 w-5/6" />
                <Skeleton className="h-3 w-full" />
            </div>
        </div>
    )
}

export default function BlogList() {
    const [query, setQuery] = useState('')
    const { data, isLoading } = useBlogPosts({ limit: 50 })
    const posts = data?.data ?? []

    const fuse = new Fuse(posts, {
        keys: ['title', 'excerpt', 'tags', 'category'],
        threshold: 0.35,
    })

    const filtered = query.trim()
        ? fuse.search(query).map((r) => r.item)
        : posts

    // Extract unique categories
    const categories = ['All', ...new Set(posts.map((p) => p.category).filter(Boolean))]
    const [activeCategory, setActiveCategory] = useState('All')

    const displayed =
        activeCategory === 'All'
            ? filtered
            : filtered.filter((p) => p.category === activeCategory)

    return (
        <div className="pt-16 min-h-screen">
            <div className="container py-16 max-w-5xl">

                {/* Header */}
                <div className="mb-14">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)]
                       hover:text-[var(--text-primary)] transition-colors mb-8 group"
                    >
                        <ArrowLeft size={14}
                            className="group-hover:-translate-x-1 transition-transform duration-200" />
                        Home
                    </Link>

                    <p className="text-[11px] font-black tracking-[0.15em] uppercase
                        text-[var(--accent)] mb-4">
                        Blog
                    </p>
                    <h1 className="text-[var(--text-primary)] mb-4">
                        Writing & thinking.
                    </h1>
                    <p className="text-[var(--text-muted)] text-base max-w-xl">
                        Technical deep-dives, project case studies, and learnings from building production systems.
                    </p>
                </div>

                {/* Search + filter row */}
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                    {/* Search */}
                    <div className="relative flex-1 max-w-sm">
                        <Search
                            size={14}
                            className="absolute left-3.5 top-1/2 -translate-y-1/2
                         text-[var(--text-muted)] pointer-events-none"
                        />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search posts..."
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm
                         bg-[var(--bg-card)] border border-[var(--border)]
                         text-[var(--text-primary)]
                         placeholder:text-[var(--text-muted)]
                         focus:outline-none focus:border-[var(--accent)]/50
                         transition-colors"
                            autoComplete="off"
                        />
                    </div>

                    {/* Category filter */}
                    {categories.length > 2 && (
                        <div className="flex items-center gap-1 p-1 rounded-xl
                            bg-[var(--bg-subtle)] border border-[var(--border)]">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold
                              transition-all duration-200 ${activeCategory === cat
                                            ? 'bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border)] shadow-sm'
                                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Posts */}
                {isLoading && (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => <BlogCardSkeleton key={i} />)}
                    </div>
                )}

                {!isLoading && displayed.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="text-[var(--text-muted)] text-sm">
                            {query ? `No posts matching "${query}"` : 'No posts yet.'}
                        </p>
                    </div>
                )}

                {!isLoading && displayed.length > 0 && (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeCategory + query}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            {displayed.map((post, i) => (
                                <motion.div
                                    key={post._id}
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Link
                                        to={`/blog/${post.slug}`}
                                        className="block group rounded-[var(--radius-lg)]
                               bg-[var(--bg-card)] border border-[var(--border)]
                               overflow-hidden h-full
                               hover:border-[var(--border-hover)]
                               hover:-translate-y-1 hover:shadow-[var(--shadow-md)]
                               transition-all duration-200"
                                    >
                                        {post.coverImage ? (
                                            <div className="h-40 overflow-hidden bg-[var(--bg-subtle)]">
                                                <img
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    className="w-full h-full object-cover
                                     group-hover:scale-105 transition-transform duration-500"
                                                    loading="lazy"
                                                />
                                            </div>
                                        ) : (
                                            <div className="h-28 bg-gradient-to-br from-[var(--accent-muted)]
                                      to-[var(--bg-subtle)] flex items-end p-4">
                                                {post.category && (
                                                    <span className="text-[10px] font-bold uppercase tracking-wider
                                           text-[var(--accent)]">
                                                        {post.category}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        <div className="p-5">
                                            <div className="flex items-center gap-3 mb-2.5">
                                                <span className="text-[11px] text-[var(--text-muted)] flex items-center gap-1">
                                                    <Clock size={10} />
                                                    {post.readTimeMinutes || readTime(post.content || '')} min
                                                </span>
                                                {post.publishedAt && (
                                                    <span className="text-[11px] text-[var(--text-muted)]">
                                                        {formatDate(post.publishedAt)}
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-sm font-bold text-[var(--text-primary)]
                                     leading-snug mb-2
                                     group-hover:text-[var(--accent)]
                                     transition-colors duration-200">
                                                {post.title}
                                            </h3>
                                            {post.excerpt && (
                                                <p className="text-xs text-[var(--text-muted)] leading-relaxed line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                            )}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                )}

                {!isLoading && displayed.length > 0 && (
                    <p className="mt-10 text-center text-[11px] text-[var(--text-muted)]">
                        {displayed.length} post{displayed.length !== 1 ? 's' : ''}
                    </p>
                )}

            </div>
        </div>
    )
}