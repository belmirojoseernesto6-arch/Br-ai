import React, { useState } from 'react';
import { 
  Globe, 
  Layers, 
  Rss, 
  Compass, 
  QrCode, 
  BarChart3, 
  ShieldCheck, 
  Bell, 
  UserCheck, 
  LogOut, 
  LogIn, 
  BookOpen, 
  ChevronDown, 
  CheckCircle2, 
  AlertTriangle,
  Menu,
  X
} from 'lucide-react';
import { useApp, AppView } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    users, 
    notifications, 
    currentView, 
    setCurrentView, 
    setSelectedPublicProfile,
    switchPersona, 
    logout, 
    setAuthModalOpen,
    markNotificationAsRead,
    markAllNotificationsAsRead
  } = useApp();

  const [personaMenuOpen, setPersonaMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems: { id: AppView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Painel', icon: <Layers className="w-4 h-4" /> },
    { id: 'aggregator', label: 'Agregador & Feed', icon: <Rss className="w-4 h-4" /> },
    { id: 'directory', label: 'Descobrir', icon: <Compass className="w-4 h-4" /> },
    { id: 'bio_link', label: 'Smart Bio Link', icon: <QrCode className="w-4 h-4" /> },
    { id: 'analytics', label: 'Estatísticas', icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: AppView) => {
    setSelectedPublicProfile(null);
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
              <Globe className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 tracking-tight">OmniSphere</span>
                <span className="text-[10px] uppercase tracking-wider font-semibold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-100">Global</span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Hub Internacional de Redes Sociais</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => {
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Admin link */}
            <button
              id="nav-btn-admin"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                currentView === 'admin'
                  ? 'bg-amber-50 text-amber-800 font-semibold border border-amber-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Painel Admin</span>
              {currentUser?.role === 'admin' && (
                <span className="w-2 h-2 rounded-full bg-amber-500" />
              )}
            </button>

            {/* Architecture & Brand Strategy Blueprint */}
            <button
              id="nav-btn-architecture"
              onClick={() => handleNavClick('architecture')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                currentView === 'architecture'
                  ? 'bg-violet-50 text-violet-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-violet-600" />
              <span>Guia & 10 Marcas</span>
            </button>
          </nav>

          {/* Right Action Icons & Persona Switcher */}
          <div className="flex items-center gap-3">
            
            {/* Quick Switch Persona Tester (Essential for reviewing multi-role & profiles) */}
            <div className="relative">
              <button
                id="btn-persona-switcher"
                onClick={() => setPersonaMenuOpen(!personaMenuOpen)}
                title="Alternar utilizador de teste (Sofia, Dr. Marcus, Elena, Carlos, Admin)"
                className="flex items-center gap-2 px-2.5 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-slate-700 font-medium transition"
              >
                <UserCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden md:inline">Testar Persona:</span>
                <span className="font-semibold text-slate-900 max-w-[80px] truncate">
                  {currentUser ? currentUser.name.split(' ')[0] : 'Visitante'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {personaMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1.5 border-b border-slate-100">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Alternar Persona de Demonstração</p>
                    <p className="text-xs text-slate-500">Testa diferentes papéis (Criador, Empresa, Admin)</p>
                  </div>
                  <div className="py-1">
                    {users.map(u => (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchPersona(u.id);
                          setPersonaMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-left text-xs hover:bg-slate-50 transition ${
                          currentUser?.id === u.id ? 'bg-indigo-50/70 font-semibold text-indigo-900' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img 
                            src={u.avatarUrl} 
                            alt={u.name} 
                            referrerPolicy="no-referrer" 
                            className="w-7 h-7 rounded-full object-cover border border-slate-200" 
                          />
                          <div className="truncate">
                            <p className="font-medium text-slate-900 truncate">{u.name}</p>
                            <p className="text-[10px] text-slate-400">@{u.username} • {u.role.toUpperCase()}</p>
                          </div>
                        </div>
                        {currentUser?.id === u.id && (
                          <CheckCircle2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                id="btn-notifications"
                onClick={() => setNotifMenuOpen(!notifMenuOpen)}
                className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
                aria-label="Notificações"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 text-[10px] font-bold bg-rose-500 text-white rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notifMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Centro de Notificações</h4>
                      <p className="text-xs text-slate-500">{unreadCount} não lida(s)</p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllNotificationsAsRead}
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Marcar todas como lidas
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-500">
                        Nenhuma notificação por agora.
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => markNotificationAsRead(notif.id)}
                          className={`p-3 text-left hover:bg-slate-50 transition cursor-pointer flex gap-3 ${
                            !notif.read ? 'bg-indigo-50/40' : ''
                          }`}
                        >
                          <div className="mt-0.5 flex-shrink-0">
                            {notif.type === 'follow' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                            {notif.type === 'sync' && <Layers className="w-4 h-4 text-emerald-600" />}
                            {notif.type === 'security' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                            {notif.type === 'system' && <Globe className="w-4 h-4 text-sky-600" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-slate-900">{notif.title}</p>
                            <p className="text-xs text-slate-600 mt-0.5">{notif.message}</p>
                            <span className="text-[10px] text-slate-400 mt-1 block">{notif.timestamp}</span>
                          </div>
                          {!notif.read && (
                            <span className="w-2 h-2 rounded-full bg-indigo-600 mt-1.5 flex-shrink-0" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Current user or Login/Register button */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  id="btn-user-profile"
                  onClick={() => {
                    setSelectedPublicProfile(currentUser);
                    setCurrentView('directory');
                  }}
                  className="flex items-center gap-2 p-1 pl-2 pr-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full transition"
                >
                  <img
                    src={currentUser.avatarUrl}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-indigo-200"
                  />
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-semibold text-slate-900 leading-none">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500">@{currentUser.username}</p>
                  </div>
                </button>
                <button
                  id="btn-logout"
                  onClick={logout}
                  title="Terminar sessão"
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                id="btn-open-login"
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition"
              >
                <LogIn className="w-4 h-4" />
                <span>Entrar / Registar</span>
              </button>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg ${
                currentView === item.id ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
          <button
            onClick={() => handleNavClick('admin')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg ${
              currentView === 'admin' ? 'bg-amber-50 text-amber-800 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Painel Admin & Moderação</span>
          </button>
          <button
            onClick={() => handleNavClick('architecture')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg ${
              currentView === 'architecture' ? 'bg-violet-50 text-violet-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <BookOpen className="w-4 h-4 text-violet-600" />
            <span>Guia Arquitetural & 10 Nomes</span>
          </button>
        </div>
      )}
    </header>
  );
};
