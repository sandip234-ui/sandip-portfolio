/**
 * pages/ProjectDetailPage.jsx
 * Route: /projects/:id
 *
 * Loads the project from the centralized data file by ID.
 * Renders the full ProjectDetail component.
 * Shows a 404-style message for unknown IDs.
 */

import { useParams, Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { projects } from "../data/projects";
import { ProjectDetail } from "../components/projects/ProjectDetail";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function ProjectDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const fromSkills = searchParams.get("from") === "skills";

  const project = projects.find((p) => p.id === id);

  /* Unknown project ID — redirect to home */
  if (!project) {
    return <Navigate to="/" replace />;
  }

  /* Adjacent project navigation */
  const currentIndex = projects.indexOf(project);
  const prevProject  = projects[currentIndex - 1] ?? null;
  const nextProject  = projects[currentIndex + 1] ?? null;

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-8 pt-32 pb-24">

        {/* ── Back link ── */}
        {fromSkills ? (
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors mb-10 group bg-transparent border-none p-0 cursor-pointer"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            Back to Skills
          </button>
        ) : (
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors mb-10 group"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            All Projects
          </Link>
        )}

        {/* ── Full project detail ── */}
        <ProjectDetail project={project} />

        {/* ── Prev / Next navigation ── */}
        <div className="mt-12 flex items-center justify-between gap-4">
          {prevProject ? (
            <Link
              to={`/projects/${prevProject.id}`}
              className="group flex items-center gap-2.5 px-5 py-3 rounded-xl border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white transition-all duration-200 text-sm"
            >
              <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
              <div className="text-left">
                <p className="text-xs text-slate-600 uppercase tracking-widest mb-0.5">Previous</p>
                <p className="font-medium">{prevProject.title}</p>
              </div>
            </Link>
          ) : <div />}

          {nextProject ? (
            <Link
              to={`/projects/${nextProject.id}`}
              className="group flex items-center gap-2.5 px-5 py-3 rounded-xl border border-slate-800 hover:border-slate-600 text-slate-400 hover:text-white transition-all duration-200 text-sm ml-auto"
            >
              <div className="text-right">
                <p className="text-xs text-slate-600 uppercase tracking-widest mb-0.5">Next</p>
                <p className="font-medium">{nextProject.title}</p>
              </div>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
            </Link>
          ) : <div />}
        </div>
      </main>

      <Footer />
    </div>
  );
}
