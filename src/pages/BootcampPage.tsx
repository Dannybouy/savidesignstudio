import Hero from "@/components/bootcamp/Hero";
import Offerings from "@/components/bootcamp/Offerings";
import RegistrationDialog from "@/components/bootcamp/RegistrationDialog";
import Teams from "@/components/bootcamp/Teams";
import Tools from "@/components/bootcamp/Tools";
import { useState } from "react";

export default function BootcampPage() {
	const [registrationOpen, setRegistrationOpen] = useState(false);

	return (
		<main className="relative">
			<title>UI/UX Design Bootcamp in Nigeria | Savi Design Studio</title>
			<Hero onRegister={() => setRegistrationOpen(true)} />
			<Offerings />
			<Teams />
			<Tools />
			<RegistrationDialog
				open={registrationOpen}
				onOpenChange={setRegistrationOpen}
			/>
		</main>
	);
}
