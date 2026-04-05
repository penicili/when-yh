const timezones = Intl.supportedValuesOf("timeZone");

type Props = {
  timezone: string;
  timeFrom: string;
  timeTo: string;
  onTimezoneChange: (tz: string) => void;
  onTimeFromChange: (t: string) => void;
  onTimeToChange: (t: string) => void;
};

export default function TimeSelect({
  timezone,
  timeFrom,
  timeTo,
  onTimezoneChange,
  onTimeFromChange,
  onTimeToChange,
}: Props) {
  return (
    <>
      <h2 className="text-base font-semibold">Select Time</h2>
      <div className="flex flex-col gap-1.5 mt-3">
        <label htmlFor="timezone" className="text-sm">Select Timezone</label>
        <select
          name="timezone"
          id="timezone"
          value={timezone}
          onChange={(e) => onTimezoneChange(e.target.value)}
          className="w-40 border border-gray-300 rounded-md py-1.5 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {timezones.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5 mt-3">
        <p className="font-medium text-sm text-gray-600">Select Time Range</p>
        <div className="flex items-center gap-2">
          <input
            type="time"
            value={timeFrom}
            onChange={(e) => onTimeFromChange(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <span className="text-gray-400">–</span>
          <input
            type="time"
            value={timeTo}
            onChange={(e) => onTimeToChange(e.target.value)}
            className="border border-gray-300 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>
    </>
  );
}
