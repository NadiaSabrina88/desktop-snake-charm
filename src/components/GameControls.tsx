
import React from 'react';
import { Direction } from '@/lib/gameLogic';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface GameControlsProps {
  onDirectionChange: (direction: Direction) => void;
  onRestart: () => void;
  isGameOver: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  onDirectionChange, 
  onRestart,
  isGameOver
}) => {
  const handleButtonClick = (direction: Direction) => {
    onDirectionChange(direction);
  };

  return (
    <div className="mt-8 space-y-6 animate-fade-in text-white">
      <div className="flex flex-col items-center gap-3">
        <div className="flex justify-center">
          <button
            onClick={() => handleButtonClick('UP')}
            className="p-3 rounded-lg hover:bg-[#333333] active:bg-[#444444] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-colors"
            aria-label="Move Up"
            disabled={isGameOver}
          >
            <ArrowUp size={24} />
          </button>
        </div>
        <div className="flex justify-center gap-12">
          <button
            onClick={() => handleButtonClick('LEFT')}
            className="p-3 rounded-lg hover:bg-[#333333] active:bg-[#444444] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-colors"
            aria-label="Move Left"
            disabled={isGameOver}
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={() => handleButtonClick('RIGHT')}
            className="p-3 rounded-lg hover:bg-[#333333] active:bg-[#444444] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-colors"
            aria-label="Move Right"
            disabled={isGameOver}
          >
            <ArrowRight size={24} />
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => handleButtonClick('DOWN')}
            className="p-3 rounded-lg hover:bg-[#333333] active:bg-[#444444] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] transition-colors"
            aria-label="Move Down"
            disabled={isGameOver}
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
      
      <div className="flex gap-4 justify-center mt-6">
        <div className="flex items-center gap-2">
          <span className="key-hint bg-[#333333] border-[#444444] text-white">↑</span>
          <span className="text-sm text-gray-300">Up</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="key-hint bg-[#333333] border-[#444444] text-white">↓</span>
          <span className="text-sm text-gray-300">Down</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="key-hint bg-[#333333] border-[#444444] text-white">←</span>
          <span className="text-sm text-gray-300">Left</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="key-hint bg-[#333333] border-[#444444] text-white">→</span>
          <span className="text-sm text-gray-300">Right</span>
        </div>
      </div>
    </div>
  );
};

export default GameControls;
