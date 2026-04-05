import { NavLink } from "react-router-dom";
import AppNavLink from "./AppNavLink";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-primary/15 bg-primary px-4 py-2.5 text-white shadow-lg shadow-primary/10">
      <NavLink
        to="/"
        className="text-base font-bold text-accent transition-colors hover:text-accent-warm"
      >
        WhenYh
      </NavLink>
      <ul className="flex list-none m-0 p-0">
        <li>
          <AppNavLink to="/newEvent" text="New Event" />
          <AppNavLink to="/my-blocking" text="My Blocking" />
          <AppNavLink to="/shifts" text="Assign Shifts" />
        </li>
      </ul>
    </nav>
  );
}
