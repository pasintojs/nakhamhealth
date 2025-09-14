"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../components/AdminLayout";
import UserManagement from "../components/UserManagement";
import { authUtils } from "../../../lib/auth-utils";

export default function UsersPage() {
  const [user, setUser] = useState(null);
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication for user management...");

        const { isAuthenticated, isAdmin, user, adminData } =
          await authUtils.checkAdminAuth();

        console.log("Auth check result:", { isAuthenticated, isAdmin });

        if (!isAuthenticated || !isAdmin) {
          console.log("Not authenticated or not admin, redirecting to login");
          router.push("/admin/login");
          return;
        }

        console.log("Authentication successful, loading user management");
        setUser(user);
        setAdminData(adminData);
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_80%_-10%,#e0f2fe_10%,transparent_60%),linear-gradient(to_bottom,#ffffff,rgba(224,242,254,0.3))] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
          <span className="text-slate-600">กำลังโหลด...</span>
        </div>
      </div>
    );
  }

  if (!user || !adminData) {
    return null; // Will redirect to login
  }

  return (
    <AdminLayout user={user} adminData={adminData}>
      <UserManagement />
    </AdminLayout>
  );
}
