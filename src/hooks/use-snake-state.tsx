
import { useState } from 'react';
import { toast } from 'sonner';
import { Direction, GameState, initializeGame } from '@/lib/gameLogic';

const HIGH_SCORE_KEY = 'snake-game-high-score';

export function useSnakeState(gridSize: number, initialCellSize: number) {
  const [gameState, setGameState] = useState<GameState>(() => 
    initializeGame(gridSize, initialCellSize)
  );
  
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem(HIGH_SCORE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [isPaused, setIsPaused] = useState<boolean>(true);
  
  const handleDirectionChange = (direction: Direction) => {
    if (gameState.isGameOver) return;
    
    if (direction !== getOppositeDirection(gameState.direction)) {
      setGameState(prev => ({
        ...prev,
        nextDirection: direction
      }));
      
      if (isPaused) {
        setIsPaused(false);
      }
    }
  };
  
  const handleRestart = () => {
    setGameState(initializeGame(gridSize, gameState.cellSize));
    setIsPaused(true);
    toast("Game Restarted!");
  };

  const updateCellSize = (newCellSize: number) => {
    setGameState(prev => ({
      ...prev,
      cellSize: newCellSize
    }));
  };

  const updateGameState = (newState: GameState) => {
    setGameState(newState);
    
    if (newState.isGameOver && newState.score > highScore) {
      setHighScore(newState.score);
      localStorage.setItem(HIGH_SCORE_KEY, newState.score.toString());
      toast("New High Score: " + newState.score + "!");
    }
  };

  return {
    gameState,
    highScore,
    isPaused,
    setIsPaused,
    handleDirectionChange,
    handleRestart,
    updateCellSize,
    updateGameState
  };
}

// Helper function from gameLogic.ts to avoid circular dependency
const getOppositeDirection = (direction: Direction): Direction => {
  switch (direction) {
    case 'UP': return 'DOWN';
    case 'DOWN': return 'UP';
    case 'LEFT': return 'RIGHT';
    case 'RIGHT': return 'LEFT';
    default: return direction;
  }
};
