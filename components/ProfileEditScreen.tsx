
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Phone, Mail, Save, CheckCircle2, Loader2 } from 'lucide-react';

interface ProfileEditScreenProps {
  onBack: () => void;
}

export const ProfileEditScreen: React.FC<ProfileEditScreenProps> = ({ onBack }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form States
  const [phone, setPhone] = useState('(31) 98888-7777');
  const [email, setEmail] = useState('usuario@exemplo.com');
  
  // Address States
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('Belo Horizonte');
  const [uf, setUf] = useState('MG');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API Call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      
      // Hide success message after a few seconds
      setTimeout(() => {
        setShowSuccess(false);
        onBack();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <div className="bg-bh-blue px-4 py-4 flex items-center shadow-lg z-10 sticky top-0">
        <button onClick={onBack} className="p-2 -ml-2 text-white hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="ml-2 text-lg font-bold text-white">Dados Pessoais</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        
        {showSuccess && (
          <div className="mb-6 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-bold">Dados atualizados com sucesso!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Contact Section */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-bh-blue">
              <Phone className="w-5 h-5" />
              <h3 className="font-bold text-lg">Contatos</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Celular / WhatsApp</label>
                <input 
                  type="tel" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-800 focus:ring-bh-blue focus:border-bh-blue outline-none"
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">E-mail</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-10 pr-3 py-3 text-gray-800 focus:ring-bh-blue focus:border-bh-blue outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Address Section */}
          <section className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-bh-blue">
              <MapPin className="w-5 h-5" />
              <h3 className="font-bold text-lg">Endereço Residencial</h3>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CEP</label>
                  <input 
                    type="text" 
                    placeholder="00000-000"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-800 focus:ring-bh-blue focus:border-bh-blue outline-none"
                  />
                </div>
                <div className="flex items-end">
                   <button type="button" className="w-full py-3 bg-blue-50 text-bh-blue font-bold rounded-lg hover:bg-blue-100 transition-colors text-sm">
                     Buscar CEP
                   </button>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_80px] gap-4">
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Logradouro</label>
                    <input 
                      type="text" 
                      placeholder="Rua, Av..."
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-800 focus:ring-bh-blue focus:border-bh-blue outline-none"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nº</label>
                    <input 
                      type="text" 
                      value={number}
                      onChange={(e) => setNumber(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-800 focus:ring-bh-blue focus:border-bh-blue outline-none"
                    />
                 </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Complemento</label>
                <input 
                  type="text" 
                  placeholder="Apto, Bloco..."
                  value={complement}
                  onChange={(e) => setComplement(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-800 focus:ring-bh-blue focus:border-bh-blue outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bairro</label>
                <input 
                  type="text" 
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-800 focus:ring-bh-blue focus:border-bh-blue outline-none"
                />
              </div>

              <div className="grid grid-cols-[1fr_60px] gap-4">
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cidade</label>
                    <input 
                      type="text" 
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-800 focus:ring-bh-blue focus:border-bh-blue outline-none"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">UF</label>
                    <input 
                      type="text" 
                      value={uf}
                      onChange={(e) => setUf(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-800 focus:ring-bh-blue focus:border-bh-blue outline-none uppercase text-center"
                      maxLength={2}
                    />
                 </div>
              </div>
            </div>
          </section>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-bh-blue text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-800 transition-all active:scale-95 flex items-center justify-center gap-2 sticky bottom-4 z-10"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </button>

        </form>
      </div>
    </div>
  );
};
