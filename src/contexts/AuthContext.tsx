import React, { createContext, useContext, useState } from 'react';
import { Project, loginApi } from '../api/auth';

interface AuthState {
  isAuthenticated: boolean;
  userId: number | null;
  username: string | null;
  email: string | null;
  projects: Project[];
}

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const loggedOutState: AuthState = {
  isAuthenticated: false,
  username: null,
  userId: null,
  projects: [],
  email: null,
}

const AuthContext = createContext<AuthContextType | null> (null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(loggedOutState);

  const login = async(username: string, password: string) => {
    try {
      const data = await loginApi.login(username, password);
      // const userData = await loginApi.getProjectsAndGroups(data.id)
      console.log('authcontext user data', data);

      setAuthState({
        isAuthenticated: true,
        userId: data.id,
        username: data.username,
        email: data.email,
        projects: data.proyectos
      })
      return true;
    } catch (err) {
      console.error('Login error', err);

    }
    return false;
  }

  const logout = () => {
    setAuthState(loggedOutState);
  }

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context;
}