import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, Shield } from 'lucide-react';
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
  const [isScrolled, setIsScrolled] = useState(false);

  const { cart, toggleCart } = useCartStore();
  const { savedItems } = useSavedStore();
  const { user, openAuthModal } = useAuthStore();
  const { openSearch } = useUIStore();

  const bagCount = cart?.itemCount || 0;
  const savedCount = savedItems.length;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Shop', path: '/shop' },
    { label: 'New Arrivals', path: '/shop?filter=new' },
    { label: 'Collections', path: '/collections' },
    { label: 'About', path: '/about' },
  ];

  return (
    <>
      {/* Floating Capsule Header Container */}
      <header className="fixed top-3 sm:top-5 inset-x-0 z-40 px-3 sm:px-6 lg:px-8 pointer-events-none transition-all duration-300">
        <div
          className={`pointer-events-auto max-w-[1360px] mx-auto w-full rounded-full transition-all duration-300 ease-out flex items-center justify-between px-4 sm:px-8 ${
            isScrolled
              ? 'h-[62px] sm:h-[66px] bg-[#FFFFFF]/95 shadow-[0_8px_30px_rgba(92,64,51,0.10)] border border-[#5C4033]/10 backdrop-blur-md'
              : 'h-[72px] sm:h-[76px] bg-[#FFFFFF]/90 shadow-[0_4px_20px_rgba(92,64,51,0.06)] border border-[#5C4033]/08 backdrop-blur-sm'
          }`}
        >
          {/* Left: Mobile hamburger & Brand Mark */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 text-[#5C4033] hover:text-[#879E57] transition-colors rounded-full focus-visible:outline-none"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <button
              onClick={() => onNavigate('/')}
              className="text-left select-none group flex items-center space-x-2 focus-visible:outline-none"
            >
              <span className="font-outfit text-xl sm:text-2xl font-bold tracking-[0.18em] text-[#5C4033] group-hover:text-[#879E57] transition-colors">
                RAVETTO
              </span>
            </button>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[14px] font-medium font-outfit">
            {navItems.map((item) => {
              const isActive =
                item.path === '/shop?filter=new'
                  ? currentPath.includes('filter=new')
                  : currentPath === item.path;

              return (
                <button
                  key={item.label}
                  onClick={() => onNavigate(item.path)}
                  className={`relative py-2 px-1 transition-colors group flex flex-col items-center select-none ${
                    isActive ? 'text-[#879E57] font-semibold' : 'text-[#5C4033] hover:text-[#879E57]'
                  }`}
                >
                  <span>{item.label}</span>
                  {/* Subtle animated underline / dot indicator */}
                  <span
                    className={`absolute bottom-0.5 h-[2.5px] rounded-full bg-[#879E57] transition-all duration-200 ${
                      isActive ? 'w-4' : 'w-0 group-hover:w-3 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Right: Actions (Search, Wishlist, Account, Shopping Bag) */}
          <div className="flex items-center space-x-1 sm:space-x-2 text-[#5C4033]">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="p-2 sm:px-3 hover:text-[#879E57] transition-colors flex items-center space-x-1.5 rounded-full focus-visible:outline-none"
              aria-label="Search garments"
            >
              <Search className="w-4 h-4" />
              <span className="hidden xl:inline text-[11px] font-outfit text-[#8C7E7E]">
                Search
              </span>
            </button>

            {/* Wishlist Heart */}
            <button
              onClick={() => onNavigate('/saved')}
              className="p-2 hover:text-[#C93A5C] transition-all duration-200 relative group rounded-full focus-visible:outline-none"
              aria-label="Wishlist pieces"
            >
              <Heart
                className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                  savedCount > 0 ? 'fill-[#C93A5C] text-[#C93A5C]' : 'text-[#5C4033] group-hover:text-[#C93A5C]'
                }`}
              />
              {savedCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-1 bg-[#C93A5C] text-white font-sans text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-fadeIn">
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
                    className="p-2 text-amber-700 hover:text-amber-900 transition-colors rounded-full"
                    title="Atelier Admin Console"
                    aria-label="Admin panel"
                  >
                    <Shield className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => onNavigate('/account')}
                  className="p-2 hover:text-[#879E57] transition-colors rounded-full"
                  aria-label="My account"
                >
                  <User className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="p-2 hover:text-[#879E57] transition-colors rounded-full"
                aria-label="Sign in"
              >
                <User className="w-4 h-4" />
              </button>
            )}

            {/* Shopping Bag Pill Trigger */}
            <button
              onClick={toggleCart}
              className="ml-1 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#879E57]/10 hover:bg-[#879E57] text-[#5C4033] hover:text-white transition-all duration-200 flex items-center space-x-2 focus-visible:outline-none group active:scale-95"
              aria-label="Shopping bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#879E57] group-hover:text-white transition-colors" />
              <span className="text-xs font-semibold font-outfit text-[#879E57] group-hover:text-white transition-colors">
                {bagCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Spacer to prevent page content from being hidden behind fixed header */}
      <div className="h-20 sm:h-24" />

      {/* Mobile Drawer */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};
