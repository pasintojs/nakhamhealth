import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://haflbpiaslmgpvndmyfk.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhhZmxicGlhc2xtZ3B2bmRteWZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3ODgyNjAsImV4cCI6MjA3MjM2NDI2MH0.AZPbICa6z6mKBofqb8t79fD558YY3YWp_PZeZCCbKlo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
