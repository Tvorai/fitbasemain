export type Trainer = {
  id: string;
  slug: string;
  name: string;
  specialties: string[];
  location: string;
};

// Doplnený typ Slot pre availability_slots tabuľku
export type Slot = {
  id: string;
  trainer_id: string;
  day_of_week: number; // smallint v DB (1-7)
  start_time: string; // time v DB, tu string (napr. "09:00:00")
  end_time: string;   // time v DB, tu string (napr. "10:00:00")
  is_active: boolean; // Indikátor aktivity slotu
  created_at: string; // ISO string
  updated_at: string; // ISO string
};

// Nové typy pre statusy rezervácie a platby (upravené podľa existujúcej DB schémy bookings)
// TODO: "pending_payment" pridať do DB enum v budúcej fáze platieb
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "pending_payment";
export type PaymentStatus = "unpaid" | "paid" | "failed" | "refunded";

export type Booking = {
  id: string;
  trainer_id: string; // ID trénera (podľa DB)
  client_profile_id: string | null; // ID profilu klienta
  service_id: string | null; // ID služby
  booking_status: BookingStatus; // Status rezervácie (podľa DB)
  starts_at: string; // ISO string
  ends_at: string; // ISO string
  client_name: string | null; // Pre guest booking (nutné pridať do DB)
  client_email: string | null; // Pre guest booking (nutné pridať do DB)
  client_phone: string | null; // Pre guest booking (nutné pridať do DB)
  client_note: string | null; // Poznámka od klienta (podľa DB)
  trainer_note: string | null; // Poznámka od trénera (podľa DB)
  payment_status: PaymentStatus;
  created_at: string; // ISO string
  updated_at: string; // ISO string
};

export type Payment = {
  id: string;
  userId: string;
  amountCents: number;
  currency: "EUR" | "CZK";
  createdAt: string; // ISO
  status: "paid" | "refunded" | "failed"; // Pridaný status platby
};