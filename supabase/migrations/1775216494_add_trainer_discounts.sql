-- Migration to add trainer_discounts table and extend bookings/meal_plan_requests
-- Safe, idempotent script

-- 1. Create trainer_discounts table
CREATE TABLE IF NOT EXISTS trainer_discounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id UUID NOT NULL REFERENCES trainers(id) ON DELETE CASCADE,
  code TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('percent', 'fixed')),
  value INTEGER NOT NULL,
  service_type TEXT NOT NULL CHECK (service_type IN ('personal', 'online', 'meal_plan')),
  max_uses INTEGER,
  used_count INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(trainer_id, code)
);

-- 2. Add discount fields to bookings
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS discount_code TEXT,
  ADD COLUMN IF NOT EXISTS discount_amount_cents INTEGER;

-- 3. Add discount fields to meal_plan_requests
ALTER TABLE meal_plan_requests
  ADD COLUMN IF NOT EXISTS discount_code TEXT,
  ADD COLUMN IF NOT EXISTS discount_amount_cents INTEGER;

-- 4. Add index for faster discount lookups
CREATE INDEX IF NOT EXISTS idx_trainer_discounts_trainer_code ON trainer_discounts(trainer_id, code);

-- 5. Create RPC for idempotent used_count increment
CREATE OR REPLACE FUNCTION increment_discount_usage(t_id UUID, d_code TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE trainer_discounts
  SET used_count = used_count + 1,
      updated_at = now()
  WHERE trainer_id = t_id AND code = d_code;
END;
$$ LANGUAGE plpgsql;
