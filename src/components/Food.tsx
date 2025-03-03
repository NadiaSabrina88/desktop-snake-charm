
import React from 'react';
import { Position } from '@/lib/gameLogic';

interface FoodProps {
  position: Position;
  cellSize: number;
}

const Food: React.FC<FoodProps> = ({ position, cellSize }) => {
  return (
    <div
      className="game-cell food"
      style={{
        width: `${cellSize * 0.8}px`,
        height: `${cellSize * 0.8}px`,
        left: `${position.x * cellSize + cellSize * 0.1}px`,
        top: `${position.y * cellSize + cellSize * 0.1}px`,
      }}
    />
  );
};

export default Food;
