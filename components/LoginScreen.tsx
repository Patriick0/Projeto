import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Bus, AlertCircle, CheckCircle, ChevronLeft } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

type AuthMode = 'LOGIN' | 'REGISTER' | 'FORGOT';

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [mode, setMode] = useState<AuthMode>('LOGIN');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{type: 'error' | 'success', text: string} | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Simulate API delay
    setTimeout(() => {
      setIsLoading(false);
      
      if (mode === 'FORGOT') {
        setMessage({ type: 'success', text: 'Email de recuperação enviado! Verifique sua caixa de entrada.' });
        setTimeout(() => setMode('LOGIN'), 3000);
        return;
      }

      // Simulate generic login success
      onLoginSuccess();
    }, 1500);
  };

  const SocialButton = ({ icon, label, color }: { icon: React.ReactNode, label: string, color: string }) => (
    <button 
      type="button"
      onClick={() => {
        setIsLoading(true);
        setTimeout(onLoginSuccess, 1000);
      }}
      className={`w-full flex items-center justify-center gap-3 p-3 rounded-xl border border-gray-200 shadow-sm bg-white hover:bg-gray-50 transition-all active:scale-95 mb-3`}
    >
      {icon}
      <span className="text-sm font-semibold text-gray-700">{label}</span>
    </button>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Decorative Header */}
      <div className="h-64 bg-bh-blue rounded-b-[3rem] relative overflow-hidden flex items-center justify-center">
        <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
          <Bus size={300} color="white" />
        </div>
        <div className="text-center z-10 p-6">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-full inline-flex mb-4">
             <Bus className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Vigia Cidadã</h1>
          <p className="text-blue-100 mt-2 text-sm">Monitoramento e segurança no transporte coletivo.</p>
        </div>
      </div>

      {/* Main Card */}
      <div className="flex-1 px-6 -mt-10 mb-6 z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          
          {/* Header Switcher */}
          <div className="mb-8">
             {mode === 'LOGIN' && <h2 className="text-2xl font-bold text-gray-800">Bem-vindo(a)</h2>}
             {mode === 'REGISTER' && <h2 className="text-2xl font-bold text-gray-800">Criar Conta</h2>}
             {mode === 'FORGOT' && (
               <div className="flex items-center gap-2">
                 <button onClick={() => setMode('LOGIN')} className="p-1 -ml-2 text-gray-400 hover:text-bh-blue">
                   <ChevronLeft className="w-6 h-6" />
                 </button>
                 <h2 className="text-2xl font-bold text-gray-800">Recuperar Senha</h2>
               </div>
             )}
             <p className="text-gray-500 text-sm mt-1">
               {mode === 'LOGIN' && 'Entre para continuar segura.'}
               {mode === 'REGISTER' && 'Faça parte da nossa comunidade.'}
               {mode === 'FORGOT' && 'Informe seu email para receber um link.'}
             </p>
          </div>

          {message && (
            <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
               {message.type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle className="w-5 h-5 shrink-0" />}
               {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'REGISTER' && (
              <div className="relative group">
                <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-bh-blue transition-colors" />
                <input
                  type="text"
                  placeholder="Nome Completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-bh-blue focus:ring-1 focus:ring-bh-blue transition-all"
                  required
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-bh-blue transition-colors" />
              <input
                type="email"
                placeholder="Seu E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-bh-blue focus:ring-1 focus:ring-bh-blue transition-all"
                required
              />
            </div>

            {mode !== 'FORGOT' && (
              <div className="relative group">
                <Lock className="absolute left-4 top-3.5 w-5 h-5 text-gray-400 group-focus-within:text-bh-blue transition-colors" />
                <input
                  type="password"
                  placeholder="Sua Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-bh-blue focus:ring-1 focus:ring-bh-blue transition-all"
                  required
                />
              </div>
            )}

            {mode === 'LOGIN' && (
              <div className="flex justify-end">
                <button type="button" onClick={() => setMode('FORGOT')} className="text-xs font-semibold text-bh-blue hover:text-blue-700">
                  Esqueceu a senha?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-bh-blue text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-800 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="animate-pulse">Processando...</span>
              ) : (
                <>
                  {mode === 'LOGIN' && 'Entrar'}
                  {mode === 'REGISTER' && 'Cadastrar'}
                  {mode === 'FORGOT' && 'Enviar Link'}
                  {mode !== 'FORGOT' && <ArrowRight className="w-5 h-5" />}
                </>
              )}
            </button>
          </form>

          {mode === 'LOGIN' && (
            <>
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-400">Ou entre com</span>
                </div>
              </div>

              <div className="space-y-3">
                <SocialButton 
                  label="Continuar com Google" 
                  color="text-gray-700"
                  icon={
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  }
                />
                
                <SocialButton 
                  label="Continuar com Facebook" 
                  color="text-blue-600"
                  icon={
                    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  }
                />

                <SocialButton 
                  label="Continuar com iCloud" 
                  color="text-gray-900"
                  icon={
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.64 4.07-.54.21.13.39.31.54.54-3.32 1.63-2.66 6.33.68 7.6-.26 1.48-1.04 3.63-2.37 4.63zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                  }
                />
              </div>
            </>
          )}

          <div className="mt-8 text-center">
            {mode === 'LOGIN' ? (
              <p className="text-gray-600 text-sm">
                Não tem uma conta?{' '}
                <button onClick={() => setMode('REGISTER')} className="text-bh-blue font-bold hover:underline">
                  Cadastre-se
                </button>
              </p>
            ) : (
              <p className="text-gray-600 text-sm">
                Já tem uma conta?{' '}
                <button onClick={() => setMode('LOGIN')} className="text-bh-blue font-bold hover:underline">
                  Fazer Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};