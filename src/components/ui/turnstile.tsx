import { useEffect, useRef } from "react";

declare global {
	interface Window {
		turnstile?: {
			render: (
				container: HTMLElement,
				options: {
					sitekey: string;
					callback: (token: string) => void;
					"error-callback": () => void;
					"expired-callback": () => void;
				},
			) => string;
			remove: (widgetId: string) => void;
		};
	}
}

let turnstileLoader: Promise<void> | undefined;

function loadTurnstile() {
	if (window.turnstile) return Promise.resolve();
	if (turnstileLoader) return turnstileLoader;

	turnstileLoader = new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src =
			"https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
		script.async = true;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error("Verification could not load."));
		document.head.append(script);
	});

	return turnstileLoader;
}

interface TurnstileProps {
	siteKey: string;
	onVerify: (token: string) => void;
	onError: () => void;
}

export function Turnstile({ siteKey, onVerify, onError }: TurnstileProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const widgetIdRef = useRef<string | undefined>(undefined);
	const callbacksRef = useRef({ onVerify, onError });
	callbacksRef.current = { onVerify, onError };

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		let isActive = true;
		void loadTurnstile()
			.then(() => {
				if (!isActive || !window.turnstile) return;
				widgetIdRef.current = window.turnstile.render(container, {
					sitekey: siteKey,
					callback: (token) => callbacksRef.current.onVerify(token),
					"error-callback": () => callbacksRef.current.onError(),
					"expired-callback": () => callbacksRef.current.onError(),
				});
			})
			.catch(() => callbacksRef.current.onError());

		return () => {
			isActive = false;
			if (widgetIdRef.current && window.turnstile) {
				window.turnstile.remove(widgetIdRef.current);
			}
			widgetIdRef.current = undefined;
		};
	}, [siteKey]);

	return <div ref={containerRef} />;
}
