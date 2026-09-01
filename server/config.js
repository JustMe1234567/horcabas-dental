const asPositiveInteger = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
};

export const config = {
  mode: process.env.CALENDAR_MODE === "google" ? "google" : "mock",
  port: asPositiveInteger(process.env.PORT, 3000),
  timeZone: process.env.CLINIC_TIME_ZONE || "Asia/Manila",
  calendarId: process.env.GOOGLE_CALENDAR_ID || "",
  serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "",
  privateKey: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
  slotDurationMinutes: asPositiveInteger(process.env.SLOT_DURATION_MINUTES, 60),
  lookupMonthsAhead: asPositiveInteger(process.env.LOOKUP_MONTHS_AHEAD, 12)
};

export function assertGoogleConfiguration() {
  const missing = [];
  if (!config.calendarId || config.calendarId.startsWith("replace-")) missing.push("GOOGLE_CALENDAR_ID");
  if (!config.serviceAccountEmail || config.serviceAccountEmail.startsWith("replace-")) missing.push("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  if (!config.privateKey || config.privateKey.includes("REPLACE_WITH_PRIVATE_KEY")) missing.push("GOOGLE_PRIVATE_KEY");
  if (missing.length) throw new Error(`Missing Google Calendar configuration: ${missing.join(", ")}`);
}
