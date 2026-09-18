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
				<Navbar />
				<Outlet />
				<Footer />
			</div>
		</MotionConfig>
	);
}
