import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../stores/uiStore';
import { Check, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useUIStore();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto bg-ravetto-teal text-white p-4 shadow-xl border border-ravetto-teal-light flex items-center justify-between space-x-3 text-xs tracking-wide"
          >
            <div className="flex items-center space-x-2.5">
              {toast.type === 'success' && <Check className="w-4 h-4 text-ravetto-mint" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-300" />}
              {toast.type === 'info' && <Info className="w-4 h-4 text-ravetto-mint" />}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-white/60 hover:text-white p-1"
              aria-label="Dismiss toast"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
