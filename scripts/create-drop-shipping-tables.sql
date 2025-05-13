-- Create function to create suppliers table
CREATE OR REPLACE FUNCTION create_suppliers_table()
RETURNS void AS $$
BEGIN
  -- Check if the table already exists
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'suppliers'
  ) THEN
    -- Create the suppliers table
    CREATE TABLE suppliers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      website TEXT,
      api_key TEXT,
      api_endpoint TEXT,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Add some sample suppliers
    INSERT INTO suppliers (name, email, phone, website, is_active)
    VALUES 
      ('QR Code Printing Co.', 'orders@qrprinting.example.com', '555-123-4567', 'https://qrprinting.example.com', TRUE),
      ('Memorial Products Inc.', 'sales@memorialproducts.example.com', '555-987-6543', 'https://memorialproducts.example.com', TRUE),
      ('Legacy Markers LLC', 'info@legacymarkers.example.com', '555-456-7890', 'https://legacymarkers.example.com', TRUE);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create function to create product_suppliers table
CREATE OR REPLACE FUNCTION create_product_suppliers_table()
RETURNS void AS $$
BEGIN
  -- Check if the table already exists
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'product_suppliers'
  ) THEN
    -- Create the product_suppliers table
    CREATE TABLE product_suppliers (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      product_type TEXT NOT NULL,
      supplier_id UUID NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
      supplier_product_id TEXT,
      cost DECIMAL(10, 2) NOT NULL,
      processing_time INTEGER, -- in days
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Add sample product-supplier mappings if suppliers exist
    IF EXISTS (SELECT 1 FROM suppliers LIMIT 1) THEN
      INSERT INTO product_suppliers (product_type, supplier_id, cost, processing_time)
      SELECT 'premium', id, 29.99, 3 FROM suppliers WHERE name = 'QR Code Printing Co.';
      
      INSERT INTO product_suppliers (product_type, supplier_id, cost, processing_time)
      SELECT 'deluxe', id, 49.99, 5 FROM suppliers WHERE name = 'Memorial Products Inc.';
      
      INSERT INTO product_suppliers (product_type, supplier_id, cost, processing_time)
      SELECT 'legacy', id, 99.99, 7 FROM suppliers WHERE name = 'Legacy Markers LLC';
    END IF;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create function to create order_fulfillments table
CREATE OR REPLACE FUNCTION create_order_fulfillments_table()
RETURNS void AS $$
BEGIN
  -- Check if the table already exists
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'order_fulfillments'
  ) THEN
    -- Create the order_fulfillments table
    CREATE TABLE order_fulfillments (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      order_id TEXT NOT NULL,
      supplier_id UUID NOT NULL REFERENCES suppliers(id),
      supplier_order_id TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      tracking_number TEXT,
      shipping_carrier TEXT,
      estimated_delivery_date TIMESTAMP WITH TIME ZONE,
      notes TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Create index on order_id for faster lookups
    CREATE INDEX order_fulfillments_order_id_idx ON order_fulfillments(order_id);
  END IF;
END;
$$ LANGUAGE plpgsql;
