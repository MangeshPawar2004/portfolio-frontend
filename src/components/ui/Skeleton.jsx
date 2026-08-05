import { cn } from '@/lib/utils'

export default function Skeleton({ className }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-[#161616]',
        className
      )}
      aria-hidden="true"
    />
  )
}

export function ProjectCardSkeleton() {
  return (
    <div className="card p-6 space-y-4">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
    </div>
  )
}