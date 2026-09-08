import { create } from 'zustand';
import { api } from '../api/client';
import { useAuthStore } from './authStore';
import { FALLBACK_PRODUCTS } from '../api/catalogData';

interface SavedState {
  savedItems: any[];
  isLoading: boolean;
  fetchSaved: () => Promise<void>;
  toggleSave: (productId: string, preferredColorId?: string, preferredSizeId?: string) => Promise<boolean>;
  isSaved: (productId: string) => boolean;
}

const LOCAL_KEY = 'ravetto_saved_pieces_guest';

function getLocalSaved(): any[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setLocalSaved(items: any[]) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  } catch {}
}

export const useSavedStore = create<SavedState>((set, get) => ({
  savedItems: getLocalSaved(),
  isLoading: false,

  fetchSaved: async () => {
    const user = useAuthStore.getState().user;
    if (!user) {
      set({ savedItems: getLocalSaved(), isLoading: false });
      return;
    }
    try {
      set({ isLoading: true });
      const items = await api.getWishlist();
      set({ savedItems: items, isLoading: false });
    } catch {
      set({ savedItems: getLocalSaved(), isLoading: false });
    }
  },

  toggleSave: async (productId: string, preferredColorId?: string, preferredSizeId?: string) => {
    const user = useAuthStore.getState().user;
    if (!user) {
      // Guest local storage toggle
      const current = getLocalSaved();
      const existingIdx = current.findIndex((i) => i.productId === productId || i.product?.id === productId);
      let updated: any[];
      let isNowSaved = false;

      if (existingIdx >= 0) {
        updated = current.filter((_, idx) => idx !== existingIdx);
        isNowSaved = false;
      } else {
        const prod = FALLBACK_PRODUCTS.find((p) => p.id === productId) || {
          id: productId,
          name: 'The Essential Tee',
          slug: 'essential-tee',
          price: 1499,
          gsm: 240,
          fit: 'Structured Regular',
          images: [{ url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85', isPrimary: true }],
          variants: [],
        };
        updated = [
          ...current,
          {
            id: `local-${Date.now()}`,
            productId,
            preferredColorId,
            preferredSizeId,
            product: prod,
          },
        ];
        isNowSaved = true;
      }
      setLocalSaved(updated);
      set({ savedItems: updated });
      return isNowSaved;
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
