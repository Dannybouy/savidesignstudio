import { useCallback, useMemo, useState } from "react";

type Dimensions = Omit<DOMRectReadOnly, "toJSON">;

const DEFAULT_DIMENSIONS: Dimensions = {
	x: 0,
	y: 0,
	width: 0,
	height: 0,
	top: 0,
	left: 0,
	bottom: 0,
	right: 0,
};

// Same [ref, dimensions] contract as `react-use-measure`, backed by a plain
// ResizeObserver so callers don't need the extra dependency.
export function useMeasure<T extends Element = Element>(): [
	(node: T | null) => void,
	Dimensions,
] {
	const [dimensions, setDimensions] = useState<Dimensions>(DEFAULT_DIMENSIONS);

	const observer = useMemo(
		() =>
			new ResizeObserver(([entry]) => {
				if (entry) {
					setDimensions(entry.contentRect);
				}
			}),
		[],
	);

	const ref = useCallback(
		(node: T | null) => {
			observer.disconnect();
			if (node) {
				observer.observe(node);
			}
		},
		[observer],
	);

	return [ref, dimensions];
}
