
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Bus, MapPin, Clock, ShieldCheck, AlertTriangle, 
  ChevronRight, Star, Loader2, Navigation, Search, X, 
  Bell, Edit3, Calendar, CheckCircle2, TrendingUp, Users,
  Layers, Target, Plus, Minus, ChevronDown, ChevronUp, Trash2
} from 'lucide-react';

interface MyRouteScreenProps {
  onBack: () => void;
}

interface FavoriteLine {
  id: string;
  number: string;
  name: string;
  nickname?: string;
  status: 'SAFE' | 'WARNING' | 'CRITICAL';
  comfort: 'TRANQUIL' | 'CROWDED' | 'FULL';
  eta: string;
  activeAlerts: number;
  monitoringHours?: { start: string; end: string };
  notifyProximity: boolean;
  notifyRisk: boolean;
}

export const MyRouteScreen: React.FC<MyRouteScreenProps> = ({ onBack }) => {
  const [favorites, setFavorites] = useState<FavoriteLine[]>([]);
  const [selectedLine, setSelectedLine] = useState<FavoriteLine | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isConfiguring, setIsConfiguring] = useState<Partial<FavoriteLine> | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPanelExpanded, setIsPanelExpanded] = useState(true);
  const [lineToDelete, setLineToDelete] = useState<FavoriteLine | null>(null);
  
  // Drag handling states for the BottomSheet
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);

  // Load favorites from local storage
  useEffect(() => {
    const saved = localStorage.getItem('vigia_favorite_lines');
    if (saved) {
      setFavorites(JSON.parse(saved));
    } else {
      const initial: FavoriteLine[] = [
        { id: '1', number: '4033', name: 'Camargos / Centro', status: 'SAFE', comfort: 'TRANQUIL', eta: '5 min', activeAlerts: 0, notifyProximity: true, notifyRisk: true },
        { id: '2', number: '8207', name: 'Maria Goretti / Estrela Dalva', status: 'WARNING', comfort: 'CROWDED', eta: '12 min', activeAlerts: 3, notifyProximity: true, notifyRisk: true },
      ];
      setFavorites(initial);
      localStorage.setItem('vigia_favorite_lines', JSON.stringify(initial));
    }
  }, []);

  const saveFavorites = (newFavs: FavoriteLine[]) => {
    setFavorites(newFavs);
    localStorage.setItem('vigia_favorite_lines', JSON.stringify(newFavs));
  };

  const handleSelectLine = (line: FavoriteLine) => {
    setLoading(true);
    setSelectedLine(line);
    setIsPanelExpanded(true); 
    setTimeout(() => setLoading(false), 800);
  };

  const handleAddLine = (lineData: Partial<FavoriteLine>) => {
    setIsConfiguring(lineData);
    setIsSearching(false);
  };

  const finalizeConfiguration = () => {
    if (!isConfiguring) return;
    const newLine: FavoriteLine = {
      id: crypto.randomUUID(),
      number: isConfiguring.number || '0000',
      name: isConfiguring.name || 'Linha Desconhecida',
      nickname: isConfiguring.nickname,
      status: isConfiguring.status || 'SAFE',
      comfort: isConfiguring.comfort || 'TRANQUIL',
      eta: isConfiguring.eta || '10 min',
      activeAlerts: isConfiguring.activeAlerts || 0,
      monitoringHours: isConfiguring.monitoringHours,
      notifyProximity: isConfiguring.notifyProximity ?? true,
      notifyRisk: isConfiguring.notifyRisk ?? true,
    };
    saveFavorites([...favorites, newLine]);
    setIsConfiguring(null);
  };

  const handleDelete = () => {
    if (!lineToDelete) return;
    const updated = favorites.filter(f => f.id !== lineToDelete.id);
    saveFavorites(updated);
    setLineToDelete(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SAFE': return 'text-bh-green bg-green-50 border-green-100';
      case 'WARNING': return 'text-bh-yellow bg-yellow-50 border-yellow-100';
      case 'CRITICAL': return 'text-bh-red bg-red-50 border-red-100';
      default: return 'text-gray-500 bg-gray-50 border-gray-100';
    }
  };

  const getComfortLabel = (comfort: string) => {
    switch (comfort) {
      case 'TRANQUIL': return { text: 'Tranquilo', color: 'text-green-600' };
      case 'CROWDED': return { text: 'Lotado', color: 'text-yellow-600' };
      case 'FULL': return { text: 'Superlotado', color: 'text-red-600' };
      default: return { text: 'Normal', color: 'text-gray-600' };
    }
  };

  // Drag interaction handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentY = e.targetTouches[0].clientY;
    const delta = currentY - touchStart;
    
    if (isPanelExpanded && delta < 0) return;
    if (!isPanelExpanded && delta > 0) return;
    
    setDragOffset(delta);
  };

  const handleTouchEnd = () => {
    if (touchStart === null) return;
    
    const threshold = 80;
    if (Math.abs(dragOffset) > threshold) {
      setIsPanelExpanded(!isPanelExpanded);
    }
    
    setTouchStart(null);
    setDragOffset(0);
  };

  // --- SUB-VIEWS ---

  if (isSearching) {
    return (
      <div className="flex flex-col h-screen bg-white animate-fade-in">
        <div className="px-4 py-4 flex items-center gap-3 border-b">
          <button onClick={() => setIsSearching(false)} className="p-2 -ml-2 text-gray-400">
            <X className="w-6 h-6" />
          </button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              autoFocus
              type="text"
              placeholder="Número ou nome da linha..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-bh-blue/20"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase mb-4">Resultados Sugeridos</h3>
          <div className="space-y-3">
            {[
              { number: '4033', name: 'Camargos / Centro', status: 'SAFE', eta: '4 min', alerts: 0 },
              { number: '2104', name: 'Nova Gameleira / BH Shopping', status: 'SAFE', eta: '8 min', alerts: 1 },
              { number: 'SC04A', name: 'Santa Casa / Praça da Liberdade', status: 'CRITICAL', eta: '15 min', alerts: 12 },
              { number: '5106', name: 'Bandeirantes / Savassi', status: 'WARNING', eta: '2 min', alerts: 4 },
            ].filter(l => l.number.includes(searchQuery) || l.name.toLowerCase().includes(searchQuery.toLowerCase())).map((res, i) => (
              <button 
                key={i}
                onClick={() => handleAddLine({ 
                  number: res.number, 
                  name: res.name, 
                  status: res.status as any, 
                  eta: res.eta, 
                  activeAlerts: res.alerts 
                })}
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <Bus className="w-5 h-5 text-bh-blue" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-gray-800 leading-none">{res.number}</p>
                    <p className="text-[10px] text-gray-500 mt-1">{res.name}</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                   <div className="flex flex-col items-end">
                      <span className="text-[10px] font-bold text-bh-blue">{res.eta}</span>
                      <span className={`text-[8px] font-bold uppercase ${res.status === 'SAFE' ? 'text-green-500' : 'text-red-500'}`}>
                        {res.alerts} Denúncias
                      </span>
                   </div>
                   <ChevronRight className="w-4 h-4 text-gray-300" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isConfiguring) {
    return (
      <div className="flex flex-col h-screen bg-gray-50 animate-slide-up">
        <div className="bg-white px-4 py-4 flex items-center border-b sticky top-0 z-10">
          <button onClick={() => setIsConfiguring(null)} className="p-2 -ml-2 text-gray-400">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h2 className="ml-2 text-lg font-bold text-gray-800">Configurar Trajeto</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-bh-blue p-5 rounded-3xl text-white shadow-xl flex items-center justify-between">
             <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-sm">
                  <Bus className="w-8 h-8" />
                </div>
                <div>
                   <h3 className="text-2xl font-bold leading-none">{isConfiguring.number}</h3>
                   <p className="text-xs text-blue-100 mt-1">{isConfiguring.name}</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-[10px] font-bold uppercase opacity-60">Status Atual</p>
                <p className="font-bold text-bh-yellow">Monitorado</p>
             </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1">
                <Edit3 className="w-3 h-3" /> Apelido da Linha
              </label>
              <input 
                type="text" 
                placeholder="Ex: Trabalho, Faculdade, Casa..."
                value={isConfiguring.nickname || ''}
                onChange={(e) => setIsConfiguring({...isConfiguring, nickname: e.target.value})}
                className="w-full bg-white border border-gray-200 rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-bh-blue/10"
              />
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <label className="block text-xs font-bold text-gray-400 uppercase mb-4 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> Período de Monitoramento
              </label>
              <div className="flex items-center gap-3">
                 <div className="flex-1">
                    <p className="text-[10px] text-gray-400 mb-1">Início</p>
                    <input type="time" defaultValue="07:00" className="w-full bg-gray-50 p-2 rounded-lg text-sm border" />
                 </div>
                 <div className="flex-1">
                    <p className="text-[10px] text-gray-400 mb-1">Fim</p>
                    <input type="time" defaultValue="19:00" className="w-full bg-gray-50 p-2 rounded-lg text-sm border" />
                 </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
              <label className="block text-xs font-bold text-gray-400 uppercase flex items-center gap-1">
                <Bell className="w-3 h-3" /> Preferências de Alerta
              </label>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-700">Aproximação</p>
                  <p className="text-[10px] text-gray-500">Avise quando o ônibus estiver a 3 pontos.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={isConfiguring.notifyProximity ?? true} 
                  onChange={(e) => setIsConfiguring({...isConfiguring, notifyProximity: e.target.checked})}
                  className="w-5 h-5 accent-bh-blue"
                />
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <p className="text-sm font-bold text-gray-700">Alertas de Risco</p>
                  <p className="text-[10px] text-gray-500">Notificar ocorrências graves imediatas.</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={isConfiguring.notifyRisk ?? true} 
                  onChange={(e) => setIsConfiguring({...isConfiguring, notifyRisk: e.target.checked})}
                  className="w-5 h-5 accent-bh-blue"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border-t">
          <button 
            onClick={finalizeConfiguration}
            className="w-full py-4 bg-bh-blue text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            Salvar Trajeto Favorito
          </button>
        </div>
      </div>
    );
  }

  if (selectedLine) {
    const comfort = getComfortLabel(selectedLine.comfort);
    return (
      <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
        <div className="bg-bh-blue px-4 py-4 flex items-center shadow-lg z-10 sticky top-0">
          <button onClick={() => setSelectedLine(null)} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="ml-2">
            <h2 className="text-lg font-bold text-white">{selectedLine.nickname || `Linha ${selectedLine.number}`}</h2>
            <p className="text-xs text-blue-100">{selectedLine.name}</p>
          </div>
        </div>

        <div className="flex-1 relative bg-[#e5e3df] overflow-hidden">
          {loading ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm z-20">
              <Loader2 className="w-10 h-10 text-bh-blue animate-spin mb-2" />
              <p className="text-sm font-bold text-gray-600">Sincronizando dados...</p>
            </div>
          ) : (
            <>
              <div className="absolute inset-0 z-0 transition-all duration-700 ease-in-out">
                <div className="absolute inset-0 bg-[#f8f9fa] overflow-hidden">
                    <div className="absolute top-[20%] left-0 w-full h-[15px] bg-[#fff] border-y border-[#dee2e6] rotate-[-5deg] shadow-sm" />
                    <div className="absolute top-0 left-[30%] w-[15px] h-full bg-[#fff] border-x border-[#dee2e6] rotate-[10deg] shadow-sm" />
                    <div className="absolute bottom-[30%] left-0 w-full h-[12px] bg-[#fff] border-y border-[#dee2e6] rotate-[15deg] shadow-sm" />
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 600" preserveAspectRatio="none">
                        <path 
                           d="M 50,550 L 80,450 L 150,400 L 160,320 L 220,280 L 280,150 L 350,100" 
                           fill="none" 
                           stroke="#4285F4" 
                           strokeWidth="6" 
                           strokeLinecap="round" 
                           strokeLinejoin="round"
                           className="drop-shadow-sm opacity-80"
                        />
                        <circle cx="80" cy="450" r="3" fill="white" stroke="#4285F4" strokeWidth="2" />
                        <circle cx="160" cy="320" r="3" fill="white" stroke="#4285F4" strokeWidth="2" />
                        <circle cx="280" cy="150" r="3" fill="white" stroke="#4285F4" strokeWidth="2" />
                    </svg>
                </div>
              </div>

              <div className="absolute top-[32%] left-[40%] transform -translate-x-1/2 -translate-y-1/2 z-10">
                 <div className="relative">
                    <div className="absolute -inset-4 bg-bh-blue/20 rounded-full animate-ping" />
                    <div className="bg-bh-blue p-2.5 rounded-full shadow-2xl border-2 border-white relative z-10 ring-4 ring-bh-blue/10">
                      <Bus className="w-5 h-5 text-white" />
                    </div>
                 </div>
                 <div className="bg-white px-2.5 py-1 rounded-full shadow-lg mt-2 text-[10px] font-black text-bh-blue text-center border border-gray-100 flex items-center gap-1.5 whitespace-nowrap">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                    VEÍCULO V-30042
                 </div>
              </div>

              <div className="absolute right-4 top-[100px] flex flex-col gap-2 z-20">
                 <button className="bg-white p-2.5 rounded-xl shadow-md border border-gray-200 text-gray-600 hover:bg-gray-50">
                    <Layers className="w-5 h-5" />
                 </button>
                 <button className="bg-white p-2.5 rounded-xl shadow-md border border-gray-200 text-bh-blue hover:bg-gray-50">
                    <Target className="w-5 h-5" />
                 </button>
              </div>

              <div className="absolute top-4 left-4 right-4 z-20 space-y-2">
                 <div className="bg-white/95 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-white flex justify-between items-center">
                    <div className="flex items-center gap-3">
                       <div className="p-2.5 bg-blue-50 rounded-2xl">
                          <Clock className="w-5 h-5 text-bh-blue" />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter leading-none mb-1">Chegada Prevista</p>
                          <p className="text-lg font-black text-gray-800 leading-none">{selectedLine.eta}</p>
                       </div>
                    </div>
                    <div className="h-10 w-px bg-gray-100 mx-2" />
                    <div className="flex items-center gap-3">
                       <div className="p-2.5 bg-green-50 rounded-2xl">
                          <Users className="w-5 h-5 text-green-600" />
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter leading-none mb-1">Status Lotação</p>
                          <p className={`text-base font-black leading-none ${comfort.color}`}>{comfort.text}</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Draggable Bottom Drawer (Security Status) */}
              <div 
                ref={panelRef}
                className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-[3.5rem] shadow-[0_-20px_60px_rgba(0,0,0,0.2)] z-30 transition-all flex flex-col ${
                  touchStart === null ? 'duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]' : 'duration-0'
                } ${
                  isPanelExpanded ? 'max-h-[85vh] p-8 pb-10' : 'max-h-[120px] p-6 pb-8'
                }`}
                style={{
                  transform: `translateY(${dragOffset}px)`
                }}
              >
                 {/* DRAGGABLE & CLICKABLE HANDLE - WITH CHEVRON DOWN AS REQUESTED */}
                 <div 
                   onTouchStart={handleTouchStart}
                   onTouchMove={handleTouchMove}
                   onTouchEnd={handleTouchEnd}
                   onClick={() => {
                     if (Math.abs(dragOffset) < 10) {
                        setIsPanelExpanded(!isPanelExpanded);
                     }
                   }}
                   className="w-full flex flex-col items-center group -mt-4 mb-4 pt-4 pb-6 cursor-pointer select-none touch-none"
                 >
                    <div className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-all group-active:scale-90">
                       {isPanelExpanded ? (
                          <ChevronDown className="w-6 h-6 text-gray-400" />
                       ) : (
                          <ChevronUp className="w-6 h-6 text-gray-400 animate-bounce" />
                       )}
                    </div>
                 </div>
                 
                 <div className="flex justify-between items-center mb-6 select-none">
                    <div className="flex items-center gap-4">
                       <div className={`p-3 rounded-2xl transition-all duration-500 ${isPanelExpanded ? 'bg-bh-green shadow-lg shadow-green-500/20' : 'bg-gray-50'}`}>
                          <ShieldCheck className={`w-7 h-7 transition-colors duration-500 ${isPanelExpanded ? 'text-white' : 'text-gray-400'}`} />
                       </div>
                       <div>
                          <h3 className="text-xl font-black text-gray-800">
                             Status Segurança
                          </h3>
                          {!isPanelExpanded && <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">Clique ou arraste para expandir</p>}
                       </div>
                    </div>
                    <div className="bg-bh-blue/5 px-4 py-2 rounded-2xl flex items-center gap-2 border border-bh-blue/5 shadow-inner">
                       <TrendingUp className="w-4 h-4 text-bh-blue" />
                       <span className="text-xs font-black text-bh-blue uppercase tracking-tighter">92% Seguro</span>
                    </div>
                 </div>

                 <div className={`transition-all duration-500 flex-1 overflow-hidden ${isPanelExpanded ? 'opacity-100 mt-2' : 'opacity-0 scale-95 pointer-events-none h-0'}`}>
                    <div className="space-y-4">
                        {selectedLine.activeAlerts > 0 ? (
                          <div className="bg-red-50 p-5 rounded-3xl border border-red-100 flex items-start gap-4">
                              <AlertTriangle className="w-6 h-6 text-bh-red shrink-0" />
                              <div>
                                <p className="text-base font-black text-red-800">Alerta de Risco Ativo</p>
                                <p className="text-xs text-red-600/80 font-medium leading-relaxed mt-1">
                                    Houve {selectedLine.activeAlerts} denúncias registradas nesta linha no trecho em frente. Evite exibir objetos de valor.
                                </p>
                              </div>
                          </div>
                        ) : (
                          <div className="bg-green-50 p-5 rounded-3xl border border-green-100 flex items-start gap-4">
                              <ShieldCheck className="w-6 h-6 text-bh-green shrink-0" />
                              <div>
                                <p className="text-base font-black text-green-800">Trajeto Verificado</p>
                                <p className="text-xs text-green-600/80 font-medium leading-relaxed mt-1">
                                    A comunidade Vigia confirma: trajeto operando normalmente e sem intercorrências graves registradas nas últimas horas.
                                </p>
                              </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4 mt-6">
                          <div className="bg-gray-50/50 p-4 rounded-3xl border border-gray-100 group hover:bg-bh-blue/5 transition-colors">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Gamificação</span>
                              <p className="text-xs font-black text-bh-blue">+10 pts por validar</p>
                          </div>
                          <div className="bg-gray-50/50 p-4 rounded-3xl border border-gray-100">
                              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-2">Engajamento</span>
                              <p className="text-xs font-black text-gray-700">14 Vigias a bordo</p>
                          </div>
                        </div>
                    </div>

                    <button className="w-full mt-10 py-5 bg-bh-yellow text-black font-black text-lg rounded-3xl shadow-2xl shadow-yellow-500/30 flex items-center justify-center gap-3 hover:bg-yellow-400 active:scale-[0.98] transition-all transform uppercase tracking-tight">
                        <Navigation className="w-6 h-6" />
                        MONITORAR AGORA
                    </button>
                 </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
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
          <p className="text-sm text-gray-500 mt-1">Monitore seu transporte diário.</p>
        </div>

        <div className="space-y-4">
          {favorites.map((line) => (
            <div key={line.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 flex items-center p-1 group">
              {/* Main Card Content Area */}
              <div 
                onClick={() => handleSelectLine(line)}
                className="flex-1 flex items-center justify-between p-4 cursor-pointer active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-gray-50 p-3 rounded-2xl group-hover:bg-blue-50 transition-colors">
                    <Bus className="w-6 h-6 text-bh-blue" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xl text-gray-800 leading-none">{line.number}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase border ${getStatusColor(line.status)}`}>
                        {line.status === 'SAFE' ? 'Segura' : 'Alerta'}
                      </span>
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1 font-bold truncate max-w-[120px]">
                      {line.nickname ? `"${line.nickname}" • ` : ''}{line.name}
                    </p>
                  </div>
                </div>

                <div className="text-right mr-2">
                  <div className="flex items-center justify-end gap-1 text-bh-blue mb-1">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs font-black">{line.eta}</span>
                  </div>
                  <div className="flex justify-end gap-1">
                    {line.notifyProximity && <Bell className="w-3 h-3 text-gray-300" />}
                  </div>
                </div>
              </div>
              
              {/* Dedicated Square Delete Button at the end of the line */}
              <button 
                onClick={(e) => { e.stopPropagation(); setLineToDelete(line); }}
                className="m-1 p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-100 active:scale-90 transition-all flex items-center justify-center border border-red-100/30"
                title="Remover favorito"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        {/* Suggestion / Add Card */}
        <div className="mt-8 bg-white p-8 rounded-[2.5rem] border-2 border-dashed border-gray-200 flex flex-col items-center text-center">
           <div className="bg-yellow-50 p-4 rounded-full mb-4">
             <Star className="w-8 h-8 text-bh-yellow fill-bh-yellow" />
           </div>
           <h4 className="font-black text-gray-800 text-lg mb-2">Novo Trajeto?</h4>
           <p className="text-xs text-gray-400 leading-relaxed mb-6 px-4">
             Configure um novo trajeto favorito para receber alertas inteligentes e bônus de pontuação.
           </p>
           <button 
             onClick={() => setIsSearching(true)}
             className="bg-bh-blue px-8 py-3 rounded-2xl text-sm font-bold text-white shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center gap-2"
           >
             <Search className="w-4 h-4" />
             Pesquisar Linhas
           </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {lineToDelete && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl animate-scale-in">
            <div className="p-8 text-center">
               <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-black text-gray-900 mb-2">Remover Favorito?</h3>
               <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  Tem certeza que deseja excluir a linha <span className="font-bold text-gray-800">{lineToDelete.number}</span> dos seus trajetos favoritos?
               </p>
               
               <div className="flex flex-col gap-3">
                  <button 
                    onClick={handleDelete}
                    className="w-full py-4 bg-red-600 text-white font-black rounded-2xl shadow-lg shadow-red-500/20 hover:bg-red-700 active:scale-95 transition-all"
                  >
                    SIM, REMOVER
                  </button>
                  <button 
                    onClick={() => setLineToDelete(null)}
                    className="w-full py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-all"
                  >
                    CANCELAR
                  </button>
               </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-20" />
    </div>
  );
};
