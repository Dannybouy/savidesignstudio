export interface BootcampRegistrationPayload {
	name: string;
	email: string;
	phone: string;
	occupation: string;
	experience: string;
	learningTime: string;
	figmaExperience: string;
	hasPortfolio: string;
	consent: boolean;
}

const REQUEST_TIMEOUT_MS = 15_000;
const RESPONSE_SOURCE = "savi-bootcamp-registration";

interface SubmissionResponse {
	source: typeof RESPONSE_SOURCE;
	submissionId: string;
	ok: boolean;
	error?: string;
}

function isAppsScriptOrigin(origin: string) {
	try {
		const { hostname, protocol } = new URL(origin);
		return (
			protocol === "https:" &&
			(hostname === "script.google.com" ||
				hostname === "script.googleusercontent.com" ||
				hostname.endsWith(".googleusercontent.com"))
		);
	} catch {
		return false;
	}
}

function isSubmissionResponse(value: unknown): value is SubmissionResponse {
	if (!value || typeof value !== "object") return false;

	const response = value as Partial<SubmissionResponse>;
	return (
		response.source === RESPONSE_SOURCE &&
		typeof response.submissionId === "string" &&
		typeof response.ok === "boolean"
	);
}

export async function submitBootcampRegistration(
	payload: BootcampRegistrationPayload,
) {
	const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL?.trim();

	if (!endpoint) {
		throw new Error("Missing VITE_GOOGLE_SHEETS_WEB_APP_URL.");
	}

	const submissionId = crypto.randomUUID();
	const targetName = `bootcamp-registration-${submissionId}`;
	const iframe = document.createElement("iframe");
	const form = document.createElement("form");
	const payloadInput = document.createElement("input");

	iframe.name = targetName;
	iframe.hidden = true;
	iframe.setAttribute("aria-hidden", "true");

	form.method = "POST";
	form.action = endpoint;
	form.target = targetName;
	form.hidden = true;

	payloadInput.type = "hidden";
	payloadInput.name = "payload";
	payloadInput.value = JSON.stringify({
		...payload,
		submissionId,
		website: "",
	});
	form.append(payloadInput);

	await new Promise<void>((resolve, reject) => {
		const cleanup = () => {
			window.clearTimeout(timeoutId);
			window.removeEventListener("message", handleMessage);
			form.remove();
			iframe.remove();
		};

		const handleMessage = (event: MessageEvent<unknown>) => {
			if (
				!isAppsScriptOrigin(event.origin) ||
				!isSubmissionResponse(event.data) ||
				event.data.submissionId !== submissionId
			) {
				return;
			}

			cleanup();
			if (event.data.ok) {
				resolve();
			} else {
				reject(new Error(event.data.error || "Registration was rejected."));
			}
		};

		const timeoutId = window.setTimeout(() => {
			cleanup();
			reject(new Error("Registration request timed out."));
		}, REQUEST_TIMEOUT_MS);

		window.addEventListener("message", handleMessage);
		document.body.append(iframe, form);
		form.submit();
	});
}
