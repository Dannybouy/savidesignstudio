import { useState } from "react";
import Hero from "@/components/bootcamp/Hero";
import Offerings from "@/components/bootcamp/Offerings";
import RegistrationDialog from "@/components/bootcamp/RegistrationDialog";
import Teams from "@/components/bootcamp/Teams";
import Tools from "@/components/bootcamp/Tools";
import { REGISTRATION_CLOSED } from "@/lib/bootcamp-registration";

export default function BootcampPage() {
	const [registrationOpen, setRegistrationOpen] = useState(false);

	const openRegistration = () => {
		if (REGISTRATION_CLOSED) return;
		setRegistrationOpen(true);
	};

	return (
		<main className="relative">
			<title>UI/UX Design Bootcamp in Nigeria | Savi Design Studio</title>
			<Hero onRegister={openRegistration} />
			<Offerings onRegister={openRegistration} />
			<Teams />
			<Tools />
			{REGISTRATION_CLOSED ? null : (
				<RegistrationDialog
					open={registrationOpen}
					onOpenChange={setRegistrationOpen}
				/>
			)}
		</main>
	);
}
