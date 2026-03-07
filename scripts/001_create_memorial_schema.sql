-- Memorial QR Platform Database Schema
-- This creates tables for memorials, products, orders, and dropship items

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- MEMORIALS TABLE
-- Stores memorial profiles (created BEFORE payment)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.memorials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic Information
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  date_of_birth DATE,
  date_of_death DATE,
  location TEXT,
  
  -- Life Details
  occupation TEXT,
  hobbies TEXT,
  achievements TEXT,
  favorite_quote TEXT,
  
  -- Biography
  biography TEXT,
  personal_story TEXT,
  
  -- Family
  spouse TEXT,
  children TEXT,
  parents TEXT,
  siblings TEXT,
  
  -- Media (URLs to uploaded files)
  profile_photo_url TEXT,
  additional_photos JSONB DEFAULT '[]'::jsonb,
  videos JSONB DEFAULT '[]'::jsonb,
  
  -- Settings
  is_public BOOLEAN DEFAULT true,
  allow_messages BOOLEAN DEFAULT true,
  
  -- Status & Payment
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'pending_payment', 'active', 'expired', 'archived')),
  is_paid BOOLEAN DEFAULT false,
  payment_date TIMESTAMPTZ,
  expiration_date TIMESTAMPTZ, -- For subscription model
  
  -- QR Code
  qr_code_url TEXT,
  qr_code_generated_at TIMESTAMPTZ,
  
  -- Creator info (can be anonymous or logged in)
  creator_email TEXT NOT NULL,
  creator_name TEXT,
  creator_phone TEXT,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PRODUCTS TABLE
-- Physical products for dropshipping
-- =====================================================
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Product Details
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  
  -- Pricing
  price DECIMAL(10,2) NOT NULL,
  compare_at_price DECIMAL(10,2), -- Original price for showing discounts
  cost DECIMAL(10,2), -- Your cost (for profit tracking)
  
  -- Product Type
  category TEXT NOT NULL CHECK (category IN ('memorial_plaque', 'jewelry', 'keepsake', 'accessory', 'qr_only')),
  product_type TEXT DEFAULT 'physical' CHECK (product_type IN ('physical', 'digital', 'bundle')),
  
  -- Dropship Info
  is_dropship BOOLEAN DEFAULT true,
  supplier_name TEXT, -- e.g., "Printful", "Gooten", "Zendrop"
  supplier_sku TEXT,
  supplier_cost DECIMAL(10,2),
  
  -- Inventory
  track_inventory BOOLEAN DEFAULT false,
  inventory_count INTEGER DEFAULT 0,
  allow_backorder BOOLEAN DEFAULT true,
  
  -- Media
  images JSONB DEFAULT '[]'::jsonb, -- Array of image URLs
  thumbnail_url TEXT,
  
  -- Variants (sizes, colors, etc.)
  has_variants BOOLEAN DEFAULT false,
  variant_options JSONB DEFAULT '[]'::jsonb, -- e.g., [{"name": "Size", "values": ["Small", "Large"]}]
  
  -- Features
  features JSONB DEFAULT '[]'::jsonb, -- Array of feature strings
  includes_digital_memorial BOOLEAN DEFAULT false,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- PRODUCT VARIANTS TABLE
-- For products with size/color options
-- =====================================================
CREATE TABLE IF NOT EXISTS public.product_variants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  
  -- Variant Details
  name TEXT NOT NULL, -- e.g., "Small / Black"
  sku TEXT,
  
  -- Pricing (can override product price)
  price DECIMAL(10,2),
  compare_at_price DECIMAL(10,2),
  
  -- Attributes
  size TEXT,
  color TEXT,
  material TEXT,
  options JSONB DEFAULT '{}'::jsonb, -- Flexible key-value pairs
  
  -- Inventory
  inventory_count INTEGER DEFAULT 0,
  
  -- Dropship
  supplier_sku TEXT,
  supplier_cost DECIMAL(10,2),
  
  -- Media
  image_url TEXT,
  
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ORDERS TABLE
-- Tracks all orders (memorial activations + product purchases)
-- =====================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  
  -- Customer Info
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_phone TEXT,
  
  -- Shipping Address
  shipping_address JSONB, -- {line1, line2, city, state, postal_code, country}
  billing_address JSONB,
  
  -- Order Details
  subtotal DECIMAL(10,2) NOT NULL,
  shipping_cost DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  
  -- Payment
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded', 'partially_refunded')),
  payment_method TEXT,
  stripe_payment_intent_id TEXT,
  stripe_customer_id TEXT,
  
  -- Fulfillment
  fulfillment_status TEXT DEFAULT 'unfulfilled' CHECK (fulfillment_status IN ('unfulfilled', 'partially_fulfilled', 'fulfilled', 'cancelled')),
  tracking_number TEXT,
  tracking_url TEXT,
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  
  -- Memorial Link (if order includes memorial activation)
  memorial_id UUID REFERENCES public.memorials(id) ON DELETE SET NULL,
  includes_memorial_activation BOOLEAN DEFAULT false,
  
  -- User Link (optional)
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- Notes
  customer_notes TEXT,
  internal_notes TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- ORDER ITEMS TABLE
-- Individual items within an order
-- =====================================================
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  
  -- Product Reference
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  variant_id UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  
  -- Item Details (snapshot at time of purchase)
  product_name TEXT NOT NULL,
  variant_name TEXT,
  sku TEXT,
  
  -- Pricing
  unit_price DECIMAL(10,2) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  total_price DECIMAL(10,2) NOT NULL,
  
  -- Dropship Fulfillment
  dropship_order_id TEXT, -- ID from supplier
  dropship_status TEXT DEFAULT 'pending' CHECK (dropship_status IN ('pending', 'submitted', 'processing', 'shipped', 'delivered', 'cancelled')),
  
  -- Media snapshot
  image_url TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- MEMORIAL MESSAGES TABLE
-- Guest book entries for memorials
-- =====================================================
CREATE TABLE IF NOT EXISTS public.memorial_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  memorial_id UUID NOT NULL REFERENCES public.memorials(id) ON DELETE CASCADE,
  
  author_name TEXT NOT NULL,
  author_email TEXT,
  message TEXT NOT NULL,
  
  is_approved BOOLEAN DEFAULT true, -- For moderation
  is_visible BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- INDEXES
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_memorials_status ON public.memorials(status);
CREATE INDEX IF NOT EXISTS idx_memorials_creator_email ON public.memorials(creator_email);
CREATE INDEX IF NOT EXISTS idx_memorials_user_id ON public.memorials(user_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_orders_memorial_id ON public.orders(memorial_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_memorial_messages_memorial_id ON public.memorial_messages(memorial_id);

-- =====================================================
-- ROW LEVEL SECURITY
-- =====================================================

-- Memorials: Public can view active memorials, creators can manage their own
ALTER TABLE public.memorials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active public memorials" ON public.memorials
  FOR SELECT USING (status = 'active' AND is_public = true);

CREATE POLICY "Creators can view their own memorials by email" ON public.memorials
  FOR SELECT USING (creator_email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Anyone can insert memorials" ON public.memorials
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Creators can update their own memorials" ON public.memorials
  FOR UPDATE USING (creator_email = current_setting('request.jwt.claims', true)::json->>'email');

-- Products: Anyone can view active products
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products" ON public.products
  FOR SELECT USING (is_active = true);

-- Product Variants: Anyone can view variants of active products
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active variants" ON public.product_variants
  FOR SELECT USING (is_active = true);

-- Orders: Users can only see their own orders
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own orders by email" ON public.orders
  FOR SELECT USING (customer_email = current_setting('request.jwt.claims', true)::json->>'email');

CREATE POLICY "Anyone can create orders" ON public.orders
  FOR INSERT WITH CHECK (true);

-- Order Items: Users can see items from their orders
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their order items" ON public.order_items
  FOR SELECT USING (
    order_id IN (
      SELECT id FROM public.orders 
      WHERE customer_email = current_setting('request.jwt.claims', true)::json->>'email'
    )
  );

-- Memorial Messages: Anyone can view approved messages, anyone can post
ALTER TABLE public.memorial_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved messages" ON public.memorial_messages
  FOR SELECT USING (is_approved = true AND is_visible = true);

CREATE POLICY "Anyone can post messages" ON public.memorial_messages
  FOR INSERT WITH CHECK (true);

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_memorials_updated_at ON public.memorials;
CREATE TRIGGER update_memorials_updated_at
  BEFORE UPDATE ON public.memorials
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_products_updated_at ON public.products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_product_variants_updated_at ON public.product_variants;
CREATE TRIGGER update_product_variants_updated_at
  BEFORE UPDATE ON public.product_variants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
