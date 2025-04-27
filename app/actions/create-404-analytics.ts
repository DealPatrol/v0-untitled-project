"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

export async function create404Analytics() {
  try {
    const supabase = createServerSupabaseClient()

    // Create the stored procedure to get top 404 errors
    await supabase.rpc("exec_sql", {
      sql_query: `
        CREATE OR REPLACE FUNCTION get_top_404_errors()
        RETURNS TABLE (path TEXT, count BIGINT) AS $$
        BEGIN
          RETURN QUERY
          SELECT path, COUNT(*) as count
          FROM not_found_errors
          GROUP BY path
          ORDER BY count DESC
          LIMIT 10;
        END;
        $$ LANGUAGE plpgsql;
      `,
    })

    return { success: true }
  } catch (error) {
    console.error("Failed to create 404 analytics:", error)
    return { success: false }
  }
}
