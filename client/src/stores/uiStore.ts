import { create } from 'zustand';
import { Product } from '../types';

interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
}

interface UIState {
  isSearchOpen: boolean;
  isQuickShopOpen: boolean;
  quickShopProduct: Product | null;
  isSizeGuideOpen: boolean;
  toasts: ToastItem[];

  openSearch: () => void;
  closeSearch: () => void;
  toggleSearch: () => void;

  openQuickShop: (product: Product) => void;
  closeQuickShop: () => void;

  openSizeGuide: () => void;
  closeSizeGuide: () => void;

  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  isSearchOpen: false,
  isQuickShopOpen: false,
  quickShopProduct: null,
  isSizeGuideOpen: false,
  toasts: [],

  openSearch: () => set({ isSearchOpen: true }),
  closeSearch: () => set({ isSearchOpen: false }),
  toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),

  openQuickShop: (product: Product) => set({ isQuickShopOpen: true, quickShopProduct: product }),
  closeQuickShop: () => set({ isQuickShopOpen: false, quickShopProduct: null }),

  openSizeGuide: () => set({ isSizeGuideOpen: true }),
  closeSizeGuide: () => set({ isSizeGuideOpen: false }),

  showToast: (message: string, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));

    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },

  removeToast: (id: string) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));
