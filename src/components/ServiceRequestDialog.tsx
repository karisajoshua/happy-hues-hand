import { useMemo, useState } from "react";
import { X } from "lucide-react";
import {
  generateServiceRequestPdf,
  type ServiceRequestData,
} from "@/lib/service-request-pdf";
import type { RequestField, Service } from "@/lib/services";

const WHATSAPP_NUMBER = "254712909770";

type FieldValue = string | number;

export function ServiceRequestDialog({
  service,
  open,
  onClose,
}: {
  service: Service;
  open: boolean;
  onClose: () => void;
}) {
  const fields: RequestField[] = useMemo(
    () => service.requestFields ?? [],
    [service],
  );

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [values, setValues] = useState<Record<string, FieldValue>>({});
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  const setField = (name: string, v: FieldValue) =>
    setValues((s) => ({ ...s, [name]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;
    for (const f of fields) {
      if (f.required && !String(values[f.name] ?? "").trim()) return;
    }
    setBusy(true);
    try {
      const notesField = fields.find((f) => f.name === "notes");
      const detailFields = fields.filter((f) => f.name !== "notes");
      const data: ServiceRequestData = {
        serviceTitle: service.title,
        serviceShort: service.short,
        fullName: fullName.trim().slice(0, 100),
        email: email.trim().slice(0, 200),
        phone: phone.trim().slice(0, 30),
        fields: detailFields.map((f) => ({
          label: f.label,
          value: String(values[f.name] ?? "").trim().slice(0, 500),
        })),
        notes: notesField
          ? String(values[notesField.name] ?? "").trim().slice(0, 1000)
          : undefined,
      };
      const { filename } = await generateServiceRequestPdf(data);

      const summary = [
        `*New Service Request — ${service.title}*`,
        "",
        `Name: ${data.fullName}`,
        `Email: ${data.email || "—"}`,
        `Phone: ${data.phone}`,
        ...data.fields.map((f) => `${f.label}: ${f.value || "—"}`),
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

  const inputCls =
    "w-full px-4 py-3 border border-outline-variant rounded-md bg-white text-on-surface focus:border-primary focus:outline-none transition-colors";

  const renderField = (f: RequestField) => {
    const v = values[f.name] ?? "";
    const common = {
      required: f.required,
      value: v as string | number,
      placeholder: f.placeholder,
      className: inputCls,
    };
    if (f.type === "textarea") {
      return (
        <textarea
          {...common}
          rows={4}
          maxLength={1000}
          onChange={(e) => setField(f.name, e.target.value)}
          className={inputCls + " resize-y"}
        />
      );
    }
    if (f.type === "select") {
      return (
        <select
          {...common}
          onChange={(e) => setField(f.name, e.target.value)}
        >
          <option value="">Select…</option>
          {(f.options ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );
    }
    if (f.type === "number") {
      return (
        <input
          {...common}
          type="number"
          min={0}
          onChange={(e) =>
            setField(f.name, e.target.value === "" ? "" : Number(e.target.value))
          }
        />
      );
    }
    return (
      <input
        {...common}
        type={f.type}
        maxLength={300}
        onChange={(e) => setField(f.name, e.target.value)}
      />
    );
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
                className={inputCls}
              />
            </Field>
            <Field label="Phone (WhatsApp) *">
              <input
                required
                maxLength={30}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+254..."
                className={inputCls}
              />
            </Field>
            <Field label="Email" colSpan={2}>
              <input
                type="email"
                maxLength={200}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputCls}
              />
            </Field>

            {fields.map((f) => (
              <Field
                key={f.name}
                label={f.label + (f.required ? " *" : "")}
                colSpan={f.colSpan ?? 1}
              >
                {renderField(f)}
              </Field>
            ))}
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
  colSpan = 1,
}: {
  label: string;
  children: React.ReactNode;
  colSpan?: 1 | 2;
}) {
  return (
    <label className={"block " + (colSpan === 2 ? "md:col-span-2" : "")}>
      <span className="block text-[11px] tracking-[0.15em] uppercase font-semibold text-on-surface-variant mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
