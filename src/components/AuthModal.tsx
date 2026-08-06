import { Eye, EyeOff } from "lucide-react";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');

  // Close modal automatically if authenticated
  useEffect(() => {
    if (isAuthenticated && isAuthModalOpen) {
      closeAuthModal();
    }
  }, [isAuthenticated, isAuthModalOpen, closeAuthModal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    login(email, name || 'Esteemed Guest');
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeAuthModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white z-[110] shadow-2xl overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-brand-gray/30">
              <h2 className="font-playfair text-2xl font-medium text-brand-navy">
                {isLogin ? 'Sign In' : 'Create Account'}
              </h2>
              <button onClick={closeAuthModal} className="text-gray-400 hover:text-brand-black transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-transparent border-b border-gray-300 pb-3 focus:outline-none focus:border-brand-navy transition-colors text-brand-black" 
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-300 pb-3 focus:outline-none focus:border-brand-navy transition-colors text-brand-black" 
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
                      className="w-full bg-transparent border-b border-gray-300 pb-3 focus:outline-none focus:border-brand-navy transition-colors text-brand-black pr-10" 
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-navy transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <button type="submit" className="w-full bg-brand-navy text-white py-4 uppercase tracking-widest text-sm font-semibold hover:bg-opacity-90 transition-all mt-4">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <div className="mt-8 text-center text-sm text-gray-500">
                {isLogin ? (
                  <p>Don't have an account? <button type="button" onClick={() => setIsLogin(false)} className="text-brand-navy font-semibold uppercase tracking-wider border-b border-brand-navy pb-1">Sign Up</button></p>
                ) : (
                  <p>Already have an account? <button type="button" onClick={() => setIsLogin(true)} className="text-brand-navy font-semibold uppercase tracking-wider border-b border-brand-navy pb-1">Sign In</button></p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
