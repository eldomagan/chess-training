import React from 'react';
import { OpeningLine } from '../types/chess';
import { X } from 'lucide-react';

interface SolutionModalProps {
  line: OpeningLine | null;
  isOpen: boolean;
  onClose: () => void;
}

export function SolutionModal({ line, isOpen, onClose }: SolutionModalProps) {
  if (!isOpen || !line) return null;

  const movePairs: string[][] = [];
  for (let i = 0; i < line.moves.length; i += 2) {
    movePairs.push([line.moves[i], line.moves[i + 1]].filter(Boolean));
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-gray-800">Solution complète</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <h3 className="font-semibold text-lg mb-2">{line.name}</h3>
            <p className="text-gray-600 text-sm">{line.description}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium mb-3">Séquence complète:</h4>
            <div className="space-y-2">
              {movePairs.map((pair, index) => (
                <div key={index} className="font-mono text-sm">
                  <span className="text-gray-500">{index + 1}.</span>
                  <span className="ml-2 text-gray-800">{pair[0]}</span>
                  {pair[1] && (
                    <span className="ml-4 text-gray-600">{pair[1]}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Cette séquence représente une des lignes principales de cette ouverture. 
            Étudiez les idées clés et les motifs tactiques pour améliorer votre compréhension.</p>
          </div>
        </div>
      </div>
    </div>
  );
}