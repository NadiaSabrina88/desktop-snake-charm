
import { useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { GameState, moveSnake } from '@/lib/gameLogic';

const GAME_SPEED_MS = 150;

export function useGameLoop(
  gameState: GameState,
  isPaused: boolean,
  updateGameState: (newState: GameState) => void
) {
  const gameLoopRef = useRef<number | null>(null);
  
  useEffect(() => {
    if (isPaused || gameState.isGameOver) {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }
    
    let lastTime = 0;
    
    const gameLoop = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const elapsed = timestamp - lastTime;
      
      if (elapsed > GAME_SPEED_MS) {
        lastTime = timestamp;
        
        const newState = moveSnake(gameState);
        
        if (!gameState.isGameOver && newState.isGameOver) {
          toast("Game Over!");
        }
        
        updateGameState(newState);
      }
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isPaused, gameState, updateGameState]);

  return {
    gameLoopRef
  };
}
