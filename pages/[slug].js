import fs from "node:fs";
import path from "node:path";
import Head from "next/head";
import SiteChrome from "../components/SiteChrome.js";

const slugs = [
  "about",
  "blog",
  "dental-checkup-cleaning-oroquieta-city",
  "dental-fillings-oroquieta-city",
  "family-dentist-oroquieta-city",
  "cosmetic-dentistry-oroquieta-city",
  "crowns-bridges-oroquieta-city"
];

function matchContent(html, expression, fallback = "") {
  return html.match(expression)?.[1] || fallback;
}

export async function getStaticPaths() {
  return { paths: slugs.map((slug) => ({ params: { slug } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const file = path.join(process.cwd(), "content", "pages", `${params.slug}.html`);
  const html = fs.readFileSync(file, "utf8");
  const main = html.match(/<main[\s\S]*?<\/main>/i)?.[0];
  if (!main) throw new Error(`Missing main content for ${params.slug}`);
  return {
    props: {
      title: matchContent(html, /<title>(.*?)<\/title>/i),
      description: matchContent(html, /<meta name="description" content="(.*?)">/i),
      canonical: matchContent(html, /<link rel="canonical" href="(.*?)">/i),
      ogType: matchContent(html, /<meta property="og:type" content="(.*?)">/i, "website"),
      ogTitle: matchContent(html, /<meta property="og:title" content="(.*?)">/i),
      ogDescription: matchContent(html, /<meta property="og:description" content="(.*?)">/i),
      ogImage: matchContent(html, /<meta property="og:image" content="(.*?)">/i),
      schema: matchContent(html, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/i),
      main
    }
  };
}

export default function ContentPage({ title, description, canonical, ogType, ogTitle, ogDescription, ogImage, schema, main }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content={ogType} />
        <meta property="og:site_name" content="Horcabas Dental Clinic" />
        <meta property="og:title" content={ogTitle || title} />
        <meta property="og:description" content={ogDescription || description} />
        <meta property="og:url" content={canonical} />
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}
        {schema ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schema }} /> : null}
      </Head>
      <SiteChrome><div dangerouslySetInnerHTML={{ __html: main }} /></SiteChrome>
    </>
  );
}
