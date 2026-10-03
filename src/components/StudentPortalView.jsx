import React, { useState } from 'react';
import { Search, MapPin, Award, Calendar, ArrowRight, BookOpen } from 'lucide-react';

export const StudentPortalView = ({
  scholarships,
  onPreview,
  onBackToCrm,
}) => {
  const [stateFilter, setStateFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [search, setSearch] = useState('');

  // students only see published scholarships
  const publishedList = scholarships.filter((s) => s.status === 'Published');

  const filtered = publishedList.filter((item) => {
    const matchesState = stateFilter === 'All' || item.state === stateFilter;
    const matchesClass = classFilter === 'All' || item.applicableClass === classFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.providerName.toLowerCase().includes(search.toLowerCase());

    return matchesState && matchesClass && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      {/* Top Banner */}
      <div className="bg-indigo-900 text-white py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider block mb-1">
              K12 Hunar Student Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold mb-1">
              Explore Available Scholarships
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200">
              Government school scholarships for students in Bihar, Haryana, and Jharkhand.
            </p>
          </div>

          <button
            type="button"
            onClick={onBackToCrm}
            className="self-start md:self-auto text-xs font-semibold bg-white text-indigo-900 px-3.5 py-2 rounded-lg hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            Back to Employee CRM &rarr;
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-4">
        {/* Search & Filters */}
        <div className="bg-white rounded-xl shadow-xs border border-slate-200 p-3.5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
            <div className="md:col-span-6 relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search scholarship name..."
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
              >
                <option value="All">All States</option>
                <option value="Bihar">Bihar</option>
                <option value="Haryana">Haryana</option>
                <option value="Jharkhand">Jharkhand</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 cursor-pointer"
              >
                <option value="All">All Classes &amp; Degrees</option>
                <option value="Class 1-10">Class 1-10</option>
                <option value="Class 9-10">Class 9-10</option>
                <option value="Class 11-12">Class 11-12</option>
                <option value="UG (Undergraduate)">UG (Undergraduate)</option>
                <option value="PG (Postgraduate)">PG (Postgraduate)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Scholarships grid */}
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
            <BookOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500">No active scholarships found for this filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col justify-between hover:border-indigo-200 hover:shadow-xs transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                      <MapPin className="w-3 h-3" />
                      {item.state}
                    </span>
                    <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {item.applicableClass}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mb-2.5">
                    {item.providerName}
                  </p>

                  <div className="bg-slate-50 rounded-lg p-2 mb-3 text-xs flex justify-between">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-indigo-600" />
                      Benefit:
                    </span>
                    <span className="font-semibold text-slate-800 line-clamp-1 max-w-[65%]">
                      {item.amountBenefit}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>{item.deadline}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onPreview(item)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};