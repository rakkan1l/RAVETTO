import React, { useState } from 'react';
import { Search, User, Bookmark, ShoppingBag, Menu, Shield } from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { useSavedStore } from '../../stores/savedStore';
import { useAuthStore } from '../../stores/authStore';
import { useUIStore } from '../../stores/uiStore';
import { MobileNav } from './MobileNav';

interface NavigationProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPath, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cart, toggleCart } = useCartStore();
  const { savedItems } = useSavedStore();
  const { user, openAuthModal } = useAuthStore();
  const { openSearch } = useUIStore();

  const bagCount = cart?.itemCount || 0;
  const savedCount = savedItems.length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-ravetto-offwhite/95 backdrop-blur-md border-b border-ravetto-border transition-all duration-300">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-18 sm:h-20 flex items-center justify-between">
          {/* Left: Mobile hamburger & Desktop primary links */}
          <div className="flex items-center space-x-8">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-ravetto-text hover:text-ravetto-teal transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.18em] font-medium">
              <button
                onClick={() => onNavigate('/shop')}
                className={`transition-colors py-1 ${
                  currentPath === '/shop' ? 'text-ravetto-teal font-semibold' : 'text-ravetto-text hover:text-ravetto-teal'
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => onNavigate('/collections')}
                className={`transition-colors py-1 ${
                  currentPath.startsWith('/collections') ? 'text-ravetto-teal font-semibold' : 'text-ravetto-text hover:text-ravetto-teal'
                }`}
              >
                Collections
              </button>
              <button
                onClick={() => onNavigate('/materials')}
                className={`transition-colors py-1 ${
                  currentPath === '/materials' ? 'text-ravetto-teal font-semibold' : 'text-ravetto-text hover:text-ravetto-teal'
                }`}
              >
                Materials
              </button>
              <button
                onClick={() => onNavigate('/craft')}
                className={`transition-colors py-1 ${
                  currentPath === '/craft' ? 'text-ravetto-teal font-semibold' : 'text-ravetto-text hover:text-ravetto-teal'
                }`}
              >
                Craft
              </button>
              <button
                onClick={() => onNavigate('/journal')}
                className={`transition-colors py-1 ${
                  currentPath.startsWith('/journal') ? 'text-ravetto-teal font-semibold' : 'text-ravetto-text hover:text-ravetto-teal'
                }`}
              >
                Journal
              </button>
            </nav>
          </div>

          {/* Center: Brand Mark */}
          <div className="text-center select-none cursor-pointer" onClick={() => onNavigate('/')}>
            <span className="font-editorial text-2xl sm:text-3xl tracking-[0.24em] font-medium text-ravetto-text hover:text-ravetto-teal transition-colors">
              RAVETTO
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2 sm:px-3 text-ravetto-text hover:text-ravetto-teal transition-colors flex items-center space-x-1.5"
              aria-label="Search garments"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-[10px] tracking-widest uppercase text-ravetto-muted font-mono">
                ⌘K
              </span>
            </button>

            {/* Saved Pieces Wishlist */}
            <button
              onClick={() => onNavigate('/saved')}
              className="p-2 text-ravetto-text hover:text-ravetto-teal transition-colors relative"
              aria-label="Saved pieces"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-ravetto-mint text-ravetto-text font-mono text-[9px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Account / Admin */}
            {user ? (
              <div className="flex items-center space-x-1">
                {user.role === 'ADMIN' && (
                  <button
                    onClick={() => onNavigate('/admin')}
                    className="p-2 text-amber-700 hover:text-amber-900 transition-colors"
                    title="Atelier Admin Console"
                    aria-label="Admin panel"
                  >
                    <Shield className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => onNavigate('/account')}
                  className="p-2 text-ravetto-text hover:text-ravetto-teal transition-colors"
                  aria-label="My account"
                >
                  <User className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="p-2 text-ravetto-text hover:text-ravetto-teal transition-colors"
                aria-label="Sign in"
              >
                <User className="w-4 h-4" />
              </button>
            )}

            {/* Bag Trigger */}
            <button
              onClick={toggleCart}
              className="p-2 -mr-1.5 sm:mr-0 text-ravetto-text hover:text-ravetto-teal transition-colors relative flex items-center space-x-1.5"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-ravetto-teal" />
              <span className="text-xs font-mono font-medium tracking-tight text-ravetto-teal">
                [{bagCount}]
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};
