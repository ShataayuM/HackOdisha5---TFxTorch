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

| Technology               | Icon                                                                                                  | Description |
|---------------------------|-------------------------------------------------------------------------------------------------------|-------------|
| **Python**               | 🐍                                                                                                    | Core programming language. |
| **TensorFlow / Keras**   | ![TensorFlow Logo](https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg)           | Deep learning framework used for building and training the model. |
| **Hugging Face Transformers** | 🤗                                                                                             | For accessing the pre-trained DistilBERT model and tokenizer. |
| **Hugging Face Datasets** | ![HF Logo](https://huggingface.co/front/assets/huggingface_logo-noborder.svg)                       | To efficiently load and preprocess the training data. |
| **Google Colab**         | ![Colab](https://colab.research.google.com/img/colab_favicon_256px.png)                              | For GPU-accelerated model training. |
| **NewsAPI.org**          | 📡                                                                                                    | To fetch real-time news articles for verification. |

---

## 🧠 Model Architecture: Siamese Network

This project uses a **Siamese Network architecture**, which is ideal for similarity and comparison tasks.

**How it works:**

1. **Two Inputs** → The model takes two sentences as input.  
2. **Shared Encoder** → Both inputs are passed through the same encoder (DistilBERT) to generate embeddings.  
3. **Similarity Calculation** → Embeddings are compared using **Cosine Similarity**.  
4. **Final Layers** → Dense, Dropout, and Concatenate layers produce the final similarity score.  

---

## 📑 Model Summary

| Layer (type)              | Output Shape     | Param # | Connected to |
|----------------------------|------------------|---------|--------------|
| **input_ids_1 (InputLayer)** | (None, None)   | 0       | [] |
| **input_ids_2 (InputLayer)** | (None, None)   | 0       | [] |
| **attention_mask_1 (InputLayer)** | (None, None) | 0   | [] |
| **attention_mask_2 (InputLayer)** | (None, None) | 0   | [] |
| **encode_inputs_layer (EncodeInputsLayer)** | multiple | 0 | ['input_ids_1[0][0]', 'attention_mask_1[0][0]', 'input_ids_2[0][0]', 'attention_mask_2[0][0]'] |
| **lambda_1 (Lambda)**     | (None, 1)        | 0       | ['encode_inputs_layer[0][2]'] |
| **dot_1 (Dot)**           | (None, 1)        | 0       | ['lambda_1[0][0]'] |
| **concatenate_1 (Concatenate)** | (None, 3)   | 0       | ['lambda_1[0][0]', 'dot_1[0][0]'] |
| **dense_3 (Dense)**       | (None, 32)       | 128     | ['concatenate_1[0][0]'] |
| **dropout_1 (Dropout)**   | (None, 32)       | 0       | ['dense_3[0][0]'] |
| **dense_4 (Dense)**       | (None, 16)       | 528     | ['dropout_1[0][0]'] |
| **dense_5 (Dense)**       | (None, 1)        | 17      | ['dense_4[0][0]'] |

**Total params:** 213,221  
**Trainable params:** 213,221  
**Non-trainable params:** 0  

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

