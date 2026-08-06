import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'motion/react';
import { Image as ImageIcon, Link as LinkIcon, Trash2, Plus, X } from 'lucide-react';
import { supabase } from "../../lib/supabase";

export function AdminMedia() {
  const [media, setMedia] = useState<{id: string, name: string, url: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaName, setNewMediaName] = useState('');

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data, error } = await supabase.from('media').select('*');
        if (error) throw error;
        if (data) setMedia(data);
      } catch (err) {
        console.error("Error fetching media:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMedia();
  }, []);

  const handleAddMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl) return;

    const newMedia = {
      id: Date.now().toString(),
      name: newMediaName || 'Untitled Media',
      url: newMediaUrl
    };
    
    setMedia(prev => [...prev, newMedia]);
    setNewMediaUrl('');
    setNewMediaName('');
    setIsModalOpen(false);

    try {
      const { error } = await supabase.from('media').insert([newMedia]);
      if (error) console.error("Error saving media:", error);
    } catch (err) {}
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this media?")) {
      setMedia(prev => prev.filter(m => m.id !== id));
      try {
        const { error } = await supabase.from('media').delete().eq('id', id);
        if (error) console.error("Error deleting media:", error);
      } catch (err) {}
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-20 relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-playfair text-3xl font-medium text-brand-black mb-1">Media Library</h1>
          <p className="text-gray-500 text-sm">Manage all image and video links used on the website.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-sm"
        >
          <LinkIcon size={16} /> Add Media Link
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-500">Loading media...</div>
      ) : media.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-12 text-center flex flex-col items-center justify-center">
          <ImageIcon size={48} className="text-gray-300 mb-4" />
          <h3 className="text-xl font-playfair font-medium mb-2">Media Library Empty</h3>
          <p className="text-gray-500 text-sm max-w-md mb-6">Add image or video URLs to use across your website's pages and products.</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="border border-gray-200 px-6 py-3 rounded-lg font-medium hover:border-brand-navy hover:text-brand-navy transition-colors"
          >
            Add New Link
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map(m => (
            <div key={m.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm group relative">
              <div className="aspect-square bg-gray-100 relative">
                {m.url.includes('youtube.com') || m.url.includes('youtu.be') || m.url.match(/\.(mp4|webm|ogg)$/i) ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 text-xs uppercase font-semibold">Video Link</div>
                ) : (
                  <img src={m.url} alt={m.name} className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => handleDelete(m.id)} className="p-2 bg-white text-red-500 rounded-full hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-brand-black truncate" title={m.name}>{m.name}</p>
                <p className="text-[10px] text-gray-500 truncate" title={m.url}>{m.url}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Media Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100">
                <h3 className="font-playfair text-xl font-medium">Add Media Link</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-brand-black transition-colors">
                  <X size={20} />
                </button>
              </div>
              <form onSubmit={handleAddMedia} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Media URL</label>
                  <input 
                    type="url" 
                    required 
                    value={newMediaUrl} 
                    onChange={e => setNewMediaUrl(e.target.value)} 
                    placeholder="https://example.com/image.jpg"
                    className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Name / Description (Optional)</label>
                  <input 
                    type="text" 
                    value={newMediaName} 
                    onChange={e => setNewMediaName(e.target.value)} 
                    placeholder="e.g. Summer Collection Hero"
                    className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" 
                  />
                </div>
                <div className="pt-4 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button type="submit" className="bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider hover:bg-opacity-90 transition-colors">
                    Add Link
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
