import clarifyhouseLogo from "@/assets/clarifyhouse.svg";
import clarifyhouseCeo from "@/assets/clarifyhouse-ceo.png";
import deraLogo from "@/assets/dera.svg";
import hokLogo from "@/assets/hok.png";
import landsafeLogo from "@/assets/landsafe.svg";
import landsafeCeo from "@/assets/landsafe-ceo.png";
import projectCh1 from "@/assets/project-ch-1.avif";
import projectCh2 from "@/assets/project-ch-2.avif";
import projectDera1 from "@/assets/project-dera-1.avif";
import projectDera2 from "@/assets/project-dera-2.avif";
import projectDera3 from "@/assets/project-dera-3.avif";
import projectHok1 from "@/assets/project-hok-1.avif";
import projectHok2 from "@/assets/project-hok-2.avif";
import projectHok3 from "@/assets/project-hok-3.avif";
import q247Logo from "@/assets/qc247.png";
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
			"Brand guidelines & systems",
			"Logo & visual identity",
			"Brand strategy & positioning",
		],
	},
	{
		slug: "web-development",
		title: "Web Design & Development",
		description:
			"We design and develop websites that are both beautiful and functional, ensuring they are responsive, fast, and easy to use.",
		features: [
			"Marketing & company websites",
			"Landing pages & campaign sites",
			"Responsive & mobile-first designs",
			"CMS setup & content architecture",
		],
	},
	{
		slug: "product-strategy",
		title: "Product Design",
		description:
			"We design products that are not only functional but also delightful to use, ensuring they are easy to understand and navigate.",
		features: [
			"Product strategy & roadmap",
			"Competitive analysis & benchmarking",
			"User research & personas",
			"User flows & wireframes",
			"Interactive prototypes",
			"Usability testing & feedback",
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

export type BootcampModule = {
	slug: string;
	title: string;
	items: string[];
};

export type BootcampOffering = {
	slug: string;
	name: string;
	subtitle: string;
	price: string;
	cardStyle: "navy" | "midnight";
	ctaLabel: string;
	ctaHref: string;
	availability: string;
	curriculum: BootcampModule[];
	details: Array<{
		label: string;
		value: string;
	}>;
};

export const BOOTCAMP_OFFERINGS_COPY = {
	eyebrow: "Current offerings",
	title: "Choose how you want to learn",
	description:
		"Compare both paths and choose the class structure that fits how you work best.",
};

const ADVANCED_UX_ITEMS = [
	"Build the UX skills that clients and employers pay for.",
	"Understand why UX matters and apply design thinking to solve real problems.",
	"Research users properly, then turn findings into better design decisions.",
	"Map full user journeys, from empathy maps to service blueprints.",
	"Build and maintain design systems that scale.",
	"Ship more than 40 web and mobile screens and build a portfolio that proves what you can do.",
	"Test and prototype ideas before they go live.",
	"Graduate with a polished, job-ready portfolio.",
	"Practise real interview scenarios so you can explain your work clearly.",
	"Earn a Certificate of Completion that validates your skills.",
];

const MENTORSHIP_UX_ITEMS = [
	"Designed for anyone looking to go from zero to job-ready in UI/UX design.",
	"Covers the complete curriculum from our Foundation and Advanced tracks.",
	"Master industry-standard tools including Miro, Notion, Adobe Illustrator, and FigJam.",
	"Gain practical design tips, productivity shortcuts, and curated resources.",
	"Tackle real-world case studies and projects to sharpen your problem-solving abilities.",
	"One-on-one guidance from an experienced Senior Product Designer.",
	"Develop cross-functional skills for working alongside engineers and PMs.",
	"Earn a verified Certificate of Completion.",
	"Career coaching, job referrals, and placement assistance when openings arise.",
	"A 6-week internship opportunity upon finishing the program.",
];

const AI_FOR_DESIGNERS_ITEMS = [
	"Use ChatGPT, Claude, and Figma Make to move from a blank canvas to polished screens faster.",
	"Write prompts for UI layouts, user personas, UX copy, and microcopy without losing time to rewrites.",
	"Use AI to synthesize interviews, spot patterns, and turn raw feedback into design decisions.",
	"Know when to follow AI suggestions and when to push back, so you stay in control of the creative process.",
	"Understand how AI is changing client expectations and position yourself ahead of the curve.",
];

function createModule(
	slug: string,
	title: string,
	items: string[],
): BootcampModule {
	return { slug, title, items: [...items] };
}

export const BOOTCAMP_CURRICULUM: Record<
	"advanced-class" | "mentorship-class",
	BootcampModule[]
> = {
	"advanced-class": [
		createModule("ux-design", "UX Design", ADVANCED_UX_ITEMS),
		createModule(
			"ai-for-designers",
			"AI for Designers",
			AI_FOR_DESIGNERS_ITEMS,
		),
	],
	"mentorship-class": [
		createModule("ux-design", "UX Design", MENTORSHIP_UX_ITEMS),
		createModule(
			"ai-for-designers",
			"AI for Designers",
			AI_FOR_DESIGNERS_ITEMS,
		),
	],
};

export const BOOTCAMP_OFFERINGS: BootcampOffering[] = [
	{
		slug: "advanced-class",
		name: "Advanced Class",
		subtitle: "UX Design & AI Program",
		price: "₦150,000",
		cardStyle: "navy",
		ctaLabel: "Claim Your Spot Now",
		ctaHref: "/#book-a-call",
		availability: "Limited seats available each cohort",
		curriculum: BOOTCAMP_CURRICULUM["advanced-class"],
		details: [
			{ label: "Duration", value: "9 Weeks" },
			{ label: "Schedule", value: "2x/Week" },
			{ label: "Format", value: "Live Virtual Training" },
			{
				label: "Payment Plan",
				value: "70% on Enrollment\n30% after One Month",
			},
		],
	},
	{
		slug: "mentorship-class",
		name: "Mentorship Class",
		subtitle: "UX Design & AI Program",
		price: "₦250,000",
		cardStyle: "midnight",
		ctaLabel: "Claim Your Spot Now",
		ctaHref: "/#book-a-call",
		availability: "Limited seats available each cohort",
		curriculum: BOOTCAMP_CURRICULUM["mentorship-class"],
		details: [
			{ label: "Duration", value: "9 Weeks" },
			{ label: "Schedule", value: "9 Weeks" },
			{ label: "Format", value: "One on One Session" },
			{
				label: "Payment Plan",
				value: "70% on Enrollment\n30% after One Month",
			},
		],
	},
];

export type BootcampTool = {
	slug: string;
	name: string;
	src: string;
};

export const BOOTCAMP_TOOLS_COPY = {
	eyebrow: "The Tools",
	title: "Master the tools used by modern designers",
	description:
		"Work with the tools used by professional designers to create real projects, build your portfolio, and prepare for the industry.",
};

export const BOOTCAMP_TOOLS: BootcampTool[] = [
	{
		slug: "claude",
		name: "Claude",
		src: "/icons/claude-ai-icon.svg",
	},
	{
		slug: "google-forms",
		name: "Google Forms",
		src: "/icons/google-forms-2026.svg",
	},
	{
		slug: "openai",
		name: "OpenAI",
		src: "/icons/openai.svg",
	},
	{
		slug: "miro",
		name: "Miro",
		src: "/icons/miro.svg",
	},
	{
		slug: "figma",
		name: "Figma",
		src: "/icons/figma.svg",
	},
	{
		slug: "google-meet",
		name: "Google Meet",
		src: "/icons/google-meet-2026.svg",
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

export type ProjectPage = {
	slug: string;
	/** Reads under the thumbnail. The row already names the client, so this is
	 *  only the page's role — "Shop", not "Home of Korean Beauty Shop". */
	name: string;
	thumbnail: string;
};

export type ProjectGroup = {
	slug: string;
	client: string;
	/** Kind of site, sits under the client name in place of a case study. */
	type: string;
	/** The client's live site. One URL per engagement, not per page. */
	href: string;
	pages: ProjectPage[];
};

// These aren't case studies — there is no write-up behind them yet. All we have
// per engagement is a set of thumbnails, the client, the kind of site and the
// live URL, so the section links out rather than deeper into the site.
//
// TODO: `href` is a placeholder on every row until the production links land.
//
// Page order was read off the thumbnails in the browser rather than taken from
// the design's caption order — `hok-2`/`hok-3` and `dera-1`/`dera-2` are the
// reverse of what that order implies. Every client leads with its landing page.
export const PROJECT_GROUPS: ProjectGroup[] = [
	{
		slug: "home-of-korean-beauty",
		client: "Home of Korean Beauty",
		type: "E-commerce website",
		href: "https://www.homeofkoreanbeauty.com/",
		pages: [
			{
				slug: "hok-landing",
				name: "Landing Page",
				thumbnail: projectHok3,
			},
			{ slug: "hok-shop", name: "Shop", thumbnail: projectHok1 },
			{ slug: "hok-about", name: "About Us", thumbnail: projectHok2 },
		],
	},
	{
		slug: "dera",
		client: "Dera",
		type: "E-commerce website",
		href: "https://deranig.com/",
		pages: [
			{ slug: "dera-landing", name: "Landing Page", thumbnail: projectDera2 },
			{
				slug: "dera-product",
				name: "Product Details",
				thumbnail: projectDera1,
			},
			{
				slug: "dera-styling-gel",
				name: "Styling Gel",
				thumbnail: projectDera3,
			},
		],
	},
	{
		slug: "clarify-house",
		client: "Clarify House",
		type: "Agency website",
		href: "https://www.theclarifyhouse.com/",
		pages: [
			{ slug: "clarify-landing", name: "Landing Page", thumbnail: projectCh1 },
			{ slug: "clarify-services", name: "Services", thumbnail: projectCh2 },
		],
	},
];

export type Faq = {
	slug: string;
	question: string;
	answer: string;
};

export const FAQS: Faq[] = [
	{
		slug: "services",
		question: "What services does Savi Design Studio offer?",
		answer:
			"We offer creative design services including brand identity, UI/UX design, web design, motion design, graphic design, and digital experiences tailored to your business goals.",
	},
	{
		slug: "clients",
		question: "Who do you work with?",
		answer:
			"We work with startups, businesses, founders, and established brands looking to build, improve, or strengthen their visual and digital presence.",
	},
	{
		slug: "pricing",
		question: "How much does a project cost?",
		answer:
			"Every project is different. Pricing depends on the scope, complexity, and deliverables. Once we understand your needs, we'll provide a clear proposal and quote.",
	},
	{
		slug: "project-timeline",
		question: "How long does a project take?",
		answer:
			"Timelines vary depending on the project. After reviewing your requirements, we'll provide an estimated timeline before we begin.",
	},
	{
		slug: "design-process",
		question: "What is your design process?",
		answer:
			"We start by understanding your goals, audience, and requirements. From there, we move through strategy, concept development, design, feedback, refinement, and final delivery.",
	},
	{
		slug: "revisions",
		question: "Do you offer revisions?",
		answer:
			"Yes. We include revisions as part of our process to make sure the final work aligns with your goals and expectations. The number of revisions depends on the project scope.",
	},
	{
		slug: "international-clients",
		question: "Do you work with clients outside Nigeria?",
		answer:
			"Yes. We work remotely with clients across different locations and can collaborate seamlessly online.",
	},
	{
		slug: "get-started",
		question: "How can I start a project with Savi Design Studio?",
		answer:
			"Simply get in touch with us and tell us about your project, goals, and what you need help with. We'll review the details and guide you through the next steps.",
	},
];

export type SocialLink = {
	platform: "instagram" | "whatsapp" | "linkedin";
	label: string;
	href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
	{
		platform: "instagram",
		label: "Instagram",
		href: "https://www.instagram.com/savi_design_studio?stkn=dnZkOTFqeGVxcXR3&utm_source=qr",
	},
	{
		platform: "whatsapp",
		label: "WhatsApp",
		href: "https://wa.me/2347079443937",
	},
	{
		platform: "linkedin",
		label: "LinkedIn",
		href: "https://www.linkedin.com/company/savidesignstudio/",
	},
];
