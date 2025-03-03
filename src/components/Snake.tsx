
import React from 'react';
import { Position } from '@/lib/gameLogic';

interface SnakeProps {
  segments: Position[];
  cellSize: number;
}

const Snake: React.FC<SnakeProps> = ({ segments, cellSize }) => {
  if (!segments.length) return null;
  
  return (
    <>
      {segments.map((segment, index) => (
        <div
          key={`${segment.x}-${segment.y}`}
          className={`game-cell ${index === 0 ? 'snake-head' : 'snake-segment'}`}
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            left: `${segment.x * cellSize}px`,
            top: `${segment.y * cellSize}px`,
            zIndex: segments.length - index,
            transition: 'left 0.1s linear, top 0.1s linear',
          }}
        />
      ))}
    </>
  );
};

export default Snake;
