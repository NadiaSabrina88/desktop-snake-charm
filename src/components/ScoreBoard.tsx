
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

interface ScoreBoardProps {
  score: number;
  highScore: number;
  onRestart: () => void;
  isGameOver: boolean;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore, onRestart, isGameOver }) => {
  return (
    <div className="flex justify-between items-center w-full max-w-sm mb-4 gap-3">
      <div className="flex flex-col items-center bg-[#333333] px-4 py-2 rounded-lg shadow-md animate-fade-in text-white">
        <span className="text-xs uppercase tracking-wider text-gray-300 mb-1">Score</span>
        <span className="text-2xl font-medium">{score}</span>
      </div>
      
      <Button
        onClick={onRestart}
        className="bg-[#8B5CF6] hover:bg-[#7C4DFF] text-white h-10 w-10 flex items-center justify-center rounded-full shadow-md transition-colors"
        aria-label="Restart Game"
      >
        <RefreshCw size={16} />
      </Button>
      
      <div className="flex flex-col items-center bg-[#333333] px-4 py-2 rounded-lg shadow-md animate-fade-in text-white">
        <span className="text-xs uppercase tracking-wider text-gray-300 mb-1">High Score</span>
        <span className="text-2xl font-medium">{highScore}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
