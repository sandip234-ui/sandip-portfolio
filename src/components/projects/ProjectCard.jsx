import { Link } from "react-router-dom";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";

const imageMap = {
  "weapon-detection": "https://cdn.pixabay.com/photo/2017/08/31/16/23/weapon-2701336_1280.jpg", // AI / detection vibe
  "multimodal-emotion-ai": "https://cdn.pixabay.com/photo/2017/11/26/15/16/smiley-2979107_1280.jpg", // brain/AI
  "weather-app": "https://cdn.pixabay.com/photo/2023/10/30/19/10/clouds-8353592_1280.jpg", // weather
  "stopwatch-app": "https://cdn.pixabay.com/photo/2018/09/30/21/27/russian-3714722_1280.jpg", // timer
  "ecommerce-landing": "https://cdn.pixabay.com/photo/2019/02/16/14/19/shopping-4000414_1280.jpg", // shopping
};

const accentMap = {
  violet:  "bg-violet-500",
  emerald: "bg-emerald-500",
  cyan:    "bg-cyan-500",
  amber:   "bg-amber-500",
  sky:     "bg-sky-500",
  pink:    "bg-pink-500",
};

const borderHoverMap = {
  violet:  "hover:border-violet-500/40",
  emerald: "hover:border-emerald-500/40",
  cyan:    "hover:border-cyan-500/40",
  amber:   "hover:border-amber-500/40",
  sky:     "hover:border-sky-500/40",
  pink:    "hover:border-pink-500/40",
};

const statusConfig = {
  completed:   { label: "Completed",   variant: "success" },
  "in-progress": { label: "In Progress", variant: "warning" },
  archived:    { label: "Archived",    variant: "outline" },
};

export function ProjectCard({ project, variant = "default" }) {
  const {
    id,
    emoji,
    title,
    category,
    problem,
    status,
    featured,
    year,
    accentColor = "violet",
    tech = [],
    github,
    demo,
  } = project;

  const isFeatured = variant === "featured";
  const imageSrc = imageMap[id];
  const accentBgClass = accentMap[accentColor] || accentMap.violet;
  const hoverBorderClass = borderHoverMap[accentColor] || borderHoverMap.violet;

  return (
    <article
      className={cn(
        "group relative flex flex-col h-full rounded-2xl bg-[#0B1220] border border-white/10 overflow-hidden",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        hoverBorderClass,
        isFeatured && "shadow-[0_0_15px_rgba(255,255,255,0.03)]" // Slight glow
      )}
    >
      {/* ── Top Accent Strip ── */}
      <div className={cn("h-1 w-full shrink-0", accentBgClass)} />

      {/* ── Image Section ── */}
      <div className="relative w-full h-[140px] shrink-0 bg-linear-to-br from-white/5 to-white/10 flex items-center justify-center overflow-hidden">
        {imageSrc ? (
          <>
            <img src={imageSrc} alt={title} className="w-full h-full object-cover rounded-t-2xl" loading="lazy" />
            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
          </>
        ) : (
          <span className="text-5xl opacity-80">{emoji}</span>
        )}
      </div>

      {/* ── Content Body ── */}
      <div className={cn("flex flex-col flex-1", isFeatured ? "p-6" : "p-4")}>
        
        {/* Header Row */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="text-xl shrink-0">{emoji}</span>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {status && (
              <Badge variant={statusConfig[status]?.variant || "outline"}>
                {statusConfig[status]?.label || status}
              </Badge>
            )}
            <span className="text-xs text-white/50">{year}</span>
            {featured && <span className="text-xs text-amber-400">★</span>}
          </div>
        </div>

        {/* Title Section */}
        <h3 className={cn("text-white font-semibold mb-1 leading-snug", isFeatured ? "text-lg" : "text-base")}>
          {title}
        </h3>
        <span className="text-sm font-medium text-teal-400 mb-3 block">
          {category}
        </span>

        {/* Description */}
        {problem && (
          <p className="text-white/60 text-sm leading-relaxed line-clamp-2 mb-4">
            {problem}
          </p>
        )}

        {/* Tech Stack Pills */}
        {tech.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
            {tech.slice(0, 4).map((t) => (
              <span key={t} className="bg-white/5 border border-white/10 rounded-full px-2.5 py-1 text-[11px] text-white/80">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* ── Actions Row ── */}
        <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex flex-wrap gap-2">
            {github && (
              <Button href={github} variant="secondary" className="text-xs px-3 py-1.5 h-8">
                GitHub
              </Button>
            )}
            {demo && (
              <Button href={demo} variant="outline" className="text-xs px-3 py-1.5 h-8">
                Live Demo
              </Button>
            )}
          </div>
          
          {/* View Details */}
          <Link
            to={`/projects/${id}`}
            className="text-xs font-semibold text-white/70 hover:text-white transition-colors ml-auto"
          >
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}
