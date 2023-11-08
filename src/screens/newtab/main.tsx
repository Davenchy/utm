import React from "react";
import ReactDOM from "react-dom/client";
import Hadeeth from "./Hadeeth";
import request from "request";

const rootEl = document.getElementById("root");

const url = "https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-abudawud/1035.min.json";

request(url, (error, res) => {
	if (error) {
		console.error("url error");
		return;
	}
	const hadeethContent = res.body;
	console.log(hadeethContent);
});

ReactDOM.createRoot(rootEl!).render(
		<React.StrictMode>
			<Hadeeth content={'dafafn'} />
		</React.StrictMode>
	);
