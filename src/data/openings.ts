import { Opening } from '../types/chess';

export const openings: Opening[] = [
  {
    id: 'vienna-game',
    name: 'Gambit Viennoise',
    description: 'Ouverture agressive avec 1.e4 e5 2.Nc3, visant un développement rapide et des attaques tactiques.',
    startingMoves: ['e4', 'e5', 'Nc3'],
    color: 'amber',
    icon: 'Crown',
    lines: [
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
    ]
  },
  {
    id: 'ruy-lopez',
    name: 'Ruy Lopez',
    description: 'Ouverture classique avec 1.e4 e5 2.Nf3 Nc6 3.Bb5, une des plus anciennes et respectées.',
    startingMoves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5'],
    color: 'red',
    icon: 'Shield',
    lines: [
      {
        id: 'ruy-morphy',
        name: 'Défense Morphy',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'a6', 'Ba4', 'Nf6', 'O-O', 'Be7', 'Re1', 'b5', 'Bb3'],
        description: 'Ligne principale avec 3...a6 4.Ba4 Nf6'
      },
      {
        id: 'ruy-berlin',
        name: 'Défense de Berlin',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'Nf6', 'O-O', 'Nxe4', 'd4', 'Nd6', 'Bxc6', 'dxc6', 'dxe5'],
        description: 'Défense solide avec 3...Nf6'
      },
      {
        id: 'ruy-steinitz',
        name: 'Défense Steinitz',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bb5', 'd6', 'd4', 'Bd7', 'Nc3', 'Nf6', 'O-O'],
        description: 'Système défensif avec 3...d6'
      }
    ]
  },
  {
    id: 'italian-game',
    name: 'Partie Italienne',
    description: 'Ouverture directe avec 1.e4 e5 2.Nf3 Nc6 3.Bc4, visant le contrôle du centre et f7.',
    startingMoves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4'],
    color: 'green',
    icon: 'Castle',
    lines: [
      {
        id: 'italian-classical',
        name: 'Variante Classique',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Bc5', 'c3', 'Nf6', 'd3', 'd6', 'O-O'],
        description: 'Développement symétrique avec 3...Bc5'
      },
      {
        id: 'italian-two-knights',
        name: 'Défense des Deux Cavaliers',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Nf6', 'Ng5', 'd5', 'exd5', 'Nxd5', 'Nxf7'],
        description: 'Attaque tactique avec 4.Ng5'
      },
      {
        id: 'italian-hungarian',
        name: 'Défense Hongroise',
        moves: ['e4', 'e5', 'Nf3', 'Nc6', 'Bc4', 'Be7', 'd3', 'Nf6', 'O-O', 'O-O', 'Re1'],
        description: 'Système solide avec 3...Be7'
      }
    ]
  },
  {
    id: 'kings-gambit',
    name: 'Gambit du Roi',
    description: 'Ouverture romantique avec 1.e4 e5 2.f4, sacrifiant un pion pour l\'initiative.',
    startingMoves: ['e4', 'e5', 'f4'],
    color: 'purple',
    icon: 'Zap',
    lines: [
      {
        id: 'kings-gambit-accepted',
        name: 'Gambit Accepté',
        moves: ['e4', 'e5', 'f4', 'exf4', 'Nf3', 'g5', 'h4', 'g4', 'Ne5', 'Nf6', 'Bc4'],
        description: 'Ligne principale après 2...exf4'
      },
      {
        id: 'kings-gambit-declined',
        name: 'Gambit Décliné',
        moves: ['e4', 'e5', 'f4', 'Bc5', 'Nf3', 'd6', 'c3', 'Nf6', 'd4', 'exd4', 'cxd4'],
        description: 'Refus du gambit avec 2...Bc5'
      },
      {
        id: 'kings-gambit-falkbeer',
        name: 'Contre-Gambit Falkbeer',
        moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'e4', 'd3', 'Nf6', 'dxe4', 'Nxe4', 'Nf3'],
        description: 'Contre-attaque avec 2...d5'
      }
    ]
  }
];

export function getOpeningById(id: string): Opening | undefined {
  return openings.find(opening => opening.id === id);
}

export function getRandomLine(opening: Opening): OpeningLine {
  return opening.lines[Math.floor(Math.random() * opening.lines.length)];
}