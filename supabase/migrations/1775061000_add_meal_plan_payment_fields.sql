-- Migration to support Meal Plan orders with payments and pricing
-- Safe, idempotent script

-- 1. Add price_meal_plan_cents to trainers table
ALTER TABLE trainers 
ADD COLUMN IF NOT EXISTS price_meal_plan_cents INTEGER;

-- 2. Add payment and status fields to meal_plan_requests
ALTER TABLE meal_plan_requests
ADD COLUMN IF NOT EXISTS price_cents INTEGER,
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'eur',
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'unpaid',
ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT,
ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- 3. Update existing status column if needed (assuming it's TEXT or similar)
-- We want to support: pending_payment, confirmed, completed, cancelled
-- No action needed if it's already TEXT. If it's an enum, we might need to add values.
-- Based on codebase, it's treated as string.

-- 4. Add index for stripe_checkout_session_id for faster webhook lookups
CREATE INDEX IF NOT EXISTS idx_meal_plan_requests_stripe_session ON meal_plan_requests(stripe_checkout_session_id);
