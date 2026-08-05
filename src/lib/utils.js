import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Merge Tailwind classes safely
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Format date: "Aug 2024" or "Present"
export function formatDate(dateStr, fallback = 'Present') {
  if (!dateStr) return fallback
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

// Truncate text
export function truncate(str, length = 120) {
  if (!str) return ''
  return str.length > length ? `${str.slice(0, length)}…` : str
}

// Get initials from name
export function getInitials(name = '') {
  return name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

// Calculate read time
export function readTime(content = '') {
  const wpm = 200
  const words = content.split(/\s+/).length
  return Math.max(1, Math.round(words / wpm))
}

// Stagger delay for animation
export function stagger(index, base = 0.1) {
  return index * base
}