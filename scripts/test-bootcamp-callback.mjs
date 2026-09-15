import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync("google-apps-script/Code.gs", "utf8");
const rateLimitCache = new Map();
let verificationCalls = 0;
let verificationRequest;
let verificationResult = {
	success: true,
	action: "bootcamp_registration",
	hostname: "savidesignstudios.com",
	"error-codes": [],
};
const context = {
	console,
	HtmlService: {
		XFrameOptionsMode: { ALLOWALL: "ALLOWALL" },
		createHtmlOutput(html) {
			return {
				html,
				setXFrameOptionsMode() {
					return this;
				},
			};
		},
	},
	PropertiesService: {
		getScriptProperties() {
			return {
				getProperty(name) {
					if (name === "TURNSTILE_SECRET_KEY") return "test-secret";
					if (name === "TURNSTILE_HOSTNAMES") {
						return "savidesignstudios.com,savidesignstudios.netlify.app";
					}
					return null;
				},
			};
		},
	},
	UrlFetchApp: {
		fetch(_url, request) {
			verificationCalls += 1;
			verificationRequest = request;
			return {
				getResponseCode: () => 200,
				getContentText: () => JSON.stringify(verificationResult),
			};
		},
	},
	CacheService: {
		getScriptCache() {
			return {
				get: (key) => rateLimitCache.get(key) ?? null,
				put: (key, value) => rateLimitCache.set(key, value),
			};
		},
	},
	LockService: {
		getScriptLock() {
			return { waitLock: () => {}, releaseLock: () => {} };
		},
	},
	Utilities: {
		DigestAlgorithm: { SHA_256: "SHA_256" },
		computeDigest: () => [1],
		base64EncodeWebSafe: () => "test",
	},
};

vm.createContext(context);
vm.runInContext(
	`${source}\nglobalThis.callbackOutput = browserResponse_({ source: "test", submissionId: "test", ok: true });\nglobalThis.verifyTurnstile = verifyTurnstile_;\nglobalThis.enforceRateLimit = enforceSubmissionRateLimit_;\nglobalThis.assertDuplicate = assertNoDuplicateRegistration_;`,
	context,
);

const callbackScript = context.callbackOutput.html.match(
	/<script>([\s\S]*)<\/script>/,
)?.[1];
assert.ok(
	callbackScript,
	"Apps Script response must contain a callback script",
);

function countTargets(script) {
	const calls = { parent: 0, top: 0 };
	vm.runInNewContext(script, {
		window: {
			parent: { postMessage: () => calls.parent++ },
			top: { postMessage: () => calls.top++ },
		},
	});
	return calls;
}

const brokenCallback = callbackScript.replace("window.top", "window.parent");
assert.equal(
	countTargets(brokenCallback).top,
	0,
	"regression must be detectable",
);
assert.deepEqual(countTargets(callbackScript), { parent: 0, top: 1 });

context.verifyTurnstile("valid-token", "123e4567-e89b-12d3-a456-426614174000");
assert.equal(verificationCalls, 1);
assert.equal(verificationRequest.payload.secret, "test-secret");
assert.equal(verificationRequest.payload.response, "valid-token");

verificationResult = {
	success: true,
	action: "wrong_action",
	hostname: "savidesignstudios.com",
};
assert.throws(
	() =>
		context.verifyTurnstile(
			"valid-token",
			"123e4567-e89b-12d3-a456-426614174000",
		),
	/Verification failed/,
);

verificationResult = {
	success: true,
	action: "bootcamp_registration",
	hostname: "attacker.example",
};
assert.throws(
	() =>
		context.verifyTurnstile(
			"valid-token",
			"123e4567-e89b-12d3-a456-426614174000",
		),
	/Verification failed/,
);

verificationResult = {
	success: true,
	action: "bootcamp_registration",
	hostname: "savidesignstudios.com",
	"error-codes": [],
};
assert.throws(() =>
	context.verifyTurnstile("", "123e4567-e89b-12d3-a456-426614174000"),
);

const registration = { email: "test@example.com", phone: "+2348012345678" };
for (let attempt = 0; attempt < 3; attempt += 1) {
	context.enforceRateLimit(registration);
}
assert.throws(
	() => context.enforceRateLimit(registration),
	/Too many attempts/,
);

const headers = ["Email", "Phone Number"];
const keyByHeader = { email: "email", phonenumber: "phone" };
const duplicateRegistration = {
	email: "person@example.com",
	phone: "+2348012345678",
};
const sheet = {
	getLastRow: () => 2,
	getRange: () => ({
		getDisplayValues: () => [
			[duplicateRegistration.email, duplicateRegistration.phone],
		],
	}),
};
assert.throws(
	() =>
		context.assertDuplicate(sheet, headers, keyByHeader, {
			...duplicateRegistration,
		}),
	/person@example.com.*phone number.*\+2348012345678/,
);

console.log("Bootcamp callback and server guards pass.");
