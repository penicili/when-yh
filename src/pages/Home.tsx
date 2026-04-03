import { useState } from "react";
import Calendar from "../components/Calendar";
import TimeSelect from "../components/TimeSelect";

const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export default function Home() {
  const [selected, setSelected] = useState<Date[] | undefined>(undefined);
  const [timezone, setTimezone] = useState(userTimezone);
  const [timeFrom, setTimeFrom] = useState("08:00");
  const [timeTo, setTimeTo] = useState("17:00");

  function handleSubmit() {
    console.log({ selected, timezone, timeFrom, timeTo });
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <input
        className="bg-white text-lg py-2 px-3 rounded-md"
        type="text"
        placeholder="When to what?"
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
