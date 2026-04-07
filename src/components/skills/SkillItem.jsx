import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { cn } from "../../utils/cn";
import { useRef, useState } from "react";

/* ── Color token lookup ── */
export const colorMap = {
  violet: {
    highlightBg: "bg-gradient-to-br from-violet-500/15 via-violet-500/5 to-transparent backdrop-blur-md border border-violet-500/30 shadow-inner shadow-white/5 hover:border-violet-400 hover:shadow-lg hover:shadow-violet-500/20",
    accentHover: "hover:text-violet-300",
    titleHover: "group-hover:text-violet-300",
    spotlight: "rgba(139, 92, 246, 0.15)", // violet-500
  },
  cyan: {
    highlightBg: "bg-gradient-to-br from-cyan-400/15 via-cyan-400/5 to-transparent backdrop-blur-md border border-cyan-400/30 shadow-inner shadow-white/5 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20",
    accentHover: "hover:text-cyan-300",
    titleHover: "group-hover:text-cyan-300",
    spotlight: "rgba(6, 182, 212, 0.15)", // cyan-500
  },
  emerald: {
    highlightBg: "bg-gradient-to-br from-emerald-500/15 via-emerald-500/5 to-transparent backdrop-blur-md border border-emerald-500/30 shadow-inner shadow-white/5 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20",
    accentHover: "hover:text-emerald-300",
    titleHover: "group-hover:text-emerald-300",
    spotlight: "rgba(16, 185, 129, 0.15)", // emerald-500
  },
  amber: {
    highlightBg: "bg-gradient-to-br from-amber-400/15 via-amber-400/5 to-transparent backdrop-blur-md border border-amber-400/30 shadow-inner shadow-white/5 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/20",
    accentHover: "hover:text-amber-300",
    titleHover: "group-hover:text-amber-300",
    spotlight: "rgba(245, 158, 11, 0.15)", // amber-500
  },
};

/**
 * SkillItem — unified, premium card with interactions.
 * @param {{ skill: object, colors: object }} props
 */
export function SkillItem({ skill, colors }) {
  const maxProjects = 4;
  const showProjects = skill.projects?.slice(0, maxProjects) || [];
  const extraCount = (skill.projects?.length || 0) - showProjects.length;

  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        "group relative overflow-hidden flex flex-col justify-center min-h-[95px] p-5 rounded-xl",
        "transition-all duration-300 ease-in-out hover:scale-[1.02] hover:-translate-y-1",
        colors?.highlightBg || colorMap.violet.highlightBg
      )}
    >
      {/* ── Spotlight Effect ── */}
      {isHovering && (
        <div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${colors?.spotlight || colorMap.violet.spotlight}, transparent 40%)`,
          }}
        />
      )}

      {/* ── Shimmer Overlay ── */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* ── Content ── */}
      <div className="relative z-10">
        <h3 className={cn("text-white/90 font-semibold text-base mb-1.5 transition-colors duration-300", colors?.titleHover)}>
          {skill.name}
        </h3>

        {skill.projects?.length > 0 ? (
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/70">
            {showProjects.map((projectName, i) => {
              const projectObj = projects.find((p) => p.title === projectName);
              const slug = projectObj?.id;

              const content = slug ? (
                <Link
                  to={`/projects/${slug}?from=skills`}
                  className={cn(
                    "cursor-pointer transition-colors duration-200 hover:underline underline-offset-[3px]",
                    colors?.accentHover || "hover:text-white"
                  )}
                >
                  {projectName}
                </Link>
              ) : (
                <span>{projectName}</span>
              );

              return (
                <div key={projectName} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/30 select-none text-[10px]">•</span>}
                  {content}
                </div>
              );
            })}
            {extraCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-white/30 select-none text-[10px]">•</span>
                <span className="text-white/50">+{extraCount} more</span>
              </div>
            )}
          </div>
        ) : (
          <div className="inline-flex px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-white/50 mt-0.5">
            Fundamentals
          </div>
        )}
      </div>
    </div>
  );
}
