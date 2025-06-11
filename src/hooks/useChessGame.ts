import { useState, useCallback } from 'react';
import { Chess } from 'chess.js';
import { Opening, OpeningLine, GameState, MoveResult } from '../types/chess';
import { getRandomLine } from '../data/openings';

export function useChessGame() {
  const [game] = useState(() => new Chess());
  const [gameState, setGameState] = useState<GameState>({
    currentOpening: null,
    currentLine: null,
    moveIndex: 0,
    userMoves: [],
    isComplete: false,
    isCorrect: true,
    message: 'Sélectionnez une ouverture pour commencer'
  });

  const setOpening = useCallback((opening: Opening) => {
    setGameState({
      currentOpening: opening,
      currentLine: null,
      moveIndex: 0,
      userMoves: [],
      isComplete: false,
      isCorrect: true,
      message: `Ouverture sélectionnée: ${opening.name}. Cliquez sur "Nouvelle ligne" pour commencer.`
    });
  }, []);

  const startNewLine = useCallback(() => {
    if (!gameState.currentOpening) return;
    
    const newLine = getRandomLine(gameState.currentOpening);
    game.reset();
    
    // Play the starting moves of the opening
    const startingMoves = gameState.currentOpening.startingMoves;
    const userMoves: string[] = [];
    
    for (const move of startingMoves) {
      try {
        const madeMove = game.move(move);
        userMoves.push(madeMove.san);
      } catch (error) {
        console.error('Invalid starting move:', move);
      }
    }
    
    const nextMoveIndex = startingMoves.length;
    let message = `Ligne: ${newLine.name}.`;
    
    // If there's a next move in the line and it's Black's turn, play it
    if (newLine.moves[nextMoveIndex] && nextMoveIndex % 2 === 1) {
      try {
        const blackMove = game.move(newLine.moves[nextMoveIndex]);
        userMoves.push(blackMove.san);
        message += ` Les noirs jouent ${blackMove.san}. À vous de jouer !`;
        
        setGameState({
          currentOpening: gameState.currentOpening,
          currentLine: newLine,
          moveIndex: nextMoveIndex + 1,
          userMoves,
          isComplete: false,
          isCorrect: true,
          message
        });
      } catch (error) {
        console.error('Invalid black move:', newLine.moves[nextMoveIndex]);
      }
    } else {
      message += ' À vous de jouer !';
      setGameState({
        currentOpening: gameState.currentOpening,
        currentLine: newLine,
        moveIndex: nextMoveIndex,
        userMoves,
        isComplete: false,
        isCorrect: true,
        message
      });
    }
  }, [game, gameState.currentOpening]);

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
            } catch (error) {
              console.error('Invalid black move:', nextMove);
            }
          }
        }

        setGameState(prev => ({
          ...prev,
          moveIndex: newMoveIndex,
          userMoves: newUserMoves,
          isComplete,
          isCorrect: true,
          message
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
          message: errorMessage
        }));

        return {
          isValid: false,
          expectedMove: expectedMove,
          message: errorMessage,
          isComplete: false
        };
      }
    } catch (error) {
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
    if (expectedMove) {
      setGameState(prev => ({
        ...prev,
        message: `Indice: Le coup théorique est ${expectedMove}`
      }));
    }
  }, [gameState]);

  const resetPosition = useCallback(() => {
    if (!gameState.currentOpening || !gameState.currentLine) return;
    
    game.reset();
    const startingMoves = gameState.currentOpening.startingMoves;
    const userMoves: string[] = [];
    
    for (const move of startingMoves) {
      try {
        const madeMove = game.move(move);
        userMoves.push(madeMove.san);
      } catch (error) {
        console.error('Invalid starting move:', move);
      }
    }
    
    const nextMoveIndex = startingMoves.length;
    
    setGameState(prev => ({
      ...prev,
      moveIndex: nextMoveIndex,
      userMoves,
      isComplete: false,
      isCorrect: true,
      message: `Reprise de la ligne: ${prev.currentLine?.name}.`
    }));

    // Play Black's response if needed
    if (gameState.currentLine.moves[nextMoveIndex] && nextMoveIndex % 2 === 1) {
      try {
        const blackMove = game.move(gameState.currentLine.moves[nextMoveIndex]);
        setGameState(prev => ({
          ...prev,
          moveIndex: nextMoveIndex + 1,
          userMoves: [...userMoves, blackMove.san],
          message: `Les noirs ont joué ${blackMove.san}. À vous de jouer !`
        }));
      } catch (error) {
        console.error('Invalid move in reset:', gameState.currentLine.moves[nextMoveIndex]);
      }
    }
  }, [game, gameState.currentOpening, gameState.currentLine]);

  const backToSelection = useCallback(() => {
    game.reset();
    setGameState({
      currentOpening: null,
      currentLine: null,
      moveIndex: 0,
      userMoves: [],
      isComplete: false,
      isCorrect: true,
      message: 'Sélectionnez une ouverture pour commencer'
    });
  }, [game]);

  return {
    game,
    gameState,
    setOpening,
    startNewLine,
    makeMove,
    showHint,
    resetPosition,
    backToSelection
  };
}