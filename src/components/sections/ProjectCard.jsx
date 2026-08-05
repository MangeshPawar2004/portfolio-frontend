import { ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Tag from "@/components/ui/Tag";
import Badge from "@/components/ui/Badge";
import { truncate } from "@/lib/utils";
import { PROJECT_STATUS_COLORS } from "@/constants";

const STATUS_VARIANT = {
  completed: "success",
  ongoing: "accent",
  planned: "purple",
};

export default function ProjectCard({ project }) {
  const {
    title,
    slug,
    shortDescription,
    techStack = [],
    thumbnailUrl,
    githubUrl,
    liveDemoUrl,
    status,
    isFeatured,
    tags = [],
  } = project;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="card group flex flex-col h-full overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative h-44 bg-[#161616] overflow-hidden flex-shrink-0">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-4xl font-bold text-[#242424] tracking-tighter select-none">
              {title.slice(0, 2).toUpperCase()}
            </div>
          </div>
        )}

        {/* Status badge overlay */}
        {status && (
          <div className="absolute top-3 left-3">
            <Badge variant={STATUS_VARIANT[status] || "default"}>
              {status}
            </Badge>
          </div>
        )}

        {/* Featured badge */}
        {isFeatured && (
          <div className="absolute top-3 right-3">
            <Badge variant="accent">Featured</Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3
          className="text-base font-semibold text-[#F5F5F5] mb-2 group-hover:text-[#3B82F6]
                       transition-colors leading-snug"
        >
          {title}
        </h3>

        <p className="text-sm text-[#71717A] leading-relaxed mb-4 flex-1">
          {truncate(shortDescription, 110)}
        </p>

        {/* Tech stack tags */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {techStack.slice(0, 4).map((tech) => (
              <Tag key={tech.name || tech}>{tech.name || tech}</Tag>
            ))}
            {techStack.length > 4 && <Tag>+{techStack.length - 4}</Tag>}
          </div>
        )}

        {/* Links row */}
        <div className="flex items-center justify-between pt-3 border-t border-[#242424]">
          <div className="flex items-center gap-2">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 text-[#71717A] hover:text-[#F5F5F5] hover:bg-[#161616]
                           rounded-md transition-all"
                aria-label="GitHub repository"
              >
                <ExternalLink size={15} />
              </a>
            )}
            {liveDemoUrl && (
              <a
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 text-[#71717A] hover:text-[#F5F5F5] hover:bg-[#161616]
                           rounded-md transition-all"
                aria-label="Live demo"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>

          <Link
            to={`/projects/${slug}`}
            className="flex items-center gap-1 text-xs text-[#3B82F6] hover:text-[#60A5FA]
                       font-medium transition-colors"
          >
            Case study <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
