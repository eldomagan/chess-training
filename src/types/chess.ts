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
  /**
   * Niveau d'indice:
   * 0 - aucun indice
   * 1 - pièce à jouer mise en évidence
   * 2 - coup affiché avec une flèche
   */
  hintLevel: number;
  hintFrom: string | null;
  hintTo: string | null;
}

export interface MoveResult {
  isValid: boolean;
  expectedMove: string | null;
  message: string;
  isComplete: boolean;
}