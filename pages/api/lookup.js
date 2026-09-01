import { findSchedulesByPhone } from "../../server/schedule-service.js";

const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const LIMIT = 20;

function isRateLimited(key) {
  const now = Date.now();
  const recent = (attempts.get(key) || []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  attempts.set(key, recent);
  return recent.length > LIMIT;
}

export default async function handler(request, response) {
  if (request.method !== "POST") return response.status(405).json({ error: "Method not allowed." });
  response.setHeader("Cache-Control", "no-store");
  const key = request.headers["x-forwarded-for"]?.split(",")[0]?.trim() || request.socket.remoteAddress || "unknown";
  if (isRateLimited(key)) return response.status(429).json({ error: "Too many lookup attempts. Please wait before trying again." });
  try {
    const result = await findSchedulesByPhone(request.body?.phone);
    if (!result.valid) return response.status(400).json({ error: "Enter a valid phone number." });
    return response.status(200).json({ found: result.appointments.length > 0, appointments: result.appointments });
  } catch (error) {
    console.error("Schedule lookup failed:", error.message);
    return response.status(503).json({ error: "Schedule lookup is temporarily unavailable." });
  }
}
