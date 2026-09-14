declare module "canvas-confetti" {
	interface ConfettiOptions {
		particleCount?: number;
		spread?: number;
		startVelocity?: number;
		origin?: { x?: number; y?: number };
		colors?: string[];
		disableForReducedMotion?: boolean;
		zIndex?: number;
	}

	function confetti(options?: ConfettiOptions): Promise<null> | null;

	export default confetti;
}
