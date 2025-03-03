
import React from 'react';
import GameBoard from '@/components/GameBoard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12">
      <div className="container mx-auto px-4">
        <GameBoard />
      </div>
    </div>
  );
};

export default Index;
