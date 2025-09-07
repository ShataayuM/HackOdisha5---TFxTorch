import React, { useState } from 'react';
import axios from 'axios';
import {
  Background,
  Container,
  Title,
  Subtitle,
  Button,
  Spinner,
  LoadingText,
  LoadingSubtext,
  ResultCard,
  Status,
  ErrorMessage,
  InputGroup,
  Input,
  FileInputLabel,
  HiddenFileInput
} from './StyledComponents';

// Dummy data for testing responses without API calls
const DUMMY_DATA = {
  text: {
    verdict: "VERIFIED",
    status: "Verified",
    confidence_score: 0.98,
    similarity_score: 0.92,
    evidence: [
      {
        source: "BBC News",
        url: "https://example.com/bbc-article",
        snippet: "Politician announces four-day weekend after parliament passes bill...",
        published_at: "2025-09-01T08:00:00Z"
      }
    ],
    original_headline: "Politician Announces Four-Day Weekend for All Workers",
    processed_at: "2025-09-07T05:00:00Z"
  },
  image: {
    verdict: "AUTHENTIC",
    status: "Likely Authentic",
    confidence_score: 0.91,
    model: "deepfake-detector-v1",
    explanations: {
      artifacts_detected: [],
      notes: "No significant manipulation artifacts detected; lighting and facial landmarks consistent."
    },
    processed_at: "2025-09-07T05:11:00Z"
  },
  misinformation: {
    verdict: "MISINFORMATION",
    status: "Likely False / Misinformation",
    confidence_score: 0.87,
    similarity_score: 0.15,
    evidence: [
      {
        source: "No reliable match",
        url: null,
        snippet: "No corroborating reports from reliable outlets found for this exact claim."
      }
    ],
    original_headline: "Politician Announces Four-Day Weekend for All Workers",
    processed_at: "2025-09-07T05:02:00Z"
  },
  deepfake: {
    verdict: "DEEPFAKE",
    status: "Likely Deepfake",
    confidence_score: 0.88,
    model: "deepfake-detector-v1",
    explanations: {
      artifacts_detected: [
        "inconsistent_eye_reflections",
        "face_warping",
        "temporal_inconsistency"
      ],
      heatmap: "data:image/png;base64,..."
    },
    processed_at: "2025-09-07T05:10:00Z"
  }
};

const API_ENDPOINT = 'http://localhost:8000/analyze';

const FactChecker = () => {
  const [headline, setHeadline] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');
  const [pageSize, setPageSize] = useState(''); // Initialized with an empty string

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setError('');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError('');

    // Dummy data logic
    if (headline.toLowerCase() === 'dummy-verified') {
      setLoading(false);
      setResult(DUMMY_DATA.text);
      return;
    }
    if (headline.toLowerCase() === 'dummy-misinformation') {
      setLoading(false);
      setResult(DUMMY_DATA.misinformation);
      return;
    }
    if (imageFile && imageFile.name.toLowerCase().includes('dummy-authentic')) {
      setLoading(false);
      setResult(DUMMY_DATA.image);
      return;
    }
    if (imageFile && imageFile.name.toLowerCase().includes('dummy-deepfake')) {
      setLoading(false);
      setResult(DUMMY_DATA.deepfake);
      return;
    }

    const payload = {
      metadata: {
        language: 'en'
      }
    };

    if (selectedOption === 'text') {
      if (!headline) {
        setLoading(false);
        setError('Please enter a headline.');
        return;
      }
      payload.type = 'text';
      payload.data = headline;
      payload.metadata.country = country;
      payload.metadata.category = category;
      payload.metadata.pageSize = pageSize;

    } else if (selectedOption === 'image') {
      if (!imageFile) {
        setLoading(false);
        setError('Please upload an image.');
        return;
      }
      payload.type = 'image';
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = async () => {
        const base64String = reader.result;
        payload.data = base64String;
        try {
          const response = await axios.post(API_ENDPOINT, payload);
          setResult(response.data);
        } catch (err) {
          console.error('API Error:', err.response ? err.response.data : err.message);
          setError(err.response?.data?.detail || 'Failed to analyze. Please try again.');
        } finally {
          setLoading(false);
        }
      };
      reader.onerror = (err) => {
        console.error("FileReader error:", err);
        setError("Could not read image file.");
        setLoading(false);
      };
      return;
    } else {
      setLoading(false);
      setError('Please select an option.');
      return;
    }

    try {
      const response = await axios.post(API_ENDPOINT, payload);
      setResult(response.data);
    } catch (err) {
      console.error('API Error:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.detail || 'Failed to analyze. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const isTextResult = result && (result.verdict === 'VERIFIED' || result.verdict === 'MISINFORMATION');
  const isImageResult = result && (result.verdict === 'DEEPFAKE' || result.verdict === 'AUTHENTIC');

  const getSubtitle = () => {
    switch (selectedOption) {
      case 'text':
        return "Analyze News Headlines and verify if  \"Fake\"";
      case 'image':
        return "Analyze deepfake images and verify if  \"Fake\"";
      default:
        return "Analyze headlines or deepfake images.";
    }
  };

  const renderForm = () => {
    if (selectedOption === 'text') {
      return (
        <InputGroup>
          <Input
            type="text"
            placeholder="Enter the news headline to verify"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Country (e.g., us)"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Category (e.g., technology)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Page Size (e.g., 5)"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
          />
          <Button onClick={handleSubmit}>Analyze Headline</Button>
        </InputGroup>
      );
    } else if (selectedOption === 'image') {
      return (
        <InputGroup>
          <HiddenFileInput
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleFileChange}
          />
          <FileInputLabel htmlFor="imageUpload">
            {imageFile ? imageFile.name : 'Upload Image'}
          </FileInputLabel>
          <Button onClick={handleSubmit}>Verify Deepfake Cases</Button>
        </InputGroup>
      );
    } else {
      return (
        <>
          <Button onClick={() => setSelectedOption('text')}>Verify News Headline</Button>
          <Button onClick={() => setSelectedOption('image')}>Verify DeepFake Faces</Button>
        </>
      );
    }
  };

  return (
    <Background>
      <Container>
        <Title>Ethical Lens</Title>
        <Subtitle>{getSubtitle()}</Subtitle>

        {!loading && !result && !error ? (
          renderForm()
        ) : loading ? (
          <>
            <Spinner />
            <LoadingText>Analyzing...</LoadingText>
            <LoadingSubtext>Our AI is examining the pixels and context.</LoadingSubtext>
          </>
        ) : (
          <>
            {result && (
              <ResultCard>
                <h3>Analysis Result</h3>
                <Status isSafe={result.verdict === 'VERIFIED' || result.verdict === 'AUTHENTIC'}>
                  {result.status}
                </Status>

                {isTextResult && (
                  <>
                    <p><strong>Original Headline:</strong> {result.original_headline}</p>
                    <p><strong>Confidence Score:</strong> {(result.confidence_score * 100).toFixed(2)}%</p>
                    <p><strong>Similarity Score:</strong> {(result.similarity_score * 100).toFixed(2)}%</p>
                    {result.evidence && result.evidence.length > 0 && (
                      <div>
                        <h4>Evidence:</h4>
                        <ul>
                          {result.evidence.map((item, index) => (
                            <li key={index}>
                              <a href={item.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff' }}>
                                {item.source}
                              </a>
                              : "{item.snippet}"
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}

                {isImageResult && (
                  <>
                    <p><strong>Confidence Score:</strong> {(result.confidence_score * 100).toFixed(2)}%</p>
                    {result.explanations && (
                      <>
                        {result.explanations.artifacts_detected && result.explanations.artifacts_detected.length > 0 && (
                          <div>
                            <h4>Artifacts Detected:</h4>
                            <ul>
                              {result.explanations.artifacts_detected.map((artifact, index) => (
                                <li key={index}>{artifact}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {result.explanations.notes && <p><strong>Notes:</strong> {result.explanations.notes}</p>}
                      </>
                    )}
                  </>
                )}
              </ResultCard>
            )}

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Button onClick={() => {
              setSelectedOption(null);
              setResult(null);
              setError('');
              setHeadline('');
              setImageFile(null);
            }} style={{ marginTop: '20px' }}>
              Start Over
            </Button>
          </>
        )}
      </Container>
    </Background>
  );
};

export default FactChecker;
