import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose, onNavigate }) => {
  const { user, openAuthModal, logout } = useAuthStore();

  const navLinks = [
    { label: 'Shop All Pieces', path: '/shop' },
    { label: 'Collections', path: '/collections' },
    { label: 'Fabric & Materials', path: '/materials' },
    { label: 'Craftsmanship', path: '/craft' },
    { label: 'Size Guide', path: '/size-guide' },
    { label: 'Journal', path: '/journal' },
    { label: 'Brand Story', path: '/about' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ravetto-text/50 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 left-0 w-[82vw] max-w-sm bg-ravetto-offwhite shadow-2xl flex flex-col justify-between border-r border-ravetto-border p-6 sm:p-8"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-ravetto-border">
                <span className="font-editorial text-xl tracking-[0.2em] font-medium text-ravetto-teal">
                  RAVETTO
                </span>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-ravetto-muted hover:text-ravetto-text"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Links */}
              <nav className="mt-8 space-y-5">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      onNavigate(link.path);
                      onClose();
                    }}
                    className="flex items-center justify-between w-full text-left py-1 text-sm uppercase tracking-[0.16em] text-ravetto-text hover:text-ravetto-teal transition-colors group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-ravetto-teal" />
                  </button>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-ravetto-border space-y-4">
              {user ? (
                <div className="space-y-2">
                  <div className="text-xs text-ravetto-muted uppercase tracking-widest">
                    Signed in as <span className="text-ravetto-text font-medium">{user.firstName}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs uppercase tracking-widest pt-2">
                    <button
                      onClick={() => {
                        onNavigate('/account');
                        onClose();
                      }}
                      className="text-ravetto-teal font-medium hover:underline"
                    >
                      Account
                    </button>
                    <span>&bull;</span>
                    <button
                      onClick={() => {
                        logout();
                        onClose();
                      }}
                      className="text-ravetto-muted hover:text-ravetto-text"
                    >
                      Sign Out
                    </button>
                    {user.role === 'ADMIN' && (
                      <>
                        <span>&bull;</span>
                        <button
                          onClick={() => {
                            onNavigate('/admin');
                            onClose();
                          }}
                          className="text-amber-700 font-medium flex items-center space-x-1"
                        >
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Admin</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      onClose();
                      openAuthModal('login');
                    }}
                    className="py-2.5 text-xs font-medium uppercase tracking-[0.14em] border border-ravetto-text text-ravetto-text text-center hover:bg-ravetto-text hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      openAuthModal('register');
                    }}
                    className="py-2.5 text-xs font-medium uppercase tracking-[0.14em] bg-ravetto-teal text-white text-center hover:bg-ravetto-teal-dark transition-colors"
                  >
                    Join
                  </button>
                </div>
              )}

              <p className="text-[10px] uppercase tracking-[0.2em] text-ravetto-muted/70 text-center pt-2">
                Quiet Luxury &bull; Tiruppur, India
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
