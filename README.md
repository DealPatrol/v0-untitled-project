# Memorial QR - Digital Memorial Keepsakes

A professional Next.js application for creating digital memorial QR codes that link to beautiful tribute pages.

## Features

- **Professional Homepage** with trust badges, testimonials, and conversion optimization
- **Multi-step Memorial Creation** with progress tracking and validation
- **Stripe Payment Integration** with secure checkout
- **FAQ System** with expandable questions
- **Mobile Responsive Design** throughout
- **SEO Optimized** with proper meta tags and sitemap
- **Error Handling** with boundaries and tracking
- **Analytics Ready** with tracking infrastructure

## Quick Start

1. **Clone and Install**
   \`\`\`bash
   git clone <your-repo>
   cd memorial-qr-website
   npm install
   \`\`\`

2. **Environment Setup** (Optional - for payment features)
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local and fill in your Stripe API keys
   \`\`\`
   
   The application will run without environment variables, but payment processing will be disabled.

3. **Run Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for Production**
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

## Stripe Configuration

To enable payment processing:

1. **Create a Stripe Account**
   - Sign up at [https://stripe.com](https://stripe.com)
   - Get your API keys from [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Add your Stripe secret key as `STRIPE_SECRET_KEY`
   - Add your Stripe publishable key as `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

3. **Set Up Webhooks** (For production)
   - Create a webhook endpoint at [https://dashboard.stripe.com/webhooks](https://dashboard.stripe.com/webhooks)
   - Point it to `https://yourdomain.com/api/webhooks/stripe`
   - Copy the webhook secret to `STRIPE_WEBHOOK_SECRET` in your environment variables

## Environment Variables

Required environment variables (see `.env.example` for template):

**Stripe Configuration** (Required for payment processing):
- `STRIPE_SECRET_KEY` - Your Stripe secret key (get from https://dashboard.stripe.com/apikeys)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret (for production webhooks from https://dashboard.stripe.com/webhooks)

**Supabase Configuration** (Optional, if using Supabase for database):
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

**Note**: The application will build and run without these variables set, but payment processing features will not be available until Stripe is properly configured.

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

1. Build the application: `npm run build`
2. Start the production server: `npm start`
3. Ensure all environment variables are set

## Key Features

### Homepage
- Hero section with video demo
- Trust badges and guarantees
- How it works section
- Testimonials with ratings
- Pricing with countdown timer
- Additional products showcase

### Memorial Creation
- 3-step guided process
- Real-time validation
- Image upload with preview
- Progress tracking
- Writing tips and guidance

### Payment Processing
- Secure Stripe integration
- Multiple payment methods
- Order tracking
- Automatic QR code generation

### FAQ System
- Expandable questions
- Search functionality
- Contact options
- Mobile optimized

## Support

For support, email support@memorialqr.com or call 256-595-3354.

## License

Private - All rights reserved.
