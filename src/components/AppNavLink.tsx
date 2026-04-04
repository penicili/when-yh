import { NavLink } from "react-router-dom";

type Props = {
  to: string;
  text: string;
};

export default function AppNavLink({ to, text }: Props) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `inline-flex px-3 py-1.5 transition-colors mx-2 ${
          isActive
            ? "border-b-2 border-accent text-accent font-bold"
            : "text-white/80 hover:text-accent hover:border-accent/50"
        }`
      }
    >
      {text}
    </NavLink>
  );
}
