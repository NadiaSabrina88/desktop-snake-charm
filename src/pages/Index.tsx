
import React from 'react';
import GameBoard from '@/components/GameBoard';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#222222] py-2 sm:py-6">
      <div className="container mx-auto px-2 sm:px-4 flex flex-col items-center justify-center">
        <GameBoard />
      </div>
    </div>
  );
};

export default Index;
