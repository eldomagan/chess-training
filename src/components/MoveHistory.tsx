import React from 'react';
import { GameState } from '../types/chess';

interface MoveHistoryProps {
  gameState: GameState;
}

export function MoveHistory({ gameState }: MoveHistoryProps) {
  if (!gameState.currentLine || !gameState.currentOpening) {
    return null;
  }

  const startingMovesCount = gameState.currentOpening.startingMoves.length;
  const moveHistory = gameState.userMoves.slice(startingMovesCount);
  
  if (moveHistory.length === 0) {
    return null;
  }

  const pairs: string[][] = [];
  for (let i = 0; i < moveHistory.length; i += 2) {
    pairs.push([moveHistory[i], moveHistory[i + 1]].filter(Boolean));
  }

  const getOpeningMovesDisplay = () => {
    const moves = gameState.currentOpening!.startingMoves;
    let display = '';
    for (let i = 0; i < moves.length; i += 2) {
      const moveNumber = Math.floor(i / 2) + 1;
      display += `${moveNumber}. ${moves[i]}`;
      if (moves[i + 1]) {
        display += ` ${moves[i + 1]}`;
      }
      if (i + 2 < moves.length) {
        display += ' ';
      }
    }
    return display;
  };

  return (
    <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4">
      <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
        <span>Historique des coups</span>
        <span className="text-xs bg-slate-200 px-2 py-1 rounded-full">
          {gameState.currentLine.name}
        </span>
      </h3>
      
      <div className="space-y-2">
        <div className="text-sm text-slate-700 font-mono bg-white rounded p-2 border">
          {getOpeningMovesDisplay()} (position de départ)
        </div>
        
        {pairs.map((pair, index) => {
          const moveNumber = Math.floor(startingMovesCount / 2) + index + 1;
          return (
            <div key={index} className="text-sm text-slate-700 font-mono bg-white rounded p-2 border">
              {moveNumber}. {pair[0]} {pair[1] || '...'}
            </div>
          );
        })}
      </div>
      
      {gameState.isComplete && (
        <div className="mt-3 pt-3 border-t border-slate-300">
          <p className="text-sm text-slate-800 font-medium">
            ✅ Ligne complétée avec succès !
          </p>
        </div>
      )}
    </div>
  );
}