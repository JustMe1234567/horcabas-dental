import "@fontsource-variable/dm-sans";
import "@fontsource-variable/outfit";
import "./styles.css";
import clinicLogo from "../assets/horcabas-logo.png";
import { getCalendarEvents, lookupSchedule, toLocalDateKey } from "./calendar-service.js";

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
  ["01", "General dentistry", "Exams, cleaning, fillings, and preventive care for everyday oral health."],
  ["02", "Cosmetic care", "Thoughtful whitening and smile enhancements with natural-looking results."],
  ["03", "Restorative care", "Crowns, bridges, and repairs designed for comfort and lasting function."],
  ["04", "Family dentistry", "Warm, patient care for children, adults, and every generation between."]
];

document.querySelector("#app").innerHTML = `
  <header class="site-header">
    <div class="utility-bar">
      <div class="shell utility-inner">
        <span>Mon to Sat, 8:00 AM to 12:00 PM and 1:00 PM to 5:00 PM</span>
        <a href="tel:${PHONE_LINK}">${PHONE_DISPLAY}</a>
      </div>
    </div>
    <nav class="shell nav" aria-label="Primary navigation">
      <a class="brand" href="#top" aria-label="Horcabas Dental Clinic home">
        <img class="brand-logo" src="${clinicLogo}" alt="" width="2172" height="724" />
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links"><span>Menu</span><i aria-hidden="true"></i></button>
      <div class="nav-links" id="nav-links">
        <a href="#services">Services</a>
        <a href="#availability">Availability</a>
        <a href="#my-schedule">My schedule</a>
        <a href="#about">About</a>
        <a href="#location">Location</a>
        <a class="button button-small" href="tel:${PHONE_LINK}">Call to schedule</a>
      </div>
    </nav>
  </header>

  <main id="main">
    <section class="hero" id="top">
      <div class="hero-image" role="img" aria-label="Dentist speaking with a patient in a bright modern treatment room"></div>
      <div class="shell hero-grid">
        <div class="hero-copy reveal">
          <p class="eyebrow">Gentle care. Clear guidance.</p>
          <h1>A healthier smile starts with feeling <em>heard.</em></h1>
          <p class="hero-body">Modern dental care with a calm, personal approach for the whole family.</p>
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

    <section class="section services-section" id="services">
      <div class="shell">
        <div class="section-heading reveal">
          <p class="eyebrow">Care for every smile</p>
          <h2>Everything you need, under one roof.</h2>
          <p>Preventive, restorative, and cosmetic dentistry delivered with patience and precision.</p>
        </div>
        <div class="services-list">
          ${services.map(([number, title, copy]) => `
            <article class="service-item reveal" style="--reveal-order: ${Number(number) - 1}">
              <span>${number}</span>
              <h3>${title}</h3>
              <p>${copy}</p>
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
            <input id="lookup-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="0917 123 4567" required aria-describedby="lookup-help lookup-result" />
            <button class="button" type="submit">Find my schedule</button>
          </div>
          <small id="lookup-help">Philippine mobile formats such as 0917 123 4567 or +63 917 123 4567 are accepted.</small>
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
          <h2>Dentistry without the rush.</h2>
          <p>We take time to listen, explain your options clearly, and make every visit feel comfortable from check-in to follow-up.</p>
          <div class="values">
            <div><strong>Thoughtful</strong><span>Care plans built around you</span></div>
            <div><strong>Transparent</strong><span>Clear options before treatment</span></div>
            <div><strong>Gentle</strong><span>A calmer clinical experience</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section location-section" id="location">
      <div class="shell location-grid">
        <div class="location-copy reveal">
          <p class="eyebrow">Visit the clinic</p>
          <h2>Find us in Oroquieta City.</h2>
          <address>2nd Floor, JSPC Arcade<br />Lower Langcangan, Oroquieta City<br />Philippines</address>
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

    <section class="section cta-section">
      <div class="shell cta-inner reveal">
        <div><p>Ready when you are.</p><h2>Let’s take care of your smile.</h2></div>
        <a class="button button-light" href="tel:${PHONE_LINK}">Call ${PHONE_DISPLAY}</a>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="shell footer-grid">
      <div class="brand footer-brand"><span class="brand-mark">H</span><span><strong>HORCABAS</strong><small>DENTAL CLINIC</small></span></div>
      <div><strong>Visit us</strong><p>2nd Floor, JSPC Arcade<br />Lower Langcangan, Oroquieta City<br />Philippines</p></div>
      <div><strong>Clinic hours</strong><p>Monday to Saturday<br />8:00 AM to 12:00 PM<br />1:00 PM to 5:00 PM</p></div>
      <div><strong>Appointments</strong><p><a href="tel:${PHONE_LINK}">${PHONE_DISPLAY}</a><br />Call to confirm your schedule<br /><a href="${FACEBOOK_URL}" target="_blank" rel="noopener noreferrer">Message us on Facebook</a></p></div>
    </div>
    <div class="shell footer-bottom"><span>© ${new Date().getFullYear()} Horcabas Dental Clinic</span><span>Calendar availability is subject to confirmation.</span></div>
  </footer>
`;

const menuButton = document.querySelector(".menu-toggle");
menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  document.querySelector(".nav-links").classList.toggle("is-open", !isOpen);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  menuButton.setAttribute("aria-expanded", "false");
  document.querySelector(".nav-links").classList.remove("is-open");
});

document.querySelectorAll(".nav-links a").forEach((link) => link.addEventListener("click", () => {
  menuButton.setAttribute("aria-expanded", "false");
  document.querySelector(".nav-links").classList.remove("is-open");
}));

const lookupForm = document.querySelector("#schedule-lookup-form");
const lookupResult = document.querySelector("#lookup-result");
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
    return `<button class="${classes}" style="--date-order: ${index % 7}" data-date="${key}" ${!event ? "disabled" : ""} aria-label="${event ? `Available ${displayDate(key)}` : `Unavailable ${displayDate(key)}`}"><span>${index + 1}</span>${event ? `<small>${event.slots.length} ${event.slots.length === 1 ? "time" : "times"}</small>` : ""}</button>`;
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
