
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Download, 
  Trash2, 
  Star, 
  Share2,
  Volume2,
  Clock,
  FastForward,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MOCK_AUDIOS } from '../constants';
import { AudioChapter, AppState } from '../types';

interface PlayerViewProps {
  toggleFavorite: (id: string) => void;
  toggleDownload: (id: string) => void;
  appState: AppState;
  isOnline: boolean;
}

const PlayerView: React.FC<PlayerViewProps> = ({ toggleFavorite, toggleDownload, appState, isOnline }) => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(appState.playbackSpeed);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audio = MOCK_AUDIOS.find(a => a.id === chapterId);
  const isDownloaded = appState.downloadedIds.includes(chapterId || '');
  const isFavorite = appState.favorites.includes(chapterId || '');

  // Handle case where mock audio doesn't exist for the ID
  const effectiveAudio = audio || {
    id: chapterId!,
    bookTitle: chapterId?.split('-')[0] || 'Desconhecido',
    chapter: parseInt(chapterId?.split('-')[1] || '1'),
    narrator: 'Aguardando Narração',
    audioUrl: '',
    verses: '1-10',
    isDownloaded: false
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
    }
  }, [playbackSpeed]);

  const handlePlayPause = () => {
    if (!effectiveAudio.audioUrl) {
      alert("Este capítulo ainda não possui áudio disponível.");
      return;
    }
    if (!isOnline && !isDownloaded) {
      alert("Você precisa baixar este capítulo para ouvir offline.");
      return;
    }

    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      setProgress((current / total) * 100);
      setDuration(total);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (audioRef.current) {
      const newTime = (val / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(val);
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="flex flex-col h-full space-y-8 py-4">
      <audio 
        ref={audioRef} 
        src={effectiveAudio.audioUrl} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Album Art / Header */}
      <div className="relative aspect-square w-full rounded-3xl overflow-hidden shadow-2xl bg-stone-200">
        <img 
          src={`https://picsum.photos/seed/${effectiveAudio.bookTitle}/600`} 
          className="w-full h-full object-cover filter brightness-75"
          alt="Capa do Livro"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6 text-white">
          <p className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-1">Narração Caipira</p>
          <h2 className="text-3xl font-bold">{effectiveAudio.bookTitle}</h2>
          <p className="text-xl font-medium">Capítulo {effectiveAudio.chapter}</p>
        </div>
      </div>

      {/* Info & Meta */}
      <div className="flex justify-between items-center px-2">
        <div>
          <p className="text-stone-400 text-xs font-bold uppercase">Narrador</p>
          <p className="text-stone-800 font-semibold">{effectiveAudio.narrator}</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => toggleFavorite(effectiveAudio.id)}
            className={`p-3 rounded-2xl transition ${isFavorite ? 'text-amber-600 bg-amber-50' : 'text-stone-400 bg-stone-100'}`}
          >
            <Star size={24} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
          <button 
            onClick={() => toggleDownload(effectiveAudio.id)}
            className={`p-3 rounded-2xl transition ${isDownloaded ? 'text-green-600 bg-green-50' : 'text-amber-700 bg-amber-50'}`}
          >
            {isDownloaded ? <CheckCircle2 size={24} /> : <Download size={24} />}
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={progress} 
          onChange={handleSeek}
          className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-amber-800"
        />
        <div className="flex justify-between text-xs font-bold text-stone-400 uppercase">
          <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-8">
        <button className="text-stone-400 hover:text-amber-800 transition">
          <SkipBack size={32} />
        </button>
        <button 
          onClick={handlePlayPause}
          className="w-20 h-20 bg-amber-800 text-white rounded-full flex items-center justify-center shadow-xl shadow-amber-900/20 active:scale-95 transition"
        >
          {isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} className="ml-1" fill="currentColor" />}
        </button>
        <button className="text-stone-400 hover:text-amber-800 transition">
          <SkipForward size={32} />
        </button>
      </div>

      {/* Speed Selector */}
      <div className="flex justify-center items-center gap-4 bg-stone-100 p-2 rounded-2xl">
        <Clock size={16} className="text-stone-400" />
        {[0.75, 1, 1.25, 1.5].map(speed => (
          <button 
            key={speed}
            onClick={() => setPlaybackSpeed(speed)}
            className={`px-3 py-1 text-sm font-bold rounded-xl transition ${playbackSpeed === speed ? 'bg-amber-800 text-white shadow-md' : 'text-stone-500'}`}
          >
            {speed}x
          </button>
        ))}
      </div>

      {/* Warning if offline and not downloaded */}
      {!isOnline && !isDownloaded && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3">
          <AlertCircle className="text-red-500" size={24} />
          <p className="text-red-800 text-sm font-medium">Você está offline e este áudio ainda não foi baixado.</p>
        </div>
      )}
    </div>
  );
};

export default PlayerView;
