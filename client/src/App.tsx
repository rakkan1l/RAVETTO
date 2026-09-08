import React, { useState, useEffect } from 'react';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navigation } from './components/layout/Navigation';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/commerce/CartDrawer';
import { QuickShopDrawer } from './components/commerce/QuickShopDrawer';
import { SizeGuideDrawer } from './components/commerce/SizeGuideDrawer';
import { SearchOverlay } from './components/commerce/SearchOverlay';
import { AuthModal } from './components/layout/AuthModal';
import { ToastContainer } from './components/ui/ToastContainer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CollectionDetailPage } from './pages/CollectionDetailPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { SavedPiecesPage } from './pages/SavedPiecesPage';
import { AccountDashboardPage } from './pages/AccountDashboardPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { JournalListPage } from './pages/JournalListPage';
import { JournalArticlePage } from './pages/JournalArticlePage';
import {
  AboutPage,
  MaterialsPage,
  CraftPage,
  ShippingReturnsPage,
  FaqPage,
  NotFoundPage,
} from './pages/StaticPages';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';

import { useCartStore } from './stores/cartStore';
import { useAuthStore } from './stores/authStore';
import { useSavedStore } from './stores/savedStore';

export const App: React.FC = () => {
  // Simple, high-performance router using browser pathname and pushState
  const [currentPath, setCurrentPath] = useState(window.location.pathname || '/');

  const { fetchCart } = useCartStore();
  const { fetchUser } = useAuthStore();
  const { fetchSaved } = useSavedStore();

  useEffect(() => {
    // Initial data hydration
    fetchCart();
    fetchUser();
    fetchSaved();

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  // Route resolver
  const renderRoute = () => {
    if (currentPath === '/') {
      return <HomePage onNavigate={navigate} />;
    }

    if (currentPath === '/shop') {
      return <ShopPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/collections/')) {
      const slug = currentPath.replace('/collections/', '');
      return <CollectionDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (currentPath === '/collections') {
      return <CollectionDetailPage slug="the-foundations" onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/products/')) {
      const slug = currentPath.replace('/products/', '');
      return <ProductDetailPage slug={slug} onNavigate={navigate} />;
    }

    if (currentPath === '/checkout') {
      return <CheckoutPage onNavigate={navigate} />;
    }

    if (currentPath === '/saved') {
      return <SavedPiecesPage onNavigate={navigate} />;
    }

    if (currentPath === '/account') {
      return <AccountDashboardPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/account/orders/')) {
      const orderIdOrNumber = currentPath.replace('/account/orders/', '');
      return <OrderTrackingPage orderIdOrNumber={orderIdOrNumber} onNavigate={navigate} />;
    }

    if (currentPath === '/journal') {
      return <JournalListPage onNavigate={navigate} />;
    }

    if (currentPath.startsWith('/journal/')) {
      const slug = currentPath.replace('/journal/', '');
      return <JournalArticlePage slug={slug} onNavigate={navigate} />;
    }

    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (currentPath === '/materials') {
      return <MaterialsPage onNavigate={navigate} />;
    }

    if (currentPath === '/craft') {
      return <CraftPage onNavigate={navigate} />;
    }

    if (currentPath === '/shipping' || currentPath === '/returns') {
      return <ShippingReturnsPage onNavigate={navigate} />;
    }

    if (currentPath === '/faq') {
      return <FaqPage onNavigate={navigate} />;
    }

    if (currentPath === '/admin') {
      return <AdminDashboardPage onNavigate={navigate} />;
    }

    return <NotFoundPage onNavigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-ravetto-offwhite text-ravetto-text selection:bg-ravetto-mint selection:text-ravetto-teal font-sans">
      {/* 1. Global Announcement */}
      <AnnouncementBar />

      {/* 2. Global Navigation */}
      <Navigation currentPath={currentPath} onNavigate={navigate} />

      {/* 3. Main View */}
      <main className="flex-1">
        {renderRoute()}
      </main>

      {/* 4. Global Structured Footer */}
      <Footer onNavigate={navigate} />

      {/* 5. Global Drawers, Overlays & Modals */}
      <CartDrawer onNavigate={navigate} />
      <QuickShopDrawer onNavigate={navigate} />
      <SizeGuideDrawer />
      <SearchOverlay onNavigate={navigate} />
      <AuthModal />
      <ToastContainer />
    </div>
  );
};

export default App;
