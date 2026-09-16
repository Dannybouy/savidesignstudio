import { motion, type Variants } from "motion/react";
import griddedPattern from "../assets/gridded-pattern.avif";
import { Card, CardDescription, CardTitle } from "./ui/card";

const EYEBROW = "How We Work";

const HEADLINE = "We work through a process you can trust";

const STEPS = [
	{
		title: "Discovery",
		description:
			"We dig into your brand, audience, and goals. No guesswork, just clarity.",
	},
	{
		title: "Strategy",
		description:
			"A clear creative direction built around your objectives and competitive landscape.",
	},
	{
		title: "Design",
		description:
			"Iterative design with your feedback at every checkpoint. You're always in the loop.",
	},
	{
		title: "Deliver",
		description:
			"Clean handoff with all assets, documentation, and ongoing support if needed.",
	},
] as const;

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

const cardStage: Variants = {
	hidden: { opacity: 0, y: 28, scale: 0.97 },
	shown: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 260,
			damping: 30,
			mass: 0.9,
			staggerChildren: 0.07,
			delayChildren: 0.08,
		},
	},
};

const fade: Variants = {
	hidden: { opacity: 0 },
	shown: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const CARD_SHELL =
	"h-full gap-6 rounded-lg bg-heading px-4 py-5 shadow-none ring-0 [--card-spacing:--spacing(4)] lg:min-h-64 lg:justify-between lg:px-5 lg:py-6";

function HatchBand() {
	return (
		<div
			aria-hidden
			className="mt-8 h-6 w-full shrink-0 overflow-hidden lg:mt-12 lg:h-20"
		>
			<motion.img
				variants={fade}
				src={griddedPattern}
				alt=""
				className="size-full object-none object-center"
			/>
		</div>
	);
}

export default function HowWeWork() {
	return (
		<motion.section
			id="how-we-work"
			initial="hidden"
			whileInView="shown"
			viewport={{ once: true, amount: 0.2 }}
			variants={stage}
			className="bg-black"
		>
			<div className="mx-auto flex w-full max-w-360 flex-col px-6 py-12 lg:px-20 lg:py-20">
				<div className="flex flex-col items-center gap-4">
					<motion.p
						variants={rise}
						className="rounded-sm bg-white/10 px-2 py-1 text-on-action text-paragraph-sm"
					>
						{EYEBROW}
					</motion.p>

					<motion.h2
						variants={wordMask}
						className="text-center text-h1-mobile text-on-action lg:text-h1"
					>
						{HEADLINE.split(" ").map((token, index) => (
							<span
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

				<motion.div
					variants={deck}
					className="mt-8 grid w-full grid-cols-1 gap-4 lg:mx-auto lg:mt-12 lg:max-w-300 lg:grid-cols-4"
				>
					{STEPS.map((step, index) => (
						<motion.div key={step.title} variants={cardStage}>
							<Card className={CARD_SHELL}>
								<motion.span
									variants={rise}
									className="text-body-secondary text-paragraph-sm"
								>
									{String(index + 1).padStart(2, "0")}
								</motion.span>

								<div className="flex flex-col gap-2">
									<CardTitle className="text-h3 text-on-action">
										<span className="inline-block overflow-hidden align-bottom">
											<motion.span variants={word} className="inline-block">
												{step.title}
											</motion.span>
										</span>
									</CardTitle>
									<CardDescription className="text-body-secondary text-paragraph">
										<motion.span variants={rise} className="block">
											{step.description}
										</motion.span>
									</CardDescription>
								</div>
							</Card>
						</motion.div>
					))}
				</motion.div>

				<HatchBand />
			</div>
		</motion.section>
	);
}
