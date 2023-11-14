import { ITodoItem } from "@/types";
import { useStorageScope } from "./StorageManager";
import { v4 as UUID_V4 } from "uuid";

export type TodoItemSetter = (todoItem: ITodoItem) => ITodoItem;

export default function useTodoManager() {
	const [todoItems, setTodoItems] = useStorageScope("todoItems");

	const addTodoItem = (label: string) => {
		const newTodoItem: ITodoItem = {
			id: UUID_V4(),
			label,
			done: false
		};
		setTodoItems(items => [...items, newTodoItem]);
	};

	const setTodoItem = (id: string, setter: TodoItemSetter) =>
		setTodoItems(items =>
			items.map(item => (item.id === id ? setter(item) : item))
		);

	const removeTodoItem = (id: string) =>
		setTodoItems(items => items.filter(item => item.id !== id));

	const toggleTodoItem = (id: string) =>
		setTodoItem(id, item => ({ ...item, done: !item.done }));

	return {
		todoItems,
		addTodoItem,
		setTodoItem,
		removeTodoItem,
		toggleTodoItem
	};
}
