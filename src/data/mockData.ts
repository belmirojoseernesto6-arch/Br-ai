import { 
  UserProfile, 
  SocialChannel, 
  FeedPost, 
  BrandSuggestion, 
  PlatformApiStatus, 
  SecurityAuditLog, 
  ReportItem, 
  BioLinkTheme, 
  NotificationItem 
} from '../types';

export const BRAND_SUGGESTIONS: BrandSuggestion[] = [
  {
    name: 'OmniSphere',
    tagline: 'The Global Nexus of Digital Presence',
    originRationale: 'Combines "Omni" (universal, all-encompassing) with "Sphere" (global ecosystem). Expresses unity of diverse channels.',
    internationalSuitability: 'Intuitive across romance and Germanic languages; conveys scale, completeness, and modern authority.',
    domainConcept: 'omnisphere.global / omnisphere.io'
  },
  {
    name: 'PulseHub',
    tagline: 'Your Social Pulse, Synchronized',
    originRationale: '"Pulse" indicates live, real-time social activity and dynamic feeds; "Hub" symbolizes the central junction.',
    internationalSuitability: 'Short, memorable, punchy; high recall among digital creators and mobile generations.',
    domainConcept: 'pulsehub.me / pulsehub.app'
  },
  {
    name: 'LinkOrbit',
    tagline: 'Unify Your Digital Universe',
    originRationale: 'Metaphor of planets orbiting a central sun; all disparate social identities gravitate around one personal profile.',
    internationalSuitability: 'Universal astronomical metaphor; elegant in Portuguese, English, French, and Spanish.',
    domainConcept: 'linkorbit.net / linkorbit.co'
  },
  {
    name: 'SynapseMedia',
    tagline: 'Connecting Every Social Pathway',
    originRationale: 'Derived from biological synapses that transmit electrical signals between neural networks.',
    internationalSuitability: 'Premium, technological, deeply suited for professional and tech-forward audiences.',
    domainConcept: 'synapse.network / synapsemedia.io'
  },
  {
    name: 'OneSocial',
    tagline: 'All Networks. One Verified Identity.',
    originRationale: 'Absolute clarity and simplicity. Highlights the consolidation of scattered profiles into a single truth.',
    internationalSuitability: 'Zero translation friction worldwide; immediately explains the platform purpose.',
    domainConcept: 'onesocial.world / onesocial.app'
  },
  {
    name: 'AuraLink',
    tagline: 'Your Authenticated Digital Aura',
    originRationale: '"Aura" represents personal energy, visual presence, and charisma, while "Link" denotes connectivity.',
    internationalSuitability: 'Aesthetic, modern, highly appealing for visual creators, influencers, and lifestyle brands.',
    domainConcept: 'auralink.bio / auralink.me'
  },
  {
    name: 'Zentra',
    tagline: 'Centered Social Intelligence',
    originRationale: 'Blend of "Center" (Zentral) and "Zen" (calm, uncluttered consolidation of digital noise).',
    internationalSuitability: 'Two syllables, crisp phonetics, easy to pronounce in Asia, Europe, and Americas.',
    domainConcept: 'zentra.io / zentra.social'
  },
  {
    name: 'KnotMedia',
    tagline: 'Tying Your Networks Together',
    originRationale: 'Represents intertwining different threads (videos, chats, tweets, professional links) into one strong knot.',
    internationalSuitability: 'Minimalist Scandinavian feel; friendly, trustworthy, and modern.',
    domainConcept: 'knot.bio / knotmedia.org'
  },
  {
    name: 'VibeMesh',
    tagline: 'The Interactive Web of Global Creators',
    originRationale: '"Mesh" denotes decentralized, interconnected nodes; "Vibe" conveys community culture and engagement.',
    internationalSuitability: 'Strong affinity with Gen Z and creator economy professionals globally.',
    domainConcept: 'vibemesh.com / vibemesh.app'
  },
  {
    name: 'NexusGlobal',
    tagline: 'The International Crossroads of Influence',
    originRationale: 'Latin "Nexus" means a bond, connection or central link. Emphasizes enterprise and international reach.',
    internationalSuitability: 'Formal, prestigious, highly suited for B2B partnerships and global enterprises.',
    domainConcept: 'nexusglobal.link / nexus.network'
  }
];

export const BIO_LINK_THEMES: BioLinkTheme[] = [
  {
    id: 'clean_light',
    name: 'Minimalist Frost',
    backgroundClass: 'bg-slate-50',
    cardClass: 'bg-white/90 border border-slate-200/80 shadow-sm text-slate-800 hover:border-indigo-400',
    textClass: 'text-slate-900',
    accentColor: '#4f46e5',
    buttonShape: 'rounded'
  },
  {
    id: 'midnight_luxury',
    name: 'Midnight Obsidian',
    backgroundClass: 'bg-slate-950',
    cardClass: 'bg-slate-900/90 border border-slate-800 shadow-md text-slate-100 hover:border-slate-600',
    textClass: 'text-slate-50',
    accentColor: '#38bdf8',
    buttonShape: 'rounded'
  },
  {
    id: 'sunset_aura',
    name: 'Sunset Terracotta',
    backgroundClass: 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50',
    cardClass: 'bg-white/85 border border-orange-200/70 shadow-sm text-slate-800 hover:border-orange-400',
    textClass: 'text-stone-900',
    accentColor: '#ea580c',
    buttonShape: 'pill'
  },
  {
    id: 'emerald_prestige',
    name: 'Emerald Forest',
    backgroundClass: 'bg-emerald-950',
    cardClass: 'bg-emerald-900/60 border border-emerald-800/80 shadow-md text-emerald-50 hover:border-emerald-500',
    textClass: 'text-emerald-50',
    accentColor: '#10b981',
    buttonShape: 'pill'
  },
  {
    id: 'cyber_indigo',
    name: 'Cyber Indigo',
    backgroundClass: 'bg-gradient-to-b from-indigo-950 via-slate-950 to-slate-900',
    cardClass: 'bg-indigo-900/40 border border-indigo-700/60 shadow-lg text-indigo-100 hover:border-indigo-400',
    textClass: 'text-white',
    accentColor: '#6366f1',
    buttonShape: 'square'
  }
];

export const INITIAL_USERS: UserProfile[] = [
  {
    id: 'usr_sofia',
    name: 'Sofia Ramos',
    username: 'sofiaramos',
    email: 'sofia.ramos@example.pt',
    country: 'Portugal',
    bio: 'Criadora de conteúdo audiovisual, fotógrafa de viagens e apaixonada por culturas globais. Partilho guias práticos, reels e vlogs semanais.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
    category: 'creator',
    profession: 'Fotógrafa & Travel Vlogger',
    role: 'creator',
    isPrivate: false,
    showJoinDate: true,
    showSocials: true,
    followersCount: 28450,
    followingCount: 312,
    createdAt: '2024-03-15',
    isVerified: true,
    twoFactorEnabled: true,
    website: 'https://sofiaramos.travel',
    contactEmail: 'contact@sofiaramos.travel',
    whatsappNumber: '+351912345678',
    customTheme: BIO_LINK_THEMES[2],
    services: [
      {
        id: 'srv_1',
        userId: 'usr_sofia',
        title: 'Workshops de Fotografia & Edição Mobile',
        description: 'Sessão intensiva de 2h via Zoom cobrindo iluminação natural, color grading no Lightroom e enquadramentos cinematográficos.',
        price: '€65',
        deliveryTime: 'Agendamento imediato',
        tags: ['Fotografia', 'Lightroom', 'Mobile']
      },
      {
        id: 'srv_2',
        userId: 'usr_sofia',
        title: 'Consultoria de Storytelling para Criadores',
        description: 'Análise personalizada do teu canal e feed, com plano tático de conteúdo para 30 dias.',
        price: '€120',
        deliveryTime: '3 dias úteis',
        tags: ['Estratégia', 'Instagram', 'YouTube']
      }
    ],
    portfolio: [
      {
        id: 'port_1',
        userId: 'usr_sofia',
        title: 'Expedição Açores & Madeira',
        category: 'Travel Doc',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80',
        linkUrl: 'https://youtube.com',
        description: 'Série documental em 4 episódios com mais de 120k visualizações.'
      },
      {
        id: 'port_2',
        userId: 'usr_sofia',
        title: 'Guia Visual de Lisboa Histórica',
        category: 'Fotografia',
        imageUrl: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?w=600&auto=format&fit=crop&q=80',
        linkUrl: 'https://instagram.com',
        description: 'Ensaio fotográfico capturando o amanhecer em Alfama e Bairro Alto.'
      }
    ]
  },
  {
    id: 'usr_marcus',
    name: 'Dr. Marcus Chen',
    username: 'marcuschen',
    email: 'marcus.chen@techconsult.sg',
    country: 'Singapore',
    bio: 'Consultor de Inteligência Artificial, docente universitário e autor. Auxilio empresas e startups na transição para arquiteturas de LLM e automação responsável.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    category: 'consultant',
    profession: 'Docente & Especialista em IA',
    role: 'business',
    isPrivate: false,
    showJoinDate: true,
    showSocials: true,
    followersCount: 41200,
    followingCount: 189,
    createdAt: '2023-11-10',
    isVerified: true,
    twoFactorEnabled: true,
    website: 'https://marcuschen.ai',
    contactEmail: 'advisory@marcuschen.ai',
    customTheme: BIO_LINK_THEMES[0],
    services: [
      {
        id: 'srv_3',
        userId: 'usr_marcus',
        title: 'Auditoria de Viabilidade de IA para Empresas',
        description: 'Relatório executivo avaliando dados internos, infraestrutura e modelos recomendados (Open Source vs Cloud).',
        price: '$1,500',
        deliveryTime: '7 dias úteis',
        tags: ['IA', 'Auditoria', 'Enterprise']
      }
    ]
  },
  {
    id: 'usr_elena',
    name: 'Elena Rostova',
    username: 'elenadev',
    email: 'elena.rostova@berlinopen.de',
    country: 'Germany',
    bio: 'Engenheira de Software Senior focada em Rust, TypeScript e sistemas distribuídos. Criadora de bibliotecas open-source e entusiasta de privacidade.',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    category: 'developer',
    profession: 'Senior Distributed Systems Architect',
    role: 'creator',
    isPrivate: false,
    showJoinDate: true,
    showSocials: true,
    followersCount: 16800,
    followingCount: 420,
    createdAt: '2024-01-20',
    isVerified: true,
    twoFactorEnabled: false,
    website: 'https://github.com/elenadev',
    contactEmail: 'elena@berlindev.io',
    customTheme: BIO_LINK_THEMES[1]
  },
  {
    id: 'usr_carlos',
    name: 'Carlos Silva',
    username: 'carlos_art',
    email: 'carlos@estudiobr.com.br',
    country: 'Brasil',
    bio: 'Artista 3D, ilustrador e designer de personagens para animação e jogos independentes. Aulas ao vivo e tutoriais no YouTube e Twitch.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80',
    category: 'artist',
    profession: 'Artista 3D & Ilustrador',
    role: 'creator',
    isPrivate: false,
    showJoinDate: true,
    showSocials: true,
    followersCount: 19400,
    followingCount: 512,
    createdAt: '2024-05-02',
    isVerified: false,
    twoFactorEnabled: true,
    customTheme: BIO_LINK_THEMES[4]
  },
  {
    id: 'usr_admin',
    name: 'OmniSphere Security & Admin',
    username: 'admin',
    email: 'security-lead@omnisphere.global',
    country: 'Switzerland',
    bio: 'Equipa de infraestrutura, conformidade RGPD e moderação global da OmniSphere. Garantimos integridade, proteção de dados e transparência.',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80',
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    category: 'business',
    profession: 'Platform Security Officer',
    role: 'admin',
    isPrivate: false,
    showJoinDate: true,
    showSocials: true,
    followersCount: 95000,
    followingCount: 12,
    createdAt: '2023-01-01',
    isVerified: true,
    twoFactorEnabled: true,
    customTheme: BIO_LINK_THEMES[1]
  }
];

export const INITIAL_CHANNELS: SocialChannel[] = [
  // Sofia's channels
  {
    id: 'chn_sofia_yt',
    userId: 'usr_sofia',
    platform: 'youtube',
    handle: '@SofiaRamosTravel',
    url: 'https://youtube.com/@SofiaRamosTravel',
    connectionType: 'api_verified',
    followers: 124000,
    lastSync: '2026-09-20 02:45',
    isVisible: true,
    customLabel: 'Canal Oficial no YouTube',
    status: 'active'
  },
  {
    id: 'chn_sofia_ig',
    userId: 'usr_sofia',
    platform: 'instagram',
    handle: '@sofia.in.transit',
    url: 'https://instagram.com/sofia.in.transit',
    connectionType: 'api_verified',
    followers: 89400,
    lastSync: '2026-09-20 01:12',
    isVisible: true,
    customLabel: 'Instagram Fotos & Stories',
    status: 'active'
  },
  {
    id: 'chn_sofia_tt',
    userId: 'usr_sofia',
    platform: 'tiktok',
    handle: '@sofiaramostravel',
    url: 'https://tiktok.com/@sofiaramostravel',
    connectionType: 'public_link',
    followers: 145000,
    lastSync: '2026-09-19 18:20',
    isVisible: true,
    customLabel: 'Shorts & Dicas Rápidas',
    status: 'active'
  },
  {
    id: 'chn_sofia_x',
    userId: 'usr_sofia',
    platform: 'twitter',
    handle: '@sofiaramos_eu',
    url: 'https://x.com/sofiaramos_eu',
    connectionType: 'public_link',
    followers: 14200,
    lastSync: '2026-09-18 10:00',
    isVisible: true,
    customLabel: 'Pensamentos & Diários de Bordo',
    status: 'active'
  },
  {
    id: 'chn_sofia_wa',
    userId: 'usr_sofia',
    platform: 'whatsapp',
    handle: '+351 912 345 678',
    url: 'https://wa.me/351912345678',
    connectionType: 'public_link',
    followers: 0,
    lastSync: '2026-09-20 03:00',
    isVisible: true,
    customLabel: 'Canal VIP de Avisos & Parcerias',
    status: 'active'
  },

  // Marcus's channels
  {
    id: 'chn_marcus_li',
    userId: 'usr_marcus',
    platform: 'linkedin',
    handle: 'dr-marcus-chen-ai',
    url: 'https://linkedin.com/in/dr-marcus-chen-ai',
    connectionType: 'api_verified',
    followers: 78500,
    lastSync: '2026-09-19 23:40',
    isVisible: true,
    customLabel: 'Artigos & Insights no LinkedIn',
    status: 'active'
  },
  {
    id: 'chn_marcus_yt',
    userId: 'usr_marcus',
    platform: 'youtube',
    handle: '@MarcusChenAI',
    url: 'https://youtube.com/@MarcusChenAI',
    connectionType: 'api_verified',
    followers: 45200,
    lastSync: '2026-09-20 00:15',
    isVisible: true,
    customLabel: 'Palestras & Aulas Magistrais',
    status: 'active'
  },
  {
    id: 'chn_marcus_x',
    userId: 'usr_marcus',
    platform: 'twitter',
    handle: '@marcuschen_ai',
    url: 'https://x.com/marcuschen_ai',
    connectionType: 'api_verified',
    followers: 62100,
    lastSync: '2026-09-20 02:30',
    isVisible: true,
    customLabel: 'Fios Técnicos de Pesquisa',
    status: 'active'
  },

  // Elena's channels
  {
    id: 'chn_elena_gh',
    userId: 'usr_elena',
    platform: 'github',
    handle: 'elenadev',
    url: 'https://github.com/elenadev',
    connectionType: 'api_verified',
    followers: 14200,
    lastSync: '2026-09-19 21:00',
    isVisible: true,
    customLabel: 'Repositórios & Crates Open Source',
    status: 'active'
  },
  {
    id: 'chn_elena_tg',
    userId: 'usr_elena',
    platform: 'telegram',
    handle: 't.me/elenadev_rust',
    url: 'https://t.me/elenadev_rust',
    connectionType: 'public_link',
    followers: 5300,
    lastSync: '2026-09-19 14:00',
    isVisible: true,
    customLabel: 'Comunidade Rust Berlin',
    status: 'active'
  },

  // Carlos's channels
  {
    id: 'chn_carlos_ig',
    userId: 'usr_carlos',
    platform: 'instagram',
    handle: '@carlos_3dart',
    url: 'https://instagram.com/carlos_3dart',
    connectionType: 'public_link',
    followers: 32000,
    lastSync: '2026-09-20 01:40',
    isVisible: true,
    customLabel: 'Portfolio 3D & Renders',
    status: 'active'
  }
];

export const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: 'post_yt_1',
    channelId: 'chn_sofia_yt',
    platform: 'youtube',
    authorName: 'Sofia Ramos',
    authorHandle: '@SofiaRamosTravel',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    content: 'NOVO VLOG! Os 7 segredos mais bem guardados da Costa Vicentina. Como explorar praias desertas sem aglomerações com drone e respeito à natureza.',
    mediaUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    mediaType: 'video',
    originalUrl: 'https://youtube.com/watch?v=sample1',
    publishedAt: 'Há 3 horas',
    likesCount: 2840,
    commentsCount: 342,
    sharesCount: 154,
    viewsCount: 42100,
    isVerifiedApi: true,
    tags: ['Portugal', 'Viagens', 'Vlog']
  },
  {
    id: 'post_li_1',
    channelId: 'chn_marcus_li',
    platform: 'linkedin',
    authorName: 'Dr. Marcus Chen',
    authorHandle: 'dr-marcus-chen-ai',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    content: 'A evolução dos sistemas multi-agente em 2026: Por que a arquitetura híbrida de orquestração assíncrona reduz em até 40% a latência de respostas críticas nas empresas de tecnologia. Segue análise completa do benchmark que conduzimos.',
    mediaType: 'article',
    originalUrl: 'https://linkedin.com/pulse/sample1',
    publishedAt: 'Há 6 horas',
    likesCount: 1420,
    commentsCount: 118,
    sharesCount: 205,
    isVerifiedApi: true,
    tags: ['AI', 'TechLeadership', 'Engineering']
  },
  {
    id: 'post_ig_1',
    channelId: 'chn_sofia_ig',
    platform: 'instagram',
    authorName: 'Sofia Ramos',
    authorHandle: '@sofia.in.transit',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    content: 'A luz mágica das 06:45 no cume da ilha. Um momento de silêncio antes de ligar as câmaras e continuar a jornada. Qual é o vosso destino de sonho este ano?',
    mediaUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80',
    mediaType: 'image',
    originalUrl: 'https://instagram.com/p/sample1',
    publishedAt: 'Há 12 horas',
    likesCount: 5820,
    commentsCount: 240,
    sharesCount: 92,
    isVerifiedApi: true,
    tags: ['Açores', 'Wanderlust', 'GoldenHour']
  },
  {
    id: 'post_gh_1',
    channelId: 'chn_elena_gh',
    platform: 'github',
    authorName: 'Elena Rostova',
    authorHandle: 'elenadev',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    content: 'Release v2.4.0 de "turbo-raft": Algoritmo de consenso distribuído escrito em Rust com zero allocations no hot-path. Agora suporta snapshot streaming seguro sobre TLS 1.3.',
    mediaType: 'text',
    originalUrl: 'https://github.com/elenadev/turbo-raft/releases',
    publishedAt: 'Ontem',
    likesCount: 890,
    commentsCount: 45,
    sharesCount: 120,
    isVerifiedApi: true,
    tags: ['Rust', 'DistributedSystems', 'OpenSource']
  },
  {
    id: 'post_x_1',
    channelId: 'chn_marcus_x',
    platform: 'twitter',
    authorName: 'Dr. Marcus Chen',
    authorHandle: '@marcuschen_ai',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    content: 'Uma regra essencial para programadores a construir ferramentas de agregação social: nunca façam scraping abusivo nem guardem chaves de sessão em texto simples. Utilizem sempre scopes oficiais mínimos e autenticação granular.',
    mediaType: 'text',
    originalUrl: 'https://x.com/marcuschen_ai/status/1',
    publishedAt: 'Ontem',
    likesCount: 3120,
    commentsCount: 98,
    sharesCount: 460,
    isVerifiedApi: true,
    tags: ['Privacy', 'CyberSecurity', 'OAuth']
  },
  {
    id: 'post_tt_1',
    channelId: 'chn_sofia_tt',
    platform: 'tiktok',
    authorName: 'Sofia Ramos',
    authorHandle: '@sofiaramostravel',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    content: '3 apps essenciais que poupam centenas de euros quando estás a viajar pela Europa sem guia turístico! 🎒✈️',
    mediaUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80',
    mediaType: 'video',
    originalUrl: 'https://tiktok.com/@sofiaramostravel/video/sample',
    publishedAt: 'Há 2 dias',
    likesCount: 18400,
    commentsCount: 520,
    sharesCount: 1980,
    viewsCount: 182000,
    isVerifiedApi: false,
    tags: ['DicasDeViagem', 'Europa', 'Hack']
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'usr_sofia',
    title: 'Novo seguidor na OmniSphere',
    message: 'Carlos Silva começou a seguir o teu perfil e canais.',
    type: 'follow',
    timestamp: 'Há 20 min',
    read: false,
    link: '/@carlos_art'
  },
  {
    id: 'notif_2',
    userId: 'usr_sofia',
    title: 'Sincronização de API concluída',
    message: 'Canal oficial YouTube sincronizado com sucesso (+340 novos subscritores detetados).',
    type: 'sync',
    timestamp: 'Há 1 hora',
    read: false
  },
  {
    id: 'notif_3',
    userId: 'usr_sofia',
    title: 'Alerta de Segurança',
    message: 'Novo início de sessão registado a partir de Lisboa, Portugal (Firefox / macOS). 2FA validado com sucesso.',
    type: 'security',
    timestamp: 'Há 2 horas',
    read: true
  },
  {
    id: 'notif_4',
    userId: 'usr_sofia',
    title: 'Comunicado OmniSphere v2.0',
    message: 'Novo gerador de QR Codes inteligentes de perfil e temas personalizados para Bio Link disponíveis.',
    type: 'system',
    timestamp: 'Ontem',
    read: true
  }
];

export const PLATFORM_API_STATUSES: PlatformApiStatus[] = [
  {
    id: 'api_yt',
    platform: 'youtube',
    apiName: 'YouTube Data API v3',
    version: '3.0',
    status: 'operational',
    rateLimitUsagePercent: 24,
    lastChecked: '2026-09-20 03:00',
    officialDocUrl: 'https://developers.google.com/youtube/v3',
    supportedScopes: ['https://www.googleapis.com/auth/youtube.readonly']
  },
  {
    id: 'api_meta_ig',
    platform: 'instagram',
    apiName: 'Instagram Graph API / Meta Graph',
    version: 'v21.0',
    status: 'operational',
    rateLimitUsagePercent: 41,
    lastChecked: '2026-09-20 03:05',
    officialDocUrl: 'https://developers.facebook.com/docs/instagram-platform',
    supportedScopes: ['instagram_basic', 'pages_show_list', 'instagram_manage_insights']
  },
  {
    id: 'api_x',
    platform: 'twitter',
    apiName: 'X (Twitter) API v2',
    version: '2.0',
    status: 'operational',
    rateLimitUsagePercent: 68,
    lastChecked: '2026-09-20 02:50',
    officialDocUrl: 'https://developer.x.com/en/docs/x-api',
    supportedScopes: ['users.read', 'tweet.read']
  },
  {
    id: 'api_li',
    platform: 'linkedin',
    apiName: 'LinkedIn Community Management API',
    version: '202410',
    status: 'operational',
    rateLimitUsagePercent: 18,
    lastChecked: '2026-09-20 02:40',
    officialDocUrl: 'https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/share-on-linkedin',
    supportedScopes: ['r_liteprofile', 'r_emailaddress']
  },
  {
    id: 'api_wa',
    platform: 'whatsapp',
    apiName: 'WhatsApp Business Cloud API',
    version: 'v21.0',
    status: 'operational',
    rateLimitUsagePercent: 12,
    lastChecked: '2026-09-20 03:08',
    officialDocUrl: 'https://developers.facebook.com/docs/whatsapp/cloud-api',
    supportedScopes: ['whatsapp_business_messaging']
  }
];

export const INITIAL_REPORTS: ReportItem[] = [
  {
    id: 'rep_101',
    reporterId: 'usr_sofia',
    reporterName: 'Sofia Ramos',
    targetType: 'profile',
    targetId: 'usr_fake_promo',
    targetName: '@crypto_bot_daily',
    reason: 'spam',
    details: 'Perfil criado recentemente a enviar links de esquemas piramidais repetitivos nos canais de contacto.',
    status: 'pending',
    createdAt: '2026-09-19 19:40'
  },
  {
    id: 'rep_102',
    reporterId: 'usr_marcus',
    reporterName: 'Dr. Marcus Chen',
    targetType: 'channel',
    targetId: 'chn_imposter_yt',
    targetName: 'Canal Clone IA Singapore',
    reason: 'impersonation',
    details: 'Cópia desautorizada dos meus vídeos com alteração de voz por IA promovendo produtos sem certificação.',
    status: 'pending',
    createdAt: '2026-09-19 14:15'
  }
];

export const INITIAL_AUDIT_LOGS: SecurityAuditLog[] = [
  {
    id: 'log_01',
    timestamp: '2026-09-20 03:10:42',
    eventType: 'login_success',
    userEmail: 'sofia.ramos@example.pt',
    ipAddress: '194.65.12.88',
    country: 'Portugal',
    details: 'Login bem-sucedido com validação 2FA via Authenticator TOTP.',
    severity: 'low'
  },
  {
    id: 'log_02',
    timestamp: '2026-09-20 02:45:11',
    eventType: 'login_failed',
    userEmail: 'admin@omnisphere.global',
    ipAddress: '85.214.132.19',
    country: 'Germany',
    details: 'Tentativa de login com senha incorreta. Bloqueio preventivo ativado após 3 tentativas (Rate limiter ativo).',
    severity: 'medium'
  },
  {
    id: 'log_03',
    timestamp: '2026-09-20 01:22:04',
    eventType: 'role_changed',
    userEmail: 'marcus.chen@techconsult.sg',
    ipAddress: '118.200.18.9',
    country: 'Singapore',
    details: 'Estatuto de conta atualizado para Consultor/Empresa Verificada.',
    severity: 'low'
  },
  {
    id: 'log_04',
    timestamp: '2026-09-19 22:15:30',
    eventType: 'account_suspended',
    userEmail: 'spammer_bot@darkmail.net',
    ipAddress: '45.142.122.5',
    country: 'Unknown VPN',
    details: 'Conta suspensa por violação grave dos Termos de Serviço (Anti-Spam Filter).',
    severity: 'high'
  }
];
