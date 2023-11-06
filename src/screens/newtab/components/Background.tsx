import { useStorageScope } from "@/shared/storage-manager";
import { INewTabStorageScope } from "@/types";

function Background() {
	const storage = useStorageScope<INewTabStorageScope>("new-tab");
	const bgUrl = storage.backgroundImage || "/background.jpg";

	return (
		<div className="top-0 left-0 z-[-1] fixed w-screen h-screen bg-black">
			<div
				className="w-full h-full absolute bg-cover"
				style={{ backgroundImage: `url(${bgUrl})` }}
			></div>
			<div
				className="w-full h-full absolute backdrop-blur-sm bg-black/20"></div>
		</div>
	);
}

export default Background;
