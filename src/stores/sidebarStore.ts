import { create } from 'zustand';

interface SidebarState {
  isCollapsed: boolean;
  activeItem: string;
  toggle: () => void;
  setCollapsed: (collapsed: boolean) => void;
  setActiveItem: (item: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isCollapsed: false,
  activeItem: '/overview',
  toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setCollapsed: (isCollapsed) => set({ isCollapsed }),
  setActiveItem: (activeItem) => set({ activeItem }),
}));
