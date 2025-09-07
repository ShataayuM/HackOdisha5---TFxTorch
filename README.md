# HackOdisha5---TFxTorch
# 🛡️ Ethical Lens: The AI Fact-Checker for Hack Odisha 5



**Ethical Lens is an AI-powered, dual-purpose tool designed to combat modern misinformation. It verifies news headlines against credible sources and detects sophisticated deepfake images, all through a clean and simple interface.**

This project was built in under 36 hours for the **[Hack Odisha 5](https://hackodisha-4.devfolio.co/overview)** hackathon.

---

## ✨ Key Features

* **📰 News Headline Verification:** Enter a news headline, and our Siamese Transformer-based NLP model will cross-reference it with a live database of articles from trusted sources via NewsAPI, returning the most similar and credible article.
* **🖼️ Deepfake Image Detection:** Upload an image, and our fine-tuned MobileNetV2 CNN model will analyze it to determine the probability of it being a deepfake.
* **🚀 Fast & Responsive:** Built with a modern tech stack (FastAPI + React) for a seamless user experience.

---

## 🛠️ How It Works

The application is a full-stack solution with a clear division between the user interface and the AI-powered backend.

1.  **Frontend:** The user interacts with a simple React (Vite) single-page application. They choose whether to analyze text or an image and submit their query.
2.  **Backend (API):** A FastAPI server receives the request. Based on the `type` of the request (`text` or `image`), it routes the data to the appropriate machine learning model.
3.  **AI Core - The Models:**
    * **NLP Model:** For text, the **[Siamese Transformer](./Backend/Siamese_Transformer_based_NLP_model/)** encodes the user's headline and a batch of recent, real headlines. It then uses **cosine similarity** to find the closest match, providing verification and a source link.
    * **CNN Model:** For images, the uploaded file is processed and fed into our **[MobileNetV2 CNN Model](./Backend/MobileNetV2_CNN_Model/)** which classifies it as either "Real" or "Deepfake".
4.  **Response:** The backend formats the model's output into a clean JSON response, which the frontend then displays to the user in a human-readable format.

---
                                                                                                                                          
## 💻 Tech Stack

| Area      | Technology                                                                                                                                                                                             |
| :-------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | [React](https://reactjs.org/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)                                                                                                     |
| **Backend** | [Python](https://www.python.org/), [FastAPI](https://fastapi.tiangolo.com/)                                                                                                                             |
| **AI Models** | **Image:** [PyTorch](https://pytorch.org/), MobileNetV2 <br> **Text:** [TensorFlow/Keras](https://www.tensorflow.org/), Siamese Networks, Sentence Transformers                                              |
| **APIs** | [NewsAPI](https://newsapi.org/) for real-time news data                                                                                                                                                |

---

**Quick Access Links:**
* [**Backend Code**](./Backend/)
* [**Frontend Code**](./Frontend/)
* [**API Contract**](./APICONTRACT.md)

---

## 🎗️ **Deployments:**

1. [Hugging Face Face Scan model](https://huggingface.co/spaces/rxhxss/DeepFake_Detection)

2. [StreamLit NLP model](https://siamese-transformer-based-nlp-model-zejz55gvj8datbgloyxv2a.streamlit.app/) 


## 📂 Repository Structure

Here is a map of our repository, with links to key directories and files.
```
├── Backend
│   ├── MobileNetV2_CNN_Model
│   │   ├── Deepfake_Detection_new.pth      # The trained PyTorch model weights
│   │   └── README.md
│   └── Siamese-Transformer-based NLP model
│       ├── siamese_model.weights(2).h5     # The trained Keras model weights
│       ├── siamese_model_architecture(2).json
│       ├── siamese_model_full(2).keras
│       └── README.md
├── Frontend
│   ├── public
│   └── src
│       ├── App.jsx                         # Main React component
│       └── index.css
├── .gitignore
├── APICONTRACT.md                          # Defines the request/response structure
└── README.md                               # You are here!


```
### Prerequisites

* Python 3.8+
* Node.js v16+
* Pytorch 2.x+
* A NewsAPI Key (get one for free at [newsapi.org](https://newsapi.org/))

