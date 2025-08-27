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

2. **Environment Setup**
   \`\`\`bash
   cp .env.example .env.local
   # Fill in your environment variables
   \`\`\`

3. **Database Setup**
   - Create a Supabase project
   - Run the SQL scripts in the `scripts/` folder
   - Update your environment variables

4. **Stripe Setup**
   - Create a Stripe account
   - Add your API keys to environment variables
   - Set up webhooks for payment processing

5. **Deploy**
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

## Environment Variables

Required environment variables:

- `SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_ANON_KEY` - Your Supabase anon key
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `NEXT_PUBLIC_SITE_URL` - Your site URL

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
