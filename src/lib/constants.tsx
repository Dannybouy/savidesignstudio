import clarifyhouseLogo from "@/assets/clarifyhouse.svg";
import clarifyhouseCeo from "@/assets/clarifyhouse-ceo.png";
import deraLogo from "@/assets/dera.png";
import facilitatorAriyo from "@/assets/facilitators-1.avif";
import facilitatorSina from "@/assets/facilitators-2.avif";
import facilitatorAminat from "@/assets/facilitators-3.avif";
import facilitatorTobi from "@/assets/facilitators-4.avif";
import hokLogo from "@/assets/hok.png";
import landsafeLogo from "@/assets/landsafe.svg";
import landsafeCeo from "@/assets/landsafe-ceo.png";
import projectCh1Mobile from "@/assets/project-ch-mobile-1.avif";
import projectCh2Mobile from "@/assets/project-ch-mobile-2.avif";
import projectCh1 from "@/assets/project-ch-web-1.avif";
import projectCh2 from "@/assets/project-ch-web-2.avif";
import projectDera1Mobile from "@/assets/project-dera-mobile-1.avif";
import projectDera2Mobile from "@/assets/project-dera-mobile-2.avif";
import projectDera3Mobile from "@/assets/project-dera-mobile-3.avif";
import projectDera1 from "@/assets/project-dera-web-1.avif";
import projectDera2 from "@/assets/project-dera-web-2.avif";
import projectDera3 from "@/assets/project-dera-web-3.avif";
import projectHok1Mobile from "@/assets/project-hok-mobile-1.avif";
import projectHok2Mobile from "@/assets/project-hok-mobile-2.avif";
import projectHok3Mobile from "@/assets/project-hok-mobile-3.avif";
import projectHok1 from "@/assets/project-hok-web-1.avif";
import projectHok2 from "@/assets/project-hok-web-2.avif";
import projectHok3 from "@/assets/project-hok-web-3.avif";
import projectLs1Mobile from "@/assets/project-ls-mobile-1.avif";
import projectLs2 from "@/assets/project-ls-web-2.avif";
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
	audience: string;
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
	eyebrow: "Curriculum",
	title: "What you'll be learning in 6 weeks",
};

const UI_UX_FOUNDATIONS_ITEMS = [
	"Week 1: UX Foundations & User Research",
	"Week 2: Information Architecture & User Flows",
	"Week 3: Wireframing & Prototyping",
	"Week 4: UI Design & Design Systems",
	"Week 5: Project Sprint",
	"Week 6: Project Completion, Presentation & Portfolio Framing",
];

/*const MENTORSHIP_UX_ITEMS = [
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
];*/

const AI_AUGMENTED_FOUNDATIONS_ITEMS = [
	"Week 1: Foundations in an AI-First Industry",
	"Week 2: Research in the Age of Synthetic Data",
	"Week 3: Designing With AI as a Collaborator",
	"Week 4: Visual Design, Prototyping & Judgment",
	"Week 5: Project Sprint",
	"Week 6: Project Completion, Presentation & Portfolio Framing",
];

/*
const STRATEGIC_PRODUCT_DESIGN_ITEMS = [
	"Advanced UX Research & Insight Synthesis",
	"Product Thinking & Strategy",
	"Advanced Information Architecture",
	"Design Systems in the AI Era",
	"Advanced UI Design:",
	"AI-Powered Design & Developer Handoff",
	"Accessibility & Product Optimization",
	"Portfolio, Freelancing & Career Growth in an AI Market",
	"Capstone Project Sprint",
	"Capstone Completion & Demo Day",
];
	*/

export type Facilitator = {
	name: string;
	role: string;
	image: string;
	socialLink: string;
	bio: string;
};
export const Facilitators: Facilitator[] = [
	{
		name: "Oluwatosin Ariyo",
		role: "Product Designer (Lead Facilitator)",
		image: facilitatorAriyo,
		socialLink: "https://www.linkedin.com/in/oluwatosin-ariyo/",
		bio: "Ariyo is a Product Designer specialized in helping businesses and companies design products that meet both user needs and business goals",
	},
	{
		name: "Joseph Adesina",
		role: "Senior Product Designer",
		image: facilitatorSina,
		socialLink: "https://www.linkedin.com/in/joseph-adesina-72b158131/",
		bio: "Joseph is a Senior Product Designer with 6+ years of experience spanning finance, logistics, insurance, Ed Tech and more.",
	},
	{
		name: "Aminat Olatunji",
		role: "Product Designer",
		image: facilitatorAminat,
		socialLink: "https://www.linkedin.com/in/olatunjiaminatabiola/",
		bio: "Aminat is a Product Designer with years of experience in helping startups/businesses gain clarity and build meaningful and converting products.",
	},
	{
		name: "Timi Dolor",
		role: "Product Designer",
		image: facilitatorTobi,
		socialLink: "https://www.linkedin.com/in/timi-akpojewe-482396425/",
		bio: "Timi is a Product Designer with more than 4 years of experience in designing scalable experiences for startups, SAAS companies and digital product teams.",
	},
];

function createModule(
	slug: string,
	title: string,
	items: string[],
): BootcampModule {
	return { slug, title, items: [...items] };
}

export const BOOTCAMP_CURRICULUM: Record<
	"ui-ux-foundations" | "ai-augmented",
	BootcampModule[]
> = {
	"ui-ux-foundations": [
		createModule(
			"ui-ux-foundations",
			"UI/UX Foundations",
			UI_UX_FOUNDATIONS_ITEMS,
		),
	],
	"ai-augmented": [
		createModule(
			"ai-augmented",
			"AI-Augmented Foundations",
			AI_AUGMENTED_FOUNDATIONS_ITEMS,
		),
	],
	/*
	"strategic-product-design": [
		createModule(
			"strategic-product-design",
			"Strategic & AI-Augmented Product Design",
			STRATEGIC_PRODUCT_DESIGN_ITEMS,
		),
	],
	*/
};

export const BOOTCAMP_OFFERINGS: BootcampOffering[] = [
	{
		slug: "ui-ux-foundations",
		audience: "Total Beginners",
		name: "UI/UX Foundations",
		subtitle:
			"For designers with 0–6 months of learning experience who need to build strong fundamentals while learning to work with AI tools.",
		price: "₦100,000",
		cardStyle: "navy",
		ctaLabel: "Claim Your Spot Now",
		ctaHref: "https://wa.me/2347079443937",
		availability: "Limited seats available each cohort",
		curriculum: BOOTCAMP_CURRICULUM["ui-ux-foundations"],
		details: [
			{ label: "Duration", value: "6 Weeks" },
			{ label: "Schedule", value: "2x/Week" },
			{ label: "Format", value: "Live Virtual Training" },
			{
				label: "Payment Plan",
				value: "free",
			},
		],
	},
	{
		slug: "ai-augmented",
		audience: "Junior Designers",
		name: "AI-Augmented Foundations",
		subtitle:
			"For designers with 0–2 years experience who need to build strong fundamentals while learning to work AI-natively from day one.",
		price: "₦150,000",
		cardStyle: "navy",
		ctaLabel: "Claim Your Spot Now",
		ctaHref: "https://wa.me/2347079443937",
		availability: "Limited seats available each cohort",
		curriculum: BOOTCAMP_CURRICULUM["ai-augmented"],
		details: [
			{ label: "Duration", value: "6 Weeks" },
			{ label: "Schedule", value: "2x/Week" },
			{ label: "Format", value: "Live Virtual Training" },
			{
				label: "Payment Plan",
				value: "free",
			},
		],
	},
	/*
	{
		slug: "advanced-class",
		name: "Advanced Class",
		subtitle: "UX Design & AI Program",
		price: "₦150,000",
		cardStyle: "navy",
		ctaLabel: "Claim Your Spot Now",
		ctaHref: "https://wa.me/2347079443937",
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
		ctaHref: "https://wa.me/2347079443937",
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

	{
		slug: "strategic-product-design",
		name: "Strategic & AI-Augmented Product Design",
		subtitle:
			"For designers with 2+ years experience moving into ownership, systems thinking, and AI-fluent leadership.",
		price: "₦250,000",
		cardStyle: "midnight",
		ctaLabel: "Claim Your Spot Now",
		ctaHref: "https://wa.me/2347079443937",
		availability: "Limited seats available each cohort",
		curriculum: BOOTCAMP_CURRICULUM["strategic-product-design"],
		details: [
			{ label: "Duration", value: "6 Weeks" },
			{ label: "Schedule", value: "2x/Week" },
			{ label: "Format", value: "Live Virtual Training" },
			{
				label: "Payment Plan",
				value: "70% on Enrollment\n30% after One Month",
			},
		],
	},
	*/
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
	avatar?: string;
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
		slug: "secsystems",
		logo: secsystemsLogo,
		logoAlt: "Secsystems",
		quote:
			"Savi Design Studio did an amazing job on the motion design for our Soft POS project. The animation brought our product to life and communicated the “tap to pay” experience to the users seamlessly.",
		body: "They were patient with feedback and clearly cared about the details. Would work with them again",
		name: "Adedamola Adeleye",
		title: "CEO",
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
	name: string;
	thumbnail: string;
	thumbnailMobile: string;
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

export const PROJECT_GROUPS: ProjectGroup[] = [
	{
		slug: "home-of-korean-beauty",
		client: "Home of Korean Beauty",
		type: "E-commerce website",
		href: "https://www.homeofkoreanbeauty.com/",
		pages: [
			{
				slug: "hok-about",
				name: "About Us",
				thumbnail: projectHok3,
				thumbnailMobile: projectHok3Mobile,
			},
			{
				slug: "hok-landing",
				name: "Landing Page",
				thumbnail: projectHok1,
				thumbnailMobile: projectHok1Mobile,
			},
			{
				slug: "hok-products",
				name: "Products Page",
				thumbnail: projectHok2,
				thumbnailMobile: projectHok2Mobile,
			},
		],
	},
	{
		slug: "dera",
		client: "Dera",
		type: "E-commerce website",
		href: "https://deranig.com/",
		pages: [
			{
				slug: "dera-landing",
				name: "Landing Page",
				thumbnail: projectDera2,
				thumbnailMobile: projectDera2Mobile,
			},
			{
				slug: "dera-product",
				name: "Product Details",
				thumbnail: projectDera1,
				thumbnailMobile: projectDera1Mobile,
			},
			{
				slug: "dera-styling-gel",
				name: "Styling Gel",
				thumbnail: projectDera3,
				thumbnailMobile: projectDera3Mobile,
			},
		],
	},
	{
		slug: "clarify-house",
		client: "Clarify House",
		type: "Agency website",
		href: "https://www.theclarifyhouse.com/",
		pages: [
			{
				slug: "clarify-landing",
				name: "Landing Page",
				thumbnail: projectCh1,
				thumbnailMobile: projectCh1Mobile,
			},
			{
				slug: "clarify-services",
				name: "Services",
				thumbnail: projectCh2,
				thumbnailMobile: projectCh2Mobile,
			},
		],
	},
	{
		slug: "landsafe",
		client: "LandSafe",
		type: "PropTech website",
		href: "https://www.landsafe.ng/",
		pages: [
			{
				slug: "landsafe-landing",
				name: "Landing Page",
				thumbnail: projectLs2,
				thumbnailMobile: projectLs1Mobile,
			},
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
