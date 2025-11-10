/**
 * useAuth Hook
 * Authentication state and methods
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/services/api';
import { STORAGE_KEYS, ROUTES } from '@/constants';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'user';
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const router = useRouter();
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  /**
   * Initialize auth state from localStorage
   */
  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const userStr = localStorage.getItem(STORAGE_KEYS.USER);

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          setAuthState({
            user,
            isLoading: false,
            isAuthenticated: true,
          });
        } catch (error) {
          console.error('Failed to parse user data:', error);
          logout();
        }
      } else {
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    initAuth();
  }, []);

  /**
   * Login method
   */
  const login = async (email: string, password: string) => {
    try {
      const data: any = await authApi.login(email, password);

      // Save to localStorage
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, data.access_token);
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));

      // Update state
      setAuthState({
        user: data.user,
        isLoading: false,
        isAuthenticated: true,
      });

      // Redirect based on role
      if (data.user.role === 'admin') {
        router.push(ROUTES.ADMIN);
      } else {
        router.push(ROUTES.USER);
      }

      return { success: true, user: data.user };
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Đăng nhập thất bại',
      };
    }
  };

  /**
   * Register method
   */
  const register = async (fullName: string, email: string, password: string) => {
    try {
      await authApi.register(fullName, email, password);
      return { success: true };
    } catch (error: any) {
      console.error('Register error:', error);
      return {
        success: false,
        error: error.message || 'Đăng ký thất bại',
      };
    }
  };

  /**
   * Logout method
   */
  const logout = () => {
    // Clear localStorage
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);

    // Clear state
    setAuthState({
      user: null,
      isLoading: false,
      isAuthenticated: false,
    });

    // Redirect to login
    router.push(ROUTES.LOGIN);
  };

  /**
   * Check if user has specific role
   */
  const hasRole = (role: 'admin' | 'user'): boolean => {
    return authState.user?.role === role;
  };

  return {
    ...authState,
    login,
    register,
    logout,
    hasRole,
  };
}
