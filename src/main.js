import { getCalendarEvents, lookupSchedule, toLocalDateKey } from "./calendar-service.js";

const clinicLogo = "/assets/horcabas-logo.png";
const checkupArticleImage = "/assets/dental-checkup-cleaning-oroquieta-city.webp";
const fillingsArticleImage = "/assets/dental-fillings-oroquieta-city.webp";
const familyArticleImage = "/assets/family-dentist-oroquieta-city.webp";
const cosmeticArticleImage = "/assets/cosmetic-dentistry-oroquieta-city.webp";
const crownsArticleImage = "/assets/crowns-bridges-oroquieta-city.webp";

const PHONE_DISPLAY = "0969 519 5316";
const PHONE_LINK = "+639695195316";
const FACEBOOK_URL = "https://www.facebook.com/HorcabasDentalClinic";
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "'": "&#39;",
  '"': "&quot;"
})[character]);
const today = new Date();
let visibleMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let selectedDate = null;
let eventsByDate = new Map();

const services = [
  ["01", "Dental checkup and cleaning", "Routine oral exams, cleaning, and preventive guidance for everyday oral health.", "/dental-checkup-cleaning-oroquieta-city/"],
  ["02", "Dental fillings", "Assessment and restorative care for selected teeth affected by decay or minor damage.", "/dental-fillings-oroquieta-city/"],
  ["03", "Cosmetic dental care", "Thoughtful smile improvements planned around oral health and realistic expectations.", "/cosmetic-dentistry-oroquieta-city/"],
  ["04", "Crowns and bridges", "Restorative options for selected damaged or missing teeth, based on a dental assessment.", "/crowns-bridges-oroquieta-city/"],
  ["05", "Family dentistry", "Patient dental care for children, adults, seniors, and every generation in between.", "/family-dentist-oroquieta-city/"]
];

const articles = [
  ["Preventive care", "Dental checkup and cleaning in Oroquieta City", "A practical guide to routine examinations, professional cleaning, and when to contact a dentist.", "/dental-checkup-cleaning-oroquieta-city/", checkupArticleImage],
  ["Restorative care", "What to know about dental fillings", "Understand why a filling may be recommended, how a tooth is assessed, and what to expect afterward.", "/dental-fillings-oroquieta-city/", fillingsArticleImage],
  ["Family care", "Choosing a family dentist in Oroquieta City", "Helpful guidance for children, adults, seniors, and families preparing for dental visits.", "/family-dentist-oroquieta-city/", familyArticleImage],
  ["Smile planning", "A guide to cosmetic dentistry", "Learn how oral health, personal goals, realistic expectations, and maintenance shape cosmetic care.", "/cosmetic-dentistry-oroquieta-city/", cosmeticArticleImage],
  ["Restoring teeth", "Dental crowns and bridges explained", "Compare crowns and bridges, how treatment is planned, and how restorations are cared for.", "/crowns-bridges-oroquieta-city/", crownsArticleImage]
];

document.querySelector("#app").innerHTML = `
  <header class="site-header">
    <div class="utility-bar">
      <div class="shell utility-inner">
        <span class="utility-hours"><strong>Available:</strong> Mon to Sat · 8:00 AM–12:00 PM · 1:00 PM–5:00 PM</span>
        <a class="utility-location" href="#location">
          <span class="utility-location-desktop">2nd Floor, JSPC Arcade · Oroquieta City</span>
          <span class="utility-location-mobile">Oroquieta City</span>
        </a>
        <a class="utility-phone" href="tel:${PHONE_LINK}" aria-label="Call Horcabas Dental Clinic at ${PHONE_DISPLAY}">${PHONE_DISPLAY}</a>
      </div>
    </div>
    <nav class="shell nav" aria-label="Primary navigation">
      <a class="brand" href="#top" aria-label="Horcabas Dental Clinic home">
        <img class="brand-logo" src="${clinicLogo}" alt="" width="2172" height="724" />
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links"><span>Menu</span><i aria-hidden="true"></i></button>
      <button class="nav-scrim" type="button" aria-label="Close navigation menu" tabindex="-1"></button>
      <div class="nav-links" id="nav-links">
        <div class="nav-drawer-header">
          <span>Menu</span>
          <button class="nav-close" type="button" aria-label="Close navigation menu"><i aria-hidden="true"></i></button>
        </div>
        <span class="nav-menu-label">Explore the clinic</span>
        <a href="#services">Services</a>
        <a href="#availability">Availability</a>
        <a href="/about/">About</a>
        <a href="/blog/">Blog</a>
        <a class="button button-small" href="tel:${PHONE_LINK}">Call to schedule</a>
      </div>
    </nav>
  </header>

  <main id="main">
    <section class="hero" id="top">
      <div class="hero-image" role="img" aria-label="Dentist speaking with a patient in a bright modern treatment room"></div>
      <div class="shell hero-grid">
        <div class="hero-copy reveal">
          <p class="eyebrow">Your local Oroquieta City dentist</p>
          <h1>A dental clinic in Oroquieta City that makes you feel <em>heard.</em></h1>
          <p class="hero-body">Gentle family dental care in Lower Langcangan, Oroquieta City, with clear guidance and a calm, personal approach.</p>
          <div class="hero-actions">
            <a class="button" href="#availability">Check available dates</a>
            <a class="text-link" href="tel:${PHONE_LINK}">Call ${PHONE_DISPLAY}</a>
          </div>
        </div>
      </div>
    </section>

    <section class="care-strip" aria-label="Clinic qualities">
      <div class="shell care-grid">
        <div><span>01</span><strong>Patient-first care</strong></div>
        <div><span>02</span><strong>Modern treatment</strong></div>
        <div><span>03</span><strong>Family friendly</strong></div>
        <div><span>04</span><strong>Clear pricing</strong></div>
      </div>
    </section>

    <section class="section local-intro-section" id="patient-guide">
      <div class="shell local-intro-grid">
        <div class="section-heading reveal">
          <p class="eyebrow">Dental care close to home</p>
          <h2>A local dental clinic serving Oroquieta City.</h2>
        </div>
        <div class="local-intro-copy reveal">
          <p>Horcabas Dental Clinic provides general, preventive, cosmetic, restorative, and family dental care for patients in Oroquieta City and nearby communities in Misamis Occidental.</p>
          <p>Our clinic is located at 2nd Floor, JSPC Arcade in Lower Langcangan. Patients can review available dates online, then call our clinic so the secretary can confirm the appointment time.</p>
          <a class="text-link" href="#location">View our Oroquieta City location</a>
        </div>
      </div>
    </section>

    <section class="section services-section" id="services">
      <div class="shell">
        <div class="section-heading reveal">
          <p class="eyebrow">Care for every smile</p>
          <h2>Dental services for Oroquieta City families.</h2>
          <p>Explore routine and restorative dental care for children, adults, and families at our clinic in Lower Langcangan.</p>
        </div>
        <div class="services-list">
          ${services.map(([number, title, copy, url]) => `
            <article class="service-item reveal" style="--reveal-order: ${Number(number) - 1}">
              <span>${number}</span>
              <h3><a href="${url}">${title}</a></h3>
              <p>${copy} <a class="service-learn-link" href="${url}">Learn more</a></p>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="section availability-section" id="availability">
      <div class="shell availability-layout">
        <div class="availability-copy reveal">
          <p class="eyebrow">Plan your visit</p>
          <h2>Find an open time.</h2>
          <p>Choose a date to view open clinic hours. Availability is for reference only and the secretary confirms every appointment by phone.</p>
          <div class="hours-block" aria-label="Clinic scheduling hours">
            <span><strong>Morning</strong>8:00 AM to 12:00 PM</span>
            <span><strong>Afternoon</strong>1:00 PM to 5:00 PM</span>
          </div>
          <div class="calendar-note"><strong>Sundays are unavailable.</strong><br />Calendar openings may change until confirmed by the secretary.</div>
          <div class="availability-steps" aria-label="How scheduling works">
            <span><b>1</b>Choose an open date</span>
            <span><b>2</b>Call the clinic</span>
            <span><b>3</b>Secretary confirms</span>
          </div>
        </div>
        <div class="calendar-panel reveal" aria-live="polite">
          <div class="calendar-toolbar">
            <button id="previous-month" aria-label="Previous month">Previous</button>
            <h3 id="month-label"></h3>
            <button id="next-month" aria-label="Next month">Next</button>
          </div>
          <div class="weekdays" aria-hidden="true">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
          </div>
          <div class="calendar-grid" id="calendar-grid">
            <div class="calendar-loading">Loading available dates...</div>
          </div>
          <div class="slot-panel" id="slot-panel">
            <p>Select an available date to see time options.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section lookup-section" id="my-schedule">
      <div class="shell schedule-lookup reveal">
        <div class="lookup-copy">
          <p class="eyebrow">Already confirmed?</p>
          <h2>Look up your schedule.</h2>
          <p>Use the same phone number you gave our secretary. We only display your appointment details, never your name or internal notes.</p>
          <div class="privacy-note"><strong>Your information stays private.</strong><span>The search is read-only. It cannot create, change, or cancel an appointment.</span></div>
        </div>
        <form class="lookup-form" id="schedule-lookup-form" novalidate>
          <div class="form-heading"><strong>Find an existing appointment</strong><span>Appointments must already be entered by the secretary.</span></div>
          <label for="lookup-phone">Phone number used for scheduling</label>
          <div class="lookup-controls">
            <input id="lookup-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="+639171234567" pattern="\\+?[0-9]*" maxlength="13" required aria-describedby="lookup-help lookup-result" />
            <button class="button" type="submit">Find my schedule</button>
          </div>
          <small id="lookup-help">Enter 09171234567, 639171234567, or +639171234567.</small>
          <div class="lookup-result" id="lookup-result" aria-live="polite"></div>
        </form>
      </div>
    </section>

    <section class="section about-section" id="about">
      <div class="shell about-grid">
        <div class="about-visual reveal">
          <div class="about-number">15+</div>
          <p>years of caring for local smiles</p>
        </div>
        <div class="about-copy reveal">
          <h2>Personal dental care for Oroquieta City patients.</h2>
          <p>We take time to listen, explain dental care options clearly, and help each visit feel comfortable from check-in to follow-up. Our goal is to give individuals and families practical guidance for healthier smiles.</p>
          <div class="values">
            <div><strong>Thoughtful</strong><span>Care plans built around you</span></div>
            <div><strong>Transparent</strong><span>Clear options before treatment</span></div>
            <div><strong>Gentle</strong><span>A calmer clinical experience</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section blog-section" id="blog">
      <div class="shell">
        <div class="blog-heading reveal">
          <div>
            <p class="eyebrow">Dental health library</p>
            <h2>Helpful reading before your visit.</h2>
          </div>
          <p>Clear, locally relevant guides to common dental services and questions from patients in Oroquieta City.</p>
        </div>
        <div class="article-grid">
          ${articles.map(([category, title, copy, url, image], index) => `
            <article class="article-card reveal${index === 0 ? " article-card-featured" : ""}" style="--reveal-order: ${index}">
              <a class="article-card-image" href="${url}" aria-label="Read ${title}">
                <img src="${image}" alt="" width="1536" height="1024" loading="lazy" />
              </a>
              <div class="article-card-copy">
                <span>${category}</span>
                <h3><a href="${url}">${title}</a></h3>
                <p>${copy}</p>
                <a class="article-read-link" href="${url}">Read article <span aria-hidden="true">→</span></a>
              </div>
            </article>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="section location-section" id="location">
      <div class="shell location-grid">
        <div class="location-copy reveal">
          <p class="eyebrow">Visit the clinic</p>
          <h2>Visit our dental clinic in Oroquieta City.</h2>
          <p>Horcabas Dental Clinic is conveniently located in Lower Langcangan and is open Monday through Saturday.</p>
          <address>2nd Floor, JSPC Arcade<br />Lower Langcangan, Oroquieta City<br />Misamis Occidental 7207, Philippines</address>
          <a class="button" href="https://www.google.com/maps/search/?api=1&amp;query=8.481573822931571%2C123.80389927008653" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
        </div>
        <div class="map-frame reveal">
          <iframe
            title="Map showing Horcabas Dental Clinic in Oroquieta City"
            src="https://www.google.com/maps?q=8.481573822931571,123.80389927008653&amp;z=17&amp;t=k&amp;output=embed"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>

    <section class="section faq-section" id="frequently-asked-questions">
      <div class="shell faq-layout">
        <div class="section-heading reveal">
          <p class="eyebrow">Patient information</p>
          <h2>Dental clinic questions, answered.</h2>
          <p>Helpful information for planning a visit to Horcabas Dental Clinic in Oroquieta City.</p>
        </div>
        <div class="faq-list reveal">
          <details>
            <summary>Where is Horcabas Dental Clinic located?</summary>
            <div class="faq-answer"><div><p>We are located at 2nd Floor, JSPC Arcade in Lower Langcangan, Oroquieta City, Misamis Occidental 7207. Use the map above for directions to the clinic.</p></div></div>
          </details>
          <details>
            <summary>What dental services are available?</summary>
            <div class="faq-answer"><div><p>Our homepage lists general dentistry, routine checkups and cleaning, fillings, preventive care, cosmetic dental care, crowns, bridges, restorative work, and family dentistry.</p></div></div>
          </details>
          <details>
            <summary>How can I schedule a dental appointment?</summary>
            <div class="faq-answer"><div><p>Check the availability calendar for an open date, then call 0969 519 5316. Our secretary will confirm the final appointment date and time by phone.</p></div></div>
          </details>
          <details>
            <summary>What are the clinic hours?</summary>
            <div class="faq-answer"><div><p>Horcabas Dental Clinic is available Monday through Saturday from 8:00 AM to 12:00 PM and from 1:00 PM to 5:00 PM. The clinic is unavailable on Sundays.</p></div></div>
          </details>
          <details>
            <summary>Does the online calendar confirm my appointment?</summary>
            <div class="faq-answer"><div><p>No. The calendar shows dates and times for reference. Your appointment is confirmed only after you speak with the clinic secretary.</p></div></div>
          </details>
        </div>
      </div>
    </section>

    <section class="section cta-section">
      <div class="shell cta-inner reveal">
        <div><p>Looking for a dentist in Oroquieta City?</p><h2>Call Horcabas Dental Clinic to plan your visit.</h2></div>
        <a class="button button-light" href="tel:${PHONE_LINK}">Call ${PHONE_DISPLAY}</a>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="shell footer-grid">
      <div class="footer-intro">
        <a class="footer-brand" href="#top" aria-label="Horcabas Dental Clinic home">
          <img class="footer-brand-logo" src="${clinicLogo}" alt="" width="2172" height="724" />
        </a>
        <p>Gentle, modern dental care with a calm, personal approach for every smile in Oroquieta City.</p>
      </div>
      <div><strong>Visit us</strong><p>2nd Floor, JSPC Arcade<br />Lower Langcangan, Oroquieta City<br />Philippines</p></div>
      <div><strong>Clinic hours</strong><p>Monday to Saturday<br />8:00 AM to 12:00 PM<br />1:00 PM to 5:00 PM</p></div>
      <div><strong>Appointments</strong><p><a href="tel:${PHONE_LINK}">${PHONE_DISPLAY}</a><br />Call to confirm your schedule<br /><a href="${FACEBOOK_URL}" target="_blank" rel="noopener noreferrer">Message us on Facebook</a></p></div>
    </div>
    <div class="shell footer-bottom"><span>© ${new Date().getFullYear()} Horcabas Dental Clinic</span><span>Calendar availability is subject to confirmation.</span></div>
  </footer>
`;

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navScrim = document.querySelector(".nav-scrim");
const navCloseButton = document.querySelector(".nav-close");

const setMenuOpen = (isOpen, restoreFocus = false) => {
  menuButton.setAttribute("aria-expanded", String(isOpen));
  navLinks.classList.toggle("is-open", isOpen);
  navScrim.classList.toggle("is-open", isOpen);
  navScrim.tabIndex = isOpen ? 0 : -1;
  document.body.classList.toggle("menu-open", isOpen);

  if (isOpen) {
    requestAnimationFrame(() => navCloseButton.focus());
  } else if (restoreFocus) {
    menuButton.focus();
  }
};

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

navScrim.addEventListener("click", () => setMenuOpen(false, true));
navCloseButton.addEventListener("click", () => setMenuOpen(false, true));

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || menuButton.getAttribute("aria-expanded") !== "true") return;
  setMenuOpen(false, true);
});

document.querySelectorAll(".nav-links a").forEach((link) => link.addEventListener("click", () => {
  setMenuOpen(false);
}));

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
document.querySelectorAll(".faq-list details").forEach((details) => {
  const summary = details.querySelector("summary");
  const answer = details.querySelector(".faq-answer");

  summary.addEventListener("click", (event) => {
    event.preventDefault();
    const isExpanded = details.classList.contains("is-expanded");

    if (prefersReducedMotion.matches) {
      details.open = !isExpanded;
      details.classList.toggle("is-expanded", !isExpanded);
      return;
    }

    if (!isExpanded) {
      details.open = true;
      requestAnimationFrame(() => details.classList.add("is-expanded"));
      return;
    }

    details.classList.remove("is-expanded");
    const finishClosing = (transitionEvent) => {
      if (transitionEvent.target !== answer || transitionEvent.propertyName !== "grid-template-rows") return;
      answer.removeEventListener("transitionend", finishClosing);
      if (!details.classList.contains("is-expanded")) details.open = false;
    };
    answer.addEventListener("transitionend", finishClosing);
  });
});

const lookupForm = document.querySelector("#schedule-lookup-form");
const lookupResult = document.querySelector("#lookup-result");
const lookupPhone = lookupForm.elements.phone;
lookupPhone.addEventListener("input", () => {
  const hasLeadingPlus = lookupPhone.value.trimStart().startsWith("+");
  const digits = lookupPhone.value.replace(/\D/g, "");
  lookupPhone.value = `${hasLeadingPlus ? "+" : ""}${digits}`;
});
const lookupError = (message) => `
  <div class="result-message is-error" role="alert">
    <strong>We couldn't check your schedule.</strong>
    <span>${escapeHtml(message)} You can try again or call <a href="tel:${PHONE_LINK}">${PHONE_DISPLAY}</a> for help.</span>
  </div>
`;
lookupForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const phoneInput = lookupForm.elements.phone;
  const submitButton = lookupForm.querySelector("button[type='submit']");
  const phone = phoneInput.value.trim();
  if (!phone) {
    return;
  }

  phoneInput.removeAttribute("aria-invalid");
  submitButton.disabled = true;
  submitButton.textContent = "Searching...";
  lookupResult.innerHTML = '<div class="lookup-loading">Checking the clinic calendar...</div>';
  try {
    const result = await lookupSchedule(phone);
    if (!result.found) {
      lookupResult.innerHTML = `<div class="result-message"><strong>No upcoming schedule found.</strong><span>Check the number you entered or call <a href="tel:${PHONE_LINK}">${PHONE_DISPLAY}</a> for help.</span></div>`;
      return;
    }
    lookupResult.innerHTML = result.appointments.map((appointment) => `
      <article class="appointment-result">
        <div class="result-schedule"><span>Your appointment</span><strong>${escapeHtml(appointment.date)}</strong><strong>${escapeHtml(appointment.time)}</strong></div>
        <div><span>Service</span><strong>${escapeHtml(appointment.service)}</strong></div>
        <div><span>Status</span><strong>${escapeHtml(appointment.status)}</strong></div>
        <div><span>Location</span><strong>${escapeHtml(appointment.location)}</strong></div>
      </article>
    `).join("");
  } catch (error) {
    lookupResult.innerHTML = lookupError(error.message || "The clinic schedule is temporarily unavailable.");
    if (error.status === 400) {
      phoneInput.setAttribute("aria-invalid", "true");
      phoneInput.focus();
    }
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Find my schedule";
  }
});

function mondayFirstIndex(date) {
  return date.getDay() === 0 ? 0 : date.getDay() - 1;
}

function displayDate(dateKey) {
  return new Intl.DateTimeFormat("en-PH", { weekday: "long", month: "long", day: "numeric" })
    .format(new Date(`${dateKey}T12:00:00`));
}

function renderCalendar() {
  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const days = new Date(year, month + 1, 0).getDate();
  const firstOffset = mondayFirstIndex(new Date(year, month, 1));
  const grid = document.querySelector("#calendar-grid");

  document.querySelector("#month-label").textContent = new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric" }).format(visibleMonth);
  grid.innerHTML = `${"<span class=\"calendar-blank\"></span>".repeat(firstOffset)}${Array.from({ length: days }, (_, index) => {
    const date = new Date(year, month, index + 1);
    if (date.getDay() === 0) return "";
    const key = toLocalDateKey(date);
    const event = eventsByDate.get(key);
    const past = date < new Date(new Date().setHours(0, 0, 0, 0));
    const classes = ["date-cell", event ? "available" : "unavailable", past ? "past" : "", key === selectedDate ? "selected" : ""].filter(Boolean).join(" ");
    return `<button class="${classes}" style="--date-order: ${index % 7}" data-date="${key}" ${!event ? "disabled" : ""} aria-label="${event ? `Available ${displayDate(key)}` : `Unavailable ${displayDate(key)}`}"><span>${index + 1}</span>${event ? `<small>${event.slots.length} available</small>` : ""}</button>`;
  }).join("")}`;

  grid.classList.remove("is-changing");
  grid.classList.add("is-entering");
  requestAnimationFrame(() => requestAnimationFrame(() => grid.classList.remove("is-entering")));

  grid.querySelectorAll(".available").forEach((button) => button.addEventListener("click", () => {
    selectedDate = button.dataset.date;
    renderCalendar();
    renderSlots();
  }));
}

function renderSlots() {
  const panel = document.querySelector("#slot-panel");
  const event = eventsByDate.get(selectedDate);
  if (!event) {
    panel.innerHTML = "<p>Select an available date to see time options.</p>";
    return;
  }
  panel.innerHTML = `
    <div><strong>${displayDate(selectedDate)}</strong><span>Open one-hour windows</span></div>
    <div class="slots">${event.slots.map((slot) => `<span>${slot}</span>`).join("")}</div>
    <a href="tel:${PHONE_LINK}">Call to request</a>
  `;
  panel.classList.remove("has-selection");
  requestAnimationFrame(() => panel.classList.add("has-selection"));
}

async function loadMonth() {
  const grid = document.querySelector("#calendar-grid");
  grid.classList.add("is-changing");
  grid.innerHTML = '<div class="calendar-loading">Loading available dates...</div>';
  document.querySelector("#month-label").textContent = new Intl.DateTimeFormat("en-PH", { month: "long", year: "numeric" }).format(visibleMonth);
  try {
    const events = await getCalendarEvents({ year: visibleMonth.getFullYear(), month: visibleMonth.getMonth() });
    eventsByDate = new Map(events.map((event) => [event.date, event]));
    selectedDate = null;
    renderCalendar();
    renderSlots();
  } catch (error) {
    grid.innerHTML = '<div class="calendar-error">Availability could not be loaded. Please call the clinic for assistance.</div>';
  }
}

document.querySelector("#previous-month").addEventListener("click", () => {
  const candidate = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  if (candidate < currentMonth) return;
  visibleMonth = candidate;
  loadMonth();
});

document.querySelector("#next-month").addEventListener("click", () => {
  visibleMonth = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() + 1, 1);
  loadMonth();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
loadMonth();
