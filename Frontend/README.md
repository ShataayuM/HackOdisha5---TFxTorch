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
npm run dev
```

The app will be available at:
👉 http://localhost:3000
 (or another port if 3000 is occupied)
---

## 🔌 API Integration

The frontend communicates with the backend API at:
http://localhost:8000/analyze


It sends a `POST` request with a JSON payload containing the **analysis type** (`text` or `image`) and the corresponding data.

---

### 📄 Example Payloads

#### Text Analysis
```json
{
  "type": "text",
  "data": "Politician Announces Four-Day Weekend for All Workers",
  "metadata": {
    "language": "en",
    "country": "us",
    "category": "technology",
    "pageSize": "5"
  }
}
{
  "type": "image",
  "data": "data:image/png;base64,...",
  "metadata": {
    "language": "en"
  }
}
```
---

## 🧪 Dummy Data for Development

The app includes **hard-coded dummy responses** so you can test without a running backend.  

Trigger these by entering the following text values or uploading image files with matching names:

### 🔤 Text Inputs

| Input Value            | Result Type       |
|-------------------------|------------------|
| `dummy-verified`        | ✅ Verified       |
| `dummy-misinformation`  | ❌ Misinformation |

### 🖼️ Image File Names (case-insensitive)

| File Name Contains      | Result Type   |
|--------------------------|---------------|
| `dummy-authentic`        | 🟢 Authentic  |
| `dummy-deepfake`         | 🔴 Deepfake   |

---

### 💡 Example Usage

#### Text Example
```json
{
  "type": "text",
  "data": "dummy-verified",
  "metadata": { "language": "en" }
}
```
#### Image Example

Upload an image named:
```
dummy-deepfake.png
```
and the app will return a sample Deepfake result.



