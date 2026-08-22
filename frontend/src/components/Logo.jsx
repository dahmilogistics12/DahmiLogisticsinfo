import { Link } from "react-router-dom";
import logoMark from "@/assets/logo.png";

export const Logo = ({ light = false }) => {
  return (
    <Link to="/" data-testid="navbar-logo" className="flex items-center gap-3 group">
      <img src={logoMark} alt="Dahmi Logistics" className="h-12 w-12 object-contain" />
      <span className="leading-none">
        <span
          className={`block text-2xl font-bold tracking-tight ${
            light ? "text-white" : "text-[hsl(var(--brand-navy))] dark:text-white"
          }`}
        >
          DAHMI
        </span>
        <span
          className={`block text-xs font-semibold tracking-[0.24em] ${
            light ? "text-white/70" : "text-[hsl(var(--brand-orange-2))]"
          }`}
        >
          LOGISTICS
        </span>
      </span>
    </Link>
  );
};
