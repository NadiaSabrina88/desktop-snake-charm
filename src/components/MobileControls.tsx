
import React, { useState, useRef } from 'react';
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
  // This component is now minimal - we'll handle swipes in the main GameBoard
  // This is kept only to maintain the component structure
  return null;
};

export default MobileControls;
