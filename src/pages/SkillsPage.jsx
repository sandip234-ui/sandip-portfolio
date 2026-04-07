/**
 * pages/SkillsPage.jsx
 * Full-detail skills inventory, reachable at /skills.
 * Renders every category with all skill entries (highlighted + supporting).
 */

import { Link } from "react-router-dom";
import { skillCategories } from "../data/skills";
import { SkillCategory } from "../components/skills/SkillCategory";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export default function SkillsPage() {
  const totalSkills = skillCategories.reduce((sum, c) => sum + c.skills.length, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-8 pt-32 pb-24">
        {/* ── Page header ── */}
        <div className="mb-16">
          {/* Back link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors mb-8 group"
          >
            <span className="transition-transform duration-200 group-hover:-translate-x-0.5">←</span>
            Back to portfolio
          </Link>

          {/* Badge + title */}
          <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/25 tracking-wide uppercase">
            Full Inventory
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Technical Skills
          </h1>
          <p className="text-slate-400 max-w-xl text-lg leading-relaxed">
            {totalSkills} tools across {skillCategories.length} domains — each listed with
            real usage context and the projects it powered.
          </p>

          {/* Quick stats row */}
          <div className="flex flex-wrap gap-4 mt-8">
            {skillCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-slate-400 border border-slate-800 hover:border-slate-600 hover:text-white transition-all duration-200"
              >
                <span>{cat.icon}</span>
                {cat.label}
                <span className="text-xs text-slate-600 font-mono">{cat.skills.length}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── Category sections ── */}
        <div>
          {skillCategories.map((category) => (
            <div key={category.id} id={category.id}>
              <SkillCategory category={category} />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
