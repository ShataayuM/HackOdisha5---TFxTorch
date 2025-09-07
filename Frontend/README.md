# Ethical Lens: Frontend

This project is the **frontend** for the Ethical Lens application — a tool designed to analyze and verify the authenticity of news headlines and images, with a focus on detecting **deepfakes**.

---

## 🚀 Project Overview

The frontend is a **single-page React application** that provides a user-friendly interface for interacting with the backend API.  
Users can choose to analyze either a **text-based news headline** or an **image file**, and the application displays analysis results including verdicts, confidence scores, and relevant evidence.

---

## ✨ Key Features

- **Dual Analysis Modes** – Supports both text and image input.  
- **Dynamic UI** – Interface adapts based on input type.  
- **Loading States** – Visual spinner + status messages during analysis.  
- **Result Display** – Shows verdicts, scores, evidence sources (for text), and artifacts (for images).  
- **Error Handling** – Displays clear error messages if analysis fails.  

---

## 🛠️ Technology Stack

- **React** – Core framework for building the UI.  
- **Styled Components** – Encapsulated styling for components.  
- **Axios** – HTTP client for communicating with the backend.  

---

## ⚙️ Setup and Installation

Make sure you have **Node.js** installed.

```bash
# Clone the repository
git clone [https://github.com/ShataayuM/HackOdisha5---TFxTorch.git]
cd [https://github.com/ShataayuM/HackOdisha5---TFxTorch.git]/frontend

# Install dependencies
npm install

# Run the application
npm start
