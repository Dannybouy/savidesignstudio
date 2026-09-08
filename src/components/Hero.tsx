import { motion, type Variants } from "motion/react";
import griddedPattern from "../assets/gridded-pattern.avif";
import { PROJECT_GROUPS } from "../lib/constants";
import { buttonVariants } from "./ui/button";
import { InfiniteSlider } from "./ui/infinite-slider";

const HEADLINE = "Designing experiences and brands people love and remember";

const EYEBROW = "Build Your Online Identity Today";

const BODY =
	"Our team delivers high quality branding, design & development that helps shape the future of your business.";

const PROJECT_REEL = PROJECT_GROUPS.flatMap((project) =>
	project.pages.map((page) => ({
		slug: page.slug,
		client: project.client,
		name: page.name,
		src: page.thumbnail,
	})),
);

const stage: Variants = {
	hidden: {},
	shown: { transition: { delayChildren: 0.1, staggerChildren: 0.055 } },
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

const unveil: Variants = {
	hidden: { opacity: 0, scale: 1.04 },
	shown: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
	},
};

const fade: Variants = {
	hidden: { opacity: 0 },
	shown: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/**
 * Hatched divider. Artwork is 80px tall and already carries the layout
 * gutters — native scale (`object-none`) + crop keeps the diagonals honest
 * at every width. Height is locked (not flex leftover) so the band stays
 * 24px / 80px instead of collapsing.
 */
function HatchBand() {
	return (
		<div
			aria-hidden
			className="h-6 w-full shrink-0 overflow-hidden px-6 lg:h-20 lg:px-20"
		>
			<motion.img
				variants={fade}
				src={griddedPattern}
				alt="grid pattern"
				className="size-full object-none object-center"
			/>
		</div>
	);
}

export default function Hero() {
	return (
		<motion.section
			id="home"
			initial="hidden"
			animate="shown"
			variants={stage}
			className="flex flex-col"
		>
			<div className="relative mx-auto flex w-full max-w-360 flex-col px-6 pt-20 pb-8 lg:px-20 lg:pb-12">
				{/* A violet wash under the copy, picking up the accent in the primary
				    button so the fold reads as lit rather than flat white. */}
				<div
					aria-hidden
					className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(70%_100%_at_50%_100%,color-mix(in_oklab,var(--color-surface-action-secondary)_8%,transparent)_0%,transparent_72%)]"
				/>

				<div className="relative flex flex-col items-start gap-4 lg:mx-auto lg:max-w-5xl lg:items-center lg:gap-6">
					<motion.p
						variants={rise}
						className="flex items-center gap-2 rounded-sm bg-surface-default px-2 py-1 text-heading text-paragraph-sm"
					>
						<img
							src="/icons/sparkle.svg"
							alt="sparkle"
							className="size-4 shrink-0"
						/>
						{EYEBROW}
					</motion.p>

					<motion.h1
						variants={wordMask}
						className="max-w-250.25 text-h2 lg:text-center lg:text-display-2"
					>
						{HEADLINE.split(" ").map((token, index) => (
							<span
								// Descenders need room below the baseline, so the mask is padded
								// and the added height clawed back with a negative margin.
								key={`${token}-${index}`}
								className="mb-[-0.12em] inline-block overflow-hidden whitespace-pre pb-[0.12em] align-bottom"
							>
								<motion.span variants={word} className="inline-block">
									{token}{" "}
								</motion.span>
							</span>
						))}
					</motion.h1>

					<motion.p
						variants={rise}
						className="max-w-145.25 text-paragraph lg:text-center lg:text-paragraph-lg font-normal"
					>
						{BODY}
					</motion.p>

					<motion.div
						variants={rise}
						className="flex items-center gap-4 lg:gap-3"
					>
						<a
							href="http://calendly.com/savidesignstudio2"
							target="_blank"
							rel="noopener noreferrer"
							className={buttonVariants({ size: "cta", variant: "cta" })}
						>
							Grab A Free Call
							<span
								aria-hidden
								className="grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-surface-page shadow-[inset_-2px_2px_2px_0_rgb(255_255_255/0.25)]"
							>
								<img
									src="/icons/arrow-up-right.svg"
									alt="arrow up right"
									className="size-5 transition-transform duration-200 ease-out group-hover/button:translate-x-px group-hover/button:-translate-y-px"
								/>
							</span>
						</a>

						<a
							href="https://wa.me/2347079443937"
							target="_blank"
							rel="noopener noreferrer"
							className={buttonVariants({ variant: "outline" })}
						>
							Chat with us
						</a>
					</motion.div>
				</div>
			</div>

			<HatchBand />
			<div className="w-full bg-surface-default py-2 lg:py-4">
				<motion.div variants={unveil}>
					<InfiniteSlider gap={16} speed={24} speedOnHover={8}>
						{PROJECT_REEL.map((project, index) => (
							<figure
								key={project.slug}
								className="w-[82vw] shrink-0 overflow-hidden bg-surface-page p-2 sm:w-[68vw] lg:w-[43vw] lg:p-4"
							>
								<img
									src={project.src}
									alt={`${project.client} ${project.name} website design`}
									loading={index < 2 ? "eager" : "lazy"}
									fetchPriority={index < 2 ? "high" : "auto"}
									className="aspect-[45/32] size-full select-none object-cover object-top"
								/>
							</figure>
						))}
					</InfiniteSlider>
				</motion.div>
			</div>

			<HatchBand />
		</motion.section>
	);
}
