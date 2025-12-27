
import React, { useState } from 'react';
import { ArrowLeft, Bell, Type, Smartphone, Moon, Wifi, Check } from 'lucide-react';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  // Notification State
  const [pushEnabled, setPushEnabled] = useState(true);
  const [favoriteLine, setFavoriteLine] = useState('4033');

  // Accessibility State
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [highContrast, setHighContrast] = useState(false);

  // Data Saver State
  const [dataSaver, setDataSaver] = useState(false);

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button 
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${checked ? 'bg-bh-blue' : 'bg-gray-300'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 transition-transform duration-300 ${checked ? 'left-6' : 'left-0.5'}`} />
    </button>
  );

  return (
    <div className={`flex flex-col h-screen ${highContrast ? 'bg-black text-yellow-400' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <div className={`${highContrast ? 'bg-gray-900 border-b border-yellow-400' : 'bg-bh-blue'} px-4 py-4 flex items-center shadow-lg z-10 sticky top-0`}>
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="ml-2 text-lg font-bold text-white">Configurações</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        {/* Notificações */}
        <section className={`${highContrast ? 'bg-gray-900 border border-yellow-400' : 'bg-white border border-gray-100'} rounded-xl shadow-sm overflow-hidden`}>
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
             <Bell className={`w-5 h-5 ${highContrast ? 'text-yellow-400' : 'text-bh-blue'}`} />
             <h3 className="font-bold text-lg">Notificações</h3>
          </div>
          <div className="p-4 space-y-4">
             <div className="flex items-center justify-between">
                <div>
                   <p className="font-semibold text-sm">Alertas da Linha Favorita</p>
                   <p className="text-xs opacity-70">Receba avisos de atraso ou mudança de rota.</p>
                </div>
                <ToggleSwitch checked={pushEnabled} onChange={setPushEnabled} />
             </div>
             
             {pushEnabled && (
               <div className="animate-fade-in bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Linha Principal</label>
                  <input 
                    type="text" 
                    value={favoriteLine}
                    onChange={(e) => setFavoriteLine(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded p-2 text-sm font-bold text-gray-900 focus:outline-none focus:border-bh-blue"
                  />
               </div>
             )}
          </div>
        </section>

        {/* Acessibilidade */}
        <section className={`${highContrast ? 'bg-gray-900 border border-yellow-400' : 'bg-white border border-gray-100'} rounded-xl shadow-sm overflow-hidden`}>
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
             <Type className={`w-5 h-5 ${highContrast ? 'text-yellow-400' : 'text-bh-blue'}`} />
             <h3 className="font-bold text-lg">Acessibilidade</h3>
          </div>
          <div className="p-4 space-y-6">
             
             <div>
               <p className="font-semibold text-sm mb-3">Tamanho da Fonte</p>
               <div className="flex gap-2 bg-gray-100 p-1 rounded-lg">
                 {(['small', 'medium', 'large'] as const).map((size) => (
                   <button
                     key={size}
                     onClick={() => setFontSize(size)}
                     className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${fontSize === size ? 'bg-white shadow-sm text-bh-blue' : 'text-gray-500'}`}
                   >
                     {size === 'small' ? 'A' : size === 'medium' ? 'A+' : 'A++'}
                   </button>
                 ))}
               </div>
             </div>

             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Moon className="w-5 h-5 opacity-60" />
                   <div>
                      <p className="font-semibold text-sm">Alto Contraste</p>
                      <p className="text-xs opacity-70">Melhora a legibilidade.</p>
                   </div>
                </div>
                <ToggleSwitch checked={highContrast} onChange={setHighContrast} />
             </div>
          </div>
        </section>

        {/* Economia de Dados */}
        <section className={`${highContrast ? 'bg-gray-900 border border-yellow-400' : 'bg-white border border-gray-100'} rounded-xl shadow-sm overflow-hidden`}>
          <div className="p-4 border-b border-gray-100 flex items-center gap-3">
             <Smartphone className={`w-5 h-5 ${highContrast ? 'text-yellow-400' : 'text-bh-blue'}`} />
             <h3 className="font-bold text-lg">Dados e Armazenamento</h3>
          </div>
          <div className="p-4">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Wifi className="w-5 h-5 opacity-60" />
                   <div>
                      <p className="font-semibold text-sm">Economia de Dados</p>
                      <p className="text-xs opacity-70">Baixar imagens apenas no Wi-Fi.</p>
                   </div>
                </div>
                <ToggleSwitch checked={dataSaver} onChange={setDataSaver} />
             </div>
          </div>
        </section>

      </div>
    </div>
  );
};
