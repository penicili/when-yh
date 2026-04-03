import { DayPicker } from "react-day-picker";

type Props = {
  selected: Date[] | undefined;
  onSelect: (dates: Date[] | undefined) => void;
};

export default function Calendar({ selected, onSelect }: Props) {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <DayPicker
      animate
      timeZone={timezone}
      mode="multiple"
      selected={selected}
      onSelect={onSelect}
      footer={
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm text-gray-500">
            {selected ? selected.length : 0} day(s) selected.
          </span>
          {selected && selected.length > 0 && (
            <button
              onClick={() => onSelect(undefined)}
              className="text-sm text-red-500 hover:underline"
            >
              Reset
            </button>
          )}
        </div>
      }
    />
  );
}
