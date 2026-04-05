import { supabase } from "../../utils/supabase";
import type { UserAvailabilityPayload } from "../types/BlockingType";
import { DateTime } from "luxon";

// Konversi slot (date ISO + "HH:mm" + timezone user) ke UTC ISO string
function slotToUTC(dateISO: string, time: string, timezone: string): string {
  return DateTime.fromISO(`${dateISO}T${time}`, { zone: timezone }).toUTC().toISO()!;
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
