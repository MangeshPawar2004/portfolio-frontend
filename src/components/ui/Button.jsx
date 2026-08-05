import { cn } from '@/lib/utils'

const variants = {
  primary:   'bg-[#3B82F6] text-white hover:bg-[#2563EB]',
  secondary: 'bg-[#161616] text-[#F5F5F5] border border-[#242424] hover:border-[#3a3a3a] hover:bg-[#1a1a1a]',
  ghost:     'text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-[#161616]',
  outline:   'border border-[#3B82F6] text-[#3B82F6] hover:bg-[#1d3f6e]',
}

const sizes = {
  sm:  'px-3 py-1.5 text-sm',
  md:  'px-5 py-2.5 text-sm',
  lg:  'px-7 py-3 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  as: Tag = 'button',
  ...props
}) {
  return (
    <Tag
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-all duration-200 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}