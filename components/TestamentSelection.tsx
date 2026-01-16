
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ScrollText, BookOpen } from 'lucide-react';
import { Testament } from '../types';

const TestamentSelection: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 py-4">
      <Link 
        to="/testament/old" 
        className="group relative h-40 rounded-3xl overflow-hidden shadow-lg transform transition active:scale-95"
      >
        <img 
          src="https://picsum.photos/seed/old-testament/800/400" 
          className="absolute inset-0 w-full h-full object-cover filter sepia contrast-125"
          alt="Antigo Testamento" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
        <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white">
          <div className="p-3 bg-amber-600 rounded-2xl">
            <ScrollText size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Antigo Testamento</h2>
            <p className="text-stone-300 text-sm">A lei e as promessas</p>
          </div>
        </div>
      </Link>

      <Link 
        to="/testament/new" 
        className="group relative h-40 rounded-3xl overflow-hidden shadow-lg transform transition active:scale-95"
      >
        <img 
          src="https://picsum.photos/seed/new-testament/800/400" 
          className="absolute inset-0 w-full h-full object-cover filter sepia brightness-75"
          alt="Novo Testamento" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-amber-900 via-amber-900/40 to-transparent"></div>
        <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white">
          <div className="p-3 bg-amber-500 rounded-2xl">
            <BookOpen size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Novo Testamento</h2>
            <p className="text-stone-300 text-sm">A graça e a vida</p>
          </div>
        </div>
      </Link>

      <div className="mt-4 p-6 bg-stone-100 rounded-3xl border-2 border-dashed border-stone-200 flex flex-col items-center text-center">
        <h3 className="font-serif italic text-stone-600 text-lg">"O Senhor é o meu pastor, nada me faltará."</h3>
        <p className="text-xs mt-2 text-stone-400 font-bold uppercase tracking-widest">Salmo 23:1</p>
      </div>
    </div>
  );
};

export default TestamentSelection;
