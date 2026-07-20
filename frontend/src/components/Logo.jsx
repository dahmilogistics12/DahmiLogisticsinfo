import { Truck } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = ({ light = false }) => {
  return (
    <Link to="/" data-testid="navbar-logo" className="flex items-center gap-2.5 group">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(var(--brand-orange))] text-white shadow-sm">
        <Truck className="h-5 w-5" strokeWidth={2} />
      </span>
      <span className="leading-none">
        <span
          className={`block text-[17px] font-bold tracking-tight ${
            light ? "text-white" : "text-[hsl(var(--brand-navy))]"
          }`}
        >
          DAHMI
        </span>
        <span
          className={`block text-[10px] font-semibold tracking-[0.28em] ${
            light ? "text-white/70" : "text-[hsl(var(--brand-orange-2))]"
          }`}
        >
          LOGISTICS
        </span>
      </span>
    </Link>
  );
};
