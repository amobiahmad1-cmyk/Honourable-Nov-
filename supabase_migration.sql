-- Add new columns to existing products table
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS stock numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS status text DEFAULT 'Active',
ADD COLUMN IF NOT EXISTS "isFeatured" boolean DEFAULT false;
