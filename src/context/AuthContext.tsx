import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthContextProps {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string, formData: any) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  getUserProfile: () => Promise<any>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log("Setting up auth state listener");
    
    // First set up the auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession ? "Session exists" : "No session");
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (event === 'SIGNED_IN') {
          toast({
            title: 'Signed in successfully',
            description: 'Welcome to Bookarang!',
          });
        } else if (event === 'SIGNED_OUT') {
          toast({
            title: 'Signed out successfully',
            description: 'You have been signed out of your account.',
          });
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log("Initial session check:", currentSession ? "Session exists" : "No session");
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const signUp = async (email: string, password: string, formData: any) => {
    setIsLoading(true);
    try {
      console.log("Signing up with:", email);
      const { error, data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: formData.fullName?.split(' ')[0] || '',
            last_name: formData.fullName?.split(' ').slice(1).join(' ') || '',
            city: formData.city || '',
          }
        }
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        toast({
          title: 'Account created successfully',
          description: 'You can now sign in with your credentials.',
        });
        navigate('/login');
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      toast({
        title: 'Error signing up',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      console.log("Signing in with:", email);
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      console.log("Sign in successful:", data.user ? "User exists" : "No user");
      navigate('/');
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: 'Error signing in',
        description: error.message,
        variant: 'destructive',
      });
      throw error; // Re-throw to allow handling in the component
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: 'Error signing out',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        navigate('/login');
      }
    } catch (error: any) {
      console.error("Signout error:", error);
      toast({
        title: 'Error signing out',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const getUserProfile = async () => {
    try {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }
      
      return data;
    } catch (error) {
      console.error("Error in getUserProfile:", error);
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        signUp,
        signIn,
        signOut,
        getUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
