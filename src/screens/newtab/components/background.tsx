function Background() {
	return (
		<div className="top-0 left-0 z-[-1] fixed w-screen h-screen bg-black">
			<div
				className="w-full h-full absolute bg-cover
			bg-[url(/background.jpg)]"
			></div>
			<div className="w-full h-full absolute backdrop-blur-sm bg-black/20"></div>
		</div>
	);
}

export default Background;
