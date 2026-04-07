/**
 * utils/projectSelectors.js
 * Pure selector functions for deriving project subsets.
 *
 * Centralising this logic here means:
 *  - The homepage, /projects page, and any future admin panel all use
 *    identical derivation rules.
 *  - Swapping the data source to an async API only requires updating the
 *    callers to await these functions — the selectors themselves stay the same.
 *
 * API-READY NOTE:
 *   When you add a backend, replace the `projects` import with an API call
 *   and convert these into async selectors / React Query query functions.
 *   Component code does not need to change.
 */

import { projects } from "../data/projects";

const MAX_FEATURED = 4;

/**
 * Returns homepage featured projects:
 *   1. Filter where isFeatured === true
 *   2. Sort by featuredOrder (ascending)
 *   3. Slice to MAX_FEATURED (4)
 *
 * Fallback: if no project has isFeatured === true, returns first MAX_FEATURED
 * projects in their original order (ensures the section is never empty).
 *
 * @returns {import("../data/projects").Project[]}
 */
export function getFeaturedProjects() {
  const featured = projects
    .filter((p) => p.isFeatured === true)
    .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99))
    .slice(0, MAX_FEATURED);

  // Fallback: nothing explicitly featured → use first 4
  if (featured.length === 0) {
    return projects.slice(0, MAX_FEATURED);
  }

  return featured;
}

/**
 * Returns all projects, sorted by featuredOrder (featured first) then by year
 * descending. Used by the /projects catalogue page.
 *
 * @returns {import("../data/projects").Project[]}
 */
export function getAllProjectsSorted() {
  return [...projects].sort((a, b) => {
    // Featured first
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    // Within featured: sort by featuredOrder
    if (a.isFeatured && b.isFeatured) {
      return (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99);
    }
    // Non-featured: most recent first
    return b.year - a.year;
  });
}

/** Total project count */
export const totalProjects = projects.length;

/** Count of projects with isFeatured === true */
export const totalFeatured = projects.filter((p) => p.isFeatured).length;
