import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { QuizProvider } from './contexts/QuizContext';

const container = document.getElementById('root');
const root = createRoot(container);

// Create a wrapper component to handle theme
function ThemedApp() {
  return (
    <React.StrictMode>
      <QuizProvider>
        <App />
      </QuizProvider>
    </React.StrictMode>
  );
}

root.render(<ThemedApp />);