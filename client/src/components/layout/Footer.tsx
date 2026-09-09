import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { api } from '../../api/client';
import { useUIStore } from '../../stores/uiStore';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useUIStore();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      setIsLoading(true);
      await api.subscribeNewsletter(email);
      setIsSubscribed(true);
      setEmail('');
      showToast('Welcome to the Ravetto newsletter', 'success');
    } catch {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-[#5C4033] text-[#FDFCF5] pt-16 sm:pt-24 pb-12 font-sans border-t border-[#5C4033]/20">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-[#FDFCF5]/15 text-left">
          {/* BRAND COLUMN */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-outfit text-2xl font-bold tracking-[0.2em] text-[#FDFCF5] block">
              RAVETTO
            </span>
            <p className="text-xs sm:text-[13px] leading-relaxed text-[#FDFCF5]/75 font-sans max-w-sm">
              Premium T-shirts built around fabric quality, comfortable fits, thoughtful construction and everyday versatility. Knitted and tailored in Tiruppur, India.
            </p>
          </div>

          {/* SHOP COLUMN */}
          <div className="lg:col-span-2 space-y-3 font-outfit">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#879E57]">
              Shop
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#FDFCF5]/80">
              <li>
                <button
                  onClick={() => onNavigate('/shop?filter=new')}
                  className="hover:text-[#879E57] transition-colors"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shop?filter=bestseller')}
                  className="hover:text-[#879E57] transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/collections')}
                  className="hover:text-[#879E57] transition-colors"
                >
                  Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shop')}
                  className="hover:text-[#879E57] transition-colors"
                >
                  All Products
                </button>
              </li>
            </ul>
          </div>

          {/* HELP COLUMN */}
          <div className="lg:col-span-2 space-y-3 font-outfit">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#879E57]">
              Help
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#FDFCF5]/80">
              <li>
                <button
                  onClick={() => onNavigate('/size-guide')}
                  className="hover:text-[#879E57] transition-colors"
                >
                  Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shipping')}
                  className="hover:text-[#879E57] transition-colors"
                >
                  Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/returns')}
                  className="hover:text-[#879E57] transition-colors"
                >
                  Returns / Exchanges
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="hover:text-[#879E57] transition-colors"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* LEGAL COLUMN */}
          <div className="lg:col-span-2 space-y-3 font-outfit">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#879E57]">
              Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-[#FDFCF5]/80">
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="hover:text-[#879E57] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="hover:text-[#879E57] transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/shipping-policy')}
                  className="hover:text-[#879E57] transition-colors"
                >
                  Shipping Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/refund-policy')}
                  className="hover:text-[#879E57] transition-colors"
                >
                  Refund Policy
                </button>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER COLUMN */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-outfit text-base font-bold text-[#FDFCF5]">
              Good things, occasionally.
            </h4>
            <p className="text-xs text-[#FDFCF5]/75 font-sans leading-relaxed">
              Carefully written notes on new releases, restocks, and fabric developments. No spam.
            </p>
            {isSubscribed ? (
              <div className="flex items-center space-x-2 text-xs text-[#879E57] font-semibold py-2">
                <Check className="w-4 h-4" />
                <span>Thank you for joining.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="pt-1 flex items-center space-x-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-[#FFFFFF]/10 border border-[#FDFCF5]/20 rounded-full px-4 py-2.5 text-xs text-[#FDFCF5] placeholder-[#FDFCF5]/50 focus:outline-none focus:border-[#879E57] transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-5 py-2.5 rounded-full bg-[#879E57] hover:bg-[#728848] text-white text-xs font-outfit font-semibold uppercase tracking-wider transition-colors shrink-0 shadow-sm"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FDFCF5]/60 space-y-4 sm:space-y-0 font-outfit">
          <div className="flex items-center space-x-4">
            <span>&copy; {new Date().getFullYear()} RAVETTO. All rights reserved.</span>
            <span className="text-[#FDFCF5]/20">|</span>
            <div className="flex items-center space-x-3 text-sm text-[#FDFCF5]/80">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[#879E57] transition-colors">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X" className="hover:text-[#879E57] transition-colors">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest" className="hover:text-[#879E57] transition-colors">
                <i className="fa-brands fa-pinterest"></i>
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-[#FDFCF5]/60 uppercase tracking-wider">
            <span>UPI</span>
            <span>&bull;</span>
            <span>Cards</span>
            <span>&bull;</span>
            <span>NetBanking</span>
            <span>&bull;</span>
            <span>Express Air</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
