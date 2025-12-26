import React, { useState } from 'react';
import { Home } from './components/Home';
import { ReportForm } from './components/ReportForm';
import { DiscreteInterface } from './components/DiscreteInterface';
import { StatsDashboard } from './components/StatsDashboard';
import { MapDashboard } from './components/MapDashboard';
import { Profile } from './components/Profile';
import { LoginScreen } from './components/LoginScreen';
import { ViewState, ReportData } from './types';
import { analyzeReport } from './services/geminiService';
import { CheckCircle, AlertOctagon, Loader2, ArrowLeft, X } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<ViewState>('LOGIN');
  const [partialReport, setPartialReport] = useState<Partial<ReportData>>({});
  const [feedback, setFeedback] = useState<{summary: string, priority: number, advice: string} | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Ad Popup State
  const [showAd, setShowAd] = useState(false);

  const handleLoginSuccess = () => {
    setView('HOME');
    // Show ad immediately after login
    setShowAd(true);
  };

  const handleLogout = () => {
    setView('LOGIN');
  };

  const handleStartReport = () => {
    setPartialReport({});
    setView('FORM');
  };

  const handleTriggerDiscrete = (data: Partial<ReportData>) => {
    setPartialReport(data);
    setView('DISCRETE');
  };

  const handleSubmit = async (data: Partial<ReportData>) => {
    setIsProcessing(true);
    setView('SUCCESS'); // Optimistic UI update

    // Ensure we have a valid report object (basic validation handled in forms)
    const finalReport = data as ReportData;
    console.log("Submitting report:", finalReport);

    // Call Gemini to analyze the report
    const analysis = await analyzeReport(finalReport);
    
    setFeedback(analysis);
    setIsProcessing(false);
  };

  const handleReset = () => {
    setView('HOME');
    setPartialReport({});
    setFeedback(null);
  };

  // Success View Component (Inline for simplicity in App.tsx)
  const SuccessView = () => (
    <div className="flex flex-col h-screen bg-white">
      {/* Header for Success View */}
      <div className="px-4 py-4 flex items-center bg-white z-10">
         <button onClick={handleReset} className="p-2 -ml-2 text-gray-600">
           <ArrowLeft className="w-6 h-6" />
         </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-fade-in -mt-20">
        {isProcessing ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-16 h-16 text-bh-blue animate-spin mb-4" />
            <h2 className="text-xl font-bold text-gray-800">Processando denúncia...</h2>
            <p className="text-gray-500 mt-2">Aguarde enquanto analisamos os dados de forma segura.</p>
          </div>
        ) : (
          <>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${feedback && feedback.priority >= 4 ? 'bg-red-100' : 'bg-green-100'}`}>
              {feedback && feedback.priority >= 4 ? (
                <AlertOctagon className="w-10 h-10 text-red-600" />
              ) : (
                <CheckCircle className="w-10 h-10 text-bh-green" />
              )}
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Denúncia Recebida</h2>
            
            {feedback && (
              <div className="bg-gray-50 rounded-xl p-6 w-full max-w-sm border border-gray-100 mt-4 shadow-sm text-left">
                <div className="mb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase">Status</span>
                  <p className="font-medium text-gray-800">{feedback.summary}</p>
                </div>
                
                <div className="mb-4">
                  <span className="text-xs font-bold text-gray-400 uppercase">Prioridade Identificada</span>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map(lvl => (
                      <div key={lvl} className={`h-2 w-8 rounded-full ${lvl <= feedback.priority ? (feedback.priority >= 4 ? 'bg-red-500' : 'bg-bh-yellow') : 'bg-gray-200'}`} />
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase">Recomendação</span>
                  <p className="text-sm text-gray-600 mt-1">{feedback.advice}</p>
                </div>
              </div>
            )}

            <p className="text-gray-500 mt-8 text-sm max-w-xs mx-auto">
              Sua identidade foi preservada. Os dados de geolocalização foram anexados à denúncia.
            </p>

            <button 
              onClick={handleReset}
              className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-full font-bold shadow-lg hover:bg-black transition-colors"
            >
              Voltar ao Início
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Advertisement Modal Overlay */}
      {showAd && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md relative overflow-hidden shadow-2xl">
            <button 
              onClick={() => setShowAd(false)}
              className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="h-64 bg-gray-200 relative">
               <img 
                 src="https://picsum.photos/600/400?random=ad" 
                 alt="Advertisement" 
                 className="w-full h-full object-cover"
               />
               <span className="absolute bottom-2 left-2 text-[10px] bg-white/80 px-2 py-0.5 rounded text-gray-500 uppercase font-bold tracking-wider">Publicidade</span>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Viaje com Segurança</h3>
              <p className="text-gray-600 text-sm mb-4">
                Conheça o novo plano de seguros para passageiros de transporte coletivo. A partir de R$ 9,90.
              </p>
              <button 
                onClick={() => setShowAd(false)}
                className="w-full py-3 bg-bh-blue text-white rounded-xl font-bold hover:bg-blue-800 transition-colors"
              >
                Saiba Mais
              </button>
            </div>
          </div>
        </div>
      )}

      {view === 'LOGIN' && <LoginScreen onLoginSuccess={handleLoginSuccess} />}

      {view === 'HOME' && (
        <Home 
          onStartReport={handleStartReport} 
          onOpenStats={() => setView('STATS')} 
          onOpenMap={() => setView('MAP')}
          onOpenProfile={() => setView('PROFILE')}
        />
      )}
      
      {view === 'FORM' && (
        <ReportForm 
          onBack={() => setView('HOME')} 
          onSubmit={handleSubmit}
          triggerDiscrete={handleTriggerDiscrete}
        />
      )}
      
      {view === 'DISCRETE' && (
        <DiscreteInterface 
          initialReportData={partialReport}
          onSubmit={handleSubmit}
          onCancel={() => setView('HOME')}
        />
      )}

      {view === 'STATS' && (
        <StatsDashboard onBack={() => setView('HOME')} />
      )}

      {view === 'MAP' && (
        <MapDashboard onBack={() => setView('HOME')} />
      )}

      {view === 'PROFILE' && (
        <Profile onBack={() => setView('HOME')} onLogout={handleLogout} />
      )}
      
      {view === 'SUCCESS' && <SuccessView />}
    </>
  );
}