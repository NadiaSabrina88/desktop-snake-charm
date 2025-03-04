
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface GameOverlayProps {
  isPaused: boolean;
  isGameOver: boolean;
  score: number;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ 
  isPaused, 
  isGameOver,
  score
}) => {
  const isMobile = useIsMobile();

  if (isGameOver) {
    return (
      <div className="game-over-overlay">
        <div className="bg-[#333333] p-4 sm:p-6 rounded-lg shadow-lg text-center max-w-xs text-white">
          <h2 className="text-xl font-medium mb-2">Game Over!</h2>
          <p className="text-gray-300 mb-2">
            Your score: <span className="font-medium">{score}</span>
          </p>
        </div>
      </div>
    );
  }

  if (isPaused) {
    return (
      <div className="absolute inset-0 bg-[#333333] bg-opacity-80 flex items-center justify-center z-10 animate-fade-in">
        <div className="text-center px-6 py-4 rounded-lg">
          <h2 className="text-xl font-medium mb-2 text-white">Ready to Play?</h2>
          <p className="text-gray-300 mb-2 text-sm">
            {isMobile ? "Tap and swipe to control." : "Use arrow keys to start and control."}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default GameOverlay;
