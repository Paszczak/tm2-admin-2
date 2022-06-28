// Node libs
import { useContext } from 'react';

// Contexts
import { AuthContext } from '../contexts/auth-context';

// useAuth is a custom hook for accesing auth context user data
export function useAuth() {
  const authData = useContext(AuthContext);
  return { ...authData };
}
