-- Migration to add platform_fee_percent to trainers table
ALTER TABLE trainers 
ADD COLUMN IF NOT EXISTS platform_fee_percent INTEGER DEFAULT 10;

-- Update existing records to 10 if they are null
UPDATE trainers SET platform_fee_percent = 10 WHERE platform_fee_percent IS NULL;
