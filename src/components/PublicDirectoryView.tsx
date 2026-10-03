import React, { useState } from 'react';
import { 
  Search, 
  Globe2, 
  CheckCircle2, 
  Heart, 
  Share2, 
  Flag, 
  UserPlus, 
  UserCheck, 
  ExternalLink, 
  Sparkles, 
  Filter,
  X,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserProfile, UserCategory, SocialPlatform } from '../types';
import { getPlatformMeta } from '../utils/platformIcons';

export const PublicDirectoryView: React.FC = () => {
  const { 
    users, 
    channels, 
    currentUser, 
    followingIds, 
    favoriteIds, 
    toggleFollow, 
    toggleFavorite, 
    submitReport,
    setSelectedPublicProfile,
    setCurrentView 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportingUser, setReportingUser] = useState<UserProfile | null>(null);
  const [reportReason, setReportReason] = useState<'spam' | 'inappropriate' | 'impersonation' | 'harassment' | 'copyright'>('spam');
  const [reportDetails, setReportDetails] = useState('');
  const [copyToast, setCopyToast] = useState<string | null>(null);

  // Filter users
  const filteredUsers = users.filter(user => {
    if (user.isSuspended) return false;
    if (user.isPrivate && currentUser?.id !== user.id) return false;

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = user.name.toLowerCase().includes(q);
      const matchUser = user.username.toLowerCase().includes(q);
      const matchBio = user.bio.toLowerCase().includes(q);
      const matchProf = user.profession.toLowerCase().includes(q);
      if (!matchName && !matchUser && !matchBio && !matchProf) return false;
    }

    // Country filter
    if (selectedCountry !== 'all' && user.country !== selectedCountry) {
      return false;
    }

    // Category filter
    if (selectedCategory !== 'all' && user.category !== selectedCategory) {
      return false;
    }

    return true;
  });

  const featuredUsers = users.filter(u => u.isVerified && !u.isSuspended).slice(0, 3);

  const handleShare = (username: string) => {
    const url = `${window.location.origin}/@${username}`;
    navigator.clipboard.writeText(url);
    setCopyToast(`Ligação @${username} copiada para a área de transferência!`);
    setTimeout(() => setCopyToast(null), 3000);
  };

  const openReportModal = (user: UserProfile) => {
    setReportingUser(user);
    setReportReason('spam');
    setReportDetails('');
    setReportModalOpen(true);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingUser) return;
    submitReport('profile', reportingUser.id, `@${reportingUser.username} (${reportingUser.name})`, reportReason, reportDetails);
    setReportModalOpen(false);
    setReportingUser(null);
    setCopyToast('Denúncia submetida com sucesso à equipa de moderação da OmniSphere.');
    setTimeout(() => setCopyToast(null), 4000);
  };

  const handleOpenProfile = (user: UserProfile) => {
    setSelectedPublicProfile(user);
  };

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: 'Todas as Categorias' },
    { key: 'creator', label: 'Criadores de Conteúdo' },
    { key: 'teacher', label: 'Professores & Educadores' },
    { key: 'developer', label: 'Programadores & Tech' },
    { key: 'business', label: 'Empresas & Negócios' },
    { key: 'freelancer', label: 'Freelancers' },
    { key: 'consultant', label: 'Consultores' },
    { key: 'artist', label: 'Artistas & Designers' },
  ];

  const countries = ['all', 'Portugal', 'Brasil', 'Singapore', 'Germany', 'Angola', 'Moçambique', 'Estados Unidos', 'Reino Unido'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Toast notification */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copyToast}</span>
        </div>
      )}

      {/* Directory Hero Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Diretório Internacional Aberto</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Descobre Criadores, Profissionais e Empresas Globais
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Pesquisa por país, especialidade ou rede social. Conecta-te com canais verificados, explora portfólios e segue perfis públicos sem algoritmos manipuladores.
          </p>
        </div>
      </div>

      {/* Search & Filter Controls Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Text Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Pesquisar por nome, @username, palavra-chave ou especialidade..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-hidden"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-3 text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Country Selector */}
          <div className="md:col-span-3 relative">
            <Globe2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <select
              value={selectedCountry}
              onChange={e => setSelectedCountry(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-hidden bg-white text-slate-700"
            >
              <option value="all">Todos os Países</option>
              {countries.filter(c => c !== 'all').map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* Category Selector */}
          <div className="md:col-span-3 relative">
            <Filter className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-hidden bg-white text-slate-700"
            >
              {categories.map(cat => (
                <option key={cat.key} value={cat.key}>{cat.label}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Quick Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Section */}
      {selectedCategory === 'all' && selectedCountry === 'all' && !searchQuery && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Canais e Perfis em Destaque Global</span>
            </h3>
            <span className="text-[11px] text-slate-400">Critério: Verificação oficial e atividade regular</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredUsers.map(user => {
              const userChans = channels.filter(c => c.userId === user.id && c.isVisible);
              const isFollowing = followingIds.includes(user.id);
              const isFav = favoriteIds.includes(user.id);

              return (
                <div
                  key={`feat-${user.id}`}
                  className="bg-white rounded-2xl border border-indigo-100 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col justify-between"
                >
                  <div className="h-20 bg-cover bg-center relative" style={{ backgroundImage: `url(${user.coverUrl})` }}>
                    <div className="absolute inset-0 bg-black/20" />
                    <button
                      onClick={() => toggleFavorite(user.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-xs rounded-full text-slate-600 hover:text-rose-500 transition shadow-xs"
                      title={isFav ? 'Remover dos favoritos' : 'Guardar nos favoritos'}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  <div className="px-5 pb-5 pt-0 -mt-8 relative space-y-3">
                    <div className="flex items-end justify-between">
                      <img
                        src={user.avatarUrl}
                        alt={user.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md cursor-pointer"
                        onClick={() => handleOpenProfile(user)}
                      />
                      <button
                        onClick={() => toggleFollow(user.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1 ${
                          isFollowing
                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                      >
                        {isFollowing ? <UserCheck className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                        <span>{isFollowing ? 'A Seguir' : 'Seguir'}</span>
                      </button>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 
                          onClick={() => handleOpenProfile(user)}
                          className="font-bold text-slate-900 text-sm hover:text-indigo-600 cursor-pointer"
                        >
                          {user.name}
                        </h4>
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 fill-indigo-100" />
                      </div>
                      <p className="text-xs text-slate-500">@{user.username} • {user.country}</p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">{user.bio}</p>

                    {/* Social channels preview */}
                    <div className="flex items-center gap-1 pt-1">
                      {userChans.slice(0, 5).map(c => {
                        const meta = getPlatformMeta(c.platform);
                        return (
                          <span
                            key={c.id}
                            title={`${meta.name}: ${c.handle}`}
                            className={`p-1.5 rounded-lg ${meta.bgColor} ${meta.color}`}
                          >
                            {meta.icon}
                          </span>
                        );
                      })}
                      {userChans.length > 5 && (
                        <span className="text-[10px] font-medium text-slate-400 pl-1">
                          +{userChans.length - 5}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Main Directory Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">
            Utilizadores e Perfis Encontrados ({filteredUsers.length})
          </h3>
          <span className="text-xs text-slate-500">
            Transparência: Todos os dados apresentados foram autorizados pelos utilizadores
          </span>
        </div>

        {filteredUsers.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-800">Nenhum perfil encontrado</p>
            <p className="text-xs text-slate-500 mt-1">
              Tenta ajustar os termos de pesquisa ou remover os filtros de país e categoria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map(user => {
              const userChans = channels.filter(c => c.userId === user.id && c.isVisible);
              const isFollowing = followingIds.includes(user.id);
              const isFav = favoriteIds.includes(user.id);

              return (
                <div
                  key={user.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Header Banner */}
                    <div 
                      className="h-24 bg-cover bg-center relative cursor-pointer" 
                      style={{ backgroundImage: `url(${user.coverUrl})` }}
                      onClick={() => handleOpenProfile(user)}
                    >
                      <div className="absolute inset-0 bg-black/15" />
                      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(user.id); }}
                          className="p-1.5 bg-white/90 backdrop-blur-xs rounded-full text-slate-600 hover:text-rose-500 transition shadow-xs"
                          title={isFav ? 'Remover dos favoritos' : 'Guardar nos favoritos'}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleShare(user.username); }}
                          className="p-1.5 bg-white/90 backdrop-blur-xs rounded-full text-slate-600 hover:text-indigo-600 transition shadow-xs"
                          title="Partilhar perfil público"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); openReportModal(user); }}
                          className="p-1.5 bg-white/90 backdrop-blur-xs rounded-full text-slate-600 hover:text-amber-600 transition shadow-xs"
                          title="Denunciar perfil ou abuso"
                        >
                          <Flag className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Profile details */}
                    <div className="px-5 pt-0 -mt-10 relative space-y-3">
                      <div className="flex items-end justify-between">
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          referrerPolicy="no-referrer"
                          className="w-18 h-18 rounded-full object-cover border-3 border-white shadow-md cursor-pointer"
                          onClick={() => handleOpenProfile(user)}
                        />
                        <button
                          onClick={() => toggleFollow(user.id)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1.5 ${
                            isFollowing
                              ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                          }`}
                        >
                          {isFollowing ? <UserCheck className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                          <span>{isFollowing ? 'A Seguir' : 'Seguir'}</span>
                        </button>
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 
                            onClick={() => handleOpenProfile(user)}
                            className="font-bold text-slate-900 text-base hover:text-indigo-600 cursor-pointer"
                          >
                            {user.name}
                          </h4>
                          {user.isVerified && (
                            <span title="Canal Verificado">
                              <CheckCircle2 className="w-4 h-4 text-indigo-600 fill-indigo-100" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-medium">@{user.username} • {user.country}</p>
                        <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded mt-1 inline-block">
                          {user.profession}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {user.bio}
                      </p>

                      {/* Associated Social Channels Icons */}
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1.5 font-semibold">
                          Redes Conectadas ({userChans.length})
                        </span>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {userChans.map(c => {
                            const meta = getPlatformMeta(c.platform);
                            return (
                              <a
                                key={c.id}
                                href={c.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={`${meta.name}: ${c.handle}`}
                                className={`p-1.5 rounded-lg ${meta.bgColor} ${meta.color} hover:opacity-80 transition`}
                              >
                                {meta.icon}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between mt-4">
                    <span className="text-xs text-slate-500 font-medium">
                      {user.followersCount.toLocaleString('pt-PT')} seguidores
                    </span>
                    <button
                      onClick={() => handleOpenProfile(user)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <span>Ver Perfil & Bio Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* MODAL: Report User or Content (Section 7 requirement: "Denunciar perfis ou conteúdos inadequados") */}
      {reportModalOpen && reportingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">Denunciar Perfil</h3>
              </div>
              <button onClick={() => setReportModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="p-6 space-y-4">
              <p className="text-xs text-slate-600">
                Estás a denunciar o utilizador <strong>{reportingUser.name}</strong> (@{reportingUser.username}). Esta queixa será analisada pela equipa de moderação da OmniSphere com total confidencialidade.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Motivo Principal</label>
                <select
                  value={reportReason}
                  onChange={e => setReportReason(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden bg-white"
                >
                  <option value="spam">Spam / Links Publicitários Abusivos</option>
                  <option value="impersonation">Falsificação de Identidade (Impersonation)</option>
                  <option value="inappropriate">Conteúdo Inadequado / Explícito</option>
                  <option value="harassment">Assédio / Discurso de Ódio</option>
                  <option value="copyright">Violação de Direitos de Autor / Marca</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Detalhes Adicionais (Opcional mas recomendado)
                </label>
                <textarea
                  rows={3}
                  value={reportDetails}
                  onChange={e => setReportDetails(e.target.value)}
                  placeholder="Explica o contexto ou indica links específicos para auxiliar a equipa de moderação..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-hidden"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setReportModalOpen(false)}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-sm"
                >
                  Enviar Denúncia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
