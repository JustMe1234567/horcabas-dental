import Head from "next/head";
import { useEffect } from "react";

const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": "https://horcabasdental.vercel.app/#clinic",
  name: "Horcabas Dental Clinic",
  url: "https://horcabasdental.vercel.app/",
  telephone: "+63 969 519 5316",
  description: "A dental clinic in Oroquieta City providing family, preventive, cosmetic, and restorative dental care.",
  address: { "@type": "PostalAddress", streetAddress: "2nd Floor, JSPC Arcade, Lower Langcangan", addressLocality: "Oroquieta City", addressRegion: "Misamis Occidental", postalCode: "7207", addressCountry: "PH" },
  geo: { "@type": "GeoCoordinates", latitude: 8.481573822931571, longitude: 123.80389927008653 },
  areaServed: { "@type": "City", name: "Oroquieta City" },
  sameAs: ["https://www.facebook.com/HorcabasDentalClinic"],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "08:00", closes: "12:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "13:00", closes: "17:00" }
  ]
};

export default function HomePage() {
  useEffect(() => { import("../src/main.js"); }, []);
  return (
    <>
      <Head>
        <title>Dental Clinic in Oroquieta City | Horcabas Dental Clinic</title>
        <meta name="description" content="Visit Horcabas Dental Clinic in Oroquieta City for gentle family, preventive, cosmetic, and restorative dental care. Check availability and call today." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://horcabasdental.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_PH" />
        <meta property="og:site_name" content="Horcabas Dental Clinic" />
        <meta property="og:title" content="Dental Clinic in Oroquieta City | Horcabas Dental Clinic" />
        <meta property="og:description" content="Gentle family, preventive, cosmetic, and restorative dental care in Oroquieta City, Misamis Occidental." />
        <meta property="og:url" content="https://horcabasdental.vercel.app/" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }} />
      </Head>
      <a className="skip-link" href="#main">Skip to content</a>
      <div id="app" />
    </>
  );
}
