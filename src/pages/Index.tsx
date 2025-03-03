
import React from 'react';
import GameBoard from '@/components/GameBoard';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#222222] py-12">
      <div className="container mx-auto px-4">
        <GameBoard />
      </div>
    </div>
  );
};

export default Index;
