import { MotionConfig } from "motion/react";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";

function RouteScrollManager() {
	const location = useLocation();

	useEffect(() => {
		const frame = window.requestAnimationFrame(() => {
			const { hash } = location;

			if (!hash) {
				window.scrollTo({ top: 0 });
				return;
			}

			const target = document.getElementById(hash.slice(1));
			if (!target) {
				return;
			}

			const navHeight =
				document.querySelector("header")?.getBoundingClientRect().height ?? 0;
			const top =
				target.getBoundingClientRect().top + window.scrollY - navHeight;

			window.scrollTo({ top });
		});

		return () => window.cancelAnimationFrame(frame);
	}, [location]);

	return null;
}

export default function SiteLayout() {
	return (
		<MotionConfig reducedMotion="user">
			<RouteScrollManager />
			<div className="relative min-h-screen">
				<div
					aria-hidden
					className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-360 -translate-x-1/2 lg:block"
				>
					<div className="absolute inset-y-0 left-20 w-px bg-hairline" />
					<div className="absolute inset-y-0 right-20 w-px bg-hairline" />
				</div>

				<Navbar />
				<Outlet />
				<Footer />
			</div>
		</MotionConfig>
	);
}
