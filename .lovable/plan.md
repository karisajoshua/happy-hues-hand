# Plan: Service Detail Pages + Itinerary Builder with PDF

## 1. Per-service detail pages

Create a dynamic route `src/routes/services.$slug.tsx` that renders a full page for each service in `src/lib/services.ts`.

- Lookup service by `slug`; if not found, show a `notFoundComponent`.
- Layout: hero image, title, long description, "What's included" bullets, FAQ-style highlights, CTA ("Request this service" → `/contact?service=slug`, "Build an Itinerary" → `/itinerary`).
- Per-route SEO: unique `head()` with title, description, og:title/description/image (the service image).
- Update `src/lib/services.ts` to add structured fields: `included: string[]`, `highlights: string[]`, `process: { step: string; detail: string }[]`.
- Update all "card" links currently pointing at `/services` to point at `/services/$slug` with `params={{ slug }}`:
  - `src/components/SiteNav.tsx` mega menu items
  - `src/routes/services.tsx` service cards
  - Home carousel cards in `src/routes/index.tsx`
- Add an "All services" breadcrumb back to `/services`.
- Add JSON-LD `Service` schema in head meta.

## 2. Itinerary builder

New route `src/routes/itinerary.tsx` — a multi-step form to assemble a trip summary.

Form sections (single page, sectioned, no backend persistence — pure client state via `useState`):
- Traveler info: name, email, phone, party size, travel dates (start/end).
- Destinations: add multiple {country, city, nights}.
- Services selected: checkbox list pulled from `SERVICES` (passport, visa, insurance, air ticketing, hotel, safari, chauffeur, events).
- Accommodation preference: budget / mid-range / luxury (radio).
- Special requests: textarea.
- Two actions:
  1. **Download PDF** — generates branded PDF locally.
  2. **Send to Qafri** — opens `mailto:info@qafritoursandtravels.africa` with summary in body (no backend needed).

Add nav entry "Plan Trip" linking to `/itinerary` in `SiteNav.tsx` and CTA buttons on home/safaris pages.

## 3. Branded PDF generation

Use `jspdf` (lightweight, pure-JS, works in browser, no server).

- Install: `bun add jspdf`
- Create `src/lib/itinerary-pdf.ts` exporting `generateItineraryPdf(data)`.
- PDF structure:
  - Header: Qafri logo (embedded as base64 from `src/assets/qafri-logo.png`), company name, "Travel Itinerary Summary".
  - Brand bar in primary color.
  - Traveler details block.
  - Destinations table (city, country, nights).
  - Selected services list with short descriptions.
  - Preferences and special requests.
  - Footer on every page: "Qafri Tours & Travels Ltd. · Nairobi, Kenya · +254 712 909 770 · info@qafritoursandtravels.africa · IATA Accredited Agency · www.qafritoursandtravels.africa".
  - File name: `Qafri-Itinerary-{travelerLastName}-{date}.pdf`.
- Convert logo to base64 at build time via Vite `?url` + fetch, or import as base64 string using `?inline` — simplest: import the PNG and use a small helper that reads it via fetch in the browser before generating.

## Files

**New**
- `src/routes/services.$slug.tsx`
- `src/routes/itinerary.tsx`
- `src/lib/itinerary-pdf.ts`

**Edited**
- `src/lib/services.ts` (add `included`, `highlights`, `process`)
- `src/components/SiteNav.tsx` (mega menu links → detail routes; add "Plan Trip" link)
- `src/routes/services.tsx` (cards link to detail pages)
- `src/routes/index.tsx` (carousel cards link to detail pages; add itinerary CTA)
- `package.json` (jspdf)

## Technical notes

- PDF is generated entirely client-side; no server function or storage needed.
- Itinerary state is local-only; not saved to a database (no Cloud usage). If you'd like saved itineraries with a "My Trips" page later, that requires Lovable Cloud — say the word.
- All new routes get `head()` metadata and `<Reveal>` entrance animations consistent with the rest of the site.
