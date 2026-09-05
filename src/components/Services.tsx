import { Accordion } from "@base-ui/react/accordion";
import { motion, useInView, type Variants } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SERVICES, type Service } from "@/lib/constants";

const EYEBROW = "What We Offer";

const HEADLINE = "Services built to move your brand forward";

// Clips are dropped into `src/assets/videos` and matched by slug, so the
// filename is the only wiring. Each service looks for `<slug>.webm`,
// `<slug>.mp4` and a `<slug>.jpg` poster:
//
//   branding, web-design, web-development,
//   product-strategy, ui-ux-design, motion-design
//
// A service with no files renders the placeholder block instead.
const VIDEO_URLS = import.meta.glob("../assets/videos/*.{mp4,webm}", {
	eager: true,
	query: "?url",
	import: "default",
}) as Record<string, string>;

const POSTER_URLS = import.meta.glob("../assets/videos/*.{jpg,jpeg,png,avif}", {
	eager: true,
	query: "?url",
	import: "default",
}) as Record<string, string>;

function assetUrl(
	urls: Record<string, string>,
	slug: string,
	extensions: string[],
) {
	for (const extension of extensions) {
		const url = urls[`../assets/videos/${slug}.${extension}`];
		if (url) {
			return url;
		}
	}
	return undefined;
}

function mediaFor(slug: string) {
	return {
		webm: assetUrl(VIDEO_URLS, slug, ["webm"]),
		mp4: assetUrl(VIDEO_URLS, slug, ["mp4"]),
		poster: assetUrl(POSTER_URLS, slug, ["jpg", "jpeg", "png", "avif"]),
	};
}

// A poster with no clip beside it is almost always a filename typo, which would
// otherwise show a still forever without ever failing.
if (import.meta.env.DEV) {
	for (const service of SERVICES) {
		const media = mediaFor(service.slug);
		if (media.poster && !media.mp4 && !media.webm) {
			console.warn(
				`[Services] "${service.slug}" has a poster but no video. Check the filenames in src/assets/videos.`,
			);
		}
	}
}

const stage: Variants = {
	hidden: {},
	shown: { transition: { delayChildren: 0.05, staggerChildren: 0.09 } },
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

// The panel is still growing when its contents mount, so the copy waits a beat
// rather than fading in against a sliver of a box.
const panelStage: Variants = {
	hidden: {},
	shown: { transition: { delayChildren: 0.08, staggerChildren: 0.06 } },
};

const panelRise: Variants = {
	hidden: { opacity: 0, y: 8 },
	shown: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 300, damping: 32 },
	},
};

const PANEL_EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

// lucide draws its plus as two strokes 2 units thick spanning 14 of a 24 unit
// box, so the bars are sized in percentages and scale with the icon the way a
// real lucide glyph would. The vertical bar swings onto the horizontal one to
// become the minus.
//
// Tailwind v4 writes `rotate` and `scale` as their own properties rather than
// composing a `transform`, so the transitions have to name those properties or
// the icon snaps between states.
function PlusMinus() {
	return (
		<span
			aria-hidden
			className={`relative ml-auto block size-6 shrink-0 text-surface-action-secondary transition-[scale,color,filter] duration-300 ${PANEL_EASE} group-hover/trigger:scale-105 group-hover/trigger:brightness-90 group-aria-expanded/trigger:text-heading motion-reduce:transition-none lg:size-10`}
		>
			<span className="absolute top-[45.833%] left-[20.833%] h-[8.333%] w-[58.333%] rounded-full bg-current" />
			<span
				className={`absolute top-[20.833%] left-[45.833%] h-[58.333%] w-[8.333%] rounded-full bg-current transition-[rotate,opacity] duration-300 ${PANEL_EASE} group-aria-expanded/trigger:rotate-90 group-aria-expanded/trigger:opacity-0 motion-reduce:transition-none`}
			/>
		</span>
	);
}

function ServiceMedia({
	service,
	isOpen,
}: {
	service: Service;
	isOpen: boolean;
}) {
	const frameRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const isInView = useInView(frameRef, { amount: 0.3 });
	const media = mediaFor(service.slug);
	const hasVideo = Boolean(media.mp4 || media.webm);

	// Closing a row unmounts the panel, so every open starts at frame zero on a
	// fresh element. This only has to stop playback during the collapse and
	// whenever the row scrolls off screen.
	useEffect(() => {
		const video = videoRef.current;
		if (!video) {
			return;
		}
		if (isOpen && isInView) {
			// Autoplay can still be refused, in which case the poster stays put.
			video.play().catch(() => undefined);
		} else {
			video.pause();
		}
	}, [isOpen, isInView]);

	return (
		<div
			ref={frameRef}
			className="aspect-[171/170] w-full overflow-hidden bg-surface-disabled lg:aspect-[147/85]"
		>
			{hasVideo ? (
				// Desktop crops to 1.73:1 and mobile to a square from one file, so
				// anything that matters has to sit centre frame.
				<video
					ref={videoRef}
					muted
					loop
					playsInline
					preload="auto"
					poster={media.poster}
					className="size-full object-cover"
				>
					{media.webm ? <source src={media.webm} type="video/webm" /> : null}
					{media.mp4 ? <source src={media.mp4} type="video/mp4" /> : null}
					<track kind="captions" />
				</video>
			) : media.poster ? (
				<img
					src={media.poster}
					alt=""
					loading="lazy"
					className="size-full object-cover"
				/>
			) : null}
		</div>
	);
}

export default function Services() {
	const [openServices, setOpenServices] = useState<string[]>([
		SERVICES[0].slug,
	]);

	return (
		<motion.section
			id="services"
			initial="hidden"
			whileInView="shown"
			viewport={{ once: true, amount: 0.2 }}
			variants={stage}
			className="bg-surface-page"
		>
			<div className="mx-auto flex w-full max-w-360 flex-col px-6 py-12 lg:px-20 lg:py-20">
				<div className="flex flex-col items-center gap-4">
					<motion.p
						variants={rise}
						className="rounded-sm bg-surface-default px-2 py-1 text-heading text-paragraph-sm"
					>
						{EYEBROW}
					</motion.p>

					<motion.h2
						variants={wordMask}
						className="text-center text-h1-mobile lg:text-h1"
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
					</motion.h2>
				</div>

				<Accordion.Root
					value={openServices}
					onValueChange={(value) => setOpenServices(value)}
					className="mt-10 flex w-full flex-col gap-4 lg:mx-auto lg:mt-12 lg:max-w-300 lg:gap-8"
				>
					{SERVICES.map((service, index) => {
						const isOpen = openServices.includes(service.slug);

						return (
							<Accordion.Item
								key={service.slug}
								value={service.slug}
								className="border-hairline border-t"
							>
								<Accordion.Header>
									<Accordion.Trigger className="group/trigger flex w-full items-center gap-4 rounded-sm pt-[21px] pb-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-surface-action-secondary focus-visible:ring-offset-2 lg:pt-[25px] lg:pb-4">
										<span className="shrink-0 text-h3 lg:w-24 lg:text-h2">
											{String(index + 1).padStart(2, "0")}
										</span>
										<span className="text-h3 lg:text-h2">{service.title}</span>
										<PlusMinus />
									</Accordion.Trigger>
								</Accordion.Header>

								<Accordion.Panel
									className={`h-(--accordion-panel-height) overflow-hidden transition-[height] duration-300 ${PANEL_EASE} data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none`}
								>
									<motion.div
										initial="hidden"
										animate="shown"
										variants={panelStage}
										className="flex flex-col gap-6 pt-4 lg:grid lg:grid-cols-2 lg:gap-6"
									>
										<motion.div variants={panelRise}>
											<ServiceMedia service={service} isOpen={isOpen} />
										</motion.div>

										{/* Desktop pins the description to the top of the column
										    and the feature list to the bottom, level with the
										    media. Mobile just stacks them. */}
										<motion.div
											variants={panelRise}
											className="flex flex-col gap-6 lg:h-85 lg:justify-between lg:py-2.5"
										>
											<p className="text-body-primary text-paragraph lg:text-paragraph-lg">
												{service.description}
											</p>

											<ul className="flex flex-col gap-3">
												{service.features.map((feature) => (
													<li
														key={feature}
														className="flex items-center gap-[17px]"
													>
														<img
															src="/icons/sparkle.svg"
															alt=""
															className="size-6 shrink-0"
														/>
														<span className="text-body-secondary text-paragraph">
															{feature}
														</span>
													</li>
												))}
											</ul>
										</motion.div>
									</motion.div>
								</Accordion.Panel>
							</Accordion.Item>
						);
					})}
				</Accordion.Root>
			</div>
		</motion.section>
	);
}
