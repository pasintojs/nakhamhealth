// Emergency auth clearing script
// Use this in browser console if you encounter refresh token errors
// Run: clearAuthEmergency()

window.clearAuthEmergency = function () {
  console.log("🧹 Emergency auth clearing...");

  // Clear all localStorage
  Object.keys(localStorage).forEach((key) => {
    if (
      key.includes("supabase") ||
      key.includes("auth") ||
      key.includes("sb-")
    ) {
      localStorage.removeItem(key);
      console.log("Removed localStorage:", key);
    }
  });

  // Clear all sessionStorage
  Object.keys(sessionStorage).forEach((key) => {
    if (
      key.includes("supabase") ||
      key.includes("auth") ||
      key.includes("sb-")
    ) {
      sessionStorage.removeItem(key);
      console.log("Removed sessionStorage:", key);
    }
  });

  // Clear cookies
  document.cookie.split(";").forEach(function (c) {
    const eqPos = c.indexOf("=");
    const name = eqPos > -1 ? c.substr(0, eqPos) : c;
    document.cookie =
      name +
      "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=" +
      window.location.hostname;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  });

  console.log("✅ Emergency auth clearing complete!");
  console.log("🔄 Reloading page...");
  window.location.reload();
};

console.log("🛠️ Emergency auth clearing available: clearAuthEmergency()");
