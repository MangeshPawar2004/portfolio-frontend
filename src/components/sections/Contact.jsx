import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, Mail, ExternalLink, MapPin } from 'lucide-react'
import { useContact } from '@/hooks/useContact'
import { SOCIAL_LINKS } from '@/constants'
import Section from '@/components/layout/Section'
import SectionHeading from '@/components/ui/SectionHeading'
import FadeIn from '@/components/animations/FadeIn'

// ── Zod schema ─────────────────────────────────────────────────
const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name too long'),
  email: z
    .string()
    .email('Enter a valid email address'),
  subject: z
    .string()
    .min(3, 'Subject must be at least 3 characters')
    .max(120, 'Subject too long'),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(2000, 'Message too long (max 2000 characters)'),
})

// ── Info sidebar ───────────────────────────────────────────────
const CONTACT_INFO = [
  {
    icon: Mail,
    label: 'Email',
    value: 'mangesh@example.com',
    href: 'mailto:mangesh@example.com',
  },
  {
    icon: ExternalLink,
    label: 'GitHub',
    value: 'github.com/MangeshPawar2004',
    href: SOCIAL_LINKS.github,
  },
  {
    icon: ExternalLink,
    label: 'LinkedIn',
    value: 'linkedin.com/in/mangesh-pawar',
    href: SOCIAL_LINKS.linkedin,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Navi Mumbai, India (Open to remote)',
    href: null,
  },
]

// ── Input component ───────────────────────────────────────────
function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-xs font-bold text-[var(--text-muted)] uppercase
                         tracking-[0.12em] mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-[var(--error)] font-semibold">{error}</p>
      )}
    </div>
  )
}

const inputClass = `
  w-full px-4 py-3 text-sm text-[var(--text-primary)]
  bg-[var(--bg-base)] border-2 border-[var(--border)]
  placeholder:text-[var(--text-muted)]
  focus:outline-none focus:border-[var(--accent)]
  transition-colors duration-200
`

// ── Main component ────────────────────────────────────────────
export default function Contact() {
  const { mutate: submitContact, isPending, isSuccess } = useContact()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = (data) => {
    submitContact(data, {
      onSuccess: () => reset(),
    })
  }

  return (
    <Section id="contact">

      <SectionHeading
        eyebrow="Contact"
        title="Let's work together."
        subtitle="Open to AI Engineer and Full Stack Developer roles. Also happy to chat about interesting projects."
      />

      {/* 40/60 layout: info sidebar | form */}
      <div className="mt-14 grid lg:grid-cols-[2fr_3fr] gap-12">

        {/* ── Left sidebar — contact info ─────────────────── */}
        <FadeIn direction="right" className="space-y-4">

          {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
            <div key={label}
              className="flex items-start gap-4 p-5 bg-[var(--bg-card)]
                         border-2 border-[var(--border)]
                         hover:border-[var(--text-primary)] transition-colors">
              <div className="w-9 h-9 flex items-center
                              justify-center flex-shrink-0
                              bg-[var(--accent-light)] border-2 border-[var(--accent-muted)]">
                <Icon size={15} className="text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.12em]
                               text-[var(--text-muted)] mb-0.5">
                  {label}
                </p>
                {href ? (
                  <a href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-[var(--text-secondary)]
                               hover:text-[var(--accent)] transition-colors break-all">
                    {value}
                  </a>
                ) : (
                  <p className="text-sm text-[var(--text-secondary)]">{value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Availability note */}
          <div className="p-5 bg-[var(--success-muted)] border-2 border-[var(--success)]">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="pulse-ring absolute inline-flex h-full w-full
                                 bg-[var(--success)]" style={{ borderRadius: '50%' }} />
                <span className="relative inline-flex h-2 w-2 bg-[var(--success)]"
                      style={{ borderRadius: '50%' }} />
              </span>
              <span className="text-xs font-bold text-[var(--success)]
                               tracking-wider uppercase">Available</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Open to AI Engineer and Full Stack Developer roles.
              Response within 24 hours.
            </p>
          </div>
        </FadeIn>

        {/* ── Right — contact form ─────────────────────────── */}
        <FadeIn direction="left" delay={0.1}>
          <div className="p-10 bg-[var(--bg-card)] border-2 border-[var(--border)]">

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-12 gap-4"
              >
                <div className="w-16 h-16 bg-[var(--success-muted)] border-2 border-[var(--success)]
                                flex items-center justify-center">
                  <Send size={24} className="text-[var(--success)]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                    Message sent!
                  </h3>
                  <p className="text-sm text-[var(--text-muted)]">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Name" error={errors.name?.message}>
                    <input
                      {...register('name')}
                      placeholder="Your name"
                      className={inputClass}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email" error={errors.email?.message}>
                    <input
                      {...register('email')}
                      type="email"
                      placeholder="your@email.com"
                      className={inputClass}
                      autoComplete="email"
                    />
                  </Field>
                </div>

                <Field label="Subject" error={errors.subject?.message}>
                  <input
                    {...register('subject')}
                    placeholder="What's this about?"
                    className={inputClass}
                  />
                </Field>

                <Field label="Message" error={errors.message?.message}>
                  <textarea
                    {...register('message')}
                    rows={6}
                    placeholder="Tell me about the role, project, or just say hi..."
                    className={`${inputClass} resize-none`}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4
                             text-sm font-bold tracking-wider uppercase
                             bg-[var(--accent)] text-white border-2 border-[var(--accent)]
                             hover:bg-[var(--accent-hover)] hover:border-[var(--accent-hover)]
                             disabled:opacity-60 disabled:cursor-not-allowed
                             transition-all duration-200"
                >
                  {isPending ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10"
                                stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={14} />
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-[var(--text-muted)]">
                  No spam, no newsletters. Just a direct reply from me.
                </p>

              </form>
            )}

          </div>
        </FadeIn>
      </div>

    </Section>
  )
}