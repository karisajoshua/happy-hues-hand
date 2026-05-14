import { jsPDF } from "jspdf";
import logoUrl from "@/assets/qafri-logo.png";

export type ItineraryDestination = {
  city: string;
  country: string;
  nights: number;
};

export type ItineraryData = {
  fullName: string;
  email: string;
  phone: string;
  partySize: number;
  startDate: string;
  endDate: string;
  destinations: ItineraryDestination[];
  services: { title: string; short: string }[];
  accommodation: string;
  notes: string;
};

const PRIMARY: [number, number, number] = [12, 35, 64]; // navy
const ACCENT: [number, number, number] = [201, 168, 76]; // gold-ish
const MUTED: [number, number, number] = [90, 100, 115];

async function loadLogoDataUrl(): Promise<string> {
  const res = await fetch(logoUrl);
  const blob = await res.blob();
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export async function generateItineraryPdf(data: ItineraryData) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;

  let logoData: string | null = null;
  try {
    logoData = await loadLogoDataUrl();
  } catch {
    /* ignore */
  }

  const drawHeader = () => {
    doc.setFillColor(...PRIMARY);
    doc.rect(0, 0, pageW, 90, "F");
    doc.setFillColor(...ACCENT);
    doc.rect(0, 90, pageW, 4, "F");
    if (logoData) {
      try {
        doc.addImage(logoData, "PNG", margin, 20, 50, 50);
      } catch {
        /* ignore */
      }
    }
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Qafri Tours & Travels Ltd.", margin + 64, 42);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Travel Itinerary Summary", margin + 64, 60);
    doc.setFontSize(9);
    doc.text("IATA Accredited Agency · Nairobi, Kenya", pageW - margin, 42, {
      align: "right",
    });
    doc.text(
      new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      pageW - margin,
      58,
      { align: "right" },
    );
  };

  const drawFooter = (pageNum: number, pageCount: number) => {
    const y = pageH - 36;
    doc.setDrawColor(...ACCENT);
    doc.setLineWidth(0.5);
    doc.line(margin, y - 8, pageW - margin, y - 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(
      "Qafri Tours & Travels Ltd. · Nairobi, Kenya · +254 712 909 770 · info@qafritoursandtravels.africa",
      pageW / 2,
      y,
      { align: "center" },
    );
    doc.text(
      "www.qafritoursandtravels.africa · IATA Accredited Agency",
      pageW / 2,
      y + 11,
      { align: "center" },
    );
    doc.text(`Page ${pageNum} / ${pageCount}`, pageW - margin, y + 11, {
      align: "right",
    });
  };

  let y = 130;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageH - 70) {
      doc.addPage();
      drawHeader();
      y = 130;
    }
  };

  const sectionTitle = (label: string) => {
    ensureSpace(40);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...PRIMARY);
    doc.text(label.toUpperCase(), margin, y);
    doc.setDrawColor(...ACCENT);
    doc.setLineWidth(1);
    doc.line(margin, y + 4, margin + 40, y + 4);
    y += 22;
  };

  const kv = (label: string, value: string) => {
    ensureSpace(18);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    doc.text(label.toUpperCase(), margin, y);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(30, 30, 30);
    doc.text(value || "—", margin + 130, y);
    y += 18;
  };

  const paragraph = (text: string) => {
    if (!text) return;
    const lines = doc.splitTextToSize(text, pageW - margin * 2);
    ensureSpace(lines.length * 14 + 4);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    doc.text(lines, margin, y);
    y += lines.length * 14 + 4;
  };

  drawHeader();

  // Traveler
  sectionTitle("Traveler Details");
  kv("Full Name", data.fullName);
  kv("Email", data.email);
  kv("Phone", data.phone);
  kv("Party Size", String(data.partySize));
  kv(
    "Travel Dates",
    `${data.startDate || "—"}  →  ${data.endDate || "—"}`,
  );
  y += 8;

  // Destinations
  sectionTitle("Destinations");
  if (data.destinations.length === 0) {
    paragraph("No destinations specified.");
  } else {
    const colX = [margin, margin + 200, margin + 400, pageW - margin];
    ensureSpace(22);
    doc.setFillColor(245, 247, 250);
    doc.rect(margin - 4, y - 12, pageW - margin * 2 + 8, 20, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...PRIMARY);
    doc.text("CITY", colX[0], y);
    doc.text("COUNTRY", colX[1], y);
    doc.text("NIGHTS", colX[2], y);
    y += 18;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(40, 40, 40);
    data.destinations.forEach((d) => {
      ensureSpace(18);
      doc.text(d.city || "—", colX[0], y);
      doc.text(d.country || "—", colX[1], y);
      doc.text(String(d.nights || 0), colX[2], y);
      y += 16;
    });
  }
  y += 8;

  // Services
  sectionTitle("Selected Services");
  if (data.services.length === 0) {
    paragraph("No services selected.");
  } else {
    data.services.forEach((s) => {
      ensureSpace(28);
      doc.setFillColor(...ACCENT);
      doc.circle(margin + 3, y - 4, 2.5, "F");
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(...PRIMARY);
      doc.text(s.title, margin + 14, y);
      y += 13;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...MUTED);
      const lines = doc.splitTextToSize(s.short, pageW - margin * 2 - 14);
      doc.text(lines, margin + 14, y);
      y += lines.length * 12 + 6;
    });
  }
  y += 6;

  // Preferences
  sectionTitle("Preferences");
  kv("Accommodation", data.accommodation);
  if (data.notes) {
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...MUTED);
    ensureSpace(18);
    doc.text("SPECIAL REQUESTS", margin, y);
    y += 14;
    paragraph(data.notes);
  }

  // Footer pass
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    drawFooter(i, pageCount);
  }

  const last = (data.fullName || "guest").trim().split(/\s+/).pop() || "guest";
  const stamp = new Date().toISOString().slice(0, 10);
  doc.save(`Qafri-Itinerary-${last}-${stamp}.pdf`);
}
