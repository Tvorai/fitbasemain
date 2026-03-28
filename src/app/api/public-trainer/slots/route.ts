import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/booking/getAvailableSlots";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trainerId = searchParams.get("trainerId");
  const serviceType = (searchParams.get("serviceType") || "personal") as "personal" | "online";
  const slotDuration = parseInt(searchParams.get("slotDuration") || "60");

  if (!trainerId) {
    return NextResponse.json(
      { message: "Chýba trainerId.", step: "prijatie_parametra", details: "trainerId nebol nájdený v URL query." }, 
      { status: 400 }
    );
  }

  try {
    // Voláme existujúcu funkciu getAvailableSlots, ktorú sme upravili
    const slots = await getAvailableSlots(trainerId, 7, slotDuration, 30, serviceType);
    
    if (!slots) {
      return NextResponse.json(
        { message: "Nepodarilo sa načítať sloty.", step: "vypocet_slotov", details: "getAvailableSlots vrátil null." }, 
        { status: 500 }
      );
    }

    // Vrátime priamo pole slotov (nie { ok: true, slots: ... })
    return NextResponse.json(slots);
  } catch (error: any) {
    console.error("API error fetching slots:", error);
    
    // Identifikácia kroku na základe správy chyby
    let step = "neznamy_krok";
    if (error.message.includes("SUPABASE_URL")) step = "env_check";
    if (error.message.includes("SUPABASE_SERVICE_ROLE_KEY")) step = "env_check";
    if (error.message.includes("availability_slots")) step = "query_availability";
    if (error.message.includes("bookings")) step = "query_bookings";

    return NextResponse.json(
      { 
        message: error.message || "Interná chyba servera.", 
        step: step, 
        details: error.stack || "Žiadne detaily nie sú k dispozícii." 
      }, 
      { status: 500 }
    );
  }
}
