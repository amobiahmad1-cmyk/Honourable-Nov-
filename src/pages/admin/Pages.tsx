import React from "react";
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, Plus, Edit2, Trash2, X } from 'lucide-react';

export function AdminPages() {
  const [pages, setPages] = useState<{id: string, title: string, status: string}[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('');

  const handleCreatePage = (e: React.FormEvent) => {
    e.preventDefault();
    if (pageTitle.trim() === '') return;
    setPages([...pages, { id: Date.now().toString(), title: pageTitle, status: 'Draft' }]);
    setPageTitle('');
    setIsModalOpen(false);
  };

  const handleDeletePage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this page?')) {
      setPages(pages.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-medium text-brand-black mb-1">Pages</h1>
          <p className="text-gray-500 text-sm">Manage standard pages on your website (e.g., About, Contact, Terms).</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-sm"
        >
          <Plus size={16} /> Create Page
        </button>
      </div>

      {pages.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-12 text-center flex flex-col items-center justify-center">
          <Layout size={48} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-playfair font-medium mb-2">No Custom Pages</h3>
          <p className="text-gray-500 text-sm max-w-md mb-6">Create additional pages for your store, such as a blog or size guide.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="border border-gray-200 px-6 py-3 rounded-lg font-medium hover:border-brand-navy hover:text-brand-navy transition-colors"
          >
            Create First Page
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Page Title</th>
                <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="py-3 px-6 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {pages.map(page => (
                <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-medium text-brand-black">{page.title}</td>
                  <td className="py-4 px-6 text-sm"><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{page.status}</span></td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-brand-navy transition-colors rounded hover:bg-gray-100"><Edit2 size={16} /></button>
                      <button onClick={() => handleDeletePage(page.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded hover:bg-red-50"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Page Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-xl z-50 overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="font-playfair text-xl font-medium text-brand-black">Create New Page</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-brand-navy transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleCreatePage} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Page Title</label>
                  <input 
                    type="text" 
                    required
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" 
                  />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 border border-gray-200 text-brand-black rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-opacity-90 transition-colors">
                    Create
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
