import React from 'react';
import { Check } from 'lucide-react';

interface OrderTimelineProps {
  orderNumber: string;
  status: 'CONFIRMED' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({
  orderNumber,
  status,
  trackingNumber,
  estimatedDelivery,
}) => {
  const steps = [
    { key: 'CONFIRMED', label: 'Confirmed' },
    { key: 'PACKED', label: 'Packed' },
    { key: 'SHIPPED', label: 'Shipped' },
    { key: 'OUT_FOR_DELIVERY', label: 'Out for Delivery' },
    { key: 'DELIVERED', label: 'Delivered' },
  ];

  const currentIdx = steps.findIndex((s) => s.key === status);
  const activeIndex = currentIdx === -1 ? 0 : currentIdx;

  return (
    <div className="border border-ravetto-border bg-ravetto-offwhite-paper/60 p-6 sm:p-8 space-y-6 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-ravetto-border gap-2">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-ravetto-muted font-mono block">
            Order Status
          </span>
          <h3 className="text-base font-mono font-medium text-ravetto-text mt-0.5">
            ORDER #{orderNumber}
          </h3>
        </div>

        {estimatedDelivery && (
          <div className="text-left sm:text-right">
            <span className="text-[10px] uppercase tracking-[0.2em] text-ravetto-muted font-mono block">
              Estimated Arrival
            </span>
            <span className="text-xs font-medium text-ravetto-teal">
              {new Date(estimatedDelivery).toLocaleDateString('en-IN', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
              })}
            </span>
          </div>
        )}
      </div>

      {/* Stepper Bar */}
      <div className="relative py-4">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-ravetto-border z-0 hidden sm:block" />
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-ravetto-teal z-0 transition-all duration-700 hidden sm:block"
          style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
          {steps.map((step, idx) => {
            const isCompleted = idx < activeIndex;
            const isCurrent = idx === activeIndex;

            return (
              <div
                key={step.key}
                className="flex sm:flex-col items-center sm:items-center space-x-3 sm:space-x-0 sm:text-center group"
              >
                {/* Bullet */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    isCompleted
                      ? 'bg-ravetto-teal text-white'
                      : isCurrent
                      ? 'bg-ravetto-teal text-white ring-4 ring-ravetto-mint/40'
                      : 'bg-ravetto-offwhite border border-ravetto-border text-transparent'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : isCurrent ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  ) : null}
                </div>

                {/* Label */}
                <span
                  className={`text-xs uppercase tracking-[0.14em] sm:mt-2.5 ${
                    isCurrent
                      ? 'font-bold text-ravetto-teal'
                      : isCompleted
                      ? 'font-medium text-ravetto-text'
                      : 'text-ravetto-muted'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tracking Note */}
      {trackingNumber && (
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-ravetto-muted border-t border-ravetto-border/60">
          <span>Carrier: Bluedart Air Express</span>
          <span className="font-mono">Waybill: {trackingNumber}</span>
        </div>
      )}
    </div>
  );
};
