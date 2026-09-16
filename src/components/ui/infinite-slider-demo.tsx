import {
	Children,
	type ComponentPropsWithoutRef,
	type CSSProperties,
	isValidElement,
	type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

const SECONDS_PER_ITEM = 6;
const MINIMUM_SPEED = 0.1;

type SliderItemStyle = CSSProperties & {
	"--single-copy-slider-delay": string;
	"--single-copy-slider-duration": string;
	"--single-copy-slider-end": string;
	"--single-copy-slider-start": string;
};

type InfiniteSliderDemoProps = Omit<
	ComponentPropsWithoutRef<"div">,
	"children"
> & {
	children: ReactNode;
	/** Space between items, in pixels. */
	gap?: number;
	/** Playback multiplier. `2` is twice as fast; `0.5` is half speed. */
	speed?: number;
	/** Accessible name for the list of items. */
	ariaLabel?: string;
	/** Applied to every item wrapper so the marquee has one enforced item size. */
	itemClassName: string;
	playState?: "paused" | "running";
};

function getItemOffset(step: number, gap: number) {
	const percentage = step * 100;
	const gapOffset = step * gap;

	if (gapOffset === 0) {
		return `${percentage}%`;
	}

	const operator = gapOffset > 0 ? "+" : "-";
	return `calc(${percentage}% ${operator} ${Math.abs(gapOffset)}px)`;
}

/**
 * CSS-only marquee proof of concept. Every child is rendered exactly once.
 * Children need the same inline size so their staggered paths stay seamless.
 */
export function InfiniteSliderDemo({
	children,
	gap = 16,
	speed = 1,
	ariaLabel,
	itemClassName,
	playState = "running",
	className,
	...props
}: InfiniteSliderDemoProps) {
	const items = Children.toArray(children);
	const itemCount = items.length;
	const safeGap = Math.max(0, gap);
	const safeSpeed = Math.max(MINIMUM_SPEED, speed);
	const duration = (itemCount * SECONDS_PER_ITEM) / safeSpeed;

	return (
		<div
			{...props}
			data-item-count={itemCount}
			data-play-state={playState}
			data-render-strategy="single-copy"
			className={cn(
				"single-copy-slider w-full overflow-x-auto overscroll-x-contain motion-safe:overflow-hidden",
				className,
			)}
		>
			<ul
				aria-label={ariaLabel}
				className="m-0 flex w-max list-none items-stretch p-0"
				style={{ gap: `${safeGap}px` }}
			>
				{items.map((item, index) => {
					const startStep = itemCount - 1 - index;
					const endStep = -(index + 1);
					const delay = -((duration * (itemCount - 1 - index)) / itemCount);
					const style: SliderItemStyle = {
						"--single-copy-slider-delay": `${delay}s`,
						"--single-copy-slider-duration": `${duration}s`,
						"--single-copy-slider-end": getItemOffset(endStep, safeGap),
						"--single-copy-slider-start": getItemOffset(startStep, safeGap),
					};
					const key =
						isValidElement(item) && item.key !== null ? item.key : index;

					return (
						<li
							key={key}
							className={cn("single-copy-slider-item shrink-0", itemClassName)}
							style={style}
						>
							{item}
						</li>
					);
				})}
			</ul>
		</div>
	);
}
