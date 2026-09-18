import { motion, type Variants } from "motion/react";
import { Link } from "react-router";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import {
	BOOTCAMP_OFFERINGS,
	BOOTCAMP_OFFERINGS_COPY,
	type BootcampOffering,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const stage: Variants = {
	hidden: {},
	shown: { transition: { delayChildren: 0.08, staggerChildren: 0.08 } },
};

const rise: Variants = {
	hidden: { opacity: 0, y: 18 },
	shown: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 280, damping: 30 },
	},
};

const cardBackground: Record<BootcampOffering["cardStyle"], string> = {
	navy: "bg-surface-action",
	midnight:
		"bg-[radial-gradient(100%_85%_at_100%_0%,#51476f_0%,#17183d_48%,#05060d_100%)]",
};

function CourseCard({
	offering,
	className,
}: {
	offering: BootcampOffering;
	className?: string;
}) {
	return (
		<article
			className={cn(
				"relative isolate flex w-full flex-col space-y-6 overflow-hidden text-on-action p-5 lg:p-6 min-h-84",
				cardBackground[offering.cardStyle],
				className,
			)}
		>
			<div className="relative space-y-2">
				<div className="flex items-center justify-between bg-white/20 p-1 rounded-xs w-fit">
					<p className="text-white text-paragraph-sm">{offering.audience}</p>
				</div>
				<h4 className="text-h2 text-on-action">{offering.name}</h4>
				<p className="text-[#d4d4d4] text-sm text-pretty lg:text-paragraph lg:max-w-3/4">
					{offering.subtitle}
				</p>
			</div>

			<div className="border-white/18 border-t"/>

			<dl className="grid grid-cols-4 gap-x-4 gap-y-4">
				{offering.details.map((detail) => (
					<div key={detail.label} className="max-w-24">
						<dt className="text-[0.6875rem] text-on-action/50 leading-4">
							{detail.label}
						</dt>
						<dd className="mt-0.5 whitespace-normal text-[0.75rem] text-on-action leading-4 capitalize">
							{detail.value}
						</dd>
					</div>
				))}
			</dl>

			<div className="mt-auto">
				<p className="relative mb-2 font-heading text-[2.5rem] tracking-[-1px] line-through">
					{offering.price}
				</p>

				<Link
					to={offering.ctaHref}
					target="_blank"
					rel="noopener noreferrer"
					className={buttonVariants({
						variant: "ghost",
						size: "default",
						className:
							"bg-surface-page text-heading hover:bg-surface-page/90",
					})}
				>
					{offering.ctaLabel}
					<span
						aria-hidden
						className="grid size-7 place-items-center rounded-sm bg-action-gradient"
					>
						<img
							src="/icons/arrow-up-right.svg"
							alt=""
							className="size-4 brightness-0 invert"
						/>
					</span>
				</Link>
				<p className="mt-2 text-sm text-[#d4d4d4] leading-4">
					{offering.availability}
				</p>
			</div>
		</article>
	);
}

function CurriculumSection({ offering }: { offering: BootcampOffering }) {
	return (
		<div className="mt-5 border border-hairline p-4 lg:mt-6 lg:p-8">
			<div className="flex flex-col gap-2 border-hairline border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<p className="text-surface-action-secondary text-paragraph-sm">
						{offering.name}
					</p>
					<h4 className="mt-2 text-h3">What this class covers</h4>
				</div>
				<p className="text-body-secondary text-paragraph-sm">
					Open a module to read its outcomes
				</p>
			</div>

			<Accordion className="mt-2">
				{offering.curriculum.map((module) => (
					<AccordionItem
						key={module.slug}
						value={`${offering.slug}-${module.slug}`}
						className="border-hairline"
					>
						<AccordionTrigger className="items-center py-5 text-heading text-paragraph-lg hover:no-underline">
							<span className="flex items-center gap-3">
								{module.title}
								<span className="bg-surface-default px-2 py-1 text-body-secondary text-[0.6875rem] leading-none">
									{module.items.length} outcomes
								</span>
							</span>
						</AccordionTrigger>
						<AccordionContent className="pb-6">
							<ul className="grid gap-x-10 gap-y-4 lg:grid-cols-2">
								{module.items.map((item) => (
									<li
										key={item}
										className="flex items-start gap-3 text-body-secondary text-paragraph-sm"
									>
										<img
											src="/icons/sparkle.svg"
											alt=""
											className="mt-0.5 size-4 shrink-0"
										/>
										<span>{item}</span>
									</li>
								))}
							</ul>
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</div>
	);
}

function CompareAndExpand() {
	return (
		<article className="mt-10 lg:mt-20">
			<div className="-mx-6 mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden lg:mx-0 lg:mt-8 lg:grid lg:grid-cols-2 lg:overflow-visible lg:px-0 lg:pb-0">
				{BOOTCAMP_OFFERINGS.map((offering) => (
					<CourseCard
						key={offering.slug}
						offering={offering}
						className="w-[calc(100%-2rem)] shrink-0 snap-center sm:w-90 lg:w-auto lg:shrink"
					/>
				))}
			</div>

			{BOOTCAMP_OFFERINGS.map((offering) => (
				<CurriculumSection key={offering.slug} offering={offering} />
			))}
		</article>
	);
}

export default function Offerings() {
	return (
		<motion.section
			id="offerings"
			initial="hidden"
			whileInView="shown"
			viewport={{ once: true, amount: 0.05 }}
			variants={stage}
			className="bg-surface-page"
		>
			<div className="mx-auto w-full px-6 py-20 lg:px-20">
				<div className="flex flex-col items-center">
					<motion.p
						variants={rise}
						className="inline-flex bg-surface-disabled px-2 py-1 text-heading text-paragraph-sm rounded"
					>
						{BOOTCAMP_OFFERINGS_COPY.eyebrow}
					</motion.p>
					<motion.h2 variants={rise} className="mt-4 text-h1-mobile lg:text-h1">
						{BOOTCAMP_OFFERINGS_COPY.title}
					</motion.h2>
				</div>

				<CompareAndExpand />
			</div>
		</motion.section>
	);
}
