/**
 * components/skills/SkillsPreview.jsx
 * Homepage skills block — pill layout with polished micro-interactions.
 *
 * - Section fades + rises in when it enters the viewport (useScrollReveal)
 * - Each category row is staggered (index passed to SkillCategoryPreview)
 * - Centered, prominent CTA button at the bottom
 */

import { Link } from "react-router-dom";
import { skillCategories } from "../../data/skills";
import { SkillCategoryPreview } from "./SkillCategoryPreview";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { cn } from "../../utils/cn";

const totalSkills = skillCategories.reduce((n, c) => n + c.skills.length, 0);

export function SkillsPreview() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <div ref={ref} className="space-y-0">
      {/* ── Category rows with staggered reveal ── */}
      <div className="divide-y divide-slate-800/50">
        {skillCategories.map((category, i) => (
          <div key={category.id} className="py-6 first:pt-0 last:pb-0">
            <SkillCategoryPreview category={category} index={i} visible={isVisible} />
          </div>
        ))}
      </div>

      {/* ── Separator ── */}
      <div
        className={cn(
          "pt-10 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{ transitionDelay: `${skillCategories.length * 80 + 80}ms` }}
      >
        {/* Divider line */}
        <div className="border-t border-slate-800/70 mb-8" />

        {/* CTA — centered */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-slate-500 tracking-wide uppercase font-medium">
            {totalSkills} tools &mdash; full context &amp; project evidence
          </p>

          <Link
            to="/skills"
            className={cn(
              "group inline-flex items-center gap-2.5 px-7 py-3 rounded-2xl text-sm font-semibold",
              "bg-violet-600/10 text-violet-300 border border-violet-500/30",
              "hover:bg-violet-600/20 hover:border-violet-400/50 hover:text-white",
              "shadow-[0_0_0_0_rgba(139,92,246,0)] hover:shadow-[0_0_24px_rgba(139,92,246,0.20)]",
              "transition-all duration-300"
            )}
          >
            View Full Skills Dashboard
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
