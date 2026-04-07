/**
 * App.jsx — Root application with React Router.
 * /               → Homepage (single-page portfolio)
 * /skills         → Full skills inventory
 * /projects       → All projects catalogue
 * /projects/:id   → Project detail page
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Skills } from "./sections/Skills";
import { Workflow } from "./sections/Workflow";
import { Projects } from "./sections/Projects";
import { Contact } from "./sections/Contact";
import { ChatBot } from "./components/chatbot/ChatBot";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";

/** Home — assembled single-page portfolio */
function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white antialiased">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Workflow />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"              element={<HomePage />} />
        <Route path="/skills"        element={<SkillsPage />} />
        <Route path="/projects"      element={<ProjectsPage />} />
        <Route path="/projects/:id"  element={<ProjectDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}