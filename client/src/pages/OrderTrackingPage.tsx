import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { OrderTimeline } from '../components/commerce/OrderTimeline';
import { Price } from '../components/ui/Price';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

interface OrderTrackingPageProps {
  orderIdOrNumber: string;
  onNavigate: (path: string) => void;
}

export const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ orderIdOrNumber, onNavigate }) => {
  const [order, setOrder] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        setIsLoading(true);
        const data = await api.getOrderById(orderIdOrNumber);
        setOrder(data);
      } catch {
        // Try track order public fallback
        try {
          const trackData = await api.trackOrder(orderIdOrNumber);
          setOrder(trackData);
        } catch (e) {
          console.error('Failed to load order tracking:', e);
        }
      } finally {
        setIsLoading(false);
      }
    }
    loadOrder();
  }, [orderIdOrNumber]);

  if (isLoading) {
    return (
      <div className="min-h-[70vh] py-32 text-center text-xs uppercase tracking-widest text-ravetto-muted font-mono">
        Consulting atelier logistics ledger...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-[70vh] py-32 text-center space-y-4">
        <h2 className="font-editorial text-3xl text-ravetto-text">Order #{orderIdOrNumber} Not Found</h2>
        <Button onClick={() => onNavigate('/account')} variant="primary" size="md">
          Return to Account
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ravetto-offwhite py-12 sm:py-20">
      <div className="max-w-[1080px] mx-auto px-6 sm:px-12 text-left space-y-10">
        {/* Top Back Link */}
        <div>
          <button
            onClick={() => onNavigate('/account')}
            className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-ravetto-muted hover:text-ravetto-text transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Account</span>
          </button>
        </div>

        {/* Visual Timeline Stepper */}
        <OrderTimeline
          orderNumber={order.orderNumber}
          status={order.status}
          trackingNumber={order.trackingNumber}
          estimatedDelivery={order.estimatedDelivery}
        />

        {/* Garments in this Order */}
        <div className="border border-ravetto-border bg-ravetto-offwhite-paper p-6 sm:p-8 space-y-6">
          <h3 className="font-editorial text-xl font-medium text-ravetto-text pb-4 border-b border-ravetto-border">
            Manifest Contents
          </h3>

          <div className="divide-y divide-ravetto-border">
            {(order.items || []).map((item: any) => (
              <div key={item.id} className="py-4 flex justify-between items-center text-xs">
                <div>
                  <h4 className="uppercase font-medium text-ravetto-text text-sm">
                    {item.productName}
                  </h4>
                  <p className="text-ravetto-muted text-[11px] mt-0.5">
                    {item.colorName} &bull; Size {item.sizeName} &bull; Qty {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <Price amount={item.total} size="sm" />
                </div>
              </div>
            ))}
          </div>

          {order.shippingAddress && (
            <div className="pt-6 border-t border-ravetto-border text-xs space-y-1 text-ravetto-muted">
              <span className="text-[10px] uppercase tracking-wider text-ravetto-text font-bold block mb-1">
                Dispatched To
              </span>
              <p className="font-medium text-ravetto-text">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
