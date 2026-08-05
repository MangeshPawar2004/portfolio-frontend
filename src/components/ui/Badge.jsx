import { cn } from '@/lib/utils'

const variants = {
  default: 'bg-[#161616] text-[#A1A1AA] border border-[#242424]',
  accent:  'bg-[#1d3f6e] text-[#60A5FA] border border-[#1e3a5f]',
  success: 'bg-[#0d2e1f] text-[#10B981] border border-[#1a4d35]',
  warning: 'bg-[#2d1f0d] text-[#F59E0B] border border-[#4d3a1a]',
  purple:  'bg-[#2d1f3d] text-[#A78BFA] border border-[#3d2b54]',
}

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}