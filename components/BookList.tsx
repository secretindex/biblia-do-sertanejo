
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Book, Testament } from '../types';
import { ChevronRight } from 'lucide-react';

interface BookListProps {
  books: Book[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  const { type } = useParams<{ type: string }>();
  const testamentType = type === 'old' ? Testament.OLD : Testament.NEW;
  const filteredBooks = books.filter(b => b.testament === testamentType);

  return (
    <div className="space-y-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-stone-800">{testamentType}</h2>
        <p className="text-stone-500 text-sm">{filteredBooks.length} livros carregados</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {filteredBooks.map((book) => (
          <Link
            key={book.id}
            to={`/book/${book.id}`}
            className="flex items-center justify-between p-5 bg-white rounded-2xl shadow-sm border border-stone-100 hover:border-amber-300 transition active:bg-stone-50"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold text-lg">
                {book.title.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-stone-800 text-lg">{book.title}</h3>
                <p className="text-stone-400 text-xs font-semibold uppercase">{book.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-stone-300">
              <span className="text-xs font-bold">{book.chaptersCount} Cap.</span>
              <ChevronRight size={20} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BookList;
