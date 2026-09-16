import { useEffect, useRef, useState } from "react";
import { InfiniteSliderDemo } from "@/components/ui/infinite-slider-demo";
import { cn } from "@/lib/utils";

const READY_IMAGE_COUNT = 3;

export type HeroProjectReelItem = {
	slug: string;
	client: string;
	name: string;
	desktopSrc: string;
	mobileSrc: string;
};

type HeroProjectReelProps = {
	projects: readonly HeroProjectReelItem[];
};

type ReelPhase = "poster" | "poster-ready" | "preparing" | "running";
type CardPriority = "high" | "low";
type CardLoading = "eager" | "lazy";
type CardVisibility = "concealed" | "visible";
type IdleWindow = Omit<Window, "requestIdleCallback" | "cancelIdleCallback"> & {
	requestIdleCallback?: Window["requestIdleCallback"];
	cancelIdleCallback?: Window["cancelIdleCallback"];
};

function waitForImage(image: HTMLImageElement) {
	if (image.complete) {
		return image.decode().catch(() => undefined);
	}

	return new Promise<void>((resolve) => {
		const settle = () => {
			image.removeEventListener("load", settle);
			image.removeEventListener("error", settle);
			void image
				.decode()
				.catch(() => undefined)
				.finally(resolve);
		};

		image.addEventListener("load", settle, { once: true });
		image.addEventListener("error", settle, { once: true });
	});
}

function ProjectReelCard({
	project,
	priority,
	loading,
	visibility,
	onImageSettled,
}: {
	project: HeroProjectReelItem;
	priority: CardPriority;
	loading: CardLoading;
	visibility: CardVisibility;
	onImageSettled?: () => void;
}) {
	return (
		<figure
			className={cn(
				"w-full overflow-hidden bg-surface-page p-2 transition-opacity duration-500 motion-reduce:transition-none lg:p-4",
				visibility === "visible" ? "opacity-100" : "opacity-0",
			)}
		>
			<picture className="block">
				<source
					media="(max-width: 639px)"
					srcSet={project.mobileSrc}
					type="image/avif"
				/>
				<img
					src={project.desktopSrc}
					alt={`${project.client} ${project.name} website design`}
					width={1776}
					height={1080}
					sizes="(min-width: 1024px) 43vw, (min-width: 640px) 68vw, 82vw"
					loading={loading}
					fetchPriority={priority}
					decoding={priority === "high" ? "auto" : "async"}
					draggable={false}
					onLoad={onImageSettled}
					onError={onImageSettled}
					className="block aspect-45/32 w-full select-none object-cover object-top"
				/>
			</picture>
		</figure>
	);
}

export function HeroProjectReel({ projects }: HeroProjectReelProps) {
	const [phase, setPhase] = useState<ReelPhase>("poster");
	const reelRef = useRef<HTMLDivElement>(null);
	const visibleProjects = phase === "poster" ? projects.slice(0, 1) : projects;

	useEffect(() => {
		if (phase !== "poster-ready") {
			return;
		}

		let idleId: number | undefined;
		let timeoutId: number | undefined;
		const idleWindow = window as unknown as IdleWindow;
		const frameId = window.requestAnimationFrame(() => {
			if (idleWindow.requestIdleCallback) {
				idleId = idleWindow.requestIdleCallback(() => setPhase("preparing"), {
					timeout: 1500,
				});
				return;
			}

			timeoutId = window.setTimeout(() => setPhase("preparing"), 250);
		});

		return () => {
			window.cancelAnimationFrame(frameId);
			if (idleId !== undefined && idleWindow.cancelIdleCallback) {
				idleWindow.cancelIdleCallback(idleId);
			}
			if (timeoutId !== undefined) {
				window.clearTimeout(timeoutId);
			}
		};
	}, [phase]);

	useEffect(() => {
		if (phase !== "preparing") {
			return;
		}

		let cancelled = false;
		const images = Array.from(
			reelRef.current?.querySelectorAll("img") ?? [],
		).slice(0, READY_IMAGE_COUNT);

		void Promise.all(images.map(waitForImage)).then(() => {
			if (!cancelled) {
				setPhase("running");
			}
		});

		return () => {
			cancelled = true;
		};
	}, [phase]);

	if (projects.length === 0) {
		return null;
	}

	return (
		<div ref={reelRef} data-reel-phase={phase}>
			<InfiniteSliderDemo
				gap={16}
				speed={1}
				playState={phase === "running" ? "running" : "paused"}
				itemClassName="w-[82vw] sm:w-[68vw] lg:w-[43vw]"
				ariaLabel="Selected website projects"
			>
				{visibleProjects.map((project, index) => (
					<ProjectReelCard
						key={project.slug}
						project={project}
						priority={index === 0 ? "high" : "low"}
						loading={index < READY_IMAGE_COUNT ? "eager" : "lazy"}
						visibility={
							index === 0 || phase === "running" ? "visible" : "concealed"
						}
						onImageSettled={
							index === 0 && phase === "poster"
								? () => setPhase("poster-ready")
								: undefined
						}
					/>
				))}
			</InfiniteSliderDemo>
		</div>
	);
}
