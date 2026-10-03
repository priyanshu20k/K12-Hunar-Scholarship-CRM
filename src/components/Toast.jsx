import React from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export const ToastContainer = ({ toast, onDismiss }) => {
  if (!toast) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none max-w-xs w-full">
      <div className="pointer-events-auto flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border shadow-md text-xs font-medium bg-slate-900 text-white border-slate-800">
        <div className="flex items-center gap-1.5">
          {toast.type === 'error' ? (
            <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="text-slate-400 hover:text-white p-0.5"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};
