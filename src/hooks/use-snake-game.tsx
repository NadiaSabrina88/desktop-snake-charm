
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { 
  Direction, 
  GameState, 
  initializeGame, 
  moveSnake, 
  getOppositeDirection 
} from '@/lib/gameLogic';

const HIGH_SCORE_KEY = 'snake-game-high-score';
const GAME_SPEED_MS = 150;

interface Position {
  x: number;
  y: number;
}

export function useSnakeGame(gridSize: number, initialCellSize: number) {
  const [gameState, setGameState] = useState<GameState>(() => 
    initializeGame(gridSize, initialCellSize)
  );
  
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem(HIGH_SCORE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });
  
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const gameLoopRef = useRef<number | null>(null);
  const touchStartRef = useRef<Position | null>(null);
  
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
        
        setGameState(prevState => {
          const newState = moveSnake(prevState);
          
          if (!prevState.isGameOver && newState.isGameOver) {
            toast("Game Over!");
            if (newState.score > highScore) {
              setHighScore(newState.score);
              localStorage.setItem(HIGH_SCORE_KEY, newState.score.toString());
              toast("New High Score: " + newState.score + "!");
            }
          }
          
          return newState;
        });
      }
      
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoopRef.current = requestAnimationFrame(gameLoop);
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [isPaused, gameState.isGameOver, highScore]);

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
