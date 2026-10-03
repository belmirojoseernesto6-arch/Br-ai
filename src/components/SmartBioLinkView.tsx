import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import { 
  QrCode, 
  Download, 
  Share2, 
  Copy, 
  Palette, 
  ExternalLink, 
  CheckCircle2, 
  Smartphone, 
  Printer, 
  Eye, 
  Sliders, 
  Globe, 
  Mail, 
  MessageCircle, 
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BIO_LINK_THEMES } from '../data/mockData';
import { BioLinkTheme, UserProfile } from '../types';
import { getPlatformMeta } from '../utils/platformIcons';

export const SmartBioLinkView: React.FC = () => {
  const { 
    currentUser, 
    channels, 
    selectedPublicProfile, 
    activeBioTheme, 
    setBioTheme 
  } = useApp();

  // Determine which user's bio link we are viewing
  const targetUser: UserProfile | null = selectedPublicProfile || currentUser;

  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [copyToast, setCopyToast] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'customizer' | 'qrcode'>('customizer');
  const [qrDarkColor, setQrDarkColor] = useState('#0f172a');
  const [qrLightColor, setQrLightColor] = useState('#ffffff');
  const [includeMargin, setIncludeMargin] = useState(true);

  const smartUrl = targetUser 
    ? `${window.location.origin}/@${targetUser.username}` 
    : window.location.origin;

  // Generate real QR code when URL or colors change
  useEffect(() => {
    if (!targetUser) return;
    QRCode.toDataURL(smartUrl, {
      width: 400,
      margin: includeMargin ? 2 : 0,
      color: {
        dark: qrDarkColor,
        light: qrLightColor
      }
    })
    .then(url => setQrCodeDataUrl(url))
    .catch(err => console.error('Erro ao gerar QR code:', err));
  }, [smartUrl, qrDarkColor, qrLightColor, includeMargin, targetUser]);

  if (!targetUser) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <p className="text-slate-600">Nenhum utilizador selecionado para visualizar o Smart Bio Link.</p>
      </div>
    );
  }

  const userChannels = channels.filter(c => c.userId === targetUser.id && c.isVisible);
  const isOwner = currentUser?.id === targetUser.id;
  const currentTheme = isOwner ? activeBioTheme : (targetUser.customTheme || BIO_LINK_THEMES[0]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(smartUrl);
    setCopyToast('Ligação copiada para a área de transferência!');
    setTimeout(() => setCopyToast(null), 3000);
  };

  const handleDownloadQr = () => {
    if (!qrCodeDataUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeDataUrl;
    link.download = `omnisphere_qr_${targetUser.username}.png`;
    link.click();
    setCopyToast('QR Code descarregado em alta resolução!');
    setTimeout(() => setCopyToast(null), 3000);
  };

  const buttonShapeClass = currentTheme.buttonShape === 'pill' 
    ? 'rounded-full' 
    : currentTheme.buttonShape === 'square' 
    ? 'rounded-none' 
    : 'rounded-2xl';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Copy Toast */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copyToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Smart Bio Link & QR Code</h1>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200 font-medium">
              Cartão Digital Inteligente
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            O teu endereço público unificado (<strong>omnisphere.global/@{targetUser.username}</strong>) com todos os teus canais, serviços, contactos e gerador de QR Code imprimível.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs transition"
          >
            <Copy className="w-4 h-4 text-slate-500" />
            <span>Copiar Link Único</span>
          </button>
          
          <button
            onClick={() => setActiveTab(activeTab === 'customizer' ? 'qrcode' : 'customizer')}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
          >
            {activeTab === 'customizer' ? <QrCode className="w-4 h-4" /> : <Sliders className="w-4 h-4" />}
            <span>{activeTab === 'customizer' ? 'Gerar QR Code' : 'Personalizar Tema'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Customizer/QR on Left + Mobile Phone Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Controls & Settings */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Sub Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-white rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => setActiveTab('customizer')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition ${
                activeTab === 'customizer' 
                  ? 'bg-indigo-600 text-white shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>A. Personalização Visual</span>
            </button>
            <button
              onClick={() => setActiveTab('qrcode')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition ${
                activeTab === 'qrcode' 
                  ? 'bg-indigo-600 text-white shadow-2xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>B. QR Code Pessoal</span>
            </button>
          </div>

          {activeTab === 'customizer' ? (
            /* TAB A: THEME CUSTOMIZATION */
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Temas de Design Pré-configurados</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Escolhe a identidade visual que reflete o teu estilo profissional ou criativo.
                </p>
              </div>

              {/* Themes Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BIO_LINK_THEMES.map(theme => {
                  const isSelected = currentTheme.id === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setBioTheme(theme)}
                      className={`p-4 rounded-2xl text-left border transition relative overflow-hidden flex flex-col justify-between h-28 ${
                        isSelected 
                          ? 'border-indigo-600 ring-2 ring-indigo-200 bg-indigo-50/20' 
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{theme.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                      </div>

                      {/* Theme visual preview pill */}
                      <div className={`p-2 rounded-lg text-[10px] font-semibold border ${theme.cardClass} flex items-center justify-between`}>
                        <span>Pré-visualização</span>
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.accentColor }} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Button Shape */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <label className="block text-xs font-semibold text-slate-700">Formato dos Botões de Canal</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'rounded', label: 'Arredondado (16px)' },
                    { id: 'pill', label: 'Pílula (Full)' },
                    { id: 'square', label: 'Moderno Reto (0px)' }
                  ].map(shape => (
                    <button
                      key={shape.id}
                      onClick={() => setBioTheme({ ...currentTheme, buttonShape: shape.id as any })}
                      className={`py-2 px-3 text-xs font-semibold border rounded-xl transition ${
                        currentTheme.buttonShape === shape.id
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {shape.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Link Info Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                  <LinkIcon className="w-4 h-4 text-indigo-600" />
                  <span>O Teu Endereço Internacional Permanente</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={smartUrl}
                    className="flex-1 px-3 py-2 text-xs font-mono bg-white border border-slate-200 rounded-lg text-slate-700 outline-hidden select-all"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-2xs"
                  >
                    Copiar
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  Partilha este link na bio do teu Instagram, TikTok, LinkedIn, assinatura de email ou Twitter.
                </p>
              </div>

            </div>
          ) : (
            /* TAB B: QR CODE GENERATION & SHARING */
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">Gerador de QR Code Pessoal</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Converte o teu perfil num código escaneável para cartões de visita, eventos e currículo.
                </p>
              </div>

              {/* QR Code Presentation Box */}
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
                {qrCodeDataUrl ? (
                  <div className="p-4 bg-white rounded-2xl shadow-md border border-slate-100">
                    <img
                      src={qrCodeDataUrl}
                      alt={`QR Code de @${targetUser.username}`}
                      className="w-56 h-56 object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-56 h-56 bg-slate-200 animate-pulse rounded-2xl" />
                )}

                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-900">Scan com a câmara do telemóvel</p>
                  <p className="text-[11px] font-mono text-slate-500">@{targetUser.username} • omnisphere.global</p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleDownloadQr}
                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-xs transition"
                  >
                    <Download className="w-4 h-4" />
                    <span>Descarregar PNG (Alta Resolução)</span>
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Imprimir Cartão</span>
                  </button>
                </div>
              </div>

              {/* QR Customization Options */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-slate-700">Cor do QR Code</label>
                <div className="flex items-center gap-3">
                  {[
                    { label: 'Obsidiana Escuro', color: '#0f172a' },
                    { label: 'Índigo Profundo', color: '#3730a3' },
                    { label: 'Esmeralda Tech', color: '#065f46' },
                    { label: 'Vinho / Rubi', color: '#881337' }
                  ].map(c => (
                    <button
                      key={c.color}
                      onClick={() => setQrDarkColor(c.color)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                        qrDarkColor === c.color ? 'border-indigo-600 bg-indigo-50 font-bold' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
                      <span className="hidden sm:inline text-[11px]">{c.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Use Cases Section */}
              <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4 text-xs text-indigo-950 space-y-2">
                <span className="font-bold flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  Casos de Uso Recomendados para o teu QR Code:
                </span>
                <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                  <li><strong>Cartões de visita físicos:</strong> Redireciona diretamente para todos os teus canais sem links partidos.</li>
                  <li><strong>Slides e Apresentações:</strong> No último slide de palestras ou webinars para novos seguidores imediatos.</li>
                  <li><strong>Currículo & Portfólio:</strong> Em formato PDF para recrutadores acederem a projetos verificados.</li>
                  <li><strong>Montras ou Balcão de Loja:</strong> Para negócios e empresas incentivarem avaliações e contacto no WhatsApp.</li>
                </ul>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Interactive Smartphone Mockup */}
        <div className="lg:col-span-6 flex justify-center sticky top-24">
          <div className="w-full max-w-[360px] bg-slate-900 p-3 rounded-[44px] shadow-2xl border-4 border-slate-800 ring-1 ring-slate-700">
            
            {/* Phone Speaker & Dynamic Island */}
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-2 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-black rounded-full" />
            </div>

            {/* Phone Screen Container */}
            <div className={`rounded-[36px] overflow-hidden min-h-[580px] max-h-[640px] overflow-y-auto p-5 space-y-5 transition-all duration-300 ${currentTheme.backgroundClass} ${currentTheme.textClass}`}>
              
              {/* Profile Avatar & Header */}
              <div className="text-center space-y-2 pt-2">
                <div className="relative inline-block">
                  <img
                    src={targetUser.avatarUrl}
                    alt={targetUser.name}
                    referrerPolicy="no-referrer"
                    className="w-20 h-20 rounded-full object-cover mx-auto border-2 border-white shadow-md"
                  />
                  {targetUser.isVerified && (
                    <span className="absolute bottom-0 right-0 bg-white rounded-full p-0.5 shadow-xs">
                      <CheckCircle2 className="w-5 h-5 text-indigo-600 fill-indigo-100" />
                    </span>
                  )}
                </div>

                <div>
                  <h2 className="font-bold text-base">{targetUser.name}</h2>
                  <p className="text-xs opacity-75">@{targetUser.username}</p>
                </div>

                <p className="text-xs opacity-90 leading-relaxed max-w-[280px] mx-auto line-clamp-3">
                  {targetUser.bio}
                </p>
              </div>

              {/* Quick Action Contact Pills */}
              <div className="flex items-center justify-center gap-2 pt-1">
                {targetUser.whatsappNumber && (
                  <a
                    href={`https://wa.me/${targetUser.whatsappNumber.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-emerald-500 text-white shadow-xs hover:scale-105 transition"
                    title="Conversar no WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                )}
                {targetUser.contactEmail && (
                  <a
                    href={`mailto:${targetUser.contactEmail}`}
                    className="p-2.5 rounded-full bg-indigo-600 text-white shadow-xs hover:scale-105 transition"
                    title="Enviar Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
                {targetUser.website && (
                  <a
                    href={targetUser.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-slate-800 text-white shadow-xs hover:scale-105 transition"
                    title="Visitar Website"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
              </div>

              {/* Social Channels List in Smart Theme Cards */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[10px] uppercase tracking-wider font-semibold opacity-60 block text-center">
                  Canais & Redes Oficiais
                </span>

                {userChannels.length === 0 ? (
                  <p className="text-xs text-center opacity-60 py-4">Nenhum canal público visível.</p>
                ) : (
                  userChannels.map(c => {
                    const meta = getPlatformMeta(c.platform);
                    return (
                      <a
                        key={c.id}
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full p-3 flex items-center justify-between transition hover:scale-101 ${buttonShapeClass} ${currentTheme.cardClass}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${meta.bgColor}`}>
                            {meta.icon}
                          </div>
                          <div className="text-left">
                            <span className="text-xs font-bold block leading-tight">{meta.name}</span>
                            <span className="text-[10px] opacity-70 block">{c.handle}</span>
                          </div>
                        </div>

                        <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                      </a>
                    );
                  })
                )}
              </div>

              {/* Professional Services / Links (if available) */}
              {targetUser.services && targetUser.services.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold opacity-60 block text-center">
                    Serviços & Parcerias
                  </span>
                  {targetUser.services.map(srv => (
                    <div
                      key={srv.id}
                      className={`p-3 text-left ${buttonShapeClass} ${currentTheme.cardClass} space-y-1`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold">{srv.title}</span>
                        <span className="text-xs font-extrabold text-indigo-500">{srv.price}</span>
                      </div>
                      <p className="text-[10px] opacity-75 line-clamp-2">{srv.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Platform watermark footer */}
              <div className="pt-4 text-center pb-2">
                <span className="text-[10px] opacity-50 font-medium">
                  Criado com OmniSphere Global
                </span>
              </div>

            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-3" />
          </div>
        </div>

      </div>

    </div>
  );
};
