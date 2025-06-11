import React from 'react';
import { Opening } from '../types/chess';
import { openings } from '../data/openings';
import { Crown, Shield, Castle, Zap, ChevronRight } from 'lucide-react';

interface OpeningSelectorProps {
  onSelectOpening: (opening: Opening) => void;
}

const iconMap = {
  Crown,
  Shield,
  Castle,
  Zap
};

export function OpeningSelector({ onSelectOpening }: OpeningSelectorProps) {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      amber: 'from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 border-amber-300',
      red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-red-300',
      green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 border-green-300',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 border-purple-300'
    };
    return colorMap[color] || colorMap.amber;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Entraîneur d'Ouvertures
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Perfectionnez votre répertoire d'ouvertures avec un entraînement interactif. 
            Choisissez votre ouverture préférée et maîtrisez ses lignes principales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {openings.map((opening) => {
            const IconComponent = iconMap[opening.icon as keyof typeof iconMap];
            const colorClasses = getColorClasses(opening.color);
            
            return (
              <div
                key={opening.id}
                onClick={() => onSelectOpening(opening)}
                className={`group cursor-pointer bg-gradient-to-br ${colorClasses} text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border-2`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white bg-opacity-20 rounded-xl">
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{opening.name}</h3>
                      <p className="text-sm opacity-90">
                        {opening.lines.length} ligne{opening.lines.length > 1 ? 's' : ''} d'entraînement
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </div>
                
                <p className="text-white text-opacity-90 mb-6 leading-relaxed">
                  {opening.description}
                </p>
                
                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">Coups d'ouverture:</p>
                  <p className="font-mono text-lg">
                    {opening.startingMoves.map((move, index) => (
                      <span key={index}>
                        {index > 0 && index % 2 === 0 && ` ${Math.floor(index / 2) + 1}.`}
                        {index > 0 && ' '}
                        {move}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Comment ça fonctionne ?
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <p>Choisissez votre ouverture préférée</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <p>Entraînez-vous sur les lignes principales</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <p>Maîtrisez votre répertoire</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}