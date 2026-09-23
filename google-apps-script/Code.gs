const SHEET_NAME = "";
const RESPONSE_SOURCE = "savi-bootcamp-registration";
// Keep in sync with REGISTRATION_CLOSED in src/lib/bootcamp-registration.ts.
const REGISTRATION_CLOSED = true;
const REGISTRATION_CLOSED_MESSAGE = "Bootcamp registration has ended.";

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
const EMAIL_PROVIDERS = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
const KNOWN_EMAIL_DOMAINS = EMAIL_PROVIDERS.concat(["mail.com"]);
const SCRIPT_PROPERTIES = PropertiesService.getScriptProperties();
const TURNSTILE_SECRET_KEY = SCRIPT_PROPERTIES.getProperty(
  "TURNSTILE_SECRET_KEY"
);
const TURNSTILE_EXPECTED_ACTION = "bootcamp_registration";
const TURNSTILE_ALLOWED_HOSTNAMES = new Set(
  String(SCRIPT_PROPERTIES.getProperty("TURNSTILE_HOSTNAMES") || "")
    .split(",")
    .map(function (hostname) {
      return hostname.trim().toLowerCase();
    })
    .filter(Boolean)
);
const RATE_LIMIT_WINDOW_SECONDS = 600;
const RATE_LIMIT_MAX_SUBMISSIONS = 3;
// BEGIN GENERATED COUNTRY LIST
const SUPPORTED_COUNTRY_NAMES = new Set([
  "Afghanistan", "Åland Islands", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Ascension Island", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bonaire, Sint Eustatius and Saba", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, Democratic Republic of the", "Cook Islands", "Costa Rica", "Cote d'Ivoire", "Croatia", "Cuba", "Curaçao", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Federated States of Micronesia", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "North Korea", "North Macedonia", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Barthélemy", "Saint Helena", "Saint Kitts and Nevis", "Saint Lucia", "Saint Martin (French Part)", "Saint Pierre and Miquelon", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Sint Maarten", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard and Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tristan da Cunha", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Virgin Islands, British", "Virgin Islands, U.S.", "Wallis and Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
]);
// END GENERATED COUNTRY LIST
const DUPLICATE_REGISTRATION_CONTACT =
  " To update your details, email info@savidesignstudios.com";

const COLUMN_DEFINITIONS = [
  { key: "name", header: "Name", required: true },
  { key: "email", header: "Email", required: true },
  { key: "country", header: "Country", required: true },
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
  return jsonResponse_({
    ok: true,
    service: "Savi Design bootcamp registration",
    registrationOpen: !REGISTRATION_CLOSED,
  });
}

function submissionIdFromEvent_(event) {
  try {
    const payload = parsePayload_(event);
    return String((payload && payload.submissionId) || "");
  } catch (error) {
    return "";
  }
}

function doPost(event) {
  let submissionId = "";

  try {
    if (REGISTRATION_CLOSED) {
      submissionId = submissionIdFromEvent_(event);
      return browserResponse_({
        source: RESPONSE_SOURCE,
        submissionId: submissionId,
        ok: false,
        error: REGISTRATION_CLOSED_MESSAGE,
      });
    }

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
    verifyTurnstile_(payload.verificationToken, submissionId);
    enforceSubmissionRateLimit_(values);
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

function verifyTurnstile_(value, submissionId) {
  const token = String(value || "").trim();
  if (!TURNSTILE_SECRET_KEY || TURNSTILE_ALLOWED_HOSTNAMES.size === 0) {
    throw new Error("Registration verification is unavailable.");
  }
  if (!token || token.length > 2048) {
    throw new Error("Complete the verification before submitting.");
  }

  let response;
  let result;

  try {
    response = UrlFetchApp.fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "post",
        payload: {
          secret: TURNSTILE_SECRET_KEY,
          response: token,
          idempotency_key: submissionId,
        },
        muteHttpExceptions: true,
      },
    );
    result = JSON.parse(response.getContentText());
  } catch (error) {
    console.error("Turnstile Siteverify request failed", error);
    throw new Error("Verification service is unavailable.");
  }

  const responseCode = response.getResponseCode();
  if (responseCode < 200 || responseCode >= 300) {
    console.error("Turnstile Siteverify HTTP status", responseCode);
    throw new Error("Verification service is unavailable.");
  }

  if (!result.success) {
    console.error(
      "Turnstile rejected token",
      JSON.stringify({ errorCodes: result["error-codes"] || [] }),
    );
    throw new Error("Verification failed.");
  }

  if (result.action !== TURNSTILE_EXPECTED_ACTION) {
    console.error("Turnstile action mismatch", result.action);
    throw new Error("Verification failed.");
  }

  const hostname = String(result.hostname || "").toLowerCase();
  if (!TURNSTILE_ALLOWED_HOSTNAMES.has(hostname)) {
    console.error("Turnstile hostname rejected", hostname);
    throw new Error("Verification failed.");
  }
}

function enforceSubmissionRateLimit_(values) {
  const cache = CacheService.getScriptCache();
  const identifier = values.email + "|" + values.phone;
  const digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    identifier,
  );
  const cacheKey = "registration-rate-" + Utilities.base64EncodeWebSafe(digest);
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const attempts = Number(cache.get(cacheKey) || "0");
    if (attempts >= RATE_LIMIT_MAX_SUBMISSIONS) {
      throw new Error("Too many attempts. Please try again later.");
    }
    cache.put(cacheKey, String(attempts + 1), RATE_LIMIT_WINDOW_SECONDS);
  } finally {
    lock.releaseLock();
  }
}

function validatePayload_(payload) {
  const values = {
    submittedAt: new Date(),
    name: requiredName_(payload.name),
    email: requiredText_(payload.email, "Email", 254).toLowerCase(),
    country: requiredCountry_(payload.country),
    phone: requiredText_(payload.phone, "Phone", 16),
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

  if (hasLikelyProviderTypo_(values.email)) {
    throw new Error("Check your email address. The domain may be misspelled.");
  }

  if (!/^\+[1-9]\d{6,14}$/.test(values.phone)) {
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
    assertNoDuplicateRegistration_(sheet, headers, keyByHeader, values);
    sheet.appendRow(row);
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
}

function assertNoDuplicateRegistration_(sheet, headers, keyByHeader, values) {
  const emailColumn = headers.findIndex(function (header) {
    return keyByHeader[normalizeHeader_(header)] === "email";
  });
  const phoneColumn = headers.findIndex(function (header) {
    return keyByHeader[normalizeHeader_(header)] === "phone";
  });
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) return;

  const registrations = sheet
    .getRange(2, 1, lastRow - 1, headers.length)
    .getDisplayValues();
  const duplicateEmail = registrations.some(function (registration) {
    const email = String(registration[emailColumn] || "").trim().toLowerCase();
    return email === values.email;
  });
  const duplicatePhone = registrations.some(function (registration) {
    const phone = String(registration[phoneColumn] || "").trim();
    return phone === values.phone;
  });

  if (duplicateEmail || duplicatePhone) {
    const duplicateValues = [];
    if (duplicateEmail) duplicateValues.push("email (" + values.email + ")");
    if (duplicatePhone) duplicateValues.push("phone number (" + values.phone + ")");
    throw new Error(
      "A registration already exists with " +
        duplicateValues.join(" and ") +
        "." +
        DUPLICATE_REGISTRATION_CONTACT,
    );
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

function requiredName_(value) {
  const name = requiredText_(value, "Name", 120);
  if (name.length < 2) {
    throw new Error("Name is invalid.");
  }
  return name;
}

function requiredCountry_(value) {
  const country = requiredText_(value, "Country", 80);
  if (!SUPPORTED_COUNTRY_NAMES.has(country)) {
    throw new Error("Country is invalid.");
  }
  return country;
}

function hasLikelyProviderTypo_(email) {
  const domain = String(email).toLowerCase().split("@")[1];
  if (!domain || KNOWN_EMAIL_DOMAINS.indexOf(domain) !== -1) return false;

  return EMAIL_PROVIDERS.some(function (provider) {
    return editDistance_(domain, provider) === 1;
  });
}

function editDistance_(first, second) {
  const matrix = Array.from({ length: first.length + 1 }, function (_, firstIndex) {
    return Array.from({ length: second.length + 1 }, function (_, secondIndex) {
      if (firstIndex === 0) return secondIndex;
      if (secondIndex === 0) return firstIndex;
      return 0;
    });
  });

  for (let firstIndex = 1; firstIndex <= first.length; firstIndex += 1) {
    for (let secondIndex = 1; secondIndex <= second.length; secondIndex += 1) {
      const substitutionCost = first[firstIndex - 1] === second[secondIndex - 1] ? 0 : 1;
      let distance = Math.min(
        matrix[firstIndex - 1][secondIndex] + 1,
        matrix[firstIndex][secondIndex - 1] + 1,
        matrix[firstIndex - 1][secondIndex - 1] + substitutionCost,
      );

      if (
        firstIndex > 1 &&
        secondIndex > 1 &&
        first[firstIndex - 1] === second[secondIndex - 2] &&
        first[firstIndex - 2] === second[secondIndex - 1]
      ) {
        distance = Math.min(distance, matrix[firstIndex - 2][secondIndex - 2] + 1);
      }

      matrix[firstIndex][secondIndex] = distance;
    }
  }

  return matrix[first.length][second.length];
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
