import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/booking/getAvailableSlots";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trainerId = searchParams.get("trainerId");

  if (!trainerId) {
    return NextResponse.json({ message: "Chýba trainerId." }, { status: 400 });
  }

  try {
    // Voláme existujúcu funkciu getAvailableSlots, ktorá používa availability_slots a bookings
    // Nepoužívame tabuľku slots (ktorá je prázdna)
    const slots = await getAvailableSlots(trainerId);
    
    if (!slots) {
      console.error(`getAvailableSlots vrátil null pre trainerId: ${trainerId}`);
      return NextResponse.json({ message: "Nepodarilo sa načítať sloty." }, { status: 500 });
    }

    // Vrátime priamo pole slotov (nie { ok: true, slots: ... })
    return NextResponse.json(slots);
  } catch (error: any) {
    console.error("API error fetching slots:", error);
    return NextResponse.json({ message: error.message || "Interná chyba servera." }, { status: 500 });
  }
}
