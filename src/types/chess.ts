export interface OpeningLine {
  id: string;
  name: string;
  moves: string[];
  description: string;
}

export interface Opening {
  id: string;
  name: string;
  description: string;
  startingMoves: string[];
  lines: OpeningLine[];
  color: string; // Tailwind color class
  icon: string; // Lucide icon name
}

export interface GameState {
  currentOpening: Opening | null;
  currentLine: OpeningLine | null;
  moveIndex: number;
  userMoves: string[];
  isComplete: boolean;
  isCorrect: boolean;
  message: string;
}

export interface MoveResult {
  isValid: boolean;
  expectedMove: string | null;
  message: string;
  isComplete: boolean;
}