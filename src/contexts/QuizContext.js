import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const QuizContext = createContext();

export const useQuiz = () => {
  return useContext(QuizContext);
};

export const QuizProvider = ({ children }) => {
  const [quizSettings, setQuizSettings] = useLocalStorage('quizSettings', {
    timerEnabled: true,
    questionTime: 30, // seconds per question
    darkMode: false
  });

  const toggleTimer = () => {
    setQuizSettings(prev => ({
      ...prev,
      timerEnabled: !prev.timerEnabled
    }));
  };

 const toggleDarkMode = () => {
  console.log('Toggling dark mode');
  setQuizSettings(prev => {
    const newSettings = {
      ...prev,
      darkMode: !prev.darkMode
    };
    console.log('New settings:', newSettings);
    return newSettings;
  });
};
  const updateQuestionTime = (time) => {
    setQuizSettings(prev => ({
      ...prev,
      questionTime: time
    }));
  };

  return (
    <QuizContext.Provider
      value={{
        quizSettings,
        toggleTimer,
        toggleDarkMode,
        updateQuestionTime
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};