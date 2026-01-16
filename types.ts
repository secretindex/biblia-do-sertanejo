
export enum Testament {
  OLD = 'Antigo Testamento',
  NEW = 'Novo Testamento'
}

export interface AudioChapter {
  id: string;
  bookId: string;
  bookTitle: string;
  chapter: number;
  verses: string;
  narrator: string;
  audioUrl: string;
  duration?: number;
  isDownloaded: boolean;
}

export interface Book {
  id: string;
  title: string;
  testament: Testament;
  chaptersCount: number;
  category: string;
}

export interface AppState {
  favorites: string[]; // ids of AudioChapters
  downloadedIds: string[]; // ids of AudioChapters
  lastPlayedId?: string;
  playbackSpeed: number;
}
