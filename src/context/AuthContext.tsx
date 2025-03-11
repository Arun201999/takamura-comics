
import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'reader' | 'artist';

export interface User {
  id: string;
  name: string;
  email: string;
  photoURL: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithTwitter: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration purposes
const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Artist',
    email: 'artist@example.com',
    photoURL: 'https://via.placeholder.com/150',
    role: 'artist'
  },
  {
    id: '2',
    name: 'Jane Reader',
    email: 'reader@example.com',
    photoURL: 'https://via.placeholder.com/150',
    role: 'reader'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('takamura_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Simulate saving user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('takamura_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('takamura_user');
    }
  }, [user]);

  const loginWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // For demo purposes, we'll log in as an artist
    setUser(MOCK_USERS[0]);
    setIsLoading(false);
  };

  const loginWithFacebook = async (): Promise<void> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(MOCK_USERS[1]); // Log in as reader
    setIsLoading(false);
  };

  const loginWithTwitter = async (): Promise<void> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser(MOCK_USERS[0]); // Log in as artist
    setIsLoading(false);
  };

  const loginWithEmail = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email
    const foundUser = MOCK_USERS.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
    } else {
      throw new Error('Invalid email or password');
    }
    
    setIsLoading(false);
  };

  const registerWithEmail = async (
    email: string, 
    password: string, 
    name: string, 
    role: UserRole
  ): Promise<void> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      photoURL: 'https://via.placeholder.com/150',
      role
    };
    
    setUser(newUser);
    setIsLoading(false);
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      loginWithGoogle,
      loginWithFacebook,
      loginWithTwitter,
      loginWithEmail,
      registerWithEmail,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
