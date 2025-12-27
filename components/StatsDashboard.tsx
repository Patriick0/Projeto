import React, { useEffect, useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, AlertTriangle, Bus, Filter, Search } from 'lucide-react';
import { fetchBusLineRanking } from '../services/geminiService';

interface StatsDashboardProps {
  onBack: () => void;
}

interface RankingItem {
  lineId: string;
  totalReports: number;
  mainIssue: string;
  trend: 'UP' | 'DOWN' | 'STABLE';
}

const BRAZIL_STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", 
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
];

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ onBack }) => {
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [selectedUf, setSelectedUf] = useState('MG');
  const [city, setCity] = useState('Belo Horizonte');

  const loadData = async (uf: string, cityName: string) => {
    setLoading(true);
    const data = await fetchBusLineRanking(uf, cityName);
    if (data && data.ranking) {
      setRanking(data.ranking);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData(selectedUf, city);
  }, []); // Initial load

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    loadData(selectedUf, city);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-bh-blue px-4 py-4 flex items-center shadow-lg z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="ml-2 text-lg font-bold text-white">Ranking Nacional</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        
        {/* Filter Section */}
        <form onSubmit={handleFilter} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
           <div className="flex items-center gap-2 mb-3 text-bh-blue font-bold text-sm uppercase">
             <Filter className="w-4 h-4" />
             Filtrar Localidade
           </div>
           
           <div className="flex gap-3 mb-3">
             <div className="w-1/3">
               <label className="text-xs text-gray-500 font-semibold ml-1">Estado</label>
               <select 
                  value={selectedUf}
                  onChange={(e) => setSelectedUf(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg p-2.5 focus:ring-bh-blue focus:border-bh-blue outline-none"
               >
                 {BRAZIL_STATES.map(uf => (
                   <option key={uf} value={uf}>{uf}</option>
                 ))}
               </select>
             </div>
             <div className="w-2/3">
               <label className="text-xs text-gray-500 font-semibold ml-1">Cidade</label>
               <input 
                  type="text" 
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ex: Curitiba"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg p-2.5 focus:ring-bh-blue focus:border-bh-blue outline-none"
               />
             </div>
           </div>
           
           <button 
             type="submit"
             className="w-full bg-bh-blue text-white font-bold py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
           >
             <Search className="w-4 h-4" />
             Atualizar Ranking
           </button>
        </form>

        <div className="mb-4">
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">
            Últimas 24 Horas
          </h3>
          <p className="text-xl font-bold text-gray-800 leading-tight">
            Linhas com mais denúncias em <span className="text-bh-blue">{city} - {selectedUf}</span>
          </p>
        </div>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 w-1/3 bg-gray-200 rounded mb-4"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {ranking.length === 0 ? (
               <div className="text-center py-10 text-gray-400">
                 <Bus className="w-12 h-12 mx-auto mb-2 opacity-50" />
                 <p>Nenhuma denúncia registrada para esta região nas últimas 24h.</p>
               </div>
            ) : (
              ranking.map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg font-bold text-white ${index === 0 ? 'bg-bh-red' : 'bg-bh-blue'}`}>
                      {index + 1}º
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                         <Bus className="w-4 h-4 text-gray-400" />
                         <span className="font-bold text-xl text-gray-800">{item.lineId}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 font-medium">{item.mainIssue}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-gray-900">{item.totalReports}</span>
                    <div className="flex items-center justify-end gap-1 text-xs">
                      {item.trend === 'UP' && <TrendingUp className="w-3 h-3 text-red-500" />}
                      {item.trend === 'DOWN' && <TrendingDown className="w-3 h-3 text-green-500" />}
                      {item.trend === 'STABLE' && <Minus className="w-3 h-3 text-gray-400" />}
                      <span className={item.trend === 'UP' ? 'text-red-500 font-bold' : 'text-gray-400'}>
                          {item.trend === 'UP' ? 'Subindo' : 'Estável'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-bh-yellow flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
                Os dados são atualizados em tempo real com base nas denúncias dos usuários do Vigia Cidadã em todo o Brasil.
            </p>
        </div>
      </div>
    </div>
  );
};