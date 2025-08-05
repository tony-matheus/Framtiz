-- Analytics Database Setup Script
-- This script ensures the analytics table has the required metadata column and indexes

-- Add metadata JSONB column if it doesn't exist
ALTER TABLE analytics ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}';

-- Create indexes for optimal query performance
-- These indexes will improve dashboard query performance significantly

-- Index for date-based queries (most important for dashboard filtering)
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON analytics(created_at);

-- Index for page-based queries (for blog analytics)
CREATE INDEX IF NOT EXISTS idx_analytics_page ON analytics(page);

-- Index for geographic queries
CREATE INDEX IF NOT EXISTS idx_analytics_country ON analytics(country);

-- Index for device-based queries
CREATE INDEX IF NOT EXISTS idx_analytics_device ON analytics(device);

-- Composite index for common dashboard queries (page + date range)
CREATE INDEX IF NOT EXISTS idx_analytics_page_created_at ON analytics(page, created_at);

-- Verify the table structure
-- Run this query to confirm the setup:
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'analytics'
-- ORDER BY ordinal_position;
