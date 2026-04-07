/**
 * components/layout/Navbar.jsx
 * Sticky navigation bar with smooth-scroll links and mobile hamburger menu.
 * Highlights the active section on scroll using useActiveSection hook.
 * On non-home routes, nav links navigate back to home with the correct anchor.
 */

import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useActiveSection } from "../../hooks/useActiveSection";
import { cn } from "../../utils/cn";
import { profile } from "../../data/profile";

const NAV_LINKS = [
  { id: "hero",     label: "Home" },
  { id: "about",    label: "About" },
  { id: "skills",   label: "Skills" },
  { id: "workflow", label: "Process" },
  { id: "projects", label: "Projects" },
  { id: "contact",  label: "Contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate  = useNavigate();
  const isHome    = location.pathname === "/";

  const activeSection = useActiveSection(NAV_LINKS.map((l) => l.id));

  const handleNavClick = (id) => {
    setMenuOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate home and scroll once the page mounts
      navigate(`/#${id}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60">
      <nav className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-white font-bold text-lg tracking-tight hover:text-violet-400 transition-colors"
        >
          <span className="text-violet-400">&lt;</span>
          {profile.name.split(" ")[0]}
          <span className="text-violet-400">/&gt;</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ id, label }) => {
            const isActive = isHome
              ? activeSection === id
              : id === "skills" && location.pathname === "/skills";
            return (
              <li key={id}>
                <button
                  onClick={() => handleNavClick(id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-violet-500/20 text-violet-300"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  )}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-500/20"
        >
          Resume ↗
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={cn("w-5 h-0.5 bg-current mb-1.5 transition-all", menuOpen && "rotate-45 translate-y-2")} />
          <div className={cn("w-5 h-0.5 bg-current mb-1.5 transition-all", menuOpen && "opacity-0")} />
          <div className={cn("w-5 h-0.5 bg-current transition-all", menuOpen && "-rotate-45 -translate-y-2")} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-1">
          {NAV_LINKS.map(({ id, label }) => {
            const isActive = isHome
              ? activeSection === id
              : id === "skills" && location.pathname === "/skills";
            return (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-violet-500/20 text-violet-300"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                )}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
