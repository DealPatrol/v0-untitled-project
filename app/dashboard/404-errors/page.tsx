import { createServerSupabaseClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { setup404Tracking } from "@/app/actions/setup-404-tracking"

export default async function NotFoundErrorsPage() {
  // Set up the 404 tracking if it's not already set up
  await setup404Tracking()

  const supabase = createServerSupabaseClient()

  // Check if the table exists
  const { error: tableCheckError } = await supabase.from("not_found_errors").select("id").limit(1).maybeSingle()

  // If table doesn't exist, we'll show a message
  const tableExists =
    !tableCheckError || !tableCheckError.message.includes('relation "not_found_errors" does not exist')

  let errors = []
  let topErrors = []

  if (tableExists) {
    // Get the most recent 404 errors
    const { data: recentErrors } = await supabase
      .from("not_found_errors")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)

    if (recentErrors) {
      errors = recentErrors
    }

    // Get the most common 404 errors
    const { data: commonErrors } = await supabase.rpc("get_top_404_errors")

    if (commonErrors) {
      topErrors = commonErrors
    } else {
      // Fallback if the RPC doesn't exist
      const { data } = await supabase
        .from("not_found_errors")
        .select("path, count(*)")
        .group("path")
        .order("count", { ascending: false })
        .limit(10)

      if (data) {
        topErrors = data
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif mb-6">404 Error Tracking</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Most Common 404 Errors</CardTitle>
            <CardDescription>The URLs that most frequently trigger 404 errors</CardDescription>
          </CardHeader>
          <CardContent>
            {!tableExists ? (
              <p className="text-gray-500">No data available yet. The tracking system is being set up.</p>
            ) : topErrors.length === 0 ? (
              <p className="text-gray-500">No 404 errors have been recorded yet.</p>
            ) : (
              <div className="space-y-4">
                {topErrors.map((error, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-2">
                    <div className="truncate max-w-[70%]">
                      <p className="font-medium">{error.path}</p>
                    </div>
                    <div className="bg-rose-100 text-rose-800 px-2 py-1 rounded-full text-sm">{error.count} hits</div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent 404 Errors</CardTitle>
            <CardDescription>The most recent URLs that triggered 404 errors</CardDescription>
          </CardHeader>
          <CardContent>
            {!tableExists ? (
              <p className="text-gray-500">No data available yet. The tracking system is being set up.</p>
            ) : errors.length === 0 ? (
              <p className="text-gray-500">No 404 errors have been recorded yet.</p>
            ) : (
              <div className="space-y-4">
                {errors.map((error) => (
                  <div key={error.id} className="border-b pb-2">
                    <p className="font-medium truncate">{error.path}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>
                        {new Date(error.created_at).toLocaleDateString()}{" "}
                        {new Date(error.created_at).toLocaleTimeString()}
                      </span>
                      {error.referrer && (
                        <span className="truncate ml-4" title={`Referrer: ${error.referrer}`}>
                          From: {error.referrer}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
