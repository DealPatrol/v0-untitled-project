"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

export async function setup404Tracking() {
  try {
    const supabase = createServerSupabaseClient()

    // Create the stored procedure to create the table
    await supabase.rpc("exec_sql", {
      sql_query: `
        CREATE OR REPLACE FUNCTION create_not_found_errors_table()
        RETURNS void AS $$
        BEGIN
          CREATE TABLE IF NOT EXISTS not_found_errors (
            id SERIAL PRIMARY KEY,
            path TEXT NOT NULL,
            referrer TEXT,
            user_agent TEXT,
            ip_address TEXT,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
          );
          
          CREATE INDEX IF NOT EXISTS idx_not_found_errors_path ON not_found_errors(path);
          CREATE INDEX IF NOT EXISTS idx_not_found_errors_created_at ON not_found_errors(created_at);
        END;
        $$ LANGUAGE plpgsql;
      `,
    })

    // Execute the function to create the table
    await supabase.rpc("create_not_found_errors_table")

    return { success: true }
  } catch (error) {
    console.error("Failed to set up 404 tracking:", error)
    return { success: false }
  }
}
