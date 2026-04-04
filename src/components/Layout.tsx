import { Outlet, useLocation, useMatch } from "react-router-dom";
import Navbar from "./Navbar";

const pageTitles: Record<string, string> = {
  "/": "WhenYH - Home",
  "/newEvent": "Create New Event",
  "/my-blocking": "My Blocking",
  "/shifts": "Assign Shifts",
};

export default function Layout() {
  const eventMatch = useMatch("/event/:id");
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? (eventMatch ? `Event Details` : "WhenYh");

  return (
    <div className="flex min-h-screen flex-col bg-primary/5 text-slate-800">
      <Navbar />
      <main className="flex-1 bg-primary-dark flex flex-col gap-12 items-center justify-center">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <Outlet />
      </main>
      <footer className="border-t border-primary/10 py-6 text-center text-sm text-accent-warm bg-primary-dark">
        <span>
          WhenYh. Brought to you by 
        </span>
        <a href="https://github.com/penicili/when-yh" target="_blank"> penicili</a>
      </footer>
    </div>
  );
}
