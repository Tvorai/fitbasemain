-- SQL migrácia na úpravu existujúcej tabuľky 'bookings'
-- Pridá chýbajúce polia pre guest booking (klienti bez registrácie)

ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS client_name TEXT,
ADD COLUMN IF NOT EXISTS client_email TEXT,
ADD COLUMN IF NOT EXISTS client_phone TEXT;

-- Ak by ste chceli, aby boli tieto polia povinné pre nové záznamy, 
-- môžete neskôr pridať NOT NULL constraint (po otestovaní).
-- ALTER TABLE bookings ALTER COLUMN client_name SET NOT NULL;
-- ALTER TABLE bookings ALTER COLUMN client_email SET NOT NULL;

-- Poznámka: Ostatné polia (trainer_id, starts_at, ends_at, booking_status) už v tabuľke sú.
