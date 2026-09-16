import About from "@/components/About";
import {
	Banner,
	BannerAction,
	BannerDescription,
	BannerTitle,
} from "@/components/Banner";
import FAQ from "@/components/FAQ";
import Hero from "@/components/Hero";
import HowWeWork from "@/components/HowWeWork";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
	return (
		<main className="relative">
			<title>Design Agency in Lagos, Nigeria | Savi Design Studio</title>
			<Hero />
			<About />
			<Banner id="bootcamp">
				<BannerTitle>Join Savi Design Studio UI/UX Bootcamp 1.0</BannerTitle>
				<BannerDescription>
					A 6-weeks program to learn AI tools and Figma, get expert mentorship,
					join a thriving design community, and access exclusive job
					opportunities.
				</BannerDescription>
				<BannerAction to="/bootcamp">See more details</BannerAction>
			</Banner>
			<Services />
			<HowWeWork />
			<Projects />
			<Testimonials />
			<FAQ />
		</main>
	);
}
