'use client';

import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { auth } from '@/lib/firebase';
import { firebaseSignIn } from '@/lib/firebase/sign-in';
import { firebaseSignOut } from '@/lib/firebase/sign-out';
import { RegisterFormData } from '@/schemas/user-register';
import { User } from '@/types/user';
import { Either, Failure, Success } from '@/utils/either';

import { createUser } from './actions';

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<Either<Error, FirebaseUser>>;
  signUp: (data: RegisterFormData) => Promise<Either<Error, User>>;
  signOut: () => Promise<Either<Error, { message: string }>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await firebaseSignIn(email, password);

      if (result.isFailure()) {
        return Failure.create(result.value);
      }

      return result;
    } catch (error) {
      return Failure.create(new Error('Falha ao fazer login. Por favor, tente novamente.'));
    }
  };

  const signUp = async (data: RegisterFormData) => {
    const result = await createUser(data);

    if (result.status !== 201) {
      return Failure.create(new Error(result.data.message));
    }

    await signIn(data.email, data.password);

    return Success.create(result.data);
  };

  const signOut = async () => {
    const result = await firebaseSignOut();

    if (result.isFailure()) {
      return Failure.create(result.value);
    }

    setUser(null);

    return Success.create({ message: 'Logout realizado com sucesso' });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
