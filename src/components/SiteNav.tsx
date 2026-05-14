import { Link } from "@tanstack/react-router";

const links = [
  { to: "/", label: "Home" },
  { to: "/safaris", label: "Safaris" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-outline-variant/30 shadow-[0_20px_50px_rgba(0,52,109,0.06)]">
      <div className="container-max flex justify-between items-center py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-sm bg-primary flex items-center justify-center text-on-primary font-display font-bold text-lg">
            Q
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-bold text-primary tracking-tight">
              Qafri Tours
            </div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">
              & Travels
            </div>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-on-surface-variant hover:text-primary transition-colors text-[12px] font-semibold tracking-[0.1em] uppercase"
              activeProps={{
                className:
                  "text-primary border-b-2 border-primary pb-1 text-[12px] font-semibold tracking-[0.1em] uppercase",
              }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden lg:inline-block text-[12px] font-semibold tracking-[0.1em] uppercase text-primary hover:opacity-70 transition-opacity"
          >
            Request Quote
          </Link>
          <Link to="/contact" className="btn-primary">
            Book a Trip
          </Link>
        </div>
      </div>
    </nav>
  );
}
