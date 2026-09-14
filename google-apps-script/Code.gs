const SHEET_NAME = "";
const RESPONSE_SOURCE = "savi-bootcamp-registration";

const OCCUPATIONS = [
  "Student",
  "Employed",
  "Freelancer",
  "Entrepreneur",
  "Job Seeker",
];

const EXPERIENCE_LEVELS = [
  "Complete Beginner (little or no knowledge)",
  "Beginner (0 - 6 months)",
  "Entry Level (6 months - 1 Year)",
];

const LEARNING_TIMES = [
  "I haven't started",
  "0 - 3 months",
  "3 - 6 months",
  "6 - 12 months",
  "More than a year",
];

const YES_NO_OPTIONS = ["Yes", "No"];

const COLUMN_DEFINITIONS = [
  { key: "name", header: "Name", required: true },
  { key: "email", header: "Email", required: true },
  { key: "phone", header: "Phone Number", required: true },
  { key: "occupation", header: "Occupation", required: true },
  { key: "experience", header: "Experience", required: true },
  { key: "learningTime", header: "Learning Time", required: true },
  { key: "figmaExperience", header: "Figma Experience", required: true },
  { key: "hasPortfolio", header: "Portfolio", required: true },
  { key: "submittedAt", header: "Submitted At", required: false },
  { key: "consent", header: "Consent", required: false },
];

function doGet() {
  return jsonResponse_({ ok: true, service: "Savi Design bootcamp registration" });
}

function doPost(event) {
  let submissionId = "";

  try {
    const payload = parsePayload_(event);
    submissionId = requiredSubmissionId_(payload.submissionId);

    // Honeypot submissions get a harmless success response without being saved.
    if (payload.website) {
      return browserResponse_({
        source: RESPONSE_SOURCE,
        submissionId: submissionId,
        ok: true,
      });
    }

    const values = validatePayload_(payload);
    appendRegistration_(values);

    return browserResponse_({
      source: RESPONSE_SOURCE,
      submissionId: submissionId,
      ok: true,
    });
  } catch (error) {
    console.error(error);
    return browserResponse_({
      source: RESPONSE_SOURCE,
      submissionId: submissionId,
      ok: false,
      error: String(error.message || error),
    });
  }
}

function parsePayload_(event) {
  if (event && event.parameter && event.parameter.payload) {
    return JSON.parse(event.parameter.payload);
  }

  if (!event || !event.postData || !event.postData.contents) {
    throw new Error("Missing request body.");
  }

  return JSON.parse(event.postData.contents);
}

function requiredSubmissionId_(value) {
  const id = String(value || "");
  if (!/^[a-f0-9-]{36}$/i.test(id)) {
    throw new Error("Invalid submission ID.");
  }
  return id;
}

function validatePayload_(payload) {
  const values = {
    submittedAt: new Date(),
    name: requiredText_(payload.name, "Name", 120),
    email: requiredText_(payload.email, "Email", 254).toLowerCase(),
    phone: requiredText_(payload.phone, "Phone", 40),
    occupation: requiredOption_(payload.occupation, "Occupation", OCCUPATIONS),
    experience: requiredOption_(
      payload.experience,
      "UI/UX experience",
      EXPERIENCE_LEVELS,
    ),
    learningTime: requiredOption_(
      payload.learningTime,
      "Product Design learning time",
      LEARNING_TIMES,
    ),
    figmaExperience: requiredOption_(
      payload.figmaExperience,
      "Figma experience",
      YES_NO_OPTIONS,
    ),
    hasPortfolio: requiredOption_(
      payload.hasPortfolio,
      "Portfolio status",
      YES_NO_OPTIONS,
    ),
    consent: payload.consent === true ? "Yes" : "",
  };

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    throw new Error("Invalid email address.");
  }

  const phoneDigits = values.phone.replace(/\D/g, "");
  if (!/^[+\d\s().-]+$/.test(values.phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    throw new Error("Invalid phone number.");
  }

  if (!values.consent) {
    throw new Error("Consent is required.");
  }

  return values;
}

function appendRegistration_(values) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = SHEET_NAME
    ? spreadsheet.getSheetByName(SHEET_NAME)
    : spreadsheet.getSheets()[0];

  if (!sheet) {
    throw new Error("Registration sheet not found.");
  }

  const lastColumn = sheet.getLastColumn();
  if (lastColumn === 0) {
    throw new Error("Add the header row before accepting registrations.");
  }

  const headers = sheet
    .getRange(1, 1, 1, lastColumn)
    .getDisplayValues()[0];
  const keyByHeader = buildHeaderMap_();
  const foundKeys = new Set();
  const row = headers.map(function (header) {
    const key = keyByHeader[normalizeHeader_(header)];
    if (!key) return "";

    foundKeys.add(key);
    return safeCellValue_(values[key]);
  });

  const missingColumns = COLUMN_DEFINITIONS
    .filter(function (column) {
      return column.required && !foundKeys.has(column.key);
    })
    .map(function (column) {
      return column.header;
    });

  if (missingColumns.length) {
    throw new Error("Missing sheet columns: " + missingColumns.join(", "));
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    sheet.appendRow(row);
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
}

function buildHeaderMap_() {
  return COLUMN_DEFINITIONS.reduce(function (map, column) {
    map[normalizeHeader_(column.header)] = column.key;
    return map;
  }, {});
}

function normalizeHeader_(value) {
  return String(value).trim().toLowerCase().replace(/[^a-z0-9]/g, "");
}

function requiredText_(value, label, maxLength) {
  const text = String(value || "").trim();
  if (!text || text.length > maxLength) {
    throw new Error(label + " is invalid.");
  }
  return text;
}

function requiredOption_(value, label, options) {
  const text = String(value || "").trim();
  if (options.indexOf(text) === -1) {
    throw new Error(label + " is invalid.");
  }
  return text;
}

function safeCellValue_(value) {
  if (value instanceof Date) return value;

  const text = String(value == null ? "" : value);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function browserResponse_(data) {
  const message = JSON.stringify(data).replace(/</g, "\\u003c");
  const html =
    "<!doctype html><meta charset=\"utf-8\">" +
    "<script>window.top.postMessage(" +
    message +
    ", '*');<\/script>";

  return HtmlService
    .createHtmlOutput(html)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
