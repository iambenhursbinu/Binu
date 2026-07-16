import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X, Info } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info';
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export default function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onRemove }: { key?: string; toast: ToastMessage; onRemove: (id: string) => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 30, scale: 0.95, transition: { duration: 0.2 } }}
      className="pointer-events-auto w-full glass-panel p-4 rounded-xl shadow-lg flex items-start gap-3 border-l-4 border-l-neon-cyan glow-cyan"
    >
      <div className="mt-0.5 shrink-0">
        {toast.type === 'success' ? (
          <CheckCircle className="w-5 h-5 text-neon-cyan" />
        ) : (
          <Info className="w-5 h-5 text-neon-sapphire" />
        )}
      </div>
      <div className="flex-1">
        <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider">
          {toast.type === 'success' ? 'Operation Success' : 'System Alert'}
        </h4>
        <p className="text-gray-300 text-xs mt-1 font-sans">{toast.message}</p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-gray-500 hover:text-white transition-colors p-1"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
