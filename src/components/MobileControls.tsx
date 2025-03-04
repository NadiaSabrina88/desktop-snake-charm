
import React from 'react';
import { Direction } from '@/lib/gameLogic';

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
  // This component is empty as we handle all touch controls directly in GameBoard
  return null;
};

export default MobileControls;
