import React from "react";
import ReactDOM from "react-dom/client";
import Hadeeth from "./Hadeeth";

const rootEl = document.getElementById("root");

ReactDOM.createRoot(rootEl!).render(
		<React.StrictMode>
			<Hadeeth />
		</React.StrictMode>
);
