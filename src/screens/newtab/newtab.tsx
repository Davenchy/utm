import "@/main.css";
import { useState, useEffect } from "react";

// function useBrowserTabs() {
// 	const [tabs, setTabs] = useState<browser.tabs.Tab[]>([]);
// 	const [isLoading, setIsLoading] = useState(true);
//
// 	useEffect(() => {
// 		browser.tabs
// 			.query({})
// 			.then(setTabs)
// 			.finally(() => setIsLoading(false));
// 	}, []);
//
// 	return { tabs, isLoading };
// }

// function TabItem({ tab }: { tab: browser.tabs.Tab }) {
// 	return (
// 		<li>
// 			<h6>{tab.title}</h6>
// 			<p>{tab.url}</p>
// 		</li>
// 	);
// }

// function Tabs() {
// 	const { tabs, isLoading } = useBrowserTabs();
//
// 	return (
// 		<ul>
// 			{isLoading ? (
// 				<p>Loading...</p>
// 			) : (
// 				tabs.map(tab => <TabItem key={`{tab.id}-${tab.url}`} tab={tab} />)
// 			)}
// 		</ul>
// 	);
// }

function Clock() {
	const [date, setDate] = useState<Date>(new Date());
	const m = date.getMinutes();
	const h = date.getHours();
	const dp: string = h > 12 ? "PM" : "AM";

	// update clock every second
	useEffect(() => {
		const timerId = setInterval(() => setDate(new Date()), 1000);
		return () => clearInterval(timerId);
	}, []);

	return <div className="flex items-center font-bold">
		<span className="p-4 text-9xl">{h < 10 ? "0" + h : h}</span>
		<div className="flex flex-col text-5xl text-center">
			<span>{dp}</span>
			<span>{m < 10 ? "0" + m : m}</span>
		</div>
	</div>;
}

function Background() {
	return <div className="top-0 left-0 z-[-1] fixed w-screen h-screen bg-black">
		<div className="w-full h-full absolute
			bg-[url(https://w.wallhaven.cc/full/ne/wallhaven-ne2vow.jpg)]"></div>
		<div className="w-full h-full absolute backdrop-blur bg-black/40"></div>
	</div>;
}

function NewTab() {
	return (
		<div className="w-screen h-screen">
			<Background />
			<div className="text-white flex flex-col items-center justify-center">
				<Clock />
			</div>
		</div >
	);
}

export default NewTab;
