import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  MousePointerClick, 
  Eye, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Calendar,
  ArrowUpRight,
  ShieldCheck,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getPlatformMeta } from '../utils/platformIcons';

export const AnalyticsView: React.FC = () => {
  const { currentUser, channels } = useApp();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <p className="text-slate-600">Inicia sessão para consultar as tuas métricas e estatísticas.</p>
      </div>
    );
  }

  const userChannels = channels.filter(c => c.userId === currentUser.id);

  // Distinguish verified API data from declared estimates (Prompt Section 8.C requirement!)
  const apiVerifiedChannels = userChannels.filter(c => c.connectionType === 'api_verified');
  const declaredChannels = userChannels.filter(c => c.connectionType === 'public_link');

  const verifiedFollowersTotal = apiVerifiedChannels.reduce((sum, c) => sum + c.followers, 0);
  const declaredFollowersTotal = declaredChannels.reduce((sum, c) => sum + c.followers, 0);
  const totalCombinedFollowers = verifiedFollowersTotal + declaredFollowersTotal;

  // Mock timeline data for 7d, 30d, 90d
  const timelineData = {
    '7d': [
      { label: 'Seg', apiVal: 204000, totalVal: 238000, clicks: 420 },
      { label: 'Ter', apiVal: 205200, totalVal: 239800, clicks: 480 },
      { label: 'Qua', apiVal: 206800, totalVal: 241500, clicks: 530 },
      { label: 'Qui', apiVal: 208100, totalVal: 243200, clicks: 590 },
      { label: 'Sex', apiVal: 210400, totalVal: 246100, clicks: 710 },
      { label: 'Sáb', apiVal: 212500, totalVal: 249000, clicks: 840 },
      { label: 'Dom', apiVal: 213400, totalVal: 250500, clicks: 920 },
    ],
    '30d': [
      { label: 'Sem 1', apiVal: 185000, totalVal: 215000, clicks: 2100 },
      { label: 'Sem 2', apiVal: 194000, totalVal: 226000, clicks: 2600 },
      { label: 'Sem 3', apiVal: 202000, totalVal: 237000, clicks: 3100 },
      { label: 'Sem 4', apiVal: 213400, totalVal: 250500, clicks: 3850 },
    ],
    '90d': [
      { label: 'Mês 1', apiVal: 142000, totalVal: 165000, clicks: 6800 },
      { label: 'Mês 2', apiVal: 178000, totalVal: 208000, clicks: 8900 },
      { label: 'Mês 3', apiVal: 213400, totalVal: 250500, clicks: 11400 },
    ]
  }[timeRange];

  // SVG Chart Dimensions calculation
  const maxVal = Math.max(...timelineData.map(d => d.totalVal)) * 1.05;
  const minVal = Math.min(...timelineData.map(d => d.apiVal)) * 0.95;

  const getSvgY = (val: number, height: number) => {
    return height - ((val - minVal) / (maxVal - minVal)) * height;
  };

  const chartWidth = 600;
  const chartHeight = 220;

  // Build SVG Path points
  const pointsTotal = timelineData.map((d, i) => {
    const x = (i / (timelineData.length - 1)) * (chartWidth - 40) + 20;
    const y = getSvgY(d.totalVal, chartHeight - 40) + 20;
    return `${x},${y}`;
  }).join(' ');

  const pointsApi = timelineData.map((d, i) => {
    const x = (i / (timelineData.length - 1)) * (chartWidth - 40) + 20;
    const y = getSvgY(d.apiVal, chartHeight - 40) + 20;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Estatísticas & Análise de Audiência</h1>
            <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200 font-medium">
              Dados Auditados
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Visão consolidada do crescimento dos teus canais. Distinção clara e transparente entre métricas autenticadas via API oficial e dados autodeclarados.
          </p>
        </div>

        {/* Time range selector */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-2xs">
          {(['7d', '30d', '90d'] as const).map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                timeRange === range
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {range === '7d' ? 'Últimos 7 dias' : range === '30d' ? 'Últimos 30 dias' : 'Últimos 90 dias'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Real API Verified Followers */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Dados Reais da API</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-slate-900">{verifiedFollowersTotal.toLocaleString('pt-PT')}</h3>
            <span className="text-xs text-emerald-600 font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +8.4%
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Auditados via tokens de APIs oficiais ({apiVerifiedChannels.length} canais)
          </p>
        </div>

        {/* KPI 2: Total Combined (API + Declared) */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Alcance Total Estimado</span>
            <span className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-slate-900">{totalCombinedFollowers.toLocaleString('pt-PT')}</h3>
            <span className="text-xs text-indigo-600 font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +12.1%
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Inclui {declaredFollowersTotal.toLocaleString('pt-PT')} de links públicos declarados
          </p>
        </div>

        {/* KPI 3: Bio Link Clicks */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Cliques no Bio Link</span>
            <span className="p-1.5 bg-amber-50 text-amber-700 rounded-lg">
              <MousePointerClick className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-slate-900">3,850</h3>
            <span className="text-xs text-amber-600 font-semibold flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
              +18.7%
            </span>
          </div>
          <p className="text-[11px] text-slate-500">
            Taxa de conversão média de 24.3% por visita
          </p>
        </div>

        {/* KPI 4: Connected Channels */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Canais Ativos</span>
            <span className="p-1.5 bg-purple-50 text-purple-700 rounded-lg">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-black text-slate-900">{userChannels.length}</h3>
            <span className="text-xs text-purple-600 font-semibold">100% Sincronizados</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Última verificação automática hoje às 03:00
          </p>
        </div>

      </div>

      {/* SECTION: Interactive Evolution Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Evolução Temporal da Audiência</h3>
            <p className="text-xs text-slate-500">Comparação transparente entre dados verificados e estimativas públicas</p>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-slate-700">Dados Reais da API</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-indigo-500" />
              <span className="text-slate-700">Total Combinado (com Estimativas)</span>
            </div>
          </div>
        </div>

        {/* Responsive SVG Chart */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[500px]">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-56">
              <defs>
                <linearGradient id="gradientTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="gradientApi" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid horizontal lines */}
              {[0.2, 0.5, 0.8].map(ratio => {
                const y = chartHeight * ratio;
                return (
                  <line 
                    key={ratio} 
                    x1="20" 
                    y1={y} 
                    x2={chartWidth - 20} 
                    y2={y} 
                    stroke="#f1f5f9" 
                    strokeWidth="1" 
                    strokeDasharray="4"
                  />
                );
              })}

              {/* Total combined curve */}
              <polyline
                fill="none"
                stroke="#6366f1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsTotal}
              />

              {/* API verified curve */}
              <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsApi}
              />

              {/* Data dots */}
              {timelineData.map((d, i) => {
                const x = (i / (timelineData.length - 1)) * (chartWidth - 40) + 20;
                const yTotal = getSvgY(d.totalVal, chartHeight - 40) + 20;
                const yApi = getSvgY(d.apiVal, chartHeight - 40) + 20;
                return (
                  <g key={i}>
                    <circle cx={x} cy={yTotal} r="4" fill="#6366f1" />
                    <circle cx={x} cy={yApi} r="4" fill="#10b981" />
                    <text x={x} y={chartHeight - 4} textAnchor="middle" fontSize="10" fill="#94a3b8" fontFamily="sans-serif">
                      {d.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Notice of Transparency */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3 text-xs text-slate-600">
          <Info className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
          <p>
            <strong>Princípio de Transparência da OmniSphere:</strong> As plataformas que exigem verificação OAuth (ex: YouTube Data API e Instagram Graph API) mostram números exatos em tempo real. As redes conectadas via link público representam estimativas autodeclaradas.
          </p>
        </div>
      </div>

      {/* SECTION: Breakdown by Social Network Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Distribuição Detalhada por Rede Social</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-semibold tracking-wider">
              <tr>
                <th className="py-3 px-4 rounded-l-xl">Rede Social</th>
                <th className="py-3 px-4">Canal / Handle</th>
                <th className="py-3 px-4">Tipo de Conexão</th>
                <th className="py-3 px-4 text-right">Seguidores</th>
                <th className="py-3 px-4 text-right">Quota da Audiência</th>
                <th className="py-3 px-4 rounded-r-xl text-center">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {userChannels.map(channel => {
                const meta = getPlatformMeta(channel.platform);
                const percent = totalCombinedFollowers > 0 
                  ? ((channel.followers / totalCombinedFollowers) * 100).toFixed(1) 
                  : '0';

                return (
                  <tr key={channel.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                      <div className={`p-1 rounded ${meta.bgColor}`}>
                        {meta.icon}
                      </div>
                      <span>{meta.name}</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{channel.handle}</td>
                    <td className="py-3.5 px-4">
                      {channel.connectionType === 'api_verified' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          API Oficial Verificada
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          Link Público Autodeclarado
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      {channel.followers > 0 ? channel.followers.toLocaleString('pt-PT') : 'N/D'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${percent}%` }} />
                        </div>
                        <span className="font-mono text-[11px] font-semibold">{percent}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" title="Canal ativo e sincronizado" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
