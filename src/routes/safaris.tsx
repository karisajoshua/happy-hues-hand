import { createFileRoute, Link } from "@tanstack/react-router";
import safariHero from "@/assets/safari-hero.jpg";
import lodge from "@/assets/lodge-dusk.jpg";
import lion from "@/assets/lion.jpg";
import delta from "@/assets/delta.jpg";
import migration from "@/assets/migration.jpg";
import gorilla from "@/assets/gorilla.jpg";
import etosha from "@/assets/etosha.jpg";

export const Route = createFileRoute("/safaris")({
  component: SafarisPage,
  head: () => ({
    meta: [
      { title: "Safari Packages — Qafri Tours & Travels" },
      {
        name: "description",
        content:
          "Curated luxury safari expeditions across Africa: Maasai Mara migration, Rwanda gorilla trekking, Namib desert and Okavango Delta journeys.",
      },
      { property: "og:title", content: "Safari Packages — Qafri Tours & Travels" },
      {
        property: "og:description",
        content:
          "Maasai Mara migration, Rwanda gorilla trekking, Namib desert and Okavango Delta — curated luxury safari expeditions.",
      },
      { property: "og:image", content: safariHero },
      { property: "og:url", content: "https://qafritoursandtravels.africa/safaris" },
    ],
    links: [{ rel: "canonical", href: "https://qafritoursandtravels.africa/safaris" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Safari tours and packages",
          provider: {
            "@type": "Organization",
            name: "Qafri Tours & Travels",
            url: "https://qafritoursandtravels.africa",
          },
          areaServed: ["Kenya", "Rwanda", "Namibia", "Botswana", "Tanzania"],
        }),
      },
    ],
  }),
});

const packages = [
  {
    img: migration,
    days: "8 Days",
    title: "Maasai Mara Great Migration",
    body: "Experience nature's greatest spectacle with private ranger guides and boutique luxury camping.",
    price: "$4,250",
  },
  {
    img: gorilla,
    days: "5 Days",
    title: "Rwanda Gorilla Trekking",
    body: "A profound encounter in the Virunga Mountains, focused on conservation and luxury retreat.",
    price: "$6,800",
  },
  {
    img: etosha,
    days: "12 Days",
    title: "Etosha & Namib Desert",
    body: "A photographic odyssey through Namibia's dramatic landscapes and desert-adapted wildlife.",
    price: "$5,100",
  },
];

function SafarisPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[560px] md:h-[700px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={safariHero}
            alt="Elephant family at sunrise"
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-transparent" />
        </div>
        <div className="relative z-10 container-max text-white">
          <div className="max-w-2xl">
            <span className="text-[12px] tracking-[0.3em] uppercase font-semibold text-primary-fixed-dim block mb-4">
              Curated Expeditions
            </span>
            <h1 className="font-display text-[40px] md:text-[64px] leading-[1.05] font-bold mb-6">
              The Art of the African Safari
            </h1>
            <p className="text-lg text-white/90 mb-8 max-w-lg">
              Discover the rhythm of the wild through a lens of sophistication
              and deep local insight. Our safaris are storied journeys into the
              heart of the continent.
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-primary px-8 py-4 rounded-sm text-[12px] font-semibold tracking-[0.1em] uppercase hover:bg-surface-container transition-all"
            >
              Explore Packages →
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Featured Categories */}
      <section className="py-24 container-max">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="md:w-1/2">
            <h2 className="font-display text-[32px] font-semibold text-primary mb-4">
              Featured Travel Categories
            </h2>
            <p className="text-on-surface-variant max-w-md">
              Tailored experiences categorized by the soul of the journey —
              whether seeking high-octane adventure or tranquil seclusion.
            </p>
          </div>
          <div className="h-px flex-grow bg-outline-variant/30 hidden md:block mb-4 mx-8" />
          <span className="text-primary text-[12px] tracking-[0.1em] uppercase font-semibold border-b border-primary pb-1">
            View All Categories
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 group relative overflow-hidden rounded-xl h-[500px] cloud-shadow">
            <img
              src={lodge}
              alt="Luxury savannah lodge at dusk"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              width={1280}
              height={900}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 p-8 w-full glass-panel border-t border-white/20">
              <span className="text-[12px] tracking-[0.15em] uppercase font-semibold text-primary-container mb-2 block">
                Top Destination
              </span>
              <h3 className="font-display text-[32px] font-semibold text-primary">
                Luxury Savannah Lodges
              </h3>
              <p className="text-on-surface-variant mt-2">
                Pristine comfort in the wild's heart.
              </p>
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col gap-8">
            {[
              { img: lion, title: "Apex Predator Photography", sub: "Guided Workshops" },
              { img: delta, title: "Waterway Expeditions", sub: "Mekoro Traditions" },
            ].map((c) => (
              <div
                key={c.title}
                className="group relative overflow-hidden rounded-xl h-[234px] cloud-shadow"
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={800}
                  height={600}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-all" />
                <div className="absolute top-6 left-6 text-white">
                  <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                  <span className="text-[12px] tracking-[0.1em] uppercase font-semibold opacity-80">
                    {c.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-surface-container-low py-24">
        <div className="container-max">
          <div className="text-center mb-16">
            <span className="text-[12px] tracking-[0.2em] uppercase font-semibold text-primary">
              Our Curated Selection
            </span>
            <h2 className="font-display text-[32px] md:text-[44px] font-semibold mt-4 text-primary">
              Safari Packages
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((p) => (
              <article
                key={p.title}
                className="bg-white rounded-xl overflow-hidden cloud-shadow border border-outline-variant/10 hover:-translate-y-2 transition-all duration-300"
              >
                <div className="h-64 relative">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-full h-full object-cover"
                    width={800}
                    height={600}
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-white text-[12px] font-semibold tracking-[0.1em] uppercase px-4 py-2 rounded-full">
                    {p.days}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-display text-2xl font-semibold text-primary mb-2">
                    {p.title}
                  </h3>
                  <p className="text-on-surface-variant mb-6 line-clamp-2">
                    {p.body}
                  </p>
                  <div className="flex justify-between items-center pt-6 border-t border-outline-variant/30">
                    <div>
                      <span className="text-[12px] tracking-[0.1em] uppercase font-semibold text-on-surface-variant block">
                        Starting From
                      </span>
                      <span className="font-display text-2xl font-semibold text-primary">
                        {p.price}
                      </span>
                    </div>
                    <Link
                      to="/contact"
                      className="p-3 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition-all"
                      aria-label={`Inquire about ${p.title}`}
                    >
                      ›
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Route Path Section */}
      <section className="relative py-32 overflow-hidden bg-background">
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 1200 400"
        >
          <path
            d="M-50 200C200 100 400 300 600 200C800 100 1000 300 1250 200"
            stroke="#00346d"
            strokeWidth="1"
          />
        </svg>
        <div className="container-max relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img
              src={lodge}
              alt="Curated travel detail"
              className="rounded-xl cloud-shadow w-full h-96 object-cover"
              width={1280}
              height={900}
              loading="lazy"
            />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-container rounded-full flex items-center justify-center text-white text-center p-4 shadow-xl">
              <span className="text-[10px] tracking-[0.15em] uppercase font-semibold">
                Local Expertise
              </span>
            </div>
          </div>
          <div>
            <h2 className="font-display text-[32px] md:text-[44px] font-semibold text-primary mb-6">
              Designed for the Global Citizen
            </h2>
            <p className="text-on-surface-variant text-lg mb-8">
              We bridge the gap between rugged exploration and refined luxury.
              Our bespoke itineraries are crafted by individuals who live and
              breathe the African terrain.
            </p>
            <ul className="space-y-4">
              {[
                "Carbon-Neutral Expeditions",
                "Private Aviation Access",
                "24/7 Concierge Support",
              ].map((i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-primary font-semibold"
                >
                  <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                    ✓
                  </span>{" "}
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
