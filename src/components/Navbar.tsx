import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
      <NavLink to="/" className="text-xl font-bold text-indigo-600 hover:text-indigo-700">
        WhenYh
      </NavLink>
      <ul className="flex gap-4 list-none m-0 p-0">
        <li>
          <NavLink
            to="/newEvent"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-md font-medium transition-colors ${
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
              }`
            }
          >
            New Event
          </NavLink>
          <NavLink to="/my-blocking" className={({ isActive }) =>
            `px-3 py-1.5 rounded-md font-medium transition-colors ${
              isActive
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
            }`
          }>
            My Blocking
          </NavLink>
          <NavLink to="/shifts" className={({ isActive }) =>
            `px-3 py-1.5 rounded-md font-medium transition-colors ${
              isActive
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-600 hover:text-indigo-600 hover:bg-indigo-50"
            }`
          }>
            Assign Shifts
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
