function Background() {
	return (
		<div className="top-0 left-0 z-[-1] fixed w-screen h-screen bg-black">
			<div
				className="w-full h-full absolute
			bg-[url(https://w.wallhaven.cc/full/ne/wallhaven-ne2vow.jpg)]"
			></div>
			<div className="w-full h-full absolute backdrop-blur bg-black/40"></div>
		</div>
	);
}

export default Background;
