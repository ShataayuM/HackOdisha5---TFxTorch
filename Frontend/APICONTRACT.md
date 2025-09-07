# API Contract: Misinformation Detector

This document outlines the API contract for the misinformation detection service. The backend and frontend teams must adhere to this contract to ensure smooth integration.

---

## Endpoint: `/analyze`

The single endpoint for all analysis requests.

* **Method:** `POST`
* **URL:** `/analyze`
* **Content-Type:** `application/json`




---

## Request Body

```json
{
  "type": "<string>",   // "text" or "image"
  "data": "<string>",   // headline string (for text) OR base64 data URI string (for image)
  "metadata": {         // optional
    "language": "en",
    "source_url": null,
    "timestamp": null
  }
}
```

### Case 1: Text Analysis (Headline Verification)

* `type`: `"text"`
* `data`: The headline string to be verified.

#### Example Request:
```json
{
  "type": "text",
  "data": "Politician Announces Four-Day Weekend for All Workers",
  "metadata": {
    "language": "en"
  }
}

```
#### Example JSON Response -- Positive:
```json
{
  "verdict": "VERIFIED",
  "status": "✅ Verified",
  "confidence_score": 0.92,
  "similarity_score": 0.92,
  "evidence": [
    {
      "source": "BBC News",
      "url": "https://example.com/bbc-article",
      "snippet": "Politician announces four-day weekend after parliament passes bill...",
      "published_at": "2025-09-01T08:00:00Z"
    }
  ],
  "original_headline": "Politician Announces Four-Day Weekend for All Workers",
  "processed_at": "2025-09-07T05:00:00Z"
}

```
#### Example JSON Response --Negative:
```json
{
  "verdict": "MISINFORMATION",
  "status": "🚫 Likely False / Misinformation",
  "confidence_score": 0.87,
  "similarity_score": 0.15,
  "evidence": [
    {
      "source": "No reliable match",
      "url": null,
      "snippet": "No corroborating reports from reliable outlets found for this exact claim."
    }
  ],
  "original_headline": "Politician Announces Four-Day Weekend for All Workers",
  "processed_at": "2025-09-07T05:02:00Z"
}


```


### Case 2: Image Analysis (Deepfake Detection)
* `type`: `"image"`
* `data`:  `"The image file encoded in a string"`
#### Example JSON Payload:
```json
{
  "type": "image",
  "data": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEA..."
}

```
#### Example JSON Positive Response:
```json
{
  "verdict": "DEEPFAKE",
  "status": "🚨 Likely Deepfake",
  "confidence_score": 0.88,
  "model": "deepfake-detector-v1",
  "explanations": {
    "artifacts_detected": [
      "inconsistent_eye_reflections",
      "face_warping",
      "temporal_inconsistency"
    ],
    "heatmap": "data:image/png;base64,..."  // optional visual heatmap of suspicious regions
  },
  "processed_at": "2025-09-07T05:10:00Z"
}
```
#### Example JSON Negative Response:
```json
{
  "verdict": "AUTHENTIC",
  "status": "✅ Likely Authentic",
  "confidence_score": 0.91,
  "model": "deepfake-detector-v1",
  "explanations": {
    "artifacts_detected": [],
    "notes": "No significant manipulation artifacts detected; lighting and facial landmarks consistent."
  },
  "processed_at": "2025-09-07T05:11:00Z"
}

```
#### Example JSON Error Response:
* HTTP/1.1 400 Bad Request
```json
{
  "detail": "Invalid request type specified. Must be 'text' or 'image'."
}
```

* HTTP/1.1 400 Bad Request
 ```json
{
  "detail": "Missing 'data' field or 'data' is empty."
}
```

* HTTP/1.1 415 Unsupported Media Type
```json
{
  "detail": "Unsupported image format. 'data' must be a base64-encoded image (data URI recommended)."
}
```

* HTTP/1.1 422 Unprocessable Entity
```json
{
  "detail": "Could not process the submitted content."
}
```
HTTP/1.1 500 Internal Server Error
```json
{
  "detail": "Internal processing error. Try again later."
}
```





