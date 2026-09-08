import { motion, type Variants } from "motion/react";
import footerBackground from "@/assets/footer-bg.avif";
import { buttonVariants } from "@/components/ui/button";
import { SOCIAL_LINKS, type SocialLink } from "@/lib/constants";

const HEADLINE = "Ready to partner with us on your business or product?";

const BODY =
	"Everything you might need to know about our services and processes - from inception to delivery";

const stage: Variants = {
	hidden: {},
	shown: { transition: { delayChildren: 0.05, staggerChildren: 0.09 } },
};

const rise: Variants = {
	hidden: { opacity: 0, y: 16 },
	shown: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 300, damping: 32 },
	},
};

function getCopyrightNotice(year = new Date().getFullYear()): string {
	return `© Savi Design Co ${year}. All rights reserved.`;
}

function SocialIcon({ platform }: { platform: SocialLink["platform"] }) {
	if (platform === "instagram") {
		return (
			<img src="/icons/instagram.svg" alt="Instagram" className="size-6" />
		);
	}

	if (platform === "linkedin") {
		return <img src="/icons/linkedin.svg" alt="LinkedIn" className="size-6" />;
	}

	return <img src="/icons/whatsapp.svg" alt="WhatsApp" className="size-6" />;
}

export default function Footer() {
	return (
		<motion.footer
			id="book-a-call"
			initial="hidden"
			whileInView="shown"
			viewport={{ once: true, amount: 0.15 }}
			variants={stage}
			className="relative isolate min-h-168 overflow-hidden rounded-t-[2rem] text-on-action lg:min-h-160 lg:rounded-t-[3rem]"
		>
			<img
				src={footerBackground}
				alt="footer background"
				loading="lazy"
				decoding="async"
				className="absolute inset-0 -z-20 size-full object-cover object-bottom"
			/>
			<div
				aria-hidden
				className="absolute inset-0 -z-10 bg-linear-to-b from-black/5 via-black/5 to-black/45"
			/>

			<div className="mx-auto flex min-h-168 w-full max-w-360 flex-col px-6 pt-16 pb-6 lg:min-h-160 lg:px-20 lg:pt-20 lg:pb-8">
				<div className="flex flex-1 flex-col items-center justify-center pb-14 text-center lg:pb-12">
					<motion.h2
						variants={rise}
						className="max-w-230 font-heading text-[2.5rem] leading-11 tracking-[-1.5px] text-on-action lg:text-display-2 lg:leading-16"
					>
						{HEADLINE}
					</motion.h2>

					<motion.p
						variants={rise}
						className="mt-6 max-w-lg text-paragraph text-white/85 lg:mt-8 lg:text-paragraph-lg"
					>
						{BODY}
					</motion.p>

					<div className="flex items-center gap-2">

					
					<motion.a
						variants={rise}
						href="http://calendly.com/savidesignstudio2"
						target="_blank"
						rel="noopener noreferrer"
						className={buttonVariants({
							size: "cta",
							variant: "outline",
							className:
								"mt-8 border-transparent bg-surface-page text-heading hover:bg-surface-default lg:mt-10",
						})}
					>
						Grab A Free Call
						<span
							aria-hidden
							className="grid size-8 shrink-0 place-items-center rounded-sm bg-action-gradient shadow-[inset_-2px_2px_2px_0_rgb(255_255_255/0.25)]"
						>
							<img
								src="/icons/arrow-up-right.svg"
								alt=""
								className="size-5 brightness-0 invert transition-transform duration-200 ease-out group-hover/button:translate-x-px group-hover/button:-translate-y-px"
							/>
						</span>
					</motion.a>

					<motion.a
						variants={rise}
						href="mailto:Savidesignstudio2@gmail.com"
						target="_blank"
						rel="noopener noreferrer"
						className={buttonVariants({
							size: "default",
							variant: "outline",
							className:
								"mt-8 border border-white bg-transparent text-white hover:bg-white lg:mt-10",
						})}
					>
						Send us a mail
					</motion.a>
					</div>
				</div>

				<motion.div
					variants={rise}
					className="flex flex-col items-center gap-5 border-white/60 border-t pt-6 sm:flex-row sm:justify-between"
				>
					<p className="text-center text-sm text-white/90 sm:text-left lg:text-paragraph">
						{getCopyrightNotice()}
					</p>

					<ul className="flex items-center gap-7" aria-label="Social media">
						{SOCIAL_LINKS.map((social) => {
							return (
								<li key={social.platform}>
									<a
										href={social.href}
										target="_blank"
										rel="noreferrer"
										aria-label={social.label}
										className="block rounded-sm text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-4 motion-reduce:transition-none"
									>
										<SocialIcon platform={social.platform} />
									</a>
								</li>
							);
						})}
					</ul>
				</motion.div>
			</div>
		</motion.footer>
	);
}
