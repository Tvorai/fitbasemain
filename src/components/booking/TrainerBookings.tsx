"use client";

import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabaseUrl, supabaseAnonKey } from "@/lib/config";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface TrainerBookingsProps {
  trainerId: string;
}

type TrainerBookingItem = {
  id: string;
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  clientNote: string | null;
  startsAt: string;
  endsAt: string;
  status: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toTrainerBookingItem(value: unknown): TrainerBookingItem | null {
  if (!isRecord(value)) return null;
  const id = value.id;
  const startsAt = value.starts_at;
  const endsAt = value.ends_at;
  const status = value.booking_status;
  if (typeof id !== "string" || typeof startsAt !== "string" || typeof endsAt !== "string" || typeof status !== "string") {
    return null;
  }

  const clientNameRaw = value.client_name;
  const clientEmailRaw = value.client_email;
  const clientPhoneRaw = value.client_phone;
  const clientNoteRaw = value.client_note;

  return {
    id,
    startsAt,
    endsAt,
    status,
    clientName: typeof clientNameRaw === "string" && clientNameRaw.trim() ? clientNameRaw : "Bez mena",
    clientEmail: typeof clientEmailRaw === "string" ? clientEmailRaw : null,
    clientPhone: typeof clientPhoneRaw === "string" ? clientPhoneRaw : null,
    clientNote: typeof clientNoteRaw === "string" ? clientNoteRaw : null,
  };
}

export default function TrainerBookings({ trainerId }: TrainerBookingsProps) {
  const [bookings, setBookings] = useState<TrainerBookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("bookings")
          .select("id, starts_at, ends_at, booking_status, client_name, client_email, client_phone, client_note")
          .eq("trainer_id", trainerId)
          .order("starts_at", { ascending: true });

        if (error) throw error;
        const payload: unknown = data;
        const mapped = Array.isArray(payload) ? payload.map(toTrainerBookingItem).filter((x): x is TrainerBookingItem => x !== null) : [];
        setBookings(mapped);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Nepodarilo sa načítať rezervácie.");
      } finally {
        setLoading(false);
      }
    }

    if (trainerId) {
      fetchBookings();
    }
  }, [trainerId]);

  if (loading) return <div className="text-zinc-500 animate-pulse">Načítavam rezervácie...</div>;
  if (error) return <div className="text-red-400">Chyba: {error}</div>;

  return (
    <div className="space-y-4">
      {bookings.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-800/80 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-6 py-4">Meno klienta</th>
                <th className="px-6 py-4">Termín</th>
                <th className="px-6 py-4">Kontakt</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">
                    {booking.clientName}
                  </td>
                  <td className="px-6 py-4 text-zinc-300">
                    <div className="font-bold">
                      {new Date(booking.startsAt).toLocaleDateString("sk-SK")}
                    </div>
                    <div className="text-[10px] text-zinc-500">
                      {new Date(booking.startsAt).toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" })} - {new Date(booking.endsAt).toLocaleTimeString("sk-SK", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">
                    <div>{booking.clientEmail || "—"}</div>
                    {booking.clientPhone && <div className="text-xs opacity-60">{booking.clientPhone}</div>}
                    {booking.clientNote && <div className="text-xs opacity-60 mt-1">{booking.clientNote}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      booking.status === "confirmed" ? "bg-emerald-500/20 text-emerald-500" :
                      booking.status === "pending" ? "bg-yellow-500/20 text-yellow-500" :
                      "bg-zinc-700/50 text-zinc-400"
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-zinc-500 italic">Zatiaľ nemáte žiadne rezervácie.</p>
      )}
    </div>
  );
}
