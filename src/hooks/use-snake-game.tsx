
import { useRef } from 'react';
import { Direction, GameState } from '@/lib/gameLogic';
import { useSnakeState } from './use-snake-state';
import { useGameLoop } from './use-game-loop';

interface Position {
  x: number;
  y: number;
}

export function useSnakeGame(gridSize: number, initialCellSize: number) {
  const {
    gameState,
    highScore,
    isPaused,
    setIsPaused,
    handleDirectionChange,
    handleRestart,
    updateCellSize,
    updateGameState
  } = useSnakeState(gridSize, initialCellSize);
  
  // Create a ref for touch controls
  const touchStartRef = useRef<Position | null>(null);
  
  // Use the game loop hook
  useGameLoop(gameState, isPaused, updateGameState);

  return {
    gameState,
    highScore,
    isPaused,
    setIsPaused,
    handleDirectionChange,
    handleRestart,
    touchStartRef,
    updateCellSize,
  };
}
