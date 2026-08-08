import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Download, Compass, Bot, Code2, ArrowRight } from 'lucide-react'
import { useSettings } from '@/hooks/useSettings'
import { useExperience } from '@/hooks/useExperience'
import { useEducation } from '@/hooks/useEducation'
import { useCertificates } from '@/hooks/useCertificates'
import { useSkills } from '@/hooks/useSkills'

/* ── Fallback Experience ── */
const FALLBACK_EXPERIENCE = [
  {
    _id: 'exp-1',
    role: 'Associate Full Stack Developer',
    company: 'Cogitate',
    period: '2023 — PRESENT',
    description: 'Building and maintaining the DigitalEdge Billing (DEB) platform for insurance carriers using Node.js, Azure Functions, SQL Server, and React.',
    skills: ['React', 'Node.js', '.NET', 'Azure', 'SQL Server'],
  },
  {
    _id: 'exp-2',
    role: 'Software Developer Intern',
    company: 'Cogitate',
    period: '2023 — 2024',
    description: 'Interned as a full stack developer on the DEB insurance billing platform. Built API endpoints and interactive UI interfaces.',
    skills: ['JavaScript', 'Express.js', 'React', 'Git'],
  },
  {
    _id: 'exp-3',
    role: 'Full-Stack & AI Developer',
    company: 'Autonomous Projects',
    period: '2022 — 2023',
    description: 'Built robust backend architectures and highly interactive frontend experiences, bridging the gap between engineering feasibility and design intent.',
    skills: ['Python', 'LangChain', 'FAISS', 'FastAPI'],
  },
]

/* ── Fallback Education ── */
const FALLBACK_EDUCATION = [
  {
    _id: 'edu-1',
    degree: 'B.E. in Artificial Intelligence & Data Science',
    institution: 'DY Patil University',
    years: '2020 — 2024',
    grade: 'CGPA 8.9 / 10',
  },
]

/* ── Fallback Certificates ── */
const FALLBACK_CERTIFICATES = [
  {
    _id: 'cert-1',
    title: 'Azure Developer Associate (AZ-204)',
    issuer: 'Microsoft',
    year: '2024',
  },
  {
    _id: 'cert-2',
    title: 'Generative AI & LangChain LLM Architectures',
    issuer: 'DeepLearning.AI',
    year: '2023',
  },
]

export default function AboutPage() {
  const { data: settingsData } = useSettings()
  const { data: expData } = useExperience()
  const { data: eduData } = useEducation()
  const { data: certData } = useCertificates()
  const { data: skillsData } = useSkills()

  const settings = settingsData?.data ?? settingsData
  const rawExperience = expData?.data ?? expData ?? []
  const rawEducation = eduData?.data ?? eduData ?? []
  const rawCertificates = certData?.data ?? certData ?? []

  // Dynamic experience mapping with fallback
  const experienceList = rawExperience.length > 0
    ? rawExperience.map((item) => ({
        _id: item._id,
        role: item.role,
        company: item.company,
        period: `${item.startDate ? item.startDate.split('-')[0] : '2023'} — ${item.current ? 'PRESENT' : item.endDate ? item.endDate.split('-')[0] : ''}`,
        description: item.description || item.responsibilities?.join(' ') || '',
        skills: (item.skills && item.skills.length > 0) ? item.skills : ['React', 'Node.js', 'Azure', '.NET'],
      }))
    : FALLBACK_EXPERIENCE

  // Dynamic education mapping with fallback
  const educationList = rawEducation.length > 0
    ? rawEducation.map((item) => ({
        _id: item._id,
        degree: `${item.degree}${item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : ''}`,
        institution: item.institution,
        years: `${item.startYear || '2020'} — ${item.isOngoing ? 'PRESENT' : item.endYear || '2024'}`,
        grade: item.grade ? `Grade: ${item.grade}${item.gradeScale ? ` / ${item.gradeScale}` : ''}` : '',
      }))
    : FALLBACK_EDUCATION

  // Dynamic certificate mapping with fallback
  const certificateList = rawCertificates.length > 0
    ? rawCertificates.map((item) => ({
        _id: item._id,
        title: item.title,
        issuer: item.issuer,
        year: item.issueDate ? new Date(item.issueDate).getFullYear().toString() : '2024',
      }))
    : FALLBACK_CERTIFICATES

  return (
    <div className="min-h-screen bg-[#fbf9f9] text-[#1b1c1c] pt-28 md:pt-36 pb-20">

      {/* Font loading for Playfair Display & DM Serif Display */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Playfair+Display:wght@600;700;900&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* ── 1. Hero Section ── */}
      <section className="min-h-[50vh] flex flex-col items-center justify-center text-center px-6 md:px-12 py-16 border-b border-[#dbdad9]/50 max-w-[1280px] mx-auto" style={{ paddingTop: '80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl"
        >
          {/* Availability pill badge */}
          <div className="flex items-center justify-center gap-2.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#ff5722] animate-pulse" />
            <span className="inline-block px-3 py-1 border border-[#5f5e59] text-[#5f5e59] font-bold text-xs tracking-widest uppercase">
              {settings?.availableForWork
                ? (settings.availabilityNote || 'OPEN TO AI ENGINEER AND FULL STACK DEVELOPER ROLES')
                : 'OPEN TO AI ENGINEER AND FULL STACK DEVELOPER ROLES'}
            </span>
          </div>

          {/* Main Headline */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#1b1c1c] mb-6 leading-snug tracking-tight max-w-3xl mx-auto"
            style={{ fontFamily: "'DM Serif Display', 'Playfair Display', Georgia, serif" }}
          >
            Architecting Digital Experiences Through Intentional Design
          </h1>

          {/* About Summary Body */}
          <p className="text-base md:text-lg text-[#5b4039] max-w-2xl mx-auto mb-8 leading-relaxed">
            {settings?.aboutSummary ||
              'Associate Full Stack Developer at Cogitate with hands-on experience in React, Node.js, .NET, Azure, and AI/ML integrations.'}
          </p>

          {/* Background Detail */}
          {settings?.aboutBackground && (
            <p className="text-xs md:text-sm text-[#5f5e59] max-w-xl mx-auto mb-8 leading-relaxed">
              {settings.aboutBackground}
            </p>
          )}

          {/* Download Resume Action Button */}
          <div className="flex items-center justify-center">
            <a
              href={settings?.resumeUrl || '/resume.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center gap-2.5 bg-[#fbf9f9] text-[#1b1c1c] hover:bg-[#1b1c1c] hover:text-white px-7 py-3.5 border border-[#1b1c1c] transition-all text-xs font-bold uppercase tracking-widest"
            >
              <Download size={16} />
              Download Resume
            </a>
          </div>
        </motion.div>
      </section>

      {/* ── 2. My Journey / Experience Section ── */}
      <section className="py-20 px-6 md:px-12 max-w-[1280px] mx-auto border-b border-[#dbdad9]/50">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          <div className="md:col-span-4">
            <h3
              className="text-2xl md:text-3xl font-normal text-[#1b1c1c] mb-4"
              style={{ fontFamily: "'DM Serif Display', 'Playfair Display', Georgia, serif" }}
            >
              Experience
            </h3>
            <p className="text-sm text-[#5b4039] leading-relaxed max-w-xs">
              A timeline of structural growth and creative evolution across disciplines.
            </p>
          </div>

          <div className="md:col-span-8 relative border-l border-[#dbdad9] pl-6 md:pl-8 space-y-10">
            {experienceList.map((exp, idx) => (
              <motion.div
                key={exp._id || idx}
                initial={{ opacity: 0, x: 15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative"
              >
                {/* Custom Timeline Dot */}
                <div
                  className={`absolute -left-[29px] md:-left-[37px] top-1.5 w-2.5 h-2.5 ${
                    idx === 0 ? 'bg-[#ff5722]' : 'bg-[#dbdad9]'
                  }`}
                />

                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1 gap-1">
                  <h4 className="text-base md:text-lg font-bold text-[#1b1c1c] tracking-wide uppercase">
                    {exp.role}
                  </h4>
                  <span className="text-xs font-semibold text-[#5b4039] uppercase tracking-wider">
                    {exp.period}
                  </span>
                </div>

                <p className="text-xs md:text-sm font-medium text-[#5b4039] mb-2">
                  {exp.company}
                </p>

                <p className="text-xs md:text-sm text-[#5f5e59] max-w-2xl mb-4 leading-relaxed">
                  {exp.description}
                </p>

                {exp.skills && exp.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-[#f5f3f3] text-[#5b4039] text-[11px] font-semibold border border-[#dbdad9]/50 uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Education & Academic Growth Section ── */}
      {educationList.length > 0 && (
        <section className="py-20 px-6 md:px-12 max-w-[1280px] mx-auto border-b border-[#dbdad9]/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
            <div className="md:col-span-4">
              <h3
                className="text-2xl md:text-3xl font-normal text-[#1b1c1c] mb-4"
                style={{ fontFamily: "'DM Serif Display', 'Playfair Display', Georgia, serif" }}
              >
                Education & Academic Growth
              </h3>
            </div>

            <div className="md:col-span-8 relative border-l border-[#dbdad9] pl-6 md:pl-8 space-y-8">
              {educationList.map((edu, idx) => (
                <motion.div
                  key={edu._id || idx}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[29px] md:-left-[37px] top-1.5 w-2.5 h-2.5 bg-[#dbdad9]" />

                  <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-1 gap-1">
                    <h4 className="text-base md:text-lg font-bold text-[#1b1c1c] tracking-wide uppercase">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-semibold text-[#5b4039] uppercase tracking-wider">
                      {edu.years}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm font-medium text-[#5b4039] mb-1">
                    {edu.institution}
                  </p>

                  {edu.grade && (
                    <p className="text-xs md:text-sm text-[#5f5e59]">
                      {edu.grade}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 4. Core Expertise Section ── */}
      <section className="py-20 px-6 md:px-12 max-w-[1280px] mx-auto border-b border-[#dbdad9]/50">
        <h3
          className="text-2xl md:text-3xl font-normal text-[#1b1c1c] mb-12 text-center"
          style={{ fontFamily: "'DM Serif Display', 'Playfair Display', Georgia, serif" }}
        >
          Core Expertise
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="border border-[#5f5e59]/20 p-8 md:p-10 hover:bg-[#f5f3f3] transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-6 h-6 border-l border-b border-[#ff5722] bg-[#ff5722]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <Compass className="w-8 h-8 text-[#ff5722] mb-6" strokeWidth={1.8} />
            <h4 className="text-base md:text-lg font-bold text-[#1b1c1c] mb-3 uppercase tracking-wide">
              UI/UX Architecture
            </h4>
            <p className="text-xs md:text-sm text-[#5f5e59] leading-relaxed">
              Designing scalable, intuitive interfaces built on robust structural foundations and clear typographic hierarchies.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="border border-[#5f5e59]/20 p-8 md:p-10 hover:bg-[#f5f3f3] transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-6 h-6 border-l border-b border-[#ff5722] bg-[#ff5722]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <Bot className="w-8 h-8 text-[#ff5722] mb-6" strokeWidth={1.8} />
            <h4 className="text-base md:text-lg font-bold text-[#1b1c1c] mb-3 uppercase tracking-wide">
              AI & Machine Learning
            </h4>
            <p className="text-xs md:text-sm text-[#5f5e59] leading-relaxed">
              Integrating production LLM workflows, LangChain pipelines, FAISS vector search, and intelligent automation systems.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="border border-[#5f5e59]/20 p-8 md:p-10 hover:bg-[#f5f3f3] transition-colors group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-6 h-6 border-l border-b border-[#ff5722] bg-[#ff5722]/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <Code2 className="w-8 h-8 text-[#ff5722] mb-6" strokeWidth={1.8} />
            <h4 className="text-base md:text-lg font-bold text-[#1b1c1c] mb-3 uppercase tracking-wide">
              Full-Stack Execution
            </h4>
            <p className="text-xs md:text-sm text-[#5f5e59] leading-relaxed">
              Transforming Figma blueprints into production-ready code with exact 1:1 fidelity and optimal performance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── 5. Certifications & Recognition Section ── */}
      {certificateList.length > 0 && (
        <section className="py-20 px-6 md:px-12 max-w-[1280px] mx-auto border-b border-[#dbdad9]/50">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
            <div className="md:col-span-4">
              <h3
                className="text-2xl md:text-3xl font-normal text-[#1b1c1c] mb-4"
                style={{ fontFamily: "'DM Serif Display', 'Playfair Display', Georgia, serif" }}
              >
                Certifications & Recognition
              </h3>
            </div>

            <div className="md:col-span-8 relative border-l border-[#dbdad9] pl-6 md:pl-8 space-y-6">
              {certificateList.map((cert, idx) => (
                <motion.div
                  key={cert._id || idx}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[29px] md:-left-[37px] top-1.5 w-2.5 h-2.5 bg-[#dbdad9]" />

                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1">
                    <h4 className="text-base md:text-lg font-bold text-[#1b1c1c] tracking-wide uppercase">
                      {cert.title}
                    </h4>
                    <span className="text-xs font-semibold text-[#5b4039] uppercase tracking-wider">
                      {cert.year}
                    </span>
                  </div>

                  <p className="text-xs md:text-sm font-medium text-[#5b4039]">
                    {cert.issuer}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Call To Action Section ── */}
      <section className="py-24 px-6 md:px-12 bg-[#fbf9f9] flex flex-col items-center justify-center text-center border-b border-[#dbdad9]/50 min-h-[350px]">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#1b1c1c] mb-4"
          style={{ fontFamily: "'DM Serif Display', 'Playfair Display', Georgia, serif" }}
        >
          Let's build something structural.
        </h2>

        <p className="text-sm md:text-base text-[#5b4039] mb-8 max-w-xl">
          Open for collaborative projects and creative direction roles.
        </p>

        <Link
          to="/contact"
          className="inline-flex bg-[#ff5722] text-white hover:bg-[#1b1c1c] px-10 py-4 font-semibold text-xs md:text-sm uppercase tracking-wider transition-colors border border-[#ff5722] hover:border-[#1b1c1c] items-center justify-center gap-2"
        >
          Initiate Project
          <ArrowRight size={18} />
        </Link>
      </section>

    </div>
  )
}
