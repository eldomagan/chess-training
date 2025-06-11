import React from 'react';
import { GameState } from '../types/chess';
import { Shuffle, RotateCcw, Lightbulb, Eye, ArrowLeft } from 'lucide-react';

interface GameControlsProps {
  gameState: GameState;
  onNewLine: () => void;
  onReset: () => void;
  onShowHint: () => void;
  onShowSolution: () => void;
  onBackToSelection: () => void;
}

export function GameControls({ 
  gameState, 
  onNewLine, 
  onReset, 
  onShowHint, 
  onShowSolution,
  onBackToSelection
}: GameControlsProps) {
  return (
    <div className="space-y-3">
      <button
        onClick={onBackToSelection}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg active:scale-95"
      >
        <ArrowLeft className="w-4 h-4" />
        Changer d'ouverture
      </button>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onNewLine}
          disabled={!gameState.currentOpening}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg active:scale-95 disabled:active:scale-100"
        >
          <Shuffle className="w-4 h-4" />
          Nouvelle ligne
        </button>
        
        <button
          onClick={onReset}
          disabled={!gameState.currentLine}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg active:scale-95 disabled:active:scale-100"
        >
          <RotateCcw className="w-4 h-4" />
          Réessayer
        </button>
        
        <button
          onClick={onShowHint}
          disabled={!gameState.currentLine || gameState.isComplete}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg active:scale-95 disabled:active:scale-100"
        >
          <Lightbulb className="w-4 h-4" />
          Indice
        </button>
        
        <button
          onClick={onShowSolution}
          disabled={!gameState.currentLine}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg active:scale-95 disabled:active:scale-100"
        >
          <Eye className="w-4 h-4" />
          Solution
        </button>
      </div>
    </div>
  );
}