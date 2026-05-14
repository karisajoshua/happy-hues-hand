import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import elephantArt from "@/assets/elephant-art.jpg";
import campNight from "@/assets/camp-night.jpg";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/services";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Qafri Tours & Travels — Bespoke African Journeys" },
      {
        name: "description",
        content:
          "IATA-accredited travel agency in Nairobi. Passport, visa, insurance, air ticketing, hotel booking, safaris and bespoke logistics across Africa.",
      },
    ],
    links: [{ rel: "canonical", href: "https://happy-hues-hand.lovable.app/" }],
  }),
});

function HomePage() {
  return (
    <>
      {/* Hero — no filter */}
      <header className="relative w-full h-[640px] md:h-[760px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImg}
            alt="Luxury safari vehicle on the Serengeti at sunrise"
            className="w-full h-full object-cover animate-fade-in-soft"
            width={1920}
            height={1080}
            fetchPriority="high"
          />
        </div>
        <div className="relative z-10 container-max w-full">
          <div className="max-w-3xl glass-panel rounded-xl p-8 md:p-10 cloud-shadow animate-fade-up">
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
      <Reveal>
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
      </Reveal>

      {/* Services Carousel */}
      <section className="py-24 container-max">
        <Reveal>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="max-w-2xl">
              <span className="text-[12px] tracking-[0.2em] uppercase font-semibold text-primary mb-4 inline-block">
                What We Offer
              </span>
              <h2 className="font-display text-[32px] md:text-[44px] leading-tight font-semibold text-primary mb-6">
                Strategic Travel Logistics
              </h2>
              <p className="text-lg text-on-surface-variant">
                A full-spectrum agency: passports, visas, insurance, ticketing,
                accommodation, safaris and ground logistics — executed with
                IATA-accredited precision.
              </p>
            </div>
            <Link
              to="/services"
              className="flex items-center gap-3 text-primary text-[12px] tracking-[0.1em] uppercase font-semibold border-b border-primary/20 pb-2 shrink-0"
            >
              View All Services <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        <Reveal>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full px-12"
          >
            <CarouselContent className="-ml-6">
              {SERVICES.map((s) => (
                <CarouselItem
                  key={s.slug}
                  className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="group relative bg-white rounded-xl overflow-hidden cloud-shadow h-full flex flex-col"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        width={800}
                        height={600}
                        draggable={false}
                      />
                    </div>
                    <div className="p-6 flex flex-col grow">
                      <h3 className="font-display text-xl font-semibold text-primary mb-2">
                        {s.title}
                      </h3>
                      <p className="text-on-surface-variant text-sm grow">
                        {s.long}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[12px] tracking-[0.1em] uppercase font-semibold text-primary">
                        Learn More
                        <span className="w-8 h-px bg-primary transition-all group-hover:w-12" />
                      </span>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </Reveal>
      </section>

      {/* Safari Art Section */}
      <Reveal>
        <section className="py-32 relative bg-surface-container-lowest overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-primary/10" />
          <div className="container-max grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
            <div className="relative order-2 md:order-1">
              <div className="relative z-10 w-4/5 cloud-shadow">
                <img
                  src={elephantArt}
                  alt="African elephant in golden morning light"
                  className="aspect-[3/4] object-cover rounded-lg w-full"
                  width={900}
                  height={1200}
                  loading="lazy"
                />
              </div>
              <div className="absolute -right-4 md:-right-8 -bottom-12 z-20 w-3/5 glass-panel p-2 shadow-2xl rounded-lg">
                <img
                  src={campNight}
                  alt="Luxury safari camp at twilight"
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
                      <h3 className="font-display text-xl font-semibold text-on-surface mb-1">
                        {title}
                      </h3>
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
      </Reveal>

      {/* Support Services */}
      <Reveal>
        <section className="py-24 container-max">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            {[
              ["Travel Consultancy", "Expert advice on itinerary optimization, cost management, and travel policy alignment for corporate clients."],
              ["Tour Guiding", "Professional, multilingual guides who provide deep cultural insights and logistical expertise on the ground."],
              ["Uncharted Expeditions", "Specialized planning for remote destinations requiring complex logistical support and safety protocols."],
            ].map(([title, body]) => (
              <div key={title} className="p-8 hover:bg-surface-container-low transition-colors rounded-lg">
                <div className="text-primary text-3xl mb-6">◆</div>
                <h3 className="font-display text-xl font-semibold text-primary mb-4">
                  {title}
                </h3>
                <p className="text-on-surface-variant">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  const id = useId();
  const child = isValidElement(children)
    ? cloneElement(children as ReactElement<{ id?: string }>, { id })
    : children;
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-[10px] uppercase tracking-[0.15em] font-semibold text-on-secondary-container"
      >
        {label}
      </label>
      {child}
    </div>
  );
}
