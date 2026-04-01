-- Add Stripe/Checkout related fields to bookings (safe, idempotent)

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'booking_status_enum') THEN
    BEGIN
      ALTER TYPE booking_status_enum ADD VALUE IF NOT EXISTS 'pending_payment';
      ALTER TYPE booking_status_enum ADD VALUE IF NOT EXISTS 'completed';
    EXCEPTION
      WHEN duplicate_object THEN NULL;
    END;
  END IF;
END
$$;

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'unpaid';

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS stripe_checkout_session_id TEXT;

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id TEXT;

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS price_cents INTEGER;

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'eur';

