# Memorial QR Platform - Deployment Guide

## Project Structure Overview

```
app/
├── memorial/                    # QR Code destination pages
│   ├── [id]/page.tsx           # Dynamic memorial display
│   └── glenda-kelso/page.tsx   # Sample memorial example
├── submit/                      # FREE memorial creation flow
│   ├── page.tsx                # Main form (6-step multi-page)
│   └── loading.tsx             # Loading state
├── activate-memorial/           # Paid activation & QR generation
│   └── page.tsx                # Payment page + QR code checkout
├── admin/                       # Admin dashboard
│   ├── page.tsx                # Redirects to dashboard
│   └── dashboard/page.tsx      # Order & memorial management
├── api/                         # API routes
│   ├── memorials/route.ts      # Create/fetch memorials with file uploads
│   ├── products/route.ts       # Get products with categories
│   ├── orders/route.ts         # Create/manage orders
│   └── create-payment-intent/  # Stripe payment processing
├── products/                    # Product browsing
│   ├── page.tsx                # Products listing page
│   └── products-list.tsx       # Reusable component
└── checkout/                    # Stripe checkout page
    └── page.tsx
```

## User Flow (New Model)

### Step 1: Create Memorial (FREE)
- URL: `/submit`
- User fills out 6-step form:
  1. Basic Information (name, dates, location)
  2. Life Details (occupation, hobbies, achievements)
  3. Photos & Media (upload images/videos)
  4. Biography (personal story)
  5. Family & Friends (spouse, children, parents, siblings)
  6. Review & Submit
- Data saved to `memorials` table with status: `'draft'`
- No payment required at this stage

### Step 2: Activate Memorial & Pay ($99)
- URL: `/activate-memorial?memorial_id={id}`
- User pays $99 to activate
- QR code generated and linked to memorial
- Memorial status changed to `'active'`
- Optional: Add products to order

### Step 3: Browse & Buy Memorial Products
- URL: `/products`
- Dropshipped products (necklaces, plaques, frames, garden stones)
- Checkout at `/checkout`
- Order created in `orders` table with `order_items`

### Step 4: View Public Memorial
- URL: `/memorial/{id}`
- Public page accessible via QR code scan
- Shows photos, videos, biography
- Guest book for messages
- Share buttons

## Database Schema

You need to deploy this SQL to Supabase:
**File**: `scripts/001_create_memorial_schema.sql`

Tables created:
- `memorials` - Memorial profiles with drafts & active status
- `products` - Memorial products with dropship info
- `product_variants` - Size/color variants
- `orders` - Customer orders with payment tracking
- `order_items` - Items per order
- `memorial_messages` - Guest book entries

All tables have Row Level Security (RLS) policies and proper indexes.

## Environment Variables Required

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Optional: Dropship API Keys (when integrating)
PRINTFUL_API_KEY=...
GOOTEN_API_KEY=...
ZENDROP_API_KEY=...
```

## Deployment Checklist

- [ ] **Deploy Database Schema**
  - Run `scripts/001_create_memorial_schema.sql` in Supabase dashboard or via CLI
  - Verify all tables created with proper RLS policies

- [ ] **Environment Variables**
  - Add Supabase keys to Vercel project settings
  - Add Stripe keys for payment processing
  - Test with Stripe test keys first

- [ ] **Test User Flow**
  1. Go to `/` → Click "Create Memorial Now"
  2. Fill out `/submit` form with test data
  3. Navigate to `/activate-memorial?memorial_id={id}`
  4. Process test payment
  5. Verify memorial is now active at `/memorial/{id}`

- [ ] **Stripe Webhook Setup**
  - Configure webhook at `https://yourdomain.com/api/webhooks/stripe`
  - Listen for: `payment_intent.succeeded`, `payment_intent.payment_failed`
  - Update `orders` table with payment status

- [ ] **Storage for Photos**
  - Enable Supabase Storage bucket: `memorial-photos`
  - Set bucket to private with authenticated access
  - Configure CORS for uploads from frontend

## API Routes Summary

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/memorials` | POST | Create memorial with file uploads |
| `/api/memorials?id={id}` | GET | Fetch memorial by ID |
| `/api/memorials?status=active` | GET | Get all active memorials |
| `/api/products` | GET | List products (filter by category) |
| `/api/orders` | POST | Create new order |
| `/api/orders?id={id}` | GET | Get order details |
| `/api/create-payment-intent` | POST | Create Stripe payment intent |

## Monetization Model

- **Activation Fee**: $99 per memorial (one-time)
- **Product Markup**: 40-65% on dropshipped items
  - Example: Necklace costs $35 wholesale, sell for $49.99 = $14.99 profit
- **Revenue Potential**: 
  - 1,000 activations/month × $99 = $99,000
  - 500 product orders × avg $20 profit = $10,000
  - **Total: ~$109,000/month at scale**

## Dropship Integration (Future)

When ready to integrate with actual dropship suppliers:

1. **Printful API**: Sync products, submit orders, track fulfillment
2. **Gooten API**: Custom products (plaques, frames, prints)
3. **Zendrop**: Niche memorial products

Currently using mock product data. Replace with actual API calls in `/api/products/route.ts`

## Admin Dashboard Features

- View all orders with filtering
- Payment status tracking (pending → paid → refunded)
- Fulfillment status (unfulfilled → partially_fulfilled → fulfilled)
- Revenue analytics
- Customer email search
- Order details modal

Access at: `/admin` or `/admin/dashboard`

## Testing

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test memorial creation flow
# 1. Create memorial: http://localhost:3000/submit
# 2. Activate with Stripe test card: http://localhost:3000/activate-memorial
# 3. View memorial: http://localhost:3000/memorial/[id]
```

## Support

- Memorial pages are public and searchable
- Authentication: Optional (use Supabase Auth for premium features)
- File uploads: Photos stored in Supabase Storage with public URLs
- Payments: Stripe for both activation and product orders
