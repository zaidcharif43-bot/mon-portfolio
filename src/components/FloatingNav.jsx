import { NavLink } from "react-router-dom";
import { pagePathMap } from "../utils/routes";

const navItems = [
  { key: "home", icon: "fa-solid fa-house", label: "Accueil" },
  { key: "about", icon: "fa-regular fa-user", label: "A propos" },
  { key: "resume", icon: "fa-regular fa-address-card", label: "Resume" },
  { key: "portfolio", icon: "fa-solid fa-briefcase", label: "Portfolio" },
  { key: "cv", icon: "fa-regular fa-file-lines", label: "CV" },
  { key: "contact", icon: "fa-regular fa-envelope", label: "Contact" },
];

export function FloatingNav() {
  return (
    <nav className="floating-nav" aria-label="Navigation principale">
      {navItems.map((item) => (
        <NavLink
          key={item.key}
          to={pagePathMap[item.key]}
          aria-label={item.label}
          className={({ isActive }) => (isActive ? "active" : "")}
          end={item.key === "home"}
        >
          <i className={item.icon} />
        </NavLink>
      ))}
    </nav>
  );
}
