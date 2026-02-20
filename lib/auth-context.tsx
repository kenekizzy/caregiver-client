/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiClient, RegisterRequest } from './api';
import { useToast } from './use-toast';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isVerified: boolean;
}

interface AuthResult {
  success: boolean;
  error?: string;
  requiresVerification?: boolean;
  verificationLink?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<AuthResult>;
  adminLogin: (email: string, password: string) => Promise<AuthResult>;
  register: (userData: RegisterRequest) => Promise<AuthResult>;
  verifyEmail: (token: string) => Promise<AuthResult>;
  logout: (showToast?: boolean) => void;
  logoutWithRedirect: () => void;
  isAdmin: () => boolean;
  isClient: () => boolean;
  isCaregiver: () => boolean;
  getCaregiverDashboardAccess: () => Promise<{ hasAccess: boolean; caregiverId?: string; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { success, error } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        apiClient.setToken(token);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);

    try {
      const response = await apiClient.login({ email, password });

      if (response.error) {
        setIsLoading(false);
        return { success: false, error: response.error };
      }

      if (response.data) {
        const { user: userData, token } = response.data;

        const authToken = token;

        setUser(userData);
        apiClient.setToken(authToken);
        localStorage.setItem('auth_token', authToken);
        localStorage.setItem('user_data', JSON.stringify(userData));

        success('Login successful!', `Welcome back, ${userData.firstName}!`);
        setIsLoading(false);
        return { success: true };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Login failed. Please try again.' };
    }

    setIsLoading(false);
    return { success: false, error: 'Login failed. Please try again.' };
  };

  const adminLogin = async (email: string, password: string): Promise<AuthResult> => {
    setIsLoading(true);

    try {
      const response = await apiClient.login({ email, password });

      if (response.error) {
        setIsLoading(false);
        return { success: false, error: response.error };
      }

      if (response.data) {
        const { user: userData, token } = response.data;

        // Check if user is admin
        if (userData.role !== 'ADMIN') {
          setIsLoading(false);
          return { success: false, error: 'Access denied. Admin privileges required.' };
        }

        // Use access_token if available, fallback to token
        const authToken = token;

        setUser(userData);
        apiClient.setToken(authToken);
        localStorage.setItem('auth_token', authToken);
        localStorage.setItem('user_data', JSON.stringify(userData));

        success('Admin login successful!', `Welcome back, ${userData.firstName}!`);
        setIsLoading(false);
        return { success: true };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Login failed. Please try again.' };
    }

    setIsLoading(false);
    return { success: false, error: 'Login failed. Please try again.' };
  };

  // User registration
  const register = async (userData: RegisterRequest): Promise<AuthResult> => {
    setIsLoading(true);

    try {
      const response = await apiClient.register(userData);

      if (response.error) {
        setIsLoading(false);
        return { success: false, error: response.error };
      }

      if (response.data) {
        const { user: newUser, verificationLink } = response.data;

        if (!newUser.isVerified) {
          success('Registration successful!', 'Please check your email to verify your account.');
        } else {
          success('Registration successful!', 'Your account has been created successfully.');
        }
        
        setIsLoading(false);
        return {
          success: true,
          requiresVerification: !newUser.isVerified,
          verificationLink
        };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Registration failed. Please try again.' };
    }

    setIsLoading(false);
    return { success: false, error: 'Registration failed. Please try again.' };
  };

  // Email verification
  const verifyEmail = async (token: string): Promise<AuthResult> => {
    setIsLoading(true);

    try {
      const response = await apiClient.verifyEmail(token);

      if (response.error) {
        setIsLoading(false);
        return { success: false, error: response.error };
      }

      setIsLoading(false);
      return { success: true };
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Email verification failed. Please try again.' };
    }
  };

  const logout = (showToast: boolean = true) => {
    setUser(null);
    apiClient.clearToken();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    if (showToast) {
      success('Logged out successfully', 'See you next time!');
    }
  };

  // Helper methods
  const isAdmin = () => user?.role === 'ADMIN';
  const isClient = () => user?.role === 'CLIENT';
  const isCaregiver = () => user?.role === 'CAREGIVER';
  
  // Logout with redirect to success page
  const logoutWithRedirect = () => {
    logout(false);
    window.location.href = '/logout/success';
  };

  // Get caregiver ID for dashboard access
  const getCaregiverDashboardAccess = async () => {
    if (!user || user.role !== 'CAREGIVER') {
      return { hasAccess: false, error: 'Not a caregiver' };
    }

    try {
      const response = await apiClient.getCaregiverByUserId(user.id);
      if (response.error) {
        return { hasAccess: false, error: 'Caregiver profile not found' };
      }
      return { hasAccess: true, caregiverId: response.data?.id };
    } catch (error) {
      return { hasAccess: false, error: 'Failed to check caregiver access' };
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    adminLogin,
    register,
    verifyEmail,
    logout,
    logoutWithRedirect,
    isAdmin,
    isClient,
    isCaregiver,
    getCaregiverDashboardAccess,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}