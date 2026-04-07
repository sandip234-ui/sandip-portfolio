/**
 * pages/ProjectsPage.jsx
 * Route: /projects
 *
 * Full projects catalogue — all projects with category filters.
 * Uses the same ProjectCard as the homepage.
 */

import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { totalFeatured, totalProjects } from "../utils/projectSelectors";
import { ProjectGrid } from "../components/projects/ProjectGrid";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function ProjectsPage() {

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-8 pt-32 pb-24">

        {/* ── Back link ── */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors mb-10 group"
        >
          <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
          Back to portfolio
        </Link>

        {/* ── Page header ── */}
        <div className="mb-14">
          <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/25 tracking-wide uppercase">
            All Projects
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Everything I've Built
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
            {projects.length} projects across ML, NLP, Computer Vision, and more —
            each documented with the problem, approach, and results.
          </p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2">
              <span className="text-amber-400">★</span>
              <span className="text-slate-300 text-sm font-medium">{totalFeatured} Featured</span>
            </div>
            <div className="text-slate-600 text-sm">·</div>
            <div className="text-slate-400 text-sm">
              {projects.filter((p) => p.status === "completed").length} Completed
            </div>
            <div className="text-slate-600 text-sm">·</div>
            <div className="text-slate-400 text-sm">
              {projects.filter((p) => p.status === "in-progress").length} In Progress
            </div>
          </div>
        </div>

        {/* ── Project grid with filters ── */}
        <ProjectGrid />
      </main>

      <Footer />
    </div>
  );
}
