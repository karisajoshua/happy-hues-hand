import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Mail, Phone } from "lucide-react";
import logo from "@/assets/qafri-logo.png";

export function SiteFooter() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/30 mt-24">
      <div className="container-max py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-6">
          <img
            src={logo}
            alt="Qafri Tours & Travels"
            className="h-14 w-auto"
            width={280}
            height={112}
          />
          <p className="text-on-surface-variant max-w-xs text-sm">
            Elevating the standards of global exploration through corporate
            precision and an artistic soul.
          </p>
          <p className="text-[10px] tracking-[0.15em] uppercase text-primary font-semibold">
            IATA Accredited Agency
          </p>
        </div>

        <FooterCol
          title="Explore"
          items={[
            { label: "Safaris", to: "/safaris" },
            { label: "Services", to: "/services" },
            { label: "Contact", to: "/contact" },
          ]}
        />

        <div className="space-y-4">
          <h3 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-primary">
            Contact
          </h3>
          <ul className="space-y-3 text-sm text-on-surface-variant">
            <li>Headquarters: Nairobi, Kenya</li>
            <li>
              <a href="tel:+254712909770" className="hover:text-primary transition-colors">
                +254 712 909 770
              </a>
            </li>
            <li>
              <a href="tel:+254100521498" className="hover:text-primary transition-colors">
                +254 100 521 498
              </a>
            </li>
            <li>
              <a
                href="mailto:info@qafritoursandtravels.africa"
                className="hover:text-primary transition-colors break-all"
              >
                info@qafritoursandtravels.africa
              </a>
            </li>
            <li>
              <a
                href="https://www.qafritoursandtravels.africa"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                qafritoursandtravels.africa
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-primary">
            Social
          </h3>
          <ul className="space-y-3 text-sm text-on-surface-variant">
            <li>
              <a
                href="https://instagram.com/qafri.tours"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                Instagram · @qafri.tours
              </a>
            </li>
            <li>
              <a
                href="https://x.com/QafriTours"
                target="_blank"
                rel="noreferrer"
                className="hover:text-primary transition-colors"
              >
                X / Twitter · @QafriTours
              </a>
            </li>
          </ul>
          <p className="text-xs text-on-surface-variant pt-2 border-t border-outline-variant/30">
            Fully compliant with all applicable travel industry regulations.
          </p>
        </div>
      </div>
      <div className="container-max border-t border-outline-variant/20 py-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-[10px] tracking-[0.15em] uppercase text-on-surface-variant">
          © 2024 Qafri Tours & Travels Ltd. All rights reserved.
        </p>
        <p className="text-[10px] tracking-[0.15em] uppercase text-on-surface-variant">
          Crafted for the global explorer
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; to: string }[];
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-[12px] font-semibold tracking-[0.15em] uppercase text-primary">
        {title}
      </h3>
      <nav className="flex flex-col gap-3">
        {items.map((i) => (
          <Link
            key={i.label}
            to={i.to}
            className="text-on-surface-variant hover:text-primary text-sm transition-colors"
          >
            {i.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
