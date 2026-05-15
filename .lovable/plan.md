# Plan: Nav polish + mobile-friendly pass

## 1. Solid white sticky nav
- In `src/components/SiteNav.tsx`, replace the `glass-panel` class on the `<nav>` with a solid white background (`bg-white`) and keep the existing border + shadow.
- Remove the translucent backdrop blur so the nav never shows page content through it on scroll.
- Keep the mega-menu panel itself glassy/white as today (it sits below the bar).

## 2. Mega menu — block the page behind it
- Add a full-viewport backdrop (fixed overlay, dimmed + blurred) that appears together with the mega menu so the scrolling page underneath is no longer visible.
- Overlay sits below the mega panel, above page content, and closes the menu on click.
- Lock body scroll while the mega menu is open so the page can't scroll behind it.

## 3. Mobile-friendly site
The current nav is desktop-only (`hidden md:flex`) with no mobile menu, and several pages assume desktop widths. Pass:

### Nav (mobile)
- Add a hamburger button visible below `md`.
- Tapping it opens a `Sheet` (already in `components/ui/sheet.tsx`) from the right with: Home, Safaris, Services (expandable list of all SERVICES), Plan Trip, Contact, Request Quote, Book a Trip.
- Logo height reduced on small screens; CTA "Book a Trip" hidden on the smallest widths to avoid crowding.

### Home (`src/routes/index.tsx`)
- Audit hero: ensure headline uses the existing `text-display-mobile` token, padding/margins use container-max, carousel controls reachable on touch, glass overlay sized for narrow screens.
- Stack any multi-column sections to single column under `md`.

### Services pages
- `services.index.tsx`: ensure card grid collapses to 1 column on mobile, 2 on `sm`, 3+ on `lg`.
- `services.$slug.tsx`: hero text scales down; "Request this service" button full-width on mobile; `ServiceRequestDialog` form uses single-column fields under `sm`.

### Other routes
- `safaris.tsx`, `itinerary.tsx`, `contact.tsx`: verify grids/forms collapse to single column on mobile and that horizontal padding uses `container-max` so nothing overflows.

### Footer (`SiteFooter.tsx`)
- Verify columns stack on mobile and the new IATA/TRA logo row wraps cleanly.

### Global
- Confirm `meta viewport` is present in `__root.tsx` (it is).
- Audit any fixed widths / `min-w-*` / large `text-display-lg` usage and add responsive variants.
- Make sure WhatsApp floating button doesn't overlap content on small screens.

## Out of scope
- No backend, routing, or content changes.
- No redesign of color tokens — only responsive layout and the nav fixes above.

## Files likely touched
- `src/components/SiteNav.tsx` (nav bg, mega backdrop, mobile sheet menu)
- `src/components/SiteFooter.tsx` (mobile stacking check)
- `src/components/ServiceRequestDialog.tsx` (form responsive grid)
- `src/routes/index.tsx`, `services.index.tsx`, `services.$slug.tsx`, `safaris.tsx`, `itinerary.tsx`, `contact.tsx` (responsive tweaks only)
- `src/styles.css` (small helper class if needed for body scroll lock)
