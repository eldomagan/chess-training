import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';
import { GameState, MoveResult } from '../types/chess';
import { getRandomLine } from '../data/viennaLines';

export function useViennaGame() {
  const [game] = useState(() => new Chess());
  const [gameState, setGameState] = useState<GameState>({
    currentLine: null,
    moveIndex: 0,
    userMoves: [],
    isComplete: false,
    isCorrect: true,
    message: 'Cliquez sur "Nouvelle ligne" pour commencer',
    hintLevel: 0,
    hintFrom: null,
    hintTo: null
  });

  const startNewLine = useCallback(() => {
    const newLine = getRandomLine();
    game.reset();
    
    // Play the first two moves: 1.e4 e5 2.Nc3
    game.move('e4');
    game.move('e5');
    game.move('Nc3');
    
    setGameState({
      currentLine: newLine,
      moveIndex: 3, // We start from move index 3 (after 1.e4 e5 2.Nc3)
      userMoves: ['e4', 'e5', 'Nc3'],
      isComplete: false,
      isCorrect: true,
      message: `Ligne: ${newLine.name}. ${newLine.moves[3] ? `Les noirs jouent ${newLine.moves[3]}. À vous de jouer !` : 'Position de départ atteinte.'}`,
      hintLevel: 0,
      hintFrom: null,
      hintTo: null
    });

    // Play Black's response if it exists
    if (newLine.moves[3]) {
      try {
        game.move(newLine.moves[3]);
        setGameState(prev => ({
          ...prev,
          moveIndex: 4,
          userMoves: ['e4', 'e5', 'Nc3', newLine.moves[3]],
          message: `Les noirs ont joué ${newLine.moves[3]}. À vous de jouer !`,
          hintLevel: 0,
          hintFrom: null,
          hintTo: null
        }));
      } catch {
        console.error('Invalid move in line:', newLine.moves[3]);
      }
    }
  }, [game]);

  const makeMove = useCallback((from: string, to: string): MoveResult => {
    if (!gameState.currentLine || gameState.isComplete) {
      return {
        isValid: false,
        expectedMove: null,
        message: 'Aucune ligne en cours',
        isComplete: false
      };
    }

    try {
      const move = game.move({ from, to, promotion: 'q' });
      const expectedMove = gameState.currentLine.moves[gameState.moveIndex];
      
      if (move.san === expectedMove) {
        const newUserMoves = [...gameState.userMoves, move.san];
        let newMoveIndex = gameState.moveIndex + 1;
        let message = 'Excellent coup !';
        let isComplete = false;

        // Check if we've reached the end of the line
        if (newMoveIndex >= gameState.currentLine.moves.length) {
          isComplete = true;
          message = `Parfait ! Vous avez terminé la ligne "${gameState.currentLine.name}".`;
        } else {
          // Play Black's next move if it exists and it's Black's turn
          const nextMove = gameState.currentLine.moves[newMoveIndex];
          if (nextMove && newMoveIndex % 2 === 1) { // Black's turn (odd index)
            try {
              const blackMove = game.move(nextMove);
              newUserMoves.push(blackMove.san);
              newMoveIndex++;
              
              if (newMoveIndex >= gameState.currentLine.moves.length) {
                isComplete = true;
                message = `Parfait ! Vous avez terminé la ligne "${gameState.currentLine.name}".`;
              } else {
                message = `Bien joué ! Les noirs répondent ${blackMove.san}. Continuez !`;
              }
            } catch {
              console.error('Invalid black move:', nextMove);
            }
          }
        }

        setGameState(prev => ({
          ...prev,
          moveIndex: newMoveIndex,
          userMoves: newUserMoves,
          isComplete,
          message,
          hintLevel: 0,
          hintFrom: null,
          hintTo: null
        }));

        return {
          isValid: true,
          expectedMove: expectedMove,
          message,
          isComplete
        };
      } else {
        // Wrong move - undo it
        game.undo();
        const correctMove = expectedMove || 'coup théorique';
        const errorMessage = `Coup incorrect. Le coup théorique est ${correctMove}.`;
        
        setGameState(prev => ({
          ...prev,
          isCorrect: false,
          message: errorMessage,
          hintLevel: 0,
          hintFrom: null,
          hintTo: null
        }));

        return {
          isValid: false,
          expectedMove: expectedMove,
          message: errorMessage,
          isComplete: false
        };
      }
    } catch {
      return {
        isValid: false,
        expectedMove: null,
        message: 'Coup illégal',
        isComplete: false
      };
    }
  }, [game, gameState]);

  const showHint = useCallback(() => {
    if (!gameState.currentLine || gameState.isComplete) return;

    const expectedMove = gameState.currentLine.moves[gameState.moveIndex];
    if (!expectedMove) return;

    const clone = new Chess(game.fen());
    const parsed = clone.move(expectedMove, { sloppy: true });
    if (!parsed) return;

    if (gameState.hintLevel === 0) {
      setGameState(prev => ({
        ...prev,
        hintLevel: 1,
        hintFrom: parsed.from,
        hintTo: null,
        message: `Indice: Regardez la pièce sur ${parsed.from}`
      }));
    } else if (gameState.hintLevel === 1) {
      setGameState(prev => ({
        ...prev,
        hintLevel: 2,
        hintFrom: parsed.from,
        hintTo: parsed.to,
        message: `Indice: Le coup est ${parsed.san}`
      }));
    }
  }, [game, gameState]);

  const resetPosition = useCallback(() => {
    if (!gameState.currentLine) return;
    
    game.reset();
    game.move('e4');
    game.move('e5');
    game.move('Nc3');
    
    setGameState(prev => ({
      ...prev,
      moveIndex: 3,
      userMoves: ['e4', 'e5', 'Nc3'],
      isComplete: false,
      isCorrect: true,
      message: `Reprise de la ligne: ${prev.currentLine?.name}. Les noirs vont jouer ${prev.currentLine?.moves[3]}.`,
      hintLevel: 0,
      hintFrom: null,
      hintTo: null
    }));

    // Play Black's response
    if (gameState.currentLine.moves[3]) {
      try {
        game.move(gameState.currentLine.moves[3]);
        setGameState(prev => ({
          ...prev,
          moveIndex: 4,
          userMoves: ['e4', 'e5', 'Nc3', gameState.currentLine!.moves[3]],
          message: `Les noirs ont joué ${gameState.currentLine!.moves[3]}. À vous de jouer !`,
          hintLevel: 0,
          hintFrom: null,
          hintTo: null
        }));
      } catch {
        console.error('Invalid move in reset:', gameState.currentLine.moves[3]);
      }
    }
  }, [game, gameState.currentLine]);

  return {
    game,
    gameState,
    startNewLine,
    makeMove,
    showHint,
    resetPosition
  };
}