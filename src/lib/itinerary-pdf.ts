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

// Executive palette
const NAVY: [number, number, number] = [10, 31, 61];
const NAVY_DEEP: [number, number, number] = [6, 20, 42];
const GOLD: [number, number, number] = [184, 146, 74];
const GOLD_SOFT: [number, number, number] = [212, 184, 130];
const CREAM: [number, number, number] = [251, 248, 242];
const CREAM_DEEP: [number, number, number] = [244, 238, 226];
const INK: [number, number, number] = [28, 32, 40];
const MUTED: [number, number, number] = [110, 116, 128];
const HAIRLINE: [number, number, number] = [220, 212, 196];

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

function toRoman(num: number): string {
  const map: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let n = num;
  let out = "";
  for (const [v, s] of map) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}

export async function generateItineraryPdf(data: ItineraryData) {
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

  // ---------- COVER PAGE ----------
  const drawCover = () => {
    // Full navy background
    doc.setFillColor(...NAVY_DEEP);
    doc.rect(0, 0, pageW, pageH, "F");

    // Gold border frame
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.75);
    doc.rect(28, 28, pageW - 56, pageH - 56);
    doc.setLineWidth(0.25);
    doc.rect(34, 34, pageW - 68, pageH - 68);

    // Top wordmark
    doc.setTextColor(...GOLD_SOFT);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("QAFRI TOURS & TRAVELS · NAIROBI", pageW / 2, 70, {
      align: "center",
      charSpace: 3,
    });

    // Logo
    if (logoData) {
      try {
        doc.addImage(logoData, "PNG", pageW / 2 - 45, 110, 90, 90);
      } catch {
        /* ignore */
      }
    }

    // Centerpiece title
    doc.setTextColor(255, 255, 255);
    doc.setFont("times", "normal");
    doc.setFontSize(40);
    doc.text("Travel Itinerary", pageW / 2, 260, { align: "center" });

    // Gold ornamental rule
    drawOrnamentRule(pageW / 2, 285, 90);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(...GOLD_SOFT);
    doc.text("PRIVATELY PREPARED FOR", pageW / 2, 320, {
      align: "center",
      charSpace: 4,
    });

    doc.setFont("times", "italic");
    doc.setFontSize(26);
    doc.setTextColor(255, 255, 255);
    doc.text(data.fullName || "Esteemed Guest", pageW / 2, 355, {
      align: "center",
    });

    // Trip dates panel
    const dateY = 420;
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.5);
    doc.line(pageW / 2 - 120, dateY, pageW / 2 - 20, dateY);
    doc.line(pageW / 2 + 20, dateY, pageW / 2 + 120, dateY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...GOLD_SOFT);
    doc.text("JOURNEY", pageW / 2, dateY - 4, { align: "center", charSpace: 3 });

    doc.setFont("times", "normal");
    doc.setFontSize(14);
    doc.setTextColor(255, 255, 255);
    doc.text(
      `${data.startDate || "—"}   to   ${data.endDate || "—"}`,
      pageW / 2,
      dateY + 24,
      { align: "center" },
    );

    // Bottom seal
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...GOLD);
    doc.text("IATA ACCREDITED · LICENSED TRAVEL CONCIERGE", pageW / 2, pageH - 90, {
      align: "center",
      charSpace: 3,
    });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...GOLD_SOFT);
    doc.text(`Issued ${today}`, pageW / 2, pageH - 72, { align: "center" });

    doc.setFontSize(7);
    doc.text(
      "info@qafritoursandtravels.africa  ·  +254 712 909 770  ·  www.qafritoursandtravels.africa",
      pageW / 2,
      pageH - 56,
      { align: "center" },
    );
  };

  const drawOrnamentRule = (cx: number, y: number, width: number) => {
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.6);
    doc.line(cx - width / 2, y, cx - 6, y);
    doc.line(cx + 6, y, cx + width / 2, y);
    doc.setFillColor(...GOLD);
    // diamond
    const d = 3;
    doc.triangle(cx, y - d, cx - d, y, cx + d, y, "F");
    doc.triangle(cx, y + d, cx - d, y, cx + d, y, "F");
  };

  // ---------- INTERIOR PAGE CHROME ----------
  const drawInteriorChrome = (pageNum: number) => {
    // Cream background
    doc.setFillColor(...CREAM);
    doc.rect(0, 0, pageW, pageH, "F");

    // Left gold side rule
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(1.2);
    doc.line(margin - 18, 80, margin - 18, pageH - 80);

    // Header
    if (logoData) {
      try {
        doc.addImage(logoData, "PNG", margin, 36, 26, 26);
      } catch {
        /* ignore */
      }
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...NAVY);
    doc.text("QAFRI TOURS & TRAVELS", margin + 34, 50, { charSpace: 2 });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text("EXECUTIVE TRAVEL CONCIERGE", margin + 34, 60, { charSpace: 2 });

    doc.setFont("times", "italic");
    doc.setFontSize(10);
    doc.setTextColor(...NAVY);
    doc.text("Travel Itinerary", pageW - margin, 50, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text(
      (data.fullName || "Guest").toUpperCase(),
      pageW - margin,
      60,
      { align: "right", charSpace: 2 },
    );

    // Header gold underline
    doc.setDrawColor(...GOLD);
    doc.setLineWidth(0.4);
    doc.line(margin, 74, pageW - margin, 74);

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
    doc.text(
      `— ${toRoman(pageNum)} —`,
      pageW - margin,
      fy + 14,
      { align: "right" },
    );
  };

  let y = 0;
  let interiorPageNum = 0;

  const startInteriorPage = () => {
    interiorPageNum += 1;
    drawInteriorChrome(interiorPageNum);
    y = 110;
  };

  const ensureSpace = (needed: number) => {
    if (y + needed > pageH - 80) {
      doc.addPage();
      startInteriorPage();
    }
  };

  const sectionTitle = (label: string) => {
    ensureSpace(50);
    doc.setFont("times", "normal");
    doc.setFontSize(18);
    doc.setTextColor(...NAVY);
    doc.text(label, margin, y);
    y += 8;
    drawOrnamentRule(margin + 30, y, 70);
    y += 22;
  };

  const paragraph = (text: string, opts?: { italic?: boolean; size?: number }) => {
    if (!text) return;
    doc.setFont(opts?.italic ? "times" : "helvetica", opts?.italic ? "italic" : "normal");
    doc.setFontSize(opts?.size ?? 10.5);
    doc.setTextColor(...INK);
    const lines = doc.splitTextToSize(text, contentW);
    ensureSpace(lines.length * 14 + 4);
    doc.text(lines, margin, y);
    y += lines.length * 14 + 4;
  };

  // ============ COVER ============
  drawCover();

  // ============ PAGE 2: TRAVELER ============
  doc.addPage();
  startInteriorPage();

  // Intro letter
  doc.setFont("times", "italic");
  doc.setFontSize(11);
  doc.setTextColor(...MUTED);
  const intro = doc.splitTextToSize(
    `Dear ${data.fullName?.split(" ")[0] || "Guest"}, it is our privilege to present the following itinerary, prepared with the discretion and care befitting a journey of distinction.`,
    contentW,
  );
  doc.text(intro, margin, y);
  y += intro.length * 14 + 14;

  sectionTitle("Traveler Particulars");

  // Framed card
  const cardX = margin;
  const cardW = contentW;
  const rows: [string, string][] = [
    ["Full Name", data.fullName || "—"],
    ["Email", data.email || "—"],
    ["Telephone", data.phone || "—"],
    ["Party Size", String(data.partySize ?? "—")],
    ["Departure", data.startDate || "—"],
    ["Return", data.endDate || "—"],
  ];
  const rowH = 26;
  const cardH = rows.length * rowH + 16;
  ensureSpace(cardH + 10);
  doc.setFillColor(...CREAM_DEEP);
  doc.rect(cardX, y, cardW, cardH, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.6);
  doc.rect(cardX, y, cardW, cardH);
  // inner
  doc.setLineWidth(0.2);
  doc.setDrawColor(...GOLD_SOFT);
  doc.rect(cardX + 4, y + 4, cardW - 8, cardH - 8);

  let ry = y + 22;
  rows.forEach((r, i) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text(r[0].toUpperCase(), cardX + 18, ry, { charSpace: 2 });
    doc.setFont("times", "normal");
    doc.setFontSize(12);
    doc.setTextColor(...NAVY);
    doc.text(r[1], cardX + 160, ry);
    if (i < rows.length - 1) {
      doc.setDrawColor(...HAIRLINE);
      doc.setLineWidth(0.3);
      doc.line(cardX + 14, ry + 8, cardX + cardW - 14, ry + 8);
    }
    ry += rowH;
  });
  y += cardH + 24;

  // ============ DESTINATIONS ============
  sectionTitle("Destinations");

  if (data.destinations.length === 0) {
    paragraph("No destinations specified.", { italic: true });
  } else {
    data.destinations.forEach((d, i) => {
      const blockH = 56;
      ensureSpace(blockH + 10);
      // Navy header strip
      doc.setFillColor(...NAVY);
      doc.rect(margin, y, contentW, 22, "F");
      doc.setFillColor(...GOLD);
      doc.rect(margin, y, 4, 22, "F");
      doc.setFont("times", "normal");
      doc.setFontSize(13);
      doc.setTextColor(255, 255, 255);
      doc.text(`${String(i + 1).padStart(2, "0")}.  ${d.city || "—"}`, margin + 14, y + 15);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...GOLD_SOFT);
      doc.text(`${d.nights || 0} NIGHT${(d.nights || 0) === 1 ? "" : "S"}`, pageW - margin - 8, y + 15, {
        align: "right",
        charSpace: 2,
      });
      // Body
      doc.setFillColor(...CREAM_DEEP);
      doc.rect(margin, y + 22, contentW, blockH - 22, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(...MUTED);
      doc.text("COUNTRY", margin + 14, y + 36, { charSpace: 2 });
      doc.setFont("times", "italic");
      doc.setFontSize(11);
      doc.setTextColor(...INK);
      doc.text(d.country || "—", margin + 14, y + 50);
      y += blockH + 8;
    });
  }
  y += 10;

  // ============ SERVICES ============
  sectionTitle("Curated Services");
  if (data.services.length === 0) {
    paragraph("No services selected.", { italic: true });
  } else {
    data.services.forEach((s, i) => {
      ensureSpace(46);
      // Number
      doc.setFont("times", "italic");
      doc.setFontSize(20);
      doc.setTextColor(...GOLD);
      doc.text(String(i + 1).padStart(2, "0"), margin, y + 4);
      // Title
      doc.setFont("times", "normal");
      doc.setFontSize(13);
      doc.setTextColor(...NAVY);
      doc.text(s.title, margin + 32, y);
      // Gold rule
      doc.setDrawColor(...GOLD);
      doc.setLineWidth(0.4);
      doc.line(margin + 32, y + 6, margin + 32 + 40, y + 6);
      // Description
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(...INK);
      const lines = doc.splitTextToSize(s.short, contentW - 32);
      doc.text(lines, margin + 32, y + 22);
      y += 22 + lines.length * 13 + 12;
    });
  }
  y += 6;

  // ============ PREFERENCES ============
  sectionTitle("Preferences & Notes");

  const accH = 46;
  ensureSpace(accH + 6);
  doc.setFillColor(...CREAM_DEEP);
  doc.rect(margin, y, contentW, accH, "F");
  doc.setDrawColor(...GOLD_SOFT);
  doc.setLineWidth(0.4);
  doc.rect(margin, y, contentW, accH);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(...MUTED);
  doc.text("ACCOMMODATION PREFERENCE", margin + 14, y + 18, { charSpace: 2 });
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  doc.setTextColor(...NAVY);
  doc.text(data.accommodation || "—", margin + 14, y + 36);
  y += accH + 14;

  if (data.notes) {
    ensureSpace(40);
    // quote bar
    doc.setFillColor(...GOLD);
    doc.rect(margin, y, 2, 40, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text("SPECIAL REQUESTS", margin + 14, y + 4, { charSpace: 2 });
    y += 18;
    doc.setFont("times", "italic");
    doc.setFontSize(11);
    doc.setTextColor(...INK);
    const lines = doc.splitTextToSize(data.notes, contentW - 14);
    ensureSpace(lines.length * 14);
    doc.text(lines, margin + 14, y);
    y += lines.length * 14 + 8;
  }

  // ============ CLOSING ============
  ensureSpace(140);
  y += 10;
  drawOrnamentRule(pageW / 2, y, 110);
  y += 28;
  doc.setFont("times", "italic");
  doc.setFontSize(12);
  doc.setTextColor(...INK);
  const closing = doc.splitTextToSize(
    "It would be our honour to refine, expand, or finalise any element of this itinerary at your convenience. Our concierge desk remains at your disposal, day or night.",
    contentW - 60,
  );
  doc.text(closing, pageW / 2, y, { align: "center" });
  y += closing.length * 14 + 18;

  doc.setFont("times", "italic");
  doc.setFontSize(13);
  doc.setTextColor(...NAVY);
  doc.text("With our warmest regards,", pageW / 2, y, { align: "center" });
  y += 22;
  doc.setFont("times", "normal");
  doc.setFontSize(14);
  doc.setTextColor(...NAVY);
  doc.text("The Qafri Concierge Team", pageW / 2, y, { align: "center" });
  y += 8;
  drawOrnamentRule(pageW / 2, y + 8, 60);

  // Chrome is drawn at the start of each interior page already.

  const last = (data.fullName || "guest").trim().split(/\s+/).pop() || "guest";
  const stamp = new Date().toISOString().slice(0, 10);
  doc.save(`Qafri-Itinerary-${last}-${stamp}.pdf`);
}
