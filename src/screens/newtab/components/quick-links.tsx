import { QuickLinkType } from "@/types";

function QuickLink({
	title,
	icon,
	onClick
}: {
	title: string;
	icon: string;
	onClick: () => void;
}) {
	return (
		<button
			onClick={onClick}
			className="hover:bg-black/10 w-16 h-16 overflow-hidden p-2 m-2
			flex flex-col place-items-center justify-around rounded text-black">
			<img src={icon} onClick={onClick} className="h-8 w-8" />
			<span className="text-sm text-center">{title}</span>
		</button>
	);
}

// @ts-ignore
function QuickLinks({ links }: { links?: QuickLinkType[] }) {
	return (
		<div className="bg-white/20 rounded-xl shadow shadow-white/50 w-1/2
			text-white overflow-hidden p-4 h-full max-h-60 flex flex-wrap
		 	items-center justify-start overflow-x-hidden overflow-y-auto">
			{/* {links?.map(link => <QuickLink link={link} />)} */}
			{Array.from({ length: 30 }).map((_, i) => (
				<QuickLink
					title={`Link ${i + 1}`}
					icon="https://files.softicons.com/download/system-icons/the-x-set-icons-by-gordon-irving/ico/X_Au_Blu.ico"
					onClick={() => console.log("add link")}
				/>
			))}
		</div>
	);
}

export default QuickLinks;
