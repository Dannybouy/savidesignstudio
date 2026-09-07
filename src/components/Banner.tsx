import { type HTMLMotionProps, motion, type Variants } from "motion/react";
import type * as React from "react";
import { Link, type LinkProps } from "react-router";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

// Bar-chart palette, shortest bar to tallest. Deliberately local: these shades
// belong to the banner artwork, not to the global theme.
const BAR_PALETTE = ["#C5BDDC", "#A89DCA", "#8B7CB9", "#6E5BA7"] as const;

// The offset drop shadows reuse the artwork palette so the whole block stays on
// one ramp — nearest layer darkest, furthest lightest.
const CARD_SHADOW = `8px 8px 0 0 ${BAR_PALETTE[3]}, 16px 16px 0 0 ${BAR_PALETTE[1]}`;

// Bar heights as a share of the card, from the Figma artwork: 80 / 124 / 207 /
// 292 against a 356 tall card.
const BARS = [
	{ color: BAR_PALETTE[0], height: "22.5%", rank: 0 },
	{ color: BAR_PALETTE[1], height: "34.8%", rank: 1 },
	{ color: BAR_PALETTE[2], height: "58.1%", rank: 2 },
	{ color: BAR_PALETTE[3], height: "82%", rank: 3 },
];

const stage: Variants = {
	hidden: {},
	shown: { transition: { delayChildren: 0.05, staggerChildren: 0.08 } },
};

const wordMask: Variants = {
	hidden: {},
	shown: { transition: { staggerChildren: 0.035 } },
};

const word: Variants = {
	hidden: { y: "115%", opacity: 0 },
	shown: {
		y: "0%",
		opacity: 1,
		transition: { type: "spring", stiffness: 340, damping: 34, mass: 0.9 },
	},
};

// Every entrance pairs a transform with opacity. Under `reducedMotion="user"`
// Motion drops the transform and leaves the fade, so nothing travels across the
// screen for visitors who asked for less movement.
const rise: Variants = {
	hidden: { opacity: 0, y: 16 },
	shown: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 300, damping: 32 },
	},
};

// No `staggerChildren` here: the artwork registers as a variant child too, so a
// stagger on the card would queue the copy behind all eight bars. The headline
// carries its own word stagger, and the bars their own delays.
const shell: Variants = {
	hidden: { opacity: 0, y: 28 },
	shown: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 260, damping: 30, mass: 0.9 },
	},
};

// Bars grow out of the baseline shortest first, so the group fills in the way a
// chart does. Light damping leaves a small overshoot at the top of each one;
// the card clips it. `custom` carries the bar's rank in that order.
const bar: Variants = {
	hidden: { scaleY: 0, opacity: 0 },
	shown: (rank: number) => ({
		scaleY: 1,
		opacity: 1,
		transition: {
			delay: 0.22 + rank * 0.09,
			type: "spring",
			stiffness: 240,
			damping: 17,
			mass: 0.7,
			opacity: { duration: 0.18, delay: 0.22 + rank * 0.09 },
		},
	}),
};

function Bar({
	color,
	rank,
	className,
	style,
}: {
	color: string;
	rank: number;
	className?: string;
	style?: React.CSSProperties;
}) {
	return (
		<motion.div
			aria-hidden
			custom={rank}
			variants={bar}
			className={cn("origin-bottom", className)}
			style={{ backgroundColor: color, ...style }}
		/>
	);
}

/**
 * Desktop artwork: a 160px column of four bars pinned to the card's baseline.
 * The two sides mirror each other, so the tallest bar always sits against the
 * outer edge of the card.
 */
function BarGroup({ side }: { side: "left" | "right" }) {
	const bars = side === "left" ? [...BARS].reverse() : BARS;

	return (
		<div
			aria-hidden
			className={cn(
				"absolute inset-y-0 hidden w-40 items-end lg:flex",
				side === "left" ? "left-0" : "right-0",
			)}
		>
			{bars.map((entry) => (
				<Bar
					key={entry.color}
					color={entry.color}
					rank={entry.rank}
					className="w-10"
					style={{ height: entry.height }}
				/>
			))}
		</div>
	);
}

/**
 * Mobile artwork. The side columns have nowhere to go at that width, so the
 * ramp lies flat along the baseline instead — the palette twice over, popping
 * in lightest to darkest in both halves at once.
 */
function BarBaseline() {
	return (
		<div
			aria-hidden
			className="absolute inset-x-0 bottom-0 flex h-5 items-end lg:hidden"
		>
			{[...BARS, ...BARS].map((entry, index) => (
				<Bar
					key={`${entry.color}-${index}`}
					color={entry.color}
					rank={entry.rank}
					className="h-full flex-1"
				/>
			))}
		</div>
	);
}

/**
 * Full-bleed call-to-action banner. Content is supplied by the caller so the
 * same block can carry a different pitch on every page:
 *
 * ```tsx
 * <Banner>
 *   <BannerTitle>Join the Bootcamp</BannerTitle>
 *   <BannerDescription>A 6-week program…</BannerDescription>
 *   <BannerAction href="/bootcamp">See more details</BannerAction>
 * </Banner>
 * ```
 *
 * The section paints no background of its own, so the page's grid rules stay
 * visible either side of the card.
 */
function Banner({
	className,
	containerClassName,
	children,
	...props
}: React.ComponentProps<"section"> & { containerClassName?: string }) {
	return (
		<section
			data-slot="banner"
			className={cn("relative", className)}
			{...props}
		>
			<motion.div
				data-slot="banner-container"
				initial="hidden"
				whileInView="shown"
				viewport={{ once: true, amount: 0.25 }}
				variants={stage}
				className={cn(
					"mx-auto w-full max-w-360 px-6 py-12 lg:px-20 lg:py-20",
					containerClassName,
				)}
			>
				<motion.div
					variants={shell}
					// The card is clipped so an overshooting bar never escapes it. Box
					// shadows sit outside the clip, so the offset layers survive.
					className="relative isolate flex flex-col items-center overflow-hidden bg-surface-action px-6 py-20 text-center lg:px-10"
					style={{ boxShadow: CARD_SHADOW }}
				>
					<BarGroup side="left" />
					<BarGroup side="right" />
					<BarBaseline />

					<div className="relative flex w-full flex-col items-center">
						{children}
					</div>
				</motion.div>
			</motion.div>
		</section>
	);
}

/**
 * Headline. Split per word behind a mask so it rises in like the other section
 * headings, which is why it takes a plain string rather than nodes.
 */
function BannerTitle({
	children,
	className,
	...props
}: Omit<HTMLMotionProps<"h2">, "children"> & { children: string }) {
	return (
		<motion.h2
			data-slot="banner-title"
			variants={wordMask}
			// 960px keeps a long headline clear of the 160px bar columns.
			className={cn(
				"max-w-240 text-h2 text-on-action lg:text-[2.5rem] lg:leading-11 lg:tracking-[-1px]",
				className,
			)}
			{...props}
		>
			{children.split(" ").map((token, index) => (
				<span
					// Descenders need room below the baseline, so the mask is padded and
					// the added height clawed back with a negative margin.
					key={`${token}-${index}`}
					className="mb-[-0.12em] inline-block overflow-hidden whitespace-pre pb-[0.12em] align-bottom"
				>
					<motion.span variants={word} className="inline-block">
						{token}{" "}
					</motion.span>
				</span>
			))}
		</motion.h2>
	);
}

function BannerDescription({ className, ...props }: HTMLMotionProps<"p">) {
	return (
		<motion.p
			data-slot="banner-description"
			variants={rise}
			className={cn(
				"mt-4 max-w-145.25 font-normal text-on-action/90 text-paragraph lg:text-paragraph-lg",
				className,
			)}
			{...props}
		/>
	);
}

function BannerAction({ className, ...props }: LinkProps) {
	return (
		<motion.div variants={rise} className="mt-6">
			<Link
				data-slot="banner-action"
				// `ghost` already lands on the light-on-dark treatment the design
				// wants; it only needs the resting white fill and Figma's 16px inset.
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"bg-surface-page px-4",
					className,
				)}
				{...props}
			/>
		</motion.div>
	);
}

export { Banner, BannerAction, BannerDescription, BannerTitle };
