import Autoplay from "embla-carousel-autoplay";
import { motion, type Variants } from "motion/react";
import { useRef } from "react";
import { Card } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { TESTIMONIALS, type Testimonial } from "@/lib/constants";

const EYEBROW = "Testimonials";

const HEADLINE = "What our clients have said about us";

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

const rise: Variants = {
	hidden: { opacity: 0, y: 16 },
	shown: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 300, damping: 32 },
	},
};

// `position: static` makes the default component's inset offsets inert, so
// only the leftover margin needs cancelling to sit the arrows inline in the
// header row instead of pinned to the carousel's outer edges.
const NAV_BUTTON_CLASS = "static my-0";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
	return (
		<Card className="h-full justify-between p-8 lg:p-10">
			<div className="flex flex-col gap-6">
				<img
					src={testimonial.logo}
					alt={testimonial.logoAlt}
					className="h-7 w-auto object-contain object-left"
				/>

				<div className="flex flex-col gap-4">
					<p className="text-heading text-paragraph-lg font-medium">
						&ldquo;{testimonial.quote}&rdquo;
					</p>
					<p className="text-body-secondary text-paragraph">
						{testimonial.body}
					</p>
				</div>
			</div>

			<div className="flex items-center gap-3 pt-8">
				<img
					src={testimonial.avatar}
					alt={testimonial.name}
					className="size-11 shrink-0 rounded-full object-cover"
				/>
				<div className="flex flex-col">
					<span className="text-heading text-paragraph font-medium">
						{testimonial.name}
					</span>
					<span className="text-body-secondary text-paragraph-sm">
						{testimonial.title}
					</span>
				</div>
			</div>
		</Card>
	);
}

export default function Testimonials() {
	const autoplay = useRef(
		Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true }),
	);

	return (
		<motion.section
			initial="hidden"
			whileInView="shown"
			viewport={{ once: true, amount: 0.2 }}
			variants={stage}
			className="bg-surface-default"
		>
			<div className="mx-auto flex w-full max-w-360 flex-col px-6 py-12 lg:px-20 lg:py-20">
				<Carousel
					opts={{ loop: true, align: "start" }}
					plugins={[autoplay.current]}
					className="flex flex-col"
				>
					<div className="flex items-end justify-between gap-4">
						<div className="flex flex-col gap-4">
							<motion.p
								variants={rise}
								className="text-body-secondary text-paragraph-sm"
							>
								{EYEBROW}
							</motion.p>

							<motion.h2
								variants={wordMask}
								className="text-h1-mobile lg:text-h1"
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
							variants={rise}
							className="flex shrink-0 items-center gap-3"
						>
							<CarouselPrevious className={NAV_BUTTON_CLASS} />
							<CarouselNext className={NAV_BUTTON_CLASS} />
						</motion.div>
					</div>

					<CarouselContent className="mt-8 lg:mt-12">
						{TESTIMONIALS.map((testimonial) => (
							<CarouselItem
								key={testimonial.slug}
								className="basis-[88%] lg:basis-[35%]"
							>
								<motion.div variants={rise} className="h-full">
									<TestimonialCard testimonial={testimonial} />
								</motion.div>
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</motion.section>
	);
}
