export class CalendarApiError extends Error {
  constructor(message, { status = 0, code = "calendar_error" } = {}) {
    super(message);
    this.name = "CalendarApiError";
    this.status = status;
    this.code = code;
  }
}

async function requestJson(url, options = {}) {
  let response;
  try {
    response = await fetch(url, options);
  } catch {
    throw new CalendarApiError("We couldn't connect to the clinic schedule. Please try again.", {
      code: "network_error"
    });
  }

  const responseText = await response.text();
  let payload = null;
  if (responseText.trim()) {
    try {
      payload = JSON.parse(responseText);
    } catch {
      throw new CalendarApiError("The schedule service returned an unexpected response. Please try again.", {
        status: response.status,
        code: "invalid_response"
      });
    }
  }

  if (!response.ok) {
    const fallbackMessages = {
      400: "Please check the information you entered.",
      404: "The schedule service is not available at this address.",
      429: "Too many lookup attempts. Please wait a few minutes and try again.",
      500: "The schedule service encountered a problem. Please try again.",
      502: "The clinic schedule is temporarily unreachable. Please try again.",
      503: "The clinic schedule is temporarily unavailable. Please try again."
    };
    const message = payload && typeof payload.error === "string"
      ? payload.error
      : fallbackMessages[response.status] || "We couldn't complete the schedule request. Please try again.";
    throw new CalendarApiError(message, { status: response.status, code: "api_error" });
  }

  if (!payload || typeof payload !== "object") {
    throw new CalendarApiError("The schedule service returned no information. Please try again.", {
      status: response.status,
      code: "empty_response"
    });
  }
  return payload;
}

function toLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export async function getCalendarEvents({ year, month }) {
  const payload = await requestJson(`/api/availability?year=${year}&month=${month + 1}`);
  if (!Array.isArray(payload.dates)) {
    throw new CalendarApiError("Calendar availability could not be read. Please try again.", { code: "invalid_data" });
  }
  return payload.dates;
}

export async function lookupSchedule(phone) {
  const payload = await requestJson("/api/lookup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone })
  });
  if (!Array.isArray(payload.appointments) || typeof payload.found !== "boolean") {
    throw new CalendarApiError("Schedule information could not be read. Please try again.", { code: "invalid_data" });
  }
  return payload;
}

export { toLocalDateKey };
