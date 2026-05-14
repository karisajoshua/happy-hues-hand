import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/qafri-logo.png";
import { SERVICES } from "@/lib/services";

const links = [
  { to: "/", label: "Home" },
  { to: "/safaris", label: "Safaris" },
  { to: "/services", label: "Services", mega: true },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [openMega, setOpenMega] = useState(false);

  return (
    <nav
      className="sticky top-0 z-50 w-full glass-panel border-b border-outline-variant/30 shadow-[0_20px_50px_rgba(0,52,109,0.06)] animate-fade-in-soft"
      onMouseLeave={() => setOpenMega(false)}
    >
      <div className="container-max flex justify-between items-center py-4">
        <Link to="/" className="flex items-center" aria-label="Qafri Tours & Travels">
          <img
            src={logo}
            alt="Qafri Tours & Travels"
            className="h-12 w-auto"
            width={240}
            height={96}
          />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) =>
            "mega" in l && l.mega ? (
              <div
                key={l.to}
                className="relative"
                onMouseEnter={() => setOpenMega(true)}
              >
                <Link
                  to={l.to}
                  className="text-on-surface-variant hover:text-primary transition-colors text-[12px] font-semibold tracking-[0.1em] uppercase"
                  activeProps={{
                    className:
                      "text-primary border-b-2 border-primary pb-1 text-[12px] font-semibold tracking-[0.1em] uppercase",
                  }}
                >
                  {l.label}
                </Link>
              </div>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                onMouseEnter={() => setOpenMega(false)}
                className="text-on-surface-variant hover:text-primary transition-colors text-[12px] font-semibold tracking-[0.1em] uppercase"
                activeProps={{
                  className:
                    "text-primary border-b-2 border-primary pb-1 text-[12px] font-semibold tracking-[0.1em] uppercase",
                }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ),
          )}
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

      {/* Mega menu panel */}
      <div
        className={`hidden md:block absolute left-0 right-0 top-full overflow-hidden transition-all duration-300 ${
          openMega ? "max-h-[640px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="glass-panel border-t border-outline-variant/30 shadow-[0_30px_60px_rgba(0,52,109,0.12)]">
          <div className="container-max py-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  to="/services"
                  onClick={() => setOpenMega(false)}
                  className="group block rounded-lg overflow-hidden bg-white/60 hover:bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      width={400}
                      height={250}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-semibold text-primary mb-1">
                      {s.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {s.short}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-outline-variant/30 flex justify-between items-center">
              <p className="text-xs text-on-surface-variant">
                IATA Accredited Agency · Headquartered in Nairobi, Kenya
              </p>
              <Link
                to="/services"
                onClick={() => setOpenMega(false)}
                className="text-[12px] font-semibold tracking-[0.1em] uppercase text-primary hover:opacity-70"
              >
                View All Services →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
