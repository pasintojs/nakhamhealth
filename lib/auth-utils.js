import { supabase } from "./supabase";

// Enhanced authentication utilities with better error handling
export const authUtils = {
  // Clear all authentication data with comprehensive cleanup
  async clearAuth() {
    try {
      await supabase.auth.signOut();
      // Clear all possible localStorage items related to auth
      if (typeof window !== "undefined") {
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          if (
            key.includes("supabase") ||
            key.includes("auth") ||
            key.includes("sb-")
          ) {
            localStorage.removeItem(key);
          }
        });
        // Also clear sessionStorage
        const sessionKeys = Object.keys(sessionStorage);
        sessionKeys.forEach((key) => {
          if (
            key.includes("supabase") ||
            key.includes("auth") ||
            key.includes("sb-")
          ) {
            sessionStorage.removeItem(key);
          }
        });
      }
    } catch (error) {
      console.warn("Error clearing auth:", error);
      // Force clear even if signOut fails
      if (typeof window !== "undefined") {
        localStorage.clear();
        sessionStorage.clear();
      }
    }
  },

  // Get current user with enhanced refresh token error handling
  async getCurrentUser() {
    try {
      // First check if we have a session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error("Session error:", sessionError);
        return null;
      }

      if (!session) {
        console.log("No active session found");
        return null;
      }

      // If we have a session, get the user
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Auth error:", error);

        // Handle "Auth session missing!" error specifically
        if (error.message && error.message.includes("Auth session missing")) {
          console.log("No active session found, user not logged in");
          return null;
        }

        // Enhanced refresh token error detection
        if (
          error.message.includes("refresh") ||
          error.message.includes("token") ||
          error.message.includes("Invalid Refresh Token") ||
          error.message.includes("Refresh Token Not Found") ||
          error.status === 401
        ) {
          console.log("Refresh token error detected, clearing auth...");
          await this.clearAuth();
          return null;
        }
        throw error;
      }

      return user;
    } catch (error) {
      console.error("Error getting current user:", error);
      // Don't clear auth for session missing errors
      if (!error.message || !error.message.includes("Auth session missing")) {
        await this.clearAuth();
      }
      return null;
    }
  },

  // Check if user is authenticated admin
  async checkAdminAuth() {
    try {
      const user = await this.getCurrentUser();

      if (!user) {
        return { isAuthenticated: false, isAdmin: false };
      }

      // Check admin status
      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .single();

      if (adminError || !adminData) {
        await this.clearAuth();
        return { isAuthenticated: false, isAdmin: false };
      }

      return {
        isAuthenticated: true,
        isAdmin: true,
        user,
        adminData,
      };
    } catch (error) {
      console.error("Error checking admin auth:", error);
      await this.clearAuth();
      return { isAuthenticated: false, isAdmin: false };
    }
  },

  // Login with better error handling and refresh token recovery
  async login(email, password) {
    try {
      // Clear any existing auth first to prevent conflicts
      await this.clearAuth();

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (!data.user) {
        throw new Error("ไม่สามารถเข้าสู่ระบบได้");
      }

      // Verify admin status
      const { isAdmin, adminData } = await this.checkAdminAuth();

      if (!isAdmin) {
        await this.clearAuth();
        throw new Error("คุณไม่มีสิทธิ์เข้าถึงระบบแอดมิน");
      }

      return { user: data.user, adminData };
    } catch (error) {
      await this.clearAuth();
      throw error;
    }
  },

  // Force refresh session and handle token errors
  async refreshSession() {
    try {
      const { data, error } = await supabase.auth.refreshSession();

      if (error) {
        console.error("Session refresh failed:", error);
        await this.clearAuth();
        return null;
      }

      return data;
    } catch (error) {
      console.error("Error refreshing session:", error);
      await this.clearAuth();
      return null;
    }
  },
};

// Enhanced Auth state listener with comprehensive error recovery
export const setupAuthListener = (onAuthChange) => {
  return supabase.auth.onAuthStateChange(async (event, session) => {
    try {
      console.log(
        "Auth state change:",
        event,
        session ? "session exists" : "no session"
      );

      if (event === "SIGNED_OUT" || !session) {
        await authUtils.clearAuth();
        onAuthChange({ user: null, session: null });
        return;
      }

      // Handle token refresh errors specifically
      if (event === "TOKEN_REFRESHED" || event === "SIGNED_IN") {
        try {
          // Verify the session is valid
          const {
            data: { user },
            error,
          } = await supabase.auth.getUser();

          if (error) {
            console.error("Session validation error:", error);
            // If it's a refresh token error, clear everything
            if (
              error.message.includes("refresh") ||
              error.message.includes("token") ||
              error.message.includes("Invalid Refresh Token") ||
              error.status === 401
            ) {
              console.log("Clearing auth due to token error");
              await authUtils.clearAuth();
              onAuthChange({ user: null, session: null });
              return;
            }
          }

          if (!user) {
            console.log("No user found, clearing auth");
            await authUtils.clearAuth();
            onAuthChange({ user: null, session: null });
            return;
          }

          onAuthChange({ user, session });
        } catch (sessionError) {
          console.error("Session validation failed:", sessionError);
          await authUtils.clearAuth();
          onAuthChange({ user: null, session: null });
        }
      }
    } catch (error) {
      console.error("Auth state change error:", error);
      await authUtils.clearAuth();
      onAuthChange({ user: null, session: null });
    }
  });
};
