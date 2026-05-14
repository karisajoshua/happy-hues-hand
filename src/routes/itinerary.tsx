import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/services";
import {
  generateItineraryPdf,
  type ItineraryData,
  type ItineraryDestination,
} from "@/lib/itinerary-pdf";

export const Route = createFileRoute("/itinerary")({
  component: ItineraryBuilder,
  head: () => ({
    meta: [
      { title: "Plan Your Trip — Qafri Tours & Travels" },
      {
        name: "description",
        content:
          "Build a personalised travel itinerary and download a branded PDF summary or send it directly to our travel desk.",
      },
      { property: "og:title", content: "Plan Your Trip — Qafri Tours & Travels" },
      {
        property: "og:description",
        content: "Bespoke itinerary builder with branded PDF summary.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://qafritoursandtravels.africa/itinerary" },
    ],
  }),
});

function ItineraryBuilder() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [destinations, setDestinations] = useState<ItineraryDestination[]>([
    { city: "", country: "", nights: 3 },
  ]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [accommodation, setAccommodation] = useState("Mid-range");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  const updateDest = (idx: number, patch: Partial<ItineraryDestination>) => {
    setDestinations((prev) =>
      prev.map((d, i) => (i === idx ? { ...d, ...patch } : d)),
    );
  };
  const addDest = () =>
    setDestinations((prev) => [...prev, { city: "", country: "", nights: 2 }]);
  const removeDest = (idx: number) =>
    setDestinations((prev) => prev.filter((_, i) => i !== idx));

  const buildData = (): ItineraryData => ({
    fullName,
    email,
    phone,
    partySize,
    startDate,
    endDate,
    destinations: destinations.filter((d) => d.city || d.country),
    services: SERVICES.filter((s) => selected[s.slug]).map((s) => ({
      title: s.title,
      short: s.short,
    })),
    accommodation,
    notes,
  });

  const onDownload = async () => {
    setBusy(true);
    try {
      await generateItineraryPdf(buildData());
    } finally {
      setBusy(false);
    }
  };

  const onEmail = () => {
    const data = buildData();
    const lines = [
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Party size: ${data.partySize}`,
      `Travel dates: ${data.startDate} → ${data.endDate}`,
      "",
      "Destinations:",
      ...data.destinations.map(
        (d) => `  • ${d.city}, ${d.country} — ${d.nights} night(s)`,
      ),
      "",
      "Services:",
      ...data.services.map((s) => `  • ${s.title}`),
      "",
      `Accommodation: ${data.accommodation}`,
      "",
      "Notes:",
      data.notes || "(none)",
    ].join("\n");
    const subject = encodeURIComponent(
      `Itinerary request — ${data.fullName || "Guest"}`,
    );
    const body = encodeURIComponent(lines);
    window.location.href = `mailto:info@qafritoursandtravels.africa?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <header className="relative bg-primary text-white py-20">
        <div className="container-max">
          <span className="text-[12px] tracking-[0.2em] uppercase font-semibold text-primary-fixed-dim">
            Trip Planner
          </span>
          <h1 className="font-display text-[36px] md:text-[52px] leading-tight font-bold mt-3 max-w-2xl">
            Build your itinerary.
            <br />
            We'll handle the rest.
          </h1>
          <p className="text-white/80 max-w-xl mt-4">
            Tell us where you're going and what you need. Download a branded PDF
            summary or send it straight to our travel desk.
          </p>
        </div>
      </header>

      <section className="py-16 container-max">
        <Reveal>
          <form
            className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="lg:col-span-2 space-y-12">
              {/* Traveler */}
              <Section title="Traveler details">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Full name" value={fullName} onChange={setFullName} />
                  <Input label="Email" type="email" value={email} onChange={setEmail} />
                  <Input label="Phone" value={phone} onChange={setPhone} />
                  <Input
                    label="Party size"
                    type="number"
                    value={String(partySize)}
                    onChange={(v) => setPartySize(Math.max(1, Number(v) || 1))}
                  />
                  <Input
                    label="Start date"
                    type="date"
                    value={startDate}
                    onChange={setStartDate}
                  />
                  <Input
                    label="End date"
                    type="date"
                    value={endDate}
                    onChange={setEndDate}
                  />
                </div>
              </Section>

              {/* Destinations */}
              <Section title="Destinations">
                <div className="space-y-4">
                  {destinations.map((d, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-12 gap-3 items-end p-4 border border-outline-variant/40 rounded-lg"
                    >
                      <div className="col-span-12 md:col-span-5">
                        <Input
                          label="City"
                          value={d.city}
                          onChange={(v) => updateDest(i, { city: v })}
                        />
                      </div>
                      <div className="col-span-12 md:col-span-4">
                        <Input
                          label="Country"
                          value={d.country}
                          onChange={(v) => updateDest(i, { country: v })}
                        />
                      </div>
                      <div className="col-span-8 md:col-span-2">
                        <Input
                          label="Nights"
                          type="number"
                          value={String(d.nights)}
                          onChange={(v) =>
                            updateDest(i, { nights: Math.max(0, Number(v) || 0) })
                          }
                        />
                      </div>
                      <div className="col-span-4 md:col-span-1 flex justify-end">
                        {destinations.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDest(i)}
                            className="text-on-surface-variant hover:text-primary text-sm"
                            aria-label="Remove destination"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addDest}
                    className="text-[12px] tracking-[0.1em] uppercase font-semibold text-primary hover:opacity-70"
                  >
                    + Add destination
                  </button>
                </div>
              </Section>

              {/* Services */}
              <Section title="Services needed">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => {
                    const checked = !!selected[s.slug];
                    return (
                      <label
                        key={s.slug}
                        className={`flex items-start gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                          checked
                            ? "border-primary bg-primary/5"
                            : "border-outline-variant/40 hover:border-primary/40"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={(e) =>
                            setSelected((p) => ({ ...p, [s.slug]: e.target.checked }))
                          }
                          className="mt-1 accent-primary"
                        />
                        <div>
                          <div className="font-semibold text-primary">{s.title}</div>
                          <div className="text-sm text-on-surface-variant">
                            {s.short}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </Section>

              {/* Preferences */}
              <Section title="Preferences">
                <div className="space-y-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.15em] font-semibold text-on-surface-variant mb-3">
                      Accommodation
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {["Budget", "Mid-range", "Luxury"].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAccommodation(opt)}
                          className={`px-5 py-2 text-sm rounded-full border transition-colors ${
                            accommodation === opt
                              ? "bg-primary text-white border-primary"
                              : "border-outline-variant/60 text-on-surface hover:border-primary"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.15em] font-semibold text-on-surface-variant block mb-2">
                      Special requests
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={5}
                      placeholder="Honeymoon, dietary needs, accessibility, photography focus…"
                      className="w-full bg-white border border-outline-variant/60 rounded-lg p-4 outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </Section>
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28 self-start">
              <div className="glass-panel rounded-xl p-8 cloud-shadow">
                <h3 className="font-display text-xl font-semibold text-primary mb-2">
                  Ready to go?
                </h3>
                <p className="text-sm text-on-surface-variant mb-6">
                  Generate a Qafri-branded PDF summary or email it to our travel
                  desk.
                </p>
                <button
                  type="button"
                  onClick={onDownload}
                  disabled={busy}
                  className="btn-primary w-full text-center block disabled:opacity-50"
                >
                  {busy ? "Preparing…" : "Download PDF"}
                </button>
                <button
                  type="button"
                  onClick={onEmail}
                  className="mt-3 w-full px-6 py-3 border border-primary/40 text-primary text-[12px] tracking-[0.1em] uppercase font-semibold hover:bg-primary/5 transition-colors"
                >
                  Send to Qafri
                </button>
                <div className="mt-6 pt-6 border-t border-outline-variant/40 text-xs text-on-surface-variant space-y-1">
                  <p>+254 712 909 770 / +254 100 521 498</p>
                  <p>info@qafritoursandtravels.africa</p>
                  <p>IATA Accredited Agency</p>
                </div>
                <Link
                  to="/services"
                  className="mt-6 inline-block text-[11px] tracking-[0.15em] uppercase font-semibold text-primary"
                >
                  Browse services →
                </Link>
              </div>
            </aside>
          </form>
        </Reveal>
      </section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-[22px] md:text-[26px] font-semibold text-primary mb-6">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-on-surface-variant block mb-2">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white border border-outline-variant/60 rounded-lg px-4 py-3 outline-none focus:border-primary"
      />
    </label>
  );
}
