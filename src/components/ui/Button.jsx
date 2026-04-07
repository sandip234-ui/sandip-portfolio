/**
 * components/ui/Button.jsx
 * Reusable CTA button with multiple variants and optional icon support.
 */

import { cn } from "../../utils/cn";

const variantMap = {
  primary:
    "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-500/25",
  secondary:
    "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700",
  ghost: "bg-transparent hover:bg-slate-800 text-slate-300",
  outline:
    "bg-transparent border border-violet-500 text-violet-400 hover:bg-violet-500/10",
};

export function Button({
  children,
  variant = "primary",
  href,
  className = "",
  icon: Icon,
  ...props
}) {
  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-violet-500/50";

  const classes = cn(base, variantMap[variant] ?? variantMap.primary, className);

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {Icon && <Icon size={16} />}
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}
