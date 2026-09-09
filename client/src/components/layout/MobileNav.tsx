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
            className="absolute inset-0 bg-[#5C4033]/40 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 left-0 w-[84vw] max-w-sm bg-[#FDFCF5] shadow-2xl flex flex-col justify-between border-r border-[#5C4033]/10 p-6 sm:p-8"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#5C4033]/10">
                <span className="font-outfit text-2xl tracking-[0.18em] font-bold text-[#5C4033]">
                  RAVETTO
                </span>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-[#5C4033] hover:text-[#879E57] transition-colors rounded-full"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main Links */}
              <nav className="mt-8 space-y-4 font-outfit">
                {navLinks.map((link) => (
                  <button
                    key={link.path}
                    onClick={() => {
                      onNavigate(link.path);
                      onClose();
                    }}
                    className="flex items-center justify-between w-full text-left py-2 text-[15px] font-medium tracking-[0.06em] text-[#5C4033] hover:text-[#879E57] transition-colors group"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-40 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#879E57]" />
                  </button>
                ))}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#5C4033]/10 space-y-4 font-outfit">
              {user ? (
                <div className="space-y-2">
                  <div className="text-xs text-[#8C7E7E]">
                    Signed in as <span className="text-[#5C4033] font-semibold">{user.firstName}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs tracking-wider pt-2">
                    <button
                      onClick={() => {
                        onNavigate('/account');
                        onClose();
                      }}
                      className="text-[#879E57] font-semibold hover:underline"
                    >
                      Account
                    </button>
                    <span>&bull;</span>
                    <button
                      onClick={() => {
                        logout();
                        onClose();
                      }}
                      className="text-[#8C7E7E] hover:text-[#5C4033]"
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
                          className="text-amber-700 font-semibold flex items-center space-x-1"
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
                    className="py-3 text-xs font-semibold uppercase tracking-[0.14em] rounded-full border border-[#5C4033]/30 text-[#5C4033] text-center hover:bg-[#5C4033] hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      openAuthModal('register');
                    }}
                    className="py-3 text-xs font-semibold uppercase tracking-[0.14em] rounded-full bg-[#879E57] text-white text-center hover:bg-[#728848] transition-colors shadow-sm"
                  >
                    Join
                  </button>
                </div>
              )}

              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8C7E7E] text-center pt-2">
                Everyday Essentials &bull; Made Beyond Ordinary
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
