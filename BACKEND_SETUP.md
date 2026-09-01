# Horcabas Calendar setup for Next.js

The backend starts in mock mode. No real Google credentials are required until the clinic calendar is ready.

## Run locally

```bash
pnpm install
pnpm dev
```

Next.js serves the website and its `/api` calendar routes together on port 3000.

## Secretary event format

Create the event as **Busy** and use this exact description format:

```text
PATIENT: Maria Santos
PHONE: +639171234567
SERVICE: Dental consultation
STATUS: CONFIRMED
NOTES: Internal note
```

Only `PHONE`, `SERVICE`, and `STATUS` are parsed. Patient names, phone numbers, notes, descriptions, and Google Calendar links are never returned to the website.

## Connect Google Calendar

1. Create a Google Cloud project and enable the Google Calendar API.
2. Create a service account and download its credentials.
3. Share the dedicated clinic calendar with the service-account email using **See all event details** access.
4. Find the calendar ID under Google Calendar **Settings and sharing > Integrate calendar**.
5. Add the calendar ID, service-account email, and private key to `.env`.
6. Change `CALENDAR_MODE=mock` to `CALENDAR_MODE=google`.
7. Restart the Next.js development server or redeploy the project.

Never place these credentials in frontend code or commit the completed `.env` file.

## Clinic hours

The backend generates one-hour appointment slots at:

- 8:00 AM
- 9:00 AM
- 10:00 AM
- 11:00 AM
- 1:00 PM
- 2:00 PM
- 3:00 PM
- 4:00 PM

The final morning slot ends at 12:00 PM and the final afternoon slot ends at 5:00 PM. Sundays are always excluded.
