/**
 * sections/Projects.jsx — homepage projects section.
 *
 * Shows featured projects only (isFeatured: true, sorted by featuredOrder,
 * capped at 4). Falls back to first 4 projects if none are marked featured.
 * Below the grid: "View All Projects →" CTA linking to /projects.
 */

import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { getFeaturedProjects, totalFeatured } from "../utils/projectSelectors";
import { ProjectCard } from "../components/projects/ProjectCard";
import { SectionWrapper, SectionHeading } from "../components/ui/SectionWrapper";

const featuredProjects = getFeaturedProjects();

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionHeading
        badge="Projects"
        title="What I've Built"
        subtitle="A selection of engineering-driven work. Click any card for the full story."
      />

      {/* ── Featured label ── */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-amber-400">★</span>
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
          Featured Projects
        </span>
        <div className="flex-1 h-px bg-slate-800" />
        <span className="text-xs text-slate-600">
          {featuredProjects.length} of {projects.length} total
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} variant="featured" />
        ))}
      </div>

      {/* ── View All CTA ── */}
      <div className="mt-12 flex justify-center">
        <Link
          to="/projects"
          className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-sm font-semibold
                     border border-slate-700 text-slate-300
                     hover:border-violet-500/50 hover:text-violet-300 hover:bg-violet-500/5
                     transition-all duration-300"
        >
          View All Projects
          <span className="text-slate-500 group-hover:text-violet-400 transition-colors font-mono text-xs">
            ({projects.length})
          </span>
          <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </SectionWrapper>
  );
}
