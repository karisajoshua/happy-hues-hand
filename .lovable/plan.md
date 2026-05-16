## Goal
Make the "Request this service" form fields adapt to each service, instead of one generic form for all 9 services.

## Approach

**1. Define per-service field schemas in `src/lib/services.ts`**

Add a new optional `requestFields` property to each `Service`. Each entry describes one form field:

```ts
type RequestField = {
  name: string;             // key used in data + PDF
  label: string;
  type: "text" | "email" | "tel" | "number" | "date" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];       // for select
  colSpan?: 1 | 2;          // grid layout
};
```

Common fields (full name, phone, email) stay shared. Each service adds its own specifics. Examples:

- **Passport** — Application type (New / Renewal / Lost / Expedited), Nationality, Current passport number, Date of birth, Travel urgency date, Delivery address.
- **Visa** — Destination country, Visa type (Tourist / Business / Student / Transit), Nationality, Intended travel dates, Duration of stay, Previous visas held.
- **Travel Insurance** — Destination(s), Trip start/end dates, Number of travellers, Ages of travellers, Trip type (Single / Annual multi-trip), Activities (e.g. skiing, safari), Pre-existing conditions notes.
- **Air Ticketing** — From / To, Departure date, Return date, Cabin class (Economy / Premium / Business / First), Passengers (adults/children/infants), Preferred airline, Flexible dates yes/no.
- **Hotel Booking** — City / Destination, Check-in, Check-out, Rooms, Adults, Children, Star rating preference, Property style (Business / Boutique / Resort / Serviced apartment), Special requests.
- **Safari & Holidays** — Destinations (Kenya / Tanzania / Uganda / Rwanda / multi), Start date, Duration (nights), Travellers (adults/children), Accommodation style (Luxury lodge / Tented camp / Mid-range), Interests (wildlife, photography, beach extension), Budget per person.
- **Chauffeur & Transfers** — Service type (Airport transfer / Hourly / Multi-day / Roadshow), Pickup location, Drop-off location, Date, Time, Passengers, Luggage count, Vehicle preference (Saloon / SUV / Van).
- **Events & MICE** — Event type (Conference / Incentive / Gala / Exhibition), Preferred destination, Tentative dates, Expected delegates, Duration (days), Required services (multi-select: venue, AV, transport, accommodation), Indicative budget.
- **Helicopter** — Mission type (Transfer / Aerial safari / Scenic / Medevac), Pickup point, Destination, Date, Time, Passengers, Baggage weight estimate, Special requests.

**2. Make `ServiceRequestDialog` dynamic**

- Drop hardcoded state vars; use a single `Record<string, string | number>` state keyed by field `name`.
- Render fields from `service.requestFields` via a small switch on `type` (text/email/tel/number/date → input; textarea; select).
- Always render the shared trio (full name, phone, email) on top, then service-specific fields.
- Validation: required fields must be filled; basic email/phone trimming.
- On submit, build `ServiceRequestData` with `fullName`, `phone`, `email`, plus a `fields: { label, value }[]` array for everything else.

**3. Update `ServiceRequestData` + PDF generator (`src/lib/service-request-pdf.ts`)**

- Change `ServiceRequestData` to `{ serviceTitle, serviceShort, fullName, phone, email, fields: { label: string; value: string }[], notes?: string }`.
- Rewrite the "Traveler / Service details" section of the PDF to loop over `fields` instead of fixed keys. Keep navy/gold styling unchanged.

**4. WhatsApp summary**

- Same change: loop over `fields` to build the `Label: value` lines after the shared trio.

## Files Touched
- `src/lib/services.ts` — add `requestFields` for all 9 services.
- `src/components/ServiceRequestDialog.tsx` — dynamic field rendering.
- `src/lib/service-request-pdf.ts` — render dynamic field list in PDF + WA summary contract.

## Out of Scope
- No change to nav, footer, hero, or other pages.
- No backend / persistence changes — still PDF + WhatsApp handoff.
