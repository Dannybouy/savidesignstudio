import { motion } from "motion/react";
import { Link } from "react-router";
import LinkedinIcon from "@/assets/linkedin-2x.png";
import { Facilitators } from "@/lib/constants";

export default function Teams() {
	return (
		<motion.section>
			<div className="bg-[#F0EFF6] p-6 lg:p-20 my-20">
				<div className="block lg:flex items-center justify-between">
					<div className="space-y-2">
						<div className="bg-[#E7E7EB] py-1 px-2 w-fit">
							<p className="text-sm text-heading">Facilitators</p>
						</div>
						<h2 className="font-heading text-h2 lg:text-h1">
							Meet your Facilitators
						</h2>
					</div>
					<h4 className="font-normal text-lg lg:text-xl text-body-primary mt-4 lg:mt-0 lg:max-w-2/4">
						Get to know the designers who will guide you through every step of
						the bootcamp, from hands-on lessons to real-world projects.
					</h4>
				</div>
				<div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-3">
					{Facilitators.map((facilitator) => (
						<div key={facilitator.name} className="space-y-3">
							<div className="group/image relative overflow-hidden">
								<img
									src={facilitator.image}
									alt={facilitator.name}
									loading="lazy"
									className="block w-full"
								/>
								<div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-surface-action-secondary/10 backdrop-blur-xs p-4 text-on-action transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/image:translate-y-0 motion-reduce:transition-none">
									<p className="text-sm leading-5">{facilitator.bio}</p>
								</div>
							</div>
							<div className="space-y-1">
								<h2 className="font-heading text-h2 text-body-primary">
									{facilitator.name}
								</h2>
								<h4 className="text-lg text-body-primary font-light">
									{facilitator.role}
								</h4>
								<Link
									to={facilitator.socialLink}
									target="_blank"
									title="View Profile"
									rel="noopener noreferrer"
									className="text-surface-action text-sm gap-2 inline-flex items-center underline underline-offset-4 hover:no-underline"
								>
									View Profile
									<img src={LinkedinIcon} alt="Linkedin" className="w-5 h-4" />
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</motion.section>
	);
}
