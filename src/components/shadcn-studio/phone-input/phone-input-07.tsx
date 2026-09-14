import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/ui/phone-input";

const PhoneInputWithDefaultValue = () => {
	return (
		<div className="space-y-2">
			<Label htmlFor="phone">Pre-filled Phone Input</Label>
			<PhoneInput value="+12125551234" placeholder="Enter phone number" />
		</div>
	);
};

export default PhoneInputWithDefaultValue;
