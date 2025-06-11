import React from 'react';
import { GameState } from '../types/chess';
import { CheckCircle, AlertCircle, Play } from 'lucide-react';

interface GameStatusProps {
  gameState: GameState;
}

export function GameStatus({ gameState }: GameStatusProps) {
  const getStatusIcon = () => {
    if (gameState.isComplete) {
      return <CheckCircle className="w-5 h-5 text-green-600" />;
    }
    if (!gameState.isCorrect) {
      return <AlertCircle className="w-5 h-5 text-red-600" />;
    }
    if (gameState.currentLine) {
      return <Play className="w-5 h-5 text-blue-600" />;
    }
    return null;
  };

  const getStatusColor = () => {
    if (gameState.isComplete) return 'bg-green-50 border-green-200 text-green-800';
    if (!gameState.isCorrect) return 'bg-red-50 border-red-200 text-red-800';
    if (gameState.currentLine) return 'bg-blue-50 border-blue-200 text-blue-800';
    return 'bg-gray-50 border-gray-200 text-gray-800';
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${getStatusColor()} transition-all duration-300`}>
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <div className="flex-1">
          <p className="font-medium">{gameState.message}</p>
          {gameState.currentOpening && (
            <p className="text-xs opacity-75 mt-1">
              {gameState.currentOpening.name}
            </p>
          )}
          {gameState.currentLine && (
            <p className="text-sm opacity-75 mt-1">
              {gameState.currentLine.description}
            </p>
          )}
        </div>
      </div>
      
      {gameState.currentLine && (
        <div className="mt-3 pt-3 border-t border-opacity-30">
          <div className="flex justify-between items-center text-sm">
            <span className="font-medium">Progression:</span>
            <span>
              {Math.floor(gameState.moveIndex / 2)} / {Math.floor(gameState.currentLine.moves.length / 2)} coups
            </span>
          </div>
          <div className="w-full bg-white bg-opacity-50 rounded-full h-2 mt-2">
            <div 
              className="bg-current h-2 rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min(100, (gameState.moveIndex / gameState.currentLine.moves.length) * 100)}%` 
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}