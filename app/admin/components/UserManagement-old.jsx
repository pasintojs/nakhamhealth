"use client";

import { useState, useEffect } from "react";
import { userManagementUtils } from "../../../lib/user-management-utils";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    full_name: "",
    role: "admin",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch admin users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data, error } = await userManagementUtils.getAllAdminUsers();

      if (error) {
        setError(error);
        return;
      }

      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้");
    } finally {
      setLoading(false);
    }
  };

  // Create new admin user
  const createUser = async (userData) => {
    try {
      setError("");
      setSuccess("");

      const { data, error } = await userManagementUtils.createAdminUser(userData);

      if (error) {
        setError(error);
        return;
      }

      setSuccess("เพิ่มผู้ใช้งานใหม่เรียบร้อยแล้ว");
      setFormData({ email: "", password: "", full_name: "", role: "admin" });
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      setError("เกิดข้อผิดพลาดในการเพิ่มผู้ใช้งาน");
    }
  };

  // Update admin user
  const updateUser = async (userId, userData) => {
    try {
      setError("");
      setSuccess("");

      const { data, error } = await userManagementUtils.updateAdminUser(userId, userData);

      if (error) {
        setError(error);
        return;
      }

      setSuccess("อัปเดตข้อมูลผู้ใช้งานเรียบร้อยแล้ว");
      setEditingUser(null);
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      setError("เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้งาน");
    }
  };

  // Delete admin user
  const deleteUser = async (userId) => {
    if (
      !confirm(
        "คุณต้องการลบผู้ใช้งานนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถยกเลิกได้"
      )
    ) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      const { error } = await userManagementUtils.deleteAdminUser(userId);

      if (error) {
        setError(error);
        return;
      }

      setSuccess("ลบผู้ใช้งานเรียบร้อยแล้ว");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("เกิดข้อผิดพลาดในการลบผู้ใช้งาน");
    }
  };  // Create new admin user
  const createUser = async (userData) => {
    try {
      setError("");
      setSuccess("");

      // First create the auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.full_name,
          },
        },
      });

      if (authError) throw authError;

      // Then create the admin user record
      const { error: adminError } = await supabase.from("admin_users").insert([
        {
          user_id: authData.user.id,
          email: userData.email,
          full_name: userData.full_name,
          role: userData.role,
          is_active: true,
        },
      ]);

      if (adminError) throw adminError;

      setSuccess("เพิ่มผู้ใช้งานใหม่เรียบร้อยแล้ว");
      setFormData({ email: "", password: "", full_name: "", role: "admin" });
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error("Error creating user:", error);
      setError("เกิดข้อผิดพลาดในการเพิ่มผู้ใช้งาน: " + error.message);
    }
  };

  // Update admin user
  const updateUser = async (userId, userData) => {
    try {
      setError("");
      setSuccess("");

      const { error } = await supabase
        .from("admin_users")
        .update({
          full_name: userData.full_name,
          role: userData.role,
          is_active: userData.is_active,
        })
        .eq("id", userId);

      if (error) throw error;

      setSuccess("อัปเดตข้อมูลผู้ใช้งานเรียบร้อยแล้ว");
      setEditingUser(null);
      setShowForm(false);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      setError("เกิดข้อผิดพลาดในการอัปเดตข้อมูลผู้ใช้งาน");
    }
  };

  // Delete admin user
  const deleteUser = async (userId, userIdAuth) => {
    if (
      !confirm(
        "คุณต้องการลบผู้ใช้งานนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถยกเลิกได้"
      )
    ) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      // First delete from admin_users table
      const { error: adminError } = await supabase
        .from("admin_users")
        .delete()
        .eq("id", userId);

      if (adminError) throw adminError;

      // Note: Deleting auth users requires admin privileges
      // For now, we'll just mark them as inactive in admin_users
      // You might want to use Supabase Admin API for complete deletion

      setSuccess("ลบผู้ใช้งานเรียบร้อยแล้ว");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("เกิดข้อผิดพลาดในการลบผู้ใช้งาน");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingUser) {
      await updateUser(editingUser.id, formData);
    } else {
      await createUser(formData);
    }
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setFormData({
      email: user.email,
      password: "",
      full_name: user.full_name || "",
      role: user.role || "admin",
      is_active: user.is_active,
    });
    setEditingUser(user);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setFormData({ email: "", password: "", full_name: "", role: "admin" });
    setEditingUser(null);
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            จัดการผู้ใช้งานระบบ
          </h1>
          <p className="text-slate-600 mt-1">
            เพิ่ม แก้ไข และลบผู้ใช้งานที่มีสิทธิ์เข้าถึงระบบแอดมิน
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors flex items-center gap-2"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          เพิ่มผู้ใช้งานใหม่
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* Add/Edit User Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">
            {editingUser ? "แก้ไขข้อมูลผู้ใช้งาน" : "เพิ่มผู้ใช้งานใหม่"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  อีเมล
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  disabled={editingUser}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 disabled:bg-slate-50"
                  required
                />
              </div>
              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    รหัสผ่าน
                  </label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                    required
                    minLength={6}
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  บทบาท
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-sky-500 focus:border-sky-500"
                >
                  <option value="admin">ผู้ดูแลระบบ</option>
                  <option value="super_admin">ผู้ดูแลระบบสูงสุด</option>
                  <option value="editor">บรรณาธิการ</option>
                </select>
              </div>
              {editingUser && (
                <div className="md:col-span-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_active: e.target.checked,
                        })
                      }
                      className="w-4 h-4 text-sky-600 bg-slate-100 border-slate-300 rounded focus:ring-sky-500"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      สถานะการใช้งาน (เปิดใช้งาน)
                    </span>
                  </label>
                </div>
              )}
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors"
              >
                {editingUser ? "อัปเดต" : "เพิ่มผู้ใช้งาน"}
              </button>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-slate-500 text-white px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors"
              >
                ยกเลิก
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Users List */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">
            รายชื่อผู้ใช้งานในระบบ
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  อีเมล
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  ชื่อ-นามสกุล
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  บทบาท
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  วันที่สร้าง
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                  การจัดการ
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    {user.full_name || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.role === "super_admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "admin"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {user.role === "super_admin"
                        ? "ผู้ดูแลระบบสูงสุด"
                        : user.role === "admin"
                        ? "ผู้ดูแลระบบ"
                        : "บรรณาธิการ"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        user.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.is_active ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(user.created_at).toLocaleDateString("th-TH")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-sky-600 hover:text-sky-900 transition-colors"
                        title="แก้ไข"
                      >
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
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => deleteUser(user.id, user.user_id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                        title="ลบ"
                      >
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="text-center py-8 text-slate-500">
              ไม่พบข้อมูลผู้ใช้งาน
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
