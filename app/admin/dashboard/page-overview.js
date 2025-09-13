"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authUtils } from "../../../lib/auth-utils";
import { authRecovery } from "../../../lib/auth-recovery";
import { supabase } from "../../../lib/supabase";
import AdminLayout from "../components/AdminLayout";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalNews: 0,
    publishedNews: 0,
    draftNews: 0,
    recentNews: [],
  });
  const router = useRouter();

  useEffect(() => {
    // Initialize auth recovery
    authRecovery.initializeAuthRecovery();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { isAuthenticated, isAdmin, user, adminData } =
        await authUtils.checkAdminAuth();

      if (!isAuthenticated || !isAdmin) {
        router.push("/admin/login");
        return;
      }

      setUser(user);
      setAdminData(adminData);

      // Load dashboard stats
      await loadStats();
    } catch (error) {
      console.error("Auth error:", error);

      // Check if it's a refresh token error
      if (authRecovery.isRefreshTokenError(error)) {
        console.log("Refresh token error detected, initiating recovery");
        await authRecovery.handleTokenError();
        return;
      }

      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      // Get total news count
      const { count: totalNews } = await supabase
        .from("news")
        .select("*", { count: "exact", head: true });

      // Get published news count
      const { count: publishedNews } = await supabase
        .from("news")
        .select("*", { count: "exact", head: true })
        .eq("is_published", true);

      // Get draft news count
      const { count: draftNews } = await supabase
        .from("news")
        .select("*", { count: "exact", head: true })
        .eq("is_published", false);

      // Get recent news
      const { data: recentNews } = await supabase
        .from("news")
        .select("id, title, created_at, is_published")
        .order("created_at", { ascending: false })
        .limit(5);

      setStats({
        totalNews: totalNews || 0,
        publishedNews: publishedNews || 0,
        draftNews: draftNews || 0,
        recentNews: recentNews || [],
      });
    } catch (error) {
      console.error("Error loading stats:", error);
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
        <div>
          <h1 className="text-2xl font-bold text-slate-800">แดชบอร์ด</h1>
          <p className="text-slate-600">ภาพรวมการจัดการเนื้อหาเว็บไซต์</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total News */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  ข่าวทั้งหมด
                </p>
                <p className="text-3xl font-bold text-slate-900">
                  {stats.totalNews}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
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
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">
                  ข่าวที่เผยแพร่
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.publishedNews}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
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
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">แบบร่าง</p>
                <p className="text-3xl font-bold text-orange-600">
                  {stats.draftNews}
                </p>
              </div>
              <div className="bg-orange-100 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent News */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                ข่าวล่าสุด
              </h2>
              <button
                onClick={() => router.push("/admin/news")}
                className="text-sky-600 hover:text-sky-800 text-sm font-medium"
              >
                ดูทั้งหมด →
              </button>
            </div>
          </div>
          <div className="p-6">
            {stats.recentNews.length > 0 ? (
              <div className="space-y-4">
                {stats.recentNews.map((news) => (
                  <div
                    key={news.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium text-slate-900">
                        {news.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {new Date(news.created_at).toLocaleDateString("th-TH")}
                      </p>
                    </div>
                    <div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          news.is_published
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {news.is_published ? "เผยแพร่แล้ว" : "แบบร่าง"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg
                  className="w-12 h-12 text-slate-400 mx-auto mb-4"
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
                <p className="text-slate-600">ยังไม่มีข่าวสาร</p>
                <button
                  onClick={() => router.push("/admin/news")}
                  className="mt-2 text-sky-600 hover:text-sky-800 text-sm font-medium"
                >
                  เพิ่มข่าวใหม่
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            การดำเนินการด่วน
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => router.push("/admin/news")}
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white rounded-lg transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
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
              <span className="font-medium">เพิ่มข่าวใหม่</span>
            </button>

            <button
              onClick={() => router.push("/admin/news")}
              className="flex items-center gap-3 p-4 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg transition-all duration-300"
            >
              <svg
                className="w-5 h-5"
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
              <span className="font-medium">จัดการข่าวทั้งหมด</span>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
