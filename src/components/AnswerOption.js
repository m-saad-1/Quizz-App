const AnswerOption = ({ 
  option, 
  isSelected, 
  isCorrect, 
  showResult, 
  onSelect 
}) => {
  const getOptionClass = () => {
    if (!showResult) {
      return isSelected ? 'selected' : '';
    }
    
    if (isCorrect) {
      return 'correct';
    }
    
    if (isSelected && !isCorrect) {
      return 'incorrect';
    }
    
    return '';
  };

  return (
    <li
      className={`answer-option ${getOptionClass()}`}
      onClick={!showResult ? () => onSelect(option) : null}
    >
      {option}
      {showResult && isCorrect && (
        <span className="correct-marker">✓</span>
      )}
      {showResult && isSelected && !isCorrect && (
        <span className="incorrect-marker">✗</span>
      )}
    </li>
  );
};

export default AnswerOption;