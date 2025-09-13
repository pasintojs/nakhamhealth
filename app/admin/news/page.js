"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authUtils } from "../../../lib/auth-utils";
import { authRecovery } from "../../../lib/auth-recovery";
import AdminLayout from "../components/AdminLayout";
import NewsList from "../components/NewsList";
import NewsForm from "../components/NewsForm";

export default function NewsManagement() {
  const [user, setUser] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");
  const [editingNews, setEditingNews] = useState(null);
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

  const handleNewNews = () => {
    setEditingNews(null);
    setActiveTab("form");
  };

  const handleEditNews = (news) => {
    setEditingNews(news);
    setActiveTab("form");
  };

  const handleFormClose = () => {
    setActiveTab("list");
    setEditingNews(null);
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">จัดการข่าวสาร</h1>
            <p className="text-slate-600">
              สร้าง แก้ไข และจัดการข่าวสารของเว็บไซต์
            </p>
          </div>

          <button
            onClick={handleNewNews}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
            เพิ่มข่าวใหม่
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("list")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "list"
                  ? "border-sky-500 text-sky-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              รายการข่าว
            </button>
            <button
              onClick={() => setActiveTab("form")}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "form"
                  ? "border-sky-500 text-sky-600"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              {editingNews ? "แก้ไขข่าว" : "เพิ่มข่าวใหม่"}
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          {activeTab === "list" && <NewsList onEdit={handleEditNews} />}

          {activeTab === "form" && (
            <NewsForm
              news={editingNews}
              onClose={handleFormClose}
              onSuccess={() => {
                setActiveTab("list");
                setEditingNews(null);
              }}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
