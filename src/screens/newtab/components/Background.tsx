import { useStorageScope } from "@/features/StorageManager";

function Background() {
	const [image, _] = useStorageScope("backgroundImage");
	const bgUrl = image || "/background2.jpg";

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
