import React from 'react';
import { CheckCircle2, Clock, AlertTriangle, Layers } from 'lucide-react';

export const SummaryCards = ({ list, activeFilter, onSelectFilter }) => {
  // calculate counts from the list
  const total = list.length;
  const published = list.filter((item) => item.status === 'Published').length;
  const draft = list.filter((item) => item.status === 'Draft').length;
  const expired = list.filter((item) => item.status === 'Expired').length;

  const cards = [
    {
      id: 'All',
      title: 'Total',
      count: total,
      icon: Layers,
      iconColor: 'text-slate-600',
      activeClass: 'border-slate-800 bg-slate-50 ring-1 ring-slate-800',
    },
    {
      id: 'Published',
      title: 'Published',
      count: published,
      icon: CheckCircle2,
      iconColor: 'text-emerald-600',
      activeClass: 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600',
    },
    {
      id: 'Draft',
      title: 'Draft',
      count: draft,
      icon: Clock,
      iconColor: 'text-amber-600',
      activeClass: 'border-amber-500 bg-amber-50/60 ring-1 ring-amber-500',
    },
    {
      id: 'Expired',
      title: 'Expired',
      count: expired,
      icon: AlertTriangle,
      iconColor: 'text-rose-600',
      activeClass: 'border-rose-600 bg-rose-50/60 ring-1 ring-rose-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        const isSelected = activeFilter === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectFilter(card.id)}
            className={`p-4 rounded-xl border text-left transition-all bg-white cursor-pointer ${
              isSelected ? card.activeClass : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium text-slate-500">
                {card.title}
              </span>
              <Icon className={`w-4 h-4 ${card.iconColor}`} />
            </div>

            <div className="flex items-baseline justify-between">
              <span className="text-2xl sm:text-3xl font-bold text-slate-800 tabular-nums">
                {card.count}
              </span>
              <span className="text-[11px] text-slate-400">
                {isSelected ? 'Filtered' : 'Click to filter'}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
