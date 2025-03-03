
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
    <div className="mt-8 space-y-6 animate-fade-in">
      <div className="flex flex-col items-center gap-3">
        <div className="flex justify-center">
          <button
            onClick={() => handleButtonClick('UP')}
            className="p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            aria-label="Move Up"
            disabled={isGameOver}
          >
            <ArrowUp size={24} />
          </button>
        </div>
        <div className="flex justify-center gap-12">
          <button
            onClick={() => handleButtonClick('LEFT')}
            className="p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            aria-label="Move Left"
            disabled={isGameOver}
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={() => handleButtonClick('RIGHT')}
            className="p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            aria-label="Move Right"
            disabled={isGameOver}
          >
            <ArrowRight size={24} />
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => handleButtonClick('DOWN')}
            className="p-3 rounded-lg hover:bg-gray-100 active:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors"
            aria-label="Move Down"
            disabled={isGameOver}
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
      
      {isGameOver && (
        <div className="flex justify-center">
          <button
            onClick={onRestart}
            className="px-6 py-2 bg-snake-head text-white rounded-lg shadow-sm hover:opacity-90 transition-opacity"
          >
            Restart Game
          </button>
        </div>
      )}
      
      <div className="flex gap-4 justify-center mt-6">
        <div className="flex items-center gap-2">
          <span className="key-hint">↑</span>
          <span className="text-sm text-gray-600">Up</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="key-hint">↓</span>
          <span className="text-sm text-gray-600">Down</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="key-hint">←</span>
          <span className="text-sm text-gray-600">Left</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="key-hint">→</span>
          <span className="text-sm text-gray-600">Right</span>
        </div>
      </div>
    </div>
  );
};

export default GameControls;
