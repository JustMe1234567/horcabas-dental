import "@fontsource-variable/dm-sans";
import "@fontsource-variable/outfit";
import "./styles.css";
import "./service-page.css";
import clinicLogo from "../assets/horcabas-logo.png";

const PHONE_DISPLAY = "0969 519 5316";
const PHONE_LINK = "+639695195316";

document.querySelector("#service-header").innerHTML = `
  <header class="site-header service-site-header">
    <div class="utility-bar"><div class="shell utility-inner">
      <span class="utility-hours"><strong>Available:</strong> Mon to Sat · 8:00 AM–12:00 PM · 1:00 PM–5:00 PM</span>
      <a class="utility-location" href="/#location"><span class="utility-location-desktop">2nd Floor, JSPC Arcade · Oroquieta City</span><span class="utility-location-mobile">Oroquieta City</span></a>
      <a class="utility-phone" href="tel:${PHONE_LINK}">${PHONE_DISPLAY}</a>
    </div></div>
    <nav class="shell nav" aria-label="Primary navigation">
      <a class="brand" href="/" aria-label="Horcabas Dental Clinic home"><img class="brand-logo" src="${clinicLogo}" alt="Horcabas Dental Clinic" width="2172" height="724"></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="service-nav-links"><span>Menu</span><i aria-hidden="true"></i></button>
      <button class="nav-scrim" type="button" aria-label="Close navigation menu" tabindex="-1"></button>
      <div class="nav-links" id="service-nav-links">
        <div class="nav-drawer-header"><span>Menu</span><button class="nav-close" type="button" aria-label="Close navigation menu"><i aria-hidden="true"></i></button></div>
        <span class="nav-menu-label">Explore the clinic</span>
        <a href="/#services">Services</a><a href="/#availability">Availability</a><a href="/about/">About</a><a href="/blog/">Blog</a>
        <a class="button button-small" href="tel:${PHONE_LINK}">Call to schedule</a>
      </div>
    </nav>
  </header>`;

document.querySelector("#service-footer").innerHTML = `
  <section class="service-cta"><div class="shell service-cta-inner"><div><p>Dental care in Oroquieta City</p><h2>Ready to ask about your visit?</h2><span>Call the clinic so our secretary can help with availability.</span></div><a class="button button-light" href="tel:${PHONE_LINK}">Call ${PHONE_DISPLAY}</a></div></section>
  <footer class="footer"><div class="shell"><div class="footer-grid">
    <div class="footer-intro"><a class="footer-brand" href="/"><img class="footer-brand-logo" src="${clinicLogo}" alt="Horcabas Dental Clinic"></a><p>Gentle, personal dental care for Oroquieta City families.</p></div>
    <div><strong>Visit</strong><p>2nd Floor, JSPC Arcade<br>Lower Langcangan<br>Oroquieta City, 7207</p></div>
    <div><strong>Clinic hours</strong><p>Monday to Saturday<br>8:00 AM to 12:00 PM<br>1:00 PM to 5:00 PM</p></div>
    <div><strong>Contact</strong><p><a href="tel:${PHONE_LINK}">${PHONE_DISPLAY}</a><br><a href="https://www.facebook.com/HorcabasDentalClinic" target="_blank" rel="noopener noreferrer">Facebook</a></p></div>
  </div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Horcabas Dental Clinic</span><span>Oroquieta City, Misamis Occidental</span></div></div></footer>`;

const menu = document.querySelector(".menu-toggle");
const links = document.querySelector(".nav-links");
const scrim = document.querySelector(".nav-scrim");
const close = document.querySelector(".nav-close");
const setMenu = (open) => {
  menu?.setAttribute("aria-expanded", String(open));
  links?.classList.toggle("is-open", open);
  scrim?.classList.toggle("is-open", open);
  document.body.classList.toggle("menu-open", open);
};
menu?.addEventListener("click", () => setMenu(menu.getAttribute("aria-expanded") !== "true"));
scrim?.addEventListener("click", () => setMenu(false));
close?.addEventListener("click", () => setMenu(false));
links?.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.querySelectorAll(".service-faq details").forEach((details) => {
  details.addEventListener("toggle", () => details.classList.toggle("is-expanded", details.open));
});

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
