const handlers = {};
browser.runtime.onMessage.addListener((payload) => {
	const {id} = payload;

	for (key of Object.keys(handlers)) {
		if (key !== payload.action) continue;
		const handler = handlers[key];
		handlers[key].apply({}, payload.args)
			.then((result) => browser.runtime.sendMessage({id, result}))
			.catch((error) => browser.runtime.sendMessage({id, error}));
		break;
	}
});


handlers.getTabs = async () => {
	console.log("get tabs");
	return browser.tabs.query({});
}

handlers.echo = async (msg) => "echo: " + msg;

console.log("background is ready!");
