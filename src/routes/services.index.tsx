import { createFileRoute, Link } from "@tanstack/react-router";
import servicesHero from "@/assets/services-hero.jpg";
import safariImg from "@/assets/safari-hero.jpg";
import { SERVICES } from "@/lib/services";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Qafri Tours" },
      {
        name: "description",
        content:
          "Air ticketing, visa assistance, hotel reservations, corporate MICE, car rentals, and bespoke safari planning.",
      },
      { property: "og:image", content: servicesHero },
    ],
    links: [{ rel: "canonical", href: "https://happy-hues-hand.lovable.app/services" }],
  }),
});

function ServicesPage() {
  return (
    <>
      <header className="relative w-full h-[480px] md:h-[560px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={servicesHero}
            alt="Modern airport terminal at sunset"
            className="w-full h-full object-cover brightness-[0.7]"
            width={1920}
            height={1080}
          />
        </div>
        <div className="relative z-10 container-max">
          <div className="max-w-2xl">
            <span className="text-[12px] tracking-[0.2em] uppercase font-semibold text-primary-fixed-dim block mb-4">
              Elite Logistics
            </span>
            <h1 className="font-display text-[40px] md:text-[64px] leading-[1.05] font-bold text-white mb-6">
              Bespoke Travel Engineering
            </h1>
            <p className="text-lg text-white/85 max-w-lg">
              Navigating the complexities of global travel with architectural
              precision and editorial grace.
            </p>
          </div>
        </div>
      </header>

      {/* Bento services */}
      <section className="py-24 container-max">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="font-display text-[32px] font-semibold text-primary mb-4">
              Our Core Competencies
            </h2>
            <p className="text-on-surface-variant">
              From international air ticketing to complex visa coordination, we
              handle the logistical backbone of your journey.
            </p>
          </div>
          <div className="hidden md:block w-32 h-px bg-outline-variant/50" />
        </div>

        <Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group block bg-white rounded-xl overflow-hidden cloud-shadow hover:-translate-y-1 transition-transform"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-primary mb-2">
                    {s.title}
                  </h3>
                  <p className="text-on-surface-variant text-sm mb-4">{s.long}</p>
                  <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase font-semibold text-primary">
                    Learn more
                    <span className="w-8 h-px bg-primary transition-all group-hover:w-12" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-1 group relative overflow-hidden cloud-shadow rounded-xl h-[360px]">
            <img
              src={safariImg}
              alt="Signature safaris"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              width={1920}
              height={1080}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-transparent p-10 flex flex-col justify-center">
              <h3 className="font-display text-[28px] font-semibold text-white mb-3">
                Signature Safaris
              </h3>
              <p className="text-white/80 max-w-xs mb-6">
                Curated wildlife expeditions across Africa's most exclusive
                conservancies.
              </p>
              <Link
                to="/safaris"
                className="w-fit px-7 py-3 bg-white text-primary text-[12px] tracking-[0.1em] uppercase font-semibold hover:bg-primary-fixed transition-colors"
              >
                View Itineraries
              </Link>
            </div>
          </div>
          <div className="md:col-span-1 bg-primary text-white rounded-xl p-10 flex flex-col justify-center">
            <h3 className="font-display text-[28px] font-semibold mb-3">
              Build your own itinerary.
            </h3>
            <p className="text-primary-fixed-dim mb-6 max-w-md">
              Use our planner to assemble destinations and services, then download
              a Qafri-branded PDF summary in seconds.
            </p>
            <Link
              to="/itinerary"
              className="w-fit px-7 py-3 bg-white text-primary text-[12px] tracking-[0.1em] uppercase font-semibold hover:bg-primary-fixed transition-colors"
            >
              Open Trip Planner
            </Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative bg-surface-container-low py-32 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-full route-line -translate-y-1/2 opacity-40" />
        <div className="relative z-10 container-max">
          <div className="text-center mb-20">
            <h2 className="font-display text-[32px] md:text-[44px] font-semibold text-primary mb-4 italic">
              The Architecture of Your Journey
            </h2>
            <p className="text-on-surface-variant max-w-lg mx-auto">
              Our 5-step strategic framework ensures every detail of your travel
              is engineered for perfection.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 relative">
            {[
              ["01", "Consultation", "Defining your objectives, constraints, and stylistic preferences."],
              ["02", "Strategy", "Architecting a preliminary itinerary based on global logistics data."],
              ["03", "Refinement", "Polishing every touchpoint to align with our premium standards."],
              ["04", "Execution", "Securing all bookings and finalising logistical documentation."],
              ["05", "Support", "Ongoing concierge assistance throughout your transit."],
            ].map(([n, t, b], i) => (
              <div key={n} className="flex flex-col items-center text-center">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 relative z-20 shadow-lg ${
                    i === 2
                      ? "bg-primary text-white scale-110"
                      : "glass-panel border border-primary/30 text-primary"
                  }`}
                >
                  <span className="font-display text-2xl font-semibold">{n}</span>
                </div>
                <h3 className="font-display text-lg font-semibold text-primary mb-2">
                  {t}
                </h3>
                <p className="text-sm text-on-surface-variant px-4">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 container-max">
        <div className="bg-primary-container rounded-xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-display text-[32px] md:text-[56px] leading-[1.1] font-bold text-white mb-8">
              Ready to define your next destination?
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="px-10 py-4 bg-white text-primary text-[12px] tracking-[0.1em] uppercase font-semibold hover:bg-primary-fixed transition-all"
              >
                Request a Quote
              </Link>
              <Link
                to="/contact"
                className="px-10 py-4 border border-white/40 text-white text-[12px] tracking-[0.1em] uppercase font-semibold hover:bg-white/10 transition-all"
              >
                Corporate Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
