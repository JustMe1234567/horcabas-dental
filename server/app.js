import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { config } from "./config.js";
import { findSchedulesByPhone, getAvailability } from "./schedule-service.js";

const app = express();

app.disable("x-powered-by");
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: "10kb" }));

app.get("/api/health", (_request, response) => {
  response.json({ ok: true, calendarMode: config.mode });
});

app.get("/api/availability", async (request, response) => {
  const year = Number.parseInt(request.query.year, 10);
  const month = Number.parseInt(request.query.month, 10);
  if (!Number.isInteger(year) || year < 2020 || year > 2100 || !Number.isInteger(month) || month < 1 || month > 12) {
    return response.status(400).json({ error: "A valid year and month are required." });
  }
  try {
    const dates = await getAvailability(year, month);
    return response.set("Cache-Control", "public, max-age=60").json({ dates });
  } catch (error) {
    console.error("Availability lookup failed:", error.message);
    return response.status(503).json({ error: "Calendar availability is temporarily unavailable." });
  }
});

const lookupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many lookup attempts. Please wait before trying again." }
});

const lookupHandler = async (request, response) => {
  response.set("Cache-Control", "no-store");
  try {
    const result = await findSchedulesByPhone(request.body?.phone);
    if (!result.valid) return response.status(400).json({ error: "Enter a valid phone number." });
    return response.json({ found: result.appointments.length > 0, appointments: result.appointments });
  } catch (error) {
    console.error("Schedule lookup failed:", error.message);
    return response.status(503).json({ error: "Schedule lookup is temporarily unavailable." });
  }
};

app.post(["/api/lookup", "/api/schedules/lookup"], lookupLimiter, lookupHandler);

app.use("/api", (_request, response) => {
  response.status(404).json({ error: "The requested calendar service was not found." });
});

app.use((error, request, response, next) => {
  if (!request.path.startsWith("/api")) return next(error);
  console.error("API request failed:", error.message);
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return response.status(400).json({ error: "The request contained invalid information." });
  }
  return response.status(500).json({ error: "The calendar service encountered an unexpected problem." });
});

export default app;
