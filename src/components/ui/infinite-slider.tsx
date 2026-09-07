import { animate, motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { useMeasure } from "@/hooks/useMeasure";
import { cn } from "@/lib/utils";

type InfiniteSliderProps = {
	children: React.ReactNode;
	gap?: number;
	speed?: number;
	speedOnHover?: number;
	direction?: "horizontal" | "vertical";
	reverse?: boolean;
	className?: string;
};

export function InfiniteSlider({
	children,
	gap = 16,
	speed = 25,
	speedOnHover,
	direction = "horizontal",
	reverse = false,
	className,
}: InfiniteSliderProps) {
	const [currentSpeed, setCurrentSpeed] = useState(speed);
	const [viewportRef, viewport] = useMeasure<HTMLDivElement>();
	const [sequenceRef, sequence] = useMeasure<HTMLDivElement>();
	const translation = useMotionValue(0);
	const viewportSize =
		direction === "horizontal" ? viewport.width : viewport.height;
	const sequenceSize =
		direction === "horizontal" ? sequence.width : sequence.height;
	const loopDistance = sequenceSize + gap;
	const copyCount = loopDistance
		? Math.max(2, Math.ceil((viewportSize + gap) / loopDistance) + 1)
		: 2;

	useEffect(() => {
		if (loopDistance <= 0 || currentSpeed <= 0) {
			return;
		}

		let cancelled = false;
		let approachControls: ReturnType<typeof animate> | undefined;
		let loopControls: ReturnType<typeof animate> | undefined;
		const loopStart = reverse ? -loopDistance : 0;
		const loopEnd = reverse ? 0 : -loopDistance;
		const rawTranslation = translation.get();
		const wrapped =
			((rawTranslation % loopDistance) + loopDistance) % loopDistance;
		const currentTranslation =
			wrapped === 0 ? loopStart : wrapped - loopDistance;
		const remainingDistance = Math.abs(loopEnd - currentTranslation);

		const startLoop = () => {
			if (cancelled) {
				return;
			}

			translation.set(loopStart);
			loopControls = animate(translation, [loopStart, loopEnd], {
				duration: loopDistance / currentSpeed,
				ease: "linear",
				repeat: Number.POSITIVE_INFINITY,
				repeatDelay: 0,
				repeatType: "loop",
			});
		};

		translation.set(currentTranslation);

		if (remainingDistance < 0.5) {
			startLoop();
		} else {
			approachControls = animate(translation, [currentTranslation, loopEnd], {
				duration: remainingDistance / currentSpeed,
				ease: "linear",
				onComplete: startLoop,
			});
		}

		return () => {
			cancelled = true;
			approachControls?.stop();
			loopControls?.stop();
		};
	}, [currentSpeed, loopDistance, reverse, translation]);

	const hoverProps = speedOnHover
		? {
				onHoverStart: () => setCurrentSpeed(speedOnHover),
				onHoverEnd: () => setCurrentSpeed(speed),
			}
		: {};

	return (
		<div ref={viewportRef} className={cn("overflow-hidden", className)}>
			<motion.div
				className="flex w-max"
				style={{
					...(direction === "horizontal"
						? { x: translation }
						: { y: translation }),
					gap: `${gap}px`,
					flexDirection: direction === "horizontal" ? "row" : "column",
				}}
				{...hoverProps}
			>
				{Array.from({ length: copyCount }, (_, copyIndex) => (
					<div
						key={copyIndex}
						ref={copyIndex === 0 ? sequenceRef : undefined}
						aria-hidden={copyIndex === 0 ? undefined : true}
						className="flex w-max shrink-0"
						style={{
							gap: `${gap}px`,
							flexDirection: direction === "horizontal" ? "row" : "column",
						}}
					>
						{children}
					</div>
				))}
			</motion.div>
		</div>
	);
}
