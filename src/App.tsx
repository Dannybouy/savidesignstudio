import { MotionConfig } from "motion/react";
import About from "./components/About";
import {
	Banner,
	BannerAction,
	BannerDescription,
	BannerTitle,
} from "./components/Banner";
import Hero from "./components/Hero";
import HowWeWork from "./components/HowWeWork";
import Navbar from "./components/Navbar";
import Services from "./components/Services";

export default function App() {
	return (
		// "user" makes every motion component drop transform and layout animation
		// when the visitor prefers reduced motion, keeping only the fades.
		<MotionConfig reducedMotion="user">
			<div className="relative min-h-screen">
				{/* Layout grid rules that run the full height of the page, aligned to
				    the 1440px container gutters. Desktop only — the mobile frame has
				    none. */}
				<div
					aria-hidden
					className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-360 -translate-x-1/2 lg:block"
				>
					<div className="absolute inset-y-0 left-20 w-px bg-hairline" />
					<div className="absolute inset-y-0 right-20 w-px bg-hairline" />
				</div>

				<Navbar />

				{/* Sections own their own container and gutters so full-bleed dividers
				    can run edge to edge. */}
				<main className="relative">
					<Hero />
					<About />
					<Banner id="bootcamp">
						<BannerTitle>
							Join Savi Design Studio UI/UX Bootcamp 1.0
						</BannerTitle>
						<BannerDescription>
							A 6-weeks program to learn AI tools and Figma, get expert
							mentorship, join a thriving design community, and access exclusive
							job opportunities.
						</BannerDescription>
						<BannerAction href="#bootcamp-details">
							See more details
						</BannerAction>
					</Banner>
					<Services />
					<HowWeWork />
				</main>
			</div>
		</MotionConfig>
	);
}
