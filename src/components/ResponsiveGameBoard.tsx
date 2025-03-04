
import React, { useEffect, useRef } from 'react';

interface ResponsiveGameBoardProps {
  gridSize: number;
  updateCellSize: (size: number) => void;
}

const ResponsiveGameBoard: React.FC<ResponsiveGameBoardProps> = ({ 
  gridSize, 
  updateCellSize 
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    function handleResize() {
      if (!boardRef.current) return;
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      const availableWidth = viewportWidth * 0.95;
      const availableHeight = viewportHeight * 0.6;
      
      const cellSizeFromWidth = Math.floor(availableWidth / gridSize);
      const cellSizeFromHeight = Math.floor(availableHeight / gridSize);
      
      const newCellSize = Math.min(cellSizeFromWidth, cellSizeFromHeight);
      
      updateCellSize(newCellSize);
    }
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [gridSize, updateCellSize]);

  return { boardRef };
};

export default ResponsiveGameBoard;
