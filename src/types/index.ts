export type UserRole = 'user' | 'creator' | 'business' | 'moderator' | 'admin';

export type UserCategory = 
  | 'creator'
  | 'teacher'
  | 'business'
  | 'freelancer'
  | 'developer'
  | 'student'
  | 'consultant'
  | 'artist';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  country: string;
  bio: string;
  avatarUrl: string;
  coverUrl: string;
  category: UserCategory;
  profession: string;
  role: UserRole;
  isPrivate: boolean;
  showJoinDate: boolean;
  showSocials: boolean;
  followersCount: number;
  followingCount: number;
  createdAt: string;
  isVerified: boolean;
  twoFactorEnabled: boolean;
  website?: string;
  contactEmail?: string;
  whatsappNumber?: string;
  customTheme: BioLinkTheme;
  services?: ProfessionalService[];
  portfolio?: PortfolioItem[];
  isSuspended?: boolean;
}

export type SocialPlatform = 
  | 'youtube'
  | 'instagram'
  | 'tiktok'
  | 'twitter'
  | 'linkedin'
  | 'facebook'
  | 'whatsapp'
  | 'telegram'
  | 'github'
  | 'twitch'
  | 'discord';

export type ConnectionType = 'public_link' | 'api_verified';

export interface SocialChannel {
  id: string;
  userId: string;
  platform: SocialPlatform;
  handle: string;
  url: string;
  connectionType: ConnectionType;
  followers: number;
  lastSync: string;
  isVisible: boolean;
  customLabel?: string;
  status: 'active' | 'sync_error' | 'pending';
}

export interface FeedPost {
  id: string;
  channelId: string;
  platform: SocialPlatform;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  content: string;
  mediaUrl?: string;
  mediaType: 'image' | 'video' | 'text' | 'article';
  originalUrl: string;
  publishedAt: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount?: number;
  isVerifiedApi: boolean;
  tags?: string[];
}

export interface ProfessionalService {
  id: string;
  userId: string;
  title: string;
  description: string;
  price: string;
  deliveryTime: string;
  tags: string[];
}

export interface PortfolioItem {
  id: string;
  userId: string;
  title: string;
  category: string;
  imageUrl: string;
  linkUrl: string;
  description: string;
}

export interface BioLinkTheme {
  id: string;
  name: string;
  backgroundClass: string;
  cardClass: string;
  textClass: string;
  accentColor: string;
  buttonShape: 'rounded' | 'pill' | 'square';
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'follow' | 'sync' | 'security' | 'system' | 'report';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface ReportItem {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: 'profile' | 'post' | 'channel';
  targetId: string;
  targetName: string;
  reason: 'spam' | 'inappropriate' | 'impersonation' | 'harassment' | 'copyright';
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  eventType: 'login_success' | 'login_failed' | '2fa_verified' | 'role_changed' | 'account_suspended' | 'api_sync';
  userEmail: string;
  ipAddress: string;
  country: string;
  details: string;
  severity: 'low' | 'medium' | 'high';
}

export interface PlatformApiStatus {
  id: string;
  platform: SocialPlatform;
  apiName: string;
  version: string;
  status: 'operational' | 'degraded' | 'rate_limited';
  rateLimitUsagePercent: number;
  lastChecked: string;
  officialDocUrl: string;
  supportedScopes: string[];
}

export interface BrandSuggestion {
  name: string;
  tagline: string;
  originRationale: string;
  internationalSuitability: string;
  domainConcept: string;
}
