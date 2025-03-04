
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
        width: `${cellSize * 1.2}px`,
        height: `${cellSize * 1.2}px`,
        left: `${position.x * cellSize - cellSize * 0.1}px`,
        top: `${position.y * cellSize - cellSize * 0.1}px`,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23FF5C8D\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M17 11H7a6 6 0 0 0 0 12h10a6 6 0 0 0 0-12Z\'/%3E%3Cpath d=\'M7 11V9a6 6 0 0 1 6-6h0a6 6 0 0 1 6 6v2\'/%3E%3Cpath d=\'M7 15h10\'/%3E%3C/svg%3E")',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundColor: 'transparent',
      }}
    />
  );
};

export default Food;
