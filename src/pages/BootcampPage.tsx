import { useState } from "react";
import Hero from "@/components/bootcamp/Hero";
import Offerings from "@/components/bootcamp/Offerings";
import RegistrationDialog from "@/components/bootcamp/RegistrationDialog";
import Teams from "@/components/bootcamp/Teams";
import Tools from "@/components/bootcamp/Tools";

export default function BootcampPage() {
	const [registrationOpen, setRegistrationOpen] = useState(false);

	return (
		<main className="relative">
			<title>UI/UX Design Bootcamp in Nigeria | Savi Design Studio</title>
			<Hero onRegister={() => setRegistrationOpen(true)} />
			<Offerings onRegister={() => setRegistrationOpen(true)} />
			<Teams />
			<Tools />
			<RegistrationDialog
				open={registrationOpen}
				onOpenChange={setRegistrationOpen}
			/>
		</main>
	);
}
