# Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables
Ensure all required environment variables are set:

\`\`\`bash
# Required
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_SITE_URL=

# Optional
GOOGLE_ANALYTICS_ID=
\`\`\`

### 2. Database Setup
Run these SQL scripts in your Supabase dashboard:

1. `scripts/create-payment-tables.sql`
2. `scripts/create-drop-shipping-tables.sql`
3. `scripts/seed-realistic-data.sql`

### 3. Stripe Configuration
1. Create Stripe account
2. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Enable these webhook events:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`

### 4. Build Test
\`\`\`bash
npm run build
npm run type-check
\`\`\`

## Vercel Deployment

### 1. Connect Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository

### 2. Configure Environment Variables
In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add all required environment variables
3. Set `NEXT_PUBLIC_SITE_URL` to your Vercel domain

### 3. Deploy
1. Push to main branch
2. Vercel will automatically build and deploy
3. Check deployment logs for any errors

## Manual Deployment

### 1. Build Application
\`\`\`bash
npm run build
npm run start
\`\`\`

### 2. Server Requirements
- Node.js 18+
- SSL certificate (required for Stripe)
- Domain name

### 3. Process Manager
Use PM2 for production:
\`\`\`bash
npm install -g pm2
pm2 start npm --name "memorial-qr" -- start
pm2 save
pm2 startup
\`\`\`

## Post-Deployment Testing

### 1. Homepage Test
- [ ] Homepage loads correctly
- [ ] All images display
- [ ] Video plays
- [ ] CTA buttons work
- [ ] Mobile responsive

### 2. Memorial Creation Test
- [ ] Multi-step form works
- [ ] Image upload functions
- [ ] Validation works
- [ ] Progress tracking

### 3. Payment Test
- [ ] Stripe checkout opens
- [ ] Test payment processes
- [ ] Confirmation page loads
- [ ] Order created in database

### 4. FAQ Test
- [ ] Questions expand/collapse
- [ ] Contact buttons work
- [ ] Mobile layout correct

## Monitoring

### 1. Error Tracking
Monitor these logs:
- Vercel function logs
- Supabase logs
- Stripe webhook logs

### 2. Performance
- Core Web Vitals
- Page load times
- Mobile performance

### 3. Analytics
- Page views
- Conversion rates
- User flow

## Troubleshooting

### Common Issues

**Build Errors:**
- Check TypeScript errors: `npm run type-check`
- Verify all imports are correct
- Ensure environment variables are set

**Payment Issues:**
- Verify Stripe keys are correct
- Check webhook endpoint is accessible
- Confirm webhook secret matches

**Database Issues:**
- Verify Supabase connection
- Check table permissions
- Ensure RLS policies are correct

### Support
For deployment issues, contact: support@memorialqr.com
