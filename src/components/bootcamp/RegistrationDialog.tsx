import confetti from "canvas-confetti";
import { ArrowLeftIcon, CheckIcon, MailIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
	type Control,
	Controller,
	type FieldErrors,
	type FieldError as ReactHookFormFieldError,
	type Resolver,
	useForm,
} from "react-hook-form";
import { type Country, isValidPhoneNumber } from "react-phone-number-input";
import countryNames from "react-phone-number-input/locale/en.json";
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
import { PhoneInput } from "@/components/ui/phone-input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { Turnstile } from "@/components/ui/turnstile";
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
const EMAIL_PROVIDERS = [
	"gmail.com",
	"yahoo.com",
	"outlook.com",
	"hotmail.com",
] as const;
const KNOWN_EMAIL_DOMAINS = [...EMAIL_PROVIDERS, "mail.com"] as const;
const NIGERIA: Country = "NG";
const DUPLICATE_REGISTRATION_ERROR_PREFIX =
	"A registration already exists with ";
const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY?.trim();

type RegistrationValues = Omit<
	BootcampRegistrationPayload,
	"verificationToken"
>;
type RegistrationStage = "form" | "review" | "success";
type SelectFieldName =
	| "occupation"
	| "experience"
	| "learningTime"
	| "figmaExperience"
	| "hasPortfolio";

const DEFAULT_VALUES: RegistrationValues = {
	name: "",
	email: "",
	country: "Nigeria",
	phone: "",
	occupation: "",
	experience: "",
	learningTime: "",
	figmaExperience: "",
	hasPortfolio: "",
	consent: false,
};

const TEXT_FIELDS = [
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
	},
] as const;

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

function editDistance(first: string, second: string) {
	const matrix = Array.from({ length: first.length + 1 }, (_, firstIndex) =>
		Array.from({ length: second.length + 1 }, (_, secondIndex) => {
			if (firstIndex === 0) return secondIndex;
			if (secondIndex === 0) return firstIndex;
			return 0;
		}),
	);

	for (let firstIndex = 1; firstIndex <= first.length; firstIndex += 1) {
		for (let secondIndex = 1; secondIndex <= second.length; secondIndex += 1) {
			const substitutionCost =
				first[firstIndex - 1] === second[secondIndex - 1] ? 0 : 1;
			let distance = Math.min(
				matrix[firstIndex - 1][secondIndex] + 1,
				matrix[firstIndex][secondIndex - 1] + 1,
				matrix[firstIndex - 1][secondIndex - 1] + substitutionCost,
			);

			if (
				firstIndex > 1 &&
				secondIndex > 1 &&
				first[firstIndex - 1] === second[secondIndex - 2] &&
				first[firstIndex - 2] === second[secondIndex - 1]
			) {
				distance = Math.min(
					distance,
					matrix[firstIndex - 2][secondIndex - 2] + 1,
				);
			}
			matrix[firstIndex][secondIndex] = distance;
		}
	}

	return matrix[first.length][second.length];
}

function hasLikelyProviderTypo(email: string) {
	const domain = email.toLowerCase().split("@")[1];
	if (
		!domain ||
		KNOWN_EMAIL_DOMAINS.includes(domain as (typeof KNOWN_EMAIL_DOMAINS)[number])
	) {
		return false;
	}
	return EMAIL_PROVIDERS.some(
		(provider) => editDistance(domain, provider) === 1,
	);
}

const registrationSchema = z.object({
	name: z
		.string()
		.trim()
		.min(2, "Enter your name.")
		.max(120, "Enter a shorter name."),
	email: z
		.string()
		.trim()
		.email("Enter a valid email address.")
		.superRefine((value, context) => {
			if (hasLikelyProviderTypo(value)) {
				context.addIssue({
					code: "custom",
					message: "Check your email address. The domain may be misspelled.",
				});
			}
		}),
	country: z.string().trim().min(2, "Select a country."),
	phone: z
		.string()
		.trim()
		.refine(
			(value) => isValidPhoneNumber(value),
			"Enter a valid phone number.",
		),
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

const registrationResolver: Resolver<RegistrationValues> = (values) => {
	const result = registrationSchema.safeParse(values);
	if (result.success) return { values: result.data, errors: {} };

	const errors: Record<string, ReactHookFormFieldError> = {};
	for (const issue of result.error.issues) {
		const fieldName = issue.path[0];
		if (typeof fieldName === "string" && !errors[fieldName]) {
			errors[fieldName] = { type: issue.code, message: issue.message };
		}
	}
	return { values: {}, errors: errors as FieldErrors<RegistrationValues> };
};

function TextField({
	config,
	control,
	isSubmitted,
}: {
	config: (typeof TEXT_FIELDS)[number];
	control: Control<RegistrationValues>;
	isSubmitted: boolean;
}) {
	return (
		<Controller
			name={config.name}
			control={control}
			render={({ field, fieldState }) => {
				const showError =
					(isSubmitted || fieldState.isTouched) && !!fieldState.error;
				const errorId = config.name + "-error";
				return (
					<Field data-invalid={showError || undefined}>
						<FieldLabel
							htmlFor={config.name}
							className="text-sm text-[#262626]"
						>
							{config.label}
						</FieldLabel>
						{config.name === "email" ? (
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
									aria-describedby={showError ? errorId : undefined}
									aria-invalid={showError || undefined}
									className="text-base placeholder:text-sm placeholder:text-body-primary/40"
								/>
								<InputGroupAddon>
									<MailIcon className="text-body-primary/40" aria-hidden />
								</InputGroupAddon>
							</InputGroup>
						) : (
							<Input
								{...field}
								id={config.name}
								type={config.type}
								autoComplete={config.autoComplete}
								placeholder={config.placeholder}
								aria-describedby={showError ? errorId : undefined}
								aria-invalid={showError || undefined}
								className={cn(
									"h-9 border border-[#D4D4D4] px-4 text-base placeholder:text-sm placeholder:text-body-primary/40",
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
	);
}

function SelectField({
	config,
	control,
	isSubmitted,
}: {
	config: (typeof SELECT_FIELDS)[number];
	control: Control<RegistrationValues>;
	isSubmitted: boolean;
}) {
	return (
		<Controller
			name={config.name}
			control={control}
			render={({ field, fieldState }) => {
				const showError =
					(isSubmitted || fieldState.isTouched) && !!fieldState.error;
				const errorId = config.name + "-error";
				return (
					<Field data-invalid={showError || undefined}>
						<FieldLabel htmlFor={config.name}>{config.label}</FieldLabel>
						<Select
							items={config.options.map((option) => ({
								label: option,
								value: option,
							}))}
							name={field.name}
							value={field.value || null}
							onValueChange={(value) => field.onChange(value ?? "")}
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
								<SelectValue
									className="text-sm focus-visible:text-body-primary/40"
									placeholder={config.placeholder}
								/>
							</SelectTrigger>
							<SelectContent align="start" alignItemWithTrigger={false}>
								<SelectGroup>
									{config.options.map((option) => (
										<SelectItem
											className="focus:bg-surface-action-secondary/10"
											key={option}
											value={option}
										>
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
	);
}

function ReviewSection({
	title,
	items,
}: {
	title: string;
	items: ReadonlyArray<{ label: string; value: string }>;
}) {
	return (
		<section className="rounded-lg border border-border bg-surface-default p-4">
			<h3 className="font-heading text-base text-heading">{title}</h3>
			<dl className="mt-3 space-y-3 text-sm">
				{items.map((item) => (
					<div
						key={item.label}
						className="grid gap-0.5 sm:grid-cols-[9rem_1fr] sm:gap-3"
					>
						<dt className="text-body-primary">{item.label}</dt>
						<dd className="wrap-break-word font-medium text-heading">
							{item.value}
						</dd>
					</div>
				))}
			</dl>
		</section>
	);
}

interface RegistrationDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function RegistrationDialog({
	open,
	onOpenChange,
}: RegistrationDialogProps) {
	const [stage, setStage] = useState<RegistrationStage>("form");
	const [countryCode, setCountryCode] = useState<Country>(NIGERIA);
	const [submissionError, setSubmissionError] = useState<string | null>(null);
	const [verificationToken, setVerificationToken] = useState("");
	const [verificationResetKey, setVerificationResetKey] = useState(0);
	const submissionAttemptRef = useRef(0);
	const {
		control,
		getValues,
		handleSubmit,
		reset,
		setValue,
		trigger,
		formState: { isSubmitting, isSubmitted },
	} = useForm<RegistrationValues>({
		defaultValues: DEFAULT_VALUES,
		mode: "onChange",
		resolver: registrationResolver,
	});

	useEffect(() => {
		if (stage !== "success") return;
		confetti({
			particleCount: 110,
			spread: 72,
			startVelocity: 32,
			origin: { y: 0.65 },
			colors: ["#FFBE0B", "#FB5607", "#3A86FF", "#14A44D"],
			disableForReducedMotion: true,
			zIndex: 1000,
		});
	}, [stage]);

	const continueToReview = handleSubmit(() => {
		setSubmissionError(null);
		setStage("review");
	});

	const confirmRegistration = handleSubmit(async (values) => {
		if (!verificationToken) {
			setSubmissionError("Complete the verification before submitting.");
			return;
		}

		const attempt = ++submissionAttemptRef.current;
		setSubmissionError(null);
		try {
			await submitBootcampRegistration({ ...values, verificationToken });
			if (attempt === submissionAttemptRef.current) setStage("success");
		} catch (error) {
			console.error("Bootcamp registration failed", error);
			if (attempt === submissionAttemptRef.current) {
				setVerificationToken("");
				setVerificationResetKey((key) => key + 1);
				const reason = error instanceof Error ? error.message : "";
				setSubmissionError(
					reason.startsWith(DUPLICATE_REGISTRATION_ERROR_PREFIX)
						? reason
						: reason
							? "We couldn't submit your details: " + reason + " Try again."
							: "We couldn't submit your details. Check your connection and try again.",
				);
			}
		}
	});

	const reviewValues = getValues();
	const contactDetails = [
		{ label: "Name", value: reviewValues.name },
		{ label: "Email", value: reviewValues.email },
		{ label: "Country", value: reviewValues.country },
		{ label: "Phone", value: reviewValues.phone },
		{
			label: "Contact permission",
			value: reviewValues.consent ? "Yes" : "No",
		},
	];
	const experienceDetails = [
		{ label: "Occupation", value: reviewValues.occupation },
		{ label: "UI/UX experience", value: reviewValues.experience },
		{ label: "Learning time", value: reviewValues.learningTime },
		{ label: "Used Figma", value: reviewValues.figmaExperience },
		{ label: "Portfolio", value: reviewValues.hasPortfolio },
	];

	return (
		<Dialog
			open={open}
			disablePointerDismissal
			onOpenChange={(nextOpen, eventDetails) => {
				if (
					nextOpen ||
					eventDetails.reason === "close-press" ||
					eventDetails.reason === "escape-key"
				) {
					onOpenChange(nextOpen);
				}
			}}
			onOpenChangeComplete={(nextOpen) => {
				if (nextOpen) return;
				submissionAttemptRef.current += 1;
				setSubmissionError(null);
				if (stage === "success") {
					reset(DEFAULT_VALUES);
					setCountryCode(NIGERIA);
				}
				setStage("form");
			}}
		>
			<DialogContent className="h-[calc(100svh-2rem)] max-h-208 max-w-[calc(100%-2rem)] grid-cols-1 gap-0 overflow-hidden rounded-xl p-0 sm:h-[calc(100svh-4rem)] sm:max-w-[calc(100%-4rem)] lg:h-[calc(100svh-7rem)] lg:max-h-164 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.1fr)] lg:max-w-6xl">
				<div className="hidden overflow-hidden bg-surface-action lg:block">
					<img
						src={bootcampFormImage}
						alt="bootcamp form image"
						aria-hidden="true"
						className="size-full object-contain object-center"
					/>
				</div>

				{stage === "success" ? (
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
				) : stage === "review" ? (
					<div className="min-h-0 overflow-y-auto px-5 py-8 sm:px-8 sm:py-10 lg:px-8">
						<DialogHeader className="pr-10">
							<DialogTitle className="font-heading text-2xl text-black">
								Review your registration
							</DialogTitle>
							<DialogDescription className="text-body-primary text-paragraph">
								Check your details before you confirm your registration.
							</DialogDescription>
						</DialogHeader>
						<form className="mt-8" noValidate onSubmit={confirmRegistration}>
							<FieldGroup className="gap-5">
								<ReviewSection title="Contact details" items={contactDetails} />
								<ReviewSection title="Experience" items={experienceDetails} />
								{submissionError ? (
									<p
										className="text-center text-sm text-destructive"
										role="alert"
									>
										{submissionError}
									</p>
								) : null}
								{TURNSTILE_SITE_KEY ? (
									<Turnstile
										key={verificationResetKey}
										siteKey={TURNSTILE_SITE_KEY}
										onVerify={setVerificationToken}
										onError={() => setVerificationToken("")}
									/>
								) : (
									<p className="text-sm text-destructive" role="alert">
										Registration verification is unavailable. Please try again
										later.
									</p>
								)}
								<div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
									<Button
										type="button"
										variant="outline"
										onClick={() => setStage("form")}
									>
										<ArrowLeftIcon data-icon="inline-start" />
										Back to edit
									</Button>
									<Button
										type="submit"
										disabled={isSubmitting || !TURNSTILE_SITE_KEY}
									>
										{isSubmitting ? (
											<>
												<Spinner data-icon="inline-start" />
												Confirming...
											</>
										) : (
											"Confirm registration"
										)}
									</Button>
								</div>
							</FieldGroup>
						</form>
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
						<form className="mt-8" noValidate onSubmit={continueToReview}>
							<FieldGroup className="gap-5">
								{TEXT_FIELDS.map((config) => (
									<TextField
										key={config.name}
										config={config}
										control={control}
										isSubmitted={isSubmitted}
									/>
								))}

								<Controller
									name="phone"
									control={control}
									render={({ field, fieldState }) => {
										const showError =
											(isSubmitted || fieldState.isTouched) &&
											!!fieldState.error;
										return (
											<Field data-invalid={showError || undefined}>
												<FieldLabel htmlFor="phone">Phone number</FieldLabel>
												<PhoneInput
													{...field}
													id="phone"
													defaultCountry={countryCode}
													international
													countryCallingCodeEditable={false}
													autoComplete="tel-national"
													placeholder="Enter your phone number"
													aria-describedby={
														showError ? "phone-error" : undefined
													}
													aria-invalid={showError || undefined}
													onCountryChange={(nextCountry) => {
														if (!nextCountry) return;
														setCountryCode(nextCountry);
														setValue(
															"country",
															countryNames[nextCountry] ?? nextCountry,
															{ shouldDirty: true, shouldValidate: true },
														);
														void trigger("phone");
													}}
													inputClassName={cn(
														"h-9 border-[#D4D4D4] text-base",
														showError && "field-shake",
													)}
													triggerClassName={cn(
														"h-9 border-[#D4D4D4]",
														showError && "field-shake",
													)}
												/>
												<FieldError
													id="phone-error"
													errors={showError ? [fieldState.error] : undefined}
												/>
											</Field>
										);
									}}
								/>

								{SELECT_FIELDS.map((config) => (
									<SelectField
										key={config.name}
										config={config}
										control={control}
										isSubmitted={isSubmitted}
									/>
								))}

								<Controller
									name="consent"
									control={control}
									render={({ field, fieldState }) => {
										const showError =
											(isSubmitted || fieldState.isTouched) &&
											!!fieldState.error;
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
								<Button type="submit" size="lg" className="mt-2 w-full">
									Continue to review
								</Button>
							</FieldGroup>
						</form>
					</div>
				)}
			</DialogContent>
		</Dialog>
	);
}
