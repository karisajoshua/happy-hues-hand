## Plan

### 1. Hero section (home)
- Remove the dark gradient overlay on `src/routes/index.tsx` hero so the image displays unfiltered.
- Adjust headline/text contrast (add subtle text-shadow or move to a side panel) so copy stays legible without the filter.

### 2. Services carousel (home)
Replace the existing "Strategic Travel Logistics" grid section with a horizontal carousel using the existing `src/components/ui/carousel.tsx` (Embla). Each slide = one service card with image, title, short copy, and link to `/services` or `/contact`.

Service order (as specified):
1. Passport Services
2. Visa Services
3. Travel Insurance
4. Air Ticketing
5. Hotel Booking
6. Safari & Holiday Packages
7. Chauffeur & Transfers
8. Events & MICE / Travel Consultancy

Will generate ~6 new editorial images in `src/assets/services/` for the services that don't already have art (passport, visa, insurance, ticketing, hotel, transfers).

### 3. Mega menu in navbar
Update `src/components/SiteNav.tsx`:
- Convert the "Services" nav item into a hover-triggered mega menu panel.
- Panel shows a 3- or 4-column grid: each column = a service with thumbnail image, title, one-line description, link.
- Glass panel styling consistent with current `glass-panel` token.
- Mobile: collapses into stacked list inside a sheet/drawer.

### 4. Update organization contacts
Update `src/routes/contact.tsx` and `src/components/SiteFooter.tsx`:
- Company: Qafri Tours & Travels Ltd.
- HQ: Nairobi, Kenya
- Website: www.qafritoursandtravels.africa
- Phone: +254 712 909 770 / +254 100 521 498
- Email: info@qafritoursandtravels.africa
- Socials: @qafri.tours (Instagram), @QafriTours (X/Twitter)
- Accreditation: IATA Accredited Agency
- Add a regulatory compliance line in footer.
- Update WhatsApp button number in `src/components/WhatsAppButton.tsx` to +254712909770.

### 5. Global smooth entrance animations
- Add `fade-in-up` keyframe + utility in `src/styles.css`.
- Create a small `<Reveal>` wrapper component using IntersectionObserver that adds the animation class when element enters viewport.
- Apply `animate-fade-in` to hero content on mount (immediate).
- Wrap major sections on Home, Safaris, Services, Contact in `<Reveal>` for on-scroll entrance.
- Respect `prefers-reduced-motion`.

### 6. Refresh "Curated Safari & Holiday Experiences" images
- Regenerate `src/assets/elephant-art.jpg` and `src/assets/camp-night.jpg` (or new files) with higher-quality editorial-style imagery: warm-light elephant portrait at golden hour, and a luxury tented camp lit at twilight with fire glow.
- Use premium image generation tier for these two hero composition images.

### Technical notes
- No backend changes; all frontend.
- Carousel uses existing embla dependency (already in `ui/carousel.tsx`).
- Mega menu implemented with Tailwind (group-hover) — no new lib.
- Reveal component is ~30 lines, uses `IntersectionObserver`, no deps.
- New image assets generated via imagegen tool, stored under `src/assets/`.
- All colors via existing semantic tokens.

### Files to be touched
- `src/routes/index.tsx` (hero, carousel, refreshed gallery)
- `src/routes/contact.tsx` (contact info)
- `src/components/SiteNav.tsx` (mega menu)
- `src/components/SiteFooter.tsx` (contacts + compliance)
- `src/components/WhatsAppButton.tsx` (phone number)
- `src/components/Reveal.tsx` (new)
- `src/styles.css` (entrance keyframes)
- new images under `src/assets/`
