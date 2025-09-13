"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authUtils } from "../../../lib/auth-utils";
import { authRecovery } from "../../../lib/auth-recovery";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@nakham.health");
  const [password, setPassword] = useState("1234@abcd");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Initialize auth recovery and check if user is already logged in
    const checkUser = async () => {
      try {
        // Initialize auth recovery system
        authRecovery.initializeAuthRecovery();

        // Add a small delay to ensure Supabase is initialized
        await new Promise((resolve) => setTimeout(resolve, 100));

        const { isAuthenticated, isAdmin } = await authUtils.checkAdminAuth();
        if (isAuthenticated && isAdmin) {
          router.push("/admin/dashboard");
        }
      } catch (error) {
        console.error("Initial auth check error:", error);

        // Check if it's an auth session missing error
        if (error.message && error.message.includes("Auth session missing")) {
          console.log("Auth session missing on initial load, this is normal");
          // This is normal on first load, just continue
          return;
        }

        // Check if it's a refresh token error and handle it
        if (authRecovery.isRefreshTokenError(error)) {
          console.log("Refresh token error on login page, clearing auth");
          await authUtils.clearAuth();
        } else {
          // Clear any other problematic auth state
          await authUtils.clearAuth();
        }
      } finally {
        setInitialLoading(false);
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await authUtils.login(email, password);
      router.push("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      // Check if it's a refresh token error
      if (authRecovery.isRefreshTokenError(error)) {
        setError("เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่");
        await authUtils.clearAuth();
      } else {
        setError(error.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      }
    } finally {
      setLoading(false);
    }
  };

  // Show loading spinner during initial auth check
  if (initialLoading) {
    return (
      <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600">กำลังตรวจสอบสถานะการเข้าสู่ระบบ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-900 bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))] flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-6">
            <Image
              src="/images/logo.png"
              alt="โรงพยาบาลส่งเสริมสุขภาพตำบลนาคำ"
              width={120}
              height={120}
              className="rounded-full mx-auto shadow-xl"
            />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            ระบบจัดการข่าวสาร
          </h1>
          <p className="text-slate-600">เข้าสู่ระบบสำหรับผู้ดูแลระบบ</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-cyan-200/50 p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <svg
                    className="w-5 h-5 text-red-400 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                อีเมล
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                รหัสผ่าน
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-500 via-cyan-500 to-emerald-500 hover:from-sky-600 hover:via-cyan-600 hover:to-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  กำลังเข้าสู่ระบบ...
                </div>
              ) : (
                "เข้าสู่ระบบ"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center space-y-2">
            <div>
              <a
                href="/admin/setup"
                className="text-sm text-cyan-600 hover:text-cyan-700 transition-colors"
              >
                ยังไม่มีบัญชีแอดมิน? สร้างบัญชีใหม่
              </a>
            </div>
            <div>
              <a
                href="/"
                className="text-sm text-slate-600 hover:text-sky-600 transition-colors"
              >
                ← กลับสู่หน้าหลัก
              </a>
            </div>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">
            ข้อมูลทดสอบ:
          </h3>
          <p className="text-xs text-blue-700">
            Email: admin@nakham.health
            <br />
            Password: admin123456
          </p>
        </div>
      </div>
    </div>
  );
}
