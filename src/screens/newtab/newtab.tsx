import "@/main.css";
import Clock from "./components/clock";
import Background from "./components/background";
import QuickLinks from "./components/quick-links";
import { useState } from "react";
import { useSettingsScope } from "@/shared/settings-manager";
import { NewTabSettingsScope } from "@/types";

function SimpleButton({
	label,
	onClick
}: {
	label: string;
	onClick: () => void;
}) {
	return (
		<button
			className="hover:bg-white/20 p-2 rounded cursor-pointer"
			onClick={onClick}
		>
			{label}
		</button>
	);
}

function BackgroundSettings() {
	const scope = useSettingsScope<NewTabSettingsScope>("new-tab");

	return (
		<input
			type="url"
			className="text-black bg-white/20 shadow shadow-white/50 p-1 rounded w-1/2"
			placeholder="Background Image URL (empty for default)"
			value={scope.backgroundImage || ""}
			onChange={(e) => scope.backgroundImage = e.target.value} />
	)
}

function NewTab() {
	const [isQuickLinksOpened, setIsQuickLinksOpened] = useState<boolean>(false);

	return (
		<div className="w-screen h-screen">
			<Background />
			<div className="h-full text-white flex flex-col justify-between
				items-center">
				<div></div>
				<Clock />
				<BackgroundSettings />
				{isQuickLinksOpened && <QuickLinks />}
				<div className="w-full h-12 px-2 flex justify-between items-center">
					<div className="space-x-4">
						<SimpleButton label="Settings" onClick={() => { }} />
						<SimpleButton label="Quick Links"
							onClick={() => setIsQuickLinksOpened(s => !s)} />
					</div>
					<div className="space-x-4">
						<SimpleButton label="Sessions" onClick={() => { }} />
						<SimpleButton label="Todo" onClick={() => { }} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewTab;
