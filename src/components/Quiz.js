import { useState, useEffect, useRef } from 'react';
import useShuffleQuestions from '../hooks/useShuffleQuestions';
import { useQuiz } from '../contexts/QuizContext';
import Question from './Question';
import QuizSummary from './QuizSummary';
import ProgressBar from './ProgressBar';
import quizData from '../quizData';

const Quiz = ({ numQuestions, onBackToStart }) => {
  const [questions, reshuffleQuestions] = useShuffleQuestions(quizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const { quizSettings } = useQuiz();
  
  const displayedQuestions = questions.slice(0, numQuestions);
  const currentQuestion = displayedQuestions[currentQuestionIndex];
  const totalQuestions = displayedQuestions.length;
  
  const timerRef = useRef(null);

  useEffect(() => {
    setStartTime(Date.now());
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAnswerSelect = (answer) => {
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    setSelectedAnswers(prev => [...prev, answer]);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    // Move to next question after a delay
    timerRef.current = setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        setEndTime(Date.now());
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const handleTimeUp = () => {
    handleAnswerSelect(null); // No answer selected
  };

  const handleRestart = () => {
    reshuffleQuestions();
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setScore(0);
    setQuizCompleted(false);
    setStartTime(Date.now());
    setEndTime(null);
  };

  const progress = ((currentQuestionIndex + (quizCompleted ? 1 : 0)) / totalQuestions) * 100;
  const timeTaken = endTime ? Math.round((endTime - startTime) / 1000) : 0;

  return (
    <div className="quiz-container">
      <ProgressBar progress={progress} />
      
      {!quizCompleted ? (
        <Question
          question={currentQuestion.question}
          options={currentQuestion.options}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          correctAnswer={currentQuestion.correctAnswer}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={totalQuestions}
          onAnswerSelect={handleAnswerSelect}
          onTimeUp={handleTimeUp}
          timerEnabled={quizSettings.timerEnabled}
          questionTime={quizSettings.questionTime}
        />
      ) : (
        <QuizSummary
          score={score}
          totalQuestions={totalQuestions}
          onRestart={handleRestart}
          timeTaken={timeTaken}
        />
      )}
      
      <button className="back-button" onClick={onBackToStart}>
        Back to Start
      </button>
    </div>
  );
};

export default Quiz;