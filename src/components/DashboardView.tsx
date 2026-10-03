import React from 'react';
import { 
  Layers, 
  Users, 
  TrendingUp, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  Plus, 
  Bell, 
  Clock, 
  Share2, 
  QrCode, 
  Heart, 
  ArrowUpRight, 
  Eye, 
  MousePointerClick,
  Rss,
  Compass,
  Briefcase
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getPlatformMeta } from '../utils/platformIcons';

export const DashboardView: React.FC = () => {
  const { 
    currentUser, 
    channels, 
    feedPosts, 
    users, 
    notifications, 
    auditLogs, 
    favoriteIds,
    toggleFavorite,
    setCurrentView, 
    setSelectedPublicProfile, 
    setAuthModalOpen 
  } = useApp();

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Bem-vindo à OmniSphere Global</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            A tua central para reunir todas as tuas redes sociais, criar um Smart Bio Link com QR Code e conectar-te com criadores globais.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition"
            >
              Iniciar Sessão ou Criar Conta Gratuita
            </button>
          </div>
        </div>
      </div>
    );
  }

  const userChannels = channels.filter(c => c.userId === currentUser.id);
  const userChannelIds = userChannels.map(c => c.id);
  const userFeed = feedPosts.filter(f => userChannelIds.includes(f.channelId) || f.authorHandle === currentUser.username);
  const favoriteUsers = users.filter(u => favoriteIds.includes(u.id));

  // Compute stats
  const totalFollowers = userChannels.reduce((acc, c) => acc + c.followers, 0);
  const verifiedChannelsCount = userChannels.filter(c => c.connectionType === 'api_verified').length;

  // Recommendations: Other users not followed or from different categories
  const recommendedCreators = users
    .filter(u => u.id !== currentUser.id && !u.isSuspended)
    .slice(0, 3);

  // Recent personal audit activities
  const recentUserActivities = auditLogs
    .filter(l => l.userEmail === currentUser.email)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* SECTION 1: PROFILE SUMMARY BANNER */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Cover */}
        <div 
          className="h-36 sm:h-44 bg-cover bg-center relative" 
          style={{ backgroundImage: `url(${currentUser.coverUrl})` }}
        >
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Profile Card Bottom */}
        <div className="px-6 sm:px-8 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-14 mb-4">
            <div className="flex items-end gap-4">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-md"
              />
              <div className="mb-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900">{currentUser.name}</h1>
                  {currentUser.isVerified && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 fill-indigo-100" />
                  )}
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  @{currentUser.username} • {currentUser.country} • <span className="text-indigo-600 font-semibold">{currentUser.profession}</span>
                </p>
              </div>
            </div>

            {/* Quick Actions Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setSelectedPublicProfile(currentUser);
                  setCurrentView('bio_link');
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
              >
                <QrCode className="w-4 h-4" />
                <span>O Meu Smart Link & QR</span>
              </button>
              
              <button
                onClick={() => setCurrentView('aggregator')}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Rede Social</span>
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-600 max-w-3xl leading-relaxed">
            {currentUser.bio}
          </p>
        </div>
      </div>

      {/* SECTION 2: PERSONAL QUICK STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div 
          onClick={() => setCurrentView('analytics')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-indigo-300 transition cursor-pointer space-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Audiência Total</span>
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg group-hover:scale-110 transition">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-slate-900">{totalFollowers.toLocaleString('pt-PT')}</h3>
            <span className="text-xs text-emerald-600 font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +12%
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Em {userChannels.length} canais conectados</p>
        </div>

        <div 
          onClick={() => setCurrentView('aggregator')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-indigo-300 transition cursor-pointer space-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Canais Verificados</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg group-hover:scale-110 transition">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-slate-900">{verifiedChannelsCount} / {userChannels.length}</h3>
            <span className="text-xs text-emerald-600 font-semibold">100% Ativos</span>
          </div>
          <p className="text-[11px] text-slate-400">Tokens OAuth válidos</p>
        </div>

        <div 
          onClick={() => setCurrentView('bio_link')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-indigo-300 transition cursor-pointer space-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Visitas ao Smart Link</span>
            <span className="p-1.5 bg-amber-50 text-amber-600 rounded-lg group-hover:scale-110 transition">
              <MousePointerClick className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-slate-900">3,850</h3>
            <span className="text-xs text-amber-600 font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +18%
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Taxa de conversão: 24.3%</p>
        </div>

        <div 
          onClick={() => setCurrentView('directory')}
          className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-indigo-300 transition cursor-pointer space-y-1 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Perfis Favoritos</span>
            <span className="p-1.5 bg-rose-50 text-rose-600 rounded-lg group-hover:scale-110 transition">
              <Heart className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-slate-900">{favoriteIds.length}</h3>
            <span className="text-xs text-slate-500">Guardados</span>
          </div>
          <p className="text-[11px] text-slate-400">Acesso rápido no diretório</p>
        </div>

      </div>

      {/* SECTION 3: MAIN GRID (ASSOCIATED SOCIAL NETWORKS + RECENT ACTIVITY) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Associated Channels & Feed Preview */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Associated Social Networks Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Redes Sociais Conectadas ({userChannels.length})</h3>
                <p className="text-xs text-slate-500">Canais oficiais autenticados e sincronizados</p>
              </div>
              <button
                onClick={() => setCurrentView('aggregator')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Gerir Canais</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {userChannels.map(channel => {
                const meta = getPlatformMeta(channel.platform);
                return (
                  <div
                    key={channel.id}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-indigo-200 bg-slate-50/50 flex items-center justify-between transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${meta.bgColor} flex items-center justify-center`}>
                        {meta.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="text-xs font-bold text-slate-900">{meta.name}</span>
                          {channel.connectionType === 'api_verified' && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 fill-indigo-100" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">{channel.handle}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-slate-900 block">
                        {channel.followers > 0 ? channel.followers.toLocaleString('pt-PT') : 'Ativo'}
                      </span>
                      <a
                        href={channel.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-indigo-600 hover:underline flex items-center justify-end gap-0.5 mt-0.5"
                      >
                        <span>Abrir</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Feed Content */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Conteúdos Recentes Agregados</h3>
                <p className="text-xs text-slate-500">Últimas publicações sincronizadas dos teus canais</p>
              </div>
              <button
                onClick={() => setCurrentView('aggregator')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
              >
                <span>Ver Feed Completo</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {userFeed.length === 0 ? (
              <p className="text-xs text-slate-500 py-4 text-center">Nenhuma publicação recente sincronizada.</p>
            ) : (
              <div className="space-y-3">
                {userFeed.slice(0, 3).map(post => {
                  const meta = getPlatformMeta(post.platform);
                  return (
                    <div
                      key={post.id}
                      className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 transition flex flex-col sm:flex-row gap-4 justify-between"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-xl ${meta.bgColor} flex-shrink-0`}>
                          {meta.icon}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{meta.name}</span>
                            <span className="text-[10px] text-slate-400">{post.publishedAt}</span>
                          </div>
                          <p className="text-xs text-slate-700 line-clamp-2 leading-relaxed">{post.content}</p>
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 text-[11px] text-slate-500 flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <span>❤️ {post.likesCount.toLocaleString('pt-PT')} gostos</span>
                        <span>💬 {post.commentsCount.toLocaleString('pt-PT')} coments</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: RECOMMENDATIONS, FAVORITES & AUDIT */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Recommendations Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Recomendações Globais</span>
              </h3>
              <button
                onClick={() => setCurrentView('directory')}
                className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Ver todos
              </button>
            </div>

            <div className="space-y-3">
              {recommendedCreators.map(creator => (
                <div
                  key={creator.id}
                  className="p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition flex items-center justify-between gap-3"
                >
                  <div 
                    onClick={() => setSelectedPublicProfile(creator)}
                    className="flex items-center gap-2.5 min-w-0 cursor-pointer"
                  >
                    <img
                      src={creator.avatarUrl}
                      alt={creator.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0"
                    />
                    <div className="truncate">
                      <p className="font-bold text-slate-900 text-xs truncate hover:text-indigo-600">{creator.name}</p>
                      <p className="text-[10px] text-slate-400 truncate">{creator.profession}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedPublicProfile(creator)}
                    className="px-2.5 py-1 text-[10px] font-semibold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg flex-shrink-0 transition"
                  >
                    Ver Perfil
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Profiles Quick Links */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-100" />
              <span>Perfis Favoritos ({favoriteUsers.length})</span>
            </h3>

            {favoriteUsers.length === 0 ? (
              <p className="text-xs text-slate-400">Ainda não adicionaste perfis aos teus favoritos.</p>
            ) : (
              <div className="space-y-2">
                {favoriteUsers.map(fav => (
                  <div
                    key={fav.id}
                    onClick={() => setSelectedPublicProfile(fav)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={fav.avatarUrl}
                        alt={fav.name}
                        referrerPolicy="no-referrer"
                        className="w-7 h-7 rounded-full object-cover"
                      />
                      <span className="text-xs font-semibold text-slate-800 truncate">{fav.name}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Personal Activity Log */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <span>Atividade Recente da Conta</span>
            </h3>

            <div className="space-y-2 text-xs">
              {recentUserActivities.map(act => (
                <div key={act.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800 text-[11px]">{act.eventType}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{act.timestamp.split(' ')[1]}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight">{act.details}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
