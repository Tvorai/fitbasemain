import type { Booking, Payment, Trainer } from "@/lib/types";

export const trainers: Trainer[] = [
  { id: "t1", slug: "john-doe", name: "John Doe", specialties: ["silový tréning", "kondícia"], location: "Bratislava" },
  { id: "t2", slug: "jana-nova", name: "Jana Nová", specialties: ["yoga", "mobilita"], location: "Praha" }
];

export const bookings: Booking[] = [
  {
    id: "b1",
    trainer_id: "t1",
    client_profile_id: "cp1",
    service_id: "s1",
    booking_status: "pending",
    starts_at: "2026-03-25T10:00:00Z",
    ends_at: "2026-03-25T11:00:00Z",
    client_name: "Peter Veselý",
    client_email: "peter@priklad.sk",
    client_phone: null,
    client_note: "Preferujem tichšie prostredie.",
    trainer_note: null,
    payment_status: "unpaid",
    created_at: "2026-03-20T08:00:00Z",
    updated_at: "2026-03-20T08:00:00Z",
  },
  {
    id: "b2",
    trainer_id: "t2",
    client_profile_id: "cp1",
    service_id: "s2",
    booking_status: "confirmed",
    starts_at: "2026-03-18T14:00:00Z",
    ends_at: "2026-03-18T15:00:00Z",
    client_name: "Jana Malá",
    client_email: "jana@priklad.sk",
    client_phone: null,
    client_note: null,
    trainer_note: "Potvrdené.",
    payment_status: "paid",
    created_at: "2026-03-15T09:00:00Z",
    updated_at: "2026-03-15T09:00:00Z",
  },
];

export const payments: Payment[] = [
  { id: "p1", userId: "u1", amountCents: 2500, currency: "EUR", createdAt: "2026-03-18T14:30:00Z", status: "paid" },
  { id: "p2", userId: "u1", amountCents: 5000, currency: "CZK", createdAt: "2026-03-01T12:00:00Z", status: "paid" }
];
