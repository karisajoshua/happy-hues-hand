import passport from "@/assets/services/passport.jpg";
import visa from "@/assets/services/visa.jpg";
import insurance from "@/assets/services/insurance.jpg";
import airticketing from "@/assets/services/airticketing.jpg";
import hotel from "@/assets/services/hotel.jpg";
import safari from "@/assets/safari-hero.jpg";
import chauffeur from "@/assets/services/chauffeur.jpg";
import events from "@/assets/services/events.jpg";
import helicopter from "@/assets/services/helicopter.jpg";

export type RequestField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "date" | "textarea" | "select";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  colSpan?: 1 | 2;
};

export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  image: string;
  included: string[];
  highlights: string[];
  process: { step: string; detail: string }[];
  requestFields?: RequestField[];
};

const COMMON_NOTES: RequestField = {
  name: "notes",
  label: "Additional notes",
  type: "textarea",
  colSpan: 2,
  placeholder: "Anything else we should know",
};

const REQUEST_FIELDS: Record<string, RequestField[]> = {
  passport: [
    { name: "applicationType", label: "Application type", type: "select", required: true, options: ["New passport", "Renewal", "Lost / damaged replacement", "Expedited"] },
    { name: "nationality", label: "Nationality", type: "text", required: true },
    { name: "currentPassportNo", label: "Current passport number", type: "text" },
    { name: "dateOfBirth", label: "Date of birth", type: "date" },
    { name: "travelDate", label: "Intended travel date", type: "date" },
    { name: "deliveryAddress", label: "Delivery address", type: "text", colSpan: 2 },
    COMMON_NOTES,
  ],
  visa: [
    { name: "destinationCountry", label: "Destination country", type: "text", required: true },
    { name: "visaType", label: "Visa type", type: "select", required: true, options: ["Tourist", "Business", "Student", "Transit", "Work", "Family visit"] },
    { name: "nationality", label: "Nationality", type: "text", required: true },
    { name: "travelStart", label: "Intended travel start", type: "date" },
    { name: "travelEnd", label: "Intended travel end", type: "date" },
    { name: "duration", label: "Duration of stay", type: "text", placeholder: "e.g. 14 days" },
    { name: "previousVisas", label: "Previous visas held", type: "textarea", colSpan: 2 },
    COMMON_NOTES,
  ],
  insurance: [
    { name: "destination", label: "Destination(s)", type: "text", required: true },
    { name: "tripStart", label: "Trip start date", type: "date", required: true },
    { name: "tripEnd", label: "Trip end date", type: "date", required: true },
    { name: "travellers", label: "Number of travellers", type: "number", required: true },
    { name: "ages", label: "Ages of travellers", type: "text", placeholder: "e.g. 34, 36, 8" },
    { name: "planType", label: "Plan type", type: "select", options: ["Single trip", "Annual multi-trip", "Schengen-compliant"] },
    { name: "activities", label: "Planned activities", type: "text", placeholder: "e.g. safari, diving, skiing" },
    { name: "medical", label: "Pre-existing medical conditions", type: "textarea", colSpan: 2 },
    COMMON_NOTES,
  ],
  airticketing: [
    { name: "from", label: "From (city / airport)", type: "text", required: true },
    { name: "to", label: "To (city / airport)", type: "text", required: true },
    { name: "departDate", label: "Departure date", type: "date", required: true },
    { name: "returnDate", label: "Return date", type: "date" },
    { name: "cabin", label: "Cabin class", type: "select", required: true, options: ["Economy", "Premium economy", "Business", "First"] },
    { name: "adults", label: "Adults", type: "number", required: true },
    { name: "children", label: "Children", type: "number" },
    { name: "infants", label: "Infants", type: "number" },
    { name: "preferredAirline", label: "Preferred airline", type: "text" },
    { name: "flexibility", label: "Date flexibility", type: "select", options: ["Fixed dates", "± 1 day", "± 3 days", "Flexible"] },
    COMMON_NOTES,
  ],
  hotel: [
    { name: "city", label: "City / destination", type: "text", required: true },
    { name: "checkIn", label: "Check-in", type: "date", required: true },
    { name: "checkOut", label: "Check-out", type: "date", required: true },
    { name: "rooms", label: "Rooms", type: "number", required: true },
    { name: "adults", label: "Adults", type: "number", required: true },
    { name: "children", label: "Children", type: "number" },
    { name: "starRating", label: "Star rating preference", type: "select", options: ["3-star", "4-star", "5-star", "Luxury / boutique"] },
    { name: "propertyStyle", label: "Property style", type: "select", options: ["Business hotel", "Boutique", "Resort", "Serviced apartment", "Villa"] },
    { name: "specialRequests", label: "Special requests", type: "textarea", colSpan: 2 },
    COMMON_NOTES,
  ],
  safari: [
    { name: "destinations", label: "Destinations of interest", type: "text", required: true, placeholder: "Kenya, Tanzania, Uganda, Rwanda…" },
    { name: "startDate", label: "Start date", type: "date", required: true },
    { name: "nights", label: "Duration (nights)", type: "number", required: true },
    { name: "adults", label: "Adults", type: "number", required: true },
    { name: "children", label: "Children", type: "number" },
    { name: "accommodation", label: "Accommodation style", type: "select", options: ["Luxury lodge", "Tented camp", "Mobile expedition", "Mid-range"] },
    { name: "interests", label: "Interests", type: "text", placeholder: "Wildlife, photography, beach extension…" },
    { name: "budget", label: "Indicative budget per person", type: "text", placeholder: "e.g. USD 3,500" },
    COMMON_NOTES,
  ],
  chauffeur: [
    { name: "serviceType", label: "Service type", type: "select", required: true, options: ["Airport transfer", "Hourly hire", "Multi-day", "Roadshow", "Wedding / event"] },
    { name: "pickup", label: "Pickup location", type: "text", required: true },
    { name: "dropoff", label: "Drop-off location", type: "text", required: true },
    { name: "date", label: "Date", type: "date", required: true },
    { name: "time", label: "Pickup time", type: "text", placeholder: "e.g. 14:30", required: true },
    { name: "passengers", label: "Passengers", type: "number", required: true },
    { name: "luggage", label: "Luggage pieces", type: "number" },
    { name: "vehicle", label: "Vehicle preference", type: "select", options: ["Executive saloon", "SUV", "Van", "Minibus"] },
    COMMON_NOTES,
  ],
  events: [
    { name: "eventType", label: "Event type", type: "select", required: true, options: ["Conference", "Incentive trip", "Gala dinner", "Exhibition", "Corporate retreat"] },
    { name: "destination", label: "Preferred destination", type: "text", required: true },
    { name: "startDate", label: "Tentative start date", type: "date" },
    { name: "endDate", label: "Tentative end date", type: "date" },
    { name: "delegates", label: "Expected delegates", type: "number", required: true },
    { name: "duration", label: "Duration (days)", type: "number" },
    { name: "services", label: "Required services", type: "text", placeholder: "Venue, AV, transport, accommodation…", colSpan: 2 },
    { name: "budget", label: "Indicative budget", type: "text", placeholder: "e.g. USD 50,000" },
    COMMON_NOTES,
  ],
  helicopter: [
    { name: "missionType", label: "Mission type", type: "select", required: true, options: ["Private transfer", "Aerial safari", "Scenic flight", "Medevac standby"] },
    { name: "pickup", label: "Pickup point", type: "text", required: true },
    { name: "destination", label: "Destination", type: "text", required: true },
    { name: "date", label: "Date", type: "date", required: true },
    { name: "time", label: "Time", type: "text", placeholder: "e.g. 09:00", required: true },
    { name: "passengers", label: "Passengers", type: "number", required: true },
    { name: "baggageKg", label: "Estimated baggage (kg)", type: "number" },
    { name: "specialRequests", label: "Special requests", type: "textarea", colSpan: 2 },
    COMMON_NOTES,
  ],
};

export const SERVICES: Service[] = [
  {
    slug: "passport",
    title: "Passport Services",
    short: "Application, renewal & expediting.",
    long: "End-to-end passport application, renewal, and expediting with embassy-grade documentation support.",
    image: passport,
    included: [
      "New passport application & biometric scheduling",
      "Renewal and lost-passport replacement",
      "Expedited processing for urgent travel",
      "Document review and consular liaison",
      "Courier delivery on completion",
    ],
    highlights: [
      "Direct relationships with immigration desks",
      "Same-day appointment slots when available",
      "Status tracking from submission to issuance",
    ],
    process: [
      { step: "Eligibility check", detail: "We confirm prerequisites and required supporting documents." },
      { step: "Document prep", detail: "Forms completed, photos verified to ICAO standard, fees scheduled." },
      { step: "Submission", detail: "Filed with the issuing authority, biometrics booked." },
      { step: "Delivery", detail: "Courier handover or in-office collection." },
    ],
  },
  {
    slug: "visa",
    title: "Visa Services",
    short: "Global visa processing & compliance.",
    long: "Schengen, US, UK, UAE and African destinations — handled with precision and document compliance.",
    image: visa,
    included: [
      "Schengen, UK, US, Canada, UAE, China & African e-visas",
      "Cover letters, itineraries and financial documentation",
      "Embassy appointment booking",
      "Multiple-entry and long-stay visas",
      "Group and corporate processing",
    ],
    highlights: [
      "High approval rate via vetted documentation",
      "Pre-screening to flag risk before submission",
      "Express turnaround for business travelers",
    ],
    process: [
      { step: "Consultation", detail: "Pick the visa class that matches your travel intent." },
      { step: "Documentation", detail: "We compile, translate and notarize where required." },
      { step: "Lodgement", detail: "Filed at the consulate or visa application centre." },
      { step: "Collection", detail: "Visa retrieved and delivered to you." },
    ],
  },
  {
    slug: "insurance",
    title: "Travel Insurance",
    short: "Comprehensive cross-border cover.",
    long: "Medical, trip-cancellation, and luggage protection from leading global underwriters.",
    image: insurance,
    included: [
      "International medical cover up to USD 1M",
      "Trip cancellation, interruption & delay",
      "Lost luggage and travel document replacement",
      "Emergency evacuation and repatriation",
      "Schengen-compliant policies",
    ],
    highlights: [
      "Underwritten by global A-rated insurers",
      "24/7 multilingual claims support",
      "Annual multi-trip plans for frequent flyers",
    ],
    process: [
      { step: "Risk profile", detail: "Destination, age, activities and trip length." },
      { step: "Plan match", detail: "Quotes from preferred underwriters." },
      { step: "Issuance", detail: "Digital policy delivered within minutes." },
      { step: "Claim support", detail: "Hands-on assistance if anything goes wrong." },
    ],
  },
  {
    slug: "airticketing",
    title: "Air Ticketing",
    short: "IATA-accredited fare optimization.",
    long: "Global GDS networks, corporate negotiated rates, premium cabin specialists.",
    image: airticketing,
    included: [
      "Domestic, regional & intercontinental flights",
      "Premium cabin and award-seat sourcing",
      "Corporate negotiated and contracted fares",
      "Group bookings and charter arrangements",
      "Reissue, refund and disruption management",
    ],
    highlights: [
      "IATA Accredited Agency",
      "Multiple GDS access for the best routings",
      "24/7 ticketing desk",
    ],
    process: [
      { step: "Brief", detail: "Routing, dates, cabin and budget." },
      { step: "Quote", detail: "Side-by-side options with fare rules explained." },
      { step: "Ticket", detail: "Confirmed in your name, e-ticket sent." },
      { step: "Aftercare", detail: "Schedule changes and disruption handled for you." },
    ],
  },
  {
    slug: "hotel",
    title: "Hotel Booking",
    short: "Curated luxury & business stays.",
    long: "From corporate skyscrapers to secluded boutique villas — preferred-rate partners worldwide.",
    image: hotel,
    included: [
      "Worldwide hotel and serviced apartment bookings",
      "Preferred and negotiated corporate rates",
      "Boutique lodges and luxury villas",
      "Group room blocks and conference housing",
      "Loyalty programme integration",
    ],
    highlights: [
      "Direct chain partnerships for upgrades",
      "On-arrival amenities for VIP guests",
      "Best-rate guarantee through preferred suppliers",
    ],
    process: [
      { step: "Profile", detail: "Brand, location, budget and preferences." },
      { step: "Curate", detail: "Shortlist with photos, perks and total cost." },
      { step: "Reserve", detail: "Confirmed booking with vouchers." },
      { step: "On-trip", detail: "We coordinate with the hotel for any changes." },
    ],
  },
  {
    slug: "safari",
    title: "Safari & Holidays",
    short: "Bespoke African journeys.",
    long: "Tailored safari and holiday packages across Kenya, Tanzania, Uganda, Rwanda and beyond.",
    image: safari,
    included: [
      "Mara, Serengeti, Bwindi, Volcanoes & Etosha itineraries",
      "Beach extensions: Diani, Zanzibar, Seychelles, Mauritius",
      "Park fees, transfers and licensed guides",
      "Lodges, tented camps and mobile expeditions",
      "Private and small-group departures",
    ],
    highlights: [
      "Operated with vetted ground partners",
      "Conservation-aligned camps and lodges",
      "Photographer- and family-friendly options",
    ],
    process: [
      { step: "Discovery", detail: "Pace, interests and travel style." },
      { step: "Design", detail: "Day-by-day itinerary with maps and pricing." },
      { step: "Confirm", detail: "Bookings locked, briefing pack issued." },
      { step: "On-safari", detail: "24/7 ground support during travel." },
    ],
  },
  {
    slug: "chauffeur",
    title: "Chauffeur & Transfers",
    short: "Premium ground logistics.",
    long: "Door-to-door luxury transfers, executive chauffeurs, and multi-city transport.",
    image: chauffeur,
    included: [
      "Airport meet-and-greet transfers",
      "Executive saloon, SUV and van fleet",
      "Multi-city and roadshow logistics",
      "Wedding and events transport",
      "Cross-border transfers (KE/TZ/UG/RW)",
    ],
    highlights: [
      "Vetted, English-speaking chauffeurs",
      "Newer-fleet vehicles, fully insured",
      "Live flight tracking for arrivals",
    ],
    process: [
      { step: "Booking", detail: "Share flights and route." },
      { step: "Dispatch", detail: "Vehicle and driver assigned in advance." },
      { step: "Transfer", detail: "Door-to-door, on time, every time." },
    ],
  },
  {
    slug: "events",
    title: "Events & MICE",
    short: "Meetings, incentives, conferences.",
    long: "Strategic planning for meetings, incentives, conferences and exhibitions across Africa.",
    image: events,
    included: [
      "Venue sourcing and contracting",
      "Delegate travel, visas and accommodation",
      "On-site event coordination",
      "Production, AV and branding",
      "Incentive trips and gala dinners",
    ],
    highlights: [
      "End-to-end accountability for delegate journeys",
      "Africa-wide supplier network",
      "Detailed cost reporting and reconciliation",
    ],
    process: [
      { step: "Brief", detail: "Objectives, audience, format and budget." },
      { step: "Proposal", detail: "Venues, programme and budget options." },
      { step: "Manage", detail: "Bookings, comms and delegate logistics." },
      { step: "Deliver", detail: "On-site team executing the event." },
    ],
  },
  {
    slug: "helicopter",
    title: "Helicopter Services",
    short: "Private rotor charters & scenic flights.",
    long: "Private helicopter charters, aerial safaris, and executive transfers across East Africa — from city skylines to the Maasai Mara, Kilimanjaro and the coast.",
    image: helicopter,
    included: [
      "Private executive transfers (city, lodge, airstrip)",
      "Aerial safaris over the Mara, Amboseli & Naivasha",
      "Scenic flights along Mount Kenya & Kilimanjaro",
      "Coastal hops to Diani, Lamu and Zanzibar",
      "Medical evacuation and emergency standby",
    ],
    highlights: [
      "Twin-engine, IFR-rated fleet with veteran pilots",
      "Private helipads at premier lodges and hotels",
      "Bespoke routings with on-board concierge",
    ],
    process: [
      { step: "Mission brief", detail: "Route, passengers, baggage and timing." },
      { step: "Aircraft match", detail: "Right helicopter for the payload and terrain." },
      { step: "Clearances", detail: "Permits, landing rights and weather windows secured." },
      { step: "Fly", detail: "Meet-and-greet, in-flight comfort, smooth handover." },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
