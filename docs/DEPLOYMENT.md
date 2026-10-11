# Deployment and release verification

## Preflight

1. Check out the intended release commit on `main`.
2. Run `bun install --frozen-lockfile`.
3. Run `bun run build` and `bun run lint`.
4. Review GitHub Actions checks and resolve failures.
5. Confirm the hosting project, production branch and production domain.

## Deployment verification

In the hosting dashboard, verify that the **Production** deployment references the intended `main` commit. A Preview deployment on `fix/qafri-production-seo` or old commit `124fbc9` does not update production.

Verify manually:

- Homepage, safaris, services and contact pages render.
- All nine individual service routes load.
- Navigation, mobile layout, service request dialog and form submission behave as expected. Use a test submission and verify its actual destination; rendering alone is not sufficient.
- Canonical tags, page titles and descriptions reflect the current domain.
- `/robots.txt` and `/sitemap.xml` return HTTP 200.
- The sitemap contains only `qafritoursandtravels.africa` URLs and has all expected entries.

## Diagnosing the old Lovable sitemap

If `/sitemap.xml` still shows `happy-hues-hand.lovable.app`:

1. Compare the deployed SHA with the latest `main` SHA.
2. Verify the custom domain points to the project that deployed that SHA.
3. Verify the production branch is `main`.
4. Inspect the production response, not only a preview URL.
5. Check for stale edge/CDN cache **after** confirming the correct deployment and domain mapping.
6. Recheck `/sitemap.xml` in a private browser window and inspect response headers.

Do not bypass the TanStack security vulnerability using `DANGEROUSLY_DEPLOY_VULNERABLE_TANSTACK_START_XSS=1`.

## Google Search Console

Submit `https://qafritoursandtravels.africa/sitemap.xml` only after it returns valid, current XML from production. Then monitor the sitemap report for fetch errors and indexing results. Submission does not guarantee indexing.
