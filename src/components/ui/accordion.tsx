import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "@/lib/utils";

const PANEL_EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";

// lucide draws its plus as two strokes 2 units thick spanning 14 of a 24 unit
// box, so the bars are sized in percentages and scale with the icon the way a
// real lucide glyph would. The vertical bar swings onto the horizontal one to
// become the minus.
//
// Tailwind v4 writes `rotate` and `scale` as their own properties rather than
// composing a `transform`, so the transitions have to name those properties or
// the icon snaps between states.
function PlusMinus({ className }: { className?: string }) {
	return (
		<span
			aria-hidden
			data-slot="accordion-trigger-icon"
			className={cn(
				"relative block size-6 shrink-0 text-surface-action-secondary transition-[scale,color,filter] duration-300",
				PANEL_EASE,
				"group-hover/accordion-trigger:scale-105 group-hover/accordion-trigger:brightness-90 group-aria-expanded/accordion-trigger:text-heading motion-reduce:transition-none",
				className,
			)}
		>
			<span className="absolute top-[45.833%] left-[20.833%] h-[8.333%] w-[58.333%] rounded-full bg-current" />
			<span
				className={cn(
					"absolute top-[20.833%] left-[45.833%] h-[58.333%] w-[8.333%] rounded-full bg-current transition-[rotate,opacity] duration-300",
					PANEL_EASE,
					"group-aria-expanded/accordion-trigger:rotate-90 group-aria-expanded/accordion-trigger:opacity-0 motion-reduce:transition-none",
				)}
			/>
		</span>
	);
}

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
	return (
		<AccordionPrimitive.Root
			data-slot="accordion"
			className={cn("flex w-full flex-col", className)}
			{...props}
		/>
	);
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
	return (
		<AccordionPrimitive.Item
			data-slot="accordion-item"
			className={cn("not-last:border-b", className)}
			{...props}
		/>
	);
}

function AccordionTrigger({
	className,
	children,
	...props
}: AccordionPrimitive.Trigger.Props) {
	return (
		<AccordionPrimitive.Header className="flex">
			<AccordionPrimitive.Trigger
				data-slot="accordion-trigger"
				className={cn(
					"group/accordion-trigger relative flex flex-1 items-start justify-between rounded-md border border-transparent py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:after:border-ring aria-disabled:pointer-events-none aria-disabled:opacity-50",
					className,
				)}
				{...props}
			>
				{children}
				<PlusMinus />
			</AccordionPrimitive.Trigger>
		</AccordionPrimitive.Header>
	);
}

function AccordionContent({
	className,
	children,
	...props
}: AccordionPrimitive.Panel.Props) {
	return (
		<AccordionPrimitive.Panel
			data-slot="accordion-content"
			className="overflow-hidden text-sm data-open:animate-accordion-down data-closed:animate-accordion-up"
			{...props}
		>
			<div
				className={cn(
					"h-(--accordion-panel-height) pt-0 pb-4 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
					className,
				)}
			>
				{children}
			</div>
		</AccordionPrimitive.Panel>
	);
}

export {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	PlusMinus,
};
