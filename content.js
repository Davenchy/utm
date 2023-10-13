(() => {
	console.log("content script is read!");
	if (window.isRun)
		return;
	window.isRun = true;

	browser.runtime.onMessage.addListener((msg) => {
		console.log(msg);
	});

})();
