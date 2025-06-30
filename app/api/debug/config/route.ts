import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get all environment variables
    const envVars = {
      // Database
      SUPABASE_URL: process.env.SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,

      // Postgres
      POSTGRES_URL: process.env.POSTGRES_URL,
      POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
      POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
      POSTGRES_USER: process.env.POSTGRES_USER,
      POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
      POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
      POSTGRES_HOST: process.env.POSTGRES_HOST,

      // Stripe
      STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
      STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || process.env.strip_webhook_secret,

      // Site
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,

      // AI
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      XAI_API_KEY: process.env.XAI_API_KEY,

      // Other
      plushiblekey: process.env.plushiblekey,
    }

    // Check which variables are present
    const config = {
      environment_variables: {} as Record<
        string,
        { present: boolean; value: string | null; required: boolean; category: string }
      >,
      categories: {
        database: { name: "Database", required: 3, present: 0 },
        stripe: { name: "Stripe Payment", required: 2, present: 0 },
        site: { name: "Site Configuration", required: 1, present: 0 },
        ai: { name: "AI Services", required: 0, present: 0 },
        other: { name: "Other", required: 0, present: 0 },
      },
      overall_status: "unknown" as "good" | "partial" | "missing",
      recommendations: [] as Array<{ type: string; message: string; action: string }>,
    }

    // Define variable configurations
    const variableConfigs = {
      // Database - Required
      SUPABASE_URL: { required: true, category: "database", sensitive: true },
      NEXT_PUBLIC_SUPABASE_URL: { required: true, category: "database", sensitive: false },
      SUPABASE_ANON_KEY: { required: true, category: "database", sensitive: true },
      NEXT_PUBLIC_SUPABASE_ANON_KEY: { required: false, category: "database", sensitive: false },
      SUPABASE_SERVICE_ROLE_KEY: { required: false, category: "database", sensitive: true },

      // Postgres - Optional (fallback)
      POSTGRES_URL: { required: false, category: "database", sensitive: true },
      POSTGRES_PRISMA_URL: { required: false, category: "database", sensitive: true },
      POSTGRES_URL_NON_POOLING: { required: false, category: "database", sensitive: true },
      POSTGRES_USER: { required: false, category: "database", sensitive: false },
      POSTGRES_PASSWORD: { required: false, category: "database", sensitive: true },
      POSTGRES_DATABASE: { required: false, category: "database", sensitive: false },
      POSTGRES_HOST: { required: false, category: "database", sensitive: false },

      // Stripe - Required for payments
      STRIPE_SECRET_KEY: { required: true, category: "stripe", sensitive: true },
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: { required: true, category: "stripe", sensitive: false },
      STRIPE_WEBHOOK_SECRET: { required: false, category: "stripe", sensitive: true },

      // Site - Required
      NEXT_PUBLIC_SITE_URL: { required: true, category: "site", sensitive: false },

      // AI - Optional
      OPENAI_API_KEY: { required: false, category: "ai", sensitive: true },
      XAI_API_KEY: { required: false, category: "ai", sensitive: true },

      // Other
      plushiblekey: { required: false, category: "other", sensitive: true },
    }

    // Process each environment variable
    Object.entries(variableConfigs).forEach(([key, config]) => {
      const value = envVars[key as keyof typeof envVars]
      const present = !!value

      // Mask sensitive values
      let displayValue = null
      if (present) {
        if (config.sensitive) {
          displayValue = `${value!.substring(0, 8)}...`
        } else {
          displayValue = value!
        }
      }

      config.environment_variables[key] = {
        present,
        value: displayValue,
        required: config.required,
        category: config.category,
      }

      // Update category counts
      if (present) {
        config.categories[config.category as keyof typeof config.categories].present++
      }
    })

    // Calculate overall status
    const requiredVars = Object.entries(variableConfigs).filter(([, config]) => config.required)
    const presentRequiredVars = requiredVars.filter(([key]) => !!envVars[key as keyof typeof envVars])

    if (presentRequiredVars.length === requiredVars.length) {
      config.overall_status = "good"
    } else if (presentRequiredVars.length > 0) {
      config.overall_status = "partial"
    } else {
      config.overall_status = "missing"
    }

    // Generate recommendations
    const missingRequired = requiredVars.filter(([key]) => !envVars[key as keyof typeof envVars])

    missingRequired.forEach(([key, varConfig]) => {
      config.recommendations.push({
        type: "error",
        message: `Missing required variable: ${key}`,
        action: `Add ${key} to your environment variables for ${varConfig.category} functionality`,
      })
    })

    // Check for Stripe mode consistency
    const stripeSecret = envVars.STRIPE_SECRET_KEY
    const stripePublishable = envVars.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

    if (stripeSecret && stripePublishable) {
      const secretIsLive = stripeSecret.startsWith("sk_live_")
      const publishableIsLive = stripePublishable.startsWith("pk_live_")

      if (secretIsLive !== publishableIsLive) {
        config.recommendations.push({
          type: "warning",
          message: "Stripe key mode mismatch",
          action:
            "Your secret and publishable keys are from different modes (test/live). Make sure both are from the same mode.",
        })
      }

      if (secretIsLive && publishableIsLive) {
        config.recommendations.push({
          type: "info",
          message: "Live Stripe mode active",
          action: "You're using live Stripe keys. Real payments will be processed!",
        })
      }
    }

    // Check for webhook secret in production
    if (stripeSecret?.startsWith("sk_live_") && !envVars.STRIPE_WEBHOOK_SECRET) {
      config.recommendations.push({
        type: "warning",
        message: "Missing webhook secret in live mode",
        action: "Add STRIPE_WEBHOOK_SECRET for secure webhook verification in production",
      })
    }

    return NextResponse.json({
      ...config,
      timestamp: new Date().toISOString(),
      node_env: process.env.NODE_ENV || "development",
    })
  } catch (error) {
    console.error("Error checking configuration:", error)
    return NextResponse.json(
      {
        error: "Failed to check configuration",
        details: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
