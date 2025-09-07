
# Deepfake Image Detection using MobileNetV2 🤖

A lightweight and efficient deep learning model built to classify images as either **real** or **deepfake**. This project leverages the MobileNetV2 architecture, fine-tuned on a specialized Kaggle dataset to achieve high accuracy in detecting manipulated images.

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue.svg)](https://www.python.org/downloads/)
[![Pytorch](https://img.shields.io/badge/PyTorch-2.x-red.svg?logo=pytorch&logoColor=white)](https://pytorch.org/)


---

## 📜 Overview

With the rise of generative AI, distinguishing authentic media from synthetic (deepfake) media has become a critical challenge. This project addresses this issue by implementing a robust deepfake detection system. The model is trained to identify subtle artifacts and inconsistencies in images that are often invisible to the naked eye.



---

## ⚙️ Model Architecture

The solution is centered around **MobileNetV2**, a state-of-the-art convolutional neural network known for its computational efficiency and strong performance.

* **Pre-trained Base:** Utilizes weights pre-trained on the ImageNet dataset, leveraging transfer learning.
* **Custom Head:** A custom classification layer (GlobalAveragePooling2D, Dropout, and a Dense layer with a Sigmoid activation) is added on top of the base model for the binary classification task.
* **Fine-Tuning:** The entire model was fine-tuned to adapt its learned features specifically for deepfake detection. The last 3 blocks and the layers in it was unfreezed.

---

## 📊 Performance Metrics

The model was rigorously evaluated on unseen data from the validation and test sets. The results demonstrate its excellent generalization and predictive power.

### Validation Set Performance

| Metric | Score |
| :--- | :---: |
| **Accuracy** | 95.48% |
| **Precision** | 94.24% |
| **Recall** | 96.91% |
| **F1-Score** | 95.56% |

### Test Set Performance

| Metric | Score |
| :--- | :---: |
| **Accuracy** | 81% |
| **Precision** | 89.79% |
| **Recall** | 71.20% |
| **F1-Score** | 79.42% |

The strong and consistent scores across both datasets highlight the model's reliability in identifying deepfakes.

---

## 🚀 How to Get Started

### Prerequisites

* Python 3.8+
* Pytorch
* NumPy
* Matplotlib



## 💻 Technology Stack

* **Backend:** Python
* **Deep Learning:** Pytorch
* **Data Handling:**  NumPy
* **Dataset:** Kaggle's Deepfake and Real Images Dataset

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
