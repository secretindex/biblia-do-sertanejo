
import React, { useState } from 'react';
import { Upload, FileAudio, Book, Type, User, List, CheckCircle } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [password, setPassword] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [done, setDone] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') { // Simple mock auth
      setIsLogged(true);
    } else {
      alert("Senha incorreta. Dica: use 1234");
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      setDone(true);
      setTimeout(() => setDone(false), 3000);
    }, 2000);
  };

  if (!isLogged) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6">
        <div className="bg-amber-100 p-6 rounded-full mb-6 text-amber-800">
          <User size={64} />
        </div>
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Painel de Pastor</h2>
        <p className="text-stone-500 text-center mb-8">Apenas administradores podem enviar novas narrações.</p>
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <input 
            type="password" 
            placeholder="Senha de Acesso" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border-2 border-stone-200 rounded-2xl focus:border-amber-500 outline-none"
          />
          <button className="w-full bg-amber-800 text-white font-bold py-4 rounded-2xl shadow-lg active:scale-95 transition">
            Entrar no Painel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-stone-800">Novo Áudio</h2>
        <button onClick={() => setIsLogged(false)} className="text-stone-400 text-xs font-bold uppercase">Sair</button>
      </div>

      <form onSubmit={handleUpload} className="space-y-5 bg-white p-6 rounded-3xl shadow-sm border border-stone-100">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-stone-400 px-1">Livro da Bíblia</label>
          <div className="relative">
            <Book className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
            <select className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 pl-12 appearance-none">
              <option>Gênesis</option>
              <option>Salmos</option>
              <option>Mateus</option>
              <option>João</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-stone-400 px-1">Capítulo</label>
            <input type="number" placeholder="Ex: 23" className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-stone-400 px-1">Versículos</label>
            <input type="text" placeholder="Ex: 1-10" className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-stone-400 px-1">Nome do Narrador</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
            <input type="text" placeholder="Quem gravou?" className="w-full bg-stone-50 border border-stone-200 rounded-xl p-4 pl-12" />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase text-stone-400 px-1">Arquivo MP3</label>
          <div className="border-2 border-dashed border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center text-stone-400 bg-stone-50 hover:bg-stone-100 transition cursor-pointer">
            <FileAudio size={48} className="mb-2" />
            <span className="text-sm">Clique para selecionar o áudio</span>
            <input type="file" className="hidden" />
          </div>
        </div>

        <button 
          disabled={isUploading}
          className={`w-full font-bold py-4 rounded-2xl shadow-lg transition flex items-center justify-center gap-2 ${isUploading ? 'bg-stone-300 text-stone-500' : 'bg-green-700 text-white active:scale-95'}`}
        >
          {isUploading ? 'Subindo áudio...' : done ? <><CheckCircle size={20}/> Sucesso!</> : <><Upload size={20}/> Salvar Narração</>}
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
