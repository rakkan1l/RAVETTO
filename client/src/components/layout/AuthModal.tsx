import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalMode, openAuthModal, login, register, isLoading } = useAuthStore();
  const { showToast } = useUIStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (authModalMode === 'login') {
        await login({ email, password });
        showToast('Welcome back to Ravetto Atelier', 'success');
      } else {
        await register({ email, password, firstName, lastName });
        showToast('Account created successfully', 'success');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleQuickLogin = async (asAdmin = false) => {
    setError(null);
    try {
      if (asAdmin) {
        await login({ email: 'admin@ravetto.com', password: 'ravettoAdmin2026!' });
        showToast('Signed in as Atelier Administrator', 'success');
      } else {
        await login({ email: 'client@ravetto.com', password: 'ravettoCustomer2026!' });
        showToast('Signed in as Arjun Mehta', 'success');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      title={authModalMode === 'login' ? 'Sign In &bull; Atelier' : 'Create Account &bull; Ravetto'}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs tracking-wide">
            {error}
          </div>
        )}

        {authModalMode === 'register' && (
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Arjun"
            />
            <Input
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="e.g. Mehta"
            />
          </div>
        )}

        <Input
          label="Email Address"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="client@domain.com"
        />

        <Input
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full mt-2"
          isLoading={isLoading}
        >
          {authModalMode === 'login' ? 'Sign In' : 'Create Account'}
        </Button>

        <div className="pt-2 text-center text-xs text-ravetto-muted">
          {authModalMode === 'login' ? (
            <p>
              New to the atelier?{' '}
              <button
                type="button"
                onClick={() => openAuthModal('register')}
                className="text-ravetto-teal font-medium hover:underline uppercase tracking-wider text-[11px]"
              >
                Create Account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => openAuthModal('login')}
                className="text-ravetto-teal font-medium hover:underline uppercase tracking-wider text-[11px]"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

        {/* Demo Fast Login Buttons */}
        <div className="pt-6 border-t border-ravetto-border">
          <p className="text-[10px] uppercase tracking-[0.2em] text-ravetto-muted text-center mb-3">
            Demo Atelier Accounts
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin(false)}
              className="px-2 py-2 border border-ravetto-border text-[10px] uppercase tracking-[0.14em] text-ravetto-text hover:bg-ravetto-offwhite-paper transition-colors"
            >
              Demo Client
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin(true)}
              className="px-2 py-2 border border-amber-300 bg-amber-50/50 text-[10px] uppercase tracking-[0.14em] text-amber-900 hover:bg-amber-100 transition-colors"
            >
              Admin Atelier
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
