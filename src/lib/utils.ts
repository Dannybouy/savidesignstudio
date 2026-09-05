import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge only knows Tailwind's stock scale, so it reads the theme's own
// `text-*` sizes as colors and drops whichever of `text-h2 text-on-action` came
// first. Registering them as font sizes keeps size and colour independent.
const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			"font-size": [
				{
					text: [
						"display-2",
						"h2",
						"paragraph-lg",
						"paragraph",
						"paragraph-sm",
					],
				},
			],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
