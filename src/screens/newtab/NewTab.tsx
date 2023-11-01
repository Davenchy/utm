/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import "@/main.css";
import Clock from "./components/Clock";
import SimpleButton from "./components/SimpleButton";
import Background from "./components/Background";
import QuickLinks from "./components/QuickLinks";
import { useState, useEffect, createContext } from "react";

export const linkContext = createContext<{
	links: QuickLinkType[];
	setLinks: (newState: QuickLinkType[]) => void;
} | null>(null);

import { useNewTabSettingsScope } from "./settings-scopes";

function BackgroundSettings() {
	const scope = useNewTabSettingsScope();

	return (
		<input
			type="url"
			className="text-black bg-white/20 shadow shadow-white/50 p-1
			rounded w-1/2 outline-none focus:bg-white/30"
			placeholder="Background Image URL (empty for default)"
			value={scope.backgroundImage || ""}
			onChange={(e) => scope.backgroundImage = e.target.value} />
	)
}

function NewTab() {
	const [isQuickLinksOpened, setIsQuickLinksOpened] = useState<boolean>(false);
	const [links, setLinks] = useState<QuickLinkType[]>([]);

	useEffect(() => {
		const localss = localStorage.getItem("QuickLinks");
		if (!localss) {
			localStorage.setItem("QuickLinks", JSON.stringify(links));
		}
		const storage = localStorage.getItem("QuickLinks")
			? localStorage.getItem("QuickLinks")
			: "";
		setLinks(JSON.parse(storage!));
	}, []);

	return (
		<div className="w-screen h-screen">
			<Background />
			<div className="h-full text-white flex flex-col justify-between
				items-center">
				<div></div>
				<Clock />
				<BackgroundSettings />
				{
					isQuickLinksOpened && <linkContext.Provider value={{ links, setLinks }}>
						<QuickLinks />
					</linkContext.Provider>
				}
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
