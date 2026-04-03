import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/15 bg-primary px-6 py-4 text-white shadow-lg shadow-primary/10">
      <NavLink to="/" className="text-xl font-bold text-accent transition-colors hover:text-accent-warm">
        WhenYh
      </NavLink>
      <ul className="flex gap-4 list-none m-0 p-0">
        <li>
          <NavLink
            to="/newEvent"
            className={({ isActive }) =>
              `inline-flex px-3 py-1.5 rounded-md font-medium transition-colors ${
                isActive
                  ? "bg-accent text-primary"
                  : "text-white/80 hover:bg-accent/20 hover:text-accent"
              }`
            }
          >
            New Event
          </NavLink>
          <NavLink to="/my-blocking" className={({ isActive }) =>
            `inline-flex px-3 py-1.5 rounded-md font-medium transition-colors ${
              isActive
                ? "bg-accent text-primary"
                : "text-white/80 hover:bg-accent/20 hover:text-accent"
            }`
          }>
            My Blocking
          </NavLink>
          <NavLink to="/shifts" className={({ isActive }) =>
            `inline-flex px-3 py-1.5 rounded-md font-medium transition-colors ${
              isActive
                ? "bg-accent text-primary"
                : "text-white/80 hover:bg-accent/20 hover:text-accent"
            }`
          }>
            Assign Shifts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
