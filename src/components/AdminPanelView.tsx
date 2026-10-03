import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  Flag, 
  AlertOctagon, 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  FileText, 
  Activity, 
  Key, 
  Lock, 
  Search, 
  UserX, 
  ShieldAlert, 
  RefreshCw, 
  Globe, 
  Layers, 
  Terminal,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { getPlatformMeta } from '../utils/platformIcons';

export const AdminPanelView: React.FC = () => {
  const { 
    currentUser, 
    users, 
    channels, 
    reports, 
    auditLogs, 
    apiStatuses, 
    resolveReport, 
    suspendUserAccount, 
    changeUserRole,
    switchPersona 
  } = useApp();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'reports' | 'users' | 'security' | 'integrations'>('overview');
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'moderator';

  const triggerToast = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 3500);
  };

  // If user is not admin, provide a quick button to switch to admin or elevate role for demonstration
  if (!isAdmin) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-3xl p-8 border border-amber-200 shadow-sm space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Área de Administração Protegida (RBAC)</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Esta secção está restrita a utilizadores com o papel de <strong>Administrador (Super Admin)</strong> ou <strong>Moderador</strong> de acordo com a política de Menor Privilégio.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                switchPersona('usr_admin');
                triggerToast('Sessão alternada para OmniSphere Security & Admin.');
              }}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-md transition inline-flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Entrar com Perfil de Administrador (Super Admin)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pendingReports = reports.filter(r => r.status === 'pending');
  const totalRegisteredUsers = users.length;
  const totalLinkedChannels = channels.length;
  const suspendedUsersCount = users.filter(u => u.isSuspended).length;

  const filteredUsers = users.filter(u => {
    if (!userSearchQuery.trim()) return true;
    const q = userSearchQuery.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Toast */}
      {actionSuccessMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Admin Top Header */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-semibold px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Painel de Controlo de Segurança & Moderação (RBAC)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Administração Global OmniSphere
          </h1>
          <p className="text-xs text-slate-300">
            Sessão ativa como: <span className="font-bold text-white">{currentUser?.name}</span> ({currentUser?.email}) • Papel: <span className="uppercase text-amber-400 font-mono font-semibold">{currentUser?.role}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-xl font-mono">
            Audit Level: STRICT_GDPR
          </span>
        </div>
      </div>

      {/* Admin Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'overview', label: 'Resumo da Plataforma', icon: <Activity className="w-4 h-4" /> },
          { id: 'reports', label: `Fila de Denúncias (${pendingReports.length})`, icon: <Flag className="w-4 h-4" /> },
          { id: 'users', label: 'Gestão de Utilizadores', icon: <Users className="w-4 h-4" /> },
          { id: 'security', label: 'Registos de Auditoria', icon: <Terminal className="w-4 h-4" /> },
          { id: 'integrations', label: 'Estado das APIs Oficiais', icon: <Layers className="w-4 h-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
              activeAdminTab === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-500">Utilizadores Registados</span>
              <h3 className="text-2xl font-black text-slate-900">{totalRegisteredUsers}</h3>
              <p className="text-[11px] text-slate-400">Total de contas no sistema</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-500">Canais de Redes Sociais</span>
              <h3 className="text-2xl font-black text-slate-900">{totalLinkedChannels}</h3>
              <p className="text-[11px] text-slate-400">Conectados via API ou link</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-500">Denúncias Pendentes</span>
              <h3 className="text-2xl font-black text-amber-600">{pendingReports.length}</h3>
              <p className="text-[11px] text-slate-400">A aguardar decisão da moderação</p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-semibold text-slate-500">Contas Suspensas</span>
              <h3 className="text-2xl font-black text-rose-600">{suspendedUsersCount}</h3>
              <p className="text-[11px] text-slate-400">Por infração aos termos</p>
            </div>

          </div>

          {/* Guidelines and Policy banner */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-3xl p-6 text-xs text-indigo-950 space-y-2">
            <h4 className="font-bold text-sm text-indigo-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              Diretrizes de Moderação e Princípio de Menor Privilégio
            </h4>
            <p className="text-slate-600 leading-relaxed">
              Todos os moderadores e administradores devem operar sob registo de auditoria estrito. A suspensão de contas deve ser fundamentada em infração documentada (Spam, Violação de Direitos, Assédio ou Clone de Identidade). Dados pessoais dos utilizadores (palavras-passe, 2FA secrets) nunca são expostos nesta interface.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: REPORTS & MODERATION */}
      {activeAdminTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Fila de Moderação de Conteúdos e Perfis</h3>
            <span className="text-xs text-slate-500">{reports.length} denúncias no total</span>
          </div>

          {reports.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 text-slate-500 text-xs">
              Nenhuma denúncia registada na plataforma.
            </div>
          ) : (
            <div className="space-y-3">
              {reports.map(rep => (
                <div
                  key={rep.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                        rep.reason === 'spam' ? 'bg-amber-100 text-amber-800' :
                        rep.reason === 'impersonation' ? 'bg-purple-100 text-purple-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {rep.reason.toUpperCase()}
                      </span>
                      <span className="text-xs font-bold text-slate-900">Alvo: {rep.targetName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">({rep.createdAt})</span>
                    </div>

                    <p className="text-xs text-slate-600">{rep.details || 'Sem detalhes fornecidos.'}</p>
                    <p className="text-[11px] text-slate-400">
                      Reportado por: <strong>{rep.reporterName}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {rep.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => {
                            resolveReport(rep.id, 'resolved');
                            triggerToast(`Denúncia ${rep.id} resolvida.`);
                          }}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Aprovar & Medidas</span>
                        </button>
                        <button
                          onClick={() => {
                            resolveReport(rep.id, 'dismissed');
                            triggerToast(`Denúncia ${rep.id} desconsiderada.`);
                          }}
                          className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1"
                        >
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Descartar</span>
                        </button>
                      </>
                    ) : (
                      <span className={`text-xs font-bold px-3 py-1 rounded-lg ${
                        rep.status === 'resolved' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {rep.status === 'resolved' ? 'Resolvida' : 'Descartada'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: USER MANAGEMENT */}
      {activeAdminTab === 'users' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-base font-bold text-slate-900">Gestão de Utilizadores e Papéis (RBAC)</h3>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={userSearchQuery}
                onChange={e => setUserSearchQuery(e.target.value)}
                placeholder="Pesquisar por nome ou email..."
                className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg outline-hidden"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-semibold tracking-wider">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Utilizador</th>
                  <th className="py-3 px-4">País</th>
                  <th className="py-3 px-4">Papel (Role)</th>
                  <th className="py-3 px-4">2FA</th>
                  <th className="py-3 px-4">Estado</th>
                  <th className="py-3 px-4 rounded-r-xl text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={u.avatarUrl}
                          alt={u.name}
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-full object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{u.name}</p>
                          <p className="text-[11px] text-slate-400">@{u.username} • {u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium">{u.country}</td>
                    <td className="py-3.5 px-4">
                      <select
                        value={u.role}
                        onChange={e => {
                          changeUserRole(u.id, e.target.value as UserRole);
                          triggerToast(`Papel de @${u.username} alterado para ${e.target.value}.`);
                        }}
                        className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 font-semibold text-slate-700 outline-hidden"
                      >
                        <option value="user">Utilizador</option>
                        <option value="creator">Criador</option>
                        <option value="business">Empresa</option>
                        <option value="moderator">Moderador</option>
                        <option value="admin">Super Admin</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4">
                      {u.twoFactorEnabled ? (
                        <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Ativo
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10px]">Inativo</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      {u.isSuspended ? (
                        <span className="text-rose-700 font-bold text-[10px] bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          Suspenso
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Ativo
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => {
                          suspendUserAccount(u.id);
                          triggerToast(`Estatuto de @${u.username} atualizado.`);
                        }}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition ${
                          u.isSuspended 
                            ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                            : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                        }`}
                      >
                        {u.isSuspended ? 'Reativar Conta' : 'Suspender Conta'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeAdminTab === 'security' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Registo Imutável de Auditoria de Segurança</h3>
            <span className="text-xs text-slate-400 font-mono">Total de Eventos: {auditLogs.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 font-mono">
              <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-semibold tracking-wider font-sans">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Timestamp</th>
                  <th className="py-3 px-4">Tipo de Evento</th>
                  <th className="py-3 px-4">Utilizador / Email</th>
                  <th className="py-3 px-4">IP & País</th>
                  <th className="py-3 px-4">Detalhes</th>
                  <th className="py-3 px-4 rounded-r-xl text-center">Severidade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                {auditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 text-slate-400">{log.timestamp}</td>
                    <td className="py-3 px-4 font-bold text-slate-800 font-sans">{log.eventType}</td>
                    <td className="py-3 px-4 text-indigo-700">{log.userEmail}</td>
                    <td className="py-3 px-4 text-slate-600">{log.ipAddress} ({log.country})</td>
                    <td className="py-3 px-4 font-sans text-slate-700 max-w-xs truncate">{log.details}</td>
                    <td className="py-3 px-4 text-center font-sans">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        log.severity === 'high' ? 'bg-rose-100 text-rose-800' :
                        log.severity === 'medium' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: OFFICIAL APIS HEALTH */}
      {activeAdminTab === 'integrations' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Estado das Integrações de APIs Oficiais</h3>
              <p className="text-xs text-slate-500">Monitorização de limites de taxa (rate limits) e versões suportadas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {apiStatuses.map(api => {
              const meta = getPlatformMeta(api.platform);
              return (
                <div
                  key={api.id}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${meta.bgColor}`}>
                        {meta.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{api.apiName}</h4>
                        <p className="text-[11px] text-slate-400 font-mono">Versão: {api.version}</p>
                      </div>
                    </div>

                    <span className="flex items-center gap-1 text-emerald-700 text-xs font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Operacional
                    </span>
                  </div>

                  {/* Rate limit usage bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 text-[11px]">Consumo da Quota Horária</span>
                      <span className="font-mono font-bold text-slate-800">{api.rateLimitUsagePercent}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          api.rateLimitUsagePercent > 80 ? 'bg-rose-500' :
                          api.rateLimitUsagePercent > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`} 
                        style={{ width: `${api.rateLimitUsagePercent}%` }} 
                      />
                    </div>
                  </div>

                  {/* Scopes & Documentation link */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-mono">Verificado: {api.lastChecked}</span>
                    <a
                      href={api.officialDocUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                    >
                      <span>Documentação Oficial</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
