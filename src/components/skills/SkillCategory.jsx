/**
 * components/skills/SkillCategory.jsx
 * Renders one full skill category: icon/label header, highlighted cards,
 * secondary compact list. Used by the /skills full page.
 */

import { cn } from "../../utils/cn";
import { SkillItem, colorMap } from "./SkillItem";

const tabColorMap = {
  violet: "text-violet-400 border-violet-500/30 bg-violet-500/10",
  cyan:   "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
  emerald:"text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  amber:  "text-amber-400 border-amber-500/30 bg-amber-500/10",
};

/**
 * SkillCategory — a full category block for the Skills page.
 * @param {{ category: object }} props
 */
export function SkillCategory({ category }) {
  const colors    = colorMap[category.color] ?? colorMap.violet;
  const tabColor  = tabColorMap[category.color] ?? tabColorMap.violet;
  const highlighted = category.skills.filter((s) => s.highlight);
  const secondary   = category.skills.filter((s) => !s.highlight);

  return (
    <section className="mt-12 mb-16 first:mt-0 last:mb-0">
      {/* ── Category header ── */}
      <div className="flex items-center gap-3 mb-8">
        <span className={cn("text-2xl p-2.5 rounded-xl border", tabColor)}>
          {category.icon}
        </span>
        <div>
          <h2 className="text-xl font-bold text-white">{category.label}</h2>
          <p className="text-slate-500 text-sm">
            {category.skills.length} tool{category.skills.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* ── Unified Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.skills.map((skill) => (
          <SkillItem key={skill.name} skill={skill} colors={colors} />
        ))}
      </div>

      {/* Divider between categories */}
      <div className="mt-16 h-px w-full bg-linear-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
