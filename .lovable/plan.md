# Plan

## 1. Hero background carousel
Replace the single `<img>` background in the hero (`src/routes/index.tsx`, lines 36–45) with an auto-rotating carousel of all service images from `SERVICES` (`src/lib/services.ts`).

- Build a lightweight inline carousel (no shadcn dependency for the BG): a stack of absolutely-positioned `<img>` layers, one per service, cross-fading every ~5s using a state index + `setInterval` in a `useEffect`. Cleanup on unmount.
- First image: `loading="eager"` + `fetchPriority="high"` (LCP). Rest: `loading="lazy"`.
- Add a subtle dark gradient overlay so the glass-panel headline stays readable across all images.
- Add a small caption pill in the bottom-right of the hero showing the current service title (e.g. "Now showing: Helicopter Services") with a soft fade transition — ties the visual to the offering.
- Add tiny dot indicators at the bottom center, clickable to jump.
- Respect `prefers-reduced-motion`: when reduced, do not auto-rotate; show only the first image.

## 2. Remove search widget
Delete the entire "Inquiry Bar" `<Reveal>` block (lines 81–115) including the form, its `Field` usages, and — if no longer referenced anywhere else in the file — the `Field` helper component itself. Keep the negative top margin look by letting the next "Services" section's top padding handle spacing (no overlap needed once the bar is gone).

## Technical notes
- File touched: `src/routes/index.tsx` only.
- No new deps. No image generation needed (reusing existing `SERVICES[*].image`).
- Image array is small (9 entries) so no virtualization needed.
