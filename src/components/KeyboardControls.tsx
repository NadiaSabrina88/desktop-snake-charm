
import { useEffect } from 'react';
import { Direction, getOppositeDirection } from '@/lib/gameLogic';

interface KeyboardControlsProps {
  onDirectionChange: (direction: Direction) => void;
  currentDirection: Direction;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  isGameOver: boolean;
}

const KeyboardControls = ({
  onDirectionChange,
  currentDirection,
  isPaused,
  setIsPaused,
  isGameOver
}: KeyboardControlsProps) => {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (isGameOver) return;

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
          setIsPaused(!isPaused);
          break;
        default:
          break;
      }
      
      if (newDirection && newDirection !== getOppositeDirection(currentDirection)) {
        onDirectionChange(newDirection);
        
        if (isPaused) {
          setIsPaused(false);
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentDirection, isGameOver, isPaused, onDirectionChange, setIsPaused]);

  return null;
};

export default KeyboardControls;
