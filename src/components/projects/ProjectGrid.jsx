/**
 * components/projects/ProjectGrid.jsx
 * Full project listing — used by /projects page.
 *
 * Features:
 *  - Category filter tabs with live counts
 *  - Featured 2-col section then rest in 3-col grid
 *  - All projects shown (no cap / show-more)
 */

import { useState } from "react";
import { projects, projectCategories } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";
import { cn } from "../../utils/cn";

export function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const featuredProjects = projects
    .filter((p) => p.isFeatured)
    .sort((a, b) => a.featuredOrder - b.featuredOrder)
    .slice(0, 4);

  if (featuredProjects.length < 4) {
    console.warn("Less than 4 featured projects found");
  }

  const regularProjects = filtered.filter((p) => !p.isFeatured);
  const showFeaturedSection =
    activeCategory === "All" && featuredProjects.length > 0;

  return (
    <div>
      {/* ── Category filter tabs ── */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {projectCategories.map((cat) => {
          const count =
            cat === "All"
              ? projects.length
              : projects.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200",
                activeCategory === cat
                  ? "bg-violet-500/20 text-violet-300 border-violet-500/40"
                  : "text-slate-400 border-slate-700 hover:border-slate-600 hover:text-slate-300"
              )}
            >
              {cat}
              <span
                className={cn(
                  "text-xs px-1.5 py-0.5 rounded-full font-semibold",
                  activeCategory === cat
                    ? "bg-violet-500/30 text-violet-200"
                    : "bg-slate-800 text-slate-500"
                )}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Featured section (2-col, only in "All" view) ── */}
      {showFeaturedSection && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-amber-400 text-sm">★</span>
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-widest">
              Featured
            </span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((p) => (
              <ProjectCard key={p.id} project={p} variant="featured" />
            ))}
          </div>
        </div>
      )}

      {/* ── Divider ── */}
      {showFeaturedSection && regularProjects.length > 0 && (
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-px bg-slate-800" />
          <span className="text-slate-600 text-xs uppercase tracking-widest px-2">
            More Projects
          </span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>
      )}

      {/* ── Standard 3-col grid ── */}
      {(showFeaturedSection ? regularProjects : filtered).length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(showFeaturedSection ? regularProjects : filtered).map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      )}

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 text-sm">No projects in this category yet.</p>
        </div>
      )}
    </div>
  );
}
