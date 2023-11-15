// This file defines the Background React Component of the new tab page. It is a full screen image.
import { useStorageScope } from "@/features/StorageManager";

function Background() {
	// Get the background image from a user-inputed URL or a default image
	const [image, _] = useStorageScope("backgroundImage");
	const bgUrl = image || "/background2.jpg";

	return (
		// The background image is a fixed position div that covers the entire screen
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
