/**
 * sections/About.jsx
 * About section: bio, education, and achievements.
 */

import { profile } from "../data/profile";
import { SectionWrapper, SectionHeading } from "../components/ui/SectionWrapper";

export function About() {
  return (
    <SectionWrapper id="about">
      <SectionHeading
        badge="About Me"
        title="Who I Am"
        subtitle="A quick look at my background, education, and what I've achieved so far."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Bio + achievements */}
        <div className="space-y-6">
          <p className="text-slate-300 text-lg leading-relaxed">{profile.bio}</p>
          <p className="text-slate-400 leading-relaxed">
            My work spans the full ML lifecycle — from data cleaning and EDA to
            model training, evaluation, and deployment. I enjoy working on
            problems that blend research and engineering.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {profile.achievements.map(({ label, icon }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/40 transition-colors"
              >
                <span className="text-xl">{icon}</span>
                <span className="text-slate-300 text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Education */}
        <div className="space-y-6">
          <h3 className="text-white font-semibold text-lg">Education</h3>
          {profile.education.map((edu) => (
            <div
              key={edu.degree}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-violet-500/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <h4 className="text-white font-semibold">{edu.degree}</h4>
                <span className="text-xs text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                  {edu.period}
                </span>
              </div>
              <p className="text-slate-400 text-sm mb-1">{edu.institution}</p>
              <p className="text-emerald-400 text-sm font-medium mb-3">
                CGPA: {edu.cgpa}
              </p>
              <ul className="space-y-1">
                {edu.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-slate-400 text-sm">
                    <span className="text-violet-400">▸</span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Location + contact info */}
          <div className="flex flex-wrap gap-3">
            <span className="flex items-center gap-1.5 text-slate-400 text-sm px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800">
              📍 {profile.location}
            </span>
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-1.5 text-slate-400 hover:text-violet-400 text-sm px-3 py-1.5 bg-slate-900 rounded-lg border border-slate-800 transition-colors"
            >
              ✉️ {profile.email}
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
