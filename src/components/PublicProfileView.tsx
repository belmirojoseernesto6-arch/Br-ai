import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Globe, 
  Mail, 
  MessageCircle, 
  QrCode, 
  Share2, 
  ExternalLink, 
  Briefcase, 
  FolderGit2, 
  Calendar, 
  UserCheck, 
  UserPlus, 
  Sparkles,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserProfile } from '../types';
import { getPlatformMeta } from '../utils/platformIcons';

interface PublicProfileViewProps {
  profile: UserProfile;
  onBack: () => void;
}

export const PublicProfileView: React.FC<PublicProfileViewProps> = ({ profile, onBack }) => {
  const { 
    channels, 
    currentUser, 
    followingIds, 
    toggleFollow, 
    setCurrentView,
    setSelectedPublicProfile 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'channels' | 'services' | 'portfolio'>('channels');
  const [copyToast, setCopyToast] = useState(false);

  const userChannels = channels.filter(c => c.userId === profile.id && c.isVisible);
  const isFollowing = followingIds.includes(profile.id);

  const handleShare = () => {
    const url = `${window.location.origin}/@${profile.username}`;
    navigator.clipboard.writeText(url);
    setCopyToast(true);
    setTimeout(() => setCopyToast(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Toast */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Ligação de perfil copiada com sucesso!</span>
        </div>
      )}

      {/* Back button & top navigation bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Diretório</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setSelectedPublicProfile(profile);
              setCurrentView('bio_link');
            }}
            className="flex items-center gap-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-lg transition"
          >
            <QrCode className="w-4 h-4" />
            <span>Ver Smart Bio Link & QR</span>
          </button>
          
          <button
            onClick={handleShare}
            className="p-2 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg"
            title="Partilhar perfil público"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        
        {/* Cover image */}
        <div 
          className="h-44 sm:h-56 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${profile.coverUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Profile Info Row */}
        <div className="px-6 sm:px-8 pb-8 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-16 sm:-mt-20 mb-5">
            <div className="flex items-end gap-4">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-white shadow-lg"
              />
              <div className="mb-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">{profile.name}</h1>
                  {profile.isVerified && (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600 fill-indigo-100" />
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">@{profile.username} • {profile.country}</p>
              </div>
            </div>

            {/* Follow / Edit Button */}
            <div className="flex items-center gap-2">
              {currentUser?.id === profile.id ? (
                <button
                  onClick={() => setCurrentView('bio_link')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs"
                >
                  Personalizar o Meu Perfil
                </button>
              ) : (
                <button
                  onClick={() => toggleFollow(profile.id)}
                  className={`px-5 py-2.5 text-xs font-bold rounded-xl transition flex items-center gap-2 shadow-xs ${
                    isFollowing
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {isFollowing ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                  <span>{isFollowing ? 'A Seguir' : 'Seguir Perfil'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Bio & Details */}
          <div className="space-y-4 max-w-3xl">
            <span className="inline-block text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-md">
              {profile.profession}
            </span>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {profile.bio}
            </p>

            {/* Contact quick buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Website Oficial</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              )}
              {profile.contactEmail && (
                <a
                  href={`mailto:${profile.contactEmail}`}
                  className="flex items-center gap-1.5 text-slate-600 hover:text-indigo-600 font-medium bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profile.contactEmail}</span>
                </a>
              )}
              {profile.whatsappNumber && (
                <a
                  href={`https://wa.me/${profile.whatsappNumber.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-700 hover:text-emerald-900 font-medium bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Conversar no WhatsApp</span>
                </a>
              )}
              {profile.showJoinDate && (
                <span className="flex items-center gap-1.5 text-slate-400 text-[11px] ml-auto">
                  <Calendar className="w-3.5 h-3.5" />
                  Membro desde {profile.createdAt}
                </span>
              )}
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-6 pt-3 border-t border-slate-100 text-xs">
              <div>
                <span className="font-bold text-slate-900 text-base">{profile.followersCount.toLocaleString('pt-PT')}</span>
                <span className="text-slate-500 ml-1.5">Seguidores</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 text-base">{profile.followingCount}</span>
                <span className="text-slate-500 ml-1.5">A Seguir</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 text-base">{userChannels.length}</span>
                <span className="text-slate-500 ml-1.5">Canais Ativos</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('channels')}
          className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition ${
            activeTab === 'channels'
              ? 'border-indigo-600 text-indigo-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Canais Conectados ({userChannels.length})</span>
        </button>

        {profile.services && profile.services.length > 0 && (
          <button
            onClick={() => setActiveTab('services')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'services'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Serviços & Consultoria ({profile.services.length})</span>
          </button>
        )}

        {profile.portfolio && profile.portfolio.length > 0 && (
          <button
            onClick={() => setActiveTab('portfolio')}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition ${
              activeTab === 'portfolio'
                ? 'border-indigo-600 text-indigo-700'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Portfólio em Destaque ({profile.portfolio.length})</span>
          </button>
        )}
      </div>

      {/* Tab 1: Channels */}
      {activeTab === 'channels' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userChannels.map(channel => {
            const meta = getPlatformMeta(channel.platform);
            return (
              <a
                key={channel.id}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-indigo-300 hover:shadow-md transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl ${meta.bgColor} border ${meta.borderColor} flex items-center justify-center`}>
                    {meta.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-slate-900 text-sm">{meta.name}</span>
                      {channel.connectionType === 'api_verified' && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 fill-indigo-100" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-medium">{channel.handle}</p>
                    {channel.followers > 0 && (
                      <span className="text-[11px] text-slate-400 font-semibold block mt-0.5">
                        {channel.followers.toLocaleString('pt-PT')} seguidores
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-indigo-600 group-hover:text-white text-slate-500 flex items-center justify-center transition">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Tab 2: Professional Services */}
      {activeTab === 'services' && profile.services && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {profile.services.map(srv => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900 text-base">{srv.title}</h4>
                  <span className="font-extrabold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg text-sm whitespace-nowrap">
                    {srv.price}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{srv.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {srv.tags.map(t => (
                    <span key={t} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Prazo: {srv.deliveryTime}</span>
                <a
                  href={`mailto:${profile.contactEmail || profile.email}?subject=Interesse no serviço: ${encodeURIComponent(srv.title)}`}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg"
                >
                  Contratar Serviço
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Portfolio */}
      {activeTab === 'portfolio' && profile.portfolio && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profile.portfolio.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-48 object-cover"
              />
              <div className="p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase tracking-wider">
                    {item.category}
                  </span>
                  <a
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-indigo-600 hover:underline flex items-center gap-1"
                  >
                    <span>Ver Projeto</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <h4 className="font-bold text-slate-900 text-base">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
