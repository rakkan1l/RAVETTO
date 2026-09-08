import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';
import { api } from '../api/client';
import { Button } from '../components/ui/Button';
import { Price } from '../components/ui/Price';
import { ArrowRight, Package, MapPin, User, LogOut } from 'lucide-react';

interface AccountDashboardPageProps {
  onNavigate: (path: string) => void;
}

export const AccountDashboardPage: React.FC<AccountDashboardPageProps> = ({ onNavigate }) => {
  const { user, openAuthModal, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'profile'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrders() {
      if (!user) return;
      try {
        setIsLoading(true);
        const data = await api.getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error('Failed to load orders:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
        <h2 className="font-editorial text-3xl text-ravetto-text">Atelier Account</h2>
        <p className="text-xs text-ravetto-muted">Sign in to view orders and manage saved addresses.</p>
        <Button onClick={() => openAuthModal('login')} variant="primary" size="md">
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ravetto-offwhite py-16 sm:py-24">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-12 text-left">
        {/* Welcome Header */}
        <div className="pb-12 border-b border-ravetto-border flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="micro-caps text-ravetto-teal block mb-1">
              Client Portfolio
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl font-medium tracking-tight text-ravetto-text">
              Welcome Back, {user.firstName.toUpperCase()}
            </h1>
          </div>
          <button
            onClick={() => {
              logout();
              onNavigate('/');
            }}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-ravetto-muted hover:text-red-600 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Minimalist Tabs */}
        <div className="flex space-x-8 py-6 border-b border-ravetto-border text-xs uppercase tracking-[0.16em]">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'orders'
                ? 'text-ravetto-teal font-bold border-b-2 border-ravetto-teal'
                : 'text-ravetto-muted hover:text-ravetto-text'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Orders [{orders.length}]</span>
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`py-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'addresses'
                ? 'text-ravetto-teal font-bold border-b-2 border-ravetto-teal'
                : 'text-ravetto-muted hover:text-ravetto-text'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Addresses</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`py-2 transition-colors flex items-center space-x-2 ${
              activeTab === 'profile'
                ? 'text-ravetto-teal font-bold border-b-2 border-ravetto-teal'
                : 'text-ravetto-muted hover:text-ravetto-text'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile & Security</span>
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === 'orders' && (
          <div className="py-10 space-y-6">
            {isLoading ? (
              <div className="py-12 text-center text-xs uppercase tracking-widest text-ravetto-muted">
                Loading orders...
              </div>
            ) : orders.length > 0 ? (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-6 sm:p-8 bg-ravetto-offwhite-paper border border-ravetto-border flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-ravetto-teal transition-all group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono text-sm font-bold text-ravetto-text">
                          ORDER #{order.orderNumber}
                        </span>
                        <span className="text-[10px] uppercase font-mono tracking-widest bg-ravetto-teal text-white px-2 py-0.5">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-xs text-ravetto-muted">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {' &bull; '}{order.items?.length || 0} pieces
                      </p>
                      <div className="pt-1">
                        <Price amount={order.total} size="md" />
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigate(`/account/orders/${order.orderNumber}`)}
                      className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.16em] font-medium text-ravetto-teal hover:underline"
                    >
                      <span>Track Shipment</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty Orders State */
              <div className="py-20 text-center space-y-3 max-w-sm mx-auto">
                <p className="text-sm font-medium tracking-[0.2em] uppercase text-ravetto-text">
                  NO ORDERS YET.
                </p>
                <p className="text-xs text-ravetto-muted">
                  Your Ravetto pieces will appear here after purchase.
                </p>
                <Button onClick={() => onNavigate('/shop')} variant="primary" size="md">
                  Discover The Collection
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Addresses */}
        {activeTab === 'addresses' && (
          <div className="py-10 space-y-6">
            <div className="max-w-lg p-6 bg-ravetto-offwhite-paper border border-ravetto-border space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold uppercase tracking-wider text-ravetto-text">
                  Primary Delivery Address
                </span>
                <span className="text-[10px] font-mono bg-ravetto-mint px-2 py-0.5 text-ravetto-teal font-medium">
                  Default
                </span>
              </div>
              <p className="text-xs text-ravetto-text font-medium">{user.firstName} {user.lastName || 'Mehta'}</p>
              <p className="text-xs text-ravetto-muted leading-relaxed">
                Flat 402, Altius Residences, Indiranagar 12th Main<br />
                Bengaluru, Karnataka 560038<br />
                India
              </p>
              <p className="text-xs text-ravetto-muted pt-1">Phone: {user.phone || '+91 98110 56789'}</p>
            </div>
          </div>
        )}

        {/* Tab 3: Profile */}
        {activeTab === 'profile' && (
          <div className="py-10 max-w-lg space-y-6">
            <div className="p-6 bg-ravetto-offwhite-paper border border-ravetto-border space-y-4 text-xs">
              <div>
                <span className="text-ravetto-muted uppercase tracking-wider text-[10px] block">
                  Email
                </span>
                <span className="font-medium text-ravetto-text text-sm">{user.email}</span>
              </div>
              <div>
                <span className="text-ravetto-muted uppercase tracking-wider text-[10px] block">
                  Role
                </span>
                <span className="font-mono text-ravetto-teal font-medium uppercase tracking-widest">{user.role}</span>
              </div>
              <div>
                <span className="text-ravetto-muted uppercase tracking-wider text-[10px] block">
                  Atelier Membership
                </span>
                <span className="text-ravetto-muted">Active since 2026</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
