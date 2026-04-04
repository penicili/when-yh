import { useState, useRef } from "react";
import type { Event } from "../types/EventType";
type Props = {
  event: Event | null;
};

function generateSlots(from: string, to: string, interval = 30): string[] {
  const slots: string[] = [];
  //fh= jam mulai, fm= menit mulai
  const [fh, fm] = from.split(":").map(Number);
  //th= jam selesai, tm= menit selesai
  const [th, tm] = to.split(":").map(Number);
  //   menit mulai
  let minutes = fh * 60 + fm;
  //   menit selesai
  const end = th * 60 + tm;
  //   loop row table mulai dari menit mulai sampe menit selesai
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

export default function TimeBlocking({ event }: Props) {
  // States buat time blocking
  const [blocked, setBlocked] = useState<Set<string>>(new Set());
  const isDragging = useRef(false);
  const dragValue = useRef(true);

  return (
    <div
      className="bg-white rounded-lg p-4 overflow-auto select-none"
      onMouseLeave={() => {
        isDragging.current = false;
      }}
      onMouseUp={() => {
        isDragging.current = false;
      }}
    >
      {event &&
        (() => {
          const slots = generateSlots(event.time_from, event.time_to);
          const dates = [...event.dates].sort();
          return (
            <table className="border-collapse text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-1 text-gray-400 font-normal"></th>
                  {/* X-axis: Dates */}
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
                {/* Y-axis: Time slots dari generateSlots */}
                {slots.map((time) => (
                  <tr key={time}>
                    <td className="pr-2 text-right text-xs text-gray-400 whitespace-nowrap">
                      {time}
                    </td>
                    {dates.map((date) => {
                      const key = `${date}_${time}`;
                      const isBlocked = blocked.has(key);
                      return (
                        <td
                          key={date}
                          className={`border border-gray-100 h-6 cursor-pointer transition-colors ${
                            isBlocked
                              ? "bg-primary"
                              : "bg-white hover:bg-primary/20"
                          }`}
                          onMouseDown={() => {
                            isDragging.current = true;
                            dragValue.current = !isBlocked;
                            setBlocked((prev) => {
                              const next = new Set(prev);
                              if (dragValue.current) next.add(key);
                              else next.delete(key);
                              return next;
                            });
                          }}
                          onMouseEnter={() => {
                            if (!isDragging.current) return;
                            setBlocked((prev) => {
                              const next = new Set(prev);
                              if (dragValue.current) next.add(key);
                              else next.delete(key);
                              return next;
                            });
                          }}
                        />
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          );
        })()}
    </div>
  );
}
