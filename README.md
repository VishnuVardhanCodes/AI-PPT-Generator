# 🎨 AI PPT Generator (Frontend)

Welcome to the **AI PPT Generator**! This application leverages the power of **Groq Cloud (LLaMA 3)** and **PptxGenJS** to transform a simple topic into a professional, multi-slide PowerPoint presentation with relevant images and structured content in seconds.

## 🚀 Get Started

### 1. Configure Environment
Create a `.env` file in the `frontend/` directory:
```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

### 2. Installation
Install the required dependencies:
```bash
npm install
```

### 3. Development Mode
Start the development server:
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

## 🛠 Features

-   **Intelligent Topic Analysis**: Generates comprehensive presentation outlines based on a single topic.
-   **Structured Slides**: Automatic generation of Title, Content, and Conclusion slides.
-   **Image Integration**: Uses relevant keywords to fetch high-quality images for each slide.
-   **One-Click Download**: Generates a `.pptx` file ready for use.
-   **High Fidelity UI**: Dark-themed, modern interface with smooth animations and professional aesthetics.

## 🏗 Technology Stack

-   **Frontend**: React + TypeScript
-   **Build Tool**: Vite
-   **LLM Integration**: Groq API (Meta LLaMA 3)
-   **Icons**: Lucide React
-   **Animations**: Framer Motion (Optional/Included)

## 📂 Project Structure

```text
frontend/
├── src/
│   ├── components/   # UI Components
│   ├── services/     # AI and PPT Logic
│   ├── styles/       # Global & Component Styles
│   └── utils/        # Helper functions
├── .env              # API Keys (Git ignored)
├── index.html        # Entry Point
└── package.json      # Dependencies
```

## ⚖ License
This project is licensed under the MIT License.
