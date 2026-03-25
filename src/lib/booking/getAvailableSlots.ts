import { createClient } from "@supabase/supabase-js";
import { Slot } from "@/lib/types";

export async function getAvailableSlots(trainerId: string): Promise<Slot[] | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("Supabase URL or Service Role Key is not configured.");
    return null;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await supabase
    .from("slots")
    .select("id,start_time,end_time,is_available,trainer_id")
    .eq("trainer_id", trainerId)
    .eq("is_available", true)
    .gte("start_time", new Date().toISOString())
    .order("start_time", { ascending: true });

  if (error) {
    console.error("Error fetching available slots:", error);
    return null;
  }

  // Zabezpečenie, že dáta zodpovedajú typu Slot[]
  const slots: Slot[] = data.map(slot => ({
    id: slot.id,
    start_time: slot.start_time,
    end_time: slot.end_time,
    is_available: slot.is_available,
    trainer_id: slot.trainer_id,
  }));

  return slots;
}