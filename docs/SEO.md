# SEO operations

**Canonical origin:** `https://qafritoursandtravels.africa`

## Source of truth

- `public/sitemap.xml`: static XML sitemap
- `public/robots.txt`: crawler rules and sitemap reference
- `src/routes/services.$slug.tsx`: dynamic service canonical links and social metadata
- Other files in `src/routes/`: page-specific metadata

## Expected sitemap URLs

- `/`
- `/safaris`
- `/services`
- `/contact`
- `/services/passport`
- `/services/visa`
- `/services/insurance`
- `/services/airticketing`
- `/services/hotel`
- `/services/safari`
- `/services/chauffeur`
- `/services/events`
- `/services/helicopter`

## Release checklist

- [ ] Sitemap responds with HTTP 200 and valid XML
- [ ] All 13 expected URLs are present
- [ ] No preview or Lovable domain in sitemap URLs
- [ ] Canonical URLs resolve to the corresponding production page
- [ ] Robots file references the correct sitemap
- [ ] No duplicate sitemap route
- [ ] Mobile and desktop metadata reviewed
- [ ] Google Search Console reports sitemap read successfully

If the live sitemap differs from the repository file, investigate deployment commit, domain mapping and caching before changing XML content.
