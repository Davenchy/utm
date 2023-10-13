window.addEventListener("DOMContentLoaded", init);
let tabsEl;

async function updateTabs() {
	const tabs = await browser.tabs.query({});

	Array.from(tabsEl.children).forEach(c => c.remove());
	for (tab of tabs) {
		const element = document.createElement("li");
		element.innerText = tab.title;
		tabsEl.appendChild(element);
	}
}

async function init() {
	tabsEl = document.querySelector('.tabs');

	updateTabs();
	browser.tabs.onActivated.addListener(updateTabs);

	document.getElementById('load-btn').addEventListener('click', () => {
		Array.from(tabsEl.children).forEach(c => c.remove());
	});
}
