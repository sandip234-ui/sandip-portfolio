export const projects = [
  {
    id: "weapon-detection",
    title: "Weapon Detection System (YOLOv8)",
    category: "Computer Vision",
    status: "completed",
    featured: true,
    isFeatured: true,
    featuredOrder: 1,
    year: 2025,
    emoji: "🔫",
    accentColor: "red",

    problem:
      "Security systems lack real-time automated weapon detection, relying heavily on manual monitoring which leads to delayed response in critical situations.",

    approach:
      "Built a real-time detection pipeline using YOLOv8 with OpenCV. Integrated webcam/RTSP input, frame-by-frame inference, and alert mechanisms including sound alerts, email notifications with snapshots, and CSV logging.",

    tech: ["YOLOv8", "OpenCV", "Python", "Flask", "Streamlit"],

    results: [
      { label: "Detection Type", value: "Real-time", highlight: true },
      { label: "Input", value: "Video + Live Camera", highlight: true },
      { label: "Alerts", value: "Sound + Email" },
      { label: "Logging", value: "CSV + Frame Storage" },
    ],

    impact:
      "Provides a practical AI-based surveillance system that can be used in real-world security environments for faster threat detection and response.",

    github: "https://github.com/sandip234-ui/weapon-detection-system",
    demo: null,
  },

  {
    id: "multimodal-emotion-ai",
    title: "Multimodal Emotion Recognition System",
    category: "AI / Multimodal",
    status: "completed",
    featured: true,
    isFeatured: true,
    featuredOrder: 2,
    year: 2025,
    emoji: "🧠",
    accentColor: "violet",

    problem:
      "Traditional emotion detection systems rely on a single modality, limiting accuracy and contextual understanding of human emotions.",

    approach:
      "Designed a multimodal AI system combining facial expression recognition and speech emotion recognition. Built a pipeline integrating deep learning models with a Streamlit dashboard for real-time interaction.",

    tech: ["Deep Learning", "Computer Vision", "Speech Processing", "Streamlit"],

    results: [
      { label: "Modalities", value: "Face + Speech", highlight: true },
      { label: "Interface", value: "Streamlit Dashboard", highlight: true },
      { label: "Type", value: "Real-time Analysis" },
    ],

    impact:
      "Enhances human-computer interaction by enabling systems to better understand emotional context across multiple input channels.",

    github: "https://github.com/sandip234-ui/human-sense-ai-multimodal-emotion-recognition",
    demo: null,
  },

  {
    id: "weather-app",
    title: "Weather App (Full-Stack)",
    category: "Full Stack",
    status: "completed",
    featured: false,
    isFeatured: true,
    featuredOrder: 3,
    year: 2025,
    emoji: "🌦️",
    accentColor: "sky",

    problem:
      "Users need a simple and responsive interface to access real-time weather data with clean visualization.",

    approach:
      "Built a responsive weather application using API integration, handling asynchronous data fetching and UI rendering using React and Tailwind CSS.",

    tech: ["React", "Tailwind CSS", "JavaScript", "API"],

    results: [
      { label: "Type", value: "Real-time Weather", highlight: true },
      { label: "UI", value: "Responsive Design", highlight: true },
      { label: "Data Source", value: "Weather API" },
    ],

    impact:
      "Demonstrates strong frontend skills and API handling for real-world applications.",

    github: "https://github.com/sandip234-ui/weather_app",
    demo: null,
  },

  {
    id: "stopwatch-app",
    title: "Stopwatch Web Application",
    category: "Frontend",
    status: "completed",
    featured: false,
    isFeatured: false,
    featuredOrder: 99,
    year: 2025,
    emoji: "⏱️",
    accentColor: "amber",

    problem:
      "Basic stopwatch implementations lack lap tracking and interactive UI.",

    approach:
      "Developed a stopwatch application with lap tracking functionality and dynamic UI updates using JavaScript.",

    tech: ["JavaScript", "HTML", "Tailwind CSS"],

    results: [
      { label: "Feature", value: "Lap Tracking", highlight: true },
      { label: "UI", value: "Interactive Controls" },
    ],

    impact:
      "Strengthened frontend logic and state management understanding.",

    github: "https://github.com/sandip234-ui/Stopwatch_Web_Application",
    demo: null,
  },

  {
    id: "ecommerce-landing",
    title: "Responsive E-commerce Landing Page",
    category: "Frontend",
    status: "completed",
    featured: false,
    isFeatured: true,
    featuredOrder: 4,
    year: 2025,
    emoji: "🛍️",
    accentColor: "pink",

    problem:
      "Need for modern, responsive UI design for e-commerce platforms.",

    approach:
      "Built a fully responsive landing page using Tailwind CSS focusing on layout, responsiveness, and user experience.",

    tech: ["HTML", "Tailwind CSS", "JavaScript"],

    results: [
      { label: "Design", value: "Responsive UI", highlight: true },
      { label: "Focus", value: "UX + Layout" },
    ],

    impact:
      "Improved frontend design skills and responsive development techniques.",

    github: "https://github.com/sandip234-ui/responsive_ecom_landing_page",
    demo: null,
  },
];

export const projectCategories = [
  "All",
  ...new Set(projects.map((p) => p.category)),
];