import styled, { keyframes } from 'styled-components';

// Keyframes for background animation
const moveBackground = keyframes`
  from {
    background-position: 0 0;
  }
  to {
    background-position: 100% 100%;
  }
`;

// Keyframes for the sparkling effect on the spinner
const sparkle = keyframes`
  0% { box-shadow: 0 0 0px #007bff; }
  50% { box-shadow: 0 0 15px #007bff, 0 0 30px #007bff, 0 0 45px #007bff; }
  100% { box-shadow: 0 0 0px #007bff; }
`;

export const Background = styled.div`
  min-height: 100vh;
  background-color: #0c0f16;
  background-image:
    radial-gradient(circle at top left, #2a3b61 0%, transparent 40%),
    radial-gradient(circle at bottom right, #3c2a61 0%, transparent 40%),
    url('data:image/svg+xml,%3Csvg width="6" height="6" viewBox="0 0 6 6" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.1" fill-rule="evenodd"%3E%3Cpath d="M0 0h3v3H0V0zm3 3h3v3H3V3z"/%3E%3C/g%3E%3C/svg%3E');
  background-size: cover, cover, 100px 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
  color: #c9d1d9;
  padding: 1rem;
  box-sizing: border-box;
  animation: ${moveBackground} 120s linear infinite;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 450px;
  padding: 3rem 2.5rem;
  background-color: rgba(22, 27, 34, 0.85);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  text-align: center;
  border: 1px solid rgba(48, 54, 61, 0.5);
  margin: auto;
  position: relative;
  z-index: 1;

  /* This is the edited part to fix the scrolling issue */
  ${props => props.$isResultVisible && `
    min-height: 100vh;
    padding-bottom: 50px;
    overflow-y: auto;
  `}

  @media (max-width: 600px) {
    padding: 2rem 1.5rem;
  }
`;

export const Title = styled.h1`
  font-size: 2.5em;
  color: #e6edf3;
  margin-bottom: 0.5rem;
  @media (max-width: 600px) {
    font-size: 2em;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.1em;
  color: #8b949e;
  margin-bottom: 2rem;
  @media (max-width: 600px) {
    font-size: 1em;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  font-size: 1.1em;
  background-color: #0d1117;
  color: #c9d1d9;
  border: 1px solid #30363d;
  border-radius: 8px;
  box-sizing: border-box;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }
  &::placeholder {
    color: #6a737d;
  }
`;

export const OrSeparator = styled.p`
  color: #8b949e;
  margin: 1rem 0;
  font-size: 0.9em;
`;

// New base style for buttons
const StyledButton = styled.button`
  width: 100%;
  padding: 16px 24px;
  font-size: 1.2em;
  font-weight: bold;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 0 15px rgba(0, 123, 255, 0.5);
  
  &:hover {
    background-color: #0056b3;
    box-shadow: 0 0 20px rgba(0, 123, 255, 0.7);
  }
  &:disabled {
    background-color: #30363d;
    color: #8b949e;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

// Refactored Button to extend the new styled component
export const Button = styled(StyledButton)`
  margin-top: 1rem;
`;

// Refactored FileInputLabel to extend the new styled component
export const FileInputLabel = styled(StyledButton).attrs({ as: 'label' })`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(193, 206, 219, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite, ${sparkle} 2s ease-in-out infinite alternate;
  margin: 2rem auto 1rem auto;
  position: relative;
  z-index: 2;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const LoadingText = styled.p`
  color: #e6edf3;
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const LoadingSubtext = styled.p`
  color: #8b949e;
  font-size: 1em;
`;

export const ResultCard = styled.div`
  background-color: #0d1117;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  text-align: left;
  margin-top: 2rem;
  border: 1px solid #30363d;
  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`;

export const Status = styled.h2`
  color: ${props => props.isSafe ? '#28a745' : '#dc3545'};
  margin-bottom: 1rem;
`;

export const ErrorMessage = styled.p`
  color: #dc3545;
  margin-top: 1rem;
`;
