interface SchemaMarkupProps {
  settings?: any;
  openingHours?: any[];
}

export function SchemaMarkup({ settings, openingHours }: SchemaMarkupProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: settings?.siteName || "Cafe Waffela",
    url: "https://cafewaffela.at",
    telephone: settings?.phone || "",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings?.address || "Maria-Theresien-Straße 12",
      addressLocality: "Lustenau",
      postalCode: "6890",
      addressCountry: "AT",
    },
    // HIER IST DER FIX:
    openingHoursSpecification:
      openingHours?.map((h) => {
        // Wir prüfen, ob h.hours existiert, bevor wir split() nutzen
        const times = h.hours?.includes("-")
          ? h.hours.split("-")
          : ["09:00", "18:00"];

        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: h.day,
          opens: times[0]?.trim() || "09:00",
          closes: times[1]?.trim() || "18:00",
        };
      }) || [],
    sameAs: [
      `https://www.instagram.com/${settings?.instagramHandle?.replace("@", "") || "waffela_lustenau"}/`,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
