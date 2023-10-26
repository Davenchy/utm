import React from "react";
import ReactDOM from "react-dom/client";
import NewTab from "./newtab";

const rootEl = document.getElementById("root");
ReactDOM.createRoot(rootEl!).render(
	<React.StrictMode>
		<NewTab />
	</React.StrictMode>
);
