import React, { useState, useEffect } from 'react';
import { Camera, MapPin, Mic, X, ChevronRight, AlertCircle } from 'lucide-react';
import { CATEGORIES, SECURITY_OPTIONS } from '../constants';
import { ReportCategory, ReportData, SecurityType } from '../types';

interface ReportFormProps {
  onBack: () => void;
  onSubmit: (data: ReportData) => void;
  triggerDiscrete: (data: Partial<ReportData>) => void;
}

export const ReportForm: React.FC<ReportFormProps> = ({ onBack, onSubmit, triggerDiscrete }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [lineId, setLineId] = useState('');
  const [vehicleId, setVehicleId] = useState('');
  const [category, setCategory] = useState<ReportCategory | null>(null);
  const [subCategory, setSubCategory] = useState<string>('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locating, setLocating] = useState(false);

  // Auto-capture location on mount
  useEffect(() => {
    setLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocating(false);
        },
        (error) => {
          console.error("Geo error", error);
          setLocating(false);
        }
      );
    }
  }, []);

  const handleCategorySelect = (cat: ReportCategory) => {
    setCategory(cat);
    // If not security, go to details immediately
    if (cat !== ReportCategory.SECURITY) {
      setStep(2);
    }
  };

  const handleSecurityOption = (type: SecurityType, isDiscreteTrigger: boolean) => {
    setSubCategory(type);
    if (isDiscreteTrigger) {
      // Switch to discrete mode passing collected data so far
      triggerDiscrete({
        lineId,
        vehicleId,
        location: location ? { latitude: location.lat, longitude: location.lng } : undefined,
      });
    } else {
      setStep(2);
    }
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;

    const report: ReportData = {
      lineId,
      vehicleId,
      category,
      subCategory,
      description,
      location: location ? { latitude: location.lat, longitude: location.lng } : undefined,
      timestamp: Date.now(),
      isDiscrete: false
    };

    onSubmit(report);
  };

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900">
      {/* Header */}
      <div className="px-4 py-4 flex items-center shadow-sm bg-white z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600">
          <X className="w-6 h-6" />
        </button>
        <h2 className="ml-2 text-lg font-bold text-bh-blue">Nova Denúncia</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        
        {/* Step 1: Vehicle & Category */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <h3 className="text-sm font-semibold text-bh-blue mb-3 uppercase tracking-wide">Identificação do Veículo</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Linha</label>
                  <input
                    type="text"
                    value={lineId}
                    onChange={(e) => setLineId(e.target.value)}
                    placeholder="Ex: 8207"
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:border-bh-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all font-mono text-lg"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Número do Veículo</label>
                  <input
                    type="number"
                    value={vehicleId}
                    onChange={(e) => setVehicleId(e.target.value)}
                    placeholder="Ex: 20456"
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg focus:border-bh-blue focus:ring-2 focus:ring-blue-100 outline-none transition-all font-mono text-lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">O que está acontecendo?</h3>
              {!category ? (
                 <div className="grid grid-cols-1 gap-3">
                 {CATEGORIES.map((cat) => (
                   <button
                     key={cat.id}
                     onClick={() => handleCategorySelect(cat.id)}
                     className={`relative overflow-hidden group p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 text-left ${
                       category === cat.id ? 'ring-2 ring-bh-blue bg-blue-50' : 'bg-white'
                     }`}
                   >
                     <div className={`p-3 rounded-full ${cat.color} text-white`}>
                       <cat.icon className="w-6 h-6" />
                     </div>
                     <div>
                       <h4 className="font-bold text-gray-800">{cat.label}</h4>
                       <p className="text-xs text-gray-500">{cat.description}</p>
                     </div>
                     <ChevronRight className="w-5 h-5 text-gray-300 ml-auto" />
                   </button>
                 ))}
               </div>
              ) : (
                <div className="animate-fade-in">
                  <button onClick={() => setCategory(null)} className="text-sm text-bh-blue mb-2 font-medium">← Mudar Categoria</button>
                   {category === ReportCategory.SECURITY ? (
                      <div className="grid grid-cols-1 gap-3">
                        <p className="text-xs text-red-500 font-semibold mb-1 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" /> 
                          Selecione o tipo de ocorrência
                        </p>
                        {SECURITY_OPTIONS.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => handleSecurityOption(opt.id, opt.triggerDiscrete)}
                            className={`p-4 rounded-xl border transition-all flex items-center gap-4 text-left ${opt.triggerDiscrete ? 'bg-gray-50 border-gray-300' : 'bg-red-50 border-red-100 hover:bg-red-100'}`}
                          >
                             <div className={`p-2 rounded-full ${opt.triggerDiscrete ? 'bg-gray-200 text-gray-600' : 'bg-red-200 text-red-700'}`}>
                               <opt.icon className="w-5 h-5" />
                             </div>
                             <span className="font-semibold text-gray-800">{opt.label}</span>
                             {opt.triggerDiscrete && <span className="ml-auto text-[10px] bg-gray-200 px-2 py-1 rounded text-gray-600 font-bold uppercase">Modo Discreto</span>}
                          </button>
                        ))}
                      </div>
                   ) : null}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
               <span className="px-3 py-1 bg-bh-blue text-white rounded-full text-xs font-bold uppercase">{category}</span>
               {subCategory && <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-bold uppercase">{subCategory}</span>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Descrição da Ocorrência</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva com detalhes o que aconteceu..."
                className="w-full h-32 p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-bh-blue outline-none resize-none text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Evidências (Opcional)</label>
              <div className="flex gap-3">
                <label className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <Camera className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500">Adicionar Foto</span>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
                <button type="button" className="flex-1 flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Mic className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-xs text-gray-500">Gravar Áudio</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
              <MapPin className={`w-5 h-5 ${locating ? 'animate-pulse text-bh-yellow' : 'text-bh-green'}`} />
              {locating ? 'Obtendo localização GPS...' : location ? `Localização capturada: ${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Localização não disponível'}
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-bh-blue text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-800 transition-all transform active:scale-95"
            >
              Enviar Denúncia
            </button>
          </form>
        )}
      </div>
    </div>
  );
};