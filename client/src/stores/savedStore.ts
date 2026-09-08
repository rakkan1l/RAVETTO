import { create } from 'zustand';
import { api } from '../api/client';
import { useAuthStore } from './authStore';

interface SavedState {
  savedItems: any[];
  isLoading: boolean;
  fetchSaved: () => Promise<void>;
  toggleSave: (productId: string, preferredColorId?: string, preferredSizeId?: string) => Promise<boolean>;
  isSaved: (productId: string) => boolean;
}

export const useSavedStore = create<SavedState>((set, get) => ({
  savedItems: [],
  isLoading: false,

  fetchSaved: async () => {
    if (!useAuthStore.getState().user) return;
    try {
      set({ isLoading: true });
      const items = await api.getWishlist();
      set({ savedItems: items, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  toggleSave: async (productId: string, preferredColorId?: string, preferredSizeId?: string) => {
    const user = useAuthStore.getState().user;
    if (!user) {
      useAuthStore.getState().openAuthModal('login');
      return false;
    }

    try {
      const res = await api.toggleWishlist(productId, preferredColorId, preferredSizeId);
      await get().fetchSaved();
      return res.saved;
    } catch (err) {
      console.error('Toggle saved piece failed:', err);
      return false;
    }
  },

  isSaved: (productId: string) => {
    return get().savedItems.some((item) => item.productId === productId || item.product?.id === productId);
  },
}));
