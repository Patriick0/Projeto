
import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, ScrollText } from 'lucide-react';

interface TermsScreenProps {
  onAccept: () => void;
}

export const TermsScreen: React.FC<TermsScreenProps> = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-bh-blue pt-12 pb-6 px-6 rounded-b-[2rem] shadow-lg text-center">
        <div className="bg-white/20 p-4 rounded-full inline-flex mb-3">
          <ShieldCheck className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white">Privacidade e Ética</h1>
        <p className="text-blue-100 text-sm mt-1">Sua segurança começa com transparência.</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
          <section>
            <div className="flex items-center gap-2 mb-2 text-bh-blue font-bold">
              <ScrollText className="w-5 h-5" />
              <h3>Termos de Uso</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Ao utilizar o <strong>Vigia Cidadã</strong>, você concorda que todas as informações fornecidas são verdadeiras. 
              O uso do aplicativo para denúncias falsas ou trotes é passível de sanções legais e suspensão da conta.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-2 mb-2 text-bh-green font-bold">
              <CheckCircle2 className="w-5 h-5" />
              <h3>Proteção de Dados</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Seus dados pessoais são anonimizados para as autoridades competentes, a menos que haja uma ordem judicial específica. 
              Utilizamos geolocalização apenas no momento da denúncia para garantir a precisão do socorro ou fiscalização.
            </p>
          </section>

          <section className="bg-red-50 p-4 rounded-xl border border-red-100">
            <div className="flex items-center gap-2 mb-2 text-red-600 font-bold">
              <AlertCircle className="w-5 h-5" />
              <h3>Emergências Críticas</h3>
            </div>
            <p className="text-xs text-red-700 leading-relaxed">
              Em casos de perigo imediato à vida ou crimes em andamento, priorize sempre ligar para o <strong>190 (Polícia Militar)</strong> ou <strong>192 (SAMU)</strong>. 
              O Vigia Cidadã é uma ferramenta de apoio e monitoramento, não substituindo o acionamento direto das forças de segurança.
            </p>
          </section>
        </div>

        {/* Acceptance Checkbox */}
        <div className="mt-8 flex items-start gap-3">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="w-5 h-5 text-bh-blue border-gray-300 rounded focus:ring-bh-blue"
            />
          </div>
          <label htmlFor="terms" className="text-sm text-gray-600">
            Li e concordo com os Termos de Uso e a Política de Privacidade do Vigia Cidadã.
          </label>
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-6 bg-white border-t border-gray-100">
        <button
          onClick={onAccept}
          disabled={!accepted}
          className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg flex items-center justify-center gap-2 ${
            accepted 
            ? 'bg-bh-blue text-white shadow-blue-500/30 active:scale-95' 
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Aceitar e Continuar
        </button>
      </div>
    </div>
  );
};
