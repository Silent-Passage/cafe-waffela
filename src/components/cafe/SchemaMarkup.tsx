export function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: "Cafe Waffela",
    "@id": "https://cafewaffela.at",
    url: "https://cafewaffela.at",
    telephone: "+43 660 000 0000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Maria-Theresien-Straße 12",
      addressLocality: "Lustenau",
      postalCode: "6890",
      addressRegion: "Vorarlberg",
      addressCountry: "AT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.4338908,
      longitude: 9.6200251,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    servesCuisine: "Waffles, Coffee, Breakfast",
    priceRange: "$$",
    sameAs: ["https://www.instagram.com/waffela_lustenau/"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
