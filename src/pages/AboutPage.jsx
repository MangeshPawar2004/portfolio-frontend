import { Link } from 'react-router-dom';
import { useSettings } from '@/hooks/useSettings';
import { useExperience } from '@/hooks/useExperience';
import { useSkills } from '@/hooks/useSkills';
import { useCertificates } from '@/hooks/useCertificates';
import { useEducation } from '@/hooks/useEducation';
import {
  Download,
  Compass,
  Bot,
  Code2,
  Cpu,
  Layers,
  Globe,
  Database,
  Terminal,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

const formatMonthYear = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
};

const formatYear = (date) => {
  if (!date) return '';
  return new Date(date).getFullYear();
};

export default function AboutPage() {
  const { data: settingsData } = useSettings();
  const settings = settingsData?.data || settingsData;

  const { data: experiencesData } = useExperience();
  const experiences = experiencesData?.data || experiencesData || [];

  const { data: skillsData } = useSkills();
  const skills = skillsData?.data || skillsData || [];

  const { data: certificatesData } = useCertificates();
  const certificates = certificatesData?.data || certificatesData || [];

  const { data: educationData } = useEducation();
  const education = educationData?.data || educationData || [];

  const iconPool = [Code2, Bot, Database, Cpu, Layers, Globe, Terminal, Compass, Sparkles];

  return (
    <main className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] antialiased selection:bg-[var(--accent)] selection:text-[var(--text-inverse)] font-sans pt-[var(--navbar-height)]">
      
      {/* HERO SECTION */}
      <section className="section border-b border-[var(--border)]/30">
        <div className="container flex flex-col items-center justify-center text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
            
            {/* Availability Badge — Centered */}
            <div className="mb-8 flex justify-center w-full">
              <div className="inline-flex items-center gap-2.5 border border-[var(--border)] bg-[var(--bg-subtle)]/70 px-4 py-1.5 label-caps text-[var(--text-muted)] rounded-none">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse shrink-0" />
                <span>{settings?.availabilityNote || 'OPEN TO AI ENGINEER AND FULL STACK DEVELOPER ROLES'}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="mb-8 font-serif text-center w-full">
              {settings?.heroTitle || 'Full Stack Developer & AI Engineer'}
            </h1>

            {/* Summary & Background */}
            <p className="body-lg prose-width mx-auto mb-10 text-[var(--text-secondary)] text-center">
              {settings?.aboutSummary}
              {settings?.aboutBackground && (
                <>
                  <span className="block mt-4" />
                  {settings.aboutBackground}
                </>
              )}
            </p>

            {/* Resume CTA */}
            {settings?.resumeUrl && (
              <div className="flex justify-center w-full">
                <a
                  href={settings.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="interactive inline-flex items-center gap-3 border border-[var(--text-primary)] px-8 py-3 label-caps hover:bg-[var(--bg-hover)]"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      {experiences.length > 0 && (
        <section className="section border-b border-[var(--border)]/30">
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-4xl mb-6 font-serif">Experience</h2>
              <p className="body-md text-[var(--text-secondary)]">
                A timeline of structural growth and creative evolution across disciplines.
              </p>
            </div>

            <div className="md:col-span-8 border-l-2 border-[var(--border)] ml-4 md:ml-0">
              {experiences.map((exp, index) => (
                <div 
                  key={exp._id || index} 
                  className="mb-14 last:mb-0 relative"
                  style={{ paddingLeft: '40px' }}
                >
                  {/* Marker dot at timeline line */}
                  <div
                    className={`absolute -left-[7px] top-1.5 w-3 h-3 border-2 border-[var(--bg-base)] ${index === 0 ? 'bg-[var(--accent)]' : 'bg-[var(--border-hover)]'}`}
                  />

                  <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 mb-2">
                    <h4 className="label-caps text-lg tracking-wider text-[var(--text-primary)] font-bold">
                      {exp.role}
                    </h4>
                    <span className="label-caps text-xs text-[var(--text-secondary)]">
                      {formatMonthYear(exp.startDate)} — {exp.isCurrent ? 'Present' : formatMonthYear(exp.endDate)}
                    </span>
                  </div>

                  <p className="body-md font-medium text-[var(--text-secondary)] mb-2">{exp.company}</p>

                  <p className="body-md text-[var(--text-muted)] max-w-2xl mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {(exp.techStack || []).map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-[var(--bg-subtle)] text-[var(--text-secondary)] text-xs border border-[var(--border)]/40 label-caps font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EDUCATION SECTION */}
      {education.length > 0 && (
        <section className="section border-b border-[var(--border)]/30">
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-4xl mb-6 font-serif">Education</h2>
              <p className="body-md text-[var(--text-secondary)]">
                Academic foundation and continuous learning.
              </p>
            </div>

            <div className="md:col-span-8 border-l-2 border-[var(--border)] ml-4 md:ml-0">
              {education.map((edu, index) => (
                <div 
                  key={edu._id || index} 
                  className="mb-14 last:mb-0 relative"
                  style={{ paddingLeft: '40px' }}
                >
                  <div className="absolute -left-[7px] top-1.5 w-3 h-3 border-2 border-[var(--bg-base)] bg-[var(--border-hover)]" />

                  <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 mb-2">
                    <h4 className="label-caps text-lg tracking-wider text-[var(--text-primary)] font-bold">
                      {edu.degree}
                    </h4>
                    <span className="label-caps text-xs text-[var(--text-secondary)]">
                      {edu.startDate ? formatYear(edu.startDate) : ''} — {edu.isCurrent ? 'Present' : edu.endDate ? formatYear(edu.endDate) : ''}
                    </span>
                  </div>

                  <p className="body-md font-medium text-[var(--text-secondary)] mb-2">{edu.institution}</p>
                  {edu.description && <p className="body-md text-[var(--text-muted)] max-w-2xl">{edu.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CORE EXPERTISE / SKILLS */}
      {skills.length > 0 && (
        <section className="section border-b border-[var(--border)]/30">
          <div className="container">
            <h2 className="text-center mb-12 font-serif">Core Expertise</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
              {skills.map((skill, index) => {
                const Icon = iconPool[index % iconPool.length];

                return (
                  <div
                    key={skill._id || index}
                    className="card p-5 group flex flex-col justify-between items-start relative overflow-hidden transition-all hover:border-[var(--accent)]"
                  >
                    <div className="absolute top-0 right-0 w-6 h-6 border-l border-b border-[var(--accent)] bg-[var(--bg-base)]/60 translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform"></div>
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="w-5 h-5 text-[var(--accent)] shrink-0 stroke-[1.75]" />
                      <h4 className="label-caps text-sm tracking-wider text-[var(--text-primary)] font-bold">
                        {skill.name}
                      </h4>
                    </div>
                    {skill.category && (
                      <span className="text-[11px] uppercase tracking-wider text-[var(--text-muted)] font-medium">
                        {skill.category}
                      </span>
                    )}
                    {skill.description && (
                      <p className="body-md text-xs text-[var(--text-muted)] mt-2 line-clamp-2">
                        {skill.description}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certificates.length > 0 && (
        <section className="section border-b border-[var(--border)]/30">
          <div className="container grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <h2 className="text-4xl mb-6 font-serif">Certifications</h2>
              <p className="body-md text-[var(--text-secondary)]">
                Recognized accomplishments and domain expertise.
              </p>
            </div>

            <div className="md:col-span-8 border-l-2 border-[var(--border)] ml-4 md:ml-0">
              {certificates.map((cert, index) => (
                <div 
                  key={cert._id || index} 
                  className="mb-10 last:mb-0 relative"
                  style={{ paddingLeft: '40px' }}
                >
                  <div className="absolute -left-[7px] top-1.5 w-3 h-3 border-2 border-[var(--bg-base)] bg-[var(--border-hover)]" />

                  <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-2 mb-1">
                    <h4 className="label-caps text-base tracking-wider text-[var(--text-primary)] font-bold">
                      {cert.title}
                    </h4>
                    <span className="label-caps text-xs text-[var(--text-secondary)]">
                      {cert.issueDate ? formatYear(cert.issueDate) : ''}
                    </span>
                  </div>

                  <p className="body-md text-sm text-[var(--text-secondary)]">{cert.issuer}</p>

                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 mt-2 label-caps text-xs text-[var(--accent)] hover:underline"
                    >
                      View Credential <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="section text-center">
        <div className="container flex flex-col items-center">
          <h2 className="mb-6 max-w-5xl font-serif">Let's build something structural.</h2>

          <p className="body-lg prose-width mb-12 text-[var(--text-secondary)]">
            Open for collaborative projects and creative direction roles.
          </p>

          <Link
            to="/contact"
            className="accent-bg text-[var(--text-inverse)] px-16 py-5 label-caps tracking-[0.2em] hover:bg-[var(--text-primary)] transition-colors"
          >
            Initiate Project
          </Link>
        </div>
      </section>
    </main>
  );
}