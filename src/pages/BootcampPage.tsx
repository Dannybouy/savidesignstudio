import { useState } from "react";
import Hero from "@/components/bootcamp/Hero";
import Offerings from "@/components/bootcamp/Offerings";
import RegistrationDialog from "@/components/bootcamp/RegistrationDialog";
import Tools from "@/components/bootcamp/Tools";

export default function BootcampPage() {
	const [registrationOpen, setRegistrationOpen] = useState(false);

	return (
		<main className="relative">
			<title>UI/UX Bootcamp 1.0 | Savi Design Studio</title>
			<Hero onRegister={() => setRegistrationOpen(true)} />
			<Offerings />
			<Tools />
			<RegistrationDialog
				open={registrationOpen}
				onOpenChange={setRegistrationOpen}
			/>
		</main>
	);
}
