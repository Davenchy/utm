import "@/main.css";
import Clock from "./components/clock";
import Background from "./components/background";
import QuickLinks from "./components/quick-links";
import SimpleButton from "./components/simple_button";
import TodoSection from "./components/todo_section";
import { useState } from "react";
import { useTodoManagerContext } from "./features/todo_manager";



function NewTab() {
	const [isQuickLinksOpened, setIsQuickLinksOpened] = useState<boolean>(false);
	const { manager } = useTodoManagerContext();

	return (
		<div className="w-screen h-screen">
			<Background />
			<div
				className="h-full text-white flex flex-col justify-between
				items-center"
			>
				<div></div>
				<Clock />
				{isQuickLinksOpened && <QuickLinks />}
				<TodoSection />
				<div className="w-full h-12 px-2 flex justify-between items-center">
					<div className="space-x-4">
						<SimpleButton label="Settings" onClick={() => { }} />
						<SimpleButton
							label="Quick Links"
							onClick={() => setIsQuickLinksOpened(s => !s)}
						/>
					</div>
					<div className="space-x-4">
						<SimpleButton label="Sessions" onClick={() => { }} />
						<SimpleButton
							label="Todo"
							onClick={() => manager.addItem("New Todo")}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewTab;
