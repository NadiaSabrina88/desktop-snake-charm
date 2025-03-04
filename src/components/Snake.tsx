
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
      {segments.map((segment, index) => {
        // Is it the head?
        const isHead = index === 0;
        
        // Calculate curve for segments (not for head)
        let borderRadius = `${cellSize * 0.5}px`;
        
        return (
          <div
            key={`${segment.x}-${segment.y}`}
            className={`game-cell ${isHead ? 'snake-head' : 'snake-segment'}`}
            style={{
              width: `${cellSize}px`,
              height: `${cellSize}px`,
              left: `${segment.x * cellSize}px`,
              top: `${segment.y * cellSize}px`,
              zIndex: segments.length - index,
              borderRadius: borderRadius,
              ...(isHead && {
                backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%238B5CF6\' stroke=\'%23fff\' stroke-width=\'1\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Ccircle cx=\'5\' cy=\'8\' r=\'2\'/%3E%3Ccircle cx=\'15\' cy=\'8\' r=\'2\'/%3E%3Cpath d=\'M9 12h5\'/%3E%3C/svg%3E")',
                backgroundSize: '70%',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }),
              transition: 'left 0.1s linear, top 0.1s linear',
            }}
          />
        );
      })}
    </>
  );
};

export default Snake;
