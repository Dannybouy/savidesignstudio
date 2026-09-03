import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"group/button inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-sm border border-transparent bg-clip-padding font-medium text-paragraph outline-none transition-[transform,border-color,background-color,color,box-shadow] duration-200 select-none disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default:
					"bg-surface-action-secondary text-on-action hover:bg-[color-mix(in_oklab,var(--color-surface-action-secondary)_92%,black)]",
				solid:
					"bg-surface-action-secondary text-on-action hover:bg-[color-mix(in_oklab,var(--color-surface-action-secondary)_92%,black)]",
				cta: "bg-action-gradient text-on-action shadow-[inset_-2px_2px_2px_0_rgb(255_255_255/0.25)] hover:-translate-y-0.5 focus-visible:-translate-y-0.5",
				outline:
					"border-border-default bg-surface-page text-heading hover:border-heading",
				ghost: "text-heading hover:bg-surface-default",
				link: "h-auto px-0 py-0 text-heading underline-offset-4 hover:underline",
			},
			size: {
				default:
					"h-10 gap-1.5 px-3 py-1.5 lg:px-4 lg:py-2 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
				sm: "h-9 gap-1.5 px-3 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
				lg: "h-11 gap-2 px-4 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3",
				icon: "size-10",
				cta: "h-10 gap-2 py-1 pr-1 pl-2",
			},
		},
		compoundVariants: [
			{
				variant: "outline",
				size: "default",
				className: "px-3",
			},
			{
				variant: "cta",
				size: "cta",
				className: "pr-1 pl-2",
			},
		],
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
