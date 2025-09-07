import React, { useState } from 'react';
import axios from 'axios';
import {
  Background,
  Container,
  Title,
  Subtitle,
  InputGroup,
  Input,
  OrSeparator,
  FileInputLabel,
  HiddenFileInput,
  Button,
  Spinner,
  LoadingText,
  LoadingSubtext,
  ResultCard,
  Status,
  ErrorMessage
} from './StyledComponents';

const API_ENDPOINT = 'http://localhost:8000/analyze';

const FactChecker = () => {
  const [headline, setHeadline] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setHeadline('');
      setImageFile(file);
      setError('');
    }
  };

  const handleTextChange = (e) => {
    setImageFile(null);
    setHeadline(e.target.value);
    setError('');
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError('');

    const payload = {
      metadata: {
        language: 'en'
      }
    };

    if (headline) {
      payload.type = 'text';
      payload.data = headline;
    } else if (imageFile) {
      payload.type = 'image';
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onloadend = async () => {
        const base64String = reader.result; // Use the full data URI as per new contract
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
      setError('Please provide a headline or an image.');
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

  return (
    <Background>
      <Container>
        {!loading ? (
          <>
            <Title>Ethical Lens</Title>
            <Subtitle>Analyze headlines or deepfake images.</Subtitle>
            <InputGroup>
              <Input
                type="text"
                placeholder="Enter a headline to verify"
                value={headline}
                onChange={handleTextChange}
                disabled={!!imageFile || loading}
              />
              <OrSeparator>— OR —</OrSeparator>
              <HiddenFileInput
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleFileChange}
                disabled={!!headline || loading}
              />
              <FileInputLabel htmlFor="imageUpload">
                {imageFile ? imageFile.name : 'Upload an Image'}
              </FileInputLabel>
            </InputGroup>
            <Button onClick={handleSubmit} disabled={loading || (!headline && !imageFile)}>
              Analyze
            </Button>
          </>
        ) : (
          <>
            <Spinner />
            <LoadingText>Analyzing...</LoadingText>
            <LoadingSubtext>Our AI is examining the pixels and context.</LoadingSubtext>
          </>
        )}

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
      </Container>
    </Background>
  );
};

export default FactChecker;