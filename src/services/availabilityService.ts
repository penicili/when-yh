import { supabase } from "../../utils/supabase";
import type { UserAvailabilityPayload } from "../types/BlockingType";

// Konversi slot (date ISO + "HH:mm" + timezone user) ke UTC ISO string
function slotToUTC(dateISO: string, time: string, timezone: string): string {
  const [h, m] = time.split(":").map(Number);
  const dateStr = new Date(dateISO).toLocaleDateString("en-CA", {
    timeZone: timezone,
  }); // "YYYY-MM-DD"

  const asUTC = new Date(
    `${dateStr}T${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:00Z`,
  );
  const inTz = new Date(asUTC.toLocaleString("en-US", { timeZone: timezone }));
  const diff = asUTC.getTime() - inTz.getTime();

  return new Date(asUTC.getTime() + diff).toISOString();
}

// Submit atau update availability user untuk suatu event
export async function submitUserAvailability(payload: UserAvailabilityPayload) {
  const normalizedSlots = Object.entries(payload.availability).flatMap(
    ([date, times]) =>
      times.map((time) => slotToUTC(date, time, payload.timezone)),
  );

  const { data, error } = await supabase
    .from("user_availability")
    .upsert(
      {
        event_id: payload.eventId,
        username: payload.username,
        timezone: payload.timezone,
        availability: normalizedSlots,
      },
      { onConflict: "event_id,username" },
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Ambil semua availability user untuk suatu event
export async function getEventAvailability(eventId: string) {
  const { data, error } = await supabase
    .from("user_availability")
    .select()
    .eq("event_id", eventId);

  if (error) throw error;
  return data;
}

// dari semua slot, mapping slot itu yang available siapa saja
