import React from "react";
import ReactDOM from "react-dom/client";
import NewTab from "./NewTab";
import SettingsManager from "@/shared/settings-manager";
import { INewTabSettingsScope } from "@/types";
import { OverlayProvider } from "@/shared/overlay-system";

const rootEl = document.getElementById("root");

const manager = SettingsManager.getInstance();
manager.addScope<INewTabSettingsScope>("new-tab", {
	quickLinks: [],
	backgroundImage: "",
})

ReactDOM.createRoot(rootEl!).render(
	<React.StrictMode>
		<OverlayProvider>
			<NewTab />
		</OverlayProvider>
	</React.StrictMode>
);
