import "@/main.css";
import Clock from "./components/Clock";
import Background from "./components/Background";
import { Button } from "./components/Buttons";
import QuickLinks from "./components/QuickLinks";
import TodoSection from "./components/TodoSection";
import {
	OpenCloseSystem,
	useOpenCloseSystem
} from "@/features/OpenCloseSystem";
import { SettingsDialog } from "./components/Settings";

function NewTab() {
	const todoDialogSystem = useOpenCloseSystem("todoDialog");
	const settingsDialogSystem = useOpenCloseSystem("settings");
	const sessionsDialogSystem = useOpenCloseSystem("sessions");

	return (
		<div className="w-screen h-screen">
			<Background />
			<div
				className="h-full text-white flex flex-col justify-between
				items-center"
			>
				<div></div>
				<Clock />
				<QuickLinks />
				<OpenCloseSystem
					systemId="todoDialog"
					className="w-96 h-3/4 absolute right-2 bottom-12"
				>
					<TodoSection />
				</OpenCloseSystem>
				<OpenCloseSystem
					systemId="settings"
					className="w-8/12 h-3/4 absolute left-2 bottom-12"
				>
					<SettingsDialog />
				</OpenCloseSystem>
				<div className="w-full h-12 px-2 flex justify-between items-center">
					<Button
						label="Settings"
						style="label"
						onClick={() => { }}
						openCloseSystem={settingsDialogSystem}
					/>
					<div className="space-x-4">
						<Button
							label="Sessions"
							style="label"
							onClick={() => { }}
							openCloseSystem={sessionsDialogSystem}
						/>
						<Button
							label="Todo"
							style="label"
							onClick={() => { }}
							openCloseSystem={todoDialogSystem}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewTab;
