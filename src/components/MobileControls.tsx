
import React from 'react';
import { Direction } from '@/lib/gameLogic';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface MobileControlsProps {
  onDirectionChange: (direction: Direction) => void;
  onRestart: () => void;
  isGameOver: boolean;
}

const MobileControls: React.FC<MobileControlsProps> = ({ 
  onDirectionChange, 
  onRestart,
  isGameOver
}) => {
  const handleTouchStart = (direction: Direction) => {
    onDirectionChange(direction);
  };

  return (
    <div className="mt-8 space-y-6 animate-fade-in text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="flex justify-center">
          <button
            onTouchStart={() => handleTouchStart('UP')}
            onClick={() => handleTouchStart('UP')}
            className="p-5 rounded-lg bg-[#333333] active:bg-[#444444] focus:outline-none transition-colors"
            aria-label="Move Up"
            disabled={isGameOver}
          >
            <ArrowUp size={28} />
          </button>
        </div>
        <div className="flex justify-center gap-16">
          <button
            onTouchStart={() => handleTouchStart('LEFT')}
            onClick={() => handleTouchStart('LEFT')}
            className="p-5 rounded-lg bg-[#333333] active:bg-[#444444] focus:outline-none transition-colors"
            aria-label="Move Left"
            disabled={isGameOver}
          >
            <ArrowLeft size={28} />
          </button>
          <button
            onTouchStart={() => handleTouchStart('RIGHT')}
            onClick={() => handleTouchStart('RIGHT')}
            className="p-5 rounded-lg bg-[#333333] active:bg-[#444444] focus:outline-none transition-colors"
            aria-label="Move Right"
            disabled={isGameOver}
          >
            <ArrowRight size={28} />
          </button>
        </div>
        <div className="flex justify-center">
          <button
            onTouchStart={() => handleTouchStart('DOWN')}
            onClick={() => handleTouchStart('DOWN')}
            className="p-5 rounded-lg bg-[#333333] active:bg-[#444444] focus:outline-none transition-colors"
            aria-label="Move Down"
            disabled={isGameOver}
          >
            <ArrowDown size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileControls;
