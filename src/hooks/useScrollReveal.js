/**
 * hooks/useScrollReveal.js
 * Lightweight Intersection Observer hook for reveal-on-scroll animations.
 * Usage: const { ref, isVisible } = useScrollReveal();
 * Apply `ref` to any element; animate when `isVisible` is true.
 */

import { useState, useEffect, useRef } from "react";

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // only trigger once
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px", ...options }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}
