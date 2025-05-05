export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          created_at?: string
          updated_at?: string
        }
      }
      memorials: {
        Row: {
          id: string
          user_id: string
          name: string
          birth_date: string | null
          death_date: string | null
          bio: string | null
          cover_image_url: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          birth_date?: string | null
          death_date?: string | null
          bio?: string | null
          cover_image_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          birth_date?: string | null
          death_date?: string | null
          bio?: string | null
          cover_image_url?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      family_members: {
        Row: {
          id: string
          memorial_id: string
          name: string
          relationship: string
          birth_date: string | null
          death_date: string | null
          bio: string | null
          image_url: string | null
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          memorial_id: string
          name: string
          relationship: string
          birth_date?: string | null
          death_date?: string | null
          bio?: string | null
          image_url?: string | null
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          memorial_id?: string
          name?: string
          relationship?: string
          birth_date?: string | null
          death_date?: string | null
          bio?: string | null
          image_url?: string | null
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      qr_codes: {
        Row: {
          id: string
          memorial_id: string
          unique_code: string
          design_type: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          memorial_id: string
          unique_code: string
          design_type?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          memorial_id?: string
          unique_code?: string
          design_type?: string
          created_at?: string
          updated_at?: string
        }
      }
      media: {
        Row: {
          id: string
          memorial_id: string
          media_type: string
          url: string
          caption: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          memorial_id: string
          media_type: string
          url: string
          caption?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          memorial_id?: string
          media_type?: string
          url?: string
          caption?: string | null
          display_order?: number
          created_at?: string
        }
      }
      stories: {
        Row: {
          id: string
          memorial_id: string
          author_name: string
          content: string
          is_approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          memorial_id: string
          author_name: string
          content: string
          is_approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          memorial_id?: string
          author_name?: string
          content?: string
          is_approved?: boolean
          created_at?: string
        }
      }
      visitors: {
        Row: {
          id: string
          memorial_id: string
          ip_address: string | null
          user_agent: string | null
          visited_at: string
        }
        Insert: {
          id?: string
          memorial_id: string
          ip_address?: string | null
          user_agent?: string | null
          visited_at?: string
        }
        Update: {
          id?: string
          memorial_id?: string
          ip_address?: string | null
          user_agent?: string | null
          visited_at?: string
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan_type: string
          start_date: string
          end_date: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan_type: string
          start_date?: string
          end_date?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan_type?: string
          start_date?: string
          end_date?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          reference_number: string
          payment_method: string
          status: string
          amount: number
          stripe_session_id: string | null
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          reference_number: string
          payment_method: string
          status: string
          amount: number
          stripe_session_id?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          reference_number?: string
          payment_method?: string
          status?: string
          amount?: number
          stripe_session_id?: string | null
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      suppliers: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          website: string | null
          api_key: string | null
          api_endpoint: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          website?: string | null
          api_key?: string | null
          api_endpoint?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          website?: string | null
          api_key?: string | null
          api_endpoint?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      product_suppliers: {
        Row: {
          id: string
          product_type: string
          supplier_id: string
          supplier_product_id: string | null
          cost: number
          processing_time: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_type: string
          supplier_id: string
          supplier_product_id?: string | null
          cost: number
          processing_time?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_type?: string
          supplier_id?: string
          supplier_product_id?: string | null
          cost?: number
          processing_time?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_fulfillments: {
        Row: {
          id: string
          order_id: string
          supplier_id: string
          supplier_order_id: string | null
          status: string
          tracking_number: string | null
          tracking_url: string | null
          shipping_carrier: string | null
          estimated_delivery_date: string | null
          actual_delivery_date: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          order_id: string
          supplier_id: string
          supplier_order_id?: string | null
          status?: string
          tracking_number?: string | null
          tracking_url?: string | null
          shipping_carrier?: string | null
          estimated_delivery_date?: string | null
          actual_delivery_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          supplier_id?: string
          supplier_order_id?: string | null
          status?: string
          tracking_number?: string | null
          tracking_url?: string | null
          shipping_carrier?: string | null
          estimated_delivery_date?: string | null
          actual_delivery_date?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// Helper types for the family tree
export type FamilyMember = Database["public"]["Tables"]["family_members"]["Row"]
export type FamilyMemberWithChildren = FamilyMember & { children?: FamilyMemberWithChildren[] }

// Helper types for suppliers and drop shipping
export type Supplier = Database["public"]["Tables"]["suppliers"]["Row"]
export type ProductSupplier = Database["public"]["Tables"]["product_suppliers"]["Row"]
export type OrderFulfillment = Database["public"]["Tables"]["order_fulfillments"]["Row"]
