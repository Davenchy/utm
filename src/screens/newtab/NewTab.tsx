import "@/main.css";
import Clock from "./components/Clock";
import Background from "./components/Background";
import QuickLinks from "./components/QuickLinks";
import { useNewTabStorageScope } from "./storage-scopes";
import { useState } from "react";
import classNames from "classnames";
import TodoSection from "./components/TodoSection";
import { Button } from "./components/Buttons";

function BackgroundSettings() {
	const scope = useNewTabStorageScope();

	return (
		<input
			type="url"
			className="text-black bg-white/20 shadow shadow-white/50 p-1
			rounded w-1/2 outline-none focus:bg-white/30"
			placeholder="Background Image URL (empty for default)"
			value={scope.backgroundImage || ""}
			onChange={e => (scope.backgroundImage = e.target.value)}
		/>
	);
}

function NewTab() {
	const [isTodoOpened, setIsTodoOpened] = useState(false);

	return (
		<div className="w-screen h-screen">
			<Background />
			<div
				className="h-full text-white flex flex-col justify-between
				items-center"
			>
				<div></div>
				<Clock />
				<BackgroundSettings />
				<QuickLinks />
				<div
					className={classNames("w-96 h-3/4 absolute right-0 bottom-12", {
						hidden: !isTodoOpened
					})}
				>
					<TodoSection />
				</div>
				<div className="w-full h-12 px-2 flex justify-between items-center">
					<Button label="Settings" style="label" onClick={() => { }} />
					<div className="space-x-4">
						<Button label="Sessions" style="label" onClick={() => { }} />
						<Button
							label="Todo"
							style="label"
							onClick={() => setIsTodoOpened(s => !s)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewTab;
