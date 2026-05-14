import { createFileRoute, Link } from "@tanstack/react-router";
import servicesHero from "@/assets/services-hero.jpg";
import airwing from "@/assets/airwing.jpg";
import hotel from "@/assets/hotel.jpg";
import safariImg from "@/assets/safari-hero.jpg";

export const Route = createFileRoute("/services")({
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

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Featured: Air Ticketing */}
          <div className="md:col-span-8 group relative overflow-hidden cloud-shadow rounded-xl">
            <img
              src={airwing}
              alt="Premium airplane wing in the clouds"
              className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-105"
              width={1280}
              height={720}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent p-8 flex flex-col justify-end">
              <span className="text-[12px] tracking-[0.15em] uppercase font-semibold text-primary-fixed mb-2">
                Global Mobility
              </span>
              <h3 className="font-display text-[32px] font-semibold text-white">
                Air Ticketing
              </h3>
              <p className="text-white/75 max-w-md mt-2">
                Strategic flight planning across all major global alliances with
                preferred corporate rates.
              </p>
            </div>
          </div>

          <div className="md:col-span-4 glass-panel border border-white/50 cloud-shadow rounded-xl p-8 flex flex-col">
            <div className="text-primary text-4xl mb-6">📘</div>
            <h3 className="font-display text-2xl font-semibold text-primary mb-4">
              Visa Assistance
            </h3>
            <p className="text-on-surface-variant mb-auto">
              Comprehensive documentation support for diplomatic, business, and
              tourist entry permits globally.
            </p>
            <div className="mt-8 h-px w-full bg-outline-variant/30" />
          </div>

          <div className="md:col-span-4 group relative overflow-hidden cloud-shadow rounded-xl h-80">
            <img
              src={hotel}
              alt="Luxury hotel lobby"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              width={800}
              height={800}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/20 hover:bg-transparent transition-colors duration-300" />
            <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel border border-white/20 rounded">
              <h3 className="text-[12px] tracking-[0.15em] uppercase font-semibold text-primary">
                Hotel Reservations
              </h3>
            </div>
          </div>

          <div className="md:col-span-4 bg-primary text-white rounded-xl p-8 flex flex-col justify-between">
            <div>
              <div className="text-primary-fixed text-4xl mb-6">🛡</div>
              <h3 className="font-display text-2xl font-semibold mb-4">
                Travel Insurance
              </h3>
              <p className="text-primary-fixed-dim">
                Mitigating risk with comprehensive global health and trip
                cancellation coverage.
              </p>
            </div>
            <Link
              to="/contact"
              className="text-[12px] tracking-[0.15em] uppercase font-semibold flex items-center gap-2 mt-8 hover:gap-4 transition-all"
            >
              Explore Coverage →
            </Link>
          </div>

          <div className="md:col-span-4 glass-panel border border-white/50 cloud-shadow rounded-xl p-8">
            <div className="text-primary text-4xl mb-6">🚘</div>
            <h3 className="font-display text-2xl font-semibold text-primary mb-4">
              Car Rentals
            </h3>
            <p className="text-on-surface-variant">
              Access to elite fleets and private chauffeur services in over 150
              countries.
            </p>
          </div>

          <div className="md:col-span-6 group relative overflow-hidden cloud-shadow rounded-xl h-[400px]">
            <img
              src={safariImg}
              alt="Signature safaris"
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              width={1920}
              height={1080}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-transparent p-12 flex flex-col justify-center">
              <h3 className="font-display text-[32px] font-semibold text-white mb-4">
                Signature Safaris
              </h3>
              <p className="text-white/80 max-w-xs mb-8">
                Curated wildlife expeditions across Africa's most exclusive
                conservancies.
              </p>
              <Link
                to="/safaris"
                className="w-fit px-8 py-3 bg-white text-primary text-[12px] tracking-[0.1em] uppercase font-semibold hover:bg-primary-fixed transition-colors"
              >
                View Itineraries
              </Link>
            </div>
          </div>

          <div className="md:col-span-6 glass-panel border border-outline-variant/20 cloud-shadow rounded-xl p-12 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-8">
              {[
                ["Corporate MICE", "Meetings, incentives, conferences and exhibitions managed with precision."],
                ["24/7 Concierge", "Dedicated travel desk support for executive travelers anytime."],
                ["Group Travel", "Logistical coordination for large delegations and tour groups."],
                ["Event Logistics", "Seamless ground transport and venue booking for international events."],
              ].map(([t, b]) => (
                <div key={t}>
                  <div className="text-primary mb-4 text-2xl">◆</div>
                  <h4 className="font-display text-xl font-semibold text-primary mb-2">
                    {t}
                  </h4>
                  <p className="text-sm text-on-surface-variant">{b}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {[
              ["Airport Transfers", "Punctual, private transfers from arrival gate to hotel doorstep."],
              ["Holiday Packages", "Thematic leisure escapes designed for restorative travel."],
              ["Honeymoon Planning", "Discreet and romantic itineraries for the journey of a lifetime."],
              ["Specialized Tours", "Cultural, culinary, and architectural pilgrimages for the curious."],
            ].map(([t, b]) => (
              <div
                key={t}
                className="p-6 border-l border-primary/20 hover:border-primary transition-colors"
              >
                <h4 className="text-[12px] tracking-[0.1em] uppercase font-semibold text-primary mb-2">
                  {t}
                </h4>
                <p className="text-sm text-on-surface-variant">{b}</p>
              </div>
            ))}
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
                <h4 className="font-display text-lg font-semibold text-primary mb-2">
                  {t}
                </h4>
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
