/**
 * utils/cn.js
 * Lightweight class-name merging utility (no clsx dependency needed).
 * Usage: cn("base-class", condition && "conditional-class")
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
