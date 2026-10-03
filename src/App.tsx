import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { DashboardView } from './components/DashboardView';
import { SocialAggregatorView } from './components/SocialAggregatorView';
import { PublicDirectoryView } from './components/PublicDirectoryView';
import { PublicProfileView } from './components/PublicProfileView';
import { SmartBioLinkView } from './components/SmartBioLinkView';
import { AnalyticsView } from './components/AnalyticsView';
import { AdminPanelView } from './components/AdminPanelView';
import { ArchitectureGuideView } from './components/ArchitectureGuideView';
import { BrandSuggestionsModal } from './components/BrandSuggestionsModal';
import { 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  Lock, 
  Layers, 
  Heart,
  ChevronRight
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    selectedPublicProfile, 
    setSelectedPublicProfile 
  } = useApp();

  const [brandModalOpen, setBrandModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-500 selection:text-white font-sans text-slate-900">
      
      {/* Top Main Navigation Bar */}
      <Navbar />

      {/* Global Authentication Modal (Login / Register / 2FA) */}
      <AuthModal />

      {/* Global Brand Suggestions Modal (Requirement 1: 10 Brand Names) */}
      <BrandSuggestionsModal 
        isOpen={brandModalOpen}
        onClose={() => setBrandModalOpen(false)}
      />

      {/* Main Dynamic View Content */}
      <main className="flex-1">
        {/* If a public profile is selected and we're not explicitly in the bio_link view, show the full public profile view */}
        {selectedPublicProfile && currentView !== 'bio_link' ? (
          <PublicProfileView 
            profile={selectedPublicProfile} 
            onBack={() => setSelectedPublicProfile(null)} 
          />
        ) : (
          <>
            {currentView === 'dashboard' && <DashboardView />}
            {currentView === 'aggregator' && <SocialAggregatorView />}
            {currentView === 'directory' && <PublicDirectoryView />}
            {currentView === 'bio_link' && <SmartBioLinkView />}
            {currentView === 'analytics' && <AnalyticsView />}
            {currentView === 'admin' && <AdminPanelView />}
            {currentView === 'architecture' && <ArchitectureGuideView />}
          </>
        )}
      </main>

      {/* Modern Global Platform Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Col 1: Brand & Identity */}
            <div className="md:col-span-4 space-y-3">
              <div className="flex items-center gap-2.5 text-white">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold">
                  <Globe className="w-4 h-4" />
                </div>
                <span className="font-extrabold text-base tracking-tight text-white">OmniSphere Global</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pr-4">
                Plataforma web profissional que reúne diferentes redes sociais num único ambiente digital com máxima segurança, conformidade com o RGPD e ausência de scraping abusivo.
              </p>
              <button
                onClick={() => setBrandModalOpen(true)}
                className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold bg-indigo-950/60 border border-indigo-800/60 px-3 py-1.5 rounded-lg transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ver 10 Sugestões de Marcas Internacionais</span>
              </button>
            </div>

            {/* Col 2: Quick Platform Modules */}
            <div className="md:col-span-3 space-y-2.5">
              <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Módulos da Plataforma</h4>
              <ul className="space-y-1.5">
                <li>
                  <button 
                    onClick={() => { setSelectedPublicProfile(null); setCurrentView('dashboard'); }} 
                    className="hover:text-white transition"
                  >
                    Painel Principal & Métricas
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setSelectedPublicProfile(null); setCurrentView('aggregator'); }} 
                    className="hover:text-white transition"
                  >
                    Agregador de Canais & Feed Unificado
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setSelectedPublicProfile(null); setCurrentView('directory'); }} 
                    className="hover:text-white transition"
                  >
                    Diretório Público Global & Pesquisa
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setSelectedPublicProfile(null); setCurrentView('bio_link'); }} 
                    className="hover:text-white transition"
                  >
                    Smart Bio Link & QR Code Pessoal
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => { setSelectedPublicProfile(null); setCurrentView('analytics'); }} 
                    className="hover:text-white transition"
                  >
                    Estatísticas Auditadas
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Supported Social Networks */}
            <div className="md:col-span-2 space-y-2.5">
              <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Redes Suportadas</h4>
              <ul className="space-y-1.5 text-[11px]">
                <li>YouTube Data API v3</li>
                <li>Instagram Graph API</li>
                <li>Facebook Graph API</li>
                <li>WhatsApp Cloud API</li>
                <li>TikTok for Developers</li>
                <li>Telegram Bot API</li>
                <li>X (Twitter) API v2</li>
                <li>LinkedIn Community API</li>
              </ul>
            </div>

            {/* Col 4: Compliance & Security Notice */}
            <div className="md:col-span-3 space-y-2.5">
              <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Segurança & RGPD
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Tokens cifrados com AES-256 em repouso. Palavras-passe protegidas por hashing criptográfico. Políticas explícitas de não raspagem não autorizada e direitos de exportação/eliminação de conta conforme RGPD.
              </p>
              <div className="pt-1">
                <button
                  onClick={() => { setSelectedPublicProfile(null); setCurrentView('architecture'); }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                >
                  <span>Consultar Blueprint Técnico Completo</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
            <p>© {new Date().getFullYear()} OmniSphere Global. Desenvolvido de acordo com as especificações internacionais de segurança e agregação.</p>
            <div className="flex items-center gap-4">
              <span>RGPD / GDPR Compliance</span>
              <span>•</span>
              <span>OAuth 2.0 PKCE</span>
              <span>•</span>
              <span>ISO 27001 Ready</span>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
