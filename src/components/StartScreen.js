import { useState } from 'react';
import { useQuiz } from '../contexts/QuizContext';

const StartScreen = ({ onStart }) => {
  const { quizSettings, toggleTimer, toggleDarkMode, updateQuestionTime } = useQuiz();
  const [numQuestions, setNumQuestions] = useState(5);

  const handleStart = () => {
    onStart(numQuestions);
  };

  return (
    <div className="start-screen">
      <h1>Welcome to the Quiz App</h1>
      <p>Test your knowledge with our interactive quiz!</p>
      
      <div className="settings-panel">
        <h2>Quiz Settings</h2>
        
        <div className="setting">
          <label>
            Number of Questions:
            <input
              type="number"
              min="1"
              max="10"
              value={numQuestions}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 1;
                setNumQuestions(Math.min(10, Math.max(1, value)));
              }}
            />
          </label>
        </div>
        
        <div className="setting">
          <label>
            <input
              type="checkbox"
              checked={quizSettings.timerEnabled}
              onChange={toggleTimer}
            />
            Enable Timer
          </label>
        </div>
        
        {quizSettings.timerEnabled && (
          <div className="setting">
            <label>
              Time per Question (seconds):
              <input
                type="number"
                min="5"
                max="60"
                value={quizSettings.questionTime}
                onChange={(e) => {
                  const time = parseInt(e.target.value) || 30;
                  updateQuestionTime(Math.min(60, Math.max(5, time)));
                }}
              />
            </label>
          </div>
        )}
        
        <div className="setting">
          <label>
            <input
              type="checkbox"
              checked={quizSettings.darkMode}
              onChange={toggleDarkMode}
            />
            Dark Mode
          </label>
        </div>
      </div>
      
      <button className="start-button" onClick={handleStart}>
        Start Quiz
      </button>
    </div>
  );
};

export default StartScreen;