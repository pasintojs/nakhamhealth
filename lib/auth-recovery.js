import { authUtils } from "./auth-utils";

// Utility to handle refresh token errors and recovery
export const authRecovery = {
  // Clear all auth data and redirect to login
  async handleTokenError() {
    try {
      console.log("Handling token error - clearing all auth data");
      await authUtils.clearAuth();

      // Clear browser storage completely
      if (typeof window !== "undefined") {
        // Clear all localStorage
        localStorage.clear();
        // Clear all sessionStorage
        sessionStorage.clear();
        // Clear all cookies
        document.cookie.split(";").forEach((c) => {
          const eqPos = c.indexOf("=");
          const name = eqPos > -1 ? c.substr(0, eqPos) : c;
          document.cookie =
            name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        });
      }

      // Force redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/admin/login";
      }
    } catch (error) {
      console.error("Error in auth recovery:", error);
      // Force page reload as last resort
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
  },

  // Check if current error is a refresh token error
  isRefreshTokenError(error) {
    if (!error) return false;

    const errorMessage = error.message || error.toString();
    return (
      errorMessage.includes("refresh") ||
      errorMessage.includes("token") ||
      errorMessage.includes("Invalid Refresh Token") ||
      errorMessage.includes("Refresh Token Not Found") ||
      error.status === 401
    );
  },

  // Initialize auth recovery listener
  initializeAuthRecovery() {
    if (typeof window !== "undefined") {
      // Listen for unhandled auth errors
      window.addEventListener("unhandledrejection", (event) => {
        if (this.isRefreshTokenError(event.reason)) {
          console.log("Unhandled refresh token error detected");
          event.preventDefault();
          this.handleTokenError();
        }
      });

      // Listen for general errors
      window.addEventListener("error", (event) => {
        if (this.isRefreshTokenError(event.error)) {
          console.log("Refresh token error detected in error handler");
          event.preventDefault();
          this.handleTokenError();
        }
      });
    }
  },
};
