const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/ContentManager.tsx', 'utf8');

// The file is complex. Let's just rewrite the whole file for safety and speed.
fs.writeFileSync('src/pages/admin/ContentManager.tsx', `
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Layout, Type, ImageIcon, Plus, Trash2, X, CheckCircle2 } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export function AdminContentManager() {
  const { content, updateContent } = useContent();
  const [activeTab, setActiveTab] = useState('home');
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Local state for edits
  const [homeData, setHomeData] = useState(content.home);
  const [aboutData, setAboutData] = useState(content.about);
  const [contactData, setContactData] = useState(content.contact);
  const [faqData, setFaqData] = useState(content.faq);

  const tabs = [
    { id: 'home', label: 'Home Page' },
    { id: 'about', label: 'About Page' },
    { id: 'contact', label: 'Contact Page' },
    { id: 'faq', label: 'FAQ Page' },
  ];

  const handleSave = () => {
    setIsSaving(true);
    
    if (activeTab === 'home') updateContent('home', homeData);
    if (activeTab === 'about') updateContent('about', aboutData);
    if (activeTab === 'contact') updateContent('contact', contactData);
    if (activeTab === 'faq') updateContent('faq', faqData);

    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  const handleFaqChange = (index: number, field: 'question' | 'answer', value: string) => {
    const newFaq = [...faqData];
    newFaq[index][field] = value;
    setFaqData(newFaq);
  };

  const addFaq = () => {
    setFaqData([...faqData, { question: '', answer: '' }]);
  };

  const removeFaq = (index: number) => {
    setFaqData(faqData.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-playfair text-3xl font-medium text-brand-black mb-1">Content Manager</h1>
          <p className="text-gray-500 text-sm">Manage text and images across your website pages.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Save size={16} /> {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={\`px-6 py-3 text-sm font-semibold uppercase tracking-wider whitespace-nowrap transition-colors \${
              activeTab === tab.id 
                ? 'border-b-2 border-brand-navy text-brand-navy' 
                : 'text-gray-500 hover:text-brand-navy'
            }\`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {activeTab === 'home' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold uppercase tracking-wider text-sm flex items-center gap-2">
                <Layout size={16} /> Hero Section
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2"><Type size={14} /> Hero Heading</label>
                <input type="text" value={homeData.heroTitle} onChange={e => setHomeData({...homeData, heroTitle: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2"><Type size={14} /> Hero Sub-heading</label>
                <input type="text" value={homeData.heroSubtitle} onChange={e => setHomeData({...homeData, heroSubtitle: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2"><ImageIcon size={14} /> Background Image URL</label>
                <input type="text" value={homeData.heroImage} onChange={e => setHomeData({...homeData, heroImage: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold uppercase tracking-wider text-sm flex items-center gap-2">
                  <Layout size={16} /> Hero Section
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2"><Type size={14} /> Hero Heading</label>
                  <input type="text" value={aboutData.heroTitle} onChange={e => setAboutData({...aboutData, heroTitle: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2"><Type size={14} /> Hero Sub-heading</label>
                  <input type="text" value={aboutData.heroSubtitle} onChange={e => setAboutData({...aboutData, heroSubtitle: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2"><ImageIcon size={14} /> Background Image URL</label>
                  <input type="text" value={aboutData.heroImage} onChange={e => setAboutData({...aboutData, heroImage: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold uppercase tracking-wider text-sm flex items-center gap-2">
                  <Layout size={16} /> Story Section
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2"><Type size={14} /> Philosophy Title</label>
                  <input type="text" value={aboutData.philosophyTitle} onChange={e => setAboutData({...aboutData, philosophyTitle: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2"><Type size={14} /> Paragraph 1</label>
                  <textarea rows={3} value={aboutData.philosophyText1} onChange={e => setAboutData({...aboutData, philosophyText1: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2"><Type size={14} /> Paragraph 2</label>
                  <textarea rows={3} value={aboutData.philosophyText2} onChange={e => setAboutData({...aboutData, philosophyText2: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-semibold uppercase tracking-wider text-sm flex items-center gap-2">
                  <Layout size={16} /> Craftsmanship Section
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2"><Type size={14} /> Title</label>
                  <input type="text" value={aboutData.craftsmanshipTitle} onChange={e => setAboutData({...aboutData, craftsmanshipTitle: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2"><Type size={14} /> Description</label>
                  <textarea rows={3} value={aboutData.craftsmanshipText} onChange={e => setAboutData({...aboutData, craftsmanshipText: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2"><ImageIcon size={14} /> Side Image URL</label>
                  <input type="text" value={aboutData.craftsmanshipImage} onChange={e => setAboutData({...aboutData, craftsmanshipImage: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'contact' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold uppercase tracking-wider text-sm flex items-center gap-2">
                <Layout size={16} /> Contact Information
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2">Address</label>
                <input type="text" value={contactData.address} onChange={e => setContactData({...contactData, address: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2">Phone</label>
                <input type="text" value={contactData.phone} onChange={e => setContactData({...contactData, phone: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2">Email</label>
                <input type="email" value={contactData.email} onChange={e => setContactData({...contactData, email: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-2">Business Hours</label>
                <input type="text" value={contactData.businessHours} onChange={e => setContactData({...contactData, businessHours: e.target.value})} className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold uppercase tracking-wider text-sm flex items-center gap-2">
                <Layout size={16} /> Frequently Asked Questions
              </h3>
            </div>
            <div className="p-6 space-y-6">
              {faqData.map((faq, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg relative bg-gray-50/50">
                  <button 
                    onClick={() => removeFaq(index)} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                  <div className="space-y-4 w-full pr-8">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Question</label>
                      <input 
                        type="text" 
                        value={faq.question} 
                        onChange={e => handleFaqChange(index, 'question', e.target.value)} 
                        className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none bg-white" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Answer</label>
                      <textarea 
                        rows={3}
                        value={faq.answer} 
                        onChange={e => handleFaqChange(index, 'answer', e.target.value)} 
                        className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none bg-white" 
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={addFaq}
                className="w-full py-4 border-2 border-dashed border-gray-200 rounded-lg text-sm font-semibold uppercase tracking-wider text-brand-navy hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} /> Add New FAQ
              </button>
            </div>
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 bg-brand-black text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 z-50"
          >
            <CheckCircle2 size={24} className="text-green-400" />
            <div>
              <h4 className="font-semibold text-sm">Changes Saved</h4>
              <p className="text-gray-300 text-xs">Your content has been updated successfully.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
`);
