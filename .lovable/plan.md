## Plan

I found the issue: the detail route exists, but `/services` is currently a parent route with child route `/services/$slug`; because the parent page does not render an `<Outlet />`, clicking a service can update/match the route while still showing the same services page.

### What I will change

1. **Make service detail pages render correctly**
   - Adjust the services route structure so `/services/passport`, `/services/visa`, `/services/insurance`, etc. render the detail page instead of staying visually on `/services`.

2. **Keep each service card clickable**
   - Ensure every service card uses TanStack Router’s dynamic route format:
   ```tsx
   <Link to="/services/$slug" params={{ slug: service.slug }}>
   ```

3. **Preserve the current services listing page**
   - `/services` will still show all service cards.
   - Each card click will take the user to the matching detailed service page.

4. **Verify navigation behavior**
   - Confirm clicking a service card changes the URL and renders the correct title/content for that service.

### Technical detail

The likely fix is to make `src/routes/services.tsx` render an `<Outlet />` when a child route is active, or restructure the detail route so it is not trapped under a parent route without an outlet. I’ll use the least invasive option that preserves the existing design and route URLs.