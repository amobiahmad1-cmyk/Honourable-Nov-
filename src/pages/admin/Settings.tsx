import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, Store, Globe, Shield, CheckCircle2 } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export function AdminSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('storeCurrency') || 'NGN';
  });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Your preferences have been updated swiftly.');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { updatePassword } = useAdminAuth();

  useEffect(() => {
    localStorage.setItem('storeCurrency', currency);
  }, [currency]);

  const handleSave = () => {
    if (newPassword) {
      if (newPassword !== confirmPassword) {
        alert("New passwords do not match.");
        return;
      }
      
      const success = updatePassword(oldPassword, newPassword);
      if (!success) {
        alert("Incorrect old password.");
        return;
      }
    }
    
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setToastMessage(newPassword ? 'Password updated successfully!' : 'Your preferences have been updated swiftly.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }, 800);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value);
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setToastMessage('Currency updated successfully.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 relative">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-playfair text-3xl font-medium text-brand-black mb-1">Store Settings</h1>
          <p className="text-gray-500 text-sm">Manage your store's general preferences and configurations.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-brand-navy text-white px-5 py-2.5 rounded-lg text-sm font-semibold uppercase tracking-wider flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <Save size={16} /> {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
          <Store className="text-brand-navy" size={20} />
          <h2 className="font-semibold uppercase tracking-wider text-sm">General Information</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Store Name</label>
              <input type="text" defaultValue="HONOURABLE NOVÈ" className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Support Email</label>
              <input type="email" defaultValue="support@honourablenove.com" className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Store Description (SEO)</label>
              <textarea rows={3} defaultValue="Premium luxury fashion and lifestyle brand crafting timeless essentials." className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none"></textarea>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
          <Globe className="text-brand-navy" size={20} />
          <h2 className="font-semibold uppercase tracking-wider text-sm">Regional Settings</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Default Currency</label>
              <select 
                value={currency} 
                onChange={handleCurrencyChange} 
                className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none bg-white"
              >
                <option value="NGN">NGN (₦)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Timezone</label>
              <select className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none bg-white">
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="EST">EST (Eastern Standard Time)</option>
                <option value="PST">PST (Pacific Standard Time)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
          <Shield className="text-brand-navy" size={20} />
          <h2 className="font-semibold uppercase tracking-wider text-sm">Security & Password</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Old Password</label>
              <input 
                type="password" 
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter current password" 
                className="w-full max-w-md border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">New Password</label>
              <input 
                type="password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password" 
                className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Confirm New Password</label>
              <input 
                type="password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password" 
                className="w-full border border-gray-200 rounded-lg p-3 focus:border-brand-navy focus:outline-none" 
              />
            </div>
          </div>
        </div>
      </div>

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
              <h4 className="font-semibold text-sm">Settings Saved</h4>
              <p className="text-gray-300 text-xs">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
