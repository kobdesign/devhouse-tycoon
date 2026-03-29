import { create } from 'zustand';
import type { DashboardStats, GameNotification } from '@/types';

interface DashboardState {
  stats: DashboardStats | null;
  notifications: GameNotification[];
  isLoading: boolean;
  setStats: (stats: DashboardStats) => void;
  addNotification: (notification: GameNotification) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  setLoading: (loading: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  stats: null,
  notifications: [],
  isLoading: true,
  setStats: (stats) => set({ stats }),
  addNotification: (notification) =>
    set((state) => ({ notifications: [notification, ...state.notifications] })),
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n
      ),
    })),
  clearNotifications: () => set({ notifications: [] }),
  setLoading: (isLoading) => set({ isLoading }),
}));
