import { createContext } from 'react';

// Types and interfaces
import { AuthContextType } from '../models/auth-context';

// AuthContext is context for authorization data app context
export const AuthContext = createContext<AuthContextType>(
  null as any as AuthContextType
);
