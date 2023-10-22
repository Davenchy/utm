import { useState, useEffect } from "react";

function useBrowserTabs() {
	const [tabs, setTabs] = useState<browser.tabs.Tab[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		browser.tabs
			.query({})
			.then(setTabs)
			.finally(() => setIsLoading(false));
	}, []);

	return { tabs, isLoading };
}

function TabItem({ tab }: { tab: browser.tabs.Tab }) {
	return (
		<li>
			<h6>{tab.title}</h6>
			<p>{tab.url}</p>
		</li>
	);
}

function Tabs() {
	const { tabs, isLoading } = useBrowserTabs();

	return (
		<ul>
			{isLoading ? (
				<p>Loading...</p>
			) : (
				tabs.map(tab => <TabItem key={`{tab.id}-${tab.url}`} tab={tab} />)
			)}
		</ul>
	);
}

function NewTab() {
	return (
		<div>
			<h1>New Tab</h1>
			<h3>Tabs:</h3>
			<Tabs />
		</div>
	);
}

export default NewTab;
