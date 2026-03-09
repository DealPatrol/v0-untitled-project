# Setup Checklist for Memorial QR Platform

## Phase 1: Environment & Database Setup

- [ ] **Link Supabase Project**
  ```bash
  supabase link --project-ref tkowdctozynuksdjzbgl
  ```

- [ ] **Deploy Database Schema**
  - Go to Supabase Dashboard → SQL Editor
  - Create new query
  - Copy & paste contents of `scripts/001_create_memorial_schema.sql`
  - Execute the script
  - Verify tables created: memorials, products, orders, order_items, memorial_messages

- [ ] **Create Storage Buckets**
  - Go to Supabase Dashboard → Storage
  - Create bucket: `memorial-photos` (Public)
  - Create bucket: `qr-codes` (Public)
  - Create bucket: `memorial-documents` (Private)

- [ ] **Copy Environment Variables**
  - Copy `.env.example` to `.env.local`
  - Add your Supabase keys: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Add your Stripe keys: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`

## Phase 2: Local Testing

- [ ] **Install Dependencies**
  ```bash
  npm install
  ```

- [ ] **Start Development Server**
  ```bash
  npm run dev
  ```

- [ ] **Test Memorial Creation Flow**
  1. Navigate to `http://localhost:3000/submit`
  2. Fill in memorial form (all 6 steps)
  3. Submit and verify memorial saved to Supabase
  4. Check Supabase → Table Editor → memorials table

- [ ] **Test Activation Flow**
  1. From activation page, enter memorial email
  2. Click "Activate Memorial" 
  3. Complete Stripe payment (use test card: 4242 4242 4242 4242)
  4. Verify QR code generated and displayed
  5. Check `memorial_id` status changed to "active" in database

- [ ] **Test Memorial Display**
  1. Scan QR code or navigate to `/memorial/[id]`
  2. Verify memorial displays correctly
  3. Test adding guest message
  4. Verify message appears in messages table

## Phase 3: Dropshipping Setup

- [ ] **Printful Integration (Recommended)**
  1. Create Printful account at https://printful.com
  2. Get API key from Printful Dashboard
  3. Update `PRINTFUL_API_KEY` in `.env.local`
  4. Sync products: `npm run sync-printful-products`

- [ ] **Seed Sample Products**
  ```bash
  npm run seed-products
  ```

- [ ] **Test Product Display**
  1. Navigate to `/products`
  2. Browse memorial product categories
  3. Add product to cart
  4. Complete Stripe checkout

## Phase 4: Admin Dashboard

- [ ] **Test Admin Access**
  1. Navigate to `/admin`
  2. Verify redirects to `/admin/dashboard`
  3. View all orders created during testing
  4. Check order status tracking

- [ ] **Verify Webhook Setup**
  1. Go to Stripe Dashboard → Developers → Webhooks
  2. Create webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
  3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
  4. Add webhook secret to `.env.local`

## Phase 5: Production Deployment

- [ ] **Deploy to Vercel**
  ```bash
  git add .
  git commit -m "Ready for production"
  git push origin main
  ```

- [ ] **Configure Production Secrets**
  - Go to Vercel Project Settings → Environment Variables
  - Add all production keys (Stripe live keys, Supabase prod keys)
  - Redeploy

- [ ] **Set Stripe Production Webhook**
  - Update webhook endpoint in Stripe Dashboard
  - Use live keys in production environment

- [ ] **Enable RLS Policies** (Production Security)
  - Verify all Supabase tables have RLS enabled
  - Test that users can only access their own data

- [ ] **SSL Certificate**
  - Vercel automatically provides SSL
  - Verify HTTPS working on production domain

- [ ] **Database Backups**
  - Enable automatic backups in Supabase Dashboard
  - Set backup frequency to daily

## Phase 6: Launch Preparation

- [ ] **Email Notifications**
  - Set up email templates for:
    - Memorial created confirmation
    - Payment confirmation with QR code
    - Order shipped notification
    - Guest message notification

- [ ] **Analytics Setup**
  - Add Google Analytics or Mixpanel
  - Track: memorial creates, activations, product purchases
  - Set up conversion goals

- [ ] **Customer Support**
  - Create support email template
  - Set up help documentation
  - Add FAQ section to site

- [ ] **Legal Documents**
  - Add Terms of Service
  - Add Privacy Policy
  - Add Refund/Cancellation Policy

## Quick Commands

```bash
# Development
npm run dev                    # Start local server
npm run build                  # Build for production
npm test                       # Run tests

# Database
supabase link                  # Link to project
supabase push                  # Push migrations
supabase pull                  # Pull latest schema

# Supabase CLI Setup
npm install -g supabase        # Install CLI
supabase login                 # Login to Supabase
```

## Troubleshooting

**Database Schema Won't Deploy**
- Ensure Supabase project is linked: `supabase link`
- Check if extension already exists: `CREATE EXTENSION IF NOT EXISTS`
- Verify authentication: `supabase projects list`

**Stripe Webhook Not Working**
- Verify webhook secret in `.env.local`
- Check Stripe Dashboard → Events for failed deliveries
- Ensure endpoint URL is publicly accessible

**Photos Not Uploading**
- Verify `memorial-photos` bucket exists and is public
- Check Supabase RLS policies on storage
- Confirm file size under 50MB limit

**QR Code Generation Fails**
- Ensure `qr` package installed: `npm install qr`
- Check memorial URL is valid and accessible
- Verify `qr-codes` bucket exists

## Support

Need help? Check these resources:
- Supabase Docs: https://supabase.com/docs
- Stripe Docs: https://stripe.com/docs
- Next.js Docs: https://nextjs.org/docs
- Repository Issues: Create an issue on GitHub
