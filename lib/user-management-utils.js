import { supabase } from "./supabase";

export const userManagementUtils = {
  // Check if current user is admin
  async isCurrentUserAdmin() {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return false;

      const { data, error } = await supabase
        .from("admin_users")
        .select("is_active, role")
        .eq("user_id", user.id)
        .single();

      return !error && data?.is_active === true;
    } catch (error) {
      console.error("Error checking admin status:", error);
      return false;
    }
  },

  // Get all admin users with proper error handling
  async getAllAdminUsers() {
    try {
      const { data, error } = await supabase
        .from("admin_users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return { data: data || [], error: null };
    } catch (error) {
      console.error("Error fetching admin users:", error);
      return { data: [], error: error.message };
    }
  },

  // Create new admin user with validation
  async createAdminUser(userData) {
    try {
      const { email, password, full_name, role = "admin" } = userData;

      // Validate input
      if (!email || !password || !full_name) {
        throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
      }

      if (password.length < 6) {
        throw new Error("รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      }

      // Check if email already exists
      const { data: existingUser } = await supabase
        .from("admin_users")
        .select("email")
        .eq("email", email)
        .single();

      if (existingUser) {
        throw new Error("อีเมลนี้มีอยู่ในระบบแล้ว");
      }

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
          },
        },
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("ไม่สามารถสร้างบัญชีผู้ใช้ได้");
      }

      // Create admin user record
      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .insert([
          {
            user_id: authData.user.id,
            email,
            full_name,
            role,
            is_active: true,
          },
        ])
        .select()
        .single();

      if (adminError) throw adminError;

      return { data: adminData, error: null };
    } catch (error) {
      console.error("Error creating admin user:", error);
      return { data: null, error: error.message };
    }
  },

  // Update admin user
  async updateAdminUser(userId, userData) {
    try {
      const { full_name, role, is_active } = userData;

      if (!full_name) {
        throw new Error("กรุณากรอกชื่อ-นามสกุล");
      }

      const { data, error } = await supabase
        .from("admin_users")
        .update({
          full_name,
          role,
          is_active,
        })
        .eq("id", userId)
        .select()
        .single();

      if (error) throw error;

      return { data, error: null };
    } catch (error) {
      console.error("Error updating admin user:", error);
      return { data: null, error: error.message };
    }
  },

  // Delete admin user
  async deleteAdminUser(userId) {
    try {
      // Get current user to prevent self-deletion
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      // Get the user to be deleted
      const { data: userToDelete } = await supabase
        .from("admin_users")
        .select("user_id, email")
        .eq("id", userId)
        .single();

      if (
        userToDelete &&
        currentUser &&
        userToDelete.user_id === currentUser.id
      ) {
        throw new Error("ไม่สามารถลบบัญชีของตนเองได้");
      }

      const { error } = await supabase
        .from("admin_users")
        .delete()
        .eq("id", userId);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      console.error("Error deleting admin user:", error);
      return { error: error.message };
    }
  },

  // Validate user permissions
  async validateAdminPermissions(requiredRole = "admin") {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return false;

      const { data } = await supabase
        .from("admin_users")
        .select("role, is_active")
        .eq("user_id", user.id)
        .single();

      if (!data?.is_active) return false;

      const roleHierarchy = {
        editor: 1,
        admin: 2,
        super_admin: 3,
      };

      return roleHierarchy[data.role] >= roleHierarchy[requiredRole];
    } catch (error) {
      console.error("Error validating permissions:", error);
      return false;
    }
  },
};
