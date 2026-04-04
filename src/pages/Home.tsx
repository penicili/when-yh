import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
export default function Home() {
  // Set page title
  const { setTitle } = useOutletContext<{
    setTitle: (title: string) => void;
  }>();
  useEffect(() => {
    setTitle("WhenYH - Home");
  }, [setTitle]);
  return (
    <div className="flex flex-col items-center justify-center gap-12"></div>
  );
}
