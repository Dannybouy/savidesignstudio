import { CheckIcon, type LucideIcon, MailIcon, PhoneIcon } from "lucide-react";
import { useRef, useState } from "react";
import {
	Controller,
	type FieldErrors,
	type FieldError as ReactHookFormFieldError,
	type Resolver,
	useForm,
} from "react-hook-form";
import { z } from "zod";
import bootcampFormImage from "@/assets/bootcamp-form-img.png";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Field,
	FieldContent,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import {
	type BootcampRegistrationPayload,
	submitBootcampRegistration,
} from "@/lib/bootcamp-registration";
import { cn } from "@/lib/utils";

const OCCUPATIONS = [
	"Student",
	"Employed",
	"Freelancer",
	"Entrepreneur",
	"Job Seeker",
] as const;

const EXPERIENCE_LEVELS = [
	"Complete Beginner (little or no knowledge)",
	"Beginner (0 - 6 months)",
	"Entry Level (6 months - 1 Year)",
] as const;

const LEARNING_TIMES = [
	"I haven't started",
	"0 - 3 months",
	"3 - 6 months",
	"6 - 12 months",
	"More than a year",
] as const;

const YES_NO_OPTIONS = ["Yes", "No"] as const;
const PHONE_CHARACTERS = /^[+\d\s().-]+$/;

const registrationSchema = z.object({
	name: z.string().trim().min(2, "Enter your name."),
	email: z.string().trim().email("Enter a valid email address."),
	phone: z
		.string()
		.trim()
		.refine((value) => {
			const digitCount = value.replace(/\D/g, "").length;
			return (
				PHONE_CHARACTERS.test(value) && digitCount >= 7 && digitCount <= 15
			);
		}, "Enter a valid phone number."),
	occupation: z.enum(OCCUPATIONS, {
		error: "Select your current occupation.",
	}),
	experience: z.enum(EXPERIENCE_LEVELS, {
		error: "Select your UI/UX experience level.",
	}),
	learningTime: z.enum(LEARNING_TIMES, {
		error: "Select how long you have been learning Product Design.",
	}),
	figmaExperience: z.enum(YES_NO_OPTIONS, {
		error: "Select whether you have used Figma.",
	}),
	hasPortfolio: z.enum(YES_NO_OPTIONS, {
		error: "Select whether you have a Product Design portfolio.",
	}),
	consent: z.literal(true, {
		error: "Consent is required to register.",
	}),
});

type RegistrationValues = BootcampRegistrationPayload;
type SelectFieldName =
	| "occupation"
	| "experience"
	| "learningTime"
	| "figmaExperience"
	| "hasPortfolio";

const DEFAULT_VALUES: RegistrationValues = {
	name: "",
	email: "",
	phone: "",
	occupation: "",
	experience: "",
	learningTime: "",
	figmaExperience: "",
	hasPortfolio: "",
	consent: false,
};

const SELECT_FIELDS: ReadonlyArray<{
	name: SelectFieldName;
	label: string;
	placeholder: string;
	options: readonly string[];
}> = [
	{
		name: "occupation",
		label: "Current Occupation",
		placeholder: "Select your current occupation",
		options: OCCUPATIONS,
	},
	{
		name: "experience",
		label: "How would you describe your current UI/UX experience?",
		placeholder: "Select your experience level",
		options: EXPERIENCE_LEVELS,
	},
	{
		name: "learningTime",
		label:
			"How long have you been actively learning/practising Product Design?",
		placeholder: "Select your practise/learning time",
		options: LEARNING_TIMES,
	},
	{
		name: "figmaExperience",
		label: "Have you used Figma before?",
		placeholder: "Select your experience level",
		options: YES_NO_OPTIONS,
	},
	{
		name: "hasPortfolio",
		label: "Do you currently have a Product Design portfolio?",
		placeholder: "Yes/No",
		options: YES_NO_OPTIONS,
	},
];

const TEXT_FIELDS: ReadonlyArray<{
	name: "name" | "email" | "phone";
	label: string;
	placeholder: string;
	type: "text" | "email" | "tel";
	autoComplete: string;
	icon?: LucideIcon;
}> = [
	{
		name: "name",
		label: "Name",
		placeholder: "Enter your full name",
		type: "text",
		autoComplete: "name",
	},
	{
		name: "email",
		label: "Email",
		placeholder: "Enter your email",
		type: "email",
		autoComplete: "email",
		icon: MailIcon,
	},
	{
		name: "phone",
		label: "Phone",
		placeholder: "Enter your phone number",
		type: "tel",
		autoComplete: "tel",
		icon: PhoneIcon,
	},
];

const registrationResolver: Resolver<RegistrationValues> = (values) => {
	const result = registrationSchema.safeParse(values);

	if (result.success) {
		return { values: result.data, errors: {} };
	}

	const errors: Record<string, ReactHookFormFieldError> = {};
	for (const issue of result.error.issues) {
		const fieldName = issue.path[0];
		if (typeof fieldName === "string" && !errors[fieldName]) {
			errors[fieldName] = {
				type: issue.code,
				message: issue.message,
			};
		}
	}

	return {
		values: {},
		errors: errors as FieldErrors<RegistrationValues>,
	};
};

interface RegistrationDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function RegistrationDialog({
	open,
	onOpenChange,
}: RegistrationDialogProps) {
	const [submitted, setSubmitted] = useState(false);
	const [submissionError, setSubmissionError] = useState<string | null>(null);
	const submissionAttemptRef = useRef(0);
	const {
		control,
		handleSubmit,
		reset,
		formState: { isSubmitting, isValid },
	} = useForm<RegistrationValues>({
		defaultValues: DEFAULT_VALUES,
		mode: "onChange",
		resolver: registrationResolver,
	});

	const onSubmit = handleSubmit(async (values) => {
		const attempt = ++submissionAttemptRef.current;
		setSubmissionError(null);

		try {
			await submitBootcampRegistration(values);
			if (attempt === submissionAttemptRef.current) {
				setSubmitted(true);
			}
		} catch (error) {
			console.error("Bootcamp registration failed", error);
			if (attempt === submissionAttemptRef.current) {
				const reason = error instanceof Error ? error.message : "";
				setSubmissionError(
					reason
						? `We couldn't submit your details: ${reason}`
						: "We couldn't submit your details. Check your connection and try again.",
				);
			}
		}
	});

	return (
		<Dialog
			open={open}
			disablePointerDismissal
			onOpenChange={(nextOpen, eventDetails) => {
				if (nextOpen || eventDetails.reason === "close-press") {
					onOpenChange(nextOpen);
				}
			}}
			onOpenChangeComplete={(nextOpen) => {
				if (!nextOpen) {
					submissionAttemptRef.current += 1;
					reset(DEFAULT_VALUES);
					setSubmitted(false);
					setSubmissionError(null);
				}
			}}
		>
			<DialogContent className="h-[calc(100svh-2rem)] max-h-208 max-w-[calc(100%-2rem)] grid-cols-1 gap-0 overflow-hidden rounded-xl p-0 sm:h-[calc(100svh-4rem)] sm:max-w-[calc(100%-4rem)] lg:h-[calc(100svh-7rem)] lg:max-h-164 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:max-w-6xl">
				<div className="hidden overflow-hidden bg-surface-action lg:block">
					<img
						src={bootcampFormImage}
						alt="bootcamp form image"
						aria-hidden="true"
						className="size-full object-contain object-center"
					/>
				</div>

				{submitted ? (
					<div className="grid min-h-0 place-items-center overflow-y-auto px-6 py-16 sm:px-10">
						<div className="flex max-w-105 flex-col items-center text-center">
							<div className="grid size-16 place-items-center rounded-full bg-success text-on-success shadow-[0_12px_30px_color-mix(in_oklab,var(--color-success)_25%,transparent)]">
								<CheckIcon aria-hidden className="size-8" strokeWidth={2.5} />
							</div>
							<DialogHeader className="mt-7 items-center">
								<DialogTitle className="text-h2">
									You're registered!
								</DialogTitle>
								<DialogDescription className="max-w-90 text-body-primary text-paragraph">
									Thanks for signing up. We'll contact you with the next steps.
								</DialogDescription>
							</DialogHeader>
							<DialogClose
								render={<Button className="mt-8 min-w-32" size="lg" />}
							>
								Close
							</DialogClose>
						</div>
					</div>
				) : (
					<div className="min-h-0 overflow-y-auto px-5 py-8 sm:px-8 sm:py-10 lg:px-8">
						<DialogHeader className="pr-10">
							<DialogTitle className="font-heading text-2xl text-black">
								Turn your design skills into a career.
							</DialogTitle>
							<DialogDescription className="max-w-145 text-body-primary text-paragraph">
								Learn UI/UX, build a standout portfolio, and get the mentorship
								and opportunities you need to take the next step.
							</DialogDescription>
						</DialogHeader>

						<form className="mt-8" noValidate onSubmit={onSubmit}>
							<FieldGroup className="gap-5">
								{TEXT_FIELDS.map((config) => (
									<Controller
										key={config.name}
										name={config.name}
										control={control}
										render={({ field, fieldState }) => {
											const showError =
												fieldState.isTouched && !!fieldState.error;
											const errorId = `${config.name}-error`;

											return (
												<Field data-invalid={showError || undefined}>
													<FieldLabel
														htmlFor={config.name}
														className="text-sm text-[#262626]"
													>
														{config.label}
													</FieldLabel>
													{config.icon ? (
														<InputGroup
															className={cn(
																"h-9 border-[#D4D4D4]",
																showError && "field-shake",
															)}
														>
															<InputGroupInput
																{...field}
																id={config.name}
																type={config.type}
																autoComplete={config.autoComplete}
																placeholder={config.placeholder}
																aria-describedby={
																	showError ? errorId : undefined
																}
																aria-invalid={showError || undefined}
																className="text-base"
															/>
															<InputGroupAddon>
																<config.icon aria-hidden />
															</InputGroupAddon>
														</InputGroup>
													) : (
														<Input
															{...field}
															id={config.name}
															name={config.name}
															type={config.type}
															autoComplete={config.autoComplete}
															placeholder={config.placeholder}
															aria-describedby={showError ? errorId : undefined}
															aria-invalid={showError || undefined}
															className={cn(
																"h-9 border border-[#D4D4D4] px-4 text-base",
																showError && "field-shake",
															)}
														/>
													)}
													<FieldError
														id={errorId}
														errors={showError ? [fieldState.error] : undefined}
													/>
												</Field>
											);
										}}
									/>
								))}

								{SELECT_FIELDS.map((config) => (
									<Controller
										key={config.name}
										name={config.name}
										control={control}
										render={({ field, fieldState }) => {
											const showError =
												fieldState.isTouched && !!fieldState.error;
											const errorId = `${config.name}-error`;
											const items = [
												{ label: config.placeholder, value: null },
												...config.options.map((option) => ({
													label: option,
													value: option,
												})),
											];

											return (
												<Field data-invalid={showError || undefined}>
													<FieldLabel htmlFor={config.name}>
														{config.label}
													</FieldLabel>
													<Select
														items={items}
														name={field.name}
														value={field.value || null}
														onValueChange={(value) =>
															field.onChange(value ?? "")
														}
														required
													>
														<SelectTrigger
															ref={field.ref}
															id={config.name}
															onBlur={field.onBlur}
															aria-describedby={showError ? errorId : undefined}
															aria-invalid={showError || undefined}
															className={cn(
																"h-9 w-full px-4 text-base",
																showError && "field-shake",
															)}
														>
															<SelectValue />
														</SelectTrigger>
														<SelectContent
															align="start"
															alignItemWithTrigger={false}
														>
															<SelectGroup>
																{config.options.map((option) => (
																	<SelectItem key={option} value={option}>
																		{option}
																	</SelectItem>
																))}
															</SelectGroup>
														</SelectContent>
													</Select>
													<FieldError
														id={errorId}
														errors={showError ? [fieldState.error] : undefined}
													/>
												</Field>
											);
										}}
									/>
								))}

								<Controller
									name="consent"
									control={control}
									render={({ field, fieldState }) => {
										const showError =
											fieldState.isTouched && !!fieldState.error;
										return (
											<Field
												orientation="horizontal"
												data-invalid={showError || undefined}
												className="items-start"
											>
												<Checkbox
													ref={field.ref}
													id="consent"
													name={field.name}
													checked={field.value}
													onBlur={field.onBlur}
													onCheckedChange={field.onChange}
													aria-describedby={
														showError ? "consent-error" : undefined
													}
													aria-invalid={showError || undefined}
													className={cn("mt-0.5", showError && "field-shake")}
												/>
												<FieldContent>
													<FieldLabel htmlFor="consent" className="font-normal">
														I agree to be contacted about the Savi Design UI/UX
														Bootcamp.
													</FieldLabel>
													<FieldError
														id="consent-error"
														errors={showError ? [fieldState.error] : undefined}
													/>
												</FieldContent>
											</Field>
										);
									}}
								/>

								<Button
									type="submit"
									size="lg"
									disabled={!isValid || isSubmitting}
									className="mt-2 w-full"
								>
									{isSubmitting ? (
										<>
											<Spinner data-icon="inline-start" />
											Submitting...
										</>
									) : (
										"Submit my details"
									)}
								</Button>
								{submissionError ? (
									<p
										className="text-center text-sm text-destructive"
										role="alert"
									>
										{submissionError}
									</p>
								) : null}
							</FieldGroup>
						</form>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
