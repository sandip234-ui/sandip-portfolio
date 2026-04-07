/**
 * components/ui/Badge.jsx
 * Reusable pill badge for tags, categories, and status labels.
 * Props: children, variant ("default"|"outline"|"success"|"warning"), size
 */

import { cn } from "../../utils/cn";

const variantMap = {
  default: "bg-violet-500/20 text-violet-300 border border-violet-500/30",
  outline: "bg-transparent text-slate-400 border border-slate-600",
  success: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
  warning: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  cyan: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
};

export function Badge({ children, variant = "default", className = "" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantMap[variant] ?? variantMap.default,
        className
      )}
    >
      {children}
    </span>
  );
}
