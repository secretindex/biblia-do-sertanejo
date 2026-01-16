
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book } from '../types';
import { MOCK_AUDIOS } from '../constants';
import { Download, PlayCircle } from 'lucide-react';

interface ChapterListProps {
  books: Book[];
}

const ChapterList: React.FC<ChapterListProps> = ({ books }) => {
  const { bookId } = useParams<{ bookId: string }>();
  const book = books.find(b => b.id === bookId);

  if (!book) return <div className="p-8 text-center">Livro não encontrado</div>;

  // For demo: only few chapters are "available" (mocked)
  const chapters = Array.from({ length: book.chaptersCount }, (_, i) => i + 1);

  return (
    <div className="space-y-6">
      <div className="mb-6 p-6 bg-stone-800 text-white rounded-3xl shadow-xl">
        <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">{book.category}</p>
        <h2 className="text-3xl font-bold">{book.title}</h2>
        <p className="text-stone-400 text-sm mt-2">Escolha o capítulo para ouvir a narração sertaneja</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {chapters.map(num => {
          const isMockAvailable = MOCK_AUDIOS.some(a => a.bookId === bookId && a.chapter === num);
          const audioId = MOCK_AUDIOS.find(a => a.bookId === bookId && a.chapter === num)?.id || `${bookId}-${num}`;

          return (
            <Link
              key={num}
              to={`/player/${audioId}`}
              className={`
                aspect-square rounded-2xl flex flex-col items-center justify-center transition active:scale-95 shadow-sm
                ${isMockAvailable ? 'bg-amber-600 text-white' : 'bg-stone-100 text-stone-400 opacity-60'}
              `}
            >
              <span className="text-xl font-bold">{num}</span>
              {isMockAvailable && <PlayCircle size={12} className="mt-1" />}
            </Link>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-amber-50 rounded-2xl flex items-start gap-3">
        <div className="p-2 bg-amber-200 rounded-lg text-amber-800">
          <Download size={20} />
        </div>
        <div>
          <h4 className="font-bold text-amber-900 text-sm">Escute Offline</h4>
          <p className="text-amber-700 text-xs mt-0.5 leading-relaxed">
            Abra o capítulo e clique em "Baixar" para conseguir ouvir mesmo se estiver na roça sem internet!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChapterList;
