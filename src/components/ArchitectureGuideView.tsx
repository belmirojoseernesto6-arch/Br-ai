import React, { useState } from 'react';
import { 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  Server, 
  Database, 
  Globe, 
  Lock, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  FileCode,
  Terminal,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { BrandSuggestionsModal } from './BrandSuggestionsModal';

export const ArchitectureGuideView: React.FC = () => {
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<'architecture' | 'apis' | 'security' | 'roadmap'>('architecture');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <BrandSuggestionsModal
        isOpen={brandModalOpen}
        onClose={() => setBrandModalOpen(false)}
      />

      {/* Guide Hero */}
      <div className="bg-gradient-to-r from-slate-900 via-violet-950 to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Documentação Técnica & Estratégia de Produto</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Arquitetura Global, Segurança & APIs Oficiais
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Plano diretor completo com as 10 marcas internacionais sugeridas, arquitetura full-stack (React + FastAPI + PostgreSQL), conformidade com RGPD e protocolo de integração sem scraping abusivo.
          </p>
        </div>

        <button
          onClick={() => setBrandModalOpen(true)}
          className="px-5 py-3 bg-violet-600 hover:bg-violet-700 text-white text-xs font-bold rounded-2xl shadow-lg flex items-center gap-2 flex-shrink-0 transition"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Explorar 10 Nomes de Marca</span>
        </button>
      </div>

      {/* Sub Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'architecture', label: '1. Stack Tecnológica & Infraestrutura', icon: <Server className="w-4 h-4" /> },
          { id: 'apis', label: '2. Matriz de Integração de Redes Sociais', icon: <Layers className="w-4 h-4" /> },
          { id: 'security', label: '3. Segurança, RGPD & Anti-Scraping', icon: <Lock className="w-4 h-4" /> },
          { id: 'roadmap', label: '4. Fases de Execução (Roadmap)', icon: <CheckCircle2 className="w-4 h-4" /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedSection(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition ${
              selectedSection === tab.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* SECTION 1: ARCHITECTURE */}
      {selectedSection === 'architecture' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <FileCode className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Frontend SPA / PWA</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li><strong>React 18+ com TypeScript:</strong> Type-safety estrito e modularidade em componentes desacoplados.</li>
                <li><strong>Tailwind CSS:</strong> Sistema de design responsivo com tokens visuais consistentes.</li>
                <li><strong>Vite:</strong> Bundling ultrarrápido com tempo de carregamento inferior a 1.2s.</li>
                <li><strong>QR Code Engine:</strong> Renderização client-side de QR Codes em alta definição.</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Backend Python (FastAPI / Django)</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li><strong>Python 3.11+:</strong> Desempenho assíncrono com Uvicorn para alta concorrência de webhooks.</li>
                <li><strong>OAuth 2.0 PKCE:</strong> Fluxos de autenticação padronizados sem armazenamento de palavras-passe de terceiros.</li>
                <li><strong>Celery & Redis:</strong> Sincronização em background de feeds e limitação de rate limits.</li>
                <li><strong>RESTful & OpenAPI:</strong> Documentação interativa via Swagger UI automática.</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
              <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">Base de Dados & Cache</h3>
              <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                <li><strong>PostgreSQL 16:</strong> Esquema relacional com índices para pesquisas rápidas por username, país e categoria.</li>
                <li><strong>Redis:</strong> Cache em memória para perfis frequentes e limitação de taxa por IP.</li>
                <li><strong>S3 / CDN CloudFront:</strong> Armazenamento seguro de avatars e capas com otimização WebP.</li>
                <li><strong>Backups Georredundantes:</strong> Políticas de recuperação em conformidade com ISO 27001.</li>
              </ul>
            </div>

          </div>

          {/* Database Schema Summary Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Modelo Entidade-Relacionamento Proposto (PostgreSQL)</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">users</span>
                <span className="text-slate-500 font-mono text-[11px] block">id (UUID PK)</span>
                <span className="text-slate-500 font-mono text-[11px] block">email (UNIQUE)</span>
                <span className="text-slate-500 font-mono text-[11px] block">password_hash (bcrypt)</span>
                <span className="text-slate-500 font-mono text-[11px] block">role (ENUM)</span>
                <span className="text-slate-500 font-mono text-[11px] block">two_factor_secret (ENC)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">profiles</span>
                <span className="text-slate-500 font-mono text-[11px] block">user_id (FK)</span>
                <span className="text-slate-500 font-mono text-[11px] block">username (UNIQUE)</span>
                <span className="text-slate-500 font-mono text-[11px] block">country_code (ISO)</span>
                <span className="text-slate-500 font-mono text-[11px] block">category (ENUM)</span>
                <span className="text-slate-500 font-mono text-[11px] block">is_verified (BOOL)</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">social_channels</span>
                <span className="text-slate-500 font-mono text-[11px] block">id (UUID PK)</span>
                <span className="text-slate-500 font-mono text-[11px] block">user_id (FK)</span>
                <span className="text-slate-500 font-mono text-[11px] block">platform (ENUM)</span>
                <span className="text-slate-500 font-mono text-[11px] block">oauth_token (ENC)</span>
                <span className="text-slate-500 font-mono text-[11px] block">connection_type</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">audit_logs</span>
                <span className="text-slate-500 font-mono text-[11px] block">id (BIGSERIAL PK)</span>
                <span className="text-slate-500 font-mono text-[11px] block">user_id (FK nullable)</span>
                <span className="text-slate-500 font-mono text-[11px] block">ip_address (INET)</span>
                <span className="text-slate-500 font-mono text-[11px] block">event_type (VARCHAR)</span>
                <span className="text-slate-500 font-mono text-[11px] block">created_at (TIMESTAMP)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: APIS MATRIX */}
      {selectedSection === 'apis' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Estratégia Oficial de Integração das 8+ Redes Sociais</h3>
              <p className="text-xs text-slate-500">
                Adesão rigorosa às políticas de desenvolvedor: sem web scraping, com gestão de quotas e webhooks oficiais
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                platform: 'YouTube',
                api: 'YouTube Data API v3',
                auth: 'OAuth 2.0 (Google Identity Services)',
                features: 'Estatísticas do canal, contagem de subscritores e vídeos públicos incorporados.',
                limits: 'Quota diária de 10,000 unidades por defeito (leitura otimizada com cache de 30 min).'
              },
              {
                platform: 'Instagram & Facebook',
                api: 'Meta Graph API & Instagram Basic Display',
                auth: 'Meta Business Login / OAuth 2.0 com escopos granulares',
                features: 'Contas profissionais/criadores, métricas públicas de seguidores e posts autorizados.',
                limits: 'Rate limit de 200 chamadas/hora por utilizador. Atualização via webhooks quando disponível.'
              },
              {
                platform: 'WhatsApp',
                api: 'WhatsApp Cloud API & Link Direto Universal',
                auth: 'API Oficial para empresas + wa.me para canais e conversas diretas 1:1',
                features: 'Botão de clique direto sem necessidade de armazenar o número nos servidores se o utilizador optar por link público.',
                limits: 'Gratuito para links wa.me; mensagens comerciais sujeitas a tarifas da Meta.'
              },
              {
                platform: 'TikTok',
                api: 'TikTok for Developers (Login Kit & Display API)',
                auth: 'OAuth 2.0 com autorização de perfil público',
                features: 'Exibição de username oficial, foto de perfil e contagem de vídeos públicos.',
                limits: 'Exige aprovação em ambiente de Sandbox antes de entrar em produção comercial.'
              },
              {
                platform: 'Telegram',
                api: 'Telegram Bot API & Links t.me Oficiais',
                auth: 'Telegram Login Widget / Bot Webhooks',
                features: 'Redirecionamento para canais públicos, grupos oficiais e validação de bot.',
                limits: '30 mensagens por segundo por bot. Sem limites para links de canais públicos t.me.'
              },
              {
                platform: 'X (Twitter)',
                api: 'X API v2 (OAuth 2.0 com PKCE)',
                auth: 'OAuth 2.0 User Context',
                features: 'Leitura de métricas de perfil público e identificador oficial.',
                limits: 'Sujeito aos escalões da API v2 do X (Free/Basic/Pro). Fallback gracioso para link verificado.'
              },
              {
                platform: 'LinkedIn',
                api: 'LinkedIn Community Management API & Sign In',
                auth: 'OAuth 2.0 com escopos OpenID Connect & w_member_social',
                features: 'Perfis profissionais, páginas de empresas e validação de experiência.',
                limits: 'Validade de token de 60 dias com renovação via Refresh Token segura.'
              },
            ].map(item => (
              <div key={item.platform} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{item.platform}</h4>
                  <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-semibold">
                    {item.api}
                  </span>
                </div>
                <p className="text-xs text-slate-600"><strong className="text-slate-800">Autenticação:</strong> {item.auth}</p>
                <p className="text-xs text-slate-600"><strong className="text-slate-800">Funcionalidades:</strong> {item.features}</p>
                <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <strong>Gestão de Limites:</strong> {item.limits}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 3: SECURITY & RGPD */}
      {selectedSection === 'security' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Diretrizes Fundamentais de Segurança e RGPD/GDPR
            </h3>
            <p className="text-xs text-slate-500">
              Pilares inegociáveis de privacidade e integridade técnica especificados nos requisitos do projeto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Zero Scraping Abusivo
              </h4>
              <p className="text-slate-600 leading-relaxed">
                A OmniSphere <strong>nunca</strong> utiliza técnicas de raspagem não autorizada nem solicita palavras-passe de redes sociais aos utilizadores. Todas as conexões utilizam fluxos OAuth 2.0 padrão da indústria ou links públicos autodeclarados com consentimento explícito.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Proteção Criptográfica de Palavras-passe
              </h4>
              <p className="text-slate-600 leading-relaxed">
                As credenciais de acesso locais são cifradas com algoritmos modernos (bcrypt com salt elevado ou Argon2id). Tokens de acesso OAuth são encriptados em repouso na base de dados com chaves AES-256 geridas por KMS seguro.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Conformidade com o RGPD (GDPR)
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Suporte total aos direitos do titular: <strong>Direito ao Esquecimento</strong> (eliminação completa e irreversível de conta e dados), <strong>Portabilidade de Dados</strong> (exportação em JSON auditável) e gestão granular de visibilidade pública ou privada.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Proteção Contra Ataques & Rate Limiting
              </h4>
              <p className="text-slate-600 leading-relaxed">
                Mecanismos de Rate Limiting por IP e conta para mitigar ataques de força bruta, proteção nativa contra CSRF, cabeçalhos de segurança HTTP estritos (Content Security Policy, HSTS, X-Content-Type-Options) e sanitização rigorosa de inputs.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* SECTION 4: ROADMAP */}
      {selectedSection === 'roadmap' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Roteiro de Desenvolvimento (Fases 1 a 4)</h3>

            <div className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-emerald-900">Fase 1: MVP Funcional (100% Concluída nesta Demonstração)</span>
                  <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded-full">Pronto & Interativo</span>
                </div>
                <p className="text-xs text-slate-600">
                  Autenticação completa com 2FA, Dashboard pessoal com resumo de métricas, Agregador de redes sociais, Smart Bio-Link, QR Code em alta resolução, Diretório público internacional e Painel administrativo com RBAC.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-800">Fase 2: Integrações Oficiais & Webhooks em Tempo Real</span>
                  <span className="text-[10px] font-semibold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">Próxima Etapa</span>
                </div>
                <p className="text-xs text-slate-600">
                  Implementação do serviço de backend assíncrono em Python (FastAPI/Celery), submissão de apps nos portais de desenvolvedores da Meta, Google, TikTok e X, e ativação de webhooks para métricas de engajamento automáticas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-800">Fase 3: Expansão de Negócio & Features Inovadoras</span>
                  <span className="text-[10px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">Planeamento</span>
                </div>
                <p className="text-xs text-slate-600">
                  Módulos de monetização para criadores (gorjetas e marcação de consultas diretas via WhatsApp Business), relatórios analíticos avançados com benchmarks do setor e aplicação móvel PWA com modo offline.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-800">Fase 4: Auditoria de Segurança, Testes de Carga & Lançamento</span>
                  <span className="text-[10px] font-semibold bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full">Produção Global</span>
                </div>
                <p className="text-xs text-slate-600">
                  Auditoria externa de penetração (pentest), testes de carga simulando 100k utilizadores em simultâneo com k6/Locust, infraestrutura Kubernetes geodistribuída e lançamento com campanha internacional.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
