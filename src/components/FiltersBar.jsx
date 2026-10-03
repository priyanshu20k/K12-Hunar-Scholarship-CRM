import React from 'react';
import { Search, Plus, X, LayoutGrid, ListFilter } from 'lucide-react';

export const FiltersBar = ({
  selectedState,
  setSelectedState,
  selectedStatus,
  setSelectedStatus,
  search,
  setSearch,
  view,
  setView,
  onAddClick,
  matchCount,
  totalCount,
  onClearFilters,
}) => {
  const states = ['All', 'Bihar', 'Haryana', 'Jharkhand'];
  const statuses = ['All', 'Published', 'Draft', 'Expired'];

  const hasFilter = selectedState !== 'All' || selectedStatus !== 'All' || search.trim() !== '';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 mb-5 shadow-2xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* State and Status filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
              State:
            </span>
            <div className="inline-flex p-1 bg-slate-100 rounded-lg">
              {states.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedState(st)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    selectedState === st
                      ? 'bg-white text-slate-900 shadow-2xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {st === 'All' ? 'All States' : st}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
              Status:
            </span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-medium bg-slate-100 rounded-lg text-slate-700 cursor-pointer focus:outline-none"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Statuses' : s}
                </option>
              ))}
            </select>
          </div>

          {hasFilter && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-rose-600 px-2 py-1 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>

        {/* Search, view switcher, and Add button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or class..."
              className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="inline-flex p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => setView('table')}
              title="Table view"
              className={`p-1.5 rounded-md cursor-pointer ${
                view === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setView('cards')}
              title="Card view"
              className={`p-1.5 rounded-md cursor-pointer ${
                view === 'cards' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={onAddClick}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Scholarship</span>
          </button>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-700">{matchCount}</span> of{' '}
          <span className="font-semibold text-slate-700">{totalCount}</span> scholarships
        </div>
        <span className="text-[11px] text-slate-400">Employee mode: edit status or details anytime</span>
      </div>
    </div>
  );
};