
import { Testament, Book, AudioChapter } from './types';

export const BIBLE_BOOKS: Book[] = [
  // Antigo Testamento
  { id: 'gen', title: 'Gênesis', testament: Testament.OLD, chaptersCount: 50, category: 'Pentateuco' },
  { id: 'exo', title: 'Êxodo', testament: Testament.OLD, chaptersCount: 40, category: 'Pentateuco' },
  { id: 'psa', title: 'Salmos', testament: Testament.OLD, chaptersCount: 150, category: 'Poesia' },
  { id: 'pro', title: 'Provérbios', testament: Testament.OLD, chaptersCount: 31, category: 'Poesia' },
  
  // Novo Testamento
  { id: 'mat', title: 'Mateus', testament: Testament.NEW, chaptersCount: 28, category: 'Evangelhos' },
  { id: 'mar', title: 'Marcos', testament: Testament.NEW, chaptersCount: 16, category: 'Evangelhos' },
  { id: 'luk', title: 'Lucas', testament: Testament.NEW, chaptersCount: 24, category: 'Evangelhos' },
  { id: 'joh', title: 'João', testament: Testament.NEW, chaptersCount: 21, category: 'Evangelhos' },
  { id: 'rom', title: 'Romanos', testament: Testament.NEW, chaptersCount: 16, category: 'Epístolas' },
  { id: 'rev', title: 'Apocalipse', testament: Testament.NEW, chaptersCount: 22, category: 'Profecia' },
];

// Mock Audio data for demo
export const MOCK_AUDIOS: AudioChapter[] = [
  {
    id: 'gen-1',
    bookId: 'gen',
    bookTitle: 'Gênesis',
    chapter: 1,
    verses: '1-31',
    narrator: 'Tião Carreiro (Simulação)',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    isDownloaded: false
  },
  {
    id: 'psa-23',
    bookId: 'psa',
    bookTitle: 'Salmos',
    chapter: 23,
    verses: '1-6',
    narrator: 'Zezé (Simulação)',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    isDownloaded: false
  }
];

export const APP_THEME = {
  primary: 'brown-800',
  secondary: 'amber-700',
  accent: 'stone-600',
  background: 'stone-50',
};
