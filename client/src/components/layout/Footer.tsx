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
      showToast('Welcome to the Ravetto Atelier mailing list', 'success');
    } catch {
      showToast('Failed to subscribe. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-ravetto-offwhite-paper border-t border-ravetto-border pt-16 pb-12 text-ravetto-text">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-ravetto-border">
          {/* Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-editorial text-2xl tracking-[0.24em] font-medium text-ravetto-teal block">
              RAVETTO
            </span>
            <p className="text-xs uppercase tracking-[0.18em] text-ravetto-text font-medium">
              Made with intention. Worn without effort.
            </p>
            <p className="text-xs leading-relaxed text-ravetto-muted max-w-sm">
              Heavyweight architectural T-shirts crafted from combed Supima cotton in Tiruppur, India. Designed around tactile restraint and lifelong structural retention.
            </p>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ravetto-text">
              Shop
            </h4>
            <ul className="space-y-2 text-xs text-ravetto-muted uppercase tracking-[0.14em]">
              <li>
                <button onClick={() => onNavigate('/shop')} className="hover:text-ravetto-teal transition-colors">
                  All Garments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/collections/the-foundations')} className="hover:text-ravetto-teal transition-colors">
                  The Foundations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/collections/heavyweight-atelier')} className="hover:text-ravetto-teal transition-colors">
                  Heavyweight Atelier
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/collections/raw-and-dyed')} className="hover:text-ravetto-teal transition-colors">
                  Raw & Mineral Dyed
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Atelier */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ravetto-text">
              Atelier
            </h4>
            <ul className="space-y-2 text-xs text-ravetto-muted uppercase tracking-[0.14em]">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-ravetto-teal transition-colors">
                  Brand Story
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/materials')} className="hover:text-ravetto-teal transition-colors">
                  Materials & GSM
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/craft')} className="hover:text-ravetto-teal transition-colors">
                  Craftsmanship
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/journal')} className="hover:text-ravetto-teal transition-colors">
                  Journal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ravetto-text">
              Join Ravetto
            </h4>
            <p className="text-xs text-ravetto-muted leading-relaxed">
              Quiet releases, fabric archives, and private restock notes.
            </p>
            {isSubscribed ? (
              <div className="flex items-center space-x-2 text-xs text-ravetto-teal uppercase tracking-widest font-medium py-2">
                <Check className="w-4 h-4 text-ravetto-mint" />
                <span>Inscribed</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative mt-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="atelier@domain.com"
                  className="w-full bg-ravetto-offwhite border border-ravetto-border px-3.5 py-2.5 text-xs text-ravetto-text placeholder-ravetto-muted/60 focus:outline-none focus:border-ravetto-teal tracking-wide pr-10"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center text-ravetto-text hover:text-ravetto-teal transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ravetto-muted uppercase tracking-[0.16em] space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <span>&copy; {new Date().getFullYear()} RAVETTO ATELIER. All rights reserved.</span>
            <span className="hidden sm:inline text-ravetto-border">|</span>
            {/* Font Awesome Social Icons */}
            <div className="flex items-center space-x-3 text-xs text-ravetto-muted">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-ravetto-teal transition-colors">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="X (Twitter)" className="hover:text-ravetto-teal transition-colors">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest" className="hover:text-ravetto-teal transition-colors">
                <i className="fa-brands fa-pinterest-p"></i>
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button onClick={() => onNavigate('/shipping')} className="hover:text-ravetto-teal transition-colors">
              Shipping & Returns
            </button>
            <button onClick={() => onNavigate('/size-guide')} className="hover:text-ravetto-teal transition-colors">
              Size Guide
            </button>
            <button onClick={() => onNavigate('/faq')} className="hover:text-ravetto-teal transition-colors">
              FAQ
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
