import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  SocialChannel, 
  FeedPost, 
  NotificationItem, 
  ReportItem, 
  SecurityAuditLog, 
  PlatformApiStatus,
  BioLinkTheme,
  UserCategory,
  UserRole
} from '../types';
import { 
  INITIAL_USERS, 
  INITIAL_CHANNELS, 
  INITIAL_FEED_POSTS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_REPORTS, 
  INITIAL_AUDIT_LOGS, 
  PLATFORM_API_STATUSES,
  BIO_LINK_THEMES 
} from '../data/mockData';

export type AppView = 
  | 'dashboard' 
  | 'aggregator' 
  | 'directory' 
  | 'bio_link' 
  | 'analytics' 
  | 'admin' 
  | 'architecture';

interface AppContextType {
  currentUser: UserProfile | null;
  users: UserProfile[];
  channels: SocialChannel[];
  feedPosts: FeedPost[];
  notifications: NotificationItem[];
  reports: ReportItem[];
  auditLogs: SecurityAuditLog[];
  apiStatuses: PlatformApiStatus[];
  followingIds: string[];
  favoriteIds: string[];
  currentView: AppView;
  selectedPublicProfile: UserProfile | null;
  authModalOpen: boolean;
  twoFactorModalOpen: boolean;
  loginAttempts: number;
  isLockedOut: boolean;
  activeBioTheme: BioLinkTheme;
  setCurrentView: (view: AppView) => void;
  setSelectedPublicProfile: (user: UserProfile | null) => void;
  setAuthModalOpen: (open: boolean) => void;
  setTwoFactorModalOpen: (open: boolean) => void;
  switchPersona: (userId: string) => void;
  login: (email: string, pass: string) => { success: boolean; requires2FA?: boolean; error?: string };
  verify2FA: (code: string) => boolean;
  register: (data: { name: string; username: string; email: string; country: string; category: UserCategory; profession: string }) => boolean;
  logout: () => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  addChannel: (channel: Omit<SocialChannel, 'id' | 'userId' | 'lastSync' | 'status'>) => void;
  updateChannel: (id: string, data: Partial<SocialChannel>) => void;
  deleteChannel: (id: string) => void;
  syncChannel: (id: string) => void;
  toggleFollow: (targetUserId: string) => void;
  toggleFavorite: (targetUserId: string) => void;
  submitReport: (targetType: 'profile' | 'post' | 'channel', targetId: string, targetName: string, reason: any, details: string) => void;
  resolveReport: (reportId: string, action: 'resolved' | 'dismissed') => void;
  suspendUserAccount: (userId: string) => void;
  changeUserRole: (userId: string, newRole: UserRole) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  setBioTheme: (theme: BioLinkTheme) => void;
  exportGdprData: () => void;
  deleteAccount: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('omnisphere_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('omnisphere_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // default to Sofia
  });

  const [channels, setChannels] = useState<SocialChannel[]>(() => {
    const saved = localStorage.getItem('omnisphere_channels');
    return saved ? JSON.parse(saved) : INITIAL_CHANNELS;
  });

  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(() => {
    const saved = localStorage.getItem('omnisphere_feed');
    return saved ? JSON.parse(saved) : INITIAL_FEED_POSTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('omnisphere_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem('omnisphere_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [auditLogs, setAuditLogs] = useState<SecurityAuditLog[]>(() => {
    const saved = localStorage.getItem('omnisphere_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [followingIds, setFollowingIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('omnisphere_following');
    return saved ? JSON.parse(saved) : ['usr_marcus', 'usr_elena'];
  });

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('omnisphere_favorites');
    return saved ? JSON.parse(saved) : ['usr_marcus'];
  });

  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [selectedPublicProfile, setSelectedPublicProfile] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [twoFactorModalOpen, setTwoFactorModalOpen] = useState<boolean>(false);
  const [pendingUserFor2FA, setPendingUserFor2FA] = useState<UserProfile | null>(null);
  
  // Rate limiting / Brute force simulation
  const [loginAttempts, setLoginAttempts] = useState<number>(0);
  const [isLockedOut, setIsLockedOut] = useState<boolean>(false);

  const [activeBioTheme, setActiveBioTheme] = useState<BioLinkTheme>(() => {
    return currentUser?.customTheme || BIO_LINK_THEMES[0];
  });

  // Persist state
  useEffect(() => {
    localStorage.setItem('omnisphere_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('omnisphere_current_user', JSON.stringify(currentUser));
      setActiveBioTheme(currentUser.customTheme || BIO_LINK_THEMES[0]);
    } else {
      localStorage.removeItem('omnisphere_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('omnisphere_channels', JSON.stringify(channels));
  }, [channels]);

  useEffect(() => {
    localStorage.setItem('omnisphere_feed', JSON.stringify(feedPosts));
  }, [feedPosts]);

  useEffect(() => {
    localStorage.setItem('omnisphere_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('omnisphere_reports', JSON.stringify(reports));
  }, [reports]);

  useEffect(() => {
    localStorage.setItem('omnisphere_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('omnisphere_following', JSON.stringify(followingIds));
  }, [followingIds]);

  useEffect(() => {
    localStorage.setItem('omnisphere_favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const switchPersona = (userId: string) => {
    const target = users.find(u => u.id === userId);
    if (target) {
      setCurrentUser(target);
      setActiveBioTheme(target.customTheme || BIO_LINK_THEMES[0]);
      // Log audit
      const newLog: SecurityAuditLog = {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        eventType: 'login_success',
        userEmail: target.email,
        ipAddress: '127.0.0.1 (Local Session)',
        country: target.country,
        details: `Alternância de persona para @${target.username} (${target.role})`,
        severity: 'low'
      };
      setAuditLogs(prev => [newLog, ...prev]);
    }
  };

  const login = (email: string, pass: string) => {
    if (isLockedOut) {
      return { success: false, error: 'Conta temporariamente bloqueada devido a excesso de tentativas incorretas. Tente dentro de alguns instantes.' };
    }

    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      const nextAttempts = loginAttempts + 1;
      setLoginAttempts(nextAttempts);
      if (nextAttempts >= 4) {
        setIsLockedOut(true);
        setTimeout(() => {
          setIsLockedOut(false);
          setLoginAttempts(0);
        }, 15000); // 15s cooldown simulation
      }
      return { success: false, error: 'Credenciais inválidas. Verifique o email ou palavra-passe.' };
    }

    if (found.isSuspended) {
      return { success: false, error: 'Esta conta encontra-se suspensa pela moderação por violação dos termos.' };
    }

    if (found.twoFactorEnabled) {
      setPendingUserFor2FA(found);
      setTwoFactorModalOpen(true);
      return { success: true, requires2FA: true };
    }

    // Success without 2FA
    setCurrentUser(found);
    setLoginAttempts(0);
    setAuthModalOpen(false);

    const newLog: SecurityAuditLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      eventType: 'login_success',
      userEmail: found.email,
      ipAddress: '194.65.12.88',
      country: found.country,
      details: 'Início de sessão padrão validado com sucesso.',
      severity: 'low'
    };
    setAuditLogs(prev => [newLog, ...prev]);

    return { success: true };
  };

  const verify2FA = (code: string) => {
    // Accepts "123456" or any 6-digit code for flexible testing
    if (code.length === 6 && pendingUserFor2FA) {
      setCurrentUser(pendingUserFor2FA);
      setPendingUserFor2FA(null);
      setTwoFactorModalOpen(false);
      setAuthModalOpen(false);
      setLoginAttempts(0);

      const newLog: SecurityAuditLog = {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        eventType: '2fa_verified',
        userEmail: pendingUserFor2FA.email,
        ipAddress: '194.65.12.88',
        country: pendingUserFor2FA.country,
        details: 'Código TOTP de 2FA validado com sucesso.',
        severity: 'low'
      };
      setAuditLogs(prev => [newLog, ...prev]);
      return true;
    }
    return false;
  };

  const register = (data: { name: string; username: string; email: string; country: string; category: UserCategory; profession: string }) => {
    const newUser: UserProfile = {
      id: `usr_${Date.now()}`,
      name: data.name,
      username: data.username.toLowerCase().replace(/\s+/g, ''),
      email: data.email,
      country: data.country,
      category: data.category,
      profession: data.profession || 'Membro OmniSphere',
      bio: `Olá! Sou ${data.name}, conectado(a) na OmniSphere a partir de ${data.country}.`,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop&q=80`,
      coverUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80',
      role: 'user',
      isPrivate: false,
      showJoinDate: true,
      showSocials: true,
      followersCount: 1,
      followingCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      isVerified: false,
      twoFactorEnabled: false,
      customTheme: BIO_LINK_THEMES[0]
    };

    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    setAuthModalOpen(false);

    const newLog: SecurityAuditLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      eventType: 'login_success',
      userEmail: newUser.email,
      ipAddress: '194.65.12.88',
      country: newUser.country,
      details: 'Novo utilizador registado com aceitação dos termos de privacidade RGPD.',
      severity: 'low'
    };
    setAuditLogs(prev => [newLog, ...prev]);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentView('directory');
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === currentUser.id ? updated : u));
  };

  const addChannel = (channelData: Omit<SocialChannel, 'id' | 'userId' | 'lastSync' | 'status'>) => {
    if (!currentUser) return;
    const newChan: SocialChannel = {
      ...channelData,
      id: `chn_${Date.now()}`,
      userId: currentUser.id,
      lastSync: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'active'
    };
    setChannels(prev => [newChan, ...prev]);

    // Create notification
    const newNotif: NotificationItem = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title: 'Canal adicionado com sucesso',
      message: `A tua rede social ${channelData.platform.toUpperCase()} (${channelData.handle}) foi vinculada à OmniSphere.`,
      type: 'sync',
      timestamp: 'Agora mesmo',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateChannel = (id: string, data: Partial<SocialChannel>) => {
    setChannels(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
  };

  const deleteChannel = (id: string) => {
    setChannels(prev => prev.filter(c => c.id !== id));
  };

  const syncChannel = (id: string) => {
    setChannels(prev => prev.map(c => {
      if (c.id === id) {
        const delta = Math.floor(Math.random() * 25) + 1;
        return {
          ...c,
          followers: c.followers + delta,
          lastSync: new Date().toISOString().replace('T', ' ').substring(0, 16),
          status: 'active'
        };
      }
      return c;
    }));
  };

  const toggleFollow = (targetUserId: string) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }

    const isFollowing = followingIds.includes(targetUserId);
    if (isFollowing) {
      setFollowingIds(prev => prev.filter(id => id !== targetUserId));
      setUsers(prev => prev.map(u => u.id === targetUserId ? { ...u, followersCount: Math.max(0, u.followersCount - 1) } : u));
    } else {
      setFollowingIds(prev => [...prev, targetUserId]);
      setUsers(prev => prev.map(u => u.id === targetUserId ? { ...u, followersCount: u.followersCount + 1 } : u));

      // Notify target user
      const targetUser = users.find(u => u.id === targetUserId);
      if (targetUser) {
        const newNotif: NotificationItem = {
          id: `notif_${Date.now()}`,
          userId: targetUserId,
          title: 'Novo Seguidor',
          message: `${currentUser.name} (@${currentUser.username}) começou a seguir-te.`,
          type: 'follow',
          timestamp: 'Agora mesmo',
          read: false
        };
        setNotifications(prev => [newNotif, ...prev]);
      }
    }
  };

  const toggleFavorite = (targetUserId: string) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }
    setFavoriteIds(prev => 
      prev.includes(targetUserId) 
        ? prev.filter(id => id !== targetUserId) 
        : [...prev, targetUserId]
    );
  };

  const submitReport = (targetType: 'profile' | 'post' | 'channel', targetId: string, targetName: string, reason: any, details: string) => {
    const newReport: ReportItem = {
      id: `rep_${Date.now()}`,
      reporterId: currentUser?.id || 'anonymous',
      reporterName: currentUser?.name || 'Visitante Anónimo',
      targetType,
      targetId,
      targetName,
      reason,
      details,
      status: 'pending',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setReports(prev => [newReport, ...prev]);
  };

  const resolveReport = (reportId: string, action: 'resolved' | 'dismissed') => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: action } : r));
  };

  const suspendUserAccount = (userId: string) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, isSuspended: !u.isSuspended } : u));
    const target = users.find(u => u.id === userId);
    if (target) {
      const newLog: SecurityAuditLog = {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        eventType: 'account_suspended',
        userEmail: target.email,
        ipAddress: '127.0.0.1 (Admin Action)',
        country: target.country,
        details: `Estatuto de suspensão alterado para utilizador @${target.username}.`,
        severity: 'high'
      };
      setAuditLogs(prev => [newLog, ...prev]);
    }
  };

  const changeUserRole = (userId: string, newRole: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, role: newRole } : null);
    }
    const target = users.find(u => u.id === userId);
    if (target) {
      const newLog: SecurityAuditLog = {
        id: `log_${Date.now()}`,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
        eventType: 'role_changed',
        userEmail: target.email,
        ipAddress: '127.0.0.1 (Admin Action)',
        country: target.country,
        details: `Papel de segurança de @${target.username} atualizado para "${newRole.toUpperCase()}".`,
        severity: 'medium'
      };
      setAuditLogs(prev => [newLog, ...prev]);
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const setBioTheme = (theme: BioLinkTheme) => {
    setActiveBioTheme(theme);
    if (currentUser) {
      updateProfile({ customTheme: theme });
    }
  };

  const exportGdprData = () => {
    if (!currentUser) return;
    const userChannels = channels.filter(c => c.userId === currentUser.id);
    const userPosts = feedPosts.filter(p => userChannels.some(c => c.id === p.channelId));
    const userNotifs = notifications.filter(n => n.userId === currentUser.id);

    const exportBundle = {
      application: 'OmniSphere Global Social Platform',
      gdprStandard: 'Regulation (EU) 2016/679 (GDPR / RGPD Article 20 - Data Portability)',
      exportedAt: new Date().toISOString(),
      userProfile: currentUser,
      connectedChannels: userChannels,
      feedPublications: userPosts,
      notifications: userNotifs,
      followingCount: followingIds.length,
      favoritesCount: favoriteIds.length
    };

    const blob = new Blob([JSON.stringify(exportBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `omnisphere_gdpr_export_${currentUser.username}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const deleteAccount = () => {
    if (!currentUser) return;
    const uid = currentUser.id;
    setChannels(prev => prev.filter(c => c.userId !== uid));
    setNotifications(prev => prev.filter(n => n.userId !== uid));
    setUsers(prev => prev.filter(u => u.id !== uid));
    setCurrentUser(null);
    setCurrentView('directory');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        channels,
        feedPosts,
        notifications,
        reports,
        auditLogs,
        apiStatuses: PLATFORM_API_STATUSES,
        followingIds,
        favoriteIds,
        currentView,
        selectedPublicProfile,
        authModalOpen,
        twoFactorModalOpen,
        loginAttempts,
        isLockedOut,
        activeBioTheme,
        setCurrentView,
        setSelectedPublicProfile,
        setAuthModalOpen,
        setTwoFactorModalOpen,
        switchPersona,
        login,
        verify2FA,
        register,
        logout,
        updateProfile,
        addChannel,
        updateChannel,
        deleteChannel,
        syncChannel,
        toggleFollow,
        toggleFavorite,
        submitReport,
        resolveReport,
        suspendUserAccount,
        changeUserRole,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        setBioTheme,
        exportGdprData,
        deleteAccount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
