import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export function RoleRoute({ children, allowedRole }) {
  const { user } = useAuth();
  if (user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
