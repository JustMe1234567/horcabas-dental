import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en-PH">
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
        <meta name="theme-color" content="#f7f9ff" />
      </Head>
      <body className="bg-clinic-surface text-clinic-ink antialiased"><Main /><NextScript /></body>
    </Html>
  );
}
