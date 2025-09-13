// Test script to verify admin login functionality
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://haflbpiaslmgpvndmyfk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZmxicGlhc2xtZ3B2bmRteWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc5ODUwNzQsImV4cCI6MjA1MzU2MTA3NH0.2Dx5PmS0bNKjh6-bOGx0SH5F3KFsq8yz9eT-Vy9RL-M";

const supabase = createClient(supabaseUrl, supabaseKey);

async function testLogin() {
  console.log("Testing admin login...");

  try {
    // Test login with the created credentials
    const { data, error } = await supabase.auth.signInWithPassword({
      email: "admin",
      password: "1234@abcd",
    });

    if (error) {
      console.error("Login failed:", error.message);
      return;
    }

    console.log("✅ Login successful!");
    console.log("User ID:", data.user.id);
    console.log("Email:", data.user.email);

    // Check if user is admin
    const { data: adminData, error: adminError } = await supabase
      .from("admin_users")
      .select("*")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .single();

    if (adminError) {
      console.error("Admin check failed:", adminError.message);
      return;
    }

    console.log("✅ Admin verification successful!");
    console.log("Admin user:", adminData);

    // Logout
    await supabase.auth.signOut();
    console.log("✅ Logout successful!");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

testLogin();
