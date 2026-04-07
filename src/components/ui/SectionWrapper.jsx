/**
 * components/ui/SectionWrapper.jsx
 * Standardized section container with consistent spacing, ID anchoring,
 * and optional scroll-reveal animation.
 */

import { useScrollReveal } from "../../hooks/useScrollReveal";
import { cn } from "../../utils/cn";

export function SectionWrapper({ id, children, className = "" }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        "py-24 px-4 sm:px-8 max-w-6xl mx-auto transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
    >
      {children}
    </section>
  );
}

/** Reusable section heading pattern */
export function SectionHeading({ badge, title, subtitle }) {
  return (
    <div className="mb-14 text-center">
      {badge && (
        <span className="inline-block mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/15 text-violet-400 border border-violet-500/25 tracking-wide uppercase">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">{title}</h2>
      {subtitle && <p className="text-slate-400 max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}
