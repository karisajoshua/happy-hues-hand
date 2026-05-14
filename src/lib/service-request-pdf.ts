import { jsPDF } from "jspdf";
import logoUrl from "@/assets/qafri-logo.png";

export type ServiceRequestData = {
  serviceTitle: string;
  serviceShort: string;
  fullName: string;
  email: string;
  phone: string;
  partySize: number;
  preferredDate: string;
  destination: string;
  budget: string;
  notes: string;
};

const NAVY: [number, number, number] = [10, 31, 61];
const NAVY_DEEP: [number, number, number] = [6, 20, 42];
const GOLD: [number, number, number] = [184, 146, 74];
const GOLD_SOFT: [number, number, number] = [212, 184, 130];
const CREAM: [number, number, number] = [251, 248, 242];
const CREAM_DEEP: [number, number, number] = [244, 238, 226];
const INK: [number, number, number] = [28, 32, 40];
const MUTED: [number, number, number] = [110, 116, 128];

async function loadLogoDataUrl(): Promise<string> {
  const res = await fetch(logoUrl);
  const blob = await res.blob();
  return await new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(r.result as string);
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}

export async function generateServiceRequestPdf(
  data: ServiceRequestData,
): Promise<{ filename: string; blob: Blob }> {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 56;
  const contentW = pageW - margin * 2;

  let logoData: string | null = null;
  try {
    logoData = await loadLogoDataUrl();
  } catch {
    /* ignore */
  }

  const today = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Cover banner
  doc.setFillColor(...NAVY_DEEP);
  doc.rect(0, 0, pageW, 180, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  doc.line(margin, 160, pageW - margin, 160);

  if (logoData) {
    try {
      doc.addImage(logoData, "PNG", margin, 38, 54, 54);
    } catch {
      /* ignore */
    }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...GOLD_SOFT);
  doc.text("QAFRI TOURS & TRAVELS", margin + 70, 64, { charSpace: 3 });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text("EXECUTIVE TRAVEL CONCIERGE · NAIROBI", margin + 70, 78, {
    charSpace: 2,
  });

  doc.setFont("times", "italic");
  doc.setFontSize(11);
  doc.setTextColor(...GOLD_SOFT);
  doc.text("Service Request", pageW - margin, 64, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(today.toUpperCase(), pageW - margin, 78, {
    align: "right",
    charSpace: 2,
  });

  doc.setFont("times", "normal");
  doc.setFontSize(26);
  doc.setTextColor(255, 255, 255);
  doc.text(data.serviceTitle, margin, 130);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...GOLD_SOFT);
  const shortLines = doc.splitTextToSize(data.serviceShort, contentW);
  doc.text(shortLines, margin, 150);

  // Body
  doc.setFillColor(...CREAM);
  doc.rect(0, 180, pageW, pageH - 180, "F");

  let y = 220;

  const sectionTitle = (label: string) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...GOLD);
    doc.text(label.toUpperCase(), margin, y, { charSpace: 3 });
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.4);
    doc.line(margin, y + 6, margin + 40, y + 6);
    y += 22;
  };

  sectionTitle("Requestor Particulars");

  const rows: [string, string][] = [
    ["Full Name", data.fullName || "—"],
    ["Email", data.email || "—"],
    ["Telephone", data.phone || "—"],
    ["Party Size", String(data.partySize ?? "—")],
    ["Preferred Date", data.preferredDate || "—"],
    ["Destination / Route", data.destination || "—"],
    ["Indicative Budget", data.budget || "—"],
  ];
  const rowH = 26;
  const cardH = rows.length * rowH + 16;
  doc.setFillColor(...CREAM_DEEP);
  doc.rect(margin, y, contentW, cardH, "F");
  doc.setDrawColor(...GOLD_SOFT);
  doc.setLineWidth(0.4);
  doc.rect(margin, y, contentW, cardH);

  let ry = y + 22;
  rows.forEach((r) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(r[0].toUpperCase(), margin + 18, ry, { charSpace: 2 });
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setTextColor(...NAVY);
    doc.text(r[1], margin + 180, ry);
    ry += rowH;
  });
  y += cardH + 24;

  if (data.notes) {
    sectionTitle("Additional Notes");
    doc.setFillColor(...CREAM_DEEP);
    doc.setDrawColor(...GOLD_SOFT);
    doc.setLineWidth(0.4);
    doc.setFont("times", "italic");
    doc.setFontSize(11);
    doc.setTextColor(...INK);
    const noteLines = doc.splitTextToSize(data.notes, contentW - 24);
    const noteH = noteLines.length * 14 + 24;
    doc.rect(margin, y, contentW, noteH, "F");
    doc.rect(margin, y, contentW, noteH);
    doc.setFillColor(...GOLD);
    doc.rect(margin, y, 2, noteH, "F");
    doc.text(noteLines, margin + 14, y + 18);
    y += noteH + 20;
  }

  // Footer
  const fy = pageH - 50;
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.line(margin, fy, pageW - margin, fy);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(...MUTED);
  doc.text(
    "Qafri Tours & Travels Ltd.  ·  Nairobi, Kenya  ·  +254 712 909 770  ·  info@qafritoursandtravels.africa",
    margin,
    fy + 14,
    { charSpace: 0.5 },
  );
  doc.setFont("times", "italic");
  doc.setFontSize(8);
  doc.setTextColor(...NAVY);
  doc.text("IATA Accredited", pageW - margin, fy + 14, { align: "right" });

  const last = (data.fullName || "guest").trim().split(/\s+/).pop() || "guest";
  const stamp = new Date().toISOString().slice(0, 10);
  const slug = data.serviceTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const filename = `Qafri-${slug}-${last}-${stamp}.pdf`;
  const blob = doc.output("blob");
  doc.save(filename);
  return { filename, blob };
}
