import { config } from "./config.js";
import { getEventsForMonth, getUpcomingEvents } from "./calendar-data.js";

const CLINIC_HOURS = [8, 9, 10, 11, 13, 14, 15, 16];
const DISPLAY_TIME = new Intl.DateTimeFormat("en-PH", {
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: config.timeZone
});
const DISPLAY_DATE = new Intl.DateTimeFormat("en-PH", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: config.timeZone
});

const pad = (value) => String(value).padStart(2, "0");
const toKey = (year, month, day) => `${year}-${pad(month)}-${pad(day)}`;
const slotStart = (key, hour) => new Date(`${key}T${pad(hour)}:00:00+08:00`);

export function normalizePhone(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = `63${digits.slice(1)}`;
  else if (digits.length === 10 && digits.startsWith("9")) digits = `63${digits}`;
  if (digits.length < 10 || digits.length > 15) return null;
  return `+${digits}`;
}

export function parseDescription(description = "") {
  const fields = {};
  for (const line of description.split(/\r?\n/)) {
    const match = line.match(/^([A-Z][A-Z _-]*):\s*(.+)$/i);
    if (match) fields[match[1].trim().toUpperCase()] = match[2].trim();
  }
  return fields;
}

const PHONE_FIELDS = [
  "PHONE",
  "PHONE NUMBER",
  "NUMBER",
  "CONTACT",
  "CONTACT NUMBER",
  "MOBILE",
  "MOBILE NUMBER"
];

export function getPhoneFromDescription(description = "") {
  const fields = parseDescription(description);
  return PHONE_FIELDS.map((field) => fields[field]).find(Boolean) || null;
}

function overlaps(startA, endA, startB, endB) {
  return startA < endB && endA > startB;
}

export async function getAvailability(year, month) {
  const events = await getEventsForMonth(year, month);
  const daysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const now = new Date();
  const availability = [];

  for (let day = 1; day <= daysInMonth; day += 1) {
    const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
    if (weekday === 0) continue;
    const key = toKey(year, month, day);
    const openSlots = CLINIC_HOURS.filter((hour) => {
      const start = slotStart(key, hour);
      const end = new Date(start.getTime() + config.slotDurationMinutes * 60_000);
      if (end <= now) return false;
      return !events.some((event) => {
        if (event.start?.date && event.end?.date) return key >= event.start.date && key < event.end.date;
        const eventStart = new Date(event.start?.dateTime);
        const eventEnd = new Date(event.end?.dateTime);
        return Number.isFinite(eventStart.getTime()) && Number.isFinite(eventEnd.getTime()) && overlaps(start, end, eventStart, eventEnd);
      });
    });

    if (openSlots.length) {
      availability.push({
        date: key,
        slots: openSlots.map((hour) => DISPLAY_TIME.format(slotStart(key, hour))),
        source: config.mode
      });
    }
  }
  return availability;
}

export async function findSchedulesByPhone(phone) {
  const normalized = normalizePhone(phone);
  if (!normalized) return { valid: false, appointments: [] };
  const events = await getUpcomingEvents();
  const appointments = events.flatMap((event) => {
    const fields = parseDescription(event.description);
    if (normalizePhone(getPhoneFromDescription(event.description)) !== normalized) return [];
    const startValue = event.start?.dateTime || event.start?.date;
    const endValue = event.end?.dateTime || event.end?.date;
    const start = new Date(startValue);
    const end = new Date(endValue);
    if (!Number.isFinite(start.getTime())) return [];
    return [{
      date: DISPLAY_DATE.format(start),
      time: event.start?.dateTime ? `${DISPLAY_TIME.format(start)} to ${DISPLAY_TIME.format(end)}` : "All day",
      service: fields.SERVICE || "Dental appointment",
      status: fields.STATUS || "Scheduled",
      location: event.location || "Horcabas Dental Clinic"
    }];
  });
  return { valid: true, appointments };
}
