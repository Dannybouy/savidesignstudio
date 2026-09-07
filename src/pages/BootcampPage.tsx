import {
	Banner,
	BannerAction,
	BannerDescription,
	BannerTitle,
} from "@/components/Banner";
import Hero from "@/components/bootcamp/Hero";
import Offerings from "@/components/bootcamp/Offerings";
import Tools from "@/components/bootcamp/Tools";

export default function BootcampPage() {
	return (
		<main className="relative">
			<title>UI/UX Bootcamp 1.0 | Savi Design Studio</title>
			<Hero />
			<Banner
				id="bootcamp-registration"
				containerClassName="pt-0 pb-12 lg:pt-0 lg:pb-4"
			>
				<BannerTitle>
					Master UI/UX. Build your portfolio. Launch your career.
				</BannerTitle>
				<BannerDescription>
					A 6-week program to learn AI and Figma, get expert mentorship, join a
					thriving design community, and access exclusive job opportunities.
				</BannerDescription>
				<BannerAction to="/#book-a-call">
					Register for the Bootcamp
				</BannerAction>
			</Banner>
			<Offerings />
			<Tools />
		</main>
	);
}
