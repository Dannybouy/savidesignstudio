import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import SiteLayout from "./components/SiteLayout";
import HomePage from "./pages/HomePage";

const BootcampPage = lazy(() => import("./pages/BootcampPage"));

function PageFallback() {
	return (
		<main
			aria-label="Loading page"
			className="min-h-[calc(100svh-var(--nav-h))] bg-surface-page"
		/>
	);
}

export default function App() {
	return (
		<Routes>
			<Route element={<SiteLayout />}>
				<Route index element={<HomePage />} />
				<Route
					path="bootcamp"
					element={
						<Suspense fallback={<PageFallback />}>
							<BootcampPage />
						</Suspense>
					}
				/>
				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
		</Routes>
	);
}
