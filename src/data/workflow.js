export const workflowStages = [
  {
    step: "01",
    id: "problem",
    phase: "Define",
    title: "Problem Understanding",
    description:
      "I start by clearly defining the problem and understanding whether it can be solved using AI. I focus on identifying the type of task such as detection, classification, or recognition.",
    tools: ["Python", "Research", "Google"],
    decisions: [
      "Is this problem suitable for AI/ML?",
      "What type of model is required (CV / NLP)?",
      "What input and output format should be used?",
    ],
    tradeoffs:
      "More complex solutions can improve accuracy but increase system complexity and development time.",
    emoji: "🎯",
    accentColor: "violet",
  },

  {
    step: "02",
    id: "data",
    phase: "Data",
    title: "Data Collection & Preparation",
    description:
      "I collect datasets from sources like Kaggle or custom datasets and prepare them for training by cleaning, formatting, and organizing them properly.",
    tools: ["Pandas", "NumPy", "OpenCV"],
    decisions: [
      "Use public dataset vs custom dataset",
      "How to split training and testing data",
      "Handling missing or imbalanced data",
    ],
    tradeoffs:
      "Better data improves model performance, but collecting and cleaning data takes time.",
    emoji: "📂",
    accentColor: "cyan",
  },

  {
    step: "03",
    id: "model",
    phase: "Model",
    title: "Model Selection",
    description:
      "I select models based on the problem. For computer vision tasks, I use YOLO for real-time detection or CNNs for classification.",
    tools: ["YOLOv8", "TensorFlow", "Keras"],
    decisions: [
      "Use YOLO for real-time detection",
      "Use CNN for image classification tasks",
      "Choose model based on speed vs accuracy needs",
    ],
    tradeoffs:
      "High accuracy models are often slower, while real-time systems require faster but lighter models.",
    emoji: "🧠",
    accentColor: "emerald",
  },

  {
    step: "04",
    id: "training",
    phase: "Train",
    title: "Model Training",
    description:
      "I train models using prepared datasets and tune parameters to improve performance. I monitor training results and adjust accordingly.",
    tools: ["Python", "TensorFlow", "YOLOv8"],
    decisions: [
      "Adjust learning parameters based on results",
      "Monitor training accuracy and loss",
      "Avoid overfitting using validation data",
    ],
    tradeoffs:
      "More training improves accuracy but increases time and computational cost.",
    emoji: "⚡",
    accentColor: "amber",
  },

  {
    step: "05",
    id: "evaluation",
    phase: "Evaluate",
    title: "Testing & Evaluation",
    description:
      "I evaluate model performance using test data and check how well it performs in real-world scenarios.",
    tools: ["Confusion Matrix", "Accuracy Metrics"],
    decisions: [
      "Check accuracy and consistency",
      "Test on real-world data (video/images)",
      "Identify failure cases",
    ],
    tradeoffs:
      "Optimizing for high accuracy may reduce generalization if the model overfits.",
    emoji: "📊",
    accentColor: "sky",
  },

  {
    step: "06",
    id: "deployment",
    phase: "Deploy",
    title: "Deployment & Integration",
    description:
      "I integrate models into applications using Flask or Streamlit and build complete systems with real-time inputs and outputs.",
    tools: ["Flask", "Streamlit", "OpenCV"],
    decisions: [
      "Use Streamlit for quick UI dashboards",
      "Use Flask for backend integration",
      "Add features like alerts, logging, and real-time processing",
    ],
    tradeoffs:
      "Adding more features improves usability but increases system complexity.",
    emoji: "🚀",
    accentColor: "pink",
  },
];