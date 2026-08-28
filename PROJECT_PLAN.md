# Horcabas Dental Clinic Website — Project Plan

## 1. Project Overview

This project is the public landing website for Horcabas Dental Clinic, built with Next.js.

### Clinic Details

- **Clinic name:** Horcabas Dental Clinic
- **Phone:** 0969 519 5316
- **Telephone link:** `tel:+639695195316`
- **Email:** horcabasclinic@gmail.com
- **Email link:** `mailto:horcabasclinic@gmail.com`
- **Address:** 2nd Floor, JSPC Arcade, Lower Langcangan, Oroquieta City, Philippines
- **Coordinates:** `8.481607047025747, 123.80391177356363`
- **Google Maps:** `https://www.google.com/maps?q=8.481607047025747,123.80391177356363`

Clinic operating hours have not yet been provided. Public copy must say to call for current hours rather than inventing a schedule.

The website is public-facing and does not allow patients to create bookings online. Instead, patients can:

- View the clinic's available appointment times.
- Call the clinic to request a booking.
- Search for their existing current or future appointment using the phone number used during booking.
- View clinic information, services, contact details, and location.

Google Calendar acts as the clinic's appointment management system.

Clinic staff manage appointments directly in Google Calendar. The Next.js application reads calendar availability and appointment information through server-side API routes.

The first version does not require:

- Customer accounts
- Customer login
- A custom admin dashboard
- A separate application database
- Online appointment creation

---

## 2. Primary Goals

### Public Website

Build a professional Horcabas Dental Clinic landing page containing:

- Navbar
- Hero section
- Services
- Available schedule
- Call-to-book CTA
- Find My Appointment
- About section
- Clinic/team information
- Contact information
- Map/location
- Footer

### Calendar Integration

Use Google Calendar as the source of truth for:

- Confirmed appointments
- Blocked time
- Dentist unavailability
- Lunch breaks if desired
- Holidays or special closures
- Rescheduled appointments
- Cancelled appointments

### Appointment Availability

The website should:

1. Define normal clinic operating hours.
2. Generate possible appointment slots.
3. Query Google Calendar for busy periods.
4. Remove overlapping busy slots.
5. Display only available appointment times to visitors.

Visitors cannot reserve a slot from the website.

The page should clearly state:

> Please call the clinic to reserve an appointment.

### Appointment Search

Patients should be able to search for an existing appointment using their phone number.

The search must:

- Run server-side.
- Only search present/in-progress and future appointments.
- Never return completed past appointments.
- Never expose private Google Calendar event data directly.
- Return only sanitized appointment information.

---

## 3. User Roles

### Visitor / Patient

No login required.

Can:

- Browse the website.
- View services.
- View available appointment times.
- Call the clinic.
- Search their current/upcoming appointment.

Cannot:

- Create an appointment.
- Edit an appointment.
- Cancel an appointment.
- Access Google Calendar.
- View another patient's private information.

### Clinic Staff / Admin

Uses Google Calendar directly.

Can:

- Create appointments.
- Edit appointments.
- Reschedule appointments.
- Cancel appointments.
- Block unavailable time.
- Add special closures.

No custom admin panel is required for the MVP.

---

## 4. Booking Workflow

1. Visitor opens the dental clinic website.
2. Visitor checks available appointment times.
3. Visitor calls the clinic.
4. Clinic staff confirms the requested time.
5. Clinic staff creates the appointment in Google Calendar.
6. The time becomes busy.
7. The website stops showing that time as available.
8. The patient can later search for their appointment using their phone number.

---

## 5. Google Calendar Event Convention

For the MVP, clinic staff can create normal Google Calendar events.

Recommended event format:

### Event title

Use the service name where appropriate.

Example:

```text
Dental Cleaning
```

### Event description

Use a predictable structure:

```text
Patient: Juan Dela Cruz
Phone: +639171234567
Service: Dental Cleaning
```

Phone numbers should be stored in normalized international format when possible:

```text
+639171234567
```

Do not expose the description to the frontend.

---

## 6. Appointment Availability Rules

Google Calendar should not determine the clinic's normal working schedule by itself.

The application should define standard clinic hours.

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

export const slotDurationMinutes = 30;
```

The availability algorithm should:

1. Read clinic hours for the requested day.
2. Generate slots based on the configured duration.
3. Query Google Calendar busy periods.
4. Remove slots overlapping busy periods.
5. Remove slots in the past.
6. Return available slots sorted chronologically.

---

## 7. Public Availability API

Recommended endpoint:

```text
GET /api/availability?date=YYYY-MM-DD
```

Responsibilities:

- Validate the requested date.
- Reject invalid date ranges.
- Determine clinic hours.
- Query Google Calendar server-side.
- Calculate free slots.
- Return only public availability data.

Example response:

```json
{
  "date": "2026-09-01",
  "slots": [
    "09:00",
    "09:30",
    "10:30",
    "11:00",
    "13:00",
    "14:30"
  ]
}
```

Never return:

- Patient names
- Phone numbers
- Google Calendar descriptions
- Organizer information
- Attendee information
- Internal Calendar IDs unless truly necessary

---

## 8. Appointment Search

Recommended endpoint:

```text
POST /api/appointments/search
```

Example request:

```json
{
  "phone": "09171234567"
}
```

The server should normalize it to:

```text
+639171234567
```

Then query Google Calendar.

The query must use a lower time boundary based on the current date/time so completed past appointments are not returned.

The result should include appointments that:

- Are happening now, or
- Start in the future

Example sanitized response:

```json
{
  "appointments": [
    {
      "date": "2026-09-01",
      "start": "10:00",
      "end": "10:30",
      "service": "Dental Cleaning"
    }
  ]
}
```

Do not return the entire Google Calendar event object.

---

## 9. Phone Number Normalization

Create a reusable utility.

Example accepted inputs:

```text
09171234567
0917 123 4567
0917-123-4567
+63 917 123 4567
639171234567
```

Preferred normalized result:

```text
+639171234567
```

Invalid inputs should be rejected before querying Google.

---

## 10. Privacy and Security

This project handles appointment-related information, so the implementation should follow strict privacy rules.

### Required rules

- Google credentials must only exist server-side.
- Never expose service-account credentials to the browser.
- Never use `NEXT_PUBLIC_` for Google private credentials.
- Never expose raw Google Calendar event objects.
- Never expose patient names, descriptions, phone numbers, notes, attendees, or organizer details on public endpoints unless explicitly approved.
- Only return the minimum information necessary.
- Add rate limiting to appointment search.
- Use generic empty-result messaging.
- Prefer exact phone matching after normalization.
- Avoid logging patient phone numbers in production logs.

### Environment variables

Example:

```env
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_CALENDAR_ID=
```

These should remain server-only.

---

## 11. Recommended Project Structure

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

---

## 12. Landing Page Sections

Recommended order:

1. Navbar
2. Hero
3. Services
4. Available Appointments
5. Call-to-Book CTA
6. Find My Appointment
7. About the Clinic
8. Dentist / Team
9. Location / Map
10. Contact
11. Footer

The main CTA should prioritize calling the clinic.

Example:

```text
Call to Book
```

On mobile, use a `tel:` link.

---

## 13. Available Schedule UI

Keep the public schedule simple.

Recommended presentation:

```text
Available Appointments

Monday, September 1

9:00 AM
9:30 AM
10:30 AM
11:00 AM
1:00 PM
2:30 PM

Appointments are scheduled by phone.
Please call the clinic to reserve your preferred time.

[ Call Clinic ]
```

Do not make available times look like an online booking button unless the action clearly explains that booking requires a phone call.

---

## 14. Find My Appointment UI

Recommended interface:

```text
Find My Appointment

Enter the phone number used when booking.

[ 0917 123 4567 ]

[ Search ]
```

Possible result:

```text
Upcoming Appointment

Tuesday, September 1
10:00 AM – 10:30 AM
Dental Cleaning

Need to reschedule?
Please call the clinic.
```

For privacy, consider adding an additional verification field later, such as last name.

---

## 15. Google Calendar Integration

Use the Google Calendar API only from server-side code.

Recommended capabilities:

### Availability

Use Google's free/busy functionality to retrieve busy periods.

### Appointment Search

Use event listing/search functionality to find matching current/future events.

For the MVP, phone numbers may be stored in the event description using a strict convention.

If appointment creation later moves into the application, migrate phone numbers to private extended event properties for more structured searches.

---

## 16. Caching

Availability can be cached briefly to reduce API traffic.

Recommended initial cache duration:

```text
30–60 seconds
```

Appointment search should generally not use long-lived caching because users expect current information.

---

## 17. Error Handling

Public-facing errors should be friendly and non-technical.

Examples:

### Calendar unavailable

```text
Schedule information is temporarily unavailable.
Please call the clinic for current availability.
```

### No appointment found

```text
No upcoming appointment was found with the information provided.
Please check the phone number or contact the clinic.
```

Do not reveal whether a phone number exists elsewhere in the system.

---

## 18. MVP Development Phases

### Phase 1 — Landing Page

- Build page layout.
- Add navbar.
- Add hero.
- Add services.
- Add about.
- Add contact/location.
- Add responsive design.
- Add call CTA.

### Phase 2 — Google Calendar Setup

- Create dedicated clinic calendar.
- Configure Google Cloud project.
- Enable Calendar API.
- Configure server-side authentication.
- Store credentials in environment variables.
- Verify read-only calendar access.

### Phase 3 — Availability

- Define clinic hours.
- Create slot generation logic.
- Query busy periods.
- Calculate free times.
- Build `/api/availability`.
- Build `AvailableSchedule` component.
- Add loading and error states.

### Phase 4 — Appointment Search

- Define Calendar event description convention.
- Implement phone normalization.
- Build `/api/appointments/search`.
- Filter to current/future appointments.
- Sanitize results.
- Build `AppointmentSearch` component.
- Add rate limiting.

### Phase 5 — Production Hardening

- Validate all API input.
- Add rate limiting.
- Remove sensitive logging.
- Add caching.
- Improve mobile UX.
- Test timezone behavior.
- Test daylight/time/date boundaries.
- Test Google Calendar failures.
- Add accessibility improvements.
- Add metadata and SEO.

---

## 19. Future Enhancements

Not required for MVP:

- SMS reminders
- Email reminders
- Multiple dentists
- Multiple clinic branches
- Dentist-specific calendars
- Online booking
- Patient accounts
- OTP appointment verification
- Custom admin dashboard
- Appointment history
- Supabase/PostgreSQL
- Analytics
- Google Calendar write integration
- Automated confirmation messages

---

## 20. Definition of Done

The MVP is complete when:

- The landing page is responsive and production-ready.
- Visitors can see clinic services and contact information.
- Visitors can view actual available appointment times derived from Google Calendar.
- Visitors are told to call the clinic to reserve.
- Clinic staff can manage bookings entirely through Google Calendar.
- Visitors can search for their current/upcoming appointment.
- Past completed appointments are never returned in search.
- Google credentials remain server-side.
- No private Calendar event data leaks to the frontend.
- The application handles Calendar/API errors gracefully.
