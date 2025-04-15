
import React, { useRef } from 'react';
import Snake from './Snake';
import Food from './Food';
import ScoreBoard from './ScoreBoard';
import GameOverlay from './GameOverlay';
import KeyboardControls from './KeyboardControls';
import { useSnakeGame } from '@/hooks/use-snake-game';
import { useIsMobile } from '@/hooks/use-mobile';
import { ResponsiveGameBoard } from './ResponsiveGameBoard';
import { TouchControls } from './TouchControls';

const GRID_SIZE = 20;

const GameBoard: React.FC = () => {
  const isMobile = useIsMobile();
  const boardRef = useRef<HTMLDivElement>(null);
  
  function calculateCellSize(): number {
    return isMobile ? 17 : 22;
  }
  
  const {
    gameState,
    highScore,
    isPaused,
    setIsPaused,
    handleDirectionChange,
    handleRestart,
    touchStartRef,
    updateCellSize,
  } = useSnakeGame(GRID_SIZE, calculateCellSize());
  
  // Use the responsive game board hook to update cell size based on viewport
  ResponsiveGameBoard({
    gridSize: GRID_SIZE,
    updateCellSize
  });
  
  // Get touch control handlers
  const { handleTouchStart, handleTouchMove, handleTouchEnd } = TouchControls({
    onDirectionChange: handleDirectionChange,
    isPaused,
    isGameOver: gameState.isGameOver,
    touchStartRef,
    setIsPaused
  });

  const boardSize = GRID_SIZE * gameState.cellSize;
  
  return (
    <div className="game-container">
      <h1 className="text-2xl sm:text-3xl font-medium mb-2 sm:mb-4 animate-fade-in text-white">Snake Game</h1>
      
      <ScoreBoard 
        score={gameState.score} 
        highScore={highScore} 
        onRestart={handleRestart} 
        isGameOver={gameState.isGameOver} 
      />
      
      <div className="game-board-container relative animate-scale-in">
        <GameOverlay 
          isPaused={isPaused} 
          isGameOver={gameState.isGameOver}
          score={gameState.score}
        />
        
        <div 
          ref={boardRef}
          className="game-board"
          style={{ 
            width: `${boardSize}px`, 
            height: `${boardSize}px` 
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <Snake segments={gameState.snake} cellSize={gameState.cellSize} />
          <Food position={gameState.food} cellSize={gameState.cellSize} />
        </div>
      </div>
      
      <KeyboardControls 
        onDirectionChange={handleDirectionChange}
        currentDirection={gameState.direction}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        isGameOver={gameState.isGameOver}
      />
    </div>
  );
};

export default GameBoard;
