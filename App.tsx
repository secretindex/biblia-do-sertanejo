
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Book as BookIcon, 
  Download, 
  Settings, 
  ArrowLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Star,
  Search,
  CloudOff,
  User,
  Music,
  Info
} from 'lucide-react';
import { Testament, Book, AudioChapter, AppState } from './types';
import { BIBLE_BOOKS, MOCK_AUDIOS } from './constants';
import TestamentSelection from './components/TestamentSelection';
import BookList from './components/BookList';
import ChapterList from './components/ChapterList';
import PlayerView from './components/PlayerView';
import AdminPanel from './components/AdminPanel';
import AIAssistant from './components/AIAssistant';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(() => {
    const saved = localStorage.getItem('biblia_sertanejo_state');
    return saved ? JSON.parse(saved) : {
      favorites: [],
      downloadedIds: [],
      playbackSpeed: 1.0
    };
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    localStorage.setItem('biblia_sertanejo_state', JSON.stringify(appState));
  }, [appState]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const toggleFavorite = (id: string) => {
    setAppState(prev => ({
      ...prev,
      favorites: prev.favorites.includes(id) 
        ? prev.favorites.filter(fid => fid !== id)
        : [...prev.favorites, id]
    }));
  };

  const toggleDownload = (id: string) => {
    setAppState(prev => ({
      ...prev,
      downloadedIds: prev.downloadedIds.includes(id) 
        ? prev.downloadedIds.filter(did => did !== id)
        : [...prev.downloadedIds, id]
    }));
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col max-w-md mx-auto bg-white shadow-xl relative pb-20">
        {/* Connection Status Bar */}
        {!isOnline && (
          <div className="bg-red-600 text-white text-xs py-1 px-4 flex items-center justify-center gap-2">
            <CloudOff size={14} />
            <span>Modo Offline Ativado</span>
          </div>
        )}

        <Header />
        
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<TestamentSelection />} />
            <Route path="/testament/:type" element={<BookList books={BIBLE_BOOKS} />} />
            <Route path="/book/:bookId" element={<ChapterList books={BIBLE_BOOKS} />} />
            <Route path="/player/:chapterId" element={
              <PlayerView 
                toggleFavorite={toggleFavorite} 
                toggleDownload={toggleDownload} 
                appState={appState}
                isOnline={isOnline}
              />
            } />
            <Route path="/downloads" element={<DownloadsList appState={appState} />} />
            <Route path="/settings" element={<SettingsView />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/search" element={<SearchView books={BIBLE_BOOKS} />} />
            <Route path="/ai-reflection" element={<AIAssistant />} />
          </Routes>
        </main>

        <NavBar />
      </div>
    </HashRouter>
  );
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="bg-amber-800 text-white p-6 shadow-md rounded-b-3xl">
      <div className="flex items-center justify-between mb-2">
        {!isHome && (
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-amber-700 rounded-full transition">
            <ArrowLeft size={24} />
          </button>
        )}
        <div className={isHome ? 'text-center w-full' : 'text-left flex-1 px-4'}>
          <h1 className="text-2xl font-bold tracking-tight">Bíblia do Sertanejo</h1>
          {isHome && <p className="text-amber-200 text-sm mt-1">A Palavra com o jeito da nossa terra</p>}
        </div>
        {isHome && (
          <Link to="/admin" className="p-2 -mr-2 text-amber-300">
            <User size={20} />
          </Link>
        )}
      </div>
    </header>
  );
};

const NavBar: React.FC = () => {
  const location = useLocation();
  const activeClass = "text-amber-800";
  const inactiveClass = "text-stone-400";

  return (
    <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-stone-200 px-6 py-3 flex justify-between items-center z-50">
      <Link to="/" className={`flex flex-col items-center ${location.pathname === '/' ? activeClass : inactiveClass}`}>
        <Home size={24} />
        <span className="text-[10px] mt-1 font-semibold uppercase tracking-wide">Início</span>
      </Link>
      <Link to="/search" className={`flex flex-col items-center ${location.pathname === '/search' ? activeClass : inactiveClass}`}>
        <Search size={24} />
        <span className="text-[10px] mt-1 font-semibold uppercase tracking-wide">Buscar</span>
      </Link>
      <Link to="/ai-reflection" className={`flex flex-col items-center ${location.pathname === '/ai-reflection' ? activeClass : inactiveClass}`}>
        <div className="bg-amber-100 p-2 rounded-full -mt-8 border-4 border-white shadow-lg text-amber-800">
          <Music size={24} />
        </div>
        <span className="text-[10px] mt-1 font-semibold uppercase tracking-wide">Reflexão</span>
      </Link>
      <Link to="/downloads" className={`flex flex-col items-center ${location.pathname === '/downloads' ? activeClass : inactiveClass}`}>
        <Download size={24} />
        <span className="text-[10px] mt-1 font-semibold uppercase tracking-wide">Offline</span>
      </Link>
      <Link to="/settings" className={`flex flex-col items-center ${location.pathname === '/settings' ? activeClass : inactiveClass}`}>
        <Settings size={24} />
        <span className="text-[10px] mt-1 font-semibold uppercase tracking-wide">Ajustes</span>
      </Link>
    </nav>
  );
};

const DownloadsList: React.FC<{ appState: AppState }> = ({ appState }) => {
  const downloadedAudios = MOCK_AUDIOS.filter(a => appState.downloadedIds.includes(a.id));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2 text-stone-700">
        <Download size={20} className="text-amber-800" />
        Meus Áudios Baixados
      </h2>
      {downloadedAudios.length === 0 ? (
        <div className="text-center py-12 bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200">
          <CloudOff size={48} className="mx-auto text-stone-300 mb-4" />
          <p className="text-stone-500">Nenhum áudio baixado ainda.<br/>Baixe capítulos para ouvir sem internet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {downloadedAudios.map(audio => (
            <Link 
              key={audio.id}
              to={`/player/${audio.id}`}
              className="flex items-center justify-between p-4 bg-white border border-stone-100 rounded-xl shadow-sm hover:border-amber-200 transition"
            >
              <div>
                <h3 className="font-bold text-stone-800">{audio.bookTitle} - Cap. {audio.chapter}</h3>
                <p className="text-xs text-stone-500">Narrador: {audio.narrator}</p>
              </div>
              <ChevronRight className="text-stone-400" size={20} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const SettingsView: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-stone-800">Configurações</h2>
      
      <div className="space-y-2">
        <p className="text-sm font-semibold text-stone-500 uppercase px-2">Acessibilidade</p>
        <div className="bg-stone-50 rounded-2xl divide-y divide-stone-200 overflow-hidden border border-stone-200">
          <div className="p-4 flex justify-between items-center">
            <span>Tamanho do Texto</span>
            <span className="text-amber-800 font-bold">Médio</span>
          </div>
          <div className="p-4 flex justify-between items-center">
            <span>Contraste Alto</span>
            <div className="w-10 h-6 bg-stone-300 rounded-full relative">
              <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-stone-500 uppercase px-2">Sobre o App</p>
        <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200">
          <p className="text-stone-600 text-sm leading-relaxed">
            Este projeto foi criado para levar a palavra de Deus aos corações do sertão. 
            Com amor e simplicidade, como um bom café coado no fim de tarde.
          </p>
          <div className="mt-4 pt-4 border-t border-stone-200 flex justify-between items-center text-xs text-stone-400">
            <span>Versão 1.0.0</span>
            <span>Feito com Fé</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchView: React.FC<{ books: Book[] }> = ({ books }) => {
  const [query, setQuery] = useState('');
  const filtered = books.filter(b => b.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
        <input 
          type="text" 
          placeholder="Qual livro você procura?" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-stone-100 border-2 border-stone-200 rounded-2xl py-3 pl-12 pr-4 focus:border-amber-500 focus:outline-none transition"
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        {filtered.map(book => (
          <Link 
            key={book.id} 
            to={`/book/${book.id}`}
            className="p-4 bg-white rounded-xl border border-stone-100 flex justify-between items-center hover:bg-stone-50 transition"
          >
            <span className="font-semibold text-stone-700">{book.title}</span>
            <span className="text-xs text-stone-400 bg-stone-100 px-2 py-1 rounded-full">{book.testament === Testament.OLD ? 'AT' : 'NT'}</span>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="text-center py-10 text-stone-400">Nenhum livro encontrado com esse nome.</p>
        )}
      </div>
    </div>
  );
}

export default App;
