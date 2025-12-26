import React, { useState } from 'react';
import { Send, Image as ImageIcon, Menu, Search, Bell, ChevronLeft } from 'lucide-react';
import { ReportData, ReportCategory, SecurityType } from '../types';

interface DiscreteInterfaceProps {
  initialReportData: Partial<ReportData>;
  onSubmit: (data: Partial<ReportData>) => void;
  onCancel: () => void;
}

export const DiscreteInterface: React.FC<DiscreteInterfaceProps> = ({ initialReportData, onSubmit, onCancel }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // This component mimics a news feed ("BH News")
  // The user types the incident report into a "Comment" field.

  const handleFakeSubmit = () => {
    if (!comment.trim()) return;
    setIsSubmitting(true);
    
    // Construct the real report behind the scenes
    const finalReport: Partial<ReportData> = {
      ...initialReportData,
      description: comment, // The comment is actually the report description
      category: ReportCategory.SECURITY,
      subCategory: SecurityType.HARASSMENT,
      isDiscrete: true,
      timestamp: Date.now(),
    };

    setTimeout(() => {
      // Simulate network request then submit
      onSubmit(finalReport);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 text-gray-800 font-sans">
      {/* Fake Header */}
      <header className="bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {/* Back button disguised as a 'Back to News List' button */}
          <button onClick={onCancel} className="text-gray-600">
             <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold text-bh-blue tracking-tight">BH Notícias</h1>
        </div>
        <div className="flex gap-4">
          <Search className="w-6 h-6 text-gray-600" />
          <Bell className="w-6 h-6 text-gray-600" />
        </div>
      </header>

      {/* Fake News Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <article className="bg-white mb-2 p-0">
          <div className="h-48 bg-gray-300 w-full relative">
            <img 
              src="https://picsum.photos/800/400?grayscale" 
              alt="Trânsito" 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-4 bg-red-600 text-white text-xs px-2 py-1 uppercase font-bold">
              Ao Vivo
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-xl font-bold leading-tight mb-2">
              Trânsito intenso na região central de BH nesta manhã
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Atualizado há 10 minutos • Por Redação
            </p>
            <p className="text-gray-700 leading-relaxed">
              Motoristas enfrentam lentidão na Avenida Afonso Pena devido a obras de manutenção. 
              A BHTrans recomenda rotas alternativas para quem segue em direção à Savassi.
              O transporte público opera com atrasos pontuais.
            </p>
          </div>
          
          {/* Reaction Bar */}
          <div className="border-t border-b border-gray-100 px-4 py-3 flex justify-between text-gray-500 text-sm">
            <span>24 Comentários</span>
            <span>108 Compartilhamentos</span>
          </div>
        </article>

        {/* The Discrete Input Area */}
        <div className="bg-white p-4 mt-2">
          <h3 className="font-semibold text-gray-800 mb-3">Deixe seu comentário</h3>
          <div className="flex gap-2 items-start">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
            <div className="flex-1">
              <textarea 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Escreva sua opinião..." 
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-bh-blue resize-none h-24"
              />
              <div className="flex justify-between items-center mt-2">
                <button className="text-gray-400">
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={handleFakeSubmit}
                  disabled={!comment.trim() || isSubmitting}
                  className={`px-4 py-2 rounded-full text-sm font-semibold text-white transition-colors ${
                    comment.trim() ? 'bg-bh-blue hover:bg-blue-700' : 'bg-blue-200'
                  }`}
                >
                  {isSubmitting ? 'Publicando...' : 'Publicar'}
                </button>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            Comentários são de responsabilidade exclusiva dos autores.
          </p>
        </div>
      </div>
      
      {/* Explicit Exit for Safety */}
      <button onClick={onCancel} className="fixed bottom-0 left-0 w-full p-3 text-center text-xs text-gray-400 bg-gray-100/90 border-t">
        Sair do modo discreto
      </button>
    </div>
  );
};