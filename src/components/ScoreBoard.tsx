
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
    <div className="flex justify-between items-center w-full max-w-xs mb-2 sm:mb-4 gap-2">
      <div className="flex flex-col items-center bg-[#333333] px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-md animate-fade-in text-white">
        <span className="text-xs uppercase tracking-wider text-gray-300 mb-0.5">Score</span>
        <span className="text-xl font-medium">{score}</span>
      </div>
      
      <Button
        onClick={onRestart}
        className="bg-[#8B5CF6] hover:bg-[#7C4DFF] text-white h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center rounded-full shadow-md transition-colors"
        aria-label="Restart Game"
      >
        <RefreshCw size={14} />
      </Button>
      
      <div className="flex flex-col items-center bg-[#333333] px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-md animate-fade-in text-white">
        <span className="text-xs uppercase tracking-wider text-gray-300 mb-0.5">High Score</span>
        <span className="text-xl font-medium">{highScore}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;
