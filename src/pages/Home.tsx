import { DayPicker } from "react-day-picker";
import { useState } from "react";

const timezones = Intl.supportedValuesOf("timeZone");
const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export default function Home() {
  const [selected, setSelected] = useState<Date[] | undefined>(undefined);
  const [timezone, setTimezone] = useState(userTimezone);
  const [timeFrom, setTimeFrom] = useState("08:00");
  const [timeTo, setTimeTo] = useState("17:00");
  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <input className="bg-white text-lg py-2 px-3 rounded-md" type="text" placeholder="When to what?" />
      <div className="flex flex-row items-center justify-center gap-8">
        <DayPicker
          animate
          mode="multiple"
          selected={selected}
          onSelect={setSelected}
          footer={`${selected ? selected.length : 0} day(s) selected.`}
        />

        <div className="flex flex-col bg-white self-stretch rounded-lg p-6 shadow-md">
          <h2>Select Time</h2>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="timezone">Select Timezone</label>
            <select
              name="timezone"
              id="timezone"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timezones.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <p className="font-medium text-sm text-gray-600">
              Select Time Range
            </p>
            <div className="flex items-center gap-2 justify-end">
              <input
                type="time"
                value={timeFrom}
                onChange={(e) => setTimeFrom(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <span className="text-gray-400">–</span>
              <input
                type="time"
                value={timeTo}
                onChange={(e) => setTimeTo(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
          <button className="button mt-auto bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary/50">
            Create Event
          </button>
        </div>
      </div>
    </div>
  );
}
