import { useParams } from "react-router-dom";
import { getEvent } from "../services/eventService";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import type { Event } from "../types/EventType";
import { useOutletContext } from "react-router-dom";
import TimeBlocking from "../components/TimeBlocking";


export default function EventPage() {
  // Function buat submit user data (username & timezone)
  async function handeSubmitUserData() {}
  // States dan variables bawaan
  const timezones = Intl.supportedValuesOf("timeZone");
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [timezone, setTimezone] = useState<string>(userTimezone);

  // States ketika username udah input
  const [userName, setUserName] = useState<string>("");
  const [selectedTimezone, setSelectedTimezone] =
    useState<string>(userTimezone);
  const [isUserSubmitted, setIsUserSubmitted] = useState<boolean>(false);

  // Set page title
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();
  useEffect(() => {
    setTitle(`${event ? event.name : "Event Details"}`);
  }, [setTitle, event]);

  // get event dari supabase db
  useEffect(() => {
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
    if (id) {
      fetchEvent();
    }
  }, [id]);
  if (!id) return <p>Event ID is required</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-row items-start justify-center gap-12">
      {/* Bagian kiri: Username input , select timezone*/}
      <div className="bg-white rounded-lg p-4">
        <div className="flex flex-col">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="mb-2 bg-white rounded-md p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-warm"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
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
        </div>
        <p>Username is used for this event only and saved in your browser</p>
        <button onClick={handeSubmitUserData}>Submit</button>
      </div>

      {/* Bagian Kanan: time blocking x axis = tanggal, y axis = waktu */}
      <TimeBlocking event={event} />
    </div>
  );
}
