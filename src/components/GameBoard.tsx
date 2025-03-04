import React, { useEffect, useState, useRef } from 'react';
import Snake from './Snake';
import Food from './Food';
import GameControls from './GameControls';
import ScoreBoard from './ScoreBoard';
import MobileControls from './MobileControls';
import { 
  Direction, 
  GameState, 
  initializeGame, 
  moveSnake, 
  getOppositeDirection 
} from '@/lib/gameLogic';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

const GRID_SIZE = 20;
const GAME_SPEED_MS = 150;
const HIGH_SCORE_KEY = 'snake-game-high-score';

const GameBoard: React.FC = () => {
  const isMobile = useIsMobile();
  const [gameState, setGameState] = useState<GameState>(() => 
    initializeGame(GRID_SIZE, calculateCellSize())
  );
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem(HIGH_SCORE_KEY);
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const gameLoopRef = useRef<number | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  
  // Calculate cell size based on available space
  function calculateCellSize(): number {
    const defaultSize = isMobile ? 12 : 20; // Smaller cells on mobile
    return defaultSize;
  }
  
  // Recalculate cell size when window resizes
  useEffect(() => {
    function handleResize() {
      if (!boardRef.current) return;
      
      const boardWidth = boardRef.current.clientWidth;
      const boardHeight = boardRef.current.clientHeight;
      const minDimension = Math.min(boardWidth, boardHeight);
      const newCellSize = Math.floor(minDimension / GRID_SIZE);
      
      setGameState(prev => ({
        ...prev,
        cellSize: newCellSize
      }));
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.isGameOver) return;

      let newDirection: Direction | null = null;
      
      switch (e.key) {
        case 'ArrowUp':
          newDirection = 'UP';
          break;
        case 'ArrowDown':
          newDirection = 'DOWN';
          break;
        case 'ArrowLeft':
          newDirection = 'LEFT';
          break;
        case 'ArrowRight':
          newDirection = 'RIGHT';
          break;
        case ' ': // Space bar to pause/resume
          setIsPaused(prev => !prev);
          break;
        default:
          break;
      }
      
      if (newDirection && newDirection !== getOppositeDirection(gameState.direction)) {
        setGameState(prev => ({
          ...prev,
          nextDirection: newDirection as Direction
        }));
        
        // Start game on first input
        if (isPaused) {
          setIsPaused(false);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.direction, gameState.isGameOver, isPaused]);
  
  // Game loop
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
          
          // Check for game over
          if (!prevState.isGameOver && newState.isGameOver) {
            toast("Game Over!");
            // Update high score if needed
            if (newState.score > highScore) {
              setHighScore(newState.score);
              localStorage.setItem(HIGH_SCORE_KEY, newState.score.toString());
              toast("New High Score: " + newState.score + "!");
            }
          }
          
          // Check for score increase
          if (newState.score > prevState.score) {
            toast("Score: " + newState.score);
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
  
  // Handle direction change from controls
  const handleDirectionChange = (direction: Direction) => {
    if (gameState.isGameOver) return;
    
    if (direction !== getOppositeDirection(gameState.direction)) {
      setGameState(prev => ({
        ...prev,
        nextDirection: direction
      }));
      
      // Start game on first input
      if (isPaused) {
        setIsPaused(false);
      }
    }
  };
  
  // Restart game
  const handleRestart = () => {
    setGameState(initializeGame(GRID_SIZE, gameState.cellSize));
    setIsPaused(true);
    toast("Game Restarted!");
  };

  // Calculated board size
  const boardSize = GRID_SIZE * gameState.cellSize;
  
  return (
    <div className="game-container">
      <h1 className="text-3xl font-medium mb-6 animate-fade-in text-white">Snake Game</h1>
      
      <ScoreBoard 
        score={gameState.score} 
        highScore={highScore} 
        onRestart={handleRestart} 
        isGameOver={gameState.isGameOver} 
      />
      
      <div className="game-board-container relative animate-scale-in">
        {isPaused && !gameState.isGameOver && (
          <div className="absolute inset-0 bg-[#333333] bg-opacity-80 flex items-center justify-center z-10 animate-fade-in">
            <div className="text-center px-6 py-4 rounded-lg">
              <h2 className="text-xl font-medium mb-4 text-white">Ready to Play?</h2>
              <p className="text-gray-300 mb-4">
                {isMobile ? "Use touch controls to start." : "Use arrow keys or control buttons to start."}
              </p>
            </div>
          </div>
        )}
        
        {gameState.isGameOver && (
          <div className="game-over-overlay">
            <div className="bg-[#333333] p-6 rounded-lg shadow-lg text-center max-w-xs text-white">
              <h2 className="text-xl font-medium mb-2">Game Over!</h2>
              <p className="text-gray-300 mb-4">
                Your score: <span className="font-medium">{gameState.score}</span>
              </p>
            </div>
          </div>
        )}
        
        <div 
          ref={boardRef}
          className="game-board"
          style={{ 
            width: `${boardSize}px`, 
            height: `${boardSize}px` 
          }}
        >
          <Snake segments={gameState.snake} cellSize={gameState.cellSize} />
          <Food position={gameState.food} cellSize={gameState.cellSize} />
        </div>
      </div>
      
      {isMobile ? (
        <MobileControls
          onDirectionChange={handleDirectionChange}
          onRestart={handleRestart}
          isGameOver={gameState.isGameOver}
        />
      ) : (
        <GameControls 
          onDirectionChange={handleDirectionChange} 
          onRestart={handleRestart}
          isGameOver={gameState.isGameOver}
        />
      )}
    </div>
  );
};

export default GameBoard;
