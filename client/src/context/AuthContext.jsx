import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { config } from '../config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user from cookie session
  const fetchUser = async () => {
    try {
      // Try to get token from localStorage first
      const token = localStorage.getItem("jwt_token");

      const res = await fetch(`${config.API_BASE_URL}/auth/me`, {
        method: "GET",
        credentials: "include",
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Signup
  const signup = async ({ name, email, password }) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${config.API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || data.message };

      // Handle ApiResponse structure: data.data.user or data.user
      const userData = data.data?.user || data.user;
      if (userData) {
        setUser(userData);
      }
      toast.success("Signup successful! 🎉");
      return { success: true };
    } catch (err) {
      return { success: false, error: "Signup failed" };
    } finally {
      setIsLoading(false);
    }
  };

  // Login
  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${config.API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // very important
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || data.message };

      // Store JWT token in localStorage
      if (data.token) {
        localStorage.setItem("jwt_token", data.token);
      }

      setUser(data.user);
      toast.success("Login successful 👋");
      return { success: true };
    } catch (err) {
      return { success: false, error: "Login failed" };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await fetch(`${config.API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      // Remove JWT token from localStorage
      localStorage.removeItem("jwt_token");
      setUser(null);
      toast.success("Logged out 👋");
    } catch {
      toast.error("Logout failed");
    }
  };

  // Email verification functions
  const sendVerificationEmail = async (email) => {
    try {
      const res = await fetch(
        `${config.API_BASE_URL}/email/send-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ email }),
        }
      );

      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || data.message };

      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: "Failed to send verification email" };
    }
  };

  const verifyEmailCode = async (email, code) => {
    try {
      const res = await fetch(`${config.API_BASE_URL}/email/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || data.message };

      // Update user state if verification successful
      if (data.user) {
        setUser(data.user);
      }

      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: "Failed to verify email" };
    }
  };

  const resendVerificationCode = async (email) => {
    try {
      const res = await fetch(`${config.API_BASE_URL}/email/resend-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || data.message };

      return { success: true, message: data.message };
    } catch (err) {
      return { success: false, error: "Failed to resend verification code" };
    }
  };

  // Add this new function inside your AuthProvider
  const googleLogin = async (token) => {
    setIsLoading(true);
    try {
      if (!token) {
        return { success: false, error: "Google token is missing" };
      }

      const res = await fetch(`${config.API_BASE_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ token }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        console.error("Google login error:", data);
        return { success: false, error: data.error || "Google login failed" };
      }

      // Store JWT token if provided
      if (data.token) {
        localStorage.setItem("jwt_token", data.token);
      }

      setUser(data.user);
      toast.success("Logged in with Google successfully!");
      return { success: true };
    } catch (err) {
      console.error("Google login network error:", err);
      return { success: false, error: "Network error. Please check your connection and try again." };
    } finally {
      setIsLoading(false);
    }
  };

  const checkVerificationStatus = async (email) => {
    try {
      const res = await fetch(
        `${config.API_BASE_URL}/email/status?email=${encodeURIComponent(
          email
        )}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const data = await res.json();
      if (!res.ok) return { success: false, error: data.error || data.message };

      return { success: true, isVerified: data.isVerified };
    } catch (err) {
      return { success: false, error: "Failed to check verification status" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        googleLogin,
        sendVerificationEmail,
        verifyEmailCode,
        resendVerificationCode,
        checkVerificationStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
