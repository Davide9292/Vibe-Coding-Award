'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);

    // Auto remove after duration (default 5 seconds)
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-none">
      <div className="flex flex-col gap-3">
        {toasts.map(toast => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };

  const colors = {
    success: {
      bg: 'bg-white',
      border: 'border-green-400',
      icon: 'text-green-500',
      title: 'text-gray-900',
      message: 'text-gray-600',
    },
    error: {
      bg: 'bg-white',
      border: 'border-red-400',
      icon: 'text-red-500',
      title: 'text-gray-900',
      message: 'text-gray-600',
    },
    warning: {
      bg: 'bg-white',
      border: 'border-orange-400',
      icon: 'text-orange-500',
      title: 'text-gray-900',
      message: 'text-gray-600',
    },
    info: {
      bg: 'bg-white',
      border: 'border-blue-400',
      icon: 'text-blue-500',
      title: 'text-gray-900',
      message: 'text-gray-600',
    },
  };

  const Icon = icons[toast.type];
  const colorClasses = colors[toast.type];

  return (
    <div 
      className={`
        pointer-events-auto min-w-[320px] max-w-md ${colorClasses.bg} ${colorClasses.border} 
        border-l-4 rounded-lg shadow-lg backdrop-blur-sm
        transform transition-all duration-300 ease-out
        animate-in slide-in-from-right-5 fade-in-0
      `}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Icon className={`h-5 w-5 ${colorClasses.icon}`} />
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold ${colorClasses.title} leading-tight`}>
              {toast.title}
            </p>
            {toast.message && (
              <p className={`mt-1 text-sm ${colorClasses.message} leading-relaxed`}>
                {toast.message}
              </p>
            )}
          </div>
          <button
            className={`flex-shrink-0 ml-2 ${colorClasses.message} hover:text-gray-900 transition-colors rounded-md p-1 hover:bg-gray-100`}
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Utility functions for common toast types
export const toast = {
  success: (title: string, message?: string, duration?: number) => ({
    type: 'success' as const,
    title,
    message,
    duration,
  }),
  error: (title: string, message?: string, duration?: number) => ({
    type: 'error' as const,
    title,
    message,
    duration,
  }),
  warning: (title: string, message?: string, duration?: number) => ({
    type: 'warning' as const,
    title,
    message,
    duration,
  }),
  info: (title: string, message?: string, duration?: number) => ({
    type: 'info' as const,
    title,
    message,
    duration,
  }),
}; 