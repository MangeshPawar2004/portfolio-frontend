import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  ChevronDown,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import { useExperience } from "@/hooks/useExperience";
import { useEducation } from "@/hooks/useEducation";
import { useCertificates } from "@/hooks/useCertificates";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Skeleton from "@/components/ui/Skeleton";
import SectionReveal from "@/components/animations/SectionReveal";
import { formatDate } from "@/lib/utils";

// ── Employment type badge variant ──────────────────────────────
const EMP_TYPE_VARIANT = {
  "full-time": "success",
  internship: "accent",
  freelance: "purple",
  contract: "warning",
  "part-time": "default",
};

// ── Tab config ─────────────────────────────────────────────────
const TABS = [
  { key: "experience", label: "Experience", icon: Briefcase },
  { key: "education", label: "Education", icon: GraduationCap },
  { key: "certificates", label: "Awards", icon: Award },
];

// ── Duration calculator ────────────────────────────────────────
function getDuration(startDate, endDate, isCurrent) {
  if (!startDate) return null;
  const start = new Date(startDate);
  const end = isCurrent ? new Date() : endDate ? new Date(endDate) : new Date();
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  if (months < 1) return "< 1 mo";
  if (months < 12) return `${months} mo`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem > 0 ? `${years}y ${rem}mo` : `${years}y`;
}

// ── Timeline dot — orange, square ──────────────────────────────
function TimelineDot({ isCurrent }) {
  return (
    <div className="relative flex items-center justify-center flex-shrink-0 mt-1.5">
      {isCurrent ? (
        <span className="relative flex h-3.5 w-3.5">
          <span className="pulse-ring absolute inline-flex h-full w-full bg-[var(--accent)]" />
          <span className="relative inline-flex h-3.5 w-3.5 bg-[var(--accent)]" />
        </span>
      ) : (
        <div className="w-3 h-3 border-2 border-[var(--accent)] bg-[var(--bg-base)]" />
      )}
    </div>
  );
}

// ── Experience Item ────────────────────────────────────────────
function ExperienceItem({ item, index }) {
  const [expanded, setExpanded] = useState(index === 0);

  const hasDetails =
    item.responsibilities?.length > 0 ||
    item.achievements?.length > 0 ||
    item.techStack?.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="flex gap-5"
    >
      {/* Timeline track */}
      <div className="flex flex-col items-center">
        <TimelineDot isCurrent={item.isCurrent} />
        <div
          className="w-[2px] flex-1 mt-3"
          style={{
            background:
              "linear-gradient(to bottom, var(--border-hover), transparent)",
          }}
        />
      </div>

      {/* Card */}
      <div className="pb-8 w-full min-w-0">
        <div
          className={`card p-5 transition-all duration-200 ${
            hasDetails
              ? "cursor-pointer hover:border-[var(--text-primary)]"
              : ""
          }`}
          onClick={() => hasDetails && setExpanded((e) => !e)}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              {/* Role */}
              <h3 className="text-base font-semibold text-[var(--text-primary)] leading-snug mb-1">
                {item.role}
              </h3>

              {/* Company */}
              <div className="flex items-center gap-2 flex-wrap">
                {item.companyUrl ? (
                  <a
                    href={item.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]
                               inline-flex items-center gap-1 transition-colors"
                  >
                    {item.company}
                    <ExternalLink size={11} />
                  </a>
                ) : (
                  <span className="text-sm font-medium text-[var(--text-secondary)]">
                    {item.company}
                  </span>
                )}

                {item.employmentType && (
                  <Badge
                    variant={EMP_TYPE_VARIANT[item.employmentType] || "default"}
                  >
                    {item.employmentType}
                  </Badge>
                )}

                {item.isCurrent && <Badge variant="success">Current</Badge>}
              </div>
            </div>

            {/* Expand toggle */}
            {hasDetails && (
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[var(--text-muted)] flex-shrink-0 mt-0.5"
              >
                <ChevronDown size={16} />
              </motion.div>
            )}
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mt-3 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formatDate(item.startDate)} —{" "}
              {item.isCurrent ? "Present" : formatDate(item.endDate)}
            </span>

            {item.startDate && (
              <span className="text-[var(--accent)] font-bold">
                {getDuration(item.startDate, item.endDate, item.isCurrent)}
              </span>
            )}

            {item.location && (
              <span className="flex items-center gap-1">
                <MapPin size={11} />
                {item.location}
                {item.locationType && (
                  <span className="capitalize opacity-70">
                    · {item.locationType}
                  </span>
                )}
              </span>
            )}
          </div>

          {/* Description — always visible */}
          {item.description && (
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-3">
              {item.description}
            </p>
          )}

          {/* Expandable details */}
          <AnimatePresence initial={false}>
            {expanded && hasDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t-2 border-[var(--border)] space-y-4">
                  {/* Responsibilities */}
                  {item.responsibilities?.length > 0 && (
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.12em]
                                   text-[var(--text-muted)] mb-2"
                      >
                        Responsibilities
                      </p>
                      <ul className="space-y-1.5">
                        {item.responsibilities.map((r, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                          >
                            <span className="text-[var(--accent)] mt-1.5 flex-shrink-0 font-bold">
                              ›
                            </span>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Achievements */}
                  {item.achievements?.length > 0 && (
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.12em]
                                   text-[var(--text-muted)] mb-2"
                      >
                        Achievements
                      </p>
                      <ul className="space-y-1.5">
                        {item.achievements.map((a, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-[var(--success)]"
                          >
                            <span className="mt-1.5 flex-shrink-0">✦</span>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack */}
                  {item.techStack?.length > 0 && (
                    <div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.12em]
                                   text-[var(--text-muted)] mb-2"
                      >
                        Stack
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.techStack.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 text-xs font-mono font-semibold
                                       bg-[var(--bg-subtle)] text-[var(--text-secondary)]
                                       border-2 border-[var(--border)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ── Education Item ─────────────────────────────────────────────
function EducationItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="flex gap-5"
    >
      <div className="flex flex-col items-center">
        <TimelineDot isCurrent={item.isOngoing} />
        <div className="w-[2px] flex-1 bg-[var(--border)] mt-3" />
      </div>

      <div className="pb-8 w-full min-w-0">
        <div className="card p-5">
          {/* Degree */}
          <h3 className="text-base font-semibold text-[var(--text-primary)] mb-1 leading-snug">
            {item.degree}
            {item.fieldOfStudy && (
              <span className="text-[var(--text-muted)] font-normal">
                {" "}
                in {item.fieldOfStudy}
              </span>
            )}
          </h3>

          {/* Institution */}
          {item.institutionUrl ? (
            <a
              href={item.institutionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]
                         inline-flex items-center gap-1 transition-colors"
            >
              {item.institution}
              <ExternalLink size={11} />
            </a>
          ) : (
            <p className="text-sm font-medium text-[var(--text-secondary)]">
              {item.institution}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {item.startYear} —{" "}
              {item.isOngoing ? "Ongoing" : (item.endYear ?? "—")}
            </span>
            {item.grade && (
              <span className="text-[var(--success)] font-bold">
                {item.grade}
                {item.gradeScale && ` / ${item.gradeScale}`}
              </span>
            )}
          </div>

          {/* Description */}
          {item.description && (
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-3">
              {item.description}
            </p>
          )}

          {/* Relevant courses */}
          {item.relevantCourses?.length > 0 && (
            <div className="mt-4 pt-3 border-t-2 border-[var(--border)]">
              <p
                className="text-[10px] font-bold uppercase tracking-[0.12em]
                           text-[var(--text-muted)] mb-2"
              >
                Relevant Courses
              </p>
              <div className="flex flex-wrap gap-1.5">
                {item.relevantCourses.map((c) => (
                  <span
                    key={c}
                    className="px-2 py-0.5 text-xs bg-[var(--bg-subtle)]
                               text-[var(--text-secondary)] border-2 border-[var(--border)]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Certificate Item ───────────────────────────────────────────
const CERT_ICONS = {
  certification: '🏅', award: '🏆', hackathon: '⚡',
  publication: '📝', recognition: '✨', other: '🎖️',
};

function CertificateItem({ item, index }) {
  const icon = CERT_ICONS[item.category] || CERT_ICONS.other;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="card p-4 group hover:border-[var(--text-primary)] transition-all"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div
          className="w-10 h-10 flex items-center justify-center text-lg flex-shrink-0
                     bg-[var(--accent-light)] border-2 border-[var(--accent-muted)]"
        >
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt=""
              className="w-6 h-6 object-contain"
            />
          ) : (
            icon
          )}
        </div>

        <div className="min-w-0 flex-1">
          {/* Title */}
          <h4 className="text-sm font-semibold text-[var(--text-primary)] leading-snug mb-0.5">
            {item.title}
          </h4>

          {/* Issuer */}
          <p className="text-xs text-[var(--text-muted)]">{item.issuer}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {item.issueDate && (
              <span className="text-[10px] text-[var(--text-muted)]">
                {formatDate(item.issueDate)}
                {item.hasExpiry &&
                  item.expiryDate &&
                  ` → ${formatDate(item.expiryDate)}`}
              </span>
            )}
            {item.credentialId && (
              <span className="text-[10px] font-mono text-[var(--text-muted)] opacity-70">
                #{item.credentialId}
              </span>
            )}
          </div>

          {/* Skills */}
          {item.skills?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {item.skills.map((s) => (
                <span
                  key={s}
                  className="px-1.5 py-0.5 text-[10px]
                             bg-[var(--bg-subtle)] text-[var(--text-muted)]
                             border border-[var(--border)]"
                >
                  {s}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* External link */}
        {item.credentialUrl && (
          <a
            href={item.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors
                       opacity-0 group-hover:opacity-100 flex-shrink-0"
            aria-label="View credential"
          >
            <ExternalLink size={13} />
          </a>
        )}
      </div>
    </motion.div>
  );
}

// ── Timeline skeleton ──────────────────────────────────────────
function TimelineSkeleton() {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex gap-5">
          <div className="flex flex-col items-center pt-1.5">
            <Skeleton className="w-3.5 h-3.5" />
            <Skeleton className="w-[2px] flex-1 mt-3" style={{ minHeight: 80 }} />
          </div>
          <div className="pb-8 w-full">
            <Skeleton className="h-28 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main ExperienceTimeline component ─────────────────────────
export default function ExperienceTimeline() {
  const [activeTab, setActiveTab] = useState("experience");

  const {
    data: expData,
    isLoading: expLoading,
    isError: expError,
  } = useExperience();

  const { data: eduData, isLoading: eduLoading } = useEducation();

  const { data: certData, isLoading: certLoading } = useCertificates();

  const experiences = expData?.data ?? [];
  const educations = eduData?.data ?? [];
  const certificates = certData?.data ?? [];

  const tabCounts = {
    experience: experiences.length,
    education: educations.length,
    certificates: certificates.length,
  };

  const isLoading =
    (activeTab === "experience" && expLoading) ||
    (activeTab === "education" && eduLoading) ||
    (activeTab === "certificates" && certLoading);

  return (
    <Section id="experience">
      <SectionReveal>
        <SectionHeading
          eyebrow="Background"
          title="Where I've been."
          subtitle="Professional experience, education, and certifications."
        />
      </SectionReveal>

      {/* Tab bar — boxy */}
      <SectionReveal delay={0.1}>
        <div
          className="flex items-center gap-0 mt-8 mb-10
              border-2 border-[var(--border)] w-fit"
        >
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`relative flex items-center gap-2 px-4 py-2.5
          text-sm font-bold tracking-wider uppercase transition-all duration-200
          border-r-2 border-[var(--border)] last:border-r-0 ${
            activeTab === key
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-card)] hover:bg-[var(--bg-subtle)]"
          }`}
            >
              <Icon size={14} />
              {label}
              {tabCounts[key] > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 font-bold ${
                    activeTab === key
                      ? "bg-white/20 text-white"
                      : "bg-[var(--border)] text-[var(--text-muted)]"
                  }`}
                >
                  {tabCounts[key]}
                </span>
              )}
            </button>
          ))}
        </div>
      </SectionReveal>

      {/* Tab content */}
      <div className="max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            {isLoading && <TimelineSkeleton />}

            {/* Experience tab */}
            {activeTab === "experience" && !expLoading && (
              <>
                {expError && (
                  <p className="text-[var(--error)] text-sm py-4">
                    Failed to load experience. Check backend.
                  </p>
                )}
                {!expError && experiences.length === 0 && (
                  <p className="text-[var(--text-muted)] text-sm py-8">
                    No experience entries yet. Add some via the admin panel.
                  </p>
                )}
                {!expError &&
                  experiences.map((item, i) => (
                    <ExperienceItem key={item._id} item={item} index={i} />
                  ))}
              </>
            )}

            {/* Education tab */}
            {activeTab === "education" && !eduLoading && (
              <>
                {educations.length === 0 && (
                  <p className="text-[var(--text-muted)] text-sm py-8">
                    No education entries yet.
                  </p>
                )}
                {educations.map((item, i) => (
                  <EducationItem key={item._id} item={item} index={i} />
                ))}
              </>
            )}

            {/* Certificates tab */}
            {activeTab === "certificates" && !certLoading && (
              <>
                {certificates.length === 0 && (
                  <p className="text-[var(--text-muted)] text-sm py-8">
                    No certificates yet.
                  </p>
                )}
                <div className="grid sm:grid-cols-2 gap-6">
                  {certificates.map((item, i) => (
                    <CertificateItem key={item._id} item={item} index={i} />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
