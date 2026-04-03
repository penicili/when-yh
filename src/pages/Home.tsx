import { DayPicker } from "react-day-picker";
import { useState } from "react";

export default function Home() {
  const [selected, setSelected] = useState<Date | undefined>(undefined);
  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={setSelected}
      footer={selected ? <p>Selected date: {selected.toLocaleDateString()}</p> : undefined}
    />
  );
}
