import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-savannah.jpg";
import elephantArt from "@/assets/elephant-art.jpg";
import campNight from "@/assets/camp-night.jpg";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Qafri Tours & Travels — Bespoke African Journeys" },
      {
        name: "description",
        content:
          "Corporate-editorial luxury travel agency. Bespoke safaris, air ticketing, visas, and concierge logistics across Africa.",
      },
    ],
  }),
});

function HomePage() {
  return (
    <>
      {/* Hero */}
      <header className="relative w-full h-[640px] md:h-[760px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Luxury safari vehicle on the Serengeti at sunrise"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/85 via-surface/30 to-transparent" />
        </div>
        <div className="relative z-10 container-max w-full">
          <div className="max-w-3xl">
            <span className="inline-block text-[12px] tracking-[0.3em] uppercase text-primary font-semibold mb-6">
              Established Luxury Travel
            </span>
            <h1 className="font-display text-[40px] md:text-[64px] leading-[1.05] tracking-[-0.02em] font-bold text-primary mb-8">
              Discover the World
              <br />
              With Unrivaled
              <br />
              Precision.
            </h1>
            <p className="text-lg text-on-surface-variant mb-10 max-w-lg">
              Bespoke itineraries crafted for the global explorer. From
              high-altitude logistics to serene safari escapes, we handle the
              complexity so you can embrace the journey.
            </p>
            <div className="flex flex-wrap gap-6 items-center">
              <Link to="/safaris" className="btn-primary inline-block">
                Explore Journeys
              </Link>
              <Link
                to="/services"
                className="flex items-center gap-3 group cursor-pointer"
              >
                <span className="w-12 h-px bg-primary/40 group-hover:w-16 transition-all" />
                <span className="text-[12px] tracking-[0.1em] uppercase font-semibold text-primary">
                  Our Philosophy
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Inquiry Bar */}
      <section className="relative z-20 -mt-16 container-max">
        <div className="bg-secondary-container rounded-lg p-6 md:p-8 cloud-shadow ring-1 ring-black/5 overflow-hidden relative">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end relative z-10">
            <Field label="Destination">
              <input
                type="text"
                placeholder="Where to?"
                className="w-full bg-white/60 border-b border-outline-variant focus:border-primary px-3 py-3 italic text-on-surface-variant outline-none"
              />
            </Field>
            <Field label="Travel Dates">
              <input
                type="date"
                className="w-full bg-white/60 border-b border-outline-variant focus:border-primary px-3 py-3 text-on-surface-variant outline-none"
              />
            </Field>
            <Field label="Service Type">
              <select className="w-full bg-white/60 border-b border-outline-variant focus:border-primary px-3 py-3 text-on-surface-variant outline-none">
                <option>Air Ticketing</option>
                <option>Visa Services</option>
                <option>Safari Planning</option>
              </select>
            </Field>
            <button
              type="button"
              className="bg-primary-container text-on-primary h-[52px] text-[12px] tracking-[0.1em] uppercase font-semibold hover:bg-primary transition-colors"
            >
              Search Availability
            </button>
          </form>
        </div>
      </section>

      {/* Strategic Logistics */}
      <section className="py-24 container-max">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-[32px] leading-tight font-semibold text-primary mb-6">
              Strategic Travel Logistics
            </h2>
            <p className="text-lg text-on-surface-variant">
              We provide the structural backbone for global mobility, ensuring
              that complex itineraries and logistical requirements are executed
              with corporate precision and artistic care.
            </p>
          </div>
          <Link
            to="/services"
            className="flex items-center gap-3 text-primary text-[12px] tracking-[0.1em] uppercase font-semibold border-b border-primary/20 pb-2"
          >
            View All Services <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-white p-12 cloud-shadow flex flex-col justify-between min-h-[400px] relative group overflow-hidden rounded-lg">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10">
              <div className="text-primary text-4xl mb-8">✈</div>
              <h3 className="font-display text-2xl font-semibold text-primary mb-4">
                Elite Air Ticketing
              </h3>
              <p className="text-on-surface-variant max-w-md">
                Seamless booking through global carrier networks with priority
                routing and corporate rate optimization.
              </p>
            </div>
            <div className="relative z-10 flex gap-3 mt-8 flex-wrap">
              <Tag>Global Network</Tag>
              <Tag>Priority Support</Tag>
            </div>
          </div>

          <div className="md:col-span-4 bg-primary text-on-primary p-12 flex flex-col justify-center items-center text-center cloud-shadow rounded-lg">
            <div className="text-5xl mb-6">🛡</div>
            <h3 className="font-display text-2xl font-semibold mb-4">
              Visa & Documentation
            </h3>
            <p className="opacity-80 mb-8">
              Navigating international borders with expert compliance and
              expedited processing.
            </p>
            <Link
              to="/contact"
              className="border border-white/30 px-6 py-2 text-[12px] tracking-[0.1em] uppercase font-semibold hover:bg-white hover:text-primary transition-all"
            >
              Inquire Now
            </Link>
          </div>

          <SmallService title="Chauffeur & Transfers" body="Ground transportation solutions that bridge the gap between arrival and destination." accent />
          <SmallService title="Hotel Reservations" body="Curated lodging from corporate skyscrapers to secluded boutique villas." muted />
          <SmallService title="Events & MICE" body="Strategic planning for meetings, incentives, conferences, and exhibitions." />
        </div>
      </section>

      {/* Safari Art Section */}
      <section className="py-32 relative bg-surface-container-lowest overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-primary/10" />
        <div className="container-max grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative order-2 md:order-1">
            <div className="relative z-10 w-4/5 cloud-shadow">
              <img
                src={elephantArt}
                alt="Elephant in editorial blue tone"
                className="aspect-[3/4] object-cover rounded-lg w-full"
                width={900}
                height={1200}
                loading="lazy"
              />
            </div>
            <div className="absolute -right-4 md:-right-8 -bottom-12 z-20 w-3/5 glass-panel p-2 shadow-2xl rounded-lg">
              <img
                src={campNight}
                alt="Luxury safari camp at night"
                className="aspect-square object-cover w-full rounded"
                width={600}
                height={600}
                loading="lazy"
              />
            </div>
          </div>
          <div className="order-1 md:order-2">
            <span className="text-[12px] tracking-[0.2em] uppercase font-semibold text-primary mb-4 inline-block">
              The Art of Discovery
            </span>
            <h2 className="font-display text-[32px] md:text-[44px] leading-tight font-semibold text-primary mb-8">
              Curated Safari
              <br />& Holiday Experiences
            </h2>
            <div className="space-y-6">
              {[
                ["Tailored Safaris", "Expert-led journeys into the heart of the wild, designed with both adventure and comfort in mind."],
                ["Holiday Packages", "Hand-picked destinations for restorative escapes, from tropical coastlines to alpine retreats."],
                ["Travel Insurance", "Comprehensive protection for peace of mind across every border you cross."],
              ].map(([title, body]) => (
                <div key={title} className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center shrink-0">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <div>
                    <h5 className="font-display text-xl font-semibold text-on-surface mb-1">
                      {title}
                    </h5>
                    <p className="text-on-surface-variant">{body}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/safaris"
              className="mt-12 group inline-flex items-center gap-4 text-[12px] tracking-[0.1em] uppercase font-semibold text-primary"
            >
              View Safari Packages
              <span className="w-12 h-px bg-primary transition-all group-hover:w-20" />
            </Link>
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="py-24 container-max">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {[
            ["Travel Consultancy", "Expert advice on itinerary optimization, cost management, and travel policy alignment for corporate clients."],
            ["Tour Guiding", "Professional, multilingual guides who provide deep cultural insights and logistical expertise on the ground."],
            ["Uncharted Expeditions", "Specialized planning for remote destinations requiring complex logistical support and safety protocols."],
          ].map(([title, body]) => (
            <div key={title} className="p-8 hover:bg-surface-container-low transition-colors rounded-lg">
              <div className="text-primary text-3xl mb-6">◆</div>
              <h4 className="font-display text-xl font-semibold text-primary mb-4">
                {title}
              </h4>
              <p className="text-on-surface-variant">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-on-secondary-container">
        {label}
      </label>
      {children}
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] tracking-[0.1em] uppercase font-semibold px-3 py-1 bg-surface-container rounded-full text-outline">
      {children}
    </span>
  );
}

function SmallService({
  title,
  body,
  accent,
  muted,
}: {
  title: string;
  body: string;
  accent?: boolean;
  muted?: boolean;
}) {
  const bg = muted
    ? "bg-surface-container-low"
    : "bg-white";
  return (
    <div
      className={`md:col-span-4 ${bg} p-10 cloud-shadow rounded-lg ${
        accent ? "border-t-4 border-primary" : ""
      } relative overflow-hidden`}
    >
      <div className="text-primary mb-4 text-2xl">●</div>
      <h4 className="font-display text-xl font-semibold text-primary mb-2">
        {title}
      </h4>
      <p className="text-on-surface-variant">{body}</p>
    </div>
  );
}
