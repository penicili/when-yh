import { useState, useMemo } from "react";
import { DateTime } from "luxon";
import type { Event } from "../types/EventType";

type UserAvailability = {
  username: string;
  availability: string[]; // UTC ISO strings
};

type Props = {
  event: Event;
  availabilities: UserAvailability[];
};
// TO DO: Fix visual bug cell yang available warnanya overlap sama outline nya

function generateSlots(from: string, to: string, interval = 30): string[] {
  const slots: string[] = [];
  const [fh, fm] = from.split(":").map(Number);
  const [th, tm] = to.split(":").map(Number);
  let minutes = fh * 60 + fm;
  const end = th * 60 + tm;
  while (minutes < end) {
    const h = String(Math.floor(minutes / 60)).padStart(2, "0");
    const m = String(minutes % 60).padStart(2, "0");
    slots.push(`${h}:${m}`);
    minutes += interval;
  }
  return slots;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

// Konversi slot (date ISO + "HH:mm" + timezone) ke UTC ISO string untuk perbandingan
function slotToUTC(dateISO: string, time: string, timezone: string): string {
  return DateTime.fromISO(`${dateISO}T${time}`, { zone: timezone }).toUTC().toISO()!;
}

function cellColor(available: number, total: number): string {
  if (total === 0 || available === 0) return "bg-white";
  if (available === total) return "bg-primary";
  return "bg-primary/50";
}

export default function TeamTimeBlocking({ event, availabilities }: Props) {
  const [tooltip, setTooltip] = useState<{
    available: string[];
    unavailable: string[];
    x: number;
    y: number;
  } | null>(null);

  // Itung jumlah slot dan tanggal, pake useMemo biar gak re render
  const slots = useMemo(() => generateSlots(event.time_from, event.time_to), [event.time_from, event.time_to]);
  const dates = useMemo(() => [...event.dates].sort(), [event.dates]);
  const totalUsers = availabilities.length;

  // Pre-compute UTC key tiap cell — hanya dihitung ulang saat event berubah, bukan tiap mouse move
  const utcKeyMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const date of dates) {
      for (const time of slots) {
        map.set(`${date}_${time}`, slotToUTC(date, time, event.timezone));
      }
    }
    return map;
  }, [dates, slots, event.timezone]);

  // Pre-compute Set per user untuk O(1) lookup (vs .includes() yang O(n))
  const availabilitySets = useMemo(
    () => availabilities.map((u) => ({ username: u.username, set: new Set(u.availability) })),
    [availabilities],
  );

  return (
    <div className="bg-white rounded-lg p-4 overflow-auto select-none">
      <div className="relative">
          <table className="border-collapse text-sm">
            <thead>
              <tr>
                <th className="px-2 py-1 text-gray-400 font-normal"></th>
                {dates.map((d) => (
                  <th
                    key={d}
                    className="px-2 py-1 text-center text-xs font-medium text-gray-600 min-w-16"
                  >
                    {formatDate(d)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {slots.map((time) => (
                <tr key={time}>
                  <td className="pr-2 text-right text-xs text-gray-400 whitespace-nowrap">
                    {time}
                  </td>
                  {dates.map((date) => {
                    const utcKey = utcKeyMap.get(`${date}_${time}`)!;
                    const available = availabilitySets.filter((u) => u.set.has(utcKey));
                    const unavailable = availabilitySets.filter((u) => !u.set.has(utcKey));
                    return (
                      <td
                        key={date}
                        className={`border border-gray-100 h-6 cursor-default transition-colors ${cellColor(available.length, totalUsers)}`}
                        onMouseEnter={(e) => {
                          if (totalUsers === 0) return;
                          setTooltip({
                            available: available.map((u) => u.username),
                            unavailable: unavailable.map((u) => u.username),
                            x: e.clientX + 12,
                            y: e.clientY + 12,
                          });
                        }}
                        onMouseMove={(e) =>
                          setTooltip((prev) =>
                            prev ? { ...prev, x: e.clientX + 12, y: e.clientY + 12 } : null,
                          )
                        }
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="fixed z-50 pointer-events-none bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-xs min-w-32"
              style={{ top: tooltip.y, left: tooltip.x }}
            >
              {tooltip.available.length > 0 && (
                <div className="mb-1">
                  <span className="font-semibold text-primary">Available:</span>{" "}
                  {tooltip.available.join(", ")}
                </div>
              )}
              {tooltip.unavailable.length > 0 && (
                <div>
                  <span className="font-semibold text-red-400">Unavailable:</span>{" "}
                  {tooltip.unavailable.join(", ")}
                </div>
              )}
            </div>
          )}
        </div>
    </div>
  );
}
