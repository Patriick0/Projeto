
import React from 'react';
import { ArrowLeft, User, Mail, Shield, Award, Settings, LogOut, ChevronRight, Phone } from 'lucide-react';

interface ProfileProps {
  onBack: () => void;
  onLogout: () => void;
  onEditProfile: () => void;
  onOpenAchievements: () => void;
  onOpenPrivacy: () => void;
  onOpenSettings: () => void;
  onOpenSupport: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ 
  onBack, 
  onLogout, 
  onEditProfile, 
  onOpenAchievements, 
  onOpenPrivacy,
  onOpenSettings,
  onOpenSupport
}) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-bh-blue px-4 py-4 flex items-center shadow-lg z-10">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="ml-2 text-lg font-bold text-white">Meu Perfil</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* User Card */}
        <div className="bg-white p-6 pb-8 rounded-b-3xl shadow-sm border-b border-gray-100 flex flex-col items-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full border-4 border-white shadow-md flex items-center justify-center mb-4">
            <User className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">Cidadão Consciente</h2>
          <div className="flex items-center gap-2 text-gray-500 mt-1">
            <Mail className="w-4 h-4" />
            <span className="text-sm">usuario@exemplo.com</span>
          </div>
          
          <div className="flex gap-2 mt-4">
             <span className="px-3 py-1 bg-blue-100 text-bh-blue rounded-full text-xs font-bold uppercase">Nível 3</span>
             <span className="px-3 py-1 bg-green-100 text-bh-green rounded-full text-xs font-bold uppercase">Verificado</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="px-6 -mt-6">
           <div className="bg-white p-4 rounded-xl shadow-md flex justify-between divide-x divide-gray-100">
              <div className="flex-1 text-center px-2">
                 <span className="block text-2xl font-bold text-gray-900">12</span>
                 <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wide">Denúncias</span>
              </div>
              <div className="flex-1 text-center px-2">
                 <span className="block text-2xl font-bold text-bh-blue">98%</span>
                 <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wide">Precisão</span>
              </div>
              <div className="flex-1 text-center px-2">
                 <span className="block text-2xl font-bold text-bh-yellow">450</span>
                 <span className="text-[10px] uppercase text-gray-400 font-bold tracking-wide">Pontos</span>
              </div>
           </div>
        </div>

        {/* Menu Options */}
        <div className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1">Conta</h3>
          
          <button 
            onClick={onEditProfile}
            className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group active:scale-95 transition-transform"
          >
             <div className="flex items-center gap-3">
               <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-blue-50 group-hover:text-bh-blue transition-colors">
                  <User className="w-5 h-5" />
               </div>
               <span className="font-semibold text-gray-700">Dados Pessoais</span>
             </div>
             <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>

          <button 
            onClick={onOpenAchievements}
            className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group active:scale-95 transition-transform"
          >
             <div className="flex items-center gap-3">
               <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-blue-50 group-hover:text-bh-blue transition-colors">
                  <Award className="w-5 h-5" />
               </div>
               <span className="font-semibold text-gray-700">Conquistas</span>
             </div>
             <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>

          <button 
            onClick={onOpenPrivacy}
            className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group active:scale-95 transition-transform"
          >
             <div className="flex items-center gap-3">
               <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-blue-50 group-hover:text-bh-blue transition-colors">
                  <Shield className="w-5 h-5" />
               </div>
               <span className="font-semibold text-gray-700">Privacidade e Segurança</span>
             </div>
             <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>

          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1 mt-6">Geral</h3>

          <button 
            onClick={onOpenSettings}
            className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group active:scale-95 transition-transform"
          >
             <div className="flex items-center gap-3">
               <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-blue-50 group-hover:text-bh-blue transition-colors">
                  <Settings className="w-5 h-5" />
               </div>
               <span className="font-semibold text-gray-700">Configurações</span>
             </div>
             <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>

          <button 
            onClick={onOpenSupport}
            className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group active:scale-95 transition-transform"
          >
             <div className="flex items-center gap-3">
               <div className="p-2 bg-gray-100 rounded-lg text-gray-600 group-hover:bg-blue-50 group-hover:text-bh-blue transition-colors">
                  <Phone className="w-5 h-5" />
               </div>
               <span className="font-semibold text-gray-700">Suporte</span>
             </div>
             <ChevronRight className="w-5 h-5 text-gray-300" />
          </button>

          <button 
            onClick={onLogout}
            className="w-full p-4 flex items-center justify-center gap-2 text-red-500 font-bold mt-4 hover:bg-red-50 rounded-xl transition-colors"
          >
             <LogOut className="w-5 h-5" />
             Sair da Conta
          </button>
        </div>
      </div>
    </div>
  );
};
