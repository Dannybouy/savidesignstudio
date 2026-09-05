import { motion, type Variants } from "motion/react";
import cardImageOne from "../assets/about-card-image-1.avif";
import cardImageTwo from "../assets/about-card-image-2.avif";
import { Card } from "./ui/card";

const EYEBROW = "Who We Are";

const HEADLINE =
	"We are a global design agency dedicated to building smarter and adaptive";

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
	shown: { transition: { staggerChildren: 0.07 } },
};

const cardRise: Variants = {
	hidden: { opacity: 0, y: 28, scale: 0.97 },
	shown: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { type: "spring", stiffness: 260, damping: 30, mass: 0.9 },
	},
};

// Cards keep their scroll-reveal transform on the motion wrapper and their
// hover scale in CSS on the shell, so Motion's inline transform never fights
// the hover state. Tailwind v4 already gates `hover:` behind `(hover: hover)`.
const HOVER_LIFT =
	"transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:scale-100";

// 16px padding comes from the card-spacing var rather than `size="sm"`, whose
// `group-data-[size=sm]/card:text-sm` would otherwise shrink the stat type.
const CARD_SHELL =
	"h-95.5 justify-between gap-0 rounded-lg px-4 shadow-none ring-0 [--card-spacing:--spacing(4)]";

function CardArtwork({ src }: { src: string }) {
	return (
		<div aria-hidden className="absolute inset-0 -z-10">
			<img src={src} alt="" loading="lazy" className="size-full object-cover" />
		</div>
	);
}

export default function About() {
	return (
		<motion.section
			id="about"
			initial="hidden"
			whileInView="shown"
			viewport={{ once: true, amount: 0.2 }}
			variants={stage}
			className="bg-surface-default"
		>
			<div className="mx-auto flex w-full max-w-360 flex-col px-6 py-12 lg:px-20 lg:py-20">
				<div className="flex flex-col items-start gap-4 lg:mx-auto lg:items-center lg:gap-5">
					<motion.p
						variants={rise}
						className="rounded-sm bg-surface-disabled px-2 py-1 text-heading text-paragraph-sm"
					>
						{EYEBROW}
					</motion.p>

					<motion.h2
						variants={wordMask}
						className="text-h2 lg:max-w-300 lg:text-center lg:text-h1"
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

				<motion.div
					variants={deck}
					className="mt-8 grid w-full grid-cols-1 gap-4 lg:mx-auto lg:mt-12 lg:max-w-299.75 lg:grid-cols-3"
				>
					<motion.div variants={cardRise}>
						<Card
							className={`${CARD_SHELL} ${HOVER_LIFT} relative isolate border-0 text-on-action`}
						>
							<CardArtwork src={cardImageOne} />
							<p className="text-lg leading-6 tracking-[-0.5px] text-[#f5f5f5]">Projects Delivered</p>
							<div className="flex flex-col gap-1">
								<p className="text-[3.5rem] font-heading text-white leading-16 tracking-[-2px]">120+</p>
								<p className="text-lg leading-6 tracking-[-0.5px] text-[#f5f5f5]">
									Collaborating with leading AI and cloud technology providers.
								</p>
							</div>
						</Card>
					</motion.div>

					<motion.div variants={cardRise}>
						<Card
							className={`${CARD_SHELL} ${HOVER_LIFT} border-0 bg-black text-on-action`}
						>
							<p className="text-lg leading-6 tracking-[-0.5px] text-[#f5f5f5]">
								Client&rsquo;s Satisfaction
							</p>
							<div className="flex flex-col gap-1">
								<p className="text-[3.5rem] font-heading text-stat-gradient leading-16 tracking-[-2px]">98%</p>
								<blockquote className="text-lg text-on-action">
									&ldquo;Their automation strategy completely reshaped how we
									work. It&rsquo;s efficient, intelligent, and seamless.&rdquo;
								</blockquote>
							</div>
						</Card>
					</motion.div>

					{/* One card slot split 70/30 — the pair scales together on hover so it
					    still reads as a single column. */}
					<motion.div variants={cardRise}>
						<div
							className={`grid h-95.5 grid-rows-[6fr_3fr] gap-4 ${HOVER_LIFT}`}
						>
							<Card
								className={`${CARD_SHELL} h-auto min-h-0 bg-surface-page`}
							>
								<p className="text-lg text-body-secondary">
									In The Industry
								</p>
								<div className="flex flex-col gap-1">
									<p className="text-[3.5rem] font-heading text-[#262626] leading-16 tracking-[-2px]">10 yrs</p>
									<p className="text-lg text-body-secondary">
										Analyzed monthly to power smarter business strategies.
									</p>
								</div>
							</Card>

							<Card
								className={`${CARD_SHELL} relative isolate h-auto min-h-0 flex-row items-center border-0 text-on-action`}
							>
								<CardArtwork src={cardImageTwo} />
								<p className="text-lg leading-6 tracking-[-0.5px] text-[#f5f5f5]">Global Clients</p>
								<p className="text-[3.5rem] font-heading text-white leading-16 tracking-[-2px]">20+</p>
							</Card>
						</div>
					</motion.div>
				</motion.div>
			</div>
		</motion.section>
	);
}
