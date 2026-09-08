import { motion, type Variants } from "motion/react";
import griddedPattern from "@/assets/gridded-pattern.avif";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { FAQS, LOGOS } from "@/lib/constants";

const TRUSTED_BY = "Trusted by leading brands who have enrolled our services";

const EYEBROW = "FAQs";

const HEADLINE = "Questions you might have";

const BODY =
	"Everything you might need to know about our services and processes - from inception to delivery";

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

const fade: Variants = {
	hidden: { opacity: 0 },
	shown: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

function HatchBand() {
	return (
		<div
			aria-hidden
			className="mt-12 h-6 w-full shrink-0 overflow-hidden lg:h-20"
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

function TrustedByLogos() {
	return (
		<div className="flex flex-col gap-8 lg:gap-10">
			<motion.p
				variants={rise}
				className="text-center text-body-secondary text-paragraph"
			>
				{TRUSTED_BY}
			</motion.p>

			<motion.div variants={fade}>
				<InfiniteSlider
					gap={56}
					speed={30}
					speedOnHover={12}
					className="mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
				>
					{LOGOS.map((logo) => (
						<img
							key={logo.slug}
							src={logo.src}
							alt={logo.alt}
							loading="lazy"
							className="pointer-events-none h-5 w-auto select-none object-contain lg:h-6"
						/>
					))}
				</InfiniteSlider>
			</motion.div>
		</div>
	);
}

export default function FAQ() {
	return (
		<motion.section
			id="faq"
			initial="hidden"
			whileInView="shown"
			viewport={{ once: true, amount: 0.2 }}
			variants={stage}
			className="bg-surface-page"
		>
			<div className="mx-auto flex w-full max-w-360 flex-col px-6 py-12 lg:px-20 lg:py-20">
				<TrustedByLogos />

				<div className="mt-12 border-hairline border-t lg:mt-16" />

				<div className="mt-12 flex flex-col gap-10 lg:mt-16 lg:flex-row lg:justify-between">
					<div className="flex flex-col items-start gap-4 lg:w-95 lg:shrink-0">
						<motion.p
							variants={rise}
							className="rounded-sm bg-surface-disabled px-2 py-1 text-heading text-paragraph-sm"
						>
							{EYEBROW}
						</motion.p>

						<motion.h2
							variants={wordMask}
							className="text-h1-mobile lg:text-h1"
						>
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

						<motion.p
							variants={rise}
							className="text-body-secondary text-paragraph"
						>
							{BODY}
						</motion.p>

						<motion.a
							variants={rise}
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
						</motion.a>
					</div>

					<Accordion
						defaultValue={[FAQS[0].slug]}
						className="flex flex-col gap-3 lg:max-w-2xl"
					>
						{FAQS.map((faq) => (
							<AccordionItem
								key={faq.slug}
								value={faq.slug}
								className="not-last:border-b-0 rounded-sm bg-surface-default px-4 lg:px-6"
							>
								<AccordionTrigger className="text-heading text-xl font-medium hover:no-underline">
									{faq.question}
								</AccordionTrigger>
								<AccordionContent className="text-base text-body-secondary">
									{faq.answer}
								</AccordionContent>
							</AccordionItem>
						))}
					</Accordion>
				</div>
			</div>

			<HatchBand />
		</motion.section>
	);
}
