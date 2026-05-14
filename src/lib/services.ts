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
};

export const SERVICES: Service[] = [
  {
    slug: "passport",
    title: "Passport Services",
    short: "Application, renewal & expediting.",
    long: "End-to-end passport application, renewal, and expediting with embassy-grade documentation support.",
    image: passport,
  },
  {
    slug: "visa",
    title: "Visa Services",
    short: "Global visa processing & compliance.",
    long: "Schengen, US, UK, UAE and African destinations — handled with precision and document compliance.",
    image: visa,
  },
  {
    slug: "insurance",
    title: "Travel Insurance",
    short: "Comprehensive cross-border cover.",
    long: "Medical, trip-cancellation, and luggage protection from leading global underwriters.",
    image: insurance,
  },
  {
    slug: "airticketing",
    title: "Air Ticketing",
    short: "IATA-accredited fare optimization.",
    long: "Global GDS networks, corporate negotiated rates, premium cabin specialists.",
    image: airticketing,
  },
  {
    slug: "hotel",
    title: "Hotel Booking",
    short: "Curated luxury & business stays.",
    long: "From corporate skyscrapers to secluded boutique villas — preferred-rate partners worldwide.",
    image: hotel,
  },
  {
    slug: "safari",
    title: "Safari & Holidays",
    short: "Bespoke African journeys.",
    long: "Tailored safari and holiday packages across Kenya, Tanzania, Uganda, Rwanda and beyond.",
    image: safari,
  },
  {
    slug: "chauffeur",
    title: "Chauffeur & Transfers",
    short: "Premium ground logistics.",
    long: "Door-to-door luxury transfers, executive chauffeurs, and multi-city transport.",
    image: chauffeur,
  },
  {
    slug: "events",
    title: "Events & MICE",
    short: "Meetings, incentives, conferences.",
    long: "Strategic planning for meetings, incentives, conferences and exhibitions across Africa.",
    image: events,
  },
];
