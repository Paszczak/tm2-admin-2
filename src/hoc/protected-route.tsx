// Node libs
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

type ProtectedRouteProps = {
  children: JSX.Element;
};

// ProtectedRoute is a higher order component for route protection against unauthorized access.
export function ProtectedRoute({ children }: ProtectedRouteProps): JSX.Element {
  const { user } = useAuth();

  if (!user) return <Navigate to='/sign-in' replace />;

  return children;
}
