
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Initial session check
    const getInitialSession = async () => {
      setIsLoading(true);
      
      try {
        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          await fetchAndSetUser(session.user.id);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "There was a problem with your authentication state.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    getInitialSession();

    // Set up auth state listener for future changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);
      
      if (session && (event === 'SIGNED_IN' || event === 'USER_UPDATED')) {
        await fetchAndSetUser(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  // Helper function to fetch user profile and set user state
  const fetchAndSetUser = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }

      // Get user email from auth
      const { data: { user: authUser } } = await supabase.auth.getUser();

      if (profile) {
        setUser({
          id: profile.id,
          name: profile.full_name || 'User',
          email: authUser?.email || '',
          photoURL: profile.avatar_url || 'https://via.placeholder.com/150',
          role: profile.role as UserRole
        });
        console.log('User profile loaded:', profile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // This function is kept for future use, but we'll focus on email auth for now
  const handleOAuthError = (error: any, provider: string) => {
    console.error(`Error with ${provider} OAuth:`, error);
    
    if (error?.error_code === 'validation_failed' || 
        error?.message?.includes('provider is not enabled')) {
      throw {
        error_code: 'validation_failed',
        msg: `Unsupported provider: provider is not enabled`,
        message: `The ${provider} authentication provider is not enabled in your Supabase project.`
      };
    }
    
    throw error;
  };

  const loginWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/login`,
        }
      });
      
      if (error) {
        handleOAuthError(error, 'Google');
      }
    } catch (error) {
      handleOAuthError(error, 'Google');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithFacebook = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          redirectTo: `${window.location.origin}/login`,
        }
      });
      
      if (error) {
        handleOAuthError(error, 'Facebook');
      }
    } catch (error) {
      handleOAuthError(error, 'Facebook');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithTwitter = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: `${window.location.origin}/login`,
        }
      });
      
      if (error) {
        handleOAuthError(error, 'Twitter');
      }
    } catch (error) {
      handleOAuthError(error, 'Twitter');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithEmail = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    console.log('Attempting login with email:', email);
    
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Login error:', error);
        throw error;
      }
      
      console.log("Login successful:", data);
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      console.error('Error logging in with email:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const registerWithEmail = async (
    email: string, 
    password: string, 
    name: string, 
    role: UserRole
  ): Promise<void> => {
    setIsLoading(true);
    console.log('Attempting registration with email:', email, 'role:', role);
    
    try {
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role
          },
          emailRedirectTo: `${window.location.origin}/login`
        }
      });
      
      if (error) {
        console.error('Registration error:', error);
        throw error;
      }
      
      console.log("Registration successful:", data);
      
      toast({
        title: "Account created!",
        description: "Please check your email for verification.",
      });
    } catch (error: any) {
      console.error('Error registering with email:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
      
      setUser(null);
      navigate('/');
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (error: any) {
      console.error('Error logging out:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was a problem logging out. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
