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

## 🔧 Deployment Link:

[Click Here](https://siamese-transformer-based-nlp-model-zejz55gvj8datbgloyxv2a.streamlit.app/)

---

## 🚀 How to Use

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/ethical-lens.git
   cd ethical-lens
   ```
2. **Install dependencies:**
   ```bash
   pip install tensorflow transformers requests
   ```
3. **Run verification script:**
   ```bash
   import tensorflow as tf
   import numpy as np
   import requests
   from transformers import AutoTokenizer
   
   # Load model
   model = tf.keras.models.load_model('path/to/your/ethical_lens_nlp_model.keras')
   tokenizer = AutoTokenizer.from_pretrained('keras-io/distilbert-base-en-uncased')
   
   # Extract encoder
   inference_encoder = model.get_layer('encoder')
   
   # API Key
   NEWS_API_KEY = "YOUR_NEWS_API_KEY"
   
   def verify_headline(user_headline: str, api_key: str):
       url = f"https://newsapi.org/v2/everything?q=\"{user_headline}\"&searchIn=title&sortBy=relevancy&pageSize=20&sources=reuters,associated-press,bbc-news&apiKey={api_key}"
       try:
           response = requests.get(url)
           response.raise_for_status()
           articles = response.json().get("articles", [])
           if not articles:
               return {"status": "Unverified", "evidence": "No similar articles found.", "trust_score": 20}
       except requests.exceptions.RequestException as e:
           return {"status": "Error", "evidence": f"NewsAPI connection failed: {e}", "trust_score": 0}
   
       real_headlines = [article['title'] for article in articles]
   
       user_tokens = tokenizer(user_headline, return_tensors='tf', truncation=True, padding=True)
       real_tokens = tokenizer(real_headlines, return_tensors='tf', truncation=True, padding=True)
   
       user_embedding = inference_encoder.predict(user_tokens.data, verbose=0)
       real_embeddings = inference_encoder.predict(real_tokens.data, verbose=0)
   
       user_embedding_norm = user_embedding / np.linalg.norm(user_embedding)
       real_embeddings_norm = real_embeddings / np.linalg.norm(real_embeddings, axis=1, keepdims=True)
       cosine_scores = np.dot(real_embeddings_norm, user_embedding_norm.T).flatten()
   
       best_match_idx = np.argmax(cosine_scores)
       highest_score = cosine_scores[best_match_idx]
       best_match_headline = real_headlines[best_match_idx]
       trust_score = int(highest_score * 100)
   
       if highest_score > 0.8:
           return {"status": "Verified", "evidence": f"Similar article found: '{best_match_headline}'", "trust_score": trust_score}
       else:
           return {"status": "Unverified", "evidence": f"Closest match: '{best_match_headline}'", "trust_score": max(20, trust_score)}
   
   # Example
   if NEWS_API_KEY != "YOUR_NEWS_API_KEY":
       headline_to_check = "Major tech company announces new AI model"
       result = verify_headline(headline_to_check, NEWS_API_KEY)
       print(f"Checking: '{headline_to_check}'\nResult: {result}")
   else:
       print("Please replace 'YOUR_NEWS_API_KEY' to run the example.")
   ```
   


