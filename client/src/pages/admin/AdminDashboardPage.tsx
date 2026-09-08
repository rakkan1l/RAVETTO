import React, { useState, useEffect } from 'react';
import { api } from '../../api/client';
import { AdminMetrics } from '../../types';
import { Price } from '../../components/ui/Price';
import { Button } from '../../components/ui/Button';
import { Shield, Package, DollarSign, Users, AlertTriangle, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

interface AdminDashboardProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const { user, login } = useAuthStore();
  const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'inventory' | 'orders'>('analytics');
  const [isLoading, setIsLoading] = useState(true);

  // Quick edit stock state
  const [stockEditMap, setStockEditMap] = useState<Record<string, number>>({});
  const [isUpdatingStock, setIsUpdatingStock] = useState<string | null>(null);

  useEffect(() => {
    async function loadAdminData() {
      try {
        setIsLoading(true);
        // If not logged in as admin, log in automatically with demo admin credentials
        if (!user || user.role !== 'ADMIN') {
          await login({ email: 'admin@ravetto.com', password: 'ravettoAdmin2026!' });
        }

        const [metricsData, productsData, ordersData] = await Promise.all([
          api.getAdminMetrics(),
          api.getAdminProducts(),
          api.getAdminOrders(),
        ]);

        setMetrics(metricsData);
        setProducts(productsData);
        setOrders(ordersData);
      } catch (err) {
        console.error('Failed to load admin telemetry:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadAdminData();
  }, [user]);

  const handleUpdateStock = async (variantId: string) => {
    const newStock = stockEditMap[variantId];
    if (newStock === undefined || newStock < 0) return;

    try {
      setIsUpdatingStock(variantId);
      await api.updateAdminInventory(variantId, newStock);
      // Reload products & metrics
      const [updatedProducts, updatedMetrics] = await Promise.all([
        api.getAdminProducts(),
        api.getAdminMetrics(),
      ]);
      setProducts(updatedProducts);
      setMetrics(updatedMetrics);
    } catch (err) {
      console.error('Stock update failed:', err);
    } finally {
      setIsUpdatingStock(null);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await api.updateAdminOrderStatus(orderId, status);
      const updatedOrders = await api.getAdminOrders();
      setOrders(updatedOrders);
    } catch (err) {
      console.error('Order status update failed:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-32 text-center text-xs uppercase tracking-widest text-ravetto-muted font-mono">
        Initializing Atelier Command Interface...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ravetto-offwhite py-12 sm:py-16 text-left">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 space-y-10">
        {/* Admin Header */}
        <div className="pb-8 border-b border-ravetto-border flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-800 text-[10px] uppercase font-mono tracking-widest font-bold mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Restricted Atelier Back-Office</span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl font-medium text-ravetto-text">
              Commerce Telemetry
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onNavigate('/')}
              className="px-4 py-2 border border-ravetto-border text-xs uppercase tracking-wider text-ravetto-text hover:bg-ravetto-offwhite-paper"
            >
              Return to Storefront
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-8 border-b border-ravetto-border text-xs uppercase tracking-[0.16em]">
          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`py-3 font-medium transition-colors ${
              activeAdminTab === 'analytics'
                ? 'text-ravetto-teal border-b-2 border-ravetto-teal font-bold'
                : 'text-ravetto-muted hover:text-ravetto-text'
            }`}
          >
            Live Analytics
          </button>
          <button
            onClick={() => setActiveAdminTab('inventory')}
            className={`py-3 font-medium transition-colors ${
              activeAdminTab === 'inventory'
                ? 'text-ravetto-teal border-b-2 border-ravetto-teal font-bold'
                : 'text-ravetto-muted hover:text-ravetto-text'
            }`}
          >
            Variant Inventory ({products.reduce((sum, p) => sum + p.variants.length, 0)})
          </button>
          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`py-3 font-medium transition-colors ${
              activeAdminTab === 'orders'
                ? 'text-ravetto-teal border-b-2 border-ravetto-teal font-bold'
                : 'text-ravetto-muted hover:text-ravetto-text'
            }`}
          >
            Order Dispatch Ledger ({orders.length})
          </button>
        </div>

        {/* TAB 1: ANALYTICS */}
        {activeAdminTab === 'analytics' && metrics && (
          <div className="space-y-10">
            {/* 4 Metric Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 bg-ravetto-offwhite-paper border border-ravetto-border space-y-2">
                <div className="flex justify-between items-center text-ravetto-muted">
                  <span className="text-[11px] uppercase tracking-wider font-mono">Gross Revenue</span>
                  <DollarSign className="w-4 h-4 text-ravetto-teal" />
                </div>
                <div className="font-editorial text-3xl font-bold text-ravetto-text">
                  ₹{metrics.totalRevenue.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-ravetto-teal font-mono">Real database transactions</span>
              </div>

              <div className="p-6 bg-ravetto-offwhite-paper border border-ravetto-border space-y-2">
                <div className="flex justify-between items-center text-ravetto-muted">
                  <span className="text-[11px] uppercase tracking-wider font-mono">Processed Orders</span>
                  <Package className="w-4 h-4 text-ravetto-teal" />
                </div>
                <div className="font-editorial text-3xl font-bold text-ravetto-text">
                  {metrics.totalOrders}
                </div>
                <span className="text-[10px] text-ravetto-muted font-mono">ACID committed orders</span>
              </div>

              <div className="p-6 bg-ravetto-offwhite-paper border border-ravetto-border space-y-2">
                <div className="flex justify-between items-center text-ravetto-muted">
                  <span className="text-[11px] uppercase tracking-wider font-mono">Average Order Value</span>
                  <DollarSign className="w-4 h-4 text-ravetto-teal" />
                </div>
                <div className="font-editorial text-3xl font-bold text-ravetto-text">
                  ₹{metrics.averageOrderValue.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-ravetto-muted font-mono">AOV metric</span>
              </div>

              <div className="p-6 bg-ravetto-offwhite-paper border border-ravetto-border space-y-2">
                <div className="flex justify-between items-center text-ravetto-muted">
                  <span className="text-[11px] uppercase tracking-wider font-mono">Client Accounts</span>
                  <Users className="w-4 h-4 text-ravetto-teal" />
                </div>
                <div className="font-editorial text-3xl font-bold text-ravetto-text">
                  {metrics.totalCustomers}
                </div>
                <span className="text-[10px] text-ravetto-muted font-mono">Registered clients</span>
              </div>
            </div>

            {/* Low Stock Alerts & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Low stock */}
              <div className="p-6 bg-ravetto-offwhite-paper border border-ravetto-border space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-ravetto-border">
                  <div className="flex items-center space-x-2 text-amber-800 text-xs font-semibold uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Variant Low Stock Warnings (&lt; 10 Units)</span>
                  </div>
                  <span className="font-mono text-xs bg-amber-100 text-amber-900 px-2 py-0.5 font-bold">
                    {metrics.lowStockCount}
                  </span>
                </div>

                {metrics.lowStockVariants.length > 0 ? (
                  <div className="divide-y divide-ravetto-border max-h-64 overflow-y-auto">
                    {metrics.lowStockVariants.map((v: any) => (
                      <div key={v.id} className="py-2.5 flex justify-between items-center text-xs">
                        <div>
                          <span className="font-medium text-ravetto-text">{v.product.name}</span>
                          <span className="text-ravetto-muted block text-[11px]">
                            {v.color.name} &bull; Size {v.size.code} ({v.sku})
                          </span>
                        </div>
                        <span className="font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 border border-red-200">
                          {v.stock} left
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-ravetto-muted py-6 text-center">
                    All product variants are well stocked.
                  </p>
                )}
              </div>

              {/* Top Selling Products */}
              <div className="p-6 bg-ravetto-offwhite-paper border border-ravetto-border space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-ravetto-border">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ravetto-text">
                    Top Garments by Volume
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-ravetto-muted">
                    Volume Ranking
                  </span>
                </div>

                <div className="divide-y divide-ravetto-border">
                  {metrics.topProducts.map((p, idx) => (
                    <div key={idx} className="py-3 flex justify-between items-center text-xs">
                      <div className="flex items-center space-x-3">
                        <span className="font-mono font-bold text-ravetto-teal text-sm">
                          0{idx + 1}
                        </span>
                        <div>
                          <span className="font-medium text-ravetto-text">{p.name}</span>
                          <span className="text-ravetto-muted block text-[11px]">
                            {p.quantity} units dispatched
                          </span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-ravetto-text">
                        ₹{p.revenue.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY MANAGEMENT */}
        {activeAdminTab === 'inventory' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-editorial text-2xl font-medium text-ravetto-text">
                Variant Stock Manager
              </h3>
              <span className="text-xs uppercase tracking-wider text-ravetto-muted font-mono">
                Updates directly update SQLite/Postgres inventory
              </span>
            </div>

            <div className="overflow-x-auto border border-ravetto-border bg-ravetto-offwhite-paper">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-ravetto-offwhite border-b border-ravetto-border text-[11px] uppercase tracking-wider text-ravetto-muted font-mono">
                    <th className="p-3.5">Garment</th>
                    <th className="p-3.5">SKU</th>
                    <th className="p-3.5">Color</th>
                    <th className="p-3.5">Size</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Current Stock</th>
                    <th className="p-3.5">Adjust Inventory</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ravetto-border">
                  {products.flatMap((prod) =>
                    prod.variants.map((v: any) => (
                      <tr key={v.id} className="hover:bg-ravetto-offwhite/50">
                        <td className="p-3.5 font-medium text-ravetto-text">{prod.name}</td>
                        <td className="p-3.5 font-mono text-[11px] text-ravetto-muted">{v.sku}</td>
                        <td className="p-3.5 flex items-center space-x-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{ backgroundColor: v.color.hexCode }}
                          />
                          <span>{v.color.name}</span>
                        </td>
                        <td className="p-3.5 font-mono font-bold">{v.size.code}</td>
                        <td className="p-3.5 font-mono">₹{v.price}</td>
                        <td className="p-3.5">
                          <span
                            className={`font-mono px-2 py-0.5 ${
                              v.stock < 10
                                ? 'bg-red-100 text-red-800 font-bold'
                                : 'bg-emerald-50 text-emerald-800 font-medium'
                            }`}
                          >
                            {v.stock} units
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              min="0"
                              defaultValue={v.stock}
                              onChange={(e) =>
                                setStockEditMap({
                                  ...stockEditMap,
                                  [v.id]: parseInt(e.target.value, 10) || 0,
                                })
                              }
                              className="w-20 bg-ravetto-offwhite border border-ravetto-border px-2 py-1 text-xs font-mono"
                            />
                            <Button
                              onClick={() => handleUpdateStock(v.id)}
                              disabled={isUpdatingStock === v.id}
                              variant="secondary"
                              size="sm"
                            >
                              {isUpdatingStock === v.id ? 'Saving' : 'Save'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS DISPATCH MANAGEMENT */}
        {activeAdminTab === 'orders' && (
          <div className="space-y-6">
            <h3 className="font-editorial text-2xl font-medium text-ravetto-text">
              Atelier Order Dispatch Console
            </h3>

            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="p-6 bg-ravetto-offwhite-paper border border-ravetto-border space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-ravetto-border gap-2">
                    <div>
                      <span className="font-mono text-sm font-bold text-ravetto-text">
                        ORDER #{order.orderNumber}
                      </span>
                      <span className="text-xs text-ravetto-muted block">
                        Customer: {order.shippingAddress?.fullName || 'Client'} &bull; Phone: {order.shippingAddress?.phone}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xs uppercase tracking-wider text-ravetto-muted font-mono">
                        Status:
                      </span>
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className="bg-ravetto-offwhite border border-ravetto-border text-xs font-bold text-ravetto-teal px-3 py-1.5 focus:outline-none"
                      >
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PACKED">PACKED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="OUT_FOR_DELIVERY">OUT_FOR_DELIVERY</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="font-semibold uppercase tracking-wider text-ravetto-muted text-[10px] block mb-1">
                        Garments Ordered
                      </span>
                      <ul className="space-y-1">
                        {(order.items || []).map((item: any) => (
                          <li key={item.id} className="text-ravetto-text">
                            &bull; {item.productName} ({item.colorName} / {item.sizeName}) &times; {item.quantity} = ₹{item.total}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="font-semibold uppercase tracking-wider text-ravetto-muted text-[10px] block mb-1">
                        Dispatch Destination
                      </span>
                      <p className="text-ravetto-muted">
                        {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
                      </p>
                      <p className="text-ravetto-muted font-mono text-[11px] mt-1">
                        Tracking: {order.trackingNumber || 'Pending Waybill'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
