import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PHONE_DISPLAY = "0969 519 5316";
const PHONE_LINK = "+639695195316";

export default function SiteChrome({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMenuOpen(false);
    const detailElements = [...document.querySelectorAll(".service-faq details")];
    const detailHandlers = detailElements.map((details) => {
      const handler = () => details.classList.toggle("is-expanded", details.open);
      details.addEventListener("toggle", handler);
      return [details, handler];
    });

    document.querySelectorAll(".article-content > h2, .service-steps, .service-note, .service-faq, .related-services, .article-sources, .service-cta-inner").forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-order", String(index % 3));
    });
    document.querySelectorAll(".blog-index-card").forEach((element, index) => {
      element.style.setProperty("--reveal-order", String(Math.min(index, 3)));
    });

    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      detailHandlers.forEach(([details, handler]) => details.removeEventListener("toggle", handler));
    };
  }, [router.asPath]);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header service-site-header isolate w-full">
        <div className="utility-bar"><div className="shell utility-inner">
          <span className="utility-hours"><strong>Available:</strong> Mon to Sat · 8:00 AM–12:00 PM · 1:00 PM–5:00 PM</span>
          <a className="utility-location" href="/#location"><span className="utility-location-desktop">2nd Floor, JSPC Arcade · Oroquieta City</span><span className="utility-location-mobile">Oroquieta City</span></a>
          <a className="utility-phone" href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a>
        </div></div>
        <nav className="shell nav" aria-label="Primary navigation">
          <a className="brand" href="/" aria-label="Horcabas Dental Clinic home"><img className="brand-logo h-auto max-w-full" src="/assets/horcabas-logo.png" alt="Horcabas Dental Clinic" width="2172" height="724" /></a>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="service-nav-links" onClick={() => setMenuOpen((open) => !open)}><span>Menu</span><i aria-hidden="true" /></button>
          <button className={`nav-scrim${menuOpen ? " is-open" : ""}`} type="button" aria-label="Close navigation menu" tabIndex="-1" onClick={() => setMenuOpen(false)} />
          <div className={`nav-links${menuOpen ? " is-open" : ""}`} id="service-nav-links">
            <div className="nav-drawer-header"><span>Menu</span><button className="nav-close" type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)}><i aria-hidden="true" /></button></div>
            <span className="nav-menu-label">Explore the clinic</span>
            <a href="/#services">Services</a><a href="/#availability">Availability</a><a href="/about/">About</a><a href="/blog/">Blog</a>
            <a className="button button-small" href={`tel:${PHONE_LINK}`}>Call to schedule</a>
          </div>
        </nav>
      </header>
      {children}
      <section className="service-cta"><div className="shell service-cta-inner flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between"><div><p>Dental care in Oroquieta City</p><h2>Ready to ask about your visit?</h2><span>Call the clinic so our secretary can help with availability.</span></div><a className="button button-light" href={`tel:${PHONE_LINK}`}>Call {PHONE_DISPLAY}</a></div></section>
      <footer className="footer"><div className="shell"><div className="footer-grid grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="footer-intro"><a className="footer-brand" href="/"><img className="footer-brand-logo" src="/assets/horcabas-logo.png" alt="Horcabas Dental Clinic" /></a><p>Gentle, personal dental care for Oroquieta City families.</p></div>
        <div><strong>Visit</strong><p>2nd Floor, JSPC Arcade<br />Lower Langcangan<br />Oroquieta City, 7207</p></div>
        <div><strong>Clinic hours</strong><p>Monday to Saturday<br />8:00 AM to 12:00 PM<br />1:00 PM to 5:00 PM</p></div>
        <div><strong>Contact</strong><p><a href={`tel:${PHONE_LINK}`}>{PHONE_DISPLAY}</a><br /><a href="https://www.facebook.com/HorcabasDentalClinic" target="_blank" rel="noopener noreferrer">Facebook</a></p></div>
      </div><div className="footer-bottom flex flex-col gap-4 md:flex-row md:justify-between"><span>© {new Date().getFullYear()} Horcabas Dental Clinic</span><span>Oroquieta City, Misamis Occidental</span></div></div></footer>
    </>
  );
}
