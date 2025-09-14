"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authUtils } from "../../../lib/auth-utils";
import { authRecovery } from "../../../lib/auth-recovery";
import AdminLayout from "../components/AdminLayout";
import { supabase } from "../../../lib/supabase";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalNews: 0,
    publishedNews: 0,
    draftNews: 0,
  });
  const [recentNews, setRecentNews] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // Initialize auth recovery
    authRecovery.initializeAuthRecovery();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log("Checking authentication...");

      // First, check if we have a session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.log("Session error:", sessionError);
        router.push("/admin/login");
        return;
      }

      if (!session) {
        console.log("No active session found, redirecting to login");
        router.push("/admin/login");
        return;
      }

      console.log("Session found, checking admin status...");

      const { isAuthenticated, isAdmin, user, adminData } =
        await authUtils.checkAdminAuth();

      console.log("Auth check result:", { isAuthenticated, isAdmin });

      if (!isAuthenticated || !isAdmin) {
        console.log("Not authenticated or not admin, redirecting to login");
        router.push("/admin/login");
        return;
      }

      console.log("Authentication successful, loading user data");
      setUser(user);
      setAdminData(adminData);
      await loadDashboardData();
    } catch (error) {
      console.error("Auth error:", error);

      // Check if it's an auth session missing error (this is normal on initial load)
      if (error.message && error.message.includes("Auth session missing")) {
        console.log("Auth session missing, redirecting to login");
        router.push("/admin/login");
        return;
      }

      // Check if it's a refresh token error
      if (authRecovery.isRefreshTokenError(error)) {
        console.log("Refresh token error detected, initiating recovery");
        await authRecovery.handleTokenError();
        return;
      }

      console.log("Other auth error, redirecting to login");
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      console.log("Starting to load dashboard data...");

      // Test basic connection first
      const { data: testData, error: testError } = await supabase
        .from("news")
        .select("count", { count: "exact", head: true });

      if (testError) {
        console.error("Database connection test failed:", testError);
        throw new Error(`Database connection failed: ${testError.message}`);
      }

      console.log("Database connection successful, news count:", testData);

      // Load news statistics - Use is_published instead of status
      const { data: newsData, error: newsError } = await supabase
        .from("news")
        .select("id, is_published");

      if (newsError) {
        console.error("News query error:", newsError);
        throw newsError;
      }

      console.log("News data loaded:", newsData);

      const totalNews = newsData?.length || 0;
      const publishedNews =
        newsData?.filter((news) => news.is_published === true).length || 0;
      const draftNews =
        newsData?.filter((news) => news.is_published === false).length || 0;

      setStats({
        totalNews,
        publishedNews,
        draftNews,
      });

      // Load recent news (latest 5) - Use is_published and correct field names
      const { data: recentNewsData, error: recentError } = await supabase
        .from("news")
        .select("id, title, created_at, is_published")
        .order("created_at", { ascending: false })
        .limit(5);

      if (recentError) {
        console.error("Recent news query error:", recentError);
        throw recentError;
      }

      console.log("Recent news data loaded:", recentNewsData);
      setRecentNews(recentNewsData || []);

      console.log("Dashboard data loaded successfully");
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });

      // Set default data on error
      setStats({
        totalNews: 0,
        publishedNews: 0,
        draftNews: 0,
      });
      setRecentNews([]);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto mb-4"></div>
          <p className="text-slate-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout user={user} adminData={adminData}>
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">แดชบอร์ด</h1>
          <p className="text-slate-600">ภาพรวมของระบบจัดการเว็บไซต์</p>
          {/* Test navigation button */}
          <div className="mt-4">
            <button
              onClick={() => {
                console.log("Testing navigation to /admin/users");
                router.push("/admin/users");
              }}
              className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
            >
              ทดสอบไปหน้าจัดการผู้ใช้งาน
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total News */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">ข่าวทั้งหมด</p>
                <p className="text-3xl font-bold text-blue-800">
                  {stats.totalNews}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Published News */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">
                  ข่าวที่เผยแพร่
                </p>
                <p className="text-3xl font-bold text-green-800">
                  {stats.publishedNews}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Draft News */}
          <div className="bg-gradient-to-br from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-600 text-sm font-medium">ข่าวร่าง</p>
                <p className="text-3xl font-bold text-amber-800">
                  {stats.draftNews}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent News */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">ข่าวล่าสุด</h2>
            <button
              onClick={() => router.push("/admin/news")}
              className="text-sky-600 hover:text-sky-700 font-medium text-sm flex items-center gap-1"
            >
              ดูทั้งหมด
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            {recentNews.length > 0 ? (
              recentNews.map((news) => (
                <div
                  key={news.id}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-800 line-clamp-1">
                      {news.title}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {new Date(news.created_at).toLocaleDateString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      news.is_published === true
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {news.is_published === true ? "เผยแพร่" : "ร่าง"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-8">ยังไม่มีข่าวสาร</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            การดำเนินการด่วน
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => router.push("/admin/news")}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-sky-50 to-sky-100 border border-sky-200 rounded-lg hover:from-sky-100 hover:to-sky-150 transition-colors"
            >
              <div className="w-10 h-10 bg-sky-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-slate-800">เพิ่มข่าวใหม่</p>
                <p className="text-sm text-slate-600">สร้างข่าวสารใหม่</p>
              </div>
            </button>

            <button
              onClick={() => router.push("/admin/news")}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-lg hover:from-emerald-100 hover:to-emerald-150 transition-colors"
            >
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-slate-800">จัดการข่าว</p>
                <p className="text-sm text-slate-600">แก้ไขและจัดการข่าวสาร</p>
              </div>
            </button>

            <button
              onClick={() => window.open("/", "_blank")}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg hover:from-purple-100 hover:to-purple-150 transition-colors"
            >
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium text-slate-800">ดูเว็บไซต์</p>
                <p className="text-sm text-slate-600">เปิดเว็บไซต์หลัก</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
