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
  day_of_week: number; // smallint v DB, TypeScript number
  start_time: string; // time v DB, tu string (napr. "09:00:00")
  end_time: string;   // time v DB, tu string (napr. "10:00:00")
  is_active: boolean; // Indikátor aktivity slotu
  created_at: string; // ISO string
  updated_at: string; // ISO string
};

// Nové typy pre statusy rezervácie a platby (upravené podľa existujúcej DB schémy bookings)
export type BookingStatus = "pending" | "pending_payment" | "confirmed" | "cancelled";

export type Booking = {
  id: string;
  trainer_id: string; // ID trénera
  client_profile_id: string; // ID profilu klienta
  service_id: string; // ID služby
  booking_status: BookingStatus; // Status rezervácie
  starts_at: string; // ISO string začiatku rezervácie
  ends_at: string; // ISO string konca rezervácie
  client_note: string | null; // Poznámka od klienta
  trainer_note: string | null; // Poznámka od trénera
  cancelled_by: string | null; // ID toho, kto rezerváciu zrušil
  cancelled_reason: string | null; // Dôvod zrušenia
  created_at: string; // ISO string dátumu vytvorenia
  updated_at: string; // ISO string dátumu poslednej aktualizácie
};

export type Payment = {
  id: string;
  userId: string;
  amountCents: number;
  currency: "EUR" | "CZK";
  createdAt: string; // ISO
  status: "paid" | "refunded" | "failed"; // Pridaný status platby
};