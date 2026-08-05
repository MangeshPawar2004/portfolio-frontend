import { motion } from 'framer-motion'
import { ArrowDown, ExternalLink, Briefcase, Mail, MapPin, Zap } from 'lucide-react'
import { useSettings } from '@/hooks/useSettings'
import { SOCIAL_LINKS } from '@/constants'
import Button from '@/components/ui/Button'

// Subtle animated gradient background — no particles, no R3F
function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Primary glow */}
      <div
        className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      {/* Secondary glow */}
      <div
        className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  )
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } },
}

export default function Hero() {
  const { data: settings, isLoading } = useSettings()

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      <HeroBackground />

      <div className="container relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >

          {/* Availability badge */}
          <motion.div variants={itemVariants} className="mb-6">
            {settings?.availableForWork ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                               bg-[#0d2e1f] border border-[#1a4d35] text-[#10B981] text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full
                                   bg-[#10B981] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]" />
                </span>
                {settings.availabilityNote || 'Open to new opportunities'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
                               bg-[#161616] border border-[#242424] text-[#71717A] text-xs font-medium">
                <MapPin size={11} />
                Navi Mumbai, India
              </span>
            )}
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants}>
            <h1 className="mb-3 font-bold tracking-tight">
              <span className="text-[#F5F5F5]">
                {isLoading ? 'Loading...' : (settings?.heroName || 'Mangesh Pawar')}
              </span>
            </h1>
          </motion.div>

          {/* Title with accent */}
          <motion.div variants={itemVariants} className="mb-5">
            <p className="text-2xl sm:text-3xl font-semibold">
              <span className="text-[#A1A1AA]">I build </span>
              <span className="accent-gradient">
                {settings?.heroTitle || 'scalable full-stack apps'}
              </span>
              <span className="text-[#A1A1AA]"> and AI pipelines.</span>
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-lg text-[#71717A] max-w-2xl leading-relaxed">
              {settings?.heroTagline ||
                'Associate Full Stack Developer at Cogitate. React, Node.js, .NET, Azure, LangChain. Building production systems that scale.'}
            </p>
          </motion.div>

          {/* CTA buttons */}
       <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 mb-10">
  <Button as="a" href="#projects" size="lg" className="w-full sm:w-auto justify-center">
    {settings?.heroCTAPrimary || 'View Projects'}
    <ArrowDown size={16} />
  </Button>
  <Button as="a" href="#contact" variant="secondary" size="lg" className="w-full sm:w-auto justify-center">
    {settings?.heroCTASecondary || 'Contact Me'}
  </Button>
</motion.div>

          {/* Social row */}
          <motion.div variants={itemVariants}
            className="hidden sm:flex items-center gap-4 text-[var(--text-muted)] text-sm">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 hover:text-[#F5F5F5] transition-colors">
              <ExternalLink size={15} /> GitHub
            </a>
            <span className="w-px h-4 bg-[#242424]" />
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-1.5 hover:text-[#F5F5F5] transition-colors">
              <Briefcase size={15} /> LinkedIn
            </a>
            <span className="w-px h-4 bg-[#242424]" />
            <a href={SOCIAL_LINKS.email}
               className="flex items-center gap-1.5 hover:text-[#F5F5F5] transition-colors">
              <Mail size={15} /> Email
            </a>
          </motion.div>

        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs text-[#71717A] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-[#71717A]" />
        </motion.div>
      </motion.div>
    </section>
  )
}