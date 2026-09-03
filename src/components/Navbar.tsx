import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { useState } from "react";

const NAV_LINKS = [
	{ label: "Home", href: "#home" },
	{ label: "Services", href: "#services" },
	{ label: "Projects", href: "#projects" },
	{ label: "About", href: "#about" },
	{ label: "Contact", href: "#contact" },
];

const listVariants: Variants = {
	open: { transition: { delayChildren: 0.08, staggerChildren: 0.07 } },
	closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const linkVariants: Variants = {
	open: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", stiffness: 420, damping: 32 },
	},
	closed: { opacity: 0, y: 24, transition: { duration: 0.15 } },
};

const iconVariants: Variants = {
	initial: { opacity: 0, rotate: -90, scale: 0.6 },
	animate: { opacity: 1, rotate: 0, scale: 1 },
	exit: { opacity: 0, rotate: 90, scale: 0.6 },
};

export default function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 h-(--nav-h) border-hairline border-b bg-surface-page/80 backdrop-blur-md">
			<div className="mx-auto flex h-full max-w-360 items-center gap-4 px-6 lg:gap-0 lg:px-20">
				<div className="flex h-8 flex-1 items-center justify-between lg:h-15 lg:px-4">
					<a
						href="#home"
						aria-label="Savi Design Studio — home"
						className="shrink-0"
					>
						<img
							src="/logo.svg"
							alt="Savi Design Studio"
							className="h-7 w-16 lg:h-8 lg:w-19"
						/>
					</a>

					<nav aria-label="Main" className="hidden lg:block">
						<ul className="flex items-center gap-4">
							{NAV_LINKS.map((link) => (
								<li key={link.href}>
									<a
										href={link.href}
										className="flex h-8 items-center rounded-lg px-4 text-heading text-paragraph transition-colors hover:text-surface-action-secondary"
									>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</nav>

					<a
						href="#book-a-call"
						className="flex items-center justify-center rounded-sm bg-surface-action-secondary px-3 py-1.5 text-center font-medium text-on-action text-paragraph lg:px-4 lg:py-2"
					>
						Book a Call
					</a>
				</div>

				<button
					type="button"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
					aria-expanded={isMenuOpen}
					aria-controls="mobile-menu"
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					className="grid size-6 shrink-0 place-items-center text-heading lg:hidden"
				>
					<AnimatePresence initial={false} mode="wait">
						<motion.span
							key={isMenuOpen ? "close" : "menu"}
							variants={iconVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							transition={{ duration: 0.2, ease: "easeOut" }}
							className="col-start-1 row-start-1 flex"
						>
							{isMenuOpen ? (
								<X className="size-6" />
							) : (
								<Menu className="size-6" />
							)}
						</motion.span>
					</AnimatePresence>
				</button>
			</div>

			<AnimatePresence>
				{isMenuOpen && (
					<motion.nav
						id="mobile-menu"
						aria-label="Mobile"
						initial={{ height: 0 }}
						animate={{ height: "auto" }}
						exit={{ height: 0 }}
						transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
						className="absolute inset-x-0 top-full overflow-hidden border-hairline border-b bg-surface-page/95 backdrop-blur-md lg:hidden"
					>
						<motion.ul
							variants={listVariants}
							initial="closed"
							animate="open"
							exit="closed"
							className="flex flex-col gap-1 px-6 py-4"
						>
							{NAV_LINKS.map((link) => (
								<motion.li key={link.href} variants={linkVariants}>
									<a
										href={link.href}
										onClick={() => setIsMenuOpen(false)}
										className="flex h-10 items-center rounded-lg px-4 text-heading text-paragraph transition-colors hover:text-surface-action-secondary"
									>
										{link.label}
									</a>
								</motion.li>
							))}
						</motion.ul>
					</motion.nav>
				)}
			</AnimatePresence>
		</header>
	);
}
