/**
 * sections/Skills.jsx — homepage skills section.
 * Renders a scannable pill-based preview of all skill categories.
 * Full inventory is at /skills.
 */

import { SectionWrapper, SectionHeading } from "../components/ui/SectionWrapper";
import { SkillsPreview } from "../components/skills/SkillsPreview";

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionHeading
        badge="Skills"
        title="My Technical Toolkit"
        subtitle="Tools I've used across real projects — organized by domain."
      />
      <div className="max-w-3xl mx-auto">
        <SkillsPreview />
      </div>
    </SectionWrapper>
  );
}
