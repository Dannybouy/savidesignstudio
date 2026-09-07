import { motion, type Variants } from "motion/react";
import { buttonVariants } from "@/components/ui/button";
import { PROJECT_GROUPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

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

// Grouped by client, so eight pages read as three engagements rather than eight
// equal tiles. The numbered hairline rows come from `Services.tsx`.
//
// Thumbnails are full-page screenshots, so they crop from the top — the masthead
// is the part of a page anyone actually recognises. They carry no hover motion
// on purpose: nothing here is clickable, and a thumbnail that reacts to the
// pointer would imply otherwise. The row's one target is the View live button.
export default function Projects() {
	return (
		<motion.section
			id="projects"
			initial="hidden"
			whileInView="shown"
			viewport={{ once: true, amount: 0.15 }}
			variants={stage}
			className="bg-surface-page"
		>
			<div className="mx-auto flex w-full max-w-360 flex-col px-6 py-12 lg:px-20 lg:py-20">
				<div className="flex flex-col items-start gap-4">
					<motion.p
						variants={rise}
						className="rounded-sm bg-surface-default px-2 py-1 text-heading text-paragraph-sm"
					>
						{EYEBROW}
					</motion.p>

					<motion.h2 variants={wordMask} className="text-h1-mobile lg:text-h1">
						{HEADLINE.split(" ").map((token, index) => (
							<span
								// Descenders need room below the baseline, so the mask is
								// padded and the added height clawed back with a negative
								// margin.
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

				<motion.div variants={deck} className="mt-10 flex flex-col lg:mt-14">
					{PROJECT_GROUPS.map((group, index) => (
						<motion.div
							key={group.slug}
							variants={rise}
							className="flex flex-col gap-6 border-hairline border-t py-6 lg:flex-row lg:gap-12 lg:py-10"
						>
							<div className="flex gap-4 lg:w-72 lg:shrink-0">
								<span className="text-body-secondary text-h3 lg:text-h2">
									{String(index + 1).padStart(2, "0")}
								</span>

								<div className="flex flex-col items-start gap-3">
									<div className="flex flex-col gap-1">
										<h3 className="text-h3 lg:text-h2">{group.client}</h3>
										<p className="text-body-secondary text-paragraph-sm">
											{group.type}
										</p>
									</div>

									<a
										href={group.href}
										target="_blank"
										rel="noreferrer"
										aria-label={`View ${group.client} live site`}
										className={cn(
											buttonVariants({ variant: "outline", size: "sm" }),
											// The outline variant ships with shadcn's palette, so
											// it is pulled back onto the site's tokens here.
											"border-border-default bg-surface-page text-heading hover:bg-surface-default hover:text-heading focus-visible:ring-2 focus-visible:ring-surface-action-secondary focus-visible:ring-offset-2",
										)}
									>
										View live
										<img
											src="/icons/arrow-up-right.svg"
											alt=""
											aria-hidden
											className="size-4 shrink-0 transition-transform duration-200 ease-out group-hover/button:translate-x-px group-hover/button:-translate-y-px motion-reduce:transition-none"
										/>
									</a>
								</div>
							</div>

							<ul className="grid grid-cols-2 gap-4 lg:flex-1 lg:grid-cols-3 lg:gap-6">
								{group.pages.map((page) => (
									<li key={page.slug} className="flex flex-col gap-2">
										<div className="aspect-4/3 overflow-hidden rounded-sm bg-surface-default ring-1 ring-hairline">
											<img
												src={page.thumbnail}
												alt={`${group.client} — ${page.name}`}
												loading="lazy"
												className="size-full object-cover object-top"
											/>
										</div>
										<span className="text-body-secondary text-paragraph-sm">
											{page.name}
										</span>
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
