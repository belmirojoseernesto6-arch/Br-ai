import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  Globe2, 
  Briefcase, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  KeyRound,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserCategory } from '../types';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    setAuthModalOpen, 
    twoFactorModalOpen, 
    setTwoFactorModalOpen,
    login, 
    verify2FA, 
    register, 
    loginAttempts, 
    isLockedOut 
  } = useApp();

  const [isRegister, setIsRegister] = useState(false);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('Portugal');
  const [category, setCategory] = useState<UserCategory>('creator');
  const [profession, setProfession] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');

  if (!authModalOpen && !twoFactorModalOpen) return null;

  // 2FA Verification Modal
  if (twoFactorModalOpen) {
    const handle2FASubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setErrorMsg('');
      const ok = verify2FA(twoFactorCode);
      if (!ok) {
        setErrorMsg('Código 2FA inválido. Insira 6 dígitos numéricos (ex: 123456).');
      }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="p-6 bg-indigo-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-800 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-indigo-300" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Autenticação de Dois Fatores (2FA)</h3>
                <p className="text-xs text-indigo-200">Camada de segurança obrigatória ativa</p>
              </div>
            </div>
            <button 
              onClick={() => setTwoFactorModalOpen(false)}
              className="text-indigo-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handle2FASubmit} className="p-6 space-y-4">
            <p className="text-xs text-slate-600">
              Para proteger a tua conta contra acessos não autorizados, introduz o código de 6 dígitos gerado pela tua aplicação de autenticação (Google Authenticator, Authy ou 1Password).
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5">
              <KeyRound className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-amber-800">
                <strong>Dica de Demonstração:</strong> Podes inserir qualquer código de 6 dígitos (ex: <span className="font-mono font-bold">123456</span>) para validar o fluxo de 2FA em tempo real.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 text-center">Código de Verificação</label>
              <input
                id="input-2fa-code"
                type="text"
                maxLength={6}
                value={twoFactorCode}
                onChange={e => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="w-full text-center text-2xl tracking-widest font-mono py-2.5 px-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
                autoFocus
              />
            </div>

            {errorMsg && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              id="btn-submit-2fa"
              type="submit"
              disabled={twoFactorCode.length < 6}
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <span>Validar e Entrar</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Password Recovery Mode
  if (forgotPasswordMode) {
    const handleForgotSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!email) {
        setErrorMsg('Introduza o seu email associado à conta.');
        return;
      }
      setForgotSuccess(true);
      setErrorMsg('');
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900">Recuperação de Palavra-passe</h3>
            <button onClick={() => setAuthModalOpen(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
          </div>

          {forgotSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-slate-900 text-sm">Ligação Segura Enviada!</h4>
              <p className="text-xs text-slate-600">
                Se o email <span className="font-semibold">{email}</span> estiver registado, enviámos uma ligação com validade de 15 minutos e token encriptado para redefinir a palavra-passe.
              </p>
              <button
                onClick={() => {
                  setForgotPasswordMode(false);
                  setForgotSuccess(false);
                }}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg"
              >
                Voltar ao Início de Sessão
              </button>
            </div>
          ) : (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <p className="text-xs text-slate-600">
                Introduz o teu endereço de email institucional ou pessoal para receberes instruções de recuperação sem expor dados confidenciais.
              </p>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="teu.email@dominio.com"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
              >
                Enviar Ligação de Recuperação
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setForgotPasswordMode(false)}
                  className="text-xs text-indigo-600 hover:underline"
                >
                  Regressar ao login
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Standard Login / Register Form
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const res = login(email, password);
    if (!res.success && res.error) {
      setErrorMsg(res.error);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!acceptTerms) {
      setErrorMsg('É obrigatório aceitar os Termos de Serviço e a Política de Privacidade (RGPD).');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('A palavra-passe deve conter pelo menos 6 caracteres.');
      return;
    }

    const ok = register({
      name,
      username,
      email,
      country,
      category,
      profession
    });

    if (!ok) {
      setErrorMsg('Não foi possível registar o utilizador. Verifique os campos.');
    }
  };

  const fillQuickDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('secret123');
    setErrorMsg('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-wider uppercase font-semibold text-indigo-400">Autenticação Segura</span>
            <h3 className="text-lg font-bold mt-0.5">
              {isRegister ? 'Criar Conta na OmniSphere' : 'Aceder à Plataforma'}
            </h3>
          </div>
          <button 
            onClick={() => setAuthModalOpen(false)}
            className="text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => { setIsRegister(false); setErrorMsg(''); }}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition ${
              !isRegister ? 'border-indigo-600 text-indigo-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Iniciar Sessão
          </button>
          <button
            onClick={() => { setIsRegister(true); setErrorMsg(''); }}
            className={`flex-1 py-3 text-xs font-semibold text-center border-b-2 transition ${
              isRegister ? 'border-indigo-600 text-indigo-700 bg-white' : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Registar Nova Conta
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">

          {/* Quick Demo logins bar */}
          {!isRegister && (
            <div className="mb-4 p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl space-y-1.5">
              <p className="text-[11px] font-semibold text-indigo-900 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-indigo-600" />
                Preenchimento Rápido para Demonstração:
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button 
                  type="button" 
                  onClick={() => fillQuickDemo('sofia.ramos@example.pt')}
                  className="px-2 py-1 bg-white hover:bg-indigo-100 text-[11px] font-medium text-slate-700 rounded border border-indigo-200"
                >
                  Sofia (Criadora / 2FA)
                </button>
                <button 
                  type="button" 
                  onClick={() => fillQuickDemo('marcus.chen@techconsult.sg')}
                  className="px-2 py-1 bg-white hover:bg-indigo-100 text-[11px] font-medium text-slate-700 rounded border border-indigo-200"
                >
                  Dr. Marcus (Empresa)
                </button>
                <button 
                  type="button" 
                  onClick={() => fillQuickDemo('security-lead@omnisphere.global')}
                  className="px-2 py-1 bg-white hover:bg-indigo-100 text-[11px] font-medium text-slate-700 rounded border border-indigo-200"
                >
                  Admin (Moderação)
                </button>
              </div>
            </div>
          )}

          {isLockedOut && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold">Proteção contra ataques de força bruta ativada!</p>
                <p className="mt-0.5">Demasiadas tentativas inválidas consecutivas. O sistema bloqueou temporariamente novos envios durante 15 segundos.</p>
              </div>
            </div>
          )}

          {!isRegister ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    id="input-login-email"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="sofia.ramos@example.pt"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Palavra-passe</label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordMode(true)}
                    className="text-[11px] text-indigo-600 hover:underline"
                  >
                    Esqueceu-se?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    id="input-login-password"
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              {loginAttempts > 0 && !isLockedOut && (
                <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Tentativa {loginAttempts} de 4 antes do bloqueio temporário de segurança.
                </p>
              )}

              {errorMsg && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                id="btn-submit-login"
                type="submit"
                disabled={isLockedOut}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold rounded-xl shadow-md transition"
              >
                Iniciar Sessão
              </button>

              <p className="text-[11px] text-center text-slate-400 pt-2">
                As palavras-passe são processadas via hashing irreversível (PBKDF2/Argon2) com salts individuais.
              </p>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nome Completo</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ex: Beatriz Lima"
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Nome de Utilizador</label>
                  <div className="relative">
                    <span className="text-slate-400 text-xs font-bold absolute left-3 top-2">@</span>
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      placeholder="beatrizlima"
                      className="w-full pl-8 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="beatriz@exemplo.com"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Palavra-passe (Mínimo 6 caracteres)</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">País</label>
                  <div className="relative">
                    <Globe2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden bg-white"
                    >
                      <option value="Portugal">Portugal</option>
                      <option value="Brasil">Brasil</option>
                      <option value="Angola">Angola</option>
                      <option value="Moçambique">Moçambique</option>
                      <option value="Cabo Verde">Cabo Verde</option>
                      <option value="Estados Unidos">Estados Unidos</option>
                      <option value="Reino Unido">Reino Unido</option>
                      <option value="Espanha">Espanha</option>
                      <option value="França">França</option>
                      <option value="Alemanha">Alemanha</option>
                      <option value="Singapura">Singapura</option>
                      <option value="Outro">Outro País</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Categoria Principal</label>
                  <div className="relative">
                    <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as UserCategory)}
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden bg-white"
                    >
                      <option value="creator">Criador de Conteúdo</option>
                      <option value="teacher">Professor / Educador</option>
                      <option value="developer">Programador / Tech</option>
                      <option value="business">Empresa / Negócio</option>
                      <option value="freelancer">Freelancer</option>
                      <option value="consultant">Consultor</option>
                      <option value="artist">Artista / Designer</option>
                      <option value="student">Estudante</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Profissão / Título (Opcional)</label>
                <input
                  type="text"
                  value={profession}
                  onChange={e => setProfession(e.target.value)}
                  placeholder="Ex: Designer UX/UI & Criadora de Vídeo"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
                />
              </div>

              {/* Terms & GDPR Acceptance */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={e => setAcceptTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-[11px] text-slate-600 leading-snug">
                    Aceito os <strong>Termos de Utilização</strong> e a <strong>Política de Privacidade</strong> em conformidade com o RGPD/GDPR. Os meus canais só serão associados através de ligações públicas e permissões que eu autorizar.
                  </span>
                </label>
              </div>

              {errorMsg && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md transition"
              >
                Concluir Registo Gratuito
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
