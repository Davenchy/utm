import { useState, useEffect } from "react";

function Clock() {
	const [date, setDate] = useState<Date>(new Date());
	const m = date.getMinutes();
	let h = date.getHours();
	const dp: string = h >= 12 ? "PM" : "AM";
	h %= 12;
	if (!h) h = 12;

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

export default Clock;
