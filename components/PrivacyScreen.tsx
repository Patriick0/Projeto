
import React, { useState } from 'react';
import { ArrowLeft, EyeOff, Fingerprint, Trash2, MapPin, Camera, Ghost, ShieldAlert, ChevronRight, Lock } from 'lucide-react';

interface PrivacyScreenProps {
  onBack: () => void;
}

export const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ onBack }) => {
  // State for toggles
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [camuflageMode, setCamuflageMode] = useState(false);
  const [gpsAllowed, setGpsAllowed] = useState(true);
  const [cameraAllowed, setCameraAllowed] = useState(true);
  
  // State for delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) => (
    <button 
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${checked ? 'bg-bh-green' : 'bg-gray-300'}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow-md absolute top-0.5 transition-transform duration-300 ${checked ? 'left-6' : 'left-0.5'}`} />
    </button>
  );

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-bh-blue px-4 py-4 flex items-center shadow-lg z-10 sticky top-0">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="ml-2 text-lg font-bold text-white">Privacidade e Segurança</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        {/* Section 1: Safety in Hostile Environments */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Proteção em Tempo Real</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Camouflage Mode */}
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-start gap-3 pr-4">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <Ghost className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Modo Camuflagem</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Altera a interface para parecer um portal de notícias ("BH News"), permitindo uso discreto em público.
                  </p>
                </div>
              </div>
              <ToggleSwitch checked={camuflageMode} onChange={setCamuflageMode} />
            </div>

            {/* Anonymity */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-start gap-3 pr-4">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <EyeOff className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Anonimato Padrão</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Suas denúncias não incluirão seu nome ou contato.
                  </p>
                </div>
              </div>
              <ToggleSwitch checked={isAnonymous} onChange={setIsAnonymous} />
            </div>
          </div>
        </section>

        {/* Section 2: App Security */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Segurança do App</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            
            {/* Biometrics */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-start gap-3 pr-4">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-sm">Bloqueio Biométrico</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Exigir FaceID ou digital ao abrir o aplicativo.
                  </p>
                </div>
              </div>
              <ToggleSwitch checked={biometricEnabled} onChange={setBiometricEnabled} />
            </div>
          </div>
        </section>

        {/* Section 3: Permissions */}
        <section>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Permissões do Dispositivo</h3>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-bh-blue rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-bold text-gray-800 text-sm">Acesso ao GPS</span>
              </div>
              <ToggleSwitch checked={gpsAllowed} onChange={setGpsAllowed} />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-bh-blue rounded-lg">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="font-bold text-gray-800 text-sm">Acesso à Câmera</span>
              </div>
              <ToggleSwitch checked={cameraAllowed} onChange={setCameraAllowed} />
            </div>
          </div>
        </section>

        {/* Section 4: Data Management (LGPD) */}
        <section>
           <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 ml-1">Gestão de Dados (LGPD)</h3>
           <button 
             onClick={() => setShowDeleteModal(true)}
             className="w-full bg-white p-4 rounded-xl shadow-sm border border-red-100 flex items-center justify-between group active:scale-95 transition-transform"
           >
             <div className="flex items-center gap-3">
               <div className="p-2 bg-red-50 rounded-lg text-red-600">
                  <Trash2 className="w-5 h-5" />
               </div>
               <div className="text-left">
                 <h4 className="font-bold text-red-600 text-sm">Excluir meu Histórico</h4>
                 <p className="text-xs text-gray-500">Apagar permanentemente todos os registros.</p>
               </div>
             </div>
             <ChevronRight className="w-5 h-5 text-gray-300" />
           </button>
        </section>

      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex flex-col items-center text-center mb-4">
              <div className="bg-red-100 p-4 rounded-full mb-3">
                <ShieldAlert className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Tem certeza?</h3>
              <p className="text-gray-500 text-sm mt-2">
                Essa ação é irreversível. Todas as suas denúncias salvas localmente e dados de perfil serão removidos para conformidade com a LGPD.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  alert("Dados excluídos com sucesso.");
                  setShowDeleteModal(false);
                }}
                className="w-full py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
              >
                Sim, excluir tudo
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
