import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { PROJECTS, type Project } from "@/lib/constants";

const EYEBROW = "Selected Work";

const HEADLINE = "Projects we're proud of";

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

const deck: Variants = {
	hidden: {},
	shown: { transition: { staggerChildren: 0.08 } },
};

// Thumbnails are full-page screenshots, so they are cropped from the top —
// the masthead is the part of a page anyone actually recognises.
const THUMB_FRAME =
	"overflow-hidden rounded-sm bg-surface-default ring-1 ring-hairline";

const THUMB_IMAGE =
	"size-full object-cover object-top transition-transform duration-300 ease-out motion-reduce:transition-none";

function groupByClient(projects: Project[]) {
	const clients: { name: string; projects: Project[] }[] = [];

	for (const project of projects) {
		const existing = clients.find((client) => client.name === project.client);
		if (existing) {
			existing.projects.push(project);
		} else {
			clients.push({ name: project.client, projects: [project] });
		}
	}

	return clients;
}

const CLIENTS = groupByClient(PROJECTS);

function SectionHeading({ centered = false }: { centered?: boolean }) {
	return (
		<div
			className={`flex flex-col gap-4 ${centered ? "items-center" : "items-start"}`}
		>
			<motion.p
				variants={rise}
				className="rounded-sm bg-surface-default px-2 py-1 text-heading text-paragraph-sm"
			>
				{EYEBROW}
			</motion.p>

			<motion.h2
				variants={wordMask}
				className={`text-h1-mobile lg:text-h1 ${centered ? "text-center" : ""}`}
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
	);
}

// Review scaffolding. All three variations render on the page so they can be
// compared in one scroll; the winner keeps its component and this goes away
// along with the other two.
function VariantLabel({ title, note }: { title: string; note: string }) {
	return (
		<div className="mb-8 flex flex-col gap-1 lg:mb-10">
			<span className="w-fit rounded-sm bg-heading px-2 py-1 font-medium text-on-action text-paragraph-sm">
				{title}
			</span>
			<span className="text-body-secondary text-paragraph-sm">{note}</span>
		</div>
	);
}

function LiveLinkArrow({ className = "" }: { className?: string }) {
	return (
		<img
			src="/icons/arrow-up-right.svg"
			alt=""
			aria-hidden
			className={`shrink-0 ${className}`}
		/>
	);
}

/* ------------------------------------------------------------------ *
 * Variation A — Ledger
 * Grouped by client, so the eight pages read as three engagements
 * instead of eight equal tiles. Borrows the numbered hairline rows
 * from `Services.tsx`.
 * ------------------------------------------------------------------ */

function ProjectsLedger() {
	return (
		<motion.section
			id="projects-ledger"
			initial="hidden"
			whileInView="shown"
			viewport={{ once: true, amount: 0.15 }}
			variants={stage}
			className="bg-surface-page"
		>
			<div className="mx-auto flex w-full max-w-360 flex-col px-6 py-12 lg:px-20 lg:py-20">
				<VariantLabel
					title="Variation A — Ledger"
					note="Grouped by client. Three rows instead of eight tiles."
				/>

				<SectionHeading />

				<motion.div variants={deck} className="mt-10 flex flex-col lg:mt-14">
					{CLIENTS.map((client, index) => (
						<motion.div
							key={client.name}
							variants={rise}
							className="flex flex-col gap-6 border-hairline border-t py-6 lg:flex-row lg:gap-12 lg:py-10"
						>
							<div className="flex items-baseline gap-4 lg:w-72 lg:shrink-0">
								<span className="text-body-secondary text-h3 lg:text-h2">
									{String(index + 1).padStart(2, "0")}
								</span>
								<div className="flex flex-col gap-1">
									<h3 className="text-h3 lg:text-h2">{client.name}</h3>
									<p className="text-body-secondary text-paragraph-sm">
										{client.projects.length} pages
									</p>
								</div>
							</div>

							<ul className="grid grid-cols-2 gap-4 lg:flex-1 lg:grid-cols-3 lg:gap-6">
								{client.projects.map((project) => (
									<li key={project.slug}>
										<a
											href={project.href}
											target="_blank"
											rel="noreferrer"
											className="group/card flex flex-col gap-2 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-surface-action-secondary focus-visible:ring-offset-4"
										>
											<div className={`aspect-4/3 ${THUMB_FRAME}`}>
												<img
													src={project.thumbnail}
													alt={project.name}
													loading="lazy"
													className={`${THUMB_IMAGE} group-hover/card:scale-[1.02]`}
												/>
											</div>
											<span className="flex items-center gap-1 text-body-secondary text-paragraph-sm">
												{project.name}
												<LiveLinkArrow className="size-3.5 opacity-0 transition-opacity duration-200 ease-out group-hover/card:opacity-100 group-focus-visible/card:opacity-100 motion-reduce:transition-none" />
											</span>
										</a>
									</li>
								))}
							</ul>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.section>
	);
}

/* ------------------------------------------------------------------ *
 * Variation B — Spotlight
 * One project big enough to actually read, with the rest on a rail
 * underneath. Picking a rail card promotes it into the hero.
 * ------------------------------------------------------------------ */

function ProjectsSpotlight() {
	const [activeSlug, setActiveSlug] = useState(PROJECTS[0].slug);
	const active =
		PROJECTS.find((project) => project.slug === activeSlug) ?? PROJECTS[0];

	return (
		<motion.section
			id="projects-spotlight"
			initial="hidden"
			whileInView="shown"
			viewport={{ once: true, amount: 0.15 }}
			variants={stage}
			className="bg-surface-page"
		>
			<div className="mx-auto flex w-full max-w-360 flex-col px-6 py-12 lg:px-20 lg:py-20">
				<VariantLabel
					title="Variation B — Spotlight"
					note="One project large enough to read. The rail promotes into the hero."
				/>

				<SectionHeading centered />

				<motion.div variants={rise} className="mt-10 flex flex-col gap-4">
					<a
						href={active.href}
						target="_blank"
						rel="noreferrer"
						// The image inside is swapped by AnimatePresence, so the link
						// carries its own name rather than inheriting the `alt`.
						aria-label={`${active.name} — open live site`}
						className={`group/hero relative block aspect-16/10 w-full outline-none focus-visible:ring-2 focus-visible:ring-surface-action-secondary focus-visible:ring-offset-4 lg:aspect-16/7 ${THUMB_FRAME}`}
					>
						{/* The swap is the one animation in this section worth having:
						    without it the hero teleports. Crossfade in place, so both
						    frames are absolutely positioned. */}
						<AnimatePresence initial={false}>
							<motion.img
								key={active.slug}
								src={active.thumbnail}
								alt={active.name}
								initial={{ opacity: 0, scale: 1.02 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0 }}
								transition={{
									type: "spring",
									stiffness: 260,
									damping: 30,
									mass: 0.9,
								}}
								className="absolute inset-0 size-full object-cover object-top"
							/>
						</AnimatePresence>
					</a>

					<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
						<h3 className="text-h3">{active.name}</h3>

						<a
							href={active.href}
							target="_blank"
							rel="noreferrer"
							className={buttonVariants({ size: "cta", variant: "cta" })}
						>
							View live site
							<span
								aria-hidden
								className="grid h-8 w-8 shrink-0 place-items-center rounded-sm bg-surface-page shadow-[inset_-2px_2px_2px_0_rgb(255_255_255/0.25)]"
							>
								<LiveLinkArrow className="size-5 transition-transform duration-200 ease-out group-hover/button:translate-x-px group-hover/button:-translate-y-px motion-reduce:transition-none" />
							</span>
						</a>
					</div>
				</motion.div>

				{/* Native horizontal scroll rather than a carousel — nothing here
				    needs to hijack the scroll. */}
				<motion.ul
					variants={rise}
					className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 lg:mt-8 lg:gap-4 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
				>
					{PROJECTS.map((project) => {
						const isActive = project.slug === active.slug;

						return (
							<li key={project.slug} className="snap-start">
								<button
									type="button"
									onClick={() => setActiveSlug(project.slug)}
									aria-pressed={isActive}
									className={`group/rail block w-32 shrink-0 cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-surface-action-secondary focus-visible:ring-offset-4 lg:w-44 ${isActive ? "" : "opacity-60 hover:opacity-100"} transition-opacity duration-200 ease-out motion-reduce:transition-none`}
								>
									<div
										className={`aspect-4/3 ${THUMB_FRAME} ${isActive ? "ring-2 ring-surface-action-secondary" : ""}`}
									>
										<img
											src={project.thumbnail}
											alt={project.name}
											loading="lazy"
											className={`${THUMB_IMAGE} group-hover/rail:scale-[1.02]`}
										/>
									</div>
									<span className="mt-2 block truncate text-body-secondary text-paragraph-sm">
										{project.name}
									</span>
								</button>
							</li>
						);
					})}
				</motion.ul>
			</div>
		</motion.section>
	);
}

/* ------------------------------------------------------------------ *
 * Variation C — Index
 * A scannable list of names on the left, one sticky preview on the
 * right. You read text to navigate, not thumbnails.
 * ------------------------------------------------------------------ */

function ProjectsIndex() {
	const [activeSlug, setActiveSlug] = useState(PROJECTS[0].slug);
	const active =
		PROJECTS.find((project) => project.slug === activeSlug) ?? PROJECTS[0];

	return (
		<motion.section
			id="projects-index"
			initial="hidden"
			whileInView="shown"
			viewport={{ once: true, amount: 0.15 }}
			variants={stage}
			className="bg-surface-page"
		>
			<div className="mx-auto flex w-full max-w-360 flex-col px-6 py-12 lg:px-20 lg:py-20">
				<VariantLabel
					title="Variation C — Index"
					note="Scan names, not thumbnails. Preview follows the pointer on desktop."
				/>

				<SectionHeading />

				<motion.div
					variants={rise}
					className="mt-10 flex flex-col gap-10 lg:mt-14 lg:flex-row lg:gap-16"
				>
					<ul className="flex flex-col lg:w-1/2">
						{PROJECTS.map((project, index) => (
							<li
								key={project.slug}
								className="border-hairline border-t last:border-b"
							>
								<a
									href={project.href}
									target="_blank"
									rel="noreferrer"
									onMouseEnter={() => setActiveSlug(project.slug)}
									onFocus={() => setActiveSlug(project.slug)}
									className="group/row flex flex-col gap-3 py-4 outline-none focus-visible:ring-2 focus-visible:ring-surface-action-secondary focus-visible:ring-offset-2 lg:py-5"
								>
									<span className="flex items-center justify-between gap-4">
										<span className="flex items-baseline gap-3">
											<span className="text-body-secondary text-paragraph-sm">
												{String(index + 1).padStart(2, "0")}
											</span>
											<span className="text-h3 text-heading">
												{project.name}
											</span>
										</span>
										<LiveLinkArrow className="size-4 -translate-x-1 opacity-0 transition-[translate,opacity] duration-200 ease-out group-hover/row:translate-x-0 group-hover/row:opacity-100 group-focus-visible/row:translate-x-0 group-focus-visible/row:opacity-100 motion-reduce:transition-none" />
									</span>

									{/* Mobile has no room for a sticky preview, so each row
									    carries its own thumbnail. */}
									<div className={`aspect-16/10 lg:hidden ${THUMB_FRAME}`}>
										<img
											src={project.thumbnail}
											alt={project.name}
											loading="lazy"
											className={THUMB_IMAGE}
										/>
									</div>
								</a>
							</li>
						))}
					</ul>

					<div className="hidden lg:block lg:w-1/2">
						{/* The preview swaps on hover, which fires constantly as the
						    pointer crosses the list. No transition — animating it would
						    make the list feel laggy. */}
						<div
							className={`sticky top-[calc(var(--nav-h)+2rem)] aspect-4/3 ${THUMB_FRAME}`}
						>
							<img
								src={active.thumbnail}
								alt={active.name}
								className="size-full object-cover object-top"
							/>
						</div>
					</div>
				</motion.div>
			</div>
		</motion.section>
	);
}

export default function Projects() {
	return (
		<div id="projects">
			<ProjectsLedger />
			<div className="mx-auto w-full max-w-360 px-6 lg:px-20">
				<div className="border-hairline border-t" />
			</div>
			<ProjectsSpotlight />
			<div className="mx-auto w-full max-w-360 px-6 lg:px-20">
				<div className="border-hairline border-t" />
			</div>
			<ProjectsIndex />
		</div>
	);
}

export { ProjectsIndex, ProjectsLedger, ProjectsSpotlight };
