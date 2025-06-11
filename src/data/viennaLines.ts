import { ViennaLine } from '../types/chess';

export const viennaLines: ViennaLine[] = [
  {
    id: 'vienna-knight-f6',
    name: '2...Nf6 - Coupe attaque',
    moves: ['e4', 'e5', 'Nc3', 'Nf6', 'f4', 'd5', 'fxe5', 'Nxe4', 'Nxe4', 'dxe4', 'd3'],
    description: 'Ligne principale contre 2...Nf6 avec f4 et d5'
  },
  {
    id: 'vienna-knight-c6-g3',
    name: '2...Nc6 3.g3 - Développement fianchetto',
    moves: ['e4', 'e5', 'Nc3', 'Nc6', 'g3', 'Nf6', 'Bg2', 'Bb4', 'Nd5'],
    description: 'Système avec g3 et fianchetto du fou'
  },
  {
    id: 'vienna-knight-c6-bc4',
    name: '2...Nc6 3.Bc4 - Attaque classique',
    moves: ['e4', 'e5', 'Nc3', 'Nc6', 'Bc4', 'Be7', 'd3', 'Nf6', 'f4'],
    description: 'Développement naturel avec Bc4'
  },
  {
    id: 'vienna-bishop-c5',
    name: '2...Bc5 3.Na4 - Chasse le fou',
    moves: ['e4', 'e5', 'Nc3', 'Bc5', 'Na4', 'Bb6', 'Nxb6', 'axb6', 'd3', 'Nf6', 'Bg5'],
    description: 'Échange favorable des fous de cases noires'
  },
  {
    id: 'vienna-pawn-f5',
    name: '2...f5 - Contre-attaque pion',
    moves: ['e4', 'e5', 'Nc3', 'f5', 'exf5', 'exf4', 'Nf3', 'Nf6', 'd4'],
    description: 'Jeu tactique après 2...f5'
  },
  {
    id: 'vienna-knight-c6-nge2',
    name: '2...Nc6 3.Nge2 - Système moderne',
    moves: ['e4', 'e5', 'Nc3', 'Nc6', 'Nge2', 'Nf6', 'g3', 'Bb4', 'Bg2', 'O-O', 'O-O'],
    description: 'Développement moderne avec Nge2'
  }
];

export function getRandomLine(): ViennaLine {
  return viennaLines[Math.floor(Math.random() * viennaLines.length)];
}

export function getLineById(id: string): ViennaLine | undefined {
  return viennaLines.find(line => line.id === id);
}