import { create } from 'zustand';
import { Cart } from '../types';
import { api } from '../api/client';

interface CartState {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  fetchCart: () => Promise<void>;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateItem: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isOpen: false,
  isLoading: false,

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  fetchCart: async () => {
    try {
      set({ isLoading: true });
      const cart = await api.getCart();
      set({ cart, isLoading: false });
    } catch (err) {
      console.error('Failed to load bag:', err);
      set({ isLoading: false });
    }
  },

  addItem: async (variantId: string, quantity = 1) => {
    try {
      set({ isLoading: true });
      const updated = await api.addToCart(variantId, quantity);
      set({ cart: updated, isOpen: true, isLoading: false });
    } catch (err: any) {
      set({ isLoading: false });
      throw err;
    }
  },

  updateItem: async (itemId: string, quantity: number) => {
    try {
      set({ isLoading: true });
      const updated = await api.updateCartItem(itemId, quantity);
      set({ cart: updated, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  removeItem: async (itemId: string) => {
    try {
      set({ isLoading: true });
      const updated = await api.removeFromCart(itemId);
      set({ cart: updated, isLoading: false });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },
}));
