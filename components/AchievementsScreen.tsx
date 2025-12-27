
import React from 'react';
import { ArrowLeft, ShieldCheck, Eye, Clock, Users, Award, Gift, TrendingUp, Star } from 'lucide-react';

interface AchievementsScreenProps {
  onBack: () => void;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-bh-blue px-4 py-4 flex items-center shadow-lg z-10 sticky top-0">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="ml-2 text-lg font-bold text-white">Minhas Conquistas</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        {/* 1. Nível de Confiabilidade (Trust Score) */}
        <section className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
             <div className="bg-green-100 p-2 rounded-lg text-bh-green">
               <ShieldCheck className="w-6 h-6" />
             </div>
             <div>
               <h3 className="font-bold text-lg text-gray-800">Nível de Confiabilidade</h3>
               <p className="text-xs text-gray-500">Sua autoridade na plataforma</p>
             </div>
          </div>

          <div className="mb-2 flex justify-between items-end">
            <span className="text-3xl font-bold text-gray-900">850</span>
            <span className="text-sm font-semibold text-bh-green">Alta Prioridade</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
            <div className="bg-bh-green h-3 rounded-full" style={{ width: '85%' }}></div>
          </div>
          
          <p className="text-sm text-gray-600 leading-snug">
            Suas denúncias são validadas frequentemente. Relatos de usuários com score alto aparecem primeiro para as autoridades.
          </p>
        </section>

        {/* 3. Pontos por Impacto Social */}
        <section className="bg-gradient-to-br from-bh-blue to-blue-700 rounded-2xl p-5 shadow-lg text-white relative overflow-hidden">
          <TrendingUp className="absolute right-[-20px] top-[-20px] w-32 h-32 opacity-10" />
          
          <div className="flex items-center gap-2 mb-6 relative z-10">
            <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
            <span className="font-bold uppercase tracking-wider text-sm text-blue-100">Impacto Social</span>
          </div>

          <div className="flex justify-between items-end relative z-10">
            <div>
              <span className="block text-4xl font-bold">1.240</span>
              <span className="text-sm text-blue-100 font-medium">Pessoas ajudadas</span>
            </div>
            <div className="text-right">
               <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg">
                 <span className="font-bold text-xl">450 pts</span>
               </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20 flex gap-3 items-center">
             <Gift className="w-5 h-5 text-yellow-300" />
             <p className="text-xs text-blue-50 leading-tight">
               Em breve: Troque seus pontos por descontos em cursos e benefícios no transporte.
             </p>
          </div>
        </section>

        {/* 2. Gamificação por Conquistas (Badges) */}
        <section>
          <h3 className="font-bold text-gray-800 mb-3 px-1 flex items-center gap-2">
            <Award className="w-5 h-5 text-bh-yellow" />
            Medalhas Desbloqueadas
          </h3>
          
          <div className="grid grid-cols-1 gap-3">
            {/* Badge 1: Olho de Águia */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 shadow-sm">
               <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border-2 border-bh-blue">
                 <Eye className="w-6 h-6 text-bh-blue" />
               </div>
               <div>
                 <h4 className="font-bold text-gray-800">Olho de Águia</h4>
                 <p className="text-xs text-gray-500">Reportou 5 problemas de infraestrutura confirmados.</p>
               </div>
            </div>

            {/* Badge 2: Guardião do Horário */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 shadow-sm opacity-60 grayscale">
               <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border-2 border-gray-300">
                 <Clock className="w-6 h-6 text-gray-400" />
               </div>
               <div>
                 <h4 className="font-bold text-gray-800">Guardião do Horário</h4>
                 <p className="text-xs text-gray-500">Reporte 10 atrasos com precisão de GPS para desbloquear.</p>
               </div>
            </div>

            {/* Badge 3: Conselheiro */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4 shadow-sm">
               <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center border-2 border-purple-500">
                 <Users className="w-6 h-6 text-purple-600" />
               </div>
               <div>
                 <h4 className="font-bold text-gray-800">Conselheiro</h4>
                 <p className="text-xs text-gray-500">Validou 20 denúncias da comunidade ("Eu também vi").</p>
               </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
