export type Trainer = {
  id: string;
  slug: string;
  name: string;
  specialties: string[];
  location: string;
};

// Doplnený typ Slot
export type Slot = {
  id: string;
  start_time: string; // ISO string pre začiatok slotu (napr. "2024-03-25T09:00:00Z")
  end_time: string;   // ISO string pre koniec slotu (napr. "2024-03-25T10:00:00Z")
  is_available: boolean; // Indikátor dostupnosti slotu
  trainer_id: string; // ID trénera, ktorému slot patrí
  // Ďalšie relevantné polia, ak existujú v DB tabuľke 'slots'
};

// Nové typy pre statusy rezervácie a platby
export type BookingStatus = "pending" | "pending_payment" | "confirmed" | "cancelled";
export type PaymentStatus = "unpaid" | "paid" | "failed" | "refunded";

export type Booking = {
  id: string;
  slot_id: string;
  admin_id: string; // ID trénera/admina
  client_name: string;
  client_email: string;
  client_phone?: string; // Voliteľné
  note?: string; // Voliteľné
  status: BookingStatus;
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