import { useState, useEffect } from 'react';
import AnswerOption from './AnswerOption';
import CountdownTimer from './CountdownTimer';

const Question = ({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  questionNumber,
  totalQuestions,
  onAnswerSelect,
  onTimeUp,
  timerEnabled,
  questionTime
}) => {
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    setShowResult(false);
  }, [question]);

  const handleAnswerSelect = (answer) => {
    onAnswerSelect(answer);
    setShowResult(true);
  };

  const handleTimeUp = () => {
    onTimeUp();
    setShowResult(true);
  };

  return (
    <div className="question-container">
      <div className="question-header">
        <span className="question-count">
          Question {questionNumber} of {totalQuestions}
        </span>
        {timerEnabled && !showResult && (
          <CountdownTimer 
            initialTime={questionTime} 
            onTimeUp={handleTimeUp} 
          />
        )}
      </div>
      
      <h2 className="question-text">{question}</h2>
      
      <ul className="options-list">
        {options.map((option, index) => (
          <AnswerOption
            key={index}
            option={option}
            isSelected={selectedAnswer === option}
            isCorrect={correctAnswer === option}
            showResult={showResult}
            onSelect={handleAnswerSelect}
          />
        ))}
      </ul>
      
      {showResult && (
        <div className="feedback">
          {selectedAnswer === correctAnswer ? (
            <p className="correct-feedback">Correct! Well done!</p>
          ) : (
            <p className="incorrect-feedback">
              Incorrect. The correct answer is <strong>{correctAnswer}</strong>.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Question;