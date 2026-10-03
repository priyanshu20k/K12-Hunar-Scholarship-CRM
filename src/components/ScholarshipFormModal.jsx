import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';

export const ScholarshipFormModal = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const defaultForm = {
    name: '',
    state: 'Bihar',
    providerName: '',
    applicableClass: 'Class 9-10',
    eligibilityCriteria: '',
    amountBenefit: '',
    deadline: '30 Sep 2026',
    officialLink: 'https://',
    status: 'Draft',
  };

  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState({});
  const [noDeadline, setNoDeadline] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
      setNoDeadline(initialData.deadline?.toLowerCase() === 'not stated');
    } else {
      setForm(defaultForm);
      setNoDeadline(false);
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Please enter a scholarship name';
    if (!form.state) newErrors.state = 'Please pick a state';
    if (!form.providerName.trim()) newErrors.providerName = 'Please enter provider or department name';
    if (!form.applicableClass) newErrors.applicableClass = 'Please select a class';
    if (!form.eligibilityCriteria.trim()) newErrors.eligibilityCriteria = 'Please describe who is eligible';
    if (!form.amountBenefit.trim()) newErrors.amountBenefit = 'Please enter the amount or scholarship benefit';
    if (!noDeadline && !form.deadline.trim()) newErrors.deadline = 'Please enter a deadline date';

    if (!form.officialLink.trim()) {
      newErrors.officialLink = 'Please provide the application portal URL';
    } else if (!form.officialLink.startsWith('http://') && !form.officialLink.startsWith('https://')) {
      newErrors.officialLink = 'Link should start with https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      ...form,
      deadline: noDeadline ? 'Not stated' : form.deadline.trim(),
    }, initialData?.id);

    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
    >
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {isEditing ? 'Edit Scholarship' : 'Add New Scholarship'}
            </h2>
            <p className="text-xs text-slate-500">
              Fill in the 9 fields required for the CRM demo.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSubmit}>
          <div className="p-5 space-y-3.5 max-h-[72vh] overflow-y-auto text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Scholarship Name *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Post-Matric Scholarship BC EBC"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.name && <p className="text-rose-500 mt-1">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  State *
                </label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Bihar">Bihar</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Jharkhand">Jharkhand</option>
                </select>
                {errors.state && <p className="text-rose-500 mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Applicable Class *
                </label>
                <select
                  name="applicableClass"
                  value={form.applicableClass}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                >
                  <option value="Class 1-10">Class 1-10</option>
                  <option value="Class 9-10">Class 9-10</option>
                  <option value="Class 11-12">Class 11-12</option>
                  <option value="UG (Undergraduate)">UG (Undergraduate)</option>
                  <option value="PG (Postgraduate)">PG (Postgraduate)</option>
                </select>
                {errors.applicableClass && <p className="text-rose-500 mt-1">{errors.applicableClass}</p>}
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Provider Name *
              </label>
              <input
                type="text"
                name="providerName"
                value={form.providerName}
                onChange={handleChange}
                placeholder="e.g. Education Department, Government of Bihar"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.providerName && <p className="text-rose-500 mt-1">{errors.providerName}</p>}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Eligibility Criteria *
              </label>
              <textarea
                rows={2}
                name="eligibilityCriteria"
                value={form.eligibilityCriteria}
                onChange={handleChange}
                placeholder="Who can apply? Domicile, caste category, income limit..."
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.eligibilityCriteria && <p className="text-rose-500 mt-1">{errors.eligibilityCriteria}</p>}
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Scholarship Amount or Benefit *
              </label>
              <input
                type="text"
                name="amountBenefit"
                value={form.amountBenefit}
                onChange={handleChange}
                placeholder="e.g. Up to ₹15,000/year reimbursement"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.amountBenefit && <p className="text-rose-500 mt-1">{errors.amountBenefit}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-slate-700">
                    Application Deadline *
                  </label>
                  <label className="text-[11px] text-slate-500 flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={noDeadline}
                      onChange={(e) => setNoDeadline(e.target.checked)}
                      className="rounded text-indigo-600"
                    />
                    <span>Not stated</span>
                  </label>
                </div>
                <input
                  type="text"
                  name="deadline"
                  disabled={noDeadline}
                  value={noDeadline ? 'Not stated' : form.deadline}
                  onChange={handleChange}
                  placeholder="e.g. 30 Sep 2026"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg disabled:bg-slate-100 disabled:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                {errors.deadline && <p className="text-rose-500 mt-1">{errors.deadline}</p>}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Status *
                </label>
                <div className="flex gap-1.5 pt-0.5">
                  {['Published', 'Draft', 'Expired'].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, status: s }))}
                      className={`flex-1 py-2 text-center rounded-lg border text-xs cursor-pointer transition-colors ${
                        form.status === s
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 font-semibold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Official Application Link *
              </label>
              <input
                type="url"
                name="officialLink"
                value={form.officialLink}
                onChange={handleChange}
                placeholder="https://pmsonline.bih.nic.in"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.officialLink && <p className="text-rose-500 mt-1">{errors.officialLink}</p>}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-2 px-5 py-3.5 bg-slate-50 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs text-slate-600 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Save Changes' : 'Add Scholarship'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};