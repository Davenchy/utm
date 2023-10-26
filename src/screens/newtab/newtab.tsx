import "@/main.css";
import Clock from "./components/clock";
import Background from "./components/background";
import QuickLinks from "./components/quick-links";

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

function NewTab() {
	return (
		<div className="w-screen h-screen">
			<Background />
			<div className="h-full text-white flex flex-col justify-between
				items-center">
				<div></div>
				<Clock />
				<QuickLinks />
				<div className="w-full h-12 px-2 flex justify-between items-center">
					<SimpleButton label="Settings" onClick={() => { }} />
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
