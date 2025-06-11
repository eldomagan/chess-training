import React, { useState, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { useChessGame } from './hooks/useChessGame';
import { OpeningSelector } from './components/OpeningSelector';
import { GameStatus } from './components/GameStatus';
import { GameControls } from './components/GameControls';
import { MoveHistory } from './components/MoveHistory';
import { SolutionModal } from './components/SolutionModal';

function App() {
  const { 
    game, 
    gameState, 
    setOpening, 
    startNewLine, 
    makeMove, 
    showHint, 
    resetPosition,
    backToSelection 
  } = useChessGame();
  const [showSolution, setShowSolution] = useState(false);

  const hintSquareStyles = useMemo(() => {
    if (gameState.hintLevel >= 1 && gameState.hintFrom) {
      return {
        [gameState.hintFrom]: {
          backgroundColor: 'rgba(255, 255, 0, 0.4)',
          animation: 'hint-blink 1s ease-in-out infinite'
        }
      } as Record<string, React.CSSProperties>;
    }
    return {};
  }, [gameState.hintLevel, gameState.hintFrom]);

  const hintArrows = useMemo(() => {
    if (gameState.hintLevel >= 2 && gameState.hintFrom && gameState.hintTo) {
      return [[gameState.hintFrom, gameState.hintTo, 'green']];
    }
    return [] as [string, string, string?][];
  }, [gameState.hintLevel, gameState.hintFrom, gameState.hintTo]);

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const result = makeMove(sourceSquare, targetSquare);
    return result.isValid;
  };

  // Show opening selector if no opening is selected
  if (!gameState.currentOpening) {
    return <OpeningSelector onSelectOpening={setOpening} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {gameState.currentOpening.name}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {gameState.currentOpening.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Chessboard */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-200">
              <div className="aspect-square max-w-2xl mx-auto">
                <Chessboard
                  position={game.fen()}
                  onPieceDrop={onDrop}
                  boardOrientation="white"
                  customBoardStyle={{
                    borderRadius: '8px',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
                  }}
                  customDarkSquareStyle={{ backgroundColor: '#8B4513' }}
                  customLightSquareStyle={{ backgroundColor: '#F5E6D3' }}
                  customPremoveDarkSquareStyle={{ backgroundColor: '#C4A484' }}
                  customPremoveLightSquareStyle={{ backgroundColor: '#F0E1CE' }}
                  customSquareStyles={hintSquareStyles}
                  customArrows={hintArrows}
                />
              </div>
            </div>
          </div>

          {/* Game Panel */}
          <div className="space-y-6">
            {/* Status */}
            <GameStatus gameState={gameState} />
            
            {/* Controls */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Contrôles</h3>
              <GameControls
                gameState={gameState}
                onNewLine={startNewLine}
                onReset={resetPosition}
                onShowHint={showHint}
                onShowSolution={() => setShowSolution(true)}
                onBackToSelection={backToSelection}
              />
            </div>

            {/* Move History */}
            <MoveHistory gameState={gameState} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-sm text-gray-500">
          <p>Développez votre répertoire d'ouverture avec un entraînement interactif</p>
        </div>
      </div>

      {/* Solution Modal */}
      <SolutionModal
        line={gameState.currentLine}
        isOpen={showSolution}
        onClose={() => setShowSolution(false)}
      />
    </div>
  );
}

export default App;