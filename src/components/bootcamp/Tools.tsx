import { motion, type Variants } from "motion/react";
import griddedPattern from "@/assets/gridded-pattern.avif";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import {
	BOOTCAMP_TOOLS,
	BOOTCAMP_TOOLS_COPY,
	type BootcampTool,
} from "@/lib/constants";

const stage: Variants = {
	hidden: {},
	shown: { transition: { delayChildren: 0.06, staggerChildren: 0.08 } },
};

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

function ToolLogo({ tool }: { tool: BootcampTool }) {
	if (tool.slug === "openai") {
		return (
			<span className="block size-8 overflow-hidden" title={tool.name}>
				<img
					src={tool.src}
					alt={tool.name}
					loading="lazy"
					className="h-8 w-auto max-w-none"
				/>
			</span>
		);
	}

	return (
		<img
			src={tool.src}
			alt={tool.name}
			loading="lazy"
			className={
				tool.slug === "miro"
					? "h-9 w-auto"
					: tool.slug === "figma"
						? "h-9 w-auto"
						: "size-8"
			}
		/>
	);
}

function HatchBand() {
	return (
		<div
			aria-hidden
			className="mt-12 h-6 w-full shrink-0 overflow-hidden px-6 lg:mt-14 lg:h-20 lg:px-20"
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

export default function Tools() {
	return (
		<motion.section
			id="tools"
			initial="hidden"
			whileInView="shown"
			viewport={{ once: true, amount: 0.2 }}
			variants={stage}
			className="bg-surface-page"
		>
			<div className="mx-auto flex w-full max-w-360 flex-col items-center px-6 pt-12 text-center lg:px-20 lg:pt-14">
				<motion.p
					variants={rise}
					className="bg-surface-default px-2 py-1 text-heading text-paragraph-sm"
				>
					{BOOTCAMP_TOOLS_COPY.eyebrow}
				</motion.p>

				<motion.h2
					variants={rise}
					className="mt-5 max-w-230 text-h1-mobile lg:text-h1"
				>
					{BOOTCAMP_TOOLS_COPY.title}
				</motion.h2>

				<motion.p
					variants={rise}
					className="mt-4 max-w-150 text-body-secondary text-paragraph lg:text-paragraph-lg"
				>
					{BOOTCAMP_TOOLS_COPY.description}
				</motion.p>

				<motion.div variants={fade} className="mt-12 w-full lg:mt-14">
					<InfiniteSlider
						gap={48}
						speed={24}
						speedOnHover={10}
						className="mask-[linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]"
					>
						{BOOTCAMP_TOOLS.map((tool) => (
							<div
								key={tool.slug}
								className="flex h-12 w-24 shrink-0 items-center justify-center lg:w-28"
							>
								<ToolLogo tool={tool} />
							</div>
						))}
					</InfiniteSlider>
				</motion.div>
			</div>

			<HatchBand />
		</motion.section>
	);
}
