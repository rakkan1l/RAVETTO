import { create } from 'zustand';
import { User } from '../types';
import { api } from '../api/client';
import { useCartStore } from './cartStore';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'register';
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  fetchUser: () => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName?: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthModalOpen: false,
  authModalMode: 'login',

  openAuthModal: (mode = 'login') => set({ isAuthModalOpen: true, authModalMode: mode }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),

  fetchUser: async () => {
    try {
      set({ isLoading: true });
      const user = await api.getMe();
      set({ user, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const user = await api.login(credentials);
      set({ user, isAuthModalOpen: false, isLoading: false });
      // Refresh cart after login to pick up merged items
      useCartStore.getState().fetchCart();
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  register: async (data) => {
    set({ isLoading: true });
    try {
      const user = await api.register(data);
      set({ user, isAuthModalOpen: false, isLoading: false });
      useCartStore.getState().fetchCart();
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await api.logout();
      set({ user: null });
      useCartStore.getState().fetchCart();
    } catch (err) {
      console.error('Logout error:', err);
    }
  },
}));
