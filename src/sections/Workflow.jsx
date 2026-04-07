/**
 * sections/Workflow.jsx — "How I Build AI Systems"
 *
 * Layout: vertical timeline on mobile, horizontal pipeline stepper on desktop.
 *
 * Each stage card shows:
 *   - Phase number + emoji + title
 *   - Description
 *   - Tool badges
 *   - Collapsible "Decisions & Trade-offs" panel
 *
 * Clicking a stage card expands the detail panel in-place.
 */

import { useState } from "react";
import { workflowStages } from "../data/workflow";
import { SectionWrapper, SectionHeading } from "../components/ui/SectionWrapper";
import { cn } from "../utils/cn";

/* ── Accent colour maps ── */
const accentMap = {
  violet: {
    step: "bg-violet-600 text-white shadow-violet-700/40",
    border: "border-violet-500/30",
    activeBorder: "border-violet-500/60 shadow-violet-500/10",
    badge: "bg-violet-500/10 text-violet-300 border border-violet-500/20",
    connector: "bg-violet-500/40",
    label: "text-violet-400",
    glow: "shadow-violet-500/5",
    decision: "text-violet-400",
  },
  cyan: {
    step: "bg-cyan-600 text-white shadow-cyan-700/40",
    border: "border-cyan-500/30",
    activeBorder: "border-cyan-500/60 shadow-cyan-500/10",
    badge: "bg-cyan-500/10 text-cyan-300 border border-cyan-500/20",
    connector: "bg-cyan-500/40",
    label: "text-cyan-400",
    glow: "shadow-cyan-500/5",
    decision: "text-cyan-400",
  },
  emerald: {
    step: "bg-emerald-600 text-white shadow-emerald-700/40",
    border: "border-emerald-500/30",
    activeBorder: "border-emerald-500/60 shadow-emerald-500/10",
    badge: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20",
    connector: "bg-emerald-500/40",
    label: "text-emerald-400",
    glow: "shadow-emerald-500/5",
    decision: "text-emerald-400",
  },
  amber: {
    step: "bg-amber-600 text-white shadow-amber-700/40",
    border: "border-amber-500/30",
    activeBorder: "border-amber-500/60 shadow-amber-500/10",
    badge: "bg-amber-500/10 text-amber-300 border border-amber-500/20",
    connector: "bg-amber-500/40",
    label: "text-amber-400",
    glow: "shadow-amber-500/5",
    decision: "text-amber-400",
  },
  sky: {
    step: "bg-sky-600 text-white shadow-sky-700/40",
    border: "border-sky-500/30",
    activeBorder: "border-sky-500/60 shadow-sky-500/10",
    badge: "bg-sky-500/10 text-sky-300 border border-sky-500/20",
    connector: "bg-sky-500/40",
    label: "text-sky-400",
    glow: "shadow-sky-500/5",
    decision: "text-sky-400",
  },
  pink: {
    step: "bg-pink-600 text-white shadow-pink-700/40",
    border: "border-pink-500/30",
    activeBorder: "border-pink-500/60 shadow-pink-500/10",
    badge: "bg-pink-500/10 text-pink-300 border border-pink-500/20",
    connector: "bg-pink-500/40",
    label: "text-pink-400",
    glow: "shadow-pink-500/5",
    decision: "text-pink-400",
  },
};

/* ── Stage Card ── */
function StageCard({ stage, isActive, onClick, isLast }) {
  const colors = accentMap[stage.accentColor] ?? accentMap.violet;

  return (
    <div className="flex flex-col">
      {/* Card */}
      <button
        onClick={onClick}
        className={cn(
          "group relative text-left w-full rounded-2xl border bg-slate-900/70 transition-all duration-300",
          "hover:shadow-lg hover:-translate-y-0.5 focus:outline-none",
          isActive
            ? cn("shadow-xl", colors.activeBorder)
            : cn("border-slate-800 hover:border-slate-700")
        )}
      >
        {/* Top strip */}
        <div className="flex items-start gap-4 p-5">
          {/* Step bubble */}
          <div
            className={cn(
              "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold shadow-lg",
              colors.step
            )}
          >
            {stage.step}
          </div>

          {/* Title block */}
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="flex items-center gap-2 mb-0.5">
              <span className={cn("text-[10px] font-bold uppercase tracking-widest", colors.label)}>
                {stage.phase}
              </span>
              <span className="text-base">{stage.emoji}</span>
            </div>
            <h3 className="text-white font-semibold text-base leading-snug">{stage.title}</h3>
          </div>

          {/* Expand chevron */}
          <span
            className={cn(
              "text-slate-500 text-sm mt-1 transition-transform duration-300 shrink-0",
              isActive && "rotate-180"
            )}
          >
            ▾
          </span>
        </div>

        {/* Description — always visible */}
        <div className="px-5 pb-4">
          <p className="text-slate-400 text-sm leading-relaxed">{stage.description}</p>
        </div>

        {/* Tool pills — always visible */}
        <div className="px-5 pb-5 flex flex-wrap gap-1.5">
          {stage.tools.map((tool) => (
            <span
              key={tool}
              className={cn("text-xs px-2.5 py-1 rounded-lg font-medium", colors.badge)}
            >
              {tool}
            </span>
          ))}
        </div>
      </button>

      {/* Expandable decisions + trade-offs panel */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out",
          isActive ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-1 mt-2 mb-1 rounded-2xl bg-slate-900/50 border border-slate-800 p-5 space-y-5">
          {/* Decisions */}
          <div>
            <p className={cn("text-xs font-bold uppercase tracking-widest mb-3", colors.decision)}>
              ⚙ Key Decisions
            </p>
            <ul className="space-y-2">
              {stage.decisions.map((d) => (
                <li key={d} className="flex items-start gap-2 text-sm text-slate-300">
                  <span className={cn("mt-0.5 shrink-0", colors.decision)}>▸</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* Trade-off */}
          <div>
            <p className={cn("text-xs font-bold uppercase tracking-widest mb-2", colors.decision)}>
              ⚖ Trade-off Considered
            </p>
            <p className="text-slate-400 text-sm leading-relaxed italic">
              "{stage.tradeoffs}"
            </p>
          </div>
        </div>
      </div>

      {/* Vertical connector between cards */}
      {!isLast && (
        <div className="flex justify-center my-1">
          <div className={cn("w-0.5 h-4 rounded-full", colors.connector)} />
        </div>
      )}
    </div>
  );
}

/* ── Pipeline stepper (desktop top bar) ── */
function PipelineStepper({ stages, activeIndex, onSelect }) {
  return (
    <div className="hidden lg:flex items-center justify-center mb-12 px-4">
      {stages.map((stage, i) => {
        const colors = accentMap[stage.accentColor] ?? accentMap.violet;
        const isActive = i === activeIndex;
        return (
          <div key={stage.id} className="flex items-center">
            {/* Node */}
            <button
              onClick={() => onSelect(i)}
              className={cn(
                "group flex flex-col items-center gap-1.5 transition-all duration-200 focus:outline-none"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shadow-md transition-all duration-200",
                  isActive
                    ? cn(colors.step, "scale-110 shadow-lg")
                    : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                )}
              >
                {stage.step}
              </div>
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap transition-colors",
                  isActive ? colors.label : "text-slate-600 group-hover:text-slate-400"
                )}
              >
                {stage.phase}
              </span>
            </button>

            {/* Connector line */}
            {i < stages.length - 1 && (
              <div
                className={cn(
                  "w-10 xl:w-16 h-px mx-1 transition-colors duration-300",
                  i < activeIndex ? colors.connector : "bg-slate-800"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Section ── */
export function Workflow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileActive, setMobileActive] = useState(null);

  const toggleMobile = (i) => setMobileActive(mobileActive === i ? null : i);

  return (
    <SectionWrapper id="workflow">
      <SectionHeading
        badge="Engineering Process"
        title="How I Build AI Systems"
        subtitle="From raw data to production — the decisions, tools, and trade-offs behind every model I ship."
      />

      {/* Desktop: stepper nav + single active card detail */}
      <div className="hidden lg:block">
        <PipelineStepper
          stages={workflowStages}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        {/* Active stage detail — full-width card */}
        {workflowStages.map((stage, i) => {
          if (i !== activeIndex) return null;
          const colors = accentMap[stage.accentColor] ?? accentMap.violet;
          return (
            <div
              key={stage.id}
              className={cn(
                "rounded-2xl border bg-slate-900/70 p-8 shadow-xl transition-all duration-300",
                colors.activeBorder
              )}
            >
              <div className="grid grid-cols-2 gap-10">
                {/* Left column */}
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-4">
                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold shadow-lg shrink-0", colors.step)}>
                      {stage.step}
                    </div>
                    <div>
                      <span className={cn("text-xs font-bold uppercase tracking-widest", colors.label)}>
                        Stage {stage.step} · {stage.phase}
                      </span>
                      <h3 className="text-white text-xl font-bold leading-tight">
                        {stage.emoji} {stage.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-300 leading-relaxed">{stage.description}</p>

                  {/* Tools */}
                  <div>
                    <p className={cn("text-xs font-bold uppercase tracking-widest mb-3", colors.label)}>
                      Tools
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {stage.tools.map((t) => (
                        <span key={t} className={cn("text-sm px-3 py-1.5 rounded-xl font-medium", colors.badge)}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right column */}
                <div className="space-y-6">
                  {/* Decisions */}
                  <div>
                    <p className={cn("text-xs font-bold uppercase tracking-widest mb-3", colors.label)}>
                      ⚙ Key Decisions
                    </p>
                    <ul className="space-y-2.5">
                      {stage.decisions.map((d) => (
                        <li key={d} className="flex items-start gap-2.5 text-sm text-slate-300">
                          <span className={cn("mt-0.5 shrink-0 text-base leading-none", colors.decision)}>▸</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Trade-off box */}
                  <div className={cn("rounded-xl border p-4", colors.border, "bg-slate-950/50")}>
                    <p className={cn("text-xs font-bold uppercase tracking-widest mb-2", colors.label)}>
                      ⚖ Trade-off Considered
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed italic">
                      "{stage.tradeoffs}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Stage nav arrows */}
              <div className="flex justify-between mt-8 pt-5 border-t border-slate-800">
                <button
                  onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                  disabled={activeIndex === 0}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← Previous stage
                </button>
                <button
                  onClick={() => setActiveIndex(Math.min(workflowStages.length - 1, activeIndex + 1))}
                  disabled={activeIndex === workflowStages.length - 1}
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next stage →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile: accordion list */}
      <div className="lg:hidden space-y-1">
        {workflowStages.map((stage, i) => (
          <StageCard
            key={stage.id}
            stage={stage}
            isActive={mobileActive === i}
            onClick={() => toggleMobile(i)}
            isLast={i === workflowStages.length - 1}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
