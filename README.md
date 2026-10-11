# Qafri Tours & Travels

Official website source for **Qafri Tours & Travels**.

**Production website:** https://qafritoursandtravels.africa  
**Repository:** https://github.com/karisajoshua/happy-hues-hand

> Production readiness is not established by a successful commit alone. Verify the deployed commit, build, routes, forms, metadata and sitemap before declaring a release complete.

## What this project provides

A travel-services website covering passport assistance, visas, travel insurance, air ticketing, hotels, safari planning, chauffeur services, events and helicopter services. Service definitions and request fields live in `src/lib/services.ts`; individual service pages use `src/routes/services.$slug.tsx`.

## Technology

- React 19, TypeScript and TanStack Router / TanStack Start
- Vite build tooling and Bun dependency management
- Tailwind CSS
- Hosting/deployment configuration: inspect the actual connected production provider and domain settings before deploying

## Getting started

Install [Bun](https://bun.sh/) and use the repository root:

```bash
bun install --frozen-lockfile
bun run dev
```

For code validation:

```bash
bun run build
bun run lint
```

These commands should run successfully before merging or deploying changes. The GitHub Actions workflow in `.github/workflows/validate-code.yml` runs install, security version verification, build and lint.

## Project map

| Path | Purpose |
| --- | --- |
| `src/routes/` | Page routes and SEO head definitions |
| `src/routes/services.$slug.tsx` | Dynamic service pages and canonical links |
| `src/lib/services.ts` | Service catalog and request form configuration |
| `src/components/` | Shared UI components |
| `public/sitemap.xml` | Canonical sitemap (static public asset) |
| `public/robots.txt` | Crawl directives and sitemap location |
| `vite.config.ts` | Build configuration |
| `.github/workflows/validate-code.yml` | CI validation |

## SEO and indexing

The canonical host is `https://qafritoursandtravels.africa`. Each dynamic service page must emit a canonical URL based on its actual service slug. The sitemap is a **static file** at `public/sitemap.xml`; do not add a second route that handles `/sitemap.xml`.

Before submitting to Google Search Console, check:

1. `https://qafritoursandtravels.africa/sitemap.xml` returns HTTP 200 and valid XML.
2. Every `<loc>` uses the production host; no `happy-hues-hand.lovable.app` references remain.
3. All listed service routes exist and are indexable.
4. `https://qafritoursandtravels.africa/robots.txt` links to the same sitemap.
5. Google Search Console reports a successful sitemap fetch after submission.

When adding a service to `src/lib/services.ts`, update the static sitemap as well.

## Security

TanStack Start must remain at **1.168.60 or later** to avoid the previously reported CVE-2026-102989 issue. Do not set `DANGEROUSLY_DEPLOY_VULNERABLE_TANSTACK_START_XSS=1` as a workaround. Run dependency review and CI after upgrades.

Do not commit credentials, tokens, personal customer information or environment secrets. Store provider secrets in the relevant hosting environment.

## Deployment

The production branch should be `main` if that is the configured production workflow. **Confirm the actual production branch and connected domain in the hosting dashboard**; do not assume that a successful preview deployment updated production.

After deployment, compare the deployed commit SHA to the latest intended `main` commit. A deployment of historical commit `124fbc9` contains an outdated TanStack Start dependency and must not be used.

See [deployment and verification](docs/DEPLOYMENT.md) and [SEO operations](docs/SEO.md).

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Deployment and troubleshooting](docs/DEPLOYMENT.md)
- [SEO and sitemap](docs/SEO.md)
- [Contributing](CONTRIBUTING.md)

## Ownership and licensing

This repository is maintained for Qafri Tours & Travels. No open-source license has been granted in this repository. Contact the repository owner before redistributing or reusing proprietary assets.
