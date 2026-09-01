import test from "node:test";
import assert from "node:assert/strict";
import { lookupSchedule } from "../src/calendar-service.js";

test("turns an empty failed response into a friendly API error", async () => {
  global.fetch = async () => new Response("", { status: 502 });
  await assert.rejects(
    lookupSchedule("09171234567"),
    (error) => error.code === "api_error" && !error.message.includes("JSON")
  );
});

test("turns malformed response content into a friendly API error", async () => {
  global.fetch = async () => new Response("<html>Proxy failed</html>", { status: 500 });
  await assert.rejects(
    lookupSchedule("09171234567"),
    (error) => error.code === "invalid_response" && !error.message.includes("JSON")
  );
});

test("handles an unreachable backend without exposing a fetch exception", async () => {
  global.fetch = async () => { throw new TypeError("fetch failed"); };
  await assert.rejects(
    lookupSchedule("09171234567"),
    (error) => error.code === "network_error" && !error.message.includes("fetch")
  );
});

test("preserves a safe JSON validation message from the backend", async () => {
  global.fetch = async () => new Response(JSON.stringify({ error: "Enter a valid phone number." }), {
    status: 400,
    headers: { "Content-Type": "application/json" }
  });
  await assert.rejects(
    lookupSchedule("invalid"),
    (error) => error.status === 400 && error.message === "Enter a valid phone number."
  );
});
