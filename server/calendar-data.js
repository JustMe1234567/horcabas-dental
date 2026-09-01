import { google } from "googleapis";
import { assertGoogleConfiguration, config } from "./config.js";

const READ_ONLY_SCOPE = "https://www.googleapis.com/auth/calendar.events.readonly";
let calendarClient;

function getCalendarClient() {
  if (calendarClient) return calendarClient;
  assertGoogleConfiguration();
  const auth = new google.auth.JWT({
    email: config.serviceAccountEmail,
    key: config.privateKey,
    scopes: [READ_ONLY_SCOPE]
  });
  calendarClient = google.calendar({ version: "v3", auth });
  return calendarClient;
}

function pad(value) {
  return String(value).padStart(2, "0");
}

function dateKey(year, month, day) {
  return `${year}-${pad(month)}-${pad(day)}`;
}

function zonedIso(key, hour, minute = 0) {
  return `${key}T${pad(hour)}:${pad(minute)}:00+08:00`;
}

function monthBounds(year, month) {
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  return {
    timeMin: zonedIso(dateKey(year, month, 1), 0),
    timeMax: zonedIso(dateKey(nextYear, nextMonth, 1), 0)
  };
}

async function listGoogleEvents({ timeMin, timeMax }) {
  const calendar = getCalendarClient();
  const items = [];
  let pageToken;
  do {
    const response = await calendar.events.list({
      calendarId: config.calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
      showDeleted: false,
      maxResults: 250,
      pageToken
    });
    items.push(...(response.data.items || []));
    pageToken = response.data.nextPageToken;
  } while (pageToken);
  return items;
}

function mockBusyEvents(year, month) {
  const events = [];
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  for (let day = 1; day <= days; day += 1) {
    const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
    if (weekday === 0) continue;
    const key = dateKey(year, month, day);
    const blockedHours = [8, 9, 10, 11, 13, 14, 15, 16].filter((hour) => (day + hour + month) % 4 === 0);
    blockedHours.forEach((hour) => events.push({
      start: { dateTime: zonedIso(key, hour) },
      end: { dateTime: zonedIso(key, hour + 1) }
    }));
  }
  return events;
}

export async function getEventsForMonth(year, month) {
  if (config.mode === "mock") return mockBusyEvents(year, month);
  return listGoogleEvents(monthBounds(year, month));
}

export async function getUpcomingEvents() {
  if (config.mode === "mock") {
    const start = new Date();
    start.setDate(start.getDate() + 3);
    start.setHours(10, 0, 0, 0);
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    return [{
      summary: "Dental Appointment",
      description: "PATIENT: Sample Patient\nPHONE: +639171234567\nSERVICE: Dental consultation\nSTATUS: CONFIRMED\nNOTES: Hidden internal note",
      location: "Horcabas Dental Clinic",
      start: { dateTime: start.toISOString() },
      end: { dateTime: end.toISOString() }
    }];
  }

  const now = new Date();
  const timeMax = new Date(now);
  timeMax.setMonth(timeMax.getMonth() + config.lookupMonthsAhead);
  return listGoogleEvents({ timeMin: now.toISOString(), timeMax: timeMax.toISOString() });
}
