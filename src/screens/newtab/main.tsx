import React from "react";
import ReactDOM from "react-dom/client";
import NewTab from "./newtab";

import {
	TodoManager,
	TodoManagerProvider,
	InMemoryTodoRepository
} from "./features/todo_manager";

const rootEl = document.getElementById("root");
const managerRepo = new InMemoryTodoRepository();
const manager = new TodoManager(managerRepo);

ReactDOM.createRoot(rootEl!).render(
	<React.StrictMode>
		<TodoManagerProvider manager={manager}>
			<NewTab />
		</TodoManagerProvider>
	</React.StrictMode>
);
