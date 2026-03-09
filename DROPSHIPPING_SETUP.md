# Dropshipping Setup Guide

## What is Dropshipping?

Dropshipping allows you to sell physical products without holding inventory. When a customer orders, the supplier manufactures and ships directly to them. You keep the profit margin.

## How Your Memorial QR Platform Uses Dropshipping

1. Customer creates memorial (FREE)
2. Customer activates memorial ($99 fee)
3. Customer optionally buys memorial products during/after activation
4. You submit order to dropship supplier
5. Supplier manufactures and ships to customer
6. You keep profit margin (typically 40-65%)

## Recommended Dropship Suppliers

### 1. **Printful** (Recommended for Start)
- Best for: Custom prints, t-shirts, hoodies, jewelry, mugs, plaques
- Website: https://www.printful.com
- API: Yes (paid tier)
- Integration: REST API available
- Setup:
  1. Create account at printful.com
  2. Connect to your store
  3. Upload product designs/templates
  4. Get API key from dashboard
  5. Use API to sync products and submit orders

**Example Products:**
- Memorial necklaces ($35 cost → $49.99 retail)
- Photo plaques ($45 cost → $79.99 retail)
- Custom t-shirts ($12 cost → $24.99 retail)

### 2. **Gooten** (Best Variety)
- Best for: Custom prints, frames, posters, canvas, books
- Website: https://www.gooten.com
- API: Yes
- Integration: REST API available
- Setup:
  1. Create partner account
  2. Get API credentials
  3. Create product templates
  4. Submit orders via API

### 3. **Zendrop** (Best for Niches)
- Best for: Niche products, jewelry, home décor, memorial items
- Website: https://zendrop.com
- API: Yes (with integration)
- Integration: Zapier + REST API

## Implementation Steps

### Phase 1: Mock Products (Current)
You're currently using mock product data in `/api/products/route.ts`. This works for testing.

### Phase 2: Add Real Supplier Integration

1. **Choose your supplier** (recommend starting with Printful)

2. **Get API credentials:**
   ```env
   # .env.local
   PRINTFUL_API_KEY=your_api_key_here
   GOOTEN_API_KEY=your_api_key_here (optional)
   ```

3. **Create API route to sync products** (`/api/admin/sync-products/route.ts`):
   ```typescript
   // Fetch products from Printful
   // Store in Supabase products table
   // Called once on setup, then periodically
   ```

4. **Update order submission** (`/api/orders/submit/route.ts`):
   ```typescript
   // When order is paid:
   // 1. Get supplier SKU for each item
   // 2. Submit to Printful/Gooten API
   // 3. Save supplier order ID
   // 4. Track fulfillment status
   ```

5. **Add webhook listener** (`/api/webhooks/printful/route.ts`):
   ```typescript
   // Listen for shipment updates
   // Update order_items.dropship_status
   // Send customer email with tracking
   ```

## Pricing Strategy by Product Category

### Memorial Jewelry
- Necklaces: $35 cost → $49.99 retail (42% margin)
- Bracelets: $15 cost → $24.99 retail (66% margin)
- Rings: $25 cost → $39.99 retail (60% margin)

### Memorial Plaques
- 8x10 Plaque: $45 cost → $79.99 retail (78% margin)
- 5x7 Frame: $25 cost → $44.99 retail (80% margin)
- Garden Stone: $30 cost → $54.99 retail (83% margin)

### Photo Products
- Custom Photo Book: $18 cost → $34.99 retail (94% margin)
- Canvas Print: $22 cost → $49.99 retail (127% margin)
- Mug (cremation): $8 cost → $19.99 retail (150% margin)

## Integration Timeline

**Week 1-2: Setup**
- Choose primary supplier (Printful recommended)
- Create account and get API key
- Add to environment variables

**Week 3-4: Development**
- Create `/api/admin/sync-products` endpoint
- Fetch real products from Printful
- Store in Supabase `products` table

**Week 5-6: Order Processing**
- Update `/api/orders` to submit to Printful
- Add `dropship_order_id` tracking
- Create webhook listener for status updates

**Week 7-8: Testing & Launch**
- Test full order flow with Printful sandbox
- Verify shipping addresses and fulfillment
- Launch with real orders

## Cost Structure

### Printful
- No setup fee
- Per-item commission: 0% (you pay supplier cost)
- API access: Free for up to 100 products
- Paid tier: $99/month for unlimited products

### Your Economics (Example)
**Monthly at Scale (1,000 orders):**
- Activation fees: 1,000 × $99 = $99,000
- Product orders: 500 × avg $15 margin = $7,500
- **Gross Revenue: $106,500**
- Less Printful costs (~$2,500)
- **Net Revenue: $104,000**

## Tax & Legal Considerations

1. **Reseller Tax ID**: Some states require this for dropshipping
2. **Sales Tax Nexus**: Collect sales tax for states where you have nexus
3. **Terms of Service**: Update to reflect dropship model
4. **Shipping Liability**: Clarify customer responsibility for shipping damage
5. **Return Policy**: Define return/refund process with supplier

## Common Issues & Solutions

**Issue: Supplier out of stock**
- Solution: Mark product as unavailable, email customers, offer alternatives

**Issue: Order failed to submit to supplier**
- Solution: Add retry logic, webhook to notify admin

**Issue: Customer requests refund**
- Solution: Contact supplier for return, process refund, update order status

**Issue: Tracking number not updating**
- Solution: Check webhook configuration, manually sync from supplier dashboard

## Next Steps

1. **Choose supplier**: Printful recommended for ease of use
2. **Sign up**: Create account at https://www.printful.com
3. **Get API key**: Admin → Integrations → API
4. **Add to .env**: `PRINTFUL_API_KEY=your_key`
5. **Ready to implement**: Contact me when ready to code integration

## Resources

- Printful API Docs: https://developers.printful.com/
- Gooten API Docs: https://gooten.com/api/
- Dropship Best Practices: https://www.shopify.com/blog/dropshipping
- Profit Margin Calculator: https://www.miniwebtool.com/profit-margin-calculator/
