"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authUtils } from "../../../lib/auth-utils";
import { authRecovery } from "../../../lib/auth-recovery";
import AdminLayout from "../components/AdminLayout";
import KnowledgeList from "../components/KnowledgeList";
import KnowledgeForm from "../components/KnowledgeForm";

export default function KnowledgeManagement() {
  const [user, setUser] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("list");
  const [editingKnowledge, setEditingKnowledge] = useState(null);
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

  const handleKnowledgeEdit = (knowledge) => {
    setEditingKnowledge(knowledge);
    setActiveTab("form");
  };

  const handleFormSuccess = () => {
    setActiveTab("list");
    setEditingKnowledge(null);
  };

  const handleFormCancel = () => {
    setActiveTab("list");
    setEditingKnowledge(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout
      user={user}
      adminData={adminData}
      title="จัดการความรู้"
      subtitle="จัดการเนื้อหาความรู้เพื่อสุขภาพ"
    >
      <div className="space-y-6">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-1">
          <nav className="flex space-x-1">
            <button
              onClick={() => {
                setActiveTab("list");
                setEditingKnowledge(null);
              }}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "list"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              รายการความรู้
            </button>
            <button
              onClick={() => {
                setActiveTab("form");
                setEditingKnowledge(null);
              }}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === "form"
                  ? "bg-blue-500 text-white shadow-lg"
                  : "text-slate-600 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              เพิ่มความรู้ใหม่
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === "list" && (
          <KnowledgeList
            onEdit={handleKnowledgeEdit}
            user={user}
            adminData={adminData}
          />
        )}

        {activeTab === "form" && (
          <KnowledgeForm
            knowledge={editingKnowledge}
            onSuccess={handleFormSuccess}
            onCancel={handleFormCancel}
            user={user}
            adminData={adminData}
          />
        )}
      </div>
    </AdminLayout>
  );
}
