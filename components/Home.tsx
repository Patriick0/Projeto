
import React from 'react';
import { AlertTriangle, User, Bus, BarChart3, Home as HomeIcon, Map as MapIcon } from 'lucide-react';

interface HomeProps {
  onStartReport: () => void;
  onOpenStats: () => void;
  onOpenProfile: () => void;
  onOpenMyRoute: () => void;
}

export const Home: React.FC<HomeProps> = ({ onStartReport, onOpenStats, onOpenProfile, onOpenMyRoute }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-bh-blue pt-12 pb-8 px-6 rounded-b-[2rem] shadow-xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
          <Bus size={200} />
        </div>
        
        <div className="flex justify-between items-center mb-6 relative z-10">
          <div>
            <p className="text-blue-200 text-sm">Olá, Cidadão</p>
            <h1 className="text-white text-2xl font-bold">Vigia Cidadã</h1>
          </div>
          <button 
            onClick={onOpenProfile}
            className="p-2 bg-white/20 rounded-full text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <User className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Report Button */}
        <button
          onClick={onStartReport}
          className="w-full bg-bh-red text-white p-5 rounded-2xl shadow-lg flex items-center justify-between group relative z-10 hover:bg-red-700 transition-all transform active:scale-95"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold">Denúncia Rápida</h3>
              <p className="text-red-100 text-sm">Relatar problema ou perigo</p>
            </div>
          </div>
          <div className="bg-white/20 p-2 rounded-full">
             <span className="text-2xl font-bold">+</span>
          </div>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 py-6 overflow-y-auto">
        
        {/* Active Alerts */}
        <div className="mb-6">
          <h2 className="text-gray-800 font-bold mb-3 text-lg flex items-center gap-2">
            <span className="w-2 h-6 bg-bh-yellow rounded-full"></span>
            Alertas na Região
          </h2>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-3">
             <div className="flex gap-3">
               <div className="bg-red-100 p-2 rounded-lg h-fit">
                 <AlertTriangle className="w-5 h-5 text-red-600" />
               </div>
               <div>
                 <h4 className="font-bold text-gray-800">Atrasos Linha 8207</h4>
                 <p className="text-sm text-gray-500">Relatos de 20min de atraso na região da Lagoinha.</p>
                 <span className="text-xs text-gray-400 mt-2 block">Há 15 min • 12 denúncias</span>
               </div>
             </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
             <div className="flex gap-3">
               <div className="bg-blue-100 p-2 rounded-lg h-fit">
                 <Bus className="w-5 h-5 text-bh-blue" />
               </div>
               <div>
                 <h4 className="font-bold text-gray-800">Alteração de Itinerário</h4>
                 <p className="text-sm text-gray-500">Desvio na Av. Amazonas devido a obras.</p>
                 <span className="text-xs text-gray-400 mt-2 block">Há 1 hora • BHTrans</span>
               </div>
             </div>
          </div>
        </div>

      </div>

      {/* Bottom Nav */}
      <div className="bg-white border-t border-gray-200 px-6 py-4 flex justify-around">
        <button className="flex flex-col items-center text-bh-blue">
          <HomeIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1">Início</span>
        </button>
        <button 
          onClick={onOpenMyRoute}
          className="flex flex-col items-center text-gray-400 hover:text-bh-blue transition-colors"
        >
          <MapIcon className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1">Trajeto</span>
        </button>
        <button 
          onClick={onOpenStats}
          className="flex flex-col items-center text-gray-400 hover:text-bh-blue transition-colors"
        >
          <BarChart3 className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1">Ranking</span>
        </button>
        <button 
          onClick={onOpenProfile}
          className="flex flex-col items-center text-gray-400 hover:text-bh-blue transition-colors"
        >
          <User className="w-6 h-6" />
          <span className="text-[10px] font-bold mt-1">Perfil</span>
        </button>
      </div>
    </div>
  );
};
