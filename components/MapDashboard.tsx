import React, { useEffect, useState } from 'react';
import { ArrowLeft, Info, Map as MapIcon, Loader2 } from 'lucide-react';
import { fetchRegionStats } from '../services/geminiService';

interface MapDashboardProps {
  onBack: () => void;
}

interface RegionData {
  id: string;
  name: string;
  complaints: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

export const MapDashboard: React.FC<MapDashboardProps> = ({ onBack }) => {
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchRegionStats();
      if (data && data.regions) {
        setRegions(data.regions);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  const getRegionColor = (level?: string) => {
    switch (level) {
      case 'HIGH': return '#ef4444'; // Red-500
      case 'MEDIUM': return '#eab308'; // Yellow-500
      case 'LOW': return '#22c55e'; // Green-500
      default: return '#e5e7eb'; // Gray-200
    }
  };

  const getRegionData = (id: string) => regions.find(r => r.id === id);

  // SVG Paths approximating the BH Map Layout
  // ViewBox 0 0 200 240 to fit the vertical aspect of BH map
  const MAP_PATHS = [
    { 
      id: 'venda-nova', 
      name: "Venda Nova", 
      d: "M 80,10 L 110,15 L 115,45 L 85,55 L 70,40 Z", // Top Center
    },
    { 
      id: 'norte', 
      name: "Norte", 
      d: "M 110,15 L 145,25 L 160,50 L 130,70 L 115,45 Z", // Top Right
    },
    { 
      id: 'pampulha', 
      name: "Pampulha", 
      d: "M 60,60 L 85,55 L 115,45 L 130,70 L 105,85 L 75,80 Z", // Below Venda Nova, holding the lake
    },
    { 
      id: 'nordeste', 
      name: "Nordeste", 
      d: "M 130,70 L 160,50 L 180,80 L 150,100 L 125,95 Z", // Right side
    },
    { 
      id: 'noroeste', 
      name: "Noroeste", 
      d: "M 55,85 L 75,80 L 105,85 L 110,110 L 80,115 L 60,105 Z", // Below Pampulha
    },
    { 
      id: 'leste', 
      name: "Leste", 
      d: "M 125,95 L 150,100 L 165,135 L 130,130 L 110,110 Z", // Below Nordeste
    },
    { 
      id: 'centro-sul', 
      name: "Centro-Sul", 
      d: "M 110,110 L 130,130 L 165,135 L 140,170 L 100,140 Z", // South East
    },
    { 
      id: 'oeste', 
      name: "Oeste", 
      d: "M 60,105 L 80,115 L 110,110 L 100,140 L 90,165 L 65,145 Z", // West
    },
    { 
      id: 'barreiro', 
      name: "Barreiro", 
      d: "M 30,150 L 65,145 L 90,165 L 100,190 L 60,220 L 40,180 Z", // Bottom Left Tail
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-bh-blue px-4 py-4 flex items-center shadow-lg z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="ml-2 text-lg font-bold text-white">Mapa de Calor</h2>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col relative">
        {/* Info Overlay */}
        <div className="absolute top-4 left-4 right-4 z-10">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 text-sm mb-1">Monitoramento Regional</h3>
            <p className="text-xs text-gray-500">
              Toque nas regiões para ver detalhes. As cores indicam o volume de denúncias nas últimas 24h.
            </p>
            
            {/* Legend */}
            <div className="flex gap-4 mt-3">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-[10px] text-gray-600 font-bold">Baixo</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-[10px] text-gray-600 font-bold">Médio</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-[10px] text-gray-600 font-bold">Crítico</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 flex items-center justify-center p-4 bg-blue-50/50">
          {loading ? (
             <div className="flex flex-col items-center animate-pulse">
                <Loader2 className="w-10 h-10 text-bh-blue animate-spin mb-2" />
                <span className="text-sm text-gray-500">Carregando dados das regiões...</span>
             </div>
          ) : (
            <div className="w-full h-full max-w-md relative flex items-center justify-center">
              <svg viewBox="0 0 200 240" className="w-full h-full drop-shadow-xl" style={{ maxHeight: '80vh' }}>
                {MAP_PATHS.map((path) => {
                  const data = getRegionData(path.id);
                  const color = getRegionColor(data?.riskLevel);
                  const isSelected = selectedRegion?.id === path.id;

                  return (
                    <g key={path.id} onClick={() => data && setSelectedRegion(data)}>
                      <path
                        d={path.d}
                        fill={color}
                        stroke="white"
                        strokeWidth={isSelected ? "2" : "1"}
                        className={`transition-all duration-300 cursor-pointer hover:opacity-90 ${isSelected ? 'brightness-110 drop-shadow-md' : ''}`}
                      />
                      {/* Label Text centered in path roughly */}
                      {data && (
                        <text
                          x={getCentroid(path.d).x}
                          y={getCentroid(path.d).y}
                          fontSize="6"
                          fill="rgba(0,0,0,0.6)"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontWeight="bold"
                          pointerEvents="none"
                          style={{ textShadow: '0px 0px 2px rgba(255,255,255,0.8)' }}
                        >
                          {data.complaints}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
          )}
        </div>

        {/* Bottom Detail Panel */}
        {selectedRegion ? (
          <div className="bg-white p-6 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] transition-transform animate-slide-up z-20">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedRegion.name}</h3>
                <span className={`inline-block px-2 py-1 rounded text-xs font-bold mt-1 ${
                  selectedRegion.riskLevel === 'HIGH' ? 'bg-red-100 text-red-700' :
                  selectedRegion.riskLevel === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-700'
                }`}>
                  Risco: {selectedRegion.riskLevel === 'HIGH' ? 'Alto' : selectedRegion.riskLevel === 'MEDIUM' ? 'Médio' : 'Baixo'}
                </span>
              </div>
              <div className="text-right">
                 <span className="block text-3xl font-bold text-gray-800">{selectedRegion.complaints}</span>
                 <span className="text-xs text-gray-500 uppercase font-bold">Denúncias</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Principal motivo: {selectedRegion.riskLevel === 'HIGH' ? 'Assaltos e furtos em pontos de ônibus.' : 'Atrasos e lotação.'}
            </p>
          </div>
        ) : (
          !loading && (
            <div className="bg-white p-6 text-center text-gray-400 text-sm z-20">
              Selecione uma região no mapa para ver detalhes.
            </div>
          )
        )}
      </div>
    </div>
  );
};

// Helper to find rough center of a polygon string
function getCentroid(d: string) {
  const numbers = d.match(/[-]?\d+(\.\d+)?/g)?.map(Number);
  if (!numbers || numbers.length === 0) return { x: 50, y: 50 };
  
  let xSum = 0, ySum = 0, count = 0;
  for (let i = 0; i < numbers.length; i += 2) {
     xSum += numbers[i];
     ySum += numbers[i+1] || 0;
     count++;
  }
  return { x: xSum / count, y: ySum / count };
}