import React from "react";
import ReactDOM from "react-dom/client";
import NewTab from "./NewTab";
import SettingsManager from "@/shared/settings-manager";
import { INewTabSettingsScope } from "@/types";
import { OverlayProvider } from "@/shared/overlay-system";
import {
	TodoManager,
	TodoManagerProvider
} from "./features/todo_manager";

const rootEl = document.getElementById("root");
const settingsManager = SettingsManager.getInstance();
settingsManager.addScope<INewTabSettingsScope>("new-tab", {
	quickLinks: [],
	backgroundImage: "",
	todoItems: []
});
const todoManager = new TodoManager();

ReactDOM.createRoot(rootEl!).render(
	<React.StrictMode>
		<TodoManagerProvider manager={todoManager}>
			<OverlayProvider>
				<NewTab />
			</OverlayProvider>
		</TodoManagerProvider>
	</React.StrictMode>
);
