import React, { useState, useEffect, useMemo } from 'react';
import { initialData } from './data/initialScholarships.js';
import { Header } from './components/Header.jsx';
import { SummaryCards } from './components/SummaryCards.jsx';
import { FiltersBar } from './components/FiltersBar.jsx';
import { ScholarshipTable } from './components/ScholarshipTable.jsx';
import { ScholarshipCardGrid } from './components/ScholarshipCardGrid.jsx';
import { ScholarshipFormModal } from './components/ScholarshipFormModal.jsx';
import { StudentPreviewModal } from './components/StudentPreviewModal.jsx';
import { StudentPortalView } from './components/StudentPortalView.jsx';
import { ToastContainer } from './components/Toast.jsx';

export default function App() {
  // load saved data or fall back to the initial 9 records
  const [scholarships, setScholarships] = useState(() => {
    try {
      const saved = localStorage.getItem('k12_scholarships');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.log('Using initial sample data');
    }
    return initialData;
  });

  // current tab: 'admin' (CRM view) or 'student' (Student portal view)
  const [currentTab, setCurrentTab] = useState('admin');

  // filter states
  const [selectedState, setSelectedState] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [view, setView] = useState('table'); // 'table' or 'cards'

  // modals
  const [previewItem, setPreviewItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // toast notification
  const [toast, setToast] = useState(null);

  // persist to localStorage whenever scholarships change
  useEffect(() => {
    try {
      localStorage.setItem('k12_scholarships', JSON.stringify(scholarships));
    } catch (e) {
      console.error(e);
    }
  }, [scholarships]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Change status of a scholarship
  const changeStatus = (id, newStatus) => {
    setScholarships((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    showToast(`Status changed to ${newStatus}`);
  };

  // Add or edit a scholarship
  const saveScholarship = (formData, existingId) => {
    if (existingId) {
      setScholarships((prev) =>
        prev.map((item) => (item.id === existingId ? { ...item, ...formData } : item))
      );
      showToast(`Updated "${formData.name}"`);
    } else {
      const newItem = {
        ...formData,
        id: String(Date.now()),
      };
      setScholarships((prev) => [newItem, ...prev]);
      showToast(`Added "${formData.name}"`);
    }
  };

  // Delete scholarship
  const deleteScholarship = (id) => {
    const item = scholarships.find((s) => s.id === id);
    if (!item) return;

    if (window.confirm(`Delete "${item.name}"?`)) {
      setScholarships((prev) => prev.filter((s) => s.id !== id));
      showToast(`Deleted "${item.name}"`, 'info');
    }
  };

  // Reset back to original test records
  const resetData = () => {
    setScholarships(initialData);
    setSelectedState('All');
    setSelectedStatus('All');
    setSearch('');
    showToast('Reset data back to original records');
  };

  const clearFilters = () => {
    setSelectedState('All');
    setSelectedStatus('All');
    setSearch('');
  };

  // Filter scholarships based on state, status, and search query
  const filteredList = useMemo(() => {
    return scholarships.filter((item) => {
      const matchState = selectedState === 'All' || item.state === selectedState;
      const matchStatus = selectedStatus === 'All' || item.status === selectedStatus;
      const query = search.trim().toLowerCase();
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.providerName.toLowerCase().includes(query) ||
        item.applicableClass.toLowerCase().includes(query);

      return matchState && matchStatus && matchSearch;
    });
  }, [scholarships, selectedState, selectedStatus, search]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onResetData={resetData}
      />

      {currentTab === 'student' ? (
        <StudentPortalView
          scholarships={scholarships}
          onPreview={(item) => setPreviewItem(item)}
          onBackToCrm={() => setCurrentTab('admin')}
        />
      ) : (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                Scholarship Dashboard
              </h1>
              <p className="text-xs text-slate-500">
                Manage scholarships for Bihar, Haryana, and Jharkhand.
              </p>
            </div>
            <span className="text-xs text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md self-start sm:self-auto">
              Tip: Click any status badge in the table to change it
            </span>
          </div>

          <SummaryCards
            list={scholarships}
            activeFilter={selectedStatus}
            onSelectFilter={(status) => setSelectedStatus(status)}
          />

          <FiltersBar
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            search={search}
            setSearch={setSearch}
            view={view}
            setView={setView}
            onAddClick={() => {
              setEditingItem(null);
              setShowForm(true);
            }}
            matchCount={filteredList.length}
            totalCount={scholarships.length}
            onClearFilters={clearFilters}
          />

          {view === 'table' ? (
            <ScholarshipTable
              items={filteredList}
              onChangeStatus={changeStatus}
              onEdit={(item) => {
                setEditingItem(item);
                setShowForm(true);
              }}
              onDelete={deleteScholarship}
              onPreview={(item) => setPreviewItem(item)}
            />
          ) : (
            <ScholarshipCardGrid
              items={filteredList}
              onChangeStatus={changeStatus}
              onEdit={(item) => {
                setEditingItem(item);
                setShowForm(true);
              }}
              onDelete={deleteScholarship}
              onPreview={(item) => setPreviewItem(item)}
            />
          )}
        </main>
      )}

      <footer className="border-t border-slate-200 bg-white py-4 mt-auto text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>&copy; {new Date().getFullYear()} K12 Hunar &bull; Scholarship Management System</span>
          <span className="text-slate-400">Bihar &bull; Haryana &bull; Jharkhand</span>
        </div>
      </footer>

      {/* Add / Edit Form Modal */}
      <ScholarshipFormModal
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSave={saveScholarship}
        initialData={editingItem}
      />

      {/* Student Card Preview Modal */}
      <StudentPreviewModal
        scholarship={previewItem}
        onClose={() => setPreviewItem(null)}
      />

      <ToastContainer toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}