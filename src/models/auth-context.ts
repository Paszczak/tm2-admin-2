// UserType is a model for user authorization data format
export type UserType = {
  email: string;
  userId: string;
  token: string;
  expire: number;
};

// AuthContextType is a model for AuthContext
export interface AuthContextType {
  user: UserType | null;
  errorMessage: string | null;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}
