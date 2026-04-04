import { useParams } from "react-router-dom";
import { getEvent } from "../services/eventService";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import type { Event } from "../types/EventType";
import { useOutletContext } from "react-router-dom";
import TimeBlocking from "../components/TimeBlocking";
import TeamTimeBlocking from "../components/TeamTimeBlocking";
import { getEventAvailability } from "../services/availabilityService";
import type { UserAvailability } from "../types/BlockingType";

export default function EventPage() {
  // Function buat submit user data (username & timezone)
  async function handeSubmitUserData() {
    if (!userName.trim()) {
      Swal.fire("Oops!", "Please enter a username.", "warning");
      return;
    }
    setIsUserSubmitted(true);
  }
  // States dan variables bawaan
  const timezones = Intl.supportedValuesOf("timeZone");
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timezone, setTimezone] = useState<string>(userTimezone);
  const [userName, setUserName] = useState<string>("");
  const [isUserSubmitted, setIsUserSubmitted] = useState<boolean>(false);
  const [availabilities, setAvailabilities] = useState<UserAvailability[]>([]);

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
    <div className="flex flex-row items-start justify-center gap-12">
      {!isUserSubmitted && (
        <div className="flex flex-row items-start justify-center gap-12">
          {/* Bagian kiri: Username input, select timezone */}
          <div className="bg-white rounded-lg p-4">
            <div className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                className="mb-2 bg-white rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-warm"
                onChange={(e) => setUserName(e.target.value)}
              />
              <label htmlFor="timezone">Timezone</label>
              <select
                className="mb-2 bg-white rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-warm"
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
                className="self-end bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
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
        <div className="bg-white rounded-lg p-4">
          <p className="text-gray-500 text-lg">{userName}'s Availability</p>
          <TimeBlocking event={event} isSelectable={isUserSubmitted} username={userName} timezone={timezone} />
        </div>
      )}
      {event&& (
        <div className="bg-white rounded-lg p-4">
          <TeamTimeBlocking event={event} availabilities={availabilities}/>
        </div>
      )}
    </div>
  );
}
