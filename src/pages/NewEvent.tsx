import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/Calendar";
import TimeSelect from "../components/TimeSelect";
import { createEvent } from "../services/eventService";
import Swal from "sweetalert2";

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export default function NewEvent() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Date[] | undefined>(undefined);
  const [timezone, setTimezone] = useState(userTimezone);
  const [timeFrom, setTimeFrom] = useState("08:00");
  const [timeTo, setTimeTo] = useState("17:00");
  const [eventName, setEventName] = useState("");

  async function handleSubmit() {
    if (!selected || selected.length === 0) {
      Swal.fire("Oops!", "Please select at least one date.", "warning");
      return;
    }
    try {
      const data = await createEvent({
        name: eventName || "My Event",
        dates: selected || [],
        timezone,
        timeFrom,
        timeTo,
      });
      await Swal.fire(
        "Event Created!",
        "Your event has been created successfully.",
        "success",
      );
      navigate(`/event/${data.id}`);
    } catch (error) {
      Swal.fire(
        "Error!",
        `There was an error creating the event. ${error}`,
        "error"
      );
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <input
        className="bg-white text-lg py-2 px-3 rounded-md"
        type="text"
        placeholder="My Event"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <div className="flex flex-row items-center justify-center gap-8">
        <Calendar selected={selected} onSelect={setSelected} />
        <div className="flex flex-col bg-white self-stretch rounded-lg p-6 shadow-md">
          <TimeSelect
            timezone={timezone}
            timeFrom={timeFrom}
            timeTo={timeTo}
            onTimezoneChange={setTimezone}
            onTimeFromChange={setTimeFrom}
            onTimeToChange={setTimeTo}
          />
          <button
            onClick={handleSubmit}
            className="mt-auto bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}
