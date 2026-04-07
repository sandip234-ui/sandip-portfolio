/**
 * components/projects/ProjectDetail.jsx
 * Full engineering narrative for a single project.
 * Used exclusively by /projects/:id
 *
 * Displays: problem · approach · results (metric pills) · impact · tech · links
 */

import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";

/* ── Accent colour map ── */
const accentMap = {
  violet: {
    border:    "border-violet-500/30",
    pill:      "bg-violet-500/15 text-violet-300 border-violet-500/25",
    highlight: "text-violet-400",
    tag:       "bg-violet-500/10 text-violet-300 border border-violet-500/20",
    label:     "text-violet-400",
    accent:    "bg-violet-500",
    impactBg:  "bg-violet-500/10 border-violet-500/20",
  },
  emerald: {
    border:    "border-emerald-500/30",
    pill:      "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    highlight: "text-emerald-400",
    tag:       "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    label:     "text-emerald-400",
    accent:    "bg-emerald-500",
    impactBg:  "bg-emerald-500/10 border-emerald-500/20",
  },
  cyan: {
    border:    "border-cyan-500/30",
    pill:      "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
    highlight: "text-cyan-400",
    tag:       "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
    label:     "text-cyan-400",
    accent:    "bg-cyan-500",
    impactBg:  "bg-cyan-500/10 border-cyan-500/20",
  },
  amber: {
    border:    "border-amber-500/30",
    pill:      "bg-amber-500/15 text-amber-300 border-amber-500/25",
    highlight: "text-amber-400",
    tag:       "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    label:     "text-amber-400",
    accent:    "bg-amber-500",
    impactBg:  "bg-amber-500/10 border-amber-500/20",
  },
  sky: {
    border:    "border-sky-500/30",
    pill:      "bg-sky-500/15 text-sky-300 border-sky-500/25",
    highlight: "text-sky-400",
    tag:       "bg-sky-500/10 text-sky-300 border border-sky-500/20",
    label:     "text-sky-400",
    accent:    "bg-sky-500",
    impactBg:  "bg-sky-500/10 border-sky-500/20",
  },
  pink: {
    border:    "border-pink-500/30",
    pill:      "bg-pink-500/15 text-pink-300 border-pink-500/25",
    highlight: "text-pink-400",
    tag:       "bg-pink-500/10 text-pink-300 border border-pink-500/20",
    label:     "text-pink-400",
    accent:    "bg-pink-500",
    impactBg:  "bg-pink-500/10 border-pink-500/20",
  },
};

const statusConfig = {
  completed:     { label: "Completed",   variant: "success" },
  "in-progress": { label: "In Progress", variant: "warning" },
  archived:      { label: "Archived",    variant: "outline" },
};

function SectionLabel({ children, color }) {
  return (
    <span className={cn("inline-block text-[10px] font-bold uppercase tracking-widest mb-2", color)}>
      {children}
    </span>
  );
}

function MetricPill({ label, value, highlight, colors }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center px-4 py-3 rounded-xl border text-center min-w-[80px]",
        highlight ? colors.pill : "bg-slate-800/60 text-slate-300 border-slate-700"
      )}
    >
      <span className={cn("text-lg font-bold leading-none", highlight ? colors.highlight : "text-white")}>
        {value}
      </span>
      <span className="text-[10px] text-slate-400 mt-1 leading-tight">{label}</span>
    </div>
  );
}

export function ProjectDetail({ project }) {
  const {
    emoji,
    title,
    category,
    status,
    featured,
    year,
    accentColor = "violet",
    problem,
    approach,
    tech,
    results,
    impact,
    github,
    demo,
  } = project;

  const colors     = accentMap[accentColor] ?? accentMap.violet;
  const statusMeta = statusConfig[status] ?? statusConfig.completed;

  return (
    <article className={cn("rounded-2xl bg-slate-900/70 border", colors.border)}>
      {/* ── Header ── */}
      <div className="p-8 pb-6 border-b border-slate-800">
        <div className="flex items-start gap-4">
          <span className="text-4xl shrink-0 mt-1">{emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap mb-3">
              <Badge variant={statusMeta.variant}>{statusMeta.label}</Badge>
              <span className="text-sm text-slate-500">{year}</span>
              {featured && <span className="text-sm text-amber-400">★ Featured</span>}
            </div>
            <h1 className="text-3xl font-bold text-white leading-tight mb-2">{title}</h1>
            <span className={cn("text-sm font-semibold", colors.label)}>{category}</span>
          </div>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mt-6">
          {tech.map((t) => (
            <span key={t} className={cn("text-xs px-3 py-1.5 rounded-lg font-medium", colors.tag)}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-8 space-y-8">
        {/* Problem */}
        <div>
          <SectionLabel color={colors.label}>⚠ Problem</SectionLabel>
          <p className="text-slate-300 text-base leading-relaxed">{problem}</p>
        </div>

        {/* Approach */}
        <div>
          <SectionLabel color={colors.label}>⚙ Approach</SectionLabel>
          <p className="text-slate-400 text-base leading-relaxed">{approach}</p>
        </div>

        {/* Results */}
        <div>
          <SectionLabel color={colors.label}>📊 Results</SectionLabel>
          <div className="flex flex-wrap gap-3">
            {results.map((r) => (
              <MetricPill
                key={r.label}
                label={r.label}
                value={r.value}
                highlight={r.highlight}
                colors={colors}
              />
            ))}
          </div>
        </div>

        {/* Impact */}
        <div className={cn("rounded-xl px-5 py-4 border", colors.impactBg)}>
          <SectionLabel color={colors.label}>💡 Impact</SectionLabel>
          <p className="text-slate-300 text-base leading-relaxed">{impact}</p>
        </div>

        {/* Links */}
        {(github || demo) && (
          <div className="flex gap-3 pt-2">
            {github && (
              <Button href={github} variant="secondary">
                View on GitHub ↗
              </Button>
            )}
            {demo && (
              <Button href={demo} variant="outline">
                Live Demo ↗
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
