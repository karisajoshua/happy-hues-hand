import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/qafri-logo.png";
import { SERVICES } from "@/lib/services";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const links = [
  { to: "/", label: "Home" },
  { to: "/safaris", label: "Safaris" },
  { to: "/services", label: "Services", mega: true },
  { to: "/itinerary", label: "Plan Trip" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [openMega, setOpenMega] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  // Close menus on route change
  useEffect(() => {
    setOpenMega(false);
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mega menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (openMega) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [openMega]);

  return (
    <>
      {/* Mega menu backdrop — covers the page behind */}
      {openMega && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpenMega(false)}
          className="hidden md:block fixed inset-0 z-40 bg-black/40 backdrop-blur-sm animate-fade-in-soft"
        />
      )}

      <nav
        className="sticky top-0 z-50 w-full bg-white border-b border-outline-variant/30 shadow-[0_8px_24px_rgba(0,52,109,0.06)] animate-fade-in-soft"
        onMouseLeave={() => setOpenMega(false)}
      >
        <div className="container-max flex justify-between items-center py-3 md:py-4 gap-3">
          <Link
            to="/"
            className="flex items-center shrink-0"
            aria-label="Qafri Tours & Travels"
          >
            <img
              src={logo}
              alt="Qafri Tours & Travels"
              className="h-9 md:h-12 w-auto"
              width={240}
              height={96}
            />
          </Link>

          {/* Desktop links */}
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

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
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

          {/* Mobile hamburger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Open menu"
                className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-outline-variant/40 text-primary"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[88vw] max-w-sm bg-white p-0 flex flex-col"
            >
              <SheetTitle className="sr-only">Site navigation</SheetTitle>
              <div className="flex items-center justify-between p-5 border-b border-outline-variant/30">
                <img
                  src={logo}
                  alt="Qafri Tours & Travels"
                  className="h-9 w-auto"
                />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="p-2 -m-2 text-on-surface-variant hover:text-primary"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto p-5 space-y-1">
                {links.map((l) =>
                  "mega" in l && l.mega ? (
                    <Collapsible
                      key={l.to}
                      open={servicesOpen}
                      onOpenChange={setServicesOpen}
                    >
                      <div className="flex items-center justify-between">
                        <Link
                          to={l.to}
                          onClick={() => setMobileOpen(false)}
                          className="flex-1 py-3 text-[14px] font-semibold tracking-[0.08em] uppercase text-on-surface hover:text-primary"
                        >
                          {l.label}
                        </Link>
                        <CollapsibleTrigger
                          aria-label="Toggle services"
                          className="p-2 text-on-surface-variant"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              servicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </CollapsibleTrigger>
                      </div>
                      <CollapsibleContent className="pl-3 pb-2 space-y-1">
                        {SERVICES.map((s) => (
                          <Link
                            key={s.slug}
                            to="/services/$slug"
                            params={{ slug: s.slug }}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 text-sm text-on-surface-variant hover:text-primary"
                          >
                            {s.title}
                          </Link>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setMobileOpen(false)}
                      className="block py-3 text-[14px] font-semibold tracking-[0.08em] uppercase text-on-surface hover:text-primary"
                      activeProps={{ className: "text-primary" }}
                      activeOptions={{ exact: l.to === "/" }}
                    >
                      {l.label}
                    </Link>
                  ),
                )}
              </nav>

              <div className="p-5 border-t border-outline-variant/30 space-y-3">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary block w-full text-center"
                >
                  Book a Trip
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-6 py-3 border border-primary/40 text-primary text-[12px] tracking-[0.1em] uppercase font-semibold hover:bg-primary/5 transition-colors"
                >
                  Request Quote
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mega menu panel */}
        <div
          onMouseEnter={() => setOpenMega(true)}
          className={`hidden md:block absolute left-0 right-0 top-full transition-all duration-300 ${
            openMega ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-white border-t border-outline-variant/30 shadow-[0_30px_60px_rgba(0,52,109,0.18)] max-h-[calc(100vh-72px)] overflow-y-auto">
            <div className="container-max py-10">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {SERVICES.map((s) => (
                  <Link
                    key={s.slug}
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group block rounded-lg overflow-hidden bg-white hover:bg-surface-container-low transition-all hover:-translate-y-0.5 hover:shadow-lg border border-outline-variant/20"
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
                  className="text-[12px] font-semibold tracking-[0.1em] uppercase text-primary hover:opacity-70"
                >
                  View All Services →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
