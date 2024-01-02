import { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../providers';

const ProtectedRoute = () => {
  const auth = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      await auth.checkAuth();
      setAuthChecked(true);
    };

    checkAuthentication();
  }, []);

  if (!authChecked) {
    return null;
  }

  return auth.isAutenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;