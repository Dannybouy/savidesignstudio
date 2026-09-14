import { motion, type Variants } from "motion/react";
import { Button } from "@/components/ui/button";

const HEADLINE = "Learn to think and design like a PRO";
const BODY =
	"Our team delivers high quality branding, design & development that helps shape the future of your business.";

const stage: Variants = {
	hidden: {},
	shown: { transition: { delayChildren: 0.08, staggerChildren: 0.08 } },
};

const rise: Variants = {
	hidden: { opacity: 0, y: 16 },
	shown: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 300, damping: 32 },
	},
};

const unveil: Variants = {
	hidden: { opacity: 0, scale: 1.025 },
	shown: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
	},
};

const BAND_COLORS = [
	"bg-surface-action",
	"bg-[#6e5ba7]",
	"bg-[#c5bddc]",
	"bg-[#a89dca]",
	"bg-[#e5e1ef]",
] as const;

function ColorBand() {
	return (
		<div aria-hidden className="flex h-6 w-full overflow-hidden lg:hidden">
			{BAND_COLORS.map((color, index) => (
				<div
					key={color}
					className={`${color} ${index === 0 ? "w-[20%]" : index === 1 ? "w-[23%]" : index === 4 ? "flex-1" : "w-[20%]"}`}
				/>
			))}
		</div>
	);
}

function DesktopColorBand() {
	return (
		<div
			aria-hidden
			className="hidden h-6 w-full grid-cols-[80px_140px_100px_100px_1fr_100px_100px_140px_80px] overflow-hidden lg:grid"
		>
			<div className="bg-surface-action" />
			<div className="bg-[#6e5ba7]" />
			<div className="bg-[#c5bddc]" />
			<div className="bg-[#a89dca]" />
			<div className="bg-[#e5e1ef]" />
			<div className="bg-[#a89dca]" />
			<div className="bg-[#c5bddc]" />
			<div className="bg-[#6e5ba7]" />
			<div className="bg-surface-action" />
		</div>
	);
}

export default function Hero({ onRegister }: { onRegister: () => void }) {
	return (
		<motion.section
			initial="hidden"
			animate="shown"
			variants={stage}
			className="pt-6 lg:pt-0"
		>
			<div className="relative mx-auto w-full max-w-360 overflow-hidden px-6 pt-16 pb-6 lg:px-20 lg:py-20">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-x-20 bottom-0 hidden h-48 bg-[radial-gradient(55%_100%_at_50%_100%,color-mix(in_oklab,var(--color-surface-action-secondary)_30%,transparent)_0%,transparent_76%)] lg:block"
				/>

				<div className="relative flex flex-col items-start lg:items-center lg:text-center">
					<motion.h1
						variants={rise}
						className="max-w-full text-h2 lg:max-w-260 lg:text-display-2"
					>
						{HEADLINE.slice(0, -3)}
						<span className="bg-[linear-gradient(90deg,var(--color-surface-action)_0%,var(--color-surface-action-secondary)_100%)] bg-clip-text text-transparent">
							PRO
						</span>
					</motion.h1>

					<motion.p
						variants={rise}
						className="mt-4 max-w-145.25 text-body-primary text-paragraph lg:mt-6 lg:text-paragraph-lg"
					>
						{BODY}
					</motion.p>

					<motion.div variants={rise} className="mt-4 lg:mt-6">
						<Button
							type="button"
							variant="cta"
							size="cta"
							onClick={onRegister}
							className="lg:px-4"
						>
							Register for the Free Bootcamp
							<span
								aria-hidden
								className="grid size-8 shrink-0 place-items-center rounded-sm bg-surface-page shadow-[inset_-2px_2px_2px_0_rgb(255_255_255/0.25)] lg:hidden"
							>
								<img
									src="/icons/arrow-up-right.svg"
									alt=""
									className="size-5 transition-transform duration-200 ease-out group-hover/button:translate-x-px group-hover/button:-translate-y-px"
								/>
							</span>
						</Button>
					</motion.div>
				</div>
			</div>

			<ColorBand />
			<DesktopColorBand />

			<div className="mx-auto flex w-full max-w-360 justify-center px-6 pt-9 pb-28 lg:px-20 lg:pt-10 lg:pb-30">
				<motion.div
					variants={unveil}
					role="img"
					aria-label="Bootcamp video placeholder"
					className="aspect-[17/20] w-full max-w-85 bg-surface-action lg:aspect-[100/57] lg:max-w-250"
				/>
			</div>
		</motion.section>
	);
}
