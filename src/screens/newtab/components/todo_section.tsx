import { useTodoManager } from "../features/todo_manager";

function TodoSection() {
	const { items, removeTodo } = useTodoManager();

	return (
		<div>
			<h1>Todo</h1>
			<ul>
				{items.map(todo => (
					<li key={todo.id} onClick={() => removeTodo(todo.id)}>
						{`${todo.title} - ${todo.id}`}
					</li>
				))}
			</ul>
		</div>
	);
}

export default TodoSection;
