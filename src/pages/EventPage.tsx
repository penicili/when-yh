import { useParams } from "react-router-dom";
import { getEvent } from "../services/eventService";
import Swal from "sweetalert2";
import { useEffect, useState, useMemo } from "react";
import type { Event } from "../types/EventType";
import { useOutletContext } from "react-router-dom";
import TimeBlocking from "../components/TimeBlocking";
import TeamTimeBlocking from "../components/TeamTimeBlocking";
import { getEventAvailability } from "../services/availabilityService";
import type { UserAvailability } from "../types/BlockingType";
import { DateTime } from "luxon";

export default function EventPage() {
  const timezones = Intl.supportedValuesOf("timeZone");
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timezone, setTimezone] = useState<string>(userTimezone);
  const [userName, setUserName] = useState<string>("");
  const [isUserSubmitted, setIsUserSubmitted] = useState<boolean>(false);
  const [availabilities, setAvailabilities] = useState<UserAvailability[]>([]);

  // Baca username dari localStorage saat pertama load
  useEffect(() => {
    const saved = localStorage.getItem("whenYH_username");
    if (saved) {
      setUserName(saved);
      setIsUserSubmitted(true);
    }
  }, []);

  // Submit: simpan username ke localStorage
  async function handeSubmitUserData() {
    if (!userName.trim()) {
      Swal.fire("Oops!", "Please enter a username.", "warning");
      return;
    }
    localStorage.setItem("whenYH_username", userName);
    setIsUserSubmitted(true);
  }

  // Pre-fill blocked cells dari availability user yang sudah tersimpan
  const initialBlocked = useMemo(() => {
    const userAvail = availabilities.find((a) => a.username === userName);
    if (!userAvail) return new Set<string>();
    const blocked = new Set<string>();
    for (const utcISO of userAvail.availability) {
      const dt = DateTime.fromISO(utcISO).setZone(timezone);
      blocked.add(`${dt.toISODate()}_${dt.toFormat("HH:mm")}`);
    }
    return blocked;
  }, [availabilities, userName, timezone]);

  // Konversi time_from/time_to dari UTC ke timezone yang dipilih user
  const convertedEvent = useMemo<Event | null>(() => {
    if (!event) return null;
    const refDate = event.dates[0];
    const timeFrom = DateTime.fromISO(`${refDate}T${event.time_from}Z`)
      .setZone(timezone)
      .toFormat("HH:mm");
    const timeTo = DateTime.fromISO(`${refDate}T${event.time_to}Z`)
      .setZone(timezone)
      .toFormat("HH:mm");
    return { ...event, time_from: timeFrom, time_to: timeTo, timezone };
  }, [event, timezone]);

  // Set page title
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();
  useEffect(() => {
    setTitle(`${event ? event.name : "Event Details"}`);
  }, [setTitle, event]);

  useEffect(() => {
    // get event dari supabase db
    async function fetchEvent() {
      try {
        const eventData = await getEvent(id!);
        setEvent(eventData);
      } catch (error) {
        Swal.fire(
          "Error!",
          `There was an error fetching the event. ${error}`,
          "error",
        );
      } finally {
        setLoading(false);
      }
    }

    async function fetchAvailability() {
      try {
        const availabilityData = await getEventAvailability(id!);
        setAvailabilities(availabilityData);
      } catch (error) {
        Swal.fire(
          "Error!",
          `There was an error fetching availability data. ${error}`,
          "error",
        );
      }
    }

    if (id) {
      fetchEvent();
      fetchAvailability();
    }
  }, [id]);
  if (!id) return <p>Event ID is required</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-row items-start justify-center gap-8">
      {!isUserSubmitted && (
        <div className="flex flex-row items-start justify-center gap-8">
          {/* Bagian kiri: Username input, select timezone */}
          <div className="bg-white rounded-lg p-3">
            <div className="flex flex-col">
              <label htmlFor="username" className="text-sm mb-1">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="mb-2 bg-white rounded-md p-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-warm"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
              <label htmlFor="timezone" className="text-sm mb-1">Timezone</label>
              <select
                className="mb-2 bg-white rounded-md p-1.5 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-warm"
                name="timezone"
                id="timezone"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>
                    {tz}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-400 mb-2">
                Username is used for this event only and saved in your browser
              </p>
              <button
                onClick={handeSubmitUserData}
                className="self-end bg-primary text-white font-semibold py-1.5 px-3 text-sm rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                Submit
              </button>
            </div>
          </div>
          {/* Bagian kanan, team time blocking yang disabled */}
        </div>
      )}
      {/* time blocking buat dipilih */}
      {isUserSubmitted && (
        <div className="bg-white rounded-lg p-3">
          <p className="text-gray-500 text-base mb-2">{userName}'s Availability</p>
          <TimeBlocking
            key={initialBlocked.size}
            event={convertedEvent}
            isSelectable={isUserSubmitted}
            username={userName}
            timezone={timezone}
            initialBlocked={initialBlocked}
            onAvailabilityChange={(utcSlots) =>
              setAvailabilities((prev) => {
                const existing = prev.find((a) => a.username === userName);
                const updated = existing
                  ? { ...existing, availability: utcSlots }
                  : {
                      availId: "",
                      event_id: id!,
                      username: userName,
                      timezone,
                      availability: utcSlots,
                      updated_at: "",
                    };
                return [
                  ...prev.filter((a) => a.username !== userName),
                  updated,
                ];
              })
            }
          />
        </div>
      )}
      {convertedEvent && (
        <div className="bg-white rounded-lg p-3">
          <p className="text-gray-500 text-base mb-2">Summary</p>
          <TeamTimeBlocking
            event={convertedEvent}
            availabilities={availabilities}
          />
        </div>
      )}
    </div>
  );
}
