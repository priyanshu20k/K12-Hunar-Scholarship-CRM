import React from 'react';
import { Eye, Edit2, Trash2, Calendar, Building, ExternalLink, Inbox } from 'lucide-react';

export const ScholarshipCardGrid = ({
  items,
  onChangeStatus,
  onEdit,
  onDelete,
  onPreview,
}) => {
  if (items.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
        <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
        <h3 className="text-sm font-semibold text-slate-700">No scholarships found</h3>
        <p className="text-xs text-slate-500 mt-1">Try clearing your filters or search query.</p>
      </div>
    );
  }

  const getBadgeStyle = (status) => {
    if (status === 'Published') return 'text-emerald-700 bg-emerald-50 border-emerald-200';
    if (status === 'Draft') return 'text-amber-700 bg-amber-50 border-amber-200';
    return 'text-rose-700 bg-rose-50 border-rose-200';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-xs transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">
                {item.state}
              </span>

              <select
                value={item.status}
                onChange={(e) => onChangeStatus(item.id, e.target.value)}
                className={`text-xs font-semibold px-2 py-0.5 rounded border cursor-pointer focus:outline-none ${getBadgeStyle(
                  item.status
                )}`}
              >
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Expired">Expired</option>
              </select>
            </div>

            <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
              {item.name}
            </h3>
            <div className="flex items-start gap-1 text-xs text-slate-500 mb-3">
              <Building className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
              <span className="line-clamp-2">{item.providerName}</span>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-100 text-xs text-slate-600 mb-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Class:</span>
                <span className="font-medium text-slate-700">{item.applicableClass}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Deadline:</span>
                <span className="font-medium text-slate-700 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  {item.deadline}
                </span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-slate-400 shrink-0">Benefit:</span>
                <span className="text-right line-clamp-1 font-medium text-slate-700">
                  {item.amountBenefit}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => onPreview(item)}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview Card</span>
            </button>

            <div className="flex items-center gap-1">
              {item.officialLink && (
                <a
                  href={item.officialLink}
                  target="_blank"
                  rel="noreferrer"
                  title="Official portal"
                  className="p-1.5 text-slate-400 hover:text-indigo-600 rounded"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                type="button"
                onClick={() => onEdit(item)}
                title="Edit"
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-50 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                title="Delete"
                className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};