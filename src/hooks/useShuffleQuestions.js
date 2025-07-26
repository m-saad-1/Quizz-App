import { useState } from 'react';

const useShuffleQuestions = (initialQuestions) => {
  const [questions, setQuestions] = useState(() => {
    // Shuffle the questions array
    const shuffled = [...initialQuestions].sort(() => Math.random() - 0.5);
    
    // Shuffle options for each question
    return shuffled.map(question => ({
      ...question,
      options: [...question.options].sort(() => Math.random() - 0.5)
    }));
  });

  const reshuffleQuestions = () => {
    setQuestions(prev => {
      const shuffled = [...prev].sort(() => Math.random() - 0.5);
      return shuffled.map(question => ({
        ...question,
        options: [...question.options].sort(() => Math.random() - 0.5)
      }));
    });
  };

  return [questions, reshuffleQuestions];
};

export default useShuffleQuestions;