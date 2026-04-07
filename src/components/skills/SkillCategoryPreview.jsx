/**
 * components/skills/SkillCategoryPreview.jsx
 * Single category row — enhanced with:
 *   - Left accent bar + bolder title
 *   - Pill hover: scale + color glow
 *   - Staggered fade-in via CSS animation delay (prop-driven)
 *   - Interactive "+N more →" link to /skills
 */

import { Link } from "react-router-dom";
import { cn } from "../../utils/cn";

const PILL_COUNT = 4;

/** Per-color design tokens */
const colorTokens = {
  violet: {
    accent:  "bg-violet-500",
    title:   "text-violet-200",
    icon:    "text-violet-400",
    pill:    "bg-violet-500/10 text-violet-200 border-violet-500/25 hover:bg-violet-500/25 hover:border-violet-500/60 hover:text-white hover:shadow-[0_0_12px_rgba(139,92,246,0.25)]",
    more:    "text-violet-400 border-violet-500/30 hover:bg-violet-500/15 hover:border-violet-500/50 hover:text-violet-200",
  },
  cyan: {
    accent:  "bg-cyan-500",
    title:   "text-cyan-200",
    icon:    "text-cyan-400",
    pill:    "bg-cyan-500/10 text-cyan-200 border-cyan-500/25 hover:bg-cyan-500/25 hover:border-cyan-500/60 hover:text-white hover:shadow-[0_0_12px_rgba(6,182,212,0.25)]",
    more:    "text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/15 hover:border-cyan-500/50 hover:text-cyan-200",
  },
  emerald: {
    accent:  "bg-emerald-500",
    title:   "text-emerald-200",
    icon:    "text-emerald-400",
    pill:    "bg-emerald-500/10 text-emerald-200 border-emerald-500/25 hover:bg-emerald-500/25 hover:border-emerald-500/60 hover:text-white hover:shadow-[0_0_12px_rgba(16,185,129,0.25)]",
    more:    "text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/15 hover:border-emerald-500/50 hover:text-emerald-200",
  },
  amber: {
    accent:  "bg-amber-500",
    title:   "text-amber-200",
    icon:    "text-amber-400",
    pill:    "bg-amber-500/10 text-amber-200 border-amber-500/25 hover:bg-amber-500/25 hover:border-amber-500/60 hover:text-white hover:shadow-[0_0_12px_rgba(245,158,11,0.25)]",
    more:    "text-amber-400 border-amber-500/30 hover:bg-amber-500/15 hover:border-amber-500/50 hover:text-amber-200",
  },
};

/**
 * SkillCategoryPreview
 * @param {{ category: object, index: number, visible: boolean }} props
 */
export function SkillCategoryPreview({ category, index = 0, visible = true }) {
  const t       = colorTokens[category.color] ?? colorTokens.violet;
  const topSkills = category.skills.slice(0, PILL_COUNT);
  const remaining = category.skills.length - PILL_COUNT;

  // Staggered reveal — each row appears 80 ms after the previous one
  const delay = `${index * 80}ms`;

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
      style={{ transitionDelay: delay }}
    >
      {/* ── Category label with left accent bar ── */}
      <div className="flex items-center gap-3 sm:w-56 shrink-0">
        {/* Accent bar */}
        <div className={cn("w-0.5 h-8 rounded-full shrink-0", t.accent)} />

        {/* Icon + title */}
        <div className="flex items-center gap-2">
          <span className={cn("text-xl leading-none", t.icon)}>{category.icon}</span>
          <span className={cn("text-sm font-bold tracking-tight", t.title)}>
            {category.label}
          </span>
        </div>
      </div>

      {/* ── Skill pills ── */}
      <div className="flex flex-wrap items-center gap-2">
        {topSkills.map((skill) => (
          <span
            key={skill.name}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium border cursor-default select-none",
              "transition-all duration-200 hover:scale-105",
              t.pill
            )}
          >
            {skill.name}
          </span>
        ))}

        {/* Interactive overflow link */}
        {remaining > 0 && (
          <Link
            to="/skills"
            className={cn(
              "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border",
              "transition-all duration-200 hover:scale-105",
              t.more
            )}
          >
            +{remaining} more →
          </Link>
        )}
      </div>
    </div>
  );
}
