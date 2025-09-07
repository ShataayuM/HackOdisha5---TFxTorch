# Siamese Transformer-based NLP model📰🔍

A powerful headline verification tool designed to combat misinformation by checking the semantic similarity of a given headline against a database of trusted news sources in real-time.  
This model is fine-tuned to understand the nuances of sentence meaning, providing a reliable **"trust score"** for any news claim.

---

## 🎯 Project Goal

The primary objective of this project is to create a robust NLP model that can:

- Take a user-submitted news headline.  
- Compare it against recently published articles from reputable sources (e.g., Reuters, AP, BBC News).  
- Return a verification status (**Verified** or **Unverified**), a trust score, and the most similar article as evidence.  

---

## 🛠️ Tech Stack & Libraries

| Technology               | Description |
|---------------------------|-------------|
| **Python**               | Core programming language. |
| **TensorFlow / Keras**   | Deep learning framework used for building and training the model. |
| **Hugging Face Transformers** | For accessing the pre-trained DistilBERT model and tokenizer. |
| **Hugging Face Datasets** | To efficiently load and preprocess the training data. |
| **Google Colab**         | For GPU-accelerated model training. |
| **NewsAPI.org**          | To fetch real-time news articles for verification. |

---

## 🧠 Model Architecture: Siamese Network

This project uses a **Siamese Network architecture**, which is ideal for similarity and comparison tasks.

**How it works:**

1. **Two Inputs** → The model takes two sentences as input.  
2. **Shared Encoder** → Both inputs are passed through the same encoder (DistilBERT) to generate embeddings.  
3. **Similarity Calculation** → Embeddings are compared using **Cosine Similarity**.  
4. **Final Layers** → Dense, Dropout, and Concatenate layers produce the final similarity score.  

---

## 📚 Dataset: GLUE STS-B

- **Content:** Sentence pairs from news headlines, captions, and forums.  
- **Labels:** Human-rated similarity score from `0` (different) to `5` (equivalent).  
- **Why STS-B?** Perfect for teaching semantic similarity, which is central to headline verification.  

---

## ⚙️ Training Process

**Two-stage fine-tuning strategy:**

1. **Stage 1: Feature Extraction (5 Epochs)**  
   - Base DistilBERT frozen.  
   - Only new Siamese layers trained.  

2. **Stage 2: Fine-Tuning (12 Epochs)**  
   - Top 4 layers of DistilBERT unfrozen.  
   - Trained with lower learning rate.  

---

## 📊 Evaluation Metrics

| Metric                      | Final Value | Interpretation |
|------------------------------|-------------|----------------|
| **Validation Loss (MSE)**   | `0.0715`    | Low error between predicted & actual scores. |
| **Validation Pearson Corr.**| `0.4219`    | Positive correlation between predictions & truth. |

---

## 🚀 How to Use

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ethical-lens.git
   cd ethical-lens

