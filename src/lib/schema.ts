export const SITE_URL = "https://car1.by";

export const ORG = {
  name: "Car1.by",
  legalName: "Car1.by",
  email: "car1prokat@gmail.com",
  telephone: "+375 25 780-88-08",
  streetAddress: "ул. Шоссейная, 16, офис 202",
  addressLocality: "Брест",
  addressCountry: "BY",
  priceRange: "60–200 BYN",
  sameAs: [
    "https://api.whatsapp.com/send/?phone=375257808808",
    "https://t.me/Car4_brest",
    "https://www.instagram.com/car4.by/",
  ],
} as const;

export const autoRentalSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRental",
  "@id": `${SITE_URL}/#organization`,
  name: ORG.name,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/logo.svg`,
  logo: `${SITE_URL}/logo.svg`,
  email: ORG.email,
  telephone: ORG.telephone,
  priceRange: ORG.priceRange,
  currenciesAccepted: "BYN",
  areaServed: { "@type": "City", name: "Брест" },
  address: {
    "@type": "PostalAddress",
    streetAddress: ORG.streetAddress,
    addressLocality: ORG.addressLocality,
    addressCountry: ORG.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 52.109929,
    longitude: 23.716485,
  },
  hasMap: "https://yandex.ru/maps/?ll=23.716485,52.109929&z=17",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: ORG.telephone,
    contactType: "customer service",
    areaServed: "BY",
    availableLanguage: ["Russian", "English"],
  },
  sameAs: ORG.sameAs,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "276",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: ORG.name,
  alternateName: ["Car1", "Прокат авто Car1.by"],
  url: `${SITE_URL}/`,
  inLanguage: "ru",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export const globalSchema = [websiteSchema, autoRentalSchema];

type FaqItem = { ask?: string; asnwer?: string; answer?: string };

export function faqSchema(items: FaqItem[] = []) {
  const mainEntity = items
    .map((i) => ({ q: (i.ask || "").trim(), a: (i.answer || i.asnwer || "").trim() }))
    .filter((i) => i.q && i.a)
    .map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    }));

  if (!mainEntity.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity,
  };
}
