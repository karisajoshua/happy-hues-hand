import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getService, SERVICES } from "@/lib/services";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetailPage,
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.service;
    if (!s) return { meta: [{ title: "Service — Qafri Tours" }] };
    const url = `https://qafritoursandtravels.africa/services/${s.slug}`;
    return {
      meta: [
        { title: `${s.title} — Qafri Tours & Travels` },
        { name: "description", content: s.long },
        { property: "og:title", content: `${s.title} — Qafri Tours & Travels` },
        { property: "og:description", content: s.long },
        { property: "og:image", content: s.image },
        { property: "og:url", content: url },
        { name: "twitter:image", content: s.image },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <div className="container-max py-32 text-center">
      <h1 className="font-display text-4xl text-primary mb-4">Service not found</h1>
      <Link to="/services" className="btn-primary inline-block mt-6">
        Back to Services
      </Link>
    </div>
  ),
});

function ServiceDetailPage() {
  const { service } = Route.useLoaderData() as { service: import("@/lib/services").Service };
  const others = SERVICES.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <header className="relative w-full h-[420px] md:h-[520px] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>
        <div className="relative z-10 container-max pb-12 md:pb-16">
          <nav className="text-[11px] tracking-[0.15em] uppercase text-white/80 mb-4">
            <Link to="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/services" className="hover:text-white">Services</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{service.title}</span>
          </nav>
          <h1 className="font-display text-[36px] md:text-[56px] leading-[1.05] font-bold text-white max-w-3xl">
            {service.title}
          </h1>
          <p className="text-white/85 max-w-xl mt-4 text-lg">{service.short}</p>
        </div>
      </header>

      {/* Overview + Included */}
      <section className="py-20 container-max">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Reveal className="md:col-span-2">
            <span className="text-[12px] tracking-[0.2em] uppercase font-semibold text-primary">
              Overview
            </span>
            <h2 className="font-display text-[28px] md:text-[36px] font-semibold text-primary mt-3 mb-6">
              Engineered for the way you travel.
            </h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-6">
              {service.long}
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mt-8">
              {service.included.map((item) => (
                <div key={item} className="flex gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  <span className="text-on-surface">{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <div className="glass-panel rounded-xl p-8 cloud-shadow">
              <h3 className="text-[12px] tracking-[0.2em] uppercase font-semibold text-primary mb-6">
                Why Qafri
              </h3>
              <ul className="space-y-5">
                {service.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-on-surface">
                    <span className="text-primary">◆</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-6 border-t border-outline-variant/40 space-y-3">
                <Link to="/contact" className="btn-primary w-full text-center block">
                  Request This Service
                </Link>
                <Link
                  to="/itinerary"
                  className="block w-full text-center px-6 py-3 border border-primary/40 text-primary text-[12px] tracking-[0.1em] uppercase font-semibold hover:bg-primary/5 transition-colors"
                >
                  Build an Itinerary
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <Reveal>
        <section className="bg-surface-container-low py-20">
          <div className="container-max">
            <h2 className="font-display text-[28px] md:text-[36px] font-semibold text-primary text-center mb-12">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {service.process.map((p, i) => (
                <div key={p.step} className="relative">
                  <div className="font-display text-5xl text-primary/20 mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-primary mb-2">
                    {p.step}
                  </h3>
                  <p className="text-on-surface-variant text-sm">{p.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* Other services */}
      <Reveal>
        <section className="py-20 container-max">
          <div className="flex justify-between items-end mb-10">
            <h2 className="font-display text-[24px] md:text-[32px] font-semibold text-primary">
              Other services
            </h2>
            <Link
              to="/services"
              className="text-[12px] tracking-[0.1em] uppercase font-semibold text-primary"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/services/$slug"
                params={{ slug: o.slug }}
                className="group block bg-white rounded-xl overflow-hidden cloud-shadow"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={o.image}
                    alt={o.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold text-primary">
                    {o.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant mt-1">{o.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Reveal>
    </>
  );
}
