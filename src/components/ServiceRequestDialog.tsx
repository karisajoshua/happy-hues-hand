import { useState } from "react";
import { X } from "lucide-react";
import {
  generateServiceRequestPdf,
  type ServiceRequestData,
} from "@/lib/service-request-pdf";
import type { Service } from "@/lib/services";

const WHATSAPP_NUMBER = "254712909770";

export function ServiceRequestDialog({
  service,
  open,
  onClose,
}: {
  service: Service;
  open: boolean;
  onClose: () => void;
}) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [partySize, setPartySize] = useState(2);
  const [preferredDate, setPreferredDate] = useState("");
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;
    setBusy(true);
    try {
      const data: ServiceRequestData = {
        serviceTitle: service.title,
        serviceShort: service.short,
        fullName: fullName.trim().slice(0, 100),
        email: email.trim().slice(0, 200),
        phone: phone.trim().slice(0, 30),
        partySize,
        preferredDate,
        destination: destination.trim().slice(0, 200),
        budget: budget.trim().slice(0, 100),
        notes: notes.trim().slice(0, 1000),
      };
      const { filename } = await generateServiceRequestPdf(data);

      const summary = [
        `*New Service Request — ${service.title}*`,
        "",
        `Name: ${data.fullName}`,
        `Email: ${data.email || "—"}`,
        `Phone: ${data.phone}`,
        `Party size: ${data.partySize}`,
        `Preferred date: ${data.preferredDate || "—"}`,
        `Destination/Route: ${data.destination || "—"}`,
        `Budget: ${data.budget || "—"}`,
        data.notes ? `Notes: ${data.notes}` : "",
        "",
        `(PDF "${filename}" has been downloaded — please attach it here.)`,
      ]
        .filter(Boolean)
        .join("\n");

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(summary)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      onClose();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in-soft"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-xl shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 border-b border-outline-variant/30 sticky top-0 bg-white z-10">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase text-primary font-semibold">
              Request Service
            </p>
            <h2 className="font-display text-2xl font-semibold text-primary mt-1">
              {service.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 -m-2 text-on-surface-variant hover:text-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Full name *">
              <input
                required
                maxLength={100}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-outline-variant rounded-md bg-white text-on-surface focus:border-primary focus:outline-none transition-colors"
              />
            </Field>
            <Field label="Phone (WhatsApp) *">
              <input
                required
                maxLength={30}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254..."
                className="w-full px-4 py-3 border border-outline-variant rounded-md bg-white text-on-surface focus:border-primary focus:outline-none transition-colors"
              />
            </Field>
            <Field label="Email">
              <input
                type="email"
                maxLength={200}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-outline-variant rounded-md bg-white text-on-surface focus:border-primary focus:outline-none transition-colors"
              />
            </Field>
            <Field label="Party size">
              <input
                type="number"
                min={1}
                max={50}
                value={partySize}
                onChange={(e) => setPartySize(Number(e.target.value) || 1)}
                className="w-full px-4 py-3 border border-outline-variant rounded-md bg-white text-on-surface focus:border-primary focus:outline-none transition-colors"
              />
            </Field>
            <Field label="Preferred date">
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-4 py-3 border border-outline-variant rounded-md bg-white text-on-surface focus:border-primary focus:outline-none transition-colors"
              />
            </Field>
            <Field label="Destination / Route">
              <input
                maxLength={200}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Nairobi → Maasai Mara"
                className="w-full px-4 py-3 border border-outline-variant rounded-md bg-white text-on-surface focus:border-primary focus:outline-none transition-colors"
              />
            </Field>
            <div className="md:col-span-2">
              <Field label="Indicative budget">
                <input
                  maxLength={100}
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder="e.g. USD 2,500 per person"
                  className="w-full px-4 py-3 border border-outline-variant rounded-md bg-white text-on-surface focus:border-primary focus:outline-none transition-colors"
                />
              </Field>
            </div>
            <div className="md:col-span-2">
              <Field label="Additional notes">
                <textarea
                  rows={4}
                  maxLength={1000}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-outline-variant rounded-md bg-white text-on-surface focus:border-primary focus:outline-none transition-colors resize-y"
                />
              </Field>
            </div>
          </div>

          <p className="text-xs text-on-surface-variant">
            On submit, a PDF brief downloads to your device and WhatsApp opens
            with a summary — please attach the downloaded PDF in the chat.
          </p>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-outline-variant text-on-surface-variant text-[12px] tracking-[0.1em] uppercase font-semibold hover:bg-surface-container-low transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={busy}
              className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {busy ? "Preparing PDF…" : "Submit Plan Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.15em] uppercase font-semibold text-on-surface-variant mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
