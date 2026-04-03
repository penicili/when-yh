import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const pageTitles: Record<string, string> = {
  "/": "Create New Event",
  "/newEvent": "Create New Event",
  "/my-blocking": "My Blocking",
  "/shifts": "Assign Shifts",
};

export default function Layout() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? "WhenYh";

  return (
    <div className="flex min-h-screen flex-col bg-primary/5 text-slate-800">
      <Navbar />
      <main className="flex-1 bg-primary-dark flex flex-col gap-12 items-center justify-center">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <Outlet />
      </main>
      <footer className="border-t border-primary/10 py-6 text-center text-sm text-accent-warm bg-primary-dark">
        <p>
          &copy; {new Date().getFullYear()} WhenYh. Brought to you by penicili.
        </p>
      </footer>
    </div>
  );
}
