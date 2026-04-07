export const skillCategories = [
  {
    id: "ml-ai",
    label: "Machine Learning & AI",
    icon: "🧠",
    color: "violet",
    skills: [
      {
        name: "Deep Learning (CNN)",
        highlight: true,
        usedFor: "Image-based model building for detection and recognition tasks",
        projects: ["weapon-detection", "multimodal-emotion-ai"],
      },
      {
        name: "YOLOv8",
        highlight: true,
        usedFor: "Real-time object detection for surveillance systems",
        projects: ["weapon-detection"],
      },
      {
        name: "Computer Vision",
        highlight: true,
        usedFor: "Image processing, frame analysis, and real-time video pipelines",
        projects: ["weapon-detection", "multimodal-emotion-ai"],
      },
      {
        name: "OpenCV",
        highlight: false,
        usedFor: "Video capture, frame processing, and preprocessing pipelines",
        projects: ["weapon-detection"],
      },
      {
        name: "TensorFlow / Keras",
        highlight: false,
        usedFor: "Building and experimenting with deep learning models",
        projects: ["multimodal-emotion-ai"],
      },
    ],
  },

  {
    id: "data",
    label: "Data & Programming",
    icon: "📊",
    color: "cyan",
    skills: [
      {
        name: "Python",
        highlight: true,
        usedFor: "Core language for ML pipelines, backend logic, and automation",
        projects: ["weapon-detection", "multimodal-emotion-ai"],
      },
      {
        name: "NumPy / Pandas",
        highlight: true,
        usedFor: "Data manipulation, preprocessing, and numerical operations",
        projects: ["multimodal-emotion-ai"],
      },
      {
        name: "Jupyter Notebook",
        highlight: false,
        usedFor: "Experimentation, model testing, and result visualization",
        projects: ["weapon-detection"],
      },
      {
        name: "SQL",
        highlight: false,
        usedFor: "Basic querying and structured data handling",
        projects: [],
      },
    ],
  },

  {
    id: "dev",
    label: "Development",
    icon: "💻",
    color: "emerald",
    skills: [
      {
        name: "Flask",
        highlight: true,
        usedFor: "Backend APIs and integration for AI systems",
        projects: ["weapon-detection"],
      },
      {
        name: "Streamlit",
        highlight: true,
        usedFor: "Building interactive dashboards for ML applications",
        projects: ["weapon-detection", "multimodal-emotion-ai"],
      },
      {
        name: "React",
        highlight: false,
        usedFor: "Frontend UI development for web applications",
        projects: ["weather-app"],
      },
      {
        name: "Node.js / Express",
        highlight: false,
        usedFor: "Backend development and API handling",
        projects: [],
      },
      {
        name: "Git & GitHub",
        highlight: false,
        usedFor: "Version control and project collaboration",
        projects: ["All"],
      },
    ],
  },

  {
    id: "tools",
    label: "Tools & Platforms",
    icon: "🛠️",
    color: "amber",
    skills: [
      {
        name: "Kaggle",
        highlight: false,
        usedFor: "Exploring datasets and practicing ML workflows",
        projects: [],
      },
      {
        name: "Hugging Face",
        highlight: false,
        usedFor: "Exploring models and AI deployment ecosystem",
        projects: [],
      },
      {
        name: "Google Colab",
        highlight: false,
        usedFor: "GPU-based experimentation and training",
        projects: ["weapon-detection"],
      },
      {
        name: "VS Code",
        highlight: false,
        usedFor: "Primary development environment",
        projects: ["All"],
      },
    ],
  },
];