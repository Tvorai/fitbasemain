CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS trainer_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trainer_id UUID NOT NULL,
  booking_id UUID NOT NULL,
  client_profile_id UUID NOT NULL,
  client_name TEXT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX IF NOT EXISTS trainer_reviews_unique_booking_client
  ON trainer_reviews (booking_id, client_profile_id);

CREATE INDEX IF NOT EXISTS trainer_reviews_trainer_created
  ON trainer_reviews (trainer_id, created_at DESC);

ALTER TABLE trainer_reviews ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'trainer_reviews' AND policyname = 'Clients can insert their own reviews'
  ) THEN
    CREATE POLICY "Clients can insert their own reviews" ON trainer_reviews
      FOR INSERT
      WITH CHECK (auth.uid() = client_profile_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'trainer_reviews' AND policyname = 'Trainers can view their own reviews'
  ) THEN
    CREATE POLICY "Trainers can view their own reviews" ON trainer_reviews
      FOR SELECT
      USING (
        EXISTS (
          SELECT 1
          FROM trainers t
          WHERE t.id = trainer_reviews.trainer_id
            AND t.profile_id = auth.uid()
        )
      );
  END IF;
END $$;

