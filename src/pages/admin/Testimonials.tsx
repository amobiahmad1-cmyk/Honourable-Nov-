import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Plus, X, Edit2, Trash2, Quote } from 'lucide-react';

export function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<{id: string, name: string, content: string, rating: number}[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    
    setTestimonials([...testimonials, {
      id: Date.now().toString(),
      name,
      content,
      rating
    }]);
    
    setIsModalOpen(false);
    setName('');
    setContent('');
    setRating(5);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this testimonial?')) {
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-medium text-brand-black mb-1">Testimonials</h1>
          <p className="text-gray-500 text-sm">Manage customer reviews and feedback displayed on your site.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-sm"
        >
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-12 text-center flex flex-col items-center justify-center">
          <Star size={48} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-playfair font-medium mb-2">No Testimonials Yet</h3>
          <p className="text-gray-500 text-sm max-w-md mb-6">Add customer reviews to build trust and show off your premium service.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="border border-gray-200 px-6 py-3 rounded-lg font-medium hover:border-brand-navy hover:text-brand-navy transition-colors"
          >
            Add First Testimonial
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative group">
              <Quote size={24} className="text-gray-200 absolute top-6 right-6" />
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className={i < t.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <p className="text-gray-600 text-sm italic mb-4 line-clamp-4">"{t.content}"</p>
              <div className="flex justify-between items-end">
                <p className="font-semibold text-sm uppercase tracking-wider">{t.name}</p>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 rounded"><Trash2 size={14}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Testimonial Modal */}
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
                <h3 className="font-playfair text-xl font-medium text-brand-black">Add Testimonial</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-brand-navy transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddTestimonial} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Customer Name</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Review Content</label>
                  <textarea 
                    required
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none resize-none" 
                  ></textarea>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Rating</label>
                  <select 
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none bg-white"
                  >
                    {[5,4,3,2,1].map(num => (
                      <option key={num} value={num}>{num} Stars</option>
                    ))}
                  </select>
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 border border-gray-200 text-brand-black rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-opacity-90 transition-colors">
                    Add
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
