
import React from 'react';
import { Direction } from '@/lib/gameLogic';

interface Position {
  x: number;
  y: number;
}

interface TouchControlsProps {
  onDirectionChange: (direction: Direction) => void;
  isPaused: boolean;
  isGameOver: boolean;
  touchStartRef: React.MutableRefObject<Position | null>;
  setIsPaused: (paused: boolean) => void;
}

const TouchControls: React.FC<TouchControlsProps> = ({ 
  onDirectionChange, 
  isPaused,
  isGameOver,
  touchStartRef,
  setIsPaused
}) => {
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isGameOver) return;
    
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    
    if (isPaused) {
      setIsPaused(false);
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (isGameOver || !touchStartRef.current) return;
    
    e.preventDefault();
    
    const touch = e.touches[0];
    const startX = touchStartRef.current.x;
    const startY = touchStartRef.current.y;
    const currentX = touch.clientX;
    const currentY = touch.clientY;
    
    const diffX = currentX - startX;
    const diffY = currentY - startY;
    
    const minSwipeDistance = 30;
    
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
      onDirectionChange(diffX > 0 ? 'RIGHT' : 'LEFT');
      touchStartRef.current = { x: currentX, y: currentY };
    } else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > minSwipeDistance) {
      onDirectionChange(diffY > 0 ? 'DOWN' : 'UP');
      touchStartRef.current = { x: currentX, y: currentY };
    }
  };
  
  const handleTouchEnd = () => {
    touchStartRef.current = null;
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};

export default TouchControls;
