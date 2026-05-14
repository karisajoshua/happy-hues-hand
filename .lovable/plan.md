# Plan

## 1. Add Helicopter Services
- Add a new entry to `SERVICES` in `src/lib/services.ts` with slug `helicopter`, title "Helicopter Services", and content covering scenic flights, transfers, charters, and aerial safaris (Maasai Mara, Kilimanjaro, coast).
- Generate a premium helicopter image at `src/assets/services/helicopter.jpg` and import it.
- It will automatically appear on `/services` grid and as `/services/helicopter` detail page.
- Add it as a selectable option on the `/itinerary` plan-trip page (it iterates `SERVICES`, so just verify it shows up).

## 2. Premium Executive PDF Redesign (`src/lib/itinerary-pdf.ts`)
Rebuild the layout to feel like a luxury concierge document:

- **Cover page**: full navy background, centered gold-foil-style logo, large serif "TRAVEL ITINERARY", traveler name in elegant uppercase, dates, a thin gold divider, and footer crest line ("Prepared by Qafri Tours & Travels · IATA Accredited").
- **Typography hierarchy**: use `times` (serif) for headings/titles to evoke executive stationery, `helvetica` for body. Tight letter-spacing on uppercase labels.
- **Color palette refinement**: deepen navy `#0A1F3D`, gold `#B8924A`, cream background `#FBF8F2` for content pages, soft hairline rules in warm gray.
- **Page frame**: subtle cream tint, thin gold side rule on the left margin, page header with small logo + "QAFRI TOURS & TRAVELS" wordmark and gold underline, footer with contact strip + page count in roman numerals style.
- **Section headers**: serif, uppercase, with gold ornamental rule (line + diamond + line) instead of plain underline.
- **Traveler card**: framed two-column key/value block with light cream fill and gold border, instead of plain rows.
- **Destinations**: card-style entries (rounded rectangle, navy header strip with city, country + nights inside) instead of a plain table.
- **Services**: each as a numbered serif title with gold rule beneath and italic description.
- **Preferences/notes**: framed quote-style block.
- **Closing page**: thank-you note signed "The Qafri Concierge Team" with gold flourish divider and contact details centered.
- Keep existing API (`generateItineraryPdf(data)`) so the itinerary route requires no changes.

## 3. Footer Social Icons (`src/components/SiteFooter.tsx`)
Replace the text list under "Social" with icon buttons (lucide-react `Instagram`, `Twitter`, plus `Mail` and `Phone` optional) linking to the existing URLs. Show as a row of circular icon buttons with hover gold accent. Keep handle labels as small text below or as `aria-label` only.

## 4. Copyright Year
In `SiteFooter.tsx` change `© 2024` → `© 2026`.

## Technical notes
- No backend changes; pure frontend.
- New asset: `src/assets/services/helicopter.jpg` (generated via imagegen).
- Lucide icons already available.
- PDF uses jsPDF built-in fonts (`helvetica`, `times`) — no font embedding needed.
