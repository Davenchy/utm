function onStart() {
	console.log("started");
	const msgEl = document.getElementById('msg');

	document.getElementById("load-btn").addEventListener('click', () => {
		const msg = msgEl.value;
		console.log("send:", msg);
		browser.tabs
			.query({ active: true, currentWindow: true })
			.then((tabs) => {
				browser.tabs.sendMessage(tabs[0].id, msg);
			});
	});
}

console.log("popup is ready!");
document.addEventListener('DOMContentLoaded', onStart);
