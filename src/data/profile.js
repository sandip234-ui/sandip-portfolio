/**
 * profile.js
 * Single source of truth for personal info, social links, education, and achievements.
 */
import avatarImg from "./Sandip_Professional_image.png";

export const profile = {
  name: "Sandip Biswal",
  tagline: "AI/ML Engineer | Computer Vision | LLM Systems",
  
  bio: "AI/ML-focused Computer Science undergraduate with hands-on experience in deep learning, computer vision, and LLM-based systems. I build end-to-end AI pipelines including real-time inference, model deployment, and full-stack integration. Currently exploring Agentic AI, RAG pipelines, and multimodal systems.",
  
  location: "Bhubaneswar, Odisha, India",
  email: "230301120115@centurionuniv.edu.in",
  
  resumeUrl: "https://drive.google.com/file/d/1vOrWQ0u8H-pn6bSxguztgs82v2xeHy-A/view?usp=sharing",
  
  avatar: avatarImg,

  social: {
    github: "https://github.com/sandip234-ui",
    linkedin: "https://www.linkedin.com/in/sandip-biswal-728a7a291/",
    kaggle: "https://www.kaggle.com/sandipbiswal711",
    twitter: "https://x.com/BiswalSand18094",
    huggingface: "https://huggingface.co/sandip28",
  },

  education: [
    {
      degree: "B.Tech – Computer Science & Engineering",
      institution: "Centurion University of Technology & Management, Bhubaneswar",
      period: "2023 – 2027",
      cgpa: "9.16 / 10",
      highlights: [
        "Focused on AI/ML, Computer Vision, and Full-Stack Systems",
        "Hands-on projects in deep learning and real-time AI applications",
      ],
    },
  ],

  achievements: [
    { label: "CGPA 9.16 (Top Academic Performer)", icon: "📊" },
    { label: "Built real-world AI systems using YOLOv8 & LLMs", icon: "🚀" },
    { label: "Active GitHub contributor with consistent commits", icon: "💻" },
    { label: "Participated in multiple hackathons and coding events", icon: "🏁" },
  ],

  stats: [
    { label: "AI/ML Projects", value: "5+" },
    { label: "Full-Stack Projects", value: "5+" },
    { label: "Technologies Used", value: "15+" },
    { label: "Core Domains", value: "AI • CV • LLM" },
  ],
};