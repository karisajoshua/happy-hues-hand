# Contributing to Qafri

This is a project-specific repository. Coordinate changes with the repository maintainers before opening pull requests.

## Development workflow

1. Create a short-lived feature branch from `main`.
2. Make focused changes and keep secrets out of source control.
3. Run `bun install --frozen-lockfile`, `bun run build` and `bun run lint`.
4. Test affected pages and forms locally.
5. Open a pull request describing the change, testing evidence, and any production implications.
6. Merge only after review and required checks.

## SEO changes

Keep canonical URLs on `qafritoursandtravels.africa`. When service slugs change, update `public/sitemap.xml` and test the resulting routes. Do not reintroduce a dynamic `/sitemap.xml` handler.

## Security

Do not introduce vulnerable dependencies or bypass build security gates. Never commit credentials, API keys or customer information.
