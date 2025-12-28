
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bus, MapPin, Clock, ShieldCheck, AlertTriangle, ChevronRight, Star, Loader2, Navigation } from 'lucide-react';

interface MyRouteScreenProps {
  onBack: () => void;
}

interface FavoriteLine {
  id: string;
  number: string;
  name: string;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
  eta: string;
  activeAlerts: number;
}

export const MyRouteScreen: React.FC<MyRouteScreenProps> = ({ onBack }) => {
  const [selectedLine, setSelectedLine] = useState<FavoriteLine | null>(null);
  const [loadingMap, setLoadingMap] = useState(false);

  const favorites: FavoriteLine[] = [
    { id: '1', number: '4033', name: 'Camargos / Centro', status: 'SAFE', eta: '5 min', activeAlerts: 0 },
    { id: '2', number: '8207', name: 'Maria Goretti / Estrela Dalva', status: 'WARNING', eta: '12 min', activeAlerts: 3 },
    { id: '3', number: '2104', name: 'Nova Gameleira / BH Shopping', status: 'SAFE', eta: '8 min', activeAlerts: 1 },
    { id: '4', number: 'SC01A', name: 'Contorno A', status: 'CRITICAL', eta: '2 min', activeAlerts: 8 },
  ];

  const handleSelectLine = (line: FavoriteLine) => {
    setLoadingMap(true);
    setSelectedLine(line);
    setTimeout(() => setLoadingMap(false), 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SAFE': return 'text-bh-green bg-green-50 border-green-100';
      case 'WARNING': return 'text-bh-yellow bg-yellow-50 border-yellow-100';
      case 'CRITICAL': return 'text-bh-red bg-red-50 border-red-100';
      default: return 'text-gray-500 bg-gray-50 border-gray-100';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'SAFE': return 'bg-bh-green';
      case 'WARNING': return 'bg-bh-yellow';
      case 'CRITICAL': return 'bg-bh-red';
      default: return 'bg-gray-300';
    }
  };

  if (selectedLine) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        {/* Detail Header */}
        <div className="bg-bh-blue px-4 py-4 flex items-center shadow-lg z-10 sticky top-0">
          <button onClick={() => setSelectedLine(null)} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="ml-2">
            <h2 className="text-lg font-bold text-white">Linha {selectedLine.number}</h2>
            <p className="text-xs text-blue-100">{selectedLine.name}</p>
          </div>
        </div>

        {/* Map View Area */}
        <div className="flex-1 relative bg-blue-50 overflow-hidden">
          {loadingMap ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-20">
              <Loader2 className="w-10 h-10 text-bh-blue animate-spin mb-2" />
              <p className="text-sm font-bold text-gray-600">Conectando ao GPS do veículo...</p>
            </div>
          ) : (
            <>
              {/* Mock Map */}
              <div className="absolute inset-0 bg-[#e5e7eb] opacity-40 overflow-hidden">
                 <div className="w-full h-full relative">
                    {/* Fake Streets */}
                    <div className="absolute top-1/2 left-0 w-full h-8 bg-white -rotate-12 transform -translate-y-1/2" />
                    <div className="absolute top-0 left-1/3 w-8 h-full bg-white rotate-6" />
                    <div className="absolute bottom-1/4 right-0 w-full h-6 bg-white rotate-45" />
                 </div>
              </div>

              {/* Real-time markers */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce z-10">
                 <div className="bg-bh-blue p-2 rounded-full shadow-lg border-2 border-white">
                   <Bus className="w-6 h-6 text-white" />
                 </div>
                 <div className="bg-white px-2 py-0.5 rounded shadow-md mt-1 text-[10px] font-bold text-bh-blue text-center whitespace-nowrap">
                    V-20456
                 </div>
              </div>

              <div className="absolute bottom-1/3 left-1/4 z-10">
                 <div className="p-1 bg-red-500 rounded-full shadow-lg animate-pulse" />
                 <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm mt-1 border border-red-100">
                    <p className="text-[10px] font-bold text-red-600">Denúncia: Atraso</p>
                 </div>
              </div>

              {/* Floating Info */}
              <div className="absolute top-4 left-4 right-4 space-y-2">
                 <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <Clock className="w-4 h-4 text-gray-400" />
                       <span className="text-sm font-bold text-gray-700">Previsão: {selectedLine.eta}</span>
                    </div>
                    <div className="flex items-center gap-1">
                       <div className={`w-2 h-2 rounded-full ${getStatusDot(selectedLine.status)}`} />
                       <span className="text-[10px] font-bold uppercase text-gray-500">Status da Rota</span>
                    </div>
                 </div>
              </div>

              {/* Bottom Drawer for Alerts */}
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] p-6 z-20 animate-slide-up">
                 <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2">
                       <ShieldCheck className="w-5 h-5 text-bh-green" />
                       Monitoramento Ativo
                    </h3>
                    <span className="text-xs text-gray-400">Linha verificada por 14 usuários</span>
                 </div>

                 <div className="space-y-3">
                    {selectedLine.activeAlerts > 0 ? (
                       <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-100 flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-bh-yellow shrink-0" />
                          <div>
                             <p className="text-xs font-bold text-yellow-800">Possíveis Incidentes</p>
                             <p className="text-[10px] text-yellow-700 leading-relaxed">
                                {selectedLine.activeAlerts} usuários reportaram problemas nesta linha nos últimos 30 min.
                             </p>
                          </div>
                       </div>
                    ) : (
                       <div className="bg-green-50 p-3 rounded-xl border border-green-100 flex items-start gap-3">
                          <ShieldCheck className="w-5 h-5 text-bh-green shrink-0" />
                          <div>
                             <p className="text-xs font-bold text-green-800">Tudo Tranquilo</p>
                             <p className="text-[10px] text-green-700 leading-relaxed">
                                Nenhuma denúncia de segurança registrada nesta linha hoje.
                             </p>
                          </div>
                       </div>
                    )}
                 </div>

                 <button className="w-full mt-6 py-3 bg-bh-yellow text-black font-bold rounded-xl shadow-md flex items-center justify-center gap-2 hover:bg-yellow-400 transition-colors">
                    <Navigation className="w-4 h-4" />
                    Iniciar Monitoramento do Trajeto
                 </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-bh-blue px-4 py-4 flex items-center shadow-lg z-10 sticky top-0">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="ml-2 text-lg font-bold text-white">Meu Trajeto</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 pb-24">
        <div className="mb-6">
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Favoritos</h3>
          <h1 className="text-2xl font-bold text-gray-800">Minhas Linhas</h1>
          <p className="text-sm text-gray-500 mt-1">Acompanhe seus deslocamentos diários em tempo real.</p>
        </div>

        <div className="space-y-4">
          {favorites.map((line) => (
            <button
              key={line.id}
              onClick={() => handleSelectLine(line)}
              className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between group active:scale-95 transition-transform text-left"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-3 rounded-xl group-hover:bg-blue-50 transition-colors">
                  <Bus className="w-6 h-6 text-bh-blue" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-gray-800 leading-none">{line.number}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${getStatusColor(line.status)}`}>
                      {line.status === 'SAFE' ? 'Segura' : line.status === 'WARNING' ? 'Atenção' : 'Crítica'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 font-medium">{line.name}</p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-bh-blue mb-1">
                   <Clock className="w-3 h-3" />
                   <span className="text-xs font-bold">{line.eta}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 ml-auto" />
              </div>
            </button>
          ))}
        </div>

        {/* Suggestion Card */}
        <div className="mt-8 bg-blue-50 p-6 rounded-2xl border border-dashed border-blue-200 text-center">
           <Star className="w-8 h-8 text-bh-yellow mx-auto mb-3" />
           <h4 className="font-bold text-bh-blue mb-2">Adicionar Nova Linha</h4>
           <p className="text-xs text-gray-500 leading-relaxed mb-4">
             Salve as linhas que você mais usa para receber alertas antecipados e ver a posição do ônibus no mapa.
           </p>
           <button className="bg-white px-6 py-2 rounded-full text-xs font-bold text-bh-blue shadow-sm hover:shadow-md transition-shadow">
             Pesquisar Linhas
           </button>
        </div>
      </div>

      {/* Fixed Bottom Nav spacer */}
      <div className="h-20" />
    </div>
  );
};
