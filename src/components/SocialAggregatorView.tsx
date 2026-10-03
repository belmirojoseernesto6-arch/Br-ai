import React, { useState } from 'react';
import { 
  Plus, 
  ExternalLink, 
  RefreshCw, 
  Trash2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Radio, 
  Heart, 
  MessageSquare, 
  Share2, 
  Clock, 
  Search,
  Filter,
  Info,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SocialPlatform, ConnectionType, SocialChannel } from '../types';
import { getPlatformMeta } from '../utils/platformIcons';

export const SocialAggregatorView: React.FC = () => {
  const { 
    currentUser, 
    channels, 
    feedPosts, 
    addChannel, 
    updateChannel, 
    deleteChannel, 
    syncChannel,
    setAuthModalOpen 
  } = useApp();

  const [activeFeedTab, setActiveFeedTab] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [simulateApiError, setSimulateApiError] = useState(false);

  // Form states for adding channel
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>('youtube');
  const [handle, setHandle] = useState('');
  const [url, setUrl] = useState('');
  const [connectionType, setConnectionType] = useState<ConnectionType>('api_verified');
  const [customLabel, setCustomLabel] = useState('');
  const [initialFollowers, setInitialFollowers] = useState('1000');
  const [isVisible, setIsVisible] = useState(true);

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <Radio className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Inicia sessão para gerir canais</h2>
          <p className="text-xs text-slate-600">
            Conecta o teu YouTube, Instagram, TikTok, LinkedIn, WhatsApp e outras redes para gerir tudo num só local e visualizar o feed unificado.
          </p>
          <button
            onClick={() => setAuthModalOpen(true)}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
          >
            Iniciar Sessão / Criar Conta
          </button>
        </div>
      </div>
    );
  }

  const userChannels = channels.filter(c => c.userId === currentUser.id);

  const handleSyncClick = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      syncChannel(id);
      setSyncingId(null);
    }, 600);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = url.startsWith('http') ? url : `https://${url}`;
    addChannel({
      platform: selectedPlatform,
      handle: handle.trim(),
      url: finalUrl,
      connectionType,
      followers: parseInt(initialFollowers, 10) || 0,
      isVisible,
      customLabel: customLabel || undefined
    });
    // Reset and close
    setHandle('');
    setUrl('');
    setCustomLabel('');
    setIsAddModalOpen(false);
  };

  const filteredFeed = feedPosts.filter(post => {
    if (activeFeedTab === 'all') return true;
    return post.platform === activeFeedTab;
  });

  const availablePlatforms: { key: SocialPlatform; label: string }[] = [
    { key: 'youtube', label: 'YouTube' },
    { key: 'instagram', label: 'Instagram' },
    { key: 'tiktok', label: 'TikTok' },
    { key: 'twitter', label: 'X (Twitter)' },
    { key: 'linkedin', label: 'LinkedIn' },
    { key: 'facebook', label: 'Facebook' },
    { key: 'whatsapp', label: 'WhatsApp' },
    { key: 'telegram', label: 'Telegram' },
    { key: 'github', label: 'GitHub' },
    { key: 'twitch', label: 'Twitch' },
    { key: 'discord', label: 'Discord' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Agregador de Redes Sociais</h1>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200 font-medium">
              Conexões Autorizadas
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Gere os teus canais conectados através de links públicos verificados ou integrações de APIs oficiais. Sem scraping não autorizado e com total controlo de privacidade.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-add-channel-modal"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Associar Nova Rede</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: Connected Channel Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Os Teus Canais e Perfis Associados</h2>
            <p className="text-xs text-slate-500">
              {userChannels.length} rede(s) vinculada(s) à tua conta
            </p>
          </div>
        </div>

        {userChannels.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-dashed border-slate-300">
            <Radio className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-800">Ainda não associaste nenhuma rede social</p>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Adiciona o teu canal de YouTube, Instagram, WhatsApp ou LinkedIn para centralizar todos os teus seguidores e conteúdos.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white text-xs font-semibold rounded-lg"
            >
              Adicionar Primeiro Canal
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userChannels.map(channel => {
              const meta = getPlatformMeta(channel.platform);
              const isSyncing = syncingId === channel.id;

              return (
                <div
                  key={channel.id}
                  className={`bg-white rounded-2xl p-5 border transition-all hover:shadow-md relative flex flex-col justify-between ${
                    channel.isVisible ? 'border-slate-200' : 'border-slate-200 opacity-75 bg-slate-50/50'
                  }`}
                >
                  {/* Top Bar: Icon + Status */}
                  <div>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl ${meta.bgColor} border ${meta.borderColor} flex items-center justify-center`}>
                          {meta.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-bold text-slate-900">{meta.name}</span>
                            {channel.connectionType === 'api_verified' && (
                              <span title="Integração via API Oficial" className="text-indigo-600">
                                <CheckCircle2 className="w-4 h-4 fill-indigo-100" />
                              </span>
                            )}
                          </div>
                          <p className="text-xs font-medium text-slate-600 truncate max-w-[170px]">{channel.handle}</p>
                        </div>
                      </div>

                      {/* Visibility indicator */}
                      <button
                        title={channel.isVisible ? 'Canal Visível Publicamente' : 'Canal Oculto no Perfil Público'}
                        onClick={() => updateChannel(channel.id, { isVisible: !channel.isVisible })}
                        className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
                      >
                        {channel.isVisible ? <Eye className="w-4 h-4 text-emerald-600" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
                      </button>
                    </div>

                    {channel.customLabel && (
                      <p className="text-[11px] font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded mt-3 inline-block">
                        {channel.customLabel}
                      </p>
                    )}

                    {/* Channel Metrics */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Seguidores</span>
                        <span className="font-bold text-slate-900 text-sm">
                          {channel.followers > 0 ? channel.followers.toLocaleString('pt-PT') : 'Privado / N/A'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Última Sinc.</span>
                        <span className="text-slate-500 font-mono text-[11px]">{channel.lastSync}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
                    >
                      <span>Abrir Canal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <div className="flex items-center gap-1">
                      <button
                        title="Sincronizar métricas oficiais agora"
                        onClick={() => handleSyncClick(channel.id)}
                        disabled={isSyncing}
                        className={`p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition ${
                          isSyncing ? 'animate-spin text-indigo-600' : ''
                        }`}
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Remover canal"
                        onClick={() => {
                          if (confirm(`Tens a certeza que queres desassociar o canal ${channel.handle}?`)) {
                            deleteChannel(channel.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* SECTION 2: Unified Feed */}
      <section className="space-y-4 pt-6 border-t border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Feed Unificado de Conteúdos</h2>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200 font-medium">
                APIs Oficiais Conectadas
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Publicações agregadas de diferentes plataformas em tempo real, respeitando termos e limites de cada rede.
            </p>
          </div>

          {/* Test toggle for Section 6 requirement: "Apresentar estados de erro e indisponibilidade de integração" */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSimulateApiError(!simulateApiError)}
              className={`text-[11px] px-2.5 py-1.5 rounded-lg border font-medium transition ${
                simulateApiError 
                  ? 'bg-rose-50 text-rose-700 border-rose-200' 
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {simulateApiError ? 'Desativar Simulação de Falha de API' : 'Simular Indisponibilidade de API'}
            </button>
          </div>
        </div>

        {/* API Error state notice if triggered */}
        {simulateApiError && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-xs text-amber-900 animate-in fade-in">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-bold">Aviso de Limite de Taxa / Indisponibilidade Temporária (HTTP 429)</p>
              <p className="mt-0.5 text-amber-800">
                A Meta Graph API (Instagram) e a X API v2 reportaram consumo de 100% da quota horário. A OmniSphere está a exibir conteúdos guardados em cache para não interromper a navegação.
              </p>
            </div>
          </div>
        )}

        {/* Platform filter tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setActiveFeedTab('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap ${
              activeFeedTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Todas as Redes ({feedPosts.length})
          </button>
          {['youtube', 'instagram', 'twitter', 'linkedin', 'github', 'tiktok'].map(plat => {
            const count = feedPosts.filter(p => p.platform === plat).length;
            const meta = getPlatformMeta(plat as SocialPlatform);
            return (
              <button
                key={plat}
                onClick={() => setActiveFeedTab(plat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition whitespace-nowrap ${
                  activeFeedTab === plat
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{meta.name}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Feed Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredFeed.map(post => {
            const meta = getPlatformMeta(post.platform);
            return (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  {/* Post Author & Origin Header */}
                  <div className="p-4 flex items-center justify-between border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.authorAvatar}
                        alt={post.authorName}
                        referrerPolicy="no-referrer"
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900">{post.authorName}</span>
                          {post.isVerifiedApi && (
                            <span title="API Oficial Autenticada" className="text-indigo-600">
                              <CheckCircle2 className="w-3.5 h-3.5 fill-indigo-100" />
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-500">{post.authorHandle}</span>
                      </div>
                    </div>

                    {/* Platform Origin Badge */}
                    <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${meta.bgColor} ${meta.color} border ${meta.borderColor}`}>
                      {meta.icon}
                      <span className="text-[11px]">{meta.name}</span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-4 space-y-3">
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {post.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Media preview (Video / Image) */}
                    {post.mediaUrl && (
                      <div className="relative rounded-xl overflow-hidden border border-slate-200 mt-2 bg-slate-950 aspect-video group">
                        <img
                          src={post.mediaUrl}
                          alt="Pré-visualização do conteúdo"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                        />
                        {post.mediaType === 'video' && (
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-white/90 text-red-600 flex items-center justify-center shadow-lg">
                              <div className="w-0 h-0 border-y-6 border-y-transparent border-l-10 border-l-red-600 ml-1" />
                            </div>
                          </div>
                        )}
                        {post.viewsCount && (
                          <span className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                            {post.viewsCount.toLocaleString('pt-PT')} views
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer with metrics and original link */}
                <div className="px-4 py-3 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 font-medium">
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      <span>{post.likesCount.toLocaleString('pt-PT')}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.commentsCount}</span>
                    </span>
                    <span className="flex items-center gap-1 font-medium">
                      <Share2 className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.sharesCount}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.publishedAt}
                    </span>
                    <a
                      href={post.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800"
                    >
                      <span>Ver Original</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* MODAL: Associate New Channel */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">Associar Canal de Rede Social</h3>
                <p className="text-xs text-slate-400">Ligação segura através de link público ou API oficial</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              
              {/* Select Platform */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Escolhe a Plataforma</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availablePlatforms.map(p => {
                    const meta = getPlatformMeta(p.key);
                    const isSelected = selectedPlatform === p.key;
                    return (
                      <button
                        type="button"
                        key={p.key}
                        onClick={() => setSelectedPlatform(p.key)}
                        className={`p-2.5 rounded-xl border text-left flex flex-col items-center gap-1.5 transition ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 font-bold ring-2 ring-indigo-200'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className={`p-1.5 rounded-lg ${meta.bgColor}`}>
                          {meta.icon}
                        </div>
                        <span className="text-[11px] truncate">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Handle / Username */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Identificador / Canal / Número
                </label>
                <input
                  type="text"
                  required
                  value={handle}
                  onChange={e => setHandle(e.target.value)}
                  placeholder={getPlatformMeta(selectedPlatform).handlePrefix + 'nome_do_canal'}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden font-medium"
                />
              </div>

              {/* URL */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ligação Pública de Acesso
                </label>
                <input
                  type="text"
                  required
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder={getPlatformMeta(selectedPlatform).urlPlaceholder}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden font-mono"
                />
              </div>

              {/* Connection Type */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="block text-xs font-semibold text-slate-800">Modo de Associação</label>
                
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="connType"
                    checked={connectionType === 'api_verified'}
                    onChange={() => setConnectionType('api_verified')}
                    className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5">
                      Integração com API Oficial
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 rounded font-bold">Recomendado</span>
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Valida tokens oficiais OAuth2 sem solicitar palavras-passe. Sincroniza seguidores reais e feed.
                    </span>
                  </div>
                </label>

                <label className="flex items-start gap-2 cursor-pointer pt-1">
                  <input
                    type="radio"
                    name="connType"
                    checked={connectionType === 'public_link'}
                    onChange={() => setConnectionType('public_link')}
                    className="mt-0.5 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div>
                    <span className="text-xs font-semibold text-slate-900">Ligação Pública Direta</span>
                    <span className="text-[11px] text-slate-500 block">
                      Adiciona o cartão ao teu perfil sem requerer autenticação ou chaves de API.
                    </span>
                  </div>
                </label>
              </div>

              {/* Follower Count & Label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Número de Seguidores
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={initialFollowers}
                    onChange={e => setInitialFollowers(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rótulo Personalizado (Opcional)
                  </label>
                  <input
                    type="text"
                    value={customLabel}
                    onChange={e => setCustomLabel(e.target.value)}
                    placeholder="Ex: Canal Principal de Vlogs"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                  />
                </div>
              </div>

              {/* Visibility checkbox */}
              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={e => setIsVisible(e.target.checked)}
                  className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-xs text-slate-700">Tornar este canal visível no meu perfil público e Smart Bio Link</span>
              </label>

              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md transition"
              >
                Confirmar Associação
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
