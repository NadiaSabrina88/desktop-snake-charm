
import React from 'react';
import GameBoard from '@/components/GameBoard';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-[#222222] py-4 sm:py-12">
      <div className="container mx-auto px-2 sm:px-4">
        <GameBoard />
      </div>
    </div>
  );
};

export default Index;
