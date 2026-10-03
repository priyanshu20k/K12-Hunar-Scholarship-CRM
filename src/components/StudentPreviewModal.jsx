import React, { useState } from 'react';
import { X, ExternalLink, Calendar, Award, Building, CheckCircle, Bookmark, Share2, Check } from 'lucide-react';

export const StudentPreviewModal = ({ scholarship, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!scholarship) return null;

  const handleCopy = () => {
    if (scholarship.officialLink) {
      navigator.clipboard.writeText(scholarship.officialLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isExpired = scholarship.status === 'Expired';
  const isDraft = scholarship.status === 'Draft';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl overflow-hidden">
        {/* Preview banner for employee */}
        <div className="bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs">
          <span className="text-slate-300">
            Student Preview &bull; k12hunar.com/scholarships
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Status banner if draft or expired */}
        {isDraft && (
          <div className="bg-amber-50 px-4 py-1.5 text-xs text-amber-800 border-b border-amber-200">
            Draft Mode: This scholarship is currently not shown on the public student website.
          </div>
        )}
        {isExpired && (
          <div className="bg-rose-50 px-4 py-1.5 text-xs text-rose-800 border-b border-rose-200">
            Expired: The deadline for this cycle has passed.
          </div>
        )}

        {/* Card content */}
        <div className="p-5 max-h-[75vh] overflow-y-auto text-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded">
                {scholarship.state}
              </span>
              <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                {scholarship.applicableClass}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSaved(!saved)}
                title="Bookmark"
                className={`p-1.5 border rounded-md ${saved ? 'border-indigo-500 bg-indigo-50 text-indigo-600' : 'border-slate-200 text-slate-400'}`}
              >
                <Bookmark className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleCopy}
                title="Copy portal link"
                className="p-1.5 border border-slate-200 text-slate-400 hover:text-slate-700 rounded-md"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-snug mb-1">
              {scholarship.name}
            </h1>
            <div className="flex items-center gap-1.5 text-slate-500">
              <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{scholarship.providerName}</span>
            </div>
          </div>

          {/* Amount and deadline box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <span className="text-[11px] text-slate-400 block mb-0.5">Benefit / Award</span>
              <div className="font-bold text-slate-800 flex items-center gap-1">
                <Award className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>{scholarship.amountBenefit}</span>
              </div>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block mb-0.5">Application Deadline</span>
              <div className="font-semibold text-slate-700 flex items-center gap-1">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{scholarship.deadline}</span>
              </div>
            </div>
          </div>

          {/* Eligibility */}
          <div>
            <h2 className="font-bold text-slate-800 mb-1.5 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span>Eligibility Details</span>
            </h2>
            <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-slate-700 leading-relaxed">
              {scholarship.eligibilityCriteria}
            </div>
          </div>

          {/* Documents checklist */}
          <div>
            <h2 className="font-bold text-slate-800 mb-1.5">Documents Needed by Students</h2>
            <div className="grid grid-cols-2 gap-1.5 text-slate-600">
              <div className="bg-white border border-slate-200 rounded p-2">&bull; Student Aadhaar Card</div>
              <div className="bg-white border border-slate-200 rounded p-2">&bull; State Domicile Certificate</div>
              <div className="bg-white border border-slate-200 rounded p-2">&bull; Income &amp; Caste Certificate</div>
              <div className="bg-white border border-slate-200 rounded p-2">&bull; Bank Passbook Copy</div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
            >
              Close
            </button>

            <a
              href={scholarship.officialLink}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg text-white ${
                isExpired
                  ? 'bg-slate-300 pointer-events-none'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              <span>{isExpired ? 'Application Closed' : 'Apply on Official Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};