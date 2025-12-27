
import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, Bug, Shield, MessageSquare, ChevronRight, Send, FileText, Clock, CheckCircle2, Copy } from 'lucide-react';
import { SupportTicket } from '../types';

interface SupportScreenProps {
  onBack: () => void;
}

type SupportView = 'MENU' | 'FAQ' | 'BUG' | 'TUTORIAL' | 'CONTACT';

export const SupportScreen: React.FC<SupportScreenProps> = ({ onBack }) => {
  const [currentView, setCurrentView] = useState<SupportView>('MENU');

  // Sub-components for clean code
  const Menu = () => (
    <div className="space-y-4 p-5 animate-fade-in">
      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2">Como podemos ajudar?</h3>
      
      <button 
        onClick={() => setCurrentView('FAQ')}
        className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 text-bh-blue rounded-xl">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div className="text-left">
            <span className="block font-bold text-gray-800">Central de Ajuda (FAQ)</span>
            <span className="text-xs text-gray-500">Perguntas frequentes</span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300" />
      </button>

      <button 
        onClick={() => setCurrentView('BUG')}
        className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Bug className="w-6 h-6" />
          </div>
          <div className="text-left">
            <span className="block font-bold text-gray-800">Reportar Bug</span>
            <span className="text-xs text-gray-500">Encontrou um erro no app?</span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300" />
      </button>

      <button 
        onClick={() => setCurrentView('TUTORIAL')}
        className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-50 text-green-600 rounded-xl">
            <Shield className="w-6 h-6" />
          </div>
          <div className="text-left">
            <span className="block font-bold text-gray-800">Tutorial de Segurança</span>
            <span className="text-xs text-gray-500">Como usar sem se expor</span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300" />
      </button>

      <button 
        onClick={() => setCurrentView('CONTACT')}
        className="w-full bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between group active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-yellow-50 text-yellow-600 rounded-xl">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div className="text-left">
            <span className="block font-bold text-gray-800">Fale Conosco</span>
            <span className="text-xs text-gray-500">Sugestões e Parcerias</span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-300" />
      </button>
    </div>
  );

  const FAQ = () => (
    <div className="p-5 animate-slide-up">
      <h3 className="font-bold text-xl text-gray-800 mb-6">Perguntas Frequentes</h3>
      <div className="space-y-4">
        {[
          { q: "O motorista sabe quem denunciou?", a: "Não. Sua denúncia é processada de forma anônima. Seus dados pessoais não são compartilhados com os operadores." },
          { q: "Como usar o Modo Discreto?", a: "Ao selecionar uma denúncia de 'Assédio', o app muda automaticamente para uma tela que parece um site de notícias." },
          { q: "O app funciona sem internet?", a: "Você pode preencher a denúncia offline. Ela será enviada automaticamente assim que a conexão for restabelecida." },
          { q: "Como reportar ônibus quebrado?", a: "Vá em 'Nova Denúncia', selecione a categoria 'Infraestrutura' e descreva o problema." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <h4 className="font-bold text-bh-blue text-sm mb-2">{item.q}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const ReportBug = () => {
    const [bugLocation, setBugLocation] = useState('Login / Cadastro');
    const [description, setDescription] = useState('');
    const [reports, setReports] = useState<SupportTicket[]>([]);
    const [lastProtocol, setLastProtocol] = useState<string | null>(null);

    // Load reports from LocalStorage on mount
    useEffect(() => {
      const savedReports = localStorage.getItem('vigia_bug_reports');
      if (savedReports) {
        setReports(JSON.parse(savedReports));
      } else {
        // Example ticket for demonstration purposes
        const exampleReport: SupportTicket = {
          id: 'bug-demo-1',
          protocol: 'BUG-20249102',
          subject: 'Mapa / GPS',
          message: 'O mapa não carrega quando estou no 4G, fica uma tela cinza mesmo com sinal forte.',
          status: 'ANSWERED',
          timestamp: Date.now() - 259200000, // 3 days ago
          response: 'Olá! Identificamos que isso ocorre em algumas versões do Android com o modo de economia de dados do sistema ativo. Soltamos uma correção na versão 1.2.4. Por favor, atualize seu app.'
        };
        setReports([exampleReport]);
        localStorage.setItem('vigia_bug_reports', JSON.stringify([exampleReport]));
      }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const protocol = `BUG-${new Date().getFullYear()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      const newReport: SupportTicket = {
        id: crypto.randomUUID(),
        protocol,
        subject: bugLocation,
        message: description,
        status: 'PENDING',
        timestamp: Date.now()
      };

      const updatedReports = [newReport, ...reports];
      setReports(updatedReports);
      localStorage.setItem('vigia_bug_reports', JSON.stringify(updatedReports));
      
      setLastProtocol(protocol);
      setBugLocation('Login / Cadastro');
      setDescription('');
    };

    return (
      <div className="p-5 animate-slide-up pb-20">
         {lastProtocol ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center mb-8 animate-fade-in">
             <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <CheckCircle2 className="w-8 h-8 text-green-600" />
             </div>
             <h3 className="text-xl font-bold text-green-800 mb-2">Bug Reportado!</h3>
             <p className="text-green-700 text-sm mb-4">
               Agradecemos sua ajuda. Acompanhe o status pelo protocolo:
             </p>
             <div className="bg-white border-2 border-green-200 border-dashed rounded-lg p-3 flex items-center justify-between max-w-[200px] mx-auto">
                <span className="font-mono font-bold text-gray-700">{lastProtocol}</span>
                <button onClick={() => {navigator.clipboard.writeText(lastProtocol); alert("Copiado!")}} className="text-green-600 hover:text-green-800">
                  <Copy className="w-4 h-4" />
                </button>
             </div>
             <button 
               onClick={() => setLastProtocol(null)}
               className="mt-6 text-sm font-bold text-green-700 hover:underline"
             >
               Reportar outro erro
             </button>
          </div>
         ) : (
            <>
                <h3 className="font-bold text-xl text-gray-800 mb-2">Reportar Erro Técnico</h3>
                <p className="text-sm text-gray-500 mb-6">Ajude nossa equipe de QA a melhorar o Vigia Cidadã.</p>
                
                <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
                    <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Onde ocorreu o erro?</label>
                    <select 
                        value={bugLocation} 
                        onChange={(e) => setBugLocation(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:border-purple-500 outline-none"
                    >
                        <option>Login / Cadastro</option>
                        <option>Envio de Denúncia</option>
                        <option>Mapa / GPS</option>
                        <option>Outro</option>
                    </select>
                    </div>
                    <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Descrição do Problema</label>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descreva o que aconteceu e, se possível, os passos para reproduzir o erro..."
                        className="w-full h-32 bg-white border border-gray-200 rounded-lg p-3 text-sm focus:border-purple-500 outline-none resize-none"
                        required
                    ></textarea>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg text-xs text-gray-500 font-mono break-all">
                    Logs do dispositivo: {navigator.userAgent}
                    </div>
                    <button className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 flex items-center justify-center gap-2">
                    <Bug className="w-5 h-5" />
                    Enviar Relatório
                    </button>
                </form>
            </>
         )}

        <div>
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-400" />
            Meus Reportes
          </h3>

          {reports.length === 0 ? (
            <div className="text-center py-8 bg-gray-100 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-400 text-sm">Nenhum reporte encontrado.</p>
            </div>
          ) : (
             <div className="space-y-3">
              {reports.map((ticket) => (
                <div key={ticket.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm animate-fade-in">
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono font-bold text-gray-400">#{ticket.protocol}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        ticket.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-green-50 text-green-700 border-green-200'
                      }`}>
                        {ticket.status === 'PENDING' ? 'Em Análise' : 'Resolvido/Respondido'}
                      </span>
                   </div>
                   <h4 className="font-bold text-gray-800 text-sm mb-1">{ticket.subject}</h4>
                   <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{ticket.message}</p>
                   
                   {ticket.response && (
                      <div className="mt-3 bg-gray-50 p-3 rounded-lg border-l-4 border-purple-500">
                        <p className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-purple-500" />
                          Resposta do QA
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed">{ticket.response}</p>
                      </div>
                   )}

                   <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-1 text-[10px] text-gray-400">
                      <Clock className="w-3 h-3" />
                      {new Date(ticket.timestamp).toLocaleDateString()} às {new Date(ticket.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const Tutorial = () => (
    <div className="p-5 animate-slide-up">
       <h3 className="font-bold text-xl text-gray-800 mb-4">Segurança no Transporte</h3>
       
       <div className="space-y-6">
         <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
            <div className="h-40 bg-gray-200 flex items-center justify-center">
               <Shield className="w-12 h-12 text-gray-400" />
               <span className="ml-2 text-gray-500 font-bold">Vídeo Tutorial</span>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-900">Como denunciar discretamente</h4>
              <p className="text-sm text-gray-600 mt-2">
                Aprenda a usar a interface "BH News" para digitar sua denúncia sem chamar a atenção de pessoas ao redor.
              </p>
            </div>
         </div>

         <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <h4 className="font-bold text-bh-blue mb-2">Dicas Rápidas</h4>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              <li>Mantenha o brilho da tela baixo à noite.</li>
              <li>Ative o modo silencioso antes de iniciar a denúncia.</li>
              <li>Se sentir ameaçado, priorize sua segurança e desça do veículo.</li>
            </ul>
         </div>
       </div>
    </div>
  );

  const Contact = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [lastProtocol, setLastProtocol] = useState<string | null>(null);

    // Load tickets from LocalStorage on mount
    useEffect(() => {
      const savedTickets = localStorage.getItem('vigia_support_tickets');
      if (savedTickets) {
        setTickets(JSON.parse(savedTickets));
      } else {
        // Example ticket for demonstration purposes
        const exampleTicket: SupportTicket = {
          id: 'demo-1',
          protocol: 'SUP-20248821',
          subject: 'Sugestão: Linha Direta Barreiro/Pampulha',
          message: 'Gostaria de sugerir uma linha que ligasse o Barreiro à Pampulha sem passar pelo centro, para agilizar o deslocamento em horários de pico.',
          status: 'ANSWERED',
          timestamp: Date.now() - 172800000, // 2 days ago
          response: 'Olá, Cidadão! Agradecemos sua sugestão. A BHTrans já possui estudos para o sistema perimetral que contempla essa ligação. Sua mensagem foi registrada no protocolo de planejamento Nº 9928.'
        };
        setTickets([exampleTicket]);
        localStorage.setItem('vigia_support_tickets', JSON.stringify([exampleTicket]));
      }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const protocol = `AT-${new Date().getFullYear()}${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      const newTicket: SupportTicket = {
        id: crypto.randomUUID(),
        protocol,
        subject,
        message,
        status: 'PENDING',
        timestamp: Date.now()
      };

      const updatedTickets = [newTicket, ...tickets];
      setTickets(updatedTickets);
      localStorage.setItem('vigia_support_tickets', JSON.stringify(updatedTickets));
      
      setLastProtocol(protocol);
      setSubject('');
      setMessage('');
    };

    return (
      <div className="p-5 animate-slide-up pb-20">
        
        {/* Success Feedback */}
        {lastProtocol ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center mb-8 animate-fade-in">
             <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
               <CheckCircle2 className="w-8 h-8 text-green-600" />
             </div>
             <h3 className="text-xl font-bold text-green-800 mb-2">Mensagem Enviada!</h3>
             <p className="text-green-700 text-sm mb-4">
               Recebemos sua solicitação. Acompanhe o status pelo protocolo abaixo:
             </p>
             <div className="bg-white border-2 border-green-200 border-dashed rounded-lg p-3 flex items-center justify-between max-w-[200px] mx-auto">
                <span className="font-mono font-bold text-gray-700">{lastProtocol}</span>
                <button onClick={() => {navigator.clipboard.writeText(lastProtocol); alert("Copiado!")}} className="text-green-600 hover:text-green-800">
                  <Copy className="w-4 h-4" />
                </button>
             </div>
             <button 
               onClick={() => setLastProtocol(null)}
               className="mt-6 text-sm font-bold text-green-700 hover:underline"
             >
               Enviar nova mensagem
             </button>
          </div>
        ) : (
          <>
            <h3 className="font-bold text-xl text-gray-800 mb-2">Fale Conosco</h3>
            <p className="text-sm text-gray-500 mb-6">Sugestões de melhoria ou parcerias institucionais.</p>
            
            <form className="space-y-4 mb-8" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Assunto</label>
                <input 
                  type="text" 
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg p-3 text-sm focus:border-bh-yellow outline-none" 
                  placeholder="Ex: Sugestão de funcionalidade" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mensagem</label>
                <textarea 
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Sua mensagem..."
                  className="w-full h-32 bg-white border border-gray-200 rounded-lg p-3 text-sm focus:border-bh-yellow outline-none resize-none"
                ></textarea>
              </div>
              <button className="w-full py-3 bg-bh-yellow text-black font-bold rounded-xl shadow-lg hover:bg-yellow-400 flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Enviar Mensagem
              </button>
            </form>
          </>
        )}

        {/* Tickets History */}
        <div>
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-gray-400" />
            Meus Chamados
          </h3>

          {tickets.length === 0 ? (
            <div className="text-center py-8 bg-gray-100 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-400 text-sm">Nenhuma solicitação encontrada.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div key={ticket.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm animate-fade-in">
                   <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-mono font-bold text-gray-400">#{ticket.protocol}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        ticket.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-green-50 text-green-700 border-green-200'
                      }`}>
                        {ticket.status === 'PENDING' ? 'Resposta Pendente' : 'Respondido'}
                      </span>
                   </div>
                   <h4 className="font-bold text-gray-800 text-sm mb-1">{ticket.subject}</h4>
                   <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{ticket.message}</p>
                   
                   {/* Render Response if Available */}
                   {ticket.response && (
                      <div className="mt-3 bg-gray-50 p-3 rounded-lg border-l-4 border-green-500">
                        <p className="text-xs font-bold text-gray-700 mb-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          Resposta da Equipe
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed">{ticket.response}</p>
                      </div>
                   )}

                   <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-1 text-[10px] text-gray-400">
                      <Clock className="w-3 h-3" />
                      {new Date(ticket.timestamp).toLocaleDateString()} às {new Date(ticket.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-bh-blue px-4 py-4 flex items-center shadow-lg z-10 sticky top-0">
        <button 
          onClick={() => currentView === 'MENU' ? onBack() : setCurrentView('MENU')} 
          className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="ml-2 text-lg font-bold text-white">
          {currentView === 'MENU' ? 'Suporte' : 'Voltar ao Menu'}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {currentView === 'MENU' && <Menu />}
        {currentView === 'FAQ' && <FAQ />}
        {currentView === 'BUG' && <ReportBug />}
        {currentView === 'TUTORIAL' && <Tutorial />}
        {currentView === 'CONTACT' && <Contact />}
      </div>
    </div>
  );
};
