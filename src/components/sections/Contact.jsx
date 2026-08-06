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
      <label className="block text-xs font-semibold text-[#A1A1AA] uppercase
                         tracking-wider mb-2">
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-[#EF4444]">{error}</p>
      )}
    </div>
  )
}

const inputClass = `
  w-full px-4 py-3 rounded-xl text-sm text-[#F5F5F5]
  bg-[#111111] border border-[#242424]
  placeholder:text-[#3a3a3a]
  focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6]/30
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

      {/* 40/60 explicit layout: info sidebar | form */}
      <div className="mt-14 grid lg:grid-cols-[2fr_3fr] gap-12">

        {/* ── Left sidebar — contact info ─────────────────── */}
        <FadeIn direction="right" className="space-y-4">

          {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
            <div key={label}
              className="flex items-start gap-4 p-5 rounded-xl bg-[#111111]
                         border border-[#242424] hover:border-[#3a3a3a] transition-colors">
              <div className="w-9 h-9 rounded-lg bg-[#1d3f6e] flex items-center
                              justify-center flex-shrink-0">
                <Icon size={15} className="text-[#3B82F6]" />
              </div>
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider
                               text-[#71717A] mb-0.5">
                  {label}
                </p>
                {href ? (
                  <a href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-[#A1A1AA] hover:text-[#3B82F6] transition-colors break-all">
                    {value}
                  </a>
                ) : (
                  <p className="text-sm text-[#A1A1AA]">{value}</p>
                )}
              </div>
            </div>
          ))}

          {/* Availability note */}
          <div className="p-5 rounded-xl bg-[#0d2e1f] border border-[#1a4d35]">
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full
                                 rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
              </span>
              <span className="text-xs font-semibold text-[#10B981]">Available</span>
            </div>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Open to AI Engineer and Full Stack Developer roles.
              Response within 24 hours.
            </p>
          </div>
        </FadeIn>

        {/* ── Right — contact form ─────────────────────────── */}
        <FadeIn direction="left" delay={0.1}>
          <div className="p-10 rounded-2xl bg-[#111111] border border-[#242424]">

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-12 gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#0d2e1f] border border-[#1a4d35]
                                flex items-center justify-center">
                  <Send size={24} className="text-[#10B981]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#F5F5F5] mb-2">
                    Message sent!
                  </h3>
                  <p className="text-sm text-[#71717A]">
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
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5
                             rounded-xl text-sm font-semibold
                             bg-[#3B82F6] text-white hover:bg-[#2563EB]
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

                <p className="text-center text-xs text-[#3a3a3a]">
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