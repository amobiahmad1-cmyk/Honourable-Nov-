import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AdminContextType {
  isAdminAuthenticated: boolean;
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;
  updatePassword: (oldPass: string, newPass: string) => boolean;
}

const AdminAuthContext = createContext<AdminContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const [adminPassword, setAdminPassword] = useState(() => {
    return localStorage.getItem('adminPassword') || 'AHMAG_12345';
  });

  const adminLogin = (username: string, password: string) => {
    if (username === 'Admin' && password === adminPassword) {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminAuthenticated(false);
  };

  const updatePassword = (oldPass: string, newPass: string) => {
    if (oldPass === adminPassword) {
      setAdminPassword(newPass);
      localStorage.setItem('adminPassword', newPass);
      return true;
    }
    return false;
  };

  return (
    <AdminAuthContext.Provider value={{ isAdminAuthenticated, adminLogin, adminLogout, updatePassword }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return context;
};
