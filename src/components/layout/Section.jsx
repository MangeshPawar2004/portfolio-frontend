import { cn } from '@/lib/utils'

/**
 * Section — shared layout wrapper for every page section.
 *
 * Provides:
 *  - Consistent vertical spacing (.section → clamp 6rem–9rem)
 *  - Shared max-width container (1280px) with responsive horizontal padding
 *  - Optional top border divider (2px solid)
 *  - id passthrough for anchor navigation
 *
 * Usage:
 *  <Section id="about">
 *    ...content...
 *  </Section>
 *
 *  <Section id="hero" noBorder noContainer className="relative overflow-hidden">
 *    <div className="container">...custom inner layout...</div>
 *  </Section>
 */
export default function Section({
  id,
  children,
  className,        // applied to the <section> element
  innerClassName,   // applied to the inner .container div
  noBorder = false, // skip the top divider line
  noContainer = false, // skip the inner .container (e.g. Hero handles its own)
}) {
  return (
    <section
      id={id}
      className={cn(
        'section',
        !noBorder && 'border-t-2 border-[var(--border)]',
        className
      )}
    >
      {noContainer ? (
        children
      ) : (
        <div className={cn('container', innerClassName)}>
          {children}
        </div>
      )}
    </section>
  )
}
