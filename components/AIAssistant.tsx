
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, Send, Sparkles, Sprout, Coffee } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [reflection, setReflection] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getReflection = async () => {
    if (!prompt) return;
    setLoading(true);
    setReflection(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Como um sábio senhor do interior, um capataz de fé, me explique o seguinte tema bíblico de forma simples, usando gírias do sertão (caipira) e uma lição de vida para quem vive na roça: ${prompt}`,
        config: {
          systemInstruction: "Você é um conselheiro cristão do interior do Brasil, fala com sotaque caipira/sertanejo, é muito acolhedor, usa analogias com o campo, a lida, o café, a chuva e a colheita. Seja simples e piedoso.",
          temperature: 0.8
        }
      });

      setReflection(response.text || "Ixi, parece que o sinal falhou por aqui. Tente de novo, meu caro!");
    } catch (error) {
      console.error(error);
      setReflection("O sinal tá fraco agora, deve ser a trovoada que vem vindo. Tente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="bg-gradient-to-br from-amber-700 to-orange-900 text-white p-8 rounded-3xl shadow-xl overflow-hidden relative">
        <Sparkles className="absolute -right-4 -top-4 text-white/10 w-32 h-32" />
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          Reflexão do Sábio
        </h2>
        <p className="text-amber-100 text-sm">
          Ficou com alguma dúvida sobre a palavra? O nosso "Capelão do Sertão" te ajuda a entender com o nosso jeitinho.
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <textarea 
            placeholder="Ex: O que Jesus quis dizer com a semente que cai na terra?" 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full bg-white border-2 border-stone-200 rounded-2xl p-4 pr-12 focus:border-amber-500 focus:outline-none transition resize-none shadow-sm"
          />
          <button 
            onClick={getReflection}
            disabled={loading}
            className="absolute right-3 bottom-3 p-3 bg-amber-800 text-white rounded-xl shadow-md disabled:bg-stone-300"
          >
            {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div> : <Send size={20} />}
          </button>
        </div>

        {reflection && (
          <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-3 mb-4 text-amber-800">
              <div className="p-2 bg-amber-100 rounded-full">
                <Coffee size={20} />
              </div>
              <span className="font-bold text-sm uppercase tracking-wider">Palavra do Conselheiro</span>
            </div>
            <p className="text-stone-700 leading-relaxed italic whitespace-pre-wrap font-serif">
              "{reflection}"
            </p>
            <div className="mt-6 pt-4 border-t border-stone-100 flex items-center gap-2 text-stone-400 italic text-xs">
              <Sprout size={14} />
              <span>Plante o bem para colher a paz.</span>
            </div>
          </div>
        )}

        {!reflection && !loading && (
          <div className="text-center py-10 opacity-40">
            <MessageSquare size={48} className="mx-auto text-stone-300 mb-2" />
            <p className="text-sm font-medium">Pergunte algo sobre a Bíblia acima</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
