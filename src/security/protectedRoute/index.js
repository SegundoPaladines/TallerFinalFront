import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../auth';

const ProtectedRoute = () => {
    const auth = useAuth();

    return auth.isAutenticated? <Outlet />: <Navigate to='/login' />;
}

export default ProtectedRoute;