const QuizSummary = ({ 
  score, 
  totalQuestions, 
  onRestart,
  timeTaken 
}) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage >= 80) return "Excellent! You're a quiz master!";
    if (percentage >= 60) return "Good job! You know your stuff!";
    if (percentage >= 40) return "Not bad! Keep practicing!";
    return "Keep learning! You'll get better!";
  };

  return (
    <div className="quiz-summary">
      <h2>Quiz Completed!</h2>
      
      <div className="summary-stats">
        <div className="stat">
          <span className="stat-value">{score}/{totalQuestions}</span>
          <span className="stat-label">Correct Answers</span>
        </div>
        
        <div className="stat">
          <span className="stat-value">{percentage}%</span>
          <span className="stat-label">Score</span>
        </div>
        
        <div className="stat">
          <span className="stat-value">{timeTaken}s</span>
          <span className="stat-label">Time Taken</span>
        </div>
      </div>
      
      <p className="performance-message">{getPerformanceMessage()}</p>
      
      <div className="summary-actions">
        <button className="restart-button" onClick={onRestart}>
          Restart Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizSummary;