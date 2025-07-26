import { useState, useEffect } from 'react';
import { QuizProvider, useQuiz } from './contexts/QuizContext';
import StartScreen from './components/StartScreen';
import Quiz from './components/Quiz';
import Header from './components/Header';
import './styles/App.css';
import './styles/animations.css';
import './styles/themes.css';

// Wrapper component to handle theme application
function ThemedApp({ children }) {
  const { quizSettings } = useQuiz();
  
  // Apply dark mode class to body element
  useEffect(() => {
    if (quizSettings.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [quizSettings.darkMode]);

  return <div className={`app ${quizSettings.darkMode ? 'dark' : ''}`}>{children}</div>;
}

const AppContent = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);

  const handleStartQuiz = (num) => {
    setNumQuestions(num);
    setQuizStarted(true);
  };

  const handleBackToStart = () => {
    setQuizStarted(false);
  };

  return (
    <>
      <Header />
      <main className="main-content">
        {!quizStarted ? (
          <StartScreen onStart={handleStartQuiz} />
        ) : (
          <Quiz 
            numQuestions={numQuestions} 
            onBackToStart={handleBackToStart} 
          />
        )}
      </main>
    </>
  );
};

const App = () => {
  return (
    <QuizProvider>
      <ThemedApp>
        <AppContent />
      </ThemedApp>
    </QuizProvider>
  );
};

export default App;