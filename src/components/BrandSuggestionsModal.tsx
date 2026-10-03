import React from 'react';
import { Sparkles, X, Globe, Check, Award, Shield, ArrowRight } from 'lucide-react';

interface BrandSuggestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrandSuggestionsModal: React.FC<BrandSuggestionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const brandSuggestions = [
    {
      name: 'OmniSphere',
      tagline: 'O universo digital unificado para criadores e marcas.',
      rationale: 'Combina "Omni" (tudo, ubíquo) e "Sphere" (ecossistema, alcance global). Fácil de pronunciar em inglês, português, espanhol e francês.',
      target: 'Ecossistema global completo & Smart Bio-Link',
      badge: 'Ativo na Plataforma'
    },
    {
      name: 'Nexora',
      tagline: 'Onde todas as tuas redes convergem.',
      rationale: 'Fusão de "Nexus" (ponto de ligação) com "Aura" (identidade e presença pública). Sonoridade futurista, curta e memorável.',
      target: 'Criadores de conteúdo e profissionais modernos',
      badge: 'Alta Memória de Marca'
    },
    {
      name: 'Synapse Global',
      tagline: 'A inteligência coletiva das tuas redes.',
      rationale: 'Metáfora neurológica das sinapses que transmitem impulsos entre diferentes redes com velocidade instantânea.',
      target: 'Tech, programadores, empresas de inovação',
      badge: 'Orientado a Dados'
    },
    {
      name: 'VeriLink',
      tagline: 'Presença digital autenticada e confiável.',
      rationale: 'Foca na segurança, ausência de scraping abusivo e verificação transparente via APIs oficiais e conformidade com RGPD.',
      target: 'Empresas, advogados, consultores e instituições',
      badge: 'Foco em Segurança & RGPD'
    },
    {
      name: 'OneOrbit',
      tagline: 'Todas as tuas redes em torno do teu perfil.',
      rationale: 'Conceito astronómico e elegante: o criador é o centro e os seus canais (YouTube, Instagram, etc.) orbitam de forma harmoniosa.',
      target: 'Artistas, músicos, influencers e marcas pessoais',
      badge: 'Elegante & Internacional'
    },
    {
      name: 'PulseGrid',
      tagline: 'O batimento em tempo real da tua comunidade.',
      rationale: 'Transmite energia, dinamismo e monitorização em tempo real de métricas e interações públicas.',
      target: 'Agências digitais e criadores com múltiplos canais',
      badge: 'Dinâmico'
    },
    {
      name: 'PolyHub',
      tagline: 'Múltiplas redes, um único ponto de contacto.',
      rationale: 'Prefixo "Poly" (múltiplo) aliado a "Hub" (central). Extremamente claro, universal e de fácil assimilação em qualquer país.',
      target: 'Pequenas e médias empresas globais',
      badge: 'Versatilidade'
    },
    {
      name: 'AuraStream',
      tagline: 'A tua identidade digital em fluxo contínuo.',
      rationale: 'Combina prestígio visual e fluidez de conteúdos agregados com feeds oficiais e bio link interativo.',
      target: 'Designers, fotógrafos e profissionais criativos',
      badge: 'Visual & Criativo'
    },
    {
      name: 'KinetiQ',
      tagline: 'Acelera a tua presença e alcance global.',
      rationale: 'Inspirado em cinética (movimento contínuo) e Q (qualidade e inteligência). Nome moderno para startups e tech.',
      target: 'Startups, scaleups e negócios digitais',
      badge: 'Startup & Tech'
    },
    {
      name: 'BeaconX',
      tagline: 'O teu farol de autoridade no oceano digital.',
      rationale: 'O "Beacon" (farol) guia utilizadores e seguidores para os canais oficiais autênticos sem risco de perfis falsos.',
      target: 'Figuras públicas, educadores e marcas premium',
      badge: 'Autoridade & Autenticidade'
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-slate-900 px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">10 Sugestões de Marcas Internacionais</h2>
              <p className="text-xs text-slate-400">Requisito 1: Nomes originais, memoráveis e com posicionamento global</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Cada uma destas opções foi desenhada considerando <strong>facilidade fonética internacional</strong>, <strong>potencial de registo (.global, .io, .com)</strong> e adequação aos valores do projeto: ausência de scraping abusivo, APIs oficiais, segurança e elegância de design.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {brandSuggestions.map((brand, index) => (
              <div 
                key={brand.name}
                className={`p-4 rounded-2xl border transition text-left flex flex-col justify-between space-y-2 ${
                  index === 0 ? 'border-indigo-500 bg-indigo-50/20 ring-1 ring-indigo-200' : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">0{index + 1}</span>
                      {brand.name}
                    </span>
                    <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded-full">
                      {brand.badge}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-700 mt-1 italic">
                    "{brand.tagline}"
                  </p>

                  <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                    {brand.rationale}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                  Público-alvo ideal: <strong className="text-slate-700">{brand.target}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">OmniSphere é a marca principal ativa na demonstração.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
