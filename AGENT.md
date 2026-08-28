# AGENT.md

## Purpose

This file defines how coding agents should work on the Horcabas Dental Clinic Next.js project.

## Clinic Details

Use these exact details throughout the public website:

- **Clinic name:** Horcabas Dental Clinic
- **Phone:** 0969 519 5316
- **Telephone link:** `tel:+639695195316`
- **Email:** horcabasclinic@gmail.com
- **Email link:** `mailto:horcabasclinic@gmail.com`
- **Address:** 2nd Floor, JSPC Arcade, Lower Langcangan, Oroquieta City, Philippines
- **Coordinates:** `8.481607047025747, 123.80391177356363`
- **Google Maps:** `https://www.google.com/maps?q=8.481607047025747,123.80391177356363`

Do not invent clinic operating hours, staff names, credentials, years of experience, patient counts, or testimonials. Until hours are supplied, use “Call for current clinic hours.” Sample schedule and testimonial content must be visibly labeled as mock or placeholder content.

Agents should preserve the product architecture, privacy rules, and scope described here unless the user explicitly requests a change.

---

## 1. Product Summary

This is the public Horcabas Dental Clinic website built with Next.js.

Google Calendar is the appointment source of truth.

Patients:

- Do not create accounts.
- Do not log in.
- Do not book appointments online.
- Can view available appointment times.
- Must call the clinic to reserve an appointment.
- Can search for their current or future appointment using the phone number used during booking.

Clinic staff manage appointments directly through Google Calendar.

The MVP intentionally does not include:

- A custom admin dashboard
- Patient accounts
- Online booking
- A separate patient database

Do not introduce those systems unless explicitly requested.

---

## 2. Core Architecture

Use this architecture by default:

```text
Browser
   |
   v
Next.js UI
   |
   v
Next.js server/API routes
   |
   v
Google Calendar API
```

Never call authenticated Google Calendar APIs directly from client-side browser code.

---

## 3. Preferred Stack

Unless the repository already uses alternatives:

- Next.js
- TypeScript
- App Router
- React Server Components where appropriate
- Client Components only where interaction is needed
- Tailwind CSS if already configured
- Google Calendar API
- Server-side environment variables

Avoid adding large dependencies without a clear need.

---

## 4. Project Responsibilities

### Next.js handles

- Landing page
- Services
- Clinic details
- Clinic operating hours
- Slot generation
- Availability calculation
- Appointment search
- Input validation
- Data sanitization
- Public UI
- Call-to-book behavior

### Google Calendar handles

- Confirmed appointments
- Rescheduling
- Cancellations
- Blocked time
- Dentist unavailability
- Special closures

### Clinic staff handles

- Phone bookings
- Entering appointments in Google Calendar
- Updating Calendar events
- Cancelling Calendar events

Do not duplicate Calendar appointment management inside the application unless explicitly requested.

---

## 5. Security Rules

These rules are mandatory.

### Google credentials

Never expose:

```text
GOOGLE_CLIENT_EMAIL
GOOGLE_PRIVATE_KEY
GOOGLE_CALENDAR_ID
```

to browser code.

Never prefix sensitive Google credentials with:

```text
NEXT_PUBLIC_
```

Google authentication must only run server-side.

### Calendar event privacy

Never send a raw Google Calendar event object to the frontend.

Before returning appointment data, explicitly construct a sanitized response.

Allowed public fields may include:

- Appointment date
- Start time
- End time
- Service name

Do not expose by default:

- Patient name
- Phone number
- Calendar description
- Notes
- Attendees
- Organizer
- Creator
- Email addresses
- Google internal metadata

### Logging

Do not log full phone numbers, Google credentials, event descriptions, or other patient information in production.

---

## 6. Availability Rules

The public website shows only available appointment slots.

Availability is calculated from:

```text
configured clinic operating hours
-
Google Calendar busy periods
=
public available slots
```

Do not treat every empty Calendar period as available.

Clinic hours belong to application configuration.

Example:

```ts
export const clinicSchedule = {
  monday: { start: "09:00", end: "17:00" },
  tuesday: { start: "09:00", end: "17:00" },
  wednesday: { start: "09:00", end: "17:00" },
  thursday: { start: "09:00", end: "17:00" },
  friday: { start: "09:00", end: "17:00" },
  saturday: { start: "09:00", end: "13:00" },
  sunday: null,
};
```

Do not hardcode schedule values throughout components. Keep schedule configuration centralized.

---

## 7. Appointment Slot Rules

Default slot generation should:

1. Identify operating hours for the requested date.
2. Generate candidate slots.
3. Remove slots overlapping Calendar busy periods.
4. Remove slots that have already passed.
5. Sort ascending.
6. Return only required public fields.

Keep slot calculation in reusable server/domain code instead of UI components.

Recommended file:

```text
lib/availability.ts
```

---

## 8. Google Calendar Queries

Use the Google Calendar API server-side.

### Availability

Prefer free/busy queries when the goal is only to determine occupied periods.

Do not retrieve full event details just to calculate availability if free/busy data is sufficient.

### Appointment Search

For the MVP, appointment events may contain a normalized phone number in the Calendar event description.

Recommended format:

```text
Patient: Juan Dela Cruz
Phone: +639171234567
Service: Dental Cleaning
```

When searching appointments:

- Normalize the submitted phone number.
- Query only current/in-progress and future events.
- Return sanitized fields.
- Do not return completed historical appointments.

If the application later creates Calendar events itself, prefer private extended properties for structured phone metadata.

---

## 9. Phone Number Handling

Keep phone normalization in one utility.

Recommended file:

```text
lib/phone.ts
```

For Philippine numbers, inputs such as:

```text
09171234567
0917 123 4567
0917-123-4567
+63 917 123 4567
639171234567
```

should normalize consistently where valid.

Preferred representation:

```text
+639171234567
```

Do not scatter phone parsing regular expressions across multiple components/routes.

---

## 10. API Design

Recommended public endpoints:

```text
GET /api/availability
POST /api/appointments/search
```

### `/api/availability`

Should:

- Validate date input.
- Calculate availability server-side.
- Return only available slots.
- Gracefully handle Google API failures.

### `/api/appointments/search`

Should:

- Accept a phone number.
- Validate and normalize input.
- Rate-limit repeated requests.
- Search only current/future events.
- Return sanitized data.
- Return generic not-found responses.

Never allow these public routes to modify Google Calendar.

---

## 11. Appointment Search Privacy

A phone number alone is not strong authentication.

Until stronger verification is implemented:

- Return minimal information.
- Never return patient name.
- Never return notes.
- Never return contact information.
- Rate-limit searches.
- Use exact normalized matching where possible.

If more privacy is needed later, prefer:

- Phone + last name
- Phone + one-time code
- OTP verification

Do not invent sensitive authentication workflows without user approval.

---

## 12. Time and Timezone Rules

Calendar code must be timezone-aware.

Do not compare user-visible appointment times using naive strings when date/time objects are required.

Keep the clinic timezone configurable.

When filtering past appointments, compare against the current timestamp, not just the current calendar date.

An appointment currently in progress may still be treated as current depending on the intended UX.

Write tests around:

- Start-of-day
- End-of-day
- Midnight
- Timezone conversion
- Current/in-progress appointments
- Past appointments
- Future appointments

---

## 13. UI Guidelines

The public experience should feel like a dental clinic website, not a generic scheduling SaaS.

Prioritize:

- Clean layout
- Mobile responsiveness
- Readable typography
- Trust
- Clear clinic contact information
- Accessible buttons/forms
- Fast loading

The main booking CTA should communicate:

```text
Call to Book
```

Do not label public availability slots with wording that implies online booking.

Good:

```text
Available
Call to reserve
```

Avoid:

```text
Book now
Confirm appointment
Reserve online
```

unless online booking is intentionally added later.

---

## 14. Landing Page Structure

Default section order:

1. Navbar
2. Hero
3. Services
4. Available Appointments
5. Call-to-Book CTA
6. Find My Appointment
7. About
8. Dentist / Team
9. Location
10. Contact
11. Footer

Keep components modular.

---

## 15. Client vs Server Components

Prefer Server Components by default.

Use Client Components only when needed for:

- Form input
- Interactive date selection
- Loading state interaction
- Appointment search UI
- Mobile menu
- Other browser-only interactions

Google Calendar authentication and API operations must never be moved into Client Components.

---

## 16. Error States

Do not expose internal API errors.

Good public messages:

```text
Schedule information is temporarily unavailable.
Please call the clinic for current availability.
```

and:

```text
No upcoming appointment was found with the information provided.
Please check the phone number or contact the clinic.
```

Log technical details server-side only, while respecting privacy rules.

---

## 17. Code Quality

Agents should:

- Use TypeScript types.
- Avoid `any` unless unavoidable.
- Keep functions focused.
- Extract reusable domain logic.
- Validate external input.
- Handle null/undefined Google API fields.
- Avoid duplicated business rules.
- Preserve existing code style.
- Avoid large refactors unrelated to the task.
- Avoid premature abstractions.

---

## 18. Dependency Policy

Before installing a dependency:

1. Check whether the project already has a solution.
2. Prefer platform/native APIs for simple tasks.
3. Avoid adding a package for trivial formatting or validation.
4. Explain meaningful new dependencies in the implementation summary.

Do not replace the existing stack unnecessarily.

---

## 19. Environment Variables

Expected server-side variables may include:

```env
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_CALENDAR_ID=
CLINIC_TIMEZONE=Asia/Manila
```

Never commit real secret values.

When examples are needed, update:

```text
.env.example
```

instead of exposing `.env.local`.

---

## 20. Suggested File Structure

Use this as guidance, not an absolute requirement:

```text
app/
├── page.tsx
├── api/
│   ├── availability/
│   │   └── route.ts
│   └── appointments/
│       └── search/
│           └── route.ts
│
components/
├── Navbar.tsx
├── Hero.tsx
├── Services.tsx
├── AvailableSchedule.tsx
├── AppointmentSearch.tsx
├── About.tsx
├── Contact.tsx
└── Footer.tsx
│
lib/
├── google-calendar.ts
├── availability.ts
├── clinic-schedule.ts
├── phone.ts
└── validation.ts
│
types/
└── appointments.ts
```

Adapt to the repository instead of forcing this structure if equivalent organization already exists.

---

## 21. Testing Priorities

When changing calendar logic, test:

- Open clinic day
- Closed clinic day
- No Calendar events
- Fully booked day
- Partial overlap
- Multi-hour busy block
- Past slot removal
- Current appointment handling
- Future appointment search
- Past appointment exclusion
- Invalid phone input
- Google API failure
- Missing event fields
- Timezone boundaries

When changing UI, check:

- Mobile
- Tablet
- Desktop
- Keyboard navigation
- Empty states
- Loading states
- Error states

---

## 22. Scope Control

Do not automatically add:

- Supabase
- Prisma
- PostgreSQL
- Firebase
- Auth.js
- Custom admin authentication
- Patient accounts
- Online booking
- Payment processing

These may be useful later, but they are not part of the current MVP.

If a task appears to require one of these, first determine whether it can be solved with the existing Next.js + Google Calendar architecture.

---

## 23. Future-Friendly Design

Code should leave room for future additions such as:

- Multiple dentists
- Multiple calendars
- Multiple clinic locations
- SMS reminders
- Email reminders
- OTP verification
- Online booking
- Custom admin dashboard
- Patient database

Do not implement these prematurely.

---

## 24. Agent Completion Checklist

Before completing a change, verify:

- [ ] The requested feature works.
- [ ] Google Calendar access remains server-side.
- [ ] No secrets are exposed.
- [ ] No raw event objects reach the browser.
- [ ] Public API responses contain only necessary fields.
- [ ] Past appointments are excluded from public appointment search.
- [ ] Phone numbers are normalized consistently.
- [ ] Calendar timezone behavior is correct.
- [ ] Public users still cannot create/edit bookings.
- [ ] The call-to-book workflow remains clear.
- [ ] Error states are handled.
- [ ] Mobile UI remains usable.
- [ ] No unnecessary dependencies were added.
- [ ] Existing project conventions were preserved.

---

## 25. Source of Truth

When implementation decisions conflict, use this priority:

1. Explicit user request
2. Privacy/security requirements
3. `PROJECT_PLAN.md`
4. This `AGENT.md`
5. Existing repository conventions
6. Simplest maintainable implementation

The overall principle is:

> Keep the patient-facing application simple and read-only while using Google Calendar as the clinic's appointment management system.
