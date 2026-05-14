import { createFileRoute } from "@tanstack/react-router";
import { useId, useState, cloneElement, isValidElement, type ReactElement } from "react";
import heroImg from "@/assets/hero-savannah.jpg";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Request a Travel Plan — Qafri Tours" },
      {
        name: "description",
        content:
          "Submit your bespoke travel inquiry. Our experts curate itineraries with corporate precision and editorial care.",
      },
    ],
    links: [{ rel: "canonical", href: "https://happy-hues-hand.lovable.app/contact" }],
  }),
});

function ContactPage() {
  const [serviceType, setServiceType] = useState("Safari");

  return (
    <>
      {/* Hero strip */}
      <header className="container-max pt-12 mb-12">
        <div className="relative h-[320px] rounded-xl overflow-hidden cloud-shadow bg-primary-container">
          <img
            src={heroImg}
            alt="Safari plains at sunrise"
            className="absolute inset-0 w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/85 to-transparent z-10" />
          <div className="relative z-20 flex flex-col justify-center h-full px-8 md:px-12 max-w-2xl">
            <span className="text-[12px] tracking-[0.2em] uppercase font-semibold text-primary-fixed-dim mb-3">
              Begin the Conversation
            </span>
            <h1 className="font-display text-[36px] md:text-[52px] leading-[1.1] font-bold text-white">
              Plan Your Next
              <br />
              Masterpiece Journey
            </h1>
            <p className="mt-4 text-white/90 max-w-md">
              Tailored experiences for the discerning traveler. From corporate
              retreats to serene safaris in the Mara.
            </p>
          </div>
        </div>
      </header>

      <div className="container-max grid grid-cols-1 lg:grid-cols-12 gap-6 pb-16">
        {/* Form */}
        <section className="lg:col-span-8 bg-white rounded-xl p-8 md:p-10 cloud-shadow border border-outline-variant/30">
          <div className="mb-8">
            <h2 className="font-display text-[28px] md:text-[32px] font-semibold text-primary mb-2">
              Request a Travel Plan
            </h2>
            <p className="text-on-surface-variant">
              Complete the form below and our experts will curate a bespoke
              itinerary for you.
            </p>
          </div>
          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks — we'll be in touch shortly.");
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Full Name">
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="form-input"
                />
              </Field>
              <Field label="Email Address">
                <input
                  required
                  type="email"
                  placeholder="john@corporate.com"
                  className="form-input"
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Field label="Destination">
                <select className="form-input">
                  <option>Masai Mara, Kenya</option>
                  <option>Zanzibar, Tanzania</option>
                  <option>Victoria Falls, Zimbabwe</option>
                  <option>Nairobi City Tour</option>
                  <option>Other / Multi-stop</option>
                </select>
              </Field>
              <Field label="Travel Date">
                <input type="date" className="form-input" />
              </Field>
              <Field label="Passengers">
                <input type="number" min={1} placeholder="1" className="form-input" />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field label="Service Type">
                <div className="flex flex-wrap gap-2">
                  {["Safari", "Business", "Leisure", "Luxury"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setServiceType(s)}
                      className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all border ${
                        serviceType === s
                          ? "bg-primary/10 border-primary text-primary"
                          : "bg-surface border-outline-variant text-on-surface-variant hover:border-primary"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Budget Range (USD)">
                <select className="form-input">
                  <option>$1,000 – $3,000</option>
                  <option>$3,000 – $7,000</option>
                  <option>$7,000 – $15,000</option>
                  <option>$15,000+</option>
                </select>
              </Field>
            </div>

            <Field label="Special Requests & Preferences">
              <textarea
                rows={4}
                placeholder="Dietary requirements, preferred airlines, specific landmarks…"
                className="form-input"
              />
            </Field>

            <button
              type="submit"
              className="w-full bg-primary text-on-primary py-4 rounded-lg font-display text-lg font-semibold shadow-md hover:opacity-95 transition-all active:scale-[0.99]"
            >
              Submit Plan Request
            </button>
          </form>
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-xl p-8 cloud-shadow border border-outline-variant/30">
            <h3 className="font-display text-2xl font-semibold text-primary mb-6">
              Connect With Us
            </h3>
            <ul className="space-y-6">
              {[
                ["Phone", "+254 712 909 770 / +254 100 521 498"],
                ["Email", "info@qafritoursandtravels.africa"],
                ["Website", "www.qafritoursandtravels.africa"],
                ["Headquarters", "Nairobi, Kenya"],
                ["Instagram", "@qafri.tours"],
                ["X / Twitter", "@QafriTours"],
                ["Accreditation", "IATA Accredited Agency"],
              ].map(([t, v]) => (
                <li key={t} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center text-primary text-sm shrink-0">
                    ●
                  </div>
                  <div>
                    <p className="text-[12px] tracking-[0.1em] uppercase font-semibold text-on-surface">
                      {t}
                    </p>
                    <p className="text-on-surface-variant">{v}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-primary text-on-primary rounded-xl p-8 shadow-lg">
            <h3 className="font-display text-2xl font-semibold mb-6">
              Why Qafri Tours?
            </h3>
            <div className="space-y-6">
              {[
                ["Unrivaled Expertise", "Local guides with decades of terrain knowledge."],
                ["Transparent Pricing", "No hidden fees. Premium value for every budget."],
                ["24/7 Global Support", "We are always a call away, wherever you are."],
              ].map(([t, b]) => (
                <div key={t} className="flex gap-4">
                  <div className="bg-white/10 w-9 h-9 rounded-lg shrink-0 flex items-center justify-center text-primary-fixed-dim">
                    ◆
                  </div>
                  <div>
                    <h4 className="text-[13px] font-semibold tracking-[0.05em] uppercase">
                      {t}
                    </h4>
                    <p className="text-sm text-white/80 mt-1">{b}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <style>{`
        .form-input {
          width: 100%;
          background: var(--surface);
          border: 1px solid var(--outline-variant);
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          color: var(--on-surface);
          outline: none;
          transition: all 0.2s;
        }
        .form-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(0,52,109,0.12);
        }
      `}</style>
    </>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const id = useId();
  const child = isValidElement(children)
    ? cloneElement(children as ReactElement<{ id?: string }>, { id })
    : children;
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[12px] tracking-[0.1em] uppercase font-semibold text-on-surface mb-2"
      >
        {label}
      </label>
      {child}
    </div>
  );
}
