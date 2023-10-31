import React from "react";
import ReactDOM from "react-dom/client";
import NewTab from "./NewTab";
import SettingsManager from "@/shared/settings-manager";
import { NewTabSettingsScope } from "@/types";

const rootEl = document.getElementById("root");

const manager = SettingsManager.getInstance();
manager.addScope<NewTabSettingsScope>("new-tab", {
	quickLinks: [],
	backgroundImage: "",
})

ReactDOM.createRoot(rootEl!).render(
	<React.StrictMode>
		<NewTab />
	</React.StrictMode>
);
