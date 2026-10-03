import React from 'react';
import { Eye, Edit2, Trash2, ExternalLink, Calendar, Inbox } from 'lucide-react';

export const ScholarshipTable = ({
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
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold text-[11px]">
              <th className="py-3 px-4 sm:px-6">Scholarship</th>
              <th className="py-3 px-4">State</th>
              <th className="py-3 px-4">Class</th>
              <th className="py-3 px-4">Deadline</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 sm:px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3 px-4 sm:px-6">
                  <div className="font-semibold text-slate-900 text-sm">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {item.providerName}
                  </div>
                  {item.officialLink && (
                    <a
                      href={item.officialLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-indigo-600 hover:underline mt-0.5"
                    >
                      <span>Link</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </td>

                <td className="py-3 px-4 font-medium text-slate-700">
                  {item.state}
                </td>

                <td className="py-3 px-4">
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                    {item.applicableClass}
                  </span>
                </td>

                <td className="py-3 px-4 text-slate-700">
                  <div className="flex items-center gap-1.5 tabular-nums">
                    <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{item.deadline}</span>
                  </div>
                </td>

                {/* Status select dropdown */}
                <td className="py-3 px-4">
                  <select
                    value={item.status}
                    onChange={(e) => onChangeStatus(item.id, e.target.value)}
                    className={`text-xs font-semibold px-2 py-1 rounded-md border cursor-pointer focus:outline-none ${getBadgeStyle(
                      item.status
                    )}`}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Expired">Expired</option>
                  </select>
                </td>

                {/* Row actions */}
                <td className="py-3 px-4 sm:px-6 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onPreview(item)}
                      title="Preview student card"
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-md transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Preview</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      title="Edit"
                      className="p-1.5 text-slate-500 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item.id)}
                      title="Delete"
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};