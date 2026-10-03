import React from 'react';
import { 
  Youtube, 
  Instagram, 
  Linkedin, 
  Twitter, 
  Facebook, 
  MessageCircle, 
  Send, 
  Github, 
  Twitch, 
  Share2, 
  Globe, 
  Video 
} from 'lucide-react';
import { SocialPlatform } from '../types';

export interface PlatformMeta {
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  urlPlaceholder: string;
  handlePrefix: string;
  officialApiSupported: boolean;
  docUrl: string;
}

export const getPlatformMeta = (platform: SocialPlatform): PlatformMeta => {
  switch (platform) {
    case 'youtube':
      return {
        name: 'YouTube',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: <Youtube className="w-5 h-5 text-red-600" />,
        urlPlaceholder: 'https://youtube.com/@seucanal',
        handlePrefix: '@',
        officialApiSupported: true,
        docUrl: 'https://developers.google.com/youtube/v3'
      };
    case 'instagram':
      return {
        name: 'Instagram',
        color: 'text-pink-600',
        bgColor: 'bg-pink-50',
        borderColor: 'border-pink-200',
        icon: <Instagram className="w-5 h-5 text-pink-600" />,
        urlPlaceholder: 'https://instagram.com/seu.perfil',
        handlePrefix: '@',
        officialApiSupported: true,
        docUrl: 'https://developers.facebook.com/docs/instagram-platform'
      };
    case 'tiktok':
      return {
        name: 'TikTok',
        color: 'text-slate-900',
        bgColor: 'bg-slate-100',
        borderColor: 'border-slate-300',
        icon: <Video className="w-5 h-5 text-slate-900" />,
        urlPlaceholder: 'https://tiktok.com/@seuutilizador',
        handlePrefix: '@',
        officialApiSupported: true,
        docUrl: 'https://developers.tiktok.com/'
      };
    case 'twitter':
      return {
        name: 'X (Twitter)',
        color: 'text-slate-900',
        bgColor: 'bg-slate-100',
        borderColor: 'border-slate-200',
        icon: <Twitter className="w-5 h-5 text-slate-900" />,
        urlPlaceholder: 'https://x.com/seuhandle',
        handlePrefix: '@',
        officialApiSupported: true,
        docUrl: 'https://developer.x.com/en/docs'
      };
    case 'linkedin':
      return {
        name: 'LinkedIn',
        color: 'text-blue-700',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: <Linkedin className="w-5 h-5 text-blue-700" />,
        urlPlaceholder: 'https://linkedin.com/in/seu-nome',
        handlePrefix: 'in/',
        officialApiSupported: true,
        docUrl: 'https://learn.microsoft.com/en-us/linkedin/'
      };
    case 'facebook':
      return {
        name: 'Facebook',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        icon: <Facebook className="w-5 h-5 text-blue-600" />,
        urlPlaceholder: 'https://facebook.com/suapagina',
        handlePrefix: '',
        officialApiSupported: true,
        docUrl: 'https://developers.facebook.com/'
      };
    case 'whatsapp':
      return {
        name: 'WhatsApp',
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        icon: <MessageCircle className="w-5 h-5 text-emerald-600" />,
        urlPlaceholder: 'https://wa.me/351912345678',
        handlePrefix: '+',
        officialApiSupported: true,
        docUrl: 'https://developers.facebook.com/docs/whatsapp/cloud-api'
      };
    case 'telegram':
      return {
        name: 'Telegram',
        color: 'text-sky-500',
        bgColor: 'bg-sky-50',
        borderColor: 'border-sky-200',
        icon: <Send className="w-5 h-5 text-sky-500" />,
        urlPlaceholder: 'https://t.me/seucanal',
        handlePrefix: 't.me/',
        officialApiSupported: true,
        docUrl: 'https://core.telegram.org/api'
      };
    case 'github':
      return {
        name: 'GitHub',
        color: 'text-slate-800',
        bgColor: 'bg-slate-100',
        borderColor: 'border-slate-300',
        icon: <Github className="w-5 h-5 text-slate-800" />,
        urlPlaceholder: 'https://github.com/seurepositorio',
        handlePrefix: '',
        officialApiSupported: true,
        docUrl: 'https://docs.github.com/en/rest'
      };
    case 'twitch':
      return {
        name: 'Twitch',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
        borderColor: 'border-purple-200',
        icon: <Twitch className="w-5 h-5 text-purple-600" />,
        urlPlaceholder: 'https://twitch.tv/seucanal',
        handlePrefix: '',
        officialApiSupported: true,
        docUrl: 'https://dev.twitch.tv/'
      };
    case 'discord':
      return {
        name: 'Discord',
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-50',
        borderColor: 'border-indigo-200',
        icon: <Share2 className="w-5 h-5 text-indigo-600" />,
        urlPlaceholder: 'https://discord.gg/seuservidor',
        handlePrefix: '',
        officialApiSupported: true,
        docUrl: 'https://discord.com/developers/docs'
      };
    default:
      return {
        name: 'Website / Link',
        color: 'text-slate-600',
        bgColor: 'bg-slate-50',
        borderColor: 'border-slate-200',
        icon: <Globe className="w-5 h-5 text-slate-600" />,
        urlPlaceholder: 'https://oseusite.com',
        handlePrefix: '',
        officialApiSupported: false,
        docUrl: ''
      };
  }
};
