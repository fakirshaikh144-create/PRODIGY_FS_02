"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { api } from "@/lib/api";
import { Admin } from "@/lib/types";

type AuthContextValue = {
  user: Admin | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<Admin>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const restoreSession = async () => {
      try {
        const response = await api.auth.getMe();
        if (!cancelled) {
          setUser(response.data.admin);
        }
      } catch {
        localStorage.removeItem("token");
        if (!cancelled) {
          setUser(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (email: string, password: string) => {
    const response = await api.auth.login(email, password);
    localStorage.setItem("token", response.data.token);
    setUser(response.data.admin);
    return response.data.admin;
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } catch {
      // The local session should still be cleared if the API call fails.
    } finally {
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      logout,
    }),
    [isLoading, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }

  return context;
}
