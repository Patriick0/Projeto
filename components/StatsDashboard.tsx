import React, { useEffect, useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, Minus, AlertTriangle, Bus } from 'lucide-react';
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

export const StatsDashboard: React.FC<StatsDashboardProps> = ({ onBack }) => {
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchBusLineRanking();
      if (data && data.ranking) {
        setRanking(data.ranking);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-bh-blue px-4 py-4 flex items-center shadow-lg z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="ml-2 text-lg font-bold text-white">Ranking de Reclamações</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="mb-6">
          <h3 className="text-gray-500 text-sm font-semibold uppercase tracking-wider mb-2">Últimas 24 Horas</h3>
          <p className="text-2xl font-bold text-gray-800 leading-tight">
            Linhas com maior índice de denúncias
          </p>
        </div>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {ranking.map((item, index) => (
              <div key={item.lineId} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
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
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-100 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-bh-yellow flex-shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800">
                Os dados são atualizados em tempo real com base nas denúncias dos usuários do Vigia Cidadã.
            </p>
        </div>
      </div>
    </div>
  );
};