-- Create a table for Articles with an Editorial Status
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author_id UUID REFERENCES auth.users(id),
  category TEXT CHECK (category IN ('Politics', 'Sports', 'Industry', 'Geo-Politics')),
  status TEXT DEFAULT 'pending_review', -- 'pending_review', 'published', 'archived'
  is_premium BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles table to manage Contributor Bios
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  revenue_share_wallet TEXT -- For the 20% revenue share feature
);
