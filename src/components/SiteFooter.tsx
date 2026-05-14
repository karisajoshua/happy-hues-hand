import { Link } from "@tanstack/react-router";
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
        </div>
        <FooterCol
          title="Explore"
          items={[
            { label: "Safaris", to: "/safaris" },
            { label: "Services", to: "/services" },
            { label: "Contact", to: "/contact" },
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { label: "About", to: "/" },
            { label: "Sustainability", to: "/" },
            { label: "Careers", to: "/" },
          ]}
        />
        <FooterCol
          title="Legal"
          items={[
            { label: "Privacy Policy", to: "/" },
            { label: "Terms of Service", to: "/" },
          ]}
        />
      </div>
      <div className="container-max border-t border-outline-variant/20 py-6 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-[10px] tracking-[0.15em] uppercase text-on-surface-variant">
          © 2024 Qafri Tours. All rights reserved.
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
