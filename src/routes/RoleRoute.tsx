import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import type { ReactNode } from 'react';

interface RoleRouteProps {
  children: ReactNode;
  allowedRole: 'student' | 'company';
}

export function RoleRoute({ children, allowedRole }: RoleRouteProps) {
  const { user } = useAuth();
  if (user?.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
