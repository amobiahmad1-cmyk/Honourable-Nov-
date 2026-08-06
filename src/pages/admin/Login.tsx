import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { adminLogin } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('Invalid admin credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white p-10 shadow-2xl rounded-2xl border border-gray-100"
      >
        <div className="text-center mb-10">
          <div className="mx-auto w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mb-6 shadow-lg">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="font-playfair text-3xl font-medium text-brand-black mb-2">Admin Portal</h1>
          <p className="text-gray-500 uppercase tracking-widest text-xs">HONOURABLE NOVÈ Control Center</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Username</label>
            <input 
              type="text" 
              required 
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors text-brand-black" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-brand-navy focus:bg-white transition-colors text-brand-black pr-12" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-navy transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <button type="submit" className="w-full bg-brand-navy text-white rounded-lg py-4 uppercase tracking-widest text-sm font-semibold hover:bg-opacity-90 transition-all mt-6 shadow-md hover:shadow-lg">
            Authenticate
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400">For authorized personnel only.</p>
        </div>
      </motion.div>
    </div>
  );
}
