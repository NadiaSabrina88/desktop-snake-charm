
import React from 'react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore }) => {
  return (
    <div className="flex justify-between w-full max-w-md mb-4">
      <div className="flex flex-col items-center bg-white px-6 py-3 rounded-lg shadow-sm animate-fade-in">
        <span className="text-xs uppercase tracking-wider text-gray-500 mb-1">Score</span>
        <span className="text-3xl font-medium">{score}</span>
      </div>
      <div className="flex flex-col items-center bg-white px-6 py-3 rounded-lg shadow-sm animate-fade-in">
        <span className="text-xs uppercase tracking-wider text-gray-500 mb-1">High Score</span>
        <span className="text-3xl font-medium">{highScore}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
