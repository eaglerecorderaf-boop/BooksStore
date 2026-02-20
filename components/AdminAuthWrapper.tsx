
import React, { useState, useEffect } from 'react';
import AdminLoginPage from '../pages/AdminLoginPage';

interface Props {
  children: React.ReactNode;
}

const AdminAuthWrapper: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });

  const handleAdminLogin = (password: string) => {
    if (password === 'En12015@Ny') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return <AdminLoginPage onLogin={handleAdminLogin} />;
  }

  return <>{children}</>;
};

export default AdminAuthWrapper;
