import passport from "@/assets/services/passport.jpg";
import visa from "@/assets/services/visa.jpg";
import insurance from "@/assets/services/insurance.jpg";
import airticketing from "@/assets/services/airticketing.jpg";
import hotel from "@/assets/services/hotel.jpg";
import safari from "@/assets/safari-hero.jpg";
import chauffeur from "@/assets/services/chauffeur.jpg";
import events from "@/assets/services/events.jpg";

export type Service = {
  slug: string;
  title: string;
  short: string;
  long: string;
  image: string;
  included: string[];
  highlights: string[];
  process: { step: string; detail: string }[];
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
];

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
