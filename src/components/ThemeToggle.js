import { useQuiz } from '../contexts/QuizContext';

const ThemeToggle = () => {
  const { quizSettings, toggleDarkMode } = useQuiz();
  
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleDarkMode}
      aria-label={quizSettings.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {quizSettings.darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};

export default ThemeToggle;