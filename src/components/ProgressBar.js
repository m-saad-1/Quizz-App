const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-container">
      <div 
        className="progress-bar" 
        style={{ width: `${progress}%` }}
      ></div>
      <span className="progress-text">{Math.round(progress)}%</span>
    </div>
  );
};

export default ProgressBar;