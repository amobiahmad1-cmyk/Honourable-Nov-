-- Products Table
CREATE TABLE IF NOT EXISTS public.products (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL,
  "originalPrice" numeric,
  image text NOT NULL,
  images jsonb NOT NULL DEFAULT '[]'::jsonb,
  description text NOT NULL,
  "isNew" boolean DEFAULT false,
  sizes jsonb,
  colors jsonb,
  "videoUrl" text,
  stock numeric DEFAULT 0,
  status text DEFAULT 'Active',
  "isFeatured" boolean DEFAULT false
);

-- Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id text PRIMARY KEY,
  date text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total numeric NOT NULL,
  status text NOT NULL
);

-- Content Settings Table
CREATE TABLE IF NOT EXISTS public.content_settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL
);

-- Media Table
CREATE TABLE IF NOT EXISTS public.media (
  id text PRIMARY KEY,
  name text NOT NULL,
  url text NOT NULL
);

-- Optional: Enable Row Level Security (RLS) but allow anonymous access for prototyping
-- If you want anyone to view/edit right away, enable the following policies:

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anon all on products" ON public.products FOR ALL USING (true);
CREATE POLICY "Allow anon all on orders" ON public.orders FOR ALL USING (true);
CREATE POLICY "Allow anon all on content_settings" ON public.content_settings FOR ALL USING (true);
CREATE POLICY "Allow anon all on media" ON public.media FOR ALL USING (true);
