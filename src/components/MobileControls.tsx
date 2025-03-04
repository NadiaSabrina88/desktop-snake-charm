
import React from 'react';
import { Direction } from '@/lib/gameLogic';

interface MobileControlsProps {
  onDirectionChange: (direction: Direction) => void;
  onRestart: () => void;
  isGameOver: boolean;
}

// This component is now replaced by TouchControls.tsx
const MobileControls: React.FC<MobileControlsProps> = () => {
  return null;
};

export default MobileControls;
