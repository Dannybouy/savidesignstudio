import clarifyhouseLogo from "@/assets/clarifyhouse.svg";
import clarifyhouseCeo from "@/assets/clarifyhouse-ceo.png";
import deraLogo from "@/assets/dera.svg";
import hokLogo from "@/assets/hok.png";
import landsafeLogo from "@/assets/landsafe.svg";
import landsafeCeo from "@/assets/landsafe-ceo.png";
import q247Logo from "@/assets/q247.jpg";
import secsystemsLogo from "@/assets/secsystems.svg";

export type Service = {
	slug: string;
	title: string;
	description: string;
	features: string[];
};

// Copy for 02 through 06 is a draft. Figma repeats Branding's text across every
// row, so only Branding is final.
export const SERVICES: Service[] = [
	{
		slug: "branding",
		title: "Branding",
		description:
			"We craft identities that leave a lasting impression, from logo systems to full brand guidelines that speak your language",
		features: [
			"Brand Strategy",
			"Logo Design",
			"Visual Identity",
			"Style Guides",
		],
	},
	{
		slug: "web-design",
		title: "Web Design",
		description:
			"We design sites that hold up on every screen and guide visitors toward the one action that matters to your business",
		features: [
			"Responsive Layouts",
			"Design Systems",
			"Landing Pages",
			"Prototyping",
		],
	},
	{
		slug: "web-development",
		title: "Web Development",
		description:
			"We build what we design, with clean code, fast load times and a stack your team can maintain long after launch",
		features: [
			"Frontend Builds",
			"CMS Integration",
			"Performance",
			"Accessibility",
		],
	},
	{
		slug: "product-strategy",
		title: "Product Strategy",
		description:
			"We help you decide what to build first, turning research and business goals into a roadmap your team can ship",
		features: [
			"User Research",
			"Roadmapping",
			"Competitive Audits",
			"Success Metrics",
		],
	},
	{
		slug: "ui-ux-design",
		title: "UI/UX Design",
		description:
			"We shape flows and interfaces around how people actually work, so the product feels obvious the first time they open it",
		features: [
			"User Flows",
			"Wireframing",
			"Interface Design",
			"Usability Testing",
		],
	},
	{
		slug: "motion-design",
		title: "Motion Design",
		description:
			"We add movement that explains rather than decorates, from interface transitions to short films that introduce your brand",
		features: [
			"Interface Motion",
			"Explainer Videos",
			"Animated Logos",
			"Micro-interactions",
		],
	},
];

export type Testimonial = {
	slug: string;
	logo: string;
	logoAlt: string;
	quote: string;
	body: string;
	avatar: string;
	name: string;
	title: string;
};

// Only LandSafe and Clarify have real copy + photos so far. The 3rd slot
// repeats Clarify as a placeholder to keep the desktop peek layout intact
// until a third client's testimonial lands.
export const TESTIMONIALS: Testimonial[] = [
	{
		slug: "landsafe",
		logo: landsafeLogo,
		logoAlt: "LandSafe",
		quote:
			"What stood out most was the team's professionalism, clear communication, reliability, and attention to detail. Savi Design Studio was a dependable creative partner from start to finish, and we were impressed by the quality of the final work.",
		body: "Working with Savi Design Studio on our B2B website and back-office platform was a great experience. The team brought a strong understanding of UI/UX, combining thoughtful design decisions with practical problem-solving throughout the project. Their approach helped streamline our design process and contributed significantly to a faster development timeline.",
		avatar: landsafeCeo,
		name: "Temiloluwa Dosumu",
		title: "Founder & CEO",
	},
	{
		slug: "clarify",
		logo: clarifyhouseLogo,
		logoAlt: "Clarify",
		quote:
			"Within 24 hours of receiving the copy, Savi Design Studio simplified everything! It's designed for conversions, not just aesthetics.",
		body: "They were thinking through hierarchy, user behaviour and decision flow. The Clarify House website is very user friendly and easy to navigate.",
		avatar: clarifyhouseCeo,
		name: "Patricia Ihunwo",
		title: "Founder & CEO",
	},
	{
		slug: "clarify-repeat",
		logo: clarifyhouseLogo,
		logoAlt: "Clarify",
		quote:
			"Within 24 hours of receiving the copy, Savi Design Studio simplified everything! It's designed for conversions, not just aesthetics.",
		body: "They were thinking through hierarchy, user behaviour and decision flow. The Clarify House website is very user friendly and easy to navigate.",
		avatar: clarifyhouseCeo,
		name: "Patricia Ihunwo",
		title: "Founder & CEO",
	},
];

export type Logo = {
	slug: string;
	src: string;
	alt: string;
};

export const LOGOS: Logo[] = [
	{ slug: "hok", src: hokLogo, alt: "HOK" },
	{ slug: "landsafe", src: landsafeLogo, alt: "LandSafe" },
	{ slug: "clarify", src: clarifyhouseLogo, alt: "Clarify" },
	{ slug: "secsystems", src: secsystemsLogo, alt: "Secsystems" },
	{ slug: "dera", src: deraLogo, alt: "dera" },
	{ slug: "q247", src: q247Logo, alt: "Qc247" },
];

export type Faq = {
	slug: string;
	question: string;
	answer: string;
};

export const FAQS: Faq[] = [
	{
		slug: "project-timeline",
		question: "How long does a typical project take?",
		answer:
			"We craft identities that leave a lasting impressions, from logo systems to full brand guidelines that speak your language",
	},
	{
		slug: "pricing",
		question: "How much does a project cost?",
		answer:
			"Pricing depends on scope and deliverables, so every quote is tailored after a discovery call rather than pulled from a flat rate card.",
	},
	{
		slug: "revisions",
		question: "How many rounds of revisions do I get?",
		answer:
			"Every package includes two structured revision rounds per deliverable, with additional rounds available if the scope grows along the way.",
	},
	{
		slug: "deliverables",
		question: "What do I actually receive at the end?",
		answer:
			"Final source files, a usage guide, and every asset in the formats your team needs to ship without coming back to us for exports.",
	},
	{
		slug: "communication",
		question: "How do we communicate during the project?",
		answer:
			"A dedicated channel plus weekly check-ins keep you across progress, with async updates in between so nothing waits on a scheduled call.",
	},
];
