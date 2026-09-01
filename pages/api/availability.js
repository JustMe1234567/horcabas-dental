import { getAvailability } from "../../server/schedule-service.js";

export default async function handler(request, response) {
  if (request.method !== "GET") return response.status(405).json({ error: "Method not allowed." });
  const year = Number.parseInt(request.query.year, 10);
  const month = Number.parseInt(request.query.month, 10);
  if (!Number.isInteger(year) || year < 2020 || year > 2100 || !Number.isInteger(month) || month < 1 || month > 12) {
    return response.status(400).json({ error: "A valid year and month are required." });
  }
  try {
    const dates = await getAvailability(year, month);
    response.setHeader("Cache-Control", "public, max-age=60, s-maxage=60, stale-while-revalidate=120");
    return response.status(200).json({ dates });
  } catch (error) {
    console.error("Availability lookup failed:", error.message);
    return response.status(503).json({ error: "Calendar availability is temporarily unavailable." });
  }
}
